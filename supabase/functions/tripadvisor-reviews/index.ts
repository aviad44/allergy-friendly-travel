import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// TRIPADVISOR REVIEWS ENRICHMENT
// ==========================================
// Looks up a hotel/restaurant on Tripadvisor's Terra API (the Content API's
// replacement as of Aug 2026) and returns its real rating + up to 3 real
// reviews with links back to Tripadvisor — genuine third-party content for
// detail pages, not a paraphrase of it.
//
// Cached PERMANENTLY per place once found (no refresh): ratings/reviews
// don't shift meaningfully day to day, and every lookup is a billed
// "entity" on Tripadvisor's side, so re-fetching the same place buys us
// nothing but cost.
//
// Cost ceiling: same philosophy as hotel-search/restaurants-search — a
// hard monthly cap enforced in OUR OWN code, not Tripadvisor's own
// "Expected cost" estimator on their checkout page (which turned out to be
// non-binding: dragging it to 1000 entities still showed "$0 due today").
// TRIPADVISOR_COST_PER_CALL_ILS below is an approximation from their
// published $0.015/entity list price at an approximate USD/ILS rate — it
// is NOT yet calibrated against a real Tripadvisor invoice the way the
// Google Places constant was. Recalibrate once a month of real billing
// has posted.
const TRIPADVISOR_COST_PER_CALL_ILS = 0.056;
const CALLS_PER_NEW_PLACE = 3; // search + details + reviews — counted conservatively as 3 billable calls
// ₪50/month total, independent from the Google Places ₪100 ceiling — sized
// for two consumers sharing this same cache+budget: the slow-growing guide
// page catalog (small), plus hotel-search/restaurants-search enriching only
// the single top result per live search (measured from search_cache:
// ~400 distinct new places/month site-wide if every result were enriched,
// vs. roughly one lookup per unique destination search when scoped to the
// top result only — real Tripadvisor pricing is $0.015/entity, list price,
// not yet calibrated against an actual invoice).
const MONTHLY_BUDGET_ILS = 50;
const BUDGET_SAFETY_MARGIN = 0.9;

type Category = 'hotel' | 'restaurant';

function normalizeKey(name: string, city: string): string {
  return `${name}|${city}`.toLowerCase().trim().replace(/\s+/g, ' ');
}

async function isMonthlyBudgetExceeded(supabase: any): Promise<boolean> {
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('tripadvisor_cache')
    .select('id', { count: 'exact', head: true })
    .gte('fetched_at', monthStart.toISOString());

  if (error) {
    console.error('Tripadvisor budget check failed, failing closed:', error.message);
    return true;
  }

  const costIls = (count ?? 0) * CALLS_PER_NEW_PLACE * TRIPADVISOR_COST_PER_CALL_ILS;
  return costIls >= MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN;
}

async function taFetch(path: string, apiKey: string): Promise<any | null> {
  const res = await fetch(`https://terra.tripadvisor.com/api${path}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) {
    console.error(`Tripadvisor ${path} failed:`, res.status, await res.text());
    return null;
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { name, city, category } = await req.json() as { name?: string; city?: string; category?: Category };
    if (!name || (category !== 'hotel' && category !== 'restaurant')) {
      return new Response(JSON.stringify({ error: "Missing name or category ('hotel' | 'restaurant')" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const apiKey = Deno.env.get('TRIPADVISOR_API_KEY');
    if (!supabaseUrl || !supabaseKey || !apiKey) {
      return new Response(JSON.stringify({ error: 'Missing configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const placeKey = normalizeKey(name, city || '');

    // 1. Cache hit — permanent, no refresh.
    const { data: cached } = await supabase
      .from('tripadvisor_cache')
      .select('*')
      .eq('place_key', placeKey)
      .maybeSingle();

    if (cached) {
      if (!cached.found) {
        return new Response(JSON.stringify({ available: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({
        available: true,
        rating: cached.rating,
        reviewCount: cached.review_count,
        tripadvisorUrl: cached.tripadvisor_url,
        reviews: cached.reviews,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 2. Hard budget ceiling, checked before any live call.
    if (await isMonthlyBudgetExceeded(supabase)) {
      console.log('🛑 Tripadvisor monthly budget reached — skipping live lookup');
      return new Response(JSON.stringify({ available: false, budgetLimitReached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 3. Live lookup: name search -> details + reviews for the top match.
    const taCategory = category === 'hotel' ? 'HOTEL' : 'RESTAURANT';
    const searchResult = await taFetch(`/locations/search?query=${encodeURIComponent(name)}&category=${taCategory}`, apiKey);
    const locationId = searchResult?.data?.[0]?.location?.id;

    if (!locationId) {
      await supabase.from('tripadvisor_cache').insert({ place_key: placeKey, name, category, found: false });
      return new Response(JSON.stringify({ available: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const [details, reviewsRes] = await Promise.all([
      taFetch(`/locations/${locationId}?locale=en-US`, apiKey),
      taFetch(`/locations/${locationId}/reviews?locale=en-US`, apiKey),
    ]);

    const rating = details?.traveler_ratings?.overall?.rating ?? null;
    const reviewCount = details?.traveler_ratings?.overall?.count ?? null;
    const tripadvisorUrl = details?.urls?.tripadvisor?.main ?? null;
    const reviews = (reviewsRes?.data ?? []).slice(0, 3).map((r: any) => ({
      rating: r.rating,
      text: r.text?.find((t: any) => t.primary)?.value ?? r.text?.[0]?.value ?? '',
      title: r.title?.find((t: any) => t.primary)?.value ?? r.title?.[0]?.value ?? '',
      author: r.user?.username ?? 'Tripadvisor traveler',
      publishedAt: r.publish_ts,
      url: r.url,
    }));

    await supabase.from('tripadvisor_cache').insert({
      place_key: placeKey, name, category, found: true,
      tripadvisor_location_id: locationId, rating, review_count: reviewCount,
      tripadvisor_url: tripadvisorUrl, reviews,
    });

    console.log(`✅ Tripadvisor: cached "${name}" (${locationId})`);
    return new Response(JSON.stringify({ available: true, rating, reviewCount, tripadvisorUrl, reviews }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('tripadvisor-reviews error:', err);
    return new Response(JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
