import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// RESTAURANT-GUIDE HERO PHOTO (live, Google Places)
// ==========================================
// Returns a real photo of one of the restaurants a restaurant guide actually
// reviews, so the page's hero image shows a place from the article instead
// of a generic Unsplash city shot.
//
// Why live, on every page view, instead of downloading once and storing it:
// Google's Places API terms don't allow caching/storing Places content —
// photos and photo names included — apart from the place ID itself (which
// may be stored indefinitely, and is the only thing we persist, in
// restaurants.google_place_id). The previous attempt (fetchRestaurantDishPhoto,
// removed 2026-09-22) stored a keyed photo URL in seo_articles and broke on
// 17/26 articles; storing the image bytes in Supabase Storage instead would
// fix the breakage but still break the terms. So each view fetches a fresh,
// short-lived photo URL (no API key in it) and the page shows the
// contributor attribution + "Google Maps" next to it, as the terms require.
// The photo is for on-site display only — og:image and FB/IG/Pinterest keep
// the article's Unsplash/Pixabay hero_image_url (see CLAUDE.md).
//
// Cost: every call here is a billed Google call, so it's logged to
// search_log (mode 'article_photo') and gated twice, failing closed:
//   1. its own ₪30/month sub-ceiling (user-approved 2026-09-29), and
//   2. the shared ₪100/month Google ceiling hotel-search/restaurants-search
//      enforce — both of those now count 'article_photo' rows too, so the
//      total across all three can't exceed ₪100.
// When either trips, this returns { photo: null } and the page keeps its
// Unsplash hero — the page never breaks.
const PHOTO_MONTHLY_BUDGET_ILS = 30;
const TOTAL_MONTHLY_BUDGET_ILS = 100;
const BUDGET_SAFETY_MARGIN = 0.9;
// Same invoice-calibrated blended rate as hotel-search/restaurants-search.
// Conservative for the new-API path (Place Photo list price is ~$7/1000 ≈
// ₪0.026, and the IDs-only Details lookup is free) — recalibrate once a
// real invoice shows this SKU.
const COST_PER_CALL_ILS = 0.0342;
const MAX_RESTAURANTS_TRIED = 3;
const PHOTO_MAX_WIDTH_PX = 1200;

// Set once the new API has failed in this isolate (e.g. Places API (New)
// not enabled on the key's project), so later views go straight to legacy.
let newApiUnavailable = false;

interface Attribution { name: string; uri: string | null }
interface PhotoResult { url: string; attributions: Attribution[] }

async function budgetStatus(supabase: any): Promise<{ blocked: boolean; reason?: string }> {
  try {
    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('search_log')
      .select('mode, google_calls_count')
      .in('mode', ['hotels_fast', 'fast', 'article_photo'])
      .eq('cache_hit', false)
      .gte('created_at', monthStart.toISOString());

    if (error || !data) return { blocked: true, reason: 'budget_unverifiable' };

    let totalCalls = 0;
    let photoCalls = 0;
    for (const row of data) {
      totalCalls += row.google_calls_count || 0;
      if (row.mode === 'article_photo') photoCalls += row.google_calls_count || 0;
    }
    if (photoCalls * COST_PER_CALL_ILS >= PHOTO_MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN) {
      return { blocked: true, reason: 'photo_budget_reached' };
    }
    if (totalCalls * COST_PER_CALL_ILS >= TOTAL_MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN) {
      return { blocked: true, reason: 'google_budget_reached' };
    }
    return { blocked: false };
  } catch (_err) {
    return { blocked: true, reason: 'budget_unverifiable' };
  }
}

// One-time per restaurant: restaurants rows don't come with a place ID, so
// it's resolved here on first view and saved (place IDs are the one thing
// the terms allow storing). Biased to the stored coordinates so a
// same-named place elsewhere in the city can't win.
async function resolvePlaceId(r: any, apiKey: string): Promise<string | null> {
  const params = new URLSearchParams({
    input: `${r.name} ${r.city || ''}`.trim(),
    inputtype: 'textquery',
    fields: 'place_id',
    key: apiKey,
  });
  if (r.latitude != null && r.longitude != null) {
    params.set('locationbias', `circle:300@${r.latitude},${r.longitude}`);
  }
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.candidates?.[0]?.place_id ?? null;
}

// Places API (New): IDs-only Details (photos field) + one Place Photo call.
// Returns calls counted as billable, or null if the new API isn't usable
// (e.g. not enabled on the key's project) so the caller can fall back.
async function photoViaNewApi(placeId: string, apiKey: string): Promise<{ photo: PhotoResult | null; calls: number } | null> {
  const detailsRes = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'photos' },
  });
  if (!detailsRes.ok) {
    console.log('Places (New) details failed:', detailsRes.status, (await detailsRes.text()).slice(0, 300));
    return null;
  }
  const details = await detailsRes.json();
  const first = details?.photos?.[0];
  if (!first?.name) return { photo: null, calls: 0 };

  const mediaRes = await fetch(
    `https://places.googleapis.com/v1/${first.name}/media?maxWidthPx=${PHOTO_MAX_WIDTH_PX}&skipHttpRedirect=true`,
    { headers: { 'X-Goog-Api-Key': apiKey } },
  );
  if (!mediaRes.ok) {
    console.log('Places (New) photo media failed:', mediaRes.status);
    return { photo: null, calls: 1 };
  }
  const media = await mediaRes.json();
  if (!media?.photoUri) return { photo: null, calls: 1 };

  const attributions: Attribution[] = (first.authorAttributions || [])
    .filter((a: any) => a?.displayName)
    .map((a: any) => ({ name: a.displayName, uri: a.uri || null }));
  return { photo: { url: media.photoUri, attributions }, calls: 1 };
}

// Legacy Places API fallback (the API every other function here already
// uses): Details(photos) + Photo, resolving the 302 ourselves so the URL we
// hand the browser never contains the API key.
async function photoViaLegacyApi(placeId: string, apiKey: string): Promise<{ photo: PhotoResult | null; calls: number }> {
  const detailsRes = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=photos&key=${apiKey}`,
  );
  const details = detailsRes.ok ? await detailsRes.json() : null;
  const first = details?.result?.photos?.[0];
  if (!first?.photo_reference) return { photo: null, calls: 1 };

  const photoRes = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${PHOTO_MAX_WIDTH_PX}&photo_reference=${encodeURIComponent(first.photo_reference)}&key=${apiKey}`,
    { redirect: 'manual' },
  );
  const location = photoRes.headers.get('location');
  await photoRes.body?.cancel();
  if (!location || !location.startsWith('https://') || location.includes('key=')) return { photo: null, calls: 2 };

  const attributions: Attribution[] = (first.html_attributions || []).map((html: string) => {
    const href = html.match(/href="([^"]+)"/)?.[1] || null;
    const name = html.replace(/<[^>]*>/g, '').trim();
    return { name, uri: href };
  }).filter((a: Attribution) => a.name);
  return { photo: { url: location, attributions }, calls: 2 };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const started = Date.now();
  const slug = new URL(req.url).searchParams.get('slug') || '';
  if (!/^[a-z0-9-]{1,150}$/.test(slug)) return json({ photo: null, reason: 'bad_slug' }, 400);

  const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!apiKey || !supabaseUrl || !serviceKey) return json({ photo: null, reason: 'not_configured' });
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: article } = await supabase
    .from('seo_articles')
    .select('restaurant_ids')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('content_type', 'restaurant')
    .maybeSingle();
  const ids: string[] = article?.restaurant_ids || [];
  if (ids.length === 0) return json({ photo: null, reason: 'no_restaurants' });

  const budget = await budgetStatus(supabase);
  if (budget.blocked) return json({ photo: null, reason: budget.reason });

  const { data: rows } = await supabase
    .from('restaurants')
    .select('id, name, city, latitude, longitude, google_place_id')
    .in('id', ids)
    .eq('active', true);
  // Keep the article's own order, so the photo is of the guide's top pick
  // whenever that place has one.
  const ordered = ids.map((id) => rows?.find((r: any) => r.id === id)).filter(Boolean).slice(0, MAX_RESTAURANTS_TRIED);

  let calls = 0;
  let result: (PhotoResult & { restaurantName: string; placeId: string }) | null = null;

  try {
    for (const r of ordered as any[]) {
      let placeId: string | null = r.google_place_id;
      if (!placeId) {
        placeId = await resolvePlaceId(r, apiKey);
        calls++;
        if (!placeId) continue;
        await supabase.from('restaurants').update({ google_place_id: placeId }).eq('id', r.id);
      }

      let attempt: { photo: PhotoResult | null; calls: number } | null = null;
      if (!newApiUnavailable) {
        attempt = await photoViaNewApi(placeId, apiKey);
        if (attempt === null) newApiUnavailable = true;
      }
      if (attempt === null) attempt = await photoViaLegacyApi(placeId, apiKey);
      calls += attempt.calls;

      if (attempt.photo) {
        result = { ...attempt.photo, restaurantName: r.name, placeId };
        break;
      }
    }
  } catch (err) {
    console.error('article-hero-photo error:', err);
  }

  await supabase.from('search_log').insert({
    search_id: `photo-${started}-${Math.random().toString(36).slice(2, 8)}`,
    destination: slug,
    mode: 'article_photo',
    google_calls_count: calls,
    results_returned: result ? 1 : 0,
    cache_hit: false,
    duration_ms: Date.now() - started,
  });

  if (!result) return json({ photo: null, reason: 'no_photo' });
  return json({
    photo: {
      url: result.url,
      attributions: result.attributions,
      restaurantName: result.restaurantName,
      mapsUrl: `https://www.google.com/maps/place/?q=place_id:${result.placeId}`,
    },
  });
});
