import { supabase } from "@/integrations/supabase/client";

// The destination autocomplete (src/components/SearchBar.tsx) used to suggest
// only a static, hand-picked list of ~20 cities (searchSuggestions.ts) with no
// connection to what the site actually has real evidence for — a visitor
// typing "Warsaw" or "Belgrade" (both real, evidenced destinations by now)
// got no suggestion at all, even though hundreds of real cities exist in the
// DB. This fetches the real list live: every city with at least one
// hotel/restaurant that has real, currently-valid allergy evidence
// (allergy_score is not null, same bar hotel-search/content-pipeline use
// for "real evidence exists"), so the suggestion list grows automatically
// as content-pipeline publishes more coverage, no code change needed.
//
// Cached for the lifetime of the page load (module-level, not persisted) —
// this list only changes a few times a day at most via content-pipeline, so
// refetching on every SearchBar mount within the same session is wasted
// work, not freshness.
let cachedDestinations: string[] | null = null;
let inFlight: Promise<string[]> | null = null;

export async function fetchCoveredDestinations(): Promise<string[]> {
  if (cachedDestinations) return cachedDestinations;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const [{ data: hotels }, { data: restaurants }] = await Promise.all([
        supabase.from('hotels').select('city').eq('active', true).not('allergy_score', 'is', null),
        supabase.from('restaurants').select('city').eq('active', true).not('allergy_score', 'is', null),
      ]);

      const seen = new Map<string, string>(); // lowercase -> first-seen display casing
      for (const row of [...(hotels || []), ...(restaurants || [])]) {
        const city = row.city?.trim();
        if (!city) continue;
        const key = city.toLowerCase();
        if (!seen.has(key)) seen.set(key, city);
      }

      const result = [...seen.values()].sort((a, b) => a.localeCompare(b));
      cachedDestinations = result;
      return result;
    } catch (err) {
      console.error('fetchCoveredDestinations error (non-fatal):', err);
      return [];
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}
