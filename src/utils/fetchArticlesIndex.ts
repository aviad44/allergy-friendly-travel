import { supabase } from "@/integrations/supabase/client";

export interface ArticleMatch {
  slug: string;
  title: string;
  contentType: 'hotel' | 'restaurant';
  city: string;
  path: string; // full route, e.g. /destinations/<slug>/ or /restaurants/<slug>/
}

// Powers the central "find a hotel/restaurant guide" search on /destinations/
// and /restaurants/ (user request, 2026-11-06): typing a city should surface
// the real, already-published article(s) for it — never a live Google call,
// unlike the homepage's hotel-search/restaurants-search flow. Built once per
// page load and cached (module-level), same pattern as
// fetchCoveredDestinations — content-pipeline only adds a few articles a
// day, so refetching on every search keystroke would be wasted work.
//
// An article's "city" is read from its first linked hotel/restaurant, same
// convention DestinationsList.tsx/RegionHub.tsx already use — content-
// pipeline only ever merges a new hotel/restaurant into an article when it
// shares that article's city (overlap-by-city is how it finds the existing
// article to merge into in the first place), so every entity linked to one
// article is always the same city; the first is as representative as any.
let cachedIndex: { byCity: Map<string, ArticleMatch[]>; cities: string[] } | null = null;
let inFlight: Promise<{ byCity: Map<string, ArticleMatch[]>; cities: string[] }> | null = null;

export async function fetchArticlesIndex(): Promise<{ byCity: Map<string, ArticleMatch[]>; cities: string[] }> {
  if (cachedIndex) return cachedIndex;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const { data: articles } = await supabase
        .from('seo_articles')
        .select('slug, title, content_type, hotel_ids, restaurant_ids')
        .eq('status', 'published');

      const rows = articles || [];
      const hotelIds = rows.filter((a) => a.content_type === 'hotel').map((a) => a.hotel_ids?.[0]).filter((id): id is string => Boolean(id));
      const restaurantIds = rows.filter((a) => a.content_type === 'restaurant').map((a) => a.restaurant_ids?.[0]).filter((id): id is string => Boolean(id));

      const [{ data: hotels }, { data: restaurants }] = await Promise.all([
        hotelIds.length > 0
          ? supabase.from('hotels').select('id, city').in('id', hotelIds)
          : Promise.resolve({ data: [] as { id: string; city: string }[] }),
        restaurantIds.length > 0
          ? supabase.from('restaurants').select('id, city').in('id', restaurantIds)
          : Promise.resolve({ data: [] as { id: string; city: string }[] }),
      ]);

      const hotelCityById = new Map((hotels || []).map((h) => [h.id, h.city]));
      const restaurantCityById = new Map((restaurants || []).map((r) => [r.id, r.city]));

      const byCity = new Map<string, ArticleMatch[]>();
      for (const article of rows) {
        const isHotel = article.content_type === 'hotel';
        const leadId = isHotel ? article.hotel_ids?.[0] : article.restaurant_ids?.[0];
        const city = leadId ? (isHotel ? hotelCityById.get(leadId) : restaurantCityById.get(leadId)) : undefined;
        if (!city) continue;

        const match: ArticleMatch = {
          slug: article.slug,
          title: article.title,
          contentType: isHotel ? 'hotel' : 'restaurant',
          city,
          path: isHotel ? `/destinations/${article.slug}/` : `/restaurants/${article.slug}/`,
        };

        const key = city.toLowerCase();
        const existing = byCity.get(key);
        if (existing) existing.push(match);
        else byCity.set(key, [match]);
      }

      const cities = [...byCity.keys()]
        .map((key) => byCity.get(key)![0].city)
        .sort((a, b) => a.localeCompare(b));

      const result = { byCity, cities };
      cachedIndex = result;
      return result;
    } catch (err) {
      console.error('fetchArticlesIndex error (non-fatal):', err);
      const empty = { byCity: new Map<string, ArticleMatch[]>(), cities: [] };
      return empty;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}
