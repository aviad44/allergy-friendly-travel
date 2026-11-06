import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// One-off maintenance function: backfills hero_image_url/hero_image_credit
// on published articles that predate the image-fetching feature in
// content-pipeline, plus any article stuck with a broken
// maps.googleapis.com/.../place/photo URL — content-pipeline briefly (until
// 2026-09-22) stored those raw Google Places photo URLs directly as
// hero_image_url for restaurant articles; they aren't meant to be hotlinked
// long-term like that and every one of them renders as a broken image
// (confirmed live: 400/403 or a tiny HTML error page instead of a photo).
// Also callable with a { slugs: [...] } body to re-pick a specific article's
// photo on demand (e.g. a distant-aerial shot that's technically not
// "broken" but reads as generic/unsales-y — see isDistantAerialShot below),
// regardless of whether its current hero_image_url is broken.
const BROKEN_GOOGLE_PHOTO_PATTERN = 'maps.googleapis.com/maps/api/place/photo%';

// Same photo-selection heuristics as content-pipeline/index.ts's
// fetchDestinationPhoto (kept as a separate copy since each Edge Function is
// a standalone Deno file with no shared module) — queries "{city} skyline",
// "{city} landmark", and plain "{city}", then filters out moody (sunset/fog)
// and distant aerial/drone shots before scoring the rest by
// brightness+saturation. A distant aerial panorama can score well on color
// alone while still reading as generic/unsales-y for a social thumbnail —
// confirmed live for Santiago and Bogota, which is what motivated adding
// this instead of the previous "just take the first Unsplash result" logic.
function hexBrightness(hex?: string | null): number {
  if (!hex) return 0;
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return 0;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function hexSaturation(hex?: string | null): number {
  if (!hex) return 0;
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return 0;
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function isMoodyPhoto(desc?: string | null): boolean {
  if (!desc) return false;
  return /sunset|sunrise|dusk|night|dark|silhouette|twilight|storm|foggy|fog|overcast|gloomy/i.test(desc);
}

function isDistantAerialShot(desc?: string | null): boolean {
  if (!desc) return false;
  return /aerial|drone|bird'?s[- ]eye|from above|overhead view|panoram|wide shot|cityscape/i.test(desc);
}

function photoScore(p: any): number {
  return hexBrightness(p.color) + hexSaturation(p.color);
}

function pickBestPhoto(results: any[]): any | null {
  if (results.length === 0) return null;
  const ideal = results.filter((p) => !isMoodyPhoto(p.alt_description) && !isDistantAerialShot(p.alt_description));
  const nonAerial = results.filter((p) => !isDistantAerialShot(p.alt_description));
  const pool = ideal.length > 0 ? ideal : nonAerial.length > 0 ? nonAerial : results;
  return pool.reduce((best, p) => (photoScore(p) > photoScore(best) ? p : best), pool[0]);
}

async function fetchUnsplashCandidates(query: string, accessKey: string): Promise<any[]> {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape&content_filter=high`,
    { headers: { Authorization: `Client-ID ${accessKey}` } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

// Real photo of the top-evidenced linked hotel/restaurant, sourced from its
// own website (not Google Places) — see content-pipeline/index.ts's copy of
// this logic for the full writeup on why this is a materially lower-risk
// case than the Google Places hotlinking that was removed 2026-09-22. Tried
// first; fetchCityPhoto below is the fallback when unavailable.
async function fetchOgImage(websiteUrl: string, timeoutMs = 6000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(websiteUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AllergyFreeTravelBot/1.0; +https://www.allergy-free-travel.com)' },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    const metaTag = (prop: string) => {
      const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i');
      const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i');
      return html.match(re1)?.[1] || html.match(re2)?.[1] || null;
    };
    const raw = metaTag('og:image') || metaTag('twitter:image');
    if (!raw) return null;
    return new URL(raw, websiteUrl).toString();
  } catch {
    return null;
  }
}

async function verifyImageLoads(url: string, timeoutMs = 6000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return false;
    return (res.headers.get('content-type') || '').startsWith('image/');
  } catch {
    return false;
  }
}

async function fetchBusinessWebsitePhoto(websiteUrl: string | null, businessName: string): Promise<{ url: string; credit: string } | null> {
  if (!websiteUrl) return null;
  const imageUrl = await fetchOgImage(websiteUrl);
  if (!imageUrl) return null;
  if (!(await verifyImageLoads(imageUrl))) return null;
  return { url: imageUrl, credit: `Photo courtesy of ${businessName}` };
}

async function pickLeadEntity(supabase: any, table: 'hotels' | 'restaurants', ids: string[]): Promise<{ name: string; website_url: string | null } | null> {
  if (!ids || ids.length === 0) return null;
  const { data } = await supabase
    .from(table)
    .select('name, website_url, allergy_score')
    .in('id', ids)
    .order('allergy_score', { ascending: false })
    .limit(1);
  return data?.[0] ?? null;
}

async function fetchCityPhoto(city: string, unsplashKey: string): Promise<{ url: string; credit: string } | null> {
  const [skylineResults, landmarkResults, cityResults] = await Promise.all([
    fetchUnsplashCandidates(`${city} skyline`, unsplashKey),
    fetchUnsplashCandidates(`${city} landmark`, unsplashKey),
    fetchUnsplashCandidates(city, unsplashKey),
  ]);
  const seen = new Set<string>();
  const merged = [...skylineResults, ...landmarkResults, ...cityResults].filter((p: any) => {
    if (!p?.id || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
  const photo = pickBestPhoto(merged);
  if (!photo) return null;

  try {
    await fetch(`${photo.links.download_location}&client_id=${unsplashKey}`);
  } catch (_) {
    // non-fatal
  }

  return {
    url: photo.urls.regular,
    credit: `Photo by ${photo.user.name} on Unsplash (${photo.links.html})`,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // Manual maintenance function, not on any schedule — but still reachable
  // by anyone who finds the URL without this check, burning Unsplash API
  // quota for no reason. Same shared-secret pattern as content-pipeline /
  // social-poster, sent via the x-cron-secret header when invoked manually.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const unsplashKey = Deno.env.get('UNSPLASH_ACCESS_KEY');

  if (!supabaseUrl || !supabaseKey || !unsplashKey) {
    return new Response(JSON.stringify({ error: 'Missing required environment configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let targetSlugs: string[] | null = null;
  try {
    const body = await req.json();
    if (Array.isArray(body?.slugs) && body.slugs.length > 0) targetSlugs = body.slugs;
  } catch {
    // no/invalid JSON body — fall through to the default broken/missing scan
  }

  try {
    let query = supabase
      .from('seo_articles')
      .select('id, slug, hotel_ids, restaurant_ids')
      .eq('status', 'published');

    query = targetSlugs
      ? query.in('slug', targetSlugs)
      : query.or(`hero_image_url.is.null,hero_image_url.ilike.%${BROKEN_GOOGLE_PHOTO_PATTERN}`);

    const { data: articles, error } = await query;

    if (error) throw error;

    const results: any[] = [];

    for (const article of articles || []) {
      let city = article.slug;
      let leadEntity: { name: string; website_url: string | null } | null = null;

      if (article.hotel_ids && article.hotel_ids.length > 0) {
        const { data: hotel } = await supabase
          .from('hotels')
          .select('city')
          .eq('id', article.hotel_ids[0])
          .single();
        if (hotel?.city) city = hotel.city;
        leadEntity = await pickLeadEntity(supabase, 'hotels', article.hotel_ids);
      } else if (article.restaurant_ids && article.restaurant_ids.length > 0) {
        const { data: restaurant } = await supabase
          .from('restaurants')
          .select('city')
          .eq('id', article.restaurant_ids[0])
          .single();
        if (restaurant?.city) city = restaurant.city;
        leadEntity = await pickLeadEntity(supabase, 'restaurants', article.restaurant_ids);
      }

      const businessPhoto = leadEntity ? await fetchBusinessWebsitePhoto(leadEntity.website_url, leadEntity.name) : null;
      const photo = businessPhoto || await fetchCityPhoto(city, unsplashKey);
      if (!photo) {
        results.push({ slug: article.slug, error: 'No Unsplash results' });
        continue;
      }

      const { error: updateErr } = await supabase
        .from('seo_articles')
        .update({ hero_image_url: photo.url, hero_image_credit: photo.credit, updated_at: new Date().toISOString() })
        .eq('id', article.id);

      if (updateErr) {
        results.push({ slug: article.slug, error: updateErr.message });
      } else {
        results.push({ slug: article.slug, heroImageUrl: photo.url, heroImageCredit: photo.credit });
      }
    }

    return new Response(JSON.stringify({ backfilled: results }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
