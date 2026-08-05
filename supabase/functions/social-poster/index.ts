import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SITE_URL = 'https://www.allergy-free-travel.com';
const GRAPH_API_VERSION = 'v19.0';

interface UnsplashPhoto {
  url: string;
  credit: string;
}

// Unsplash API guidelines require: (1) attribution to photographer + Unsplash,
// (2) a "download" tracking ping when a photo is used in production.
async function fetchUnsplashPhoto(query: string, accessKey: string): Promise<UnsplashPhoto | null> {
  try {
    const searchRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!searchRes.ok) {
      console.error('Unsplash search failed:', searchRes.status, await searchRes.text());
      return null;
    }
    const data = await searchRes.json();
    const photo = data.results?.[0];
    if (!photo) return null;

    try {
      await fetch(`${photo.links.download_location}&client_id=${accessKey}`);
    } catch (err) {
      console.error('Unsplash download ping failed (non-fatal):', err);
    }

    return {
      url: photo.urls.regular,
      credit: `Photo by ${photo.user.name} on Unsplash (${photo.links.html})`,
    };
  } catch (err) {
    console.error('Unsplash fetch error:', err);
    return null;
  }
}

// Fallback when Unsplash has nothing good for a query — Pixabay's free tier
// (no attribution required by its Content License, kept here anyway for
// consistency with the Unsplash credit) covers the gap.
async function fetchPixabayPhoto(query: string, apiKey: string): Promise<UnsplashPhoto | null> {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`
    );
    if (!res.ok) {
      console.error('Pixabay search failed:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const hit = data.hits?.[0];
    if (!hit) return null;
    return { url: hit.largeImageURL, credit: `Photo by ${hit.user} on Pixabay` };
  } catch (err) {
    console.error('Pixabay fetch error:', err);
    return null;
  }
}

// A reliably attractive, recognizable shot of the destination itself beats a
// mediocre/irrelevant photo that's more narrowly "on topic" (e.g. a random
// plate of food) — skyline/landmark queries are what both providers do best,
// and Pixabay only gets tried if Unsplash has nothing.
async function fetchDestinationPhoto(city: string, unsplashKey?: string, pixabayKey?: string): Promise<UnsplashPhoto | null> {
  const query = `${city} skyline`;
  if (unsplashKey) {
    const photo = await fetchUnsplashPhoto(query, unsplashKey);
    if (photo) return photo;
  }
  if (pixabayKey) {
    const photo = await fetchPixabayPhoto(query, pixabayKey);
    if (photo) return photo;
  }
  return null;
}

function buildCaption(title: string, metaDescription: string, articleUrl: string): string {
  return `${title}\n\n${metaDescription}\n\nFull guide (link in profile / below): ${articleUrl}\n\n#AllergyFriendlyTravel #FoodAllergy #GlutenFreeTravel #CeliacTravel #TravelSafe`;
}

interface PlaceMatch {
  id: string;
  name: string;
}

// Resolves a destination name to a Facebook Place ID so posts can carry the
// same location tag a manually-created post would (e.g. "Ayia Napa, Cyprus"
// under the account name). Both the Facebook photo-post `place` param and
// Instagram's `location_id` param take this same kind of ID. Best-effort:
// Meta has restricted this search endpoint's public availability multiple
// times over the years and it may need extra Page permissions this token
// doesn't have — a failed or empty search just means the post goes out
// untagged, it never blocks the post itself.
async function findPlaceId(query: string, pageToken: string, lat?: number | null, lng?: number | null): Promise<PlaceMatch | null> {
  try {
    const params = new URLSearchParams({ type: 'place', q: query, access_token: pageToken });
    if (lat != null && lng != null) {
      params.set('center', `${lat},${lng}`);
      params.set('distance', '20000'); // city-scale radius, not street-scale
    }
    const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/search?${params.toString()}`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('Place search returned nothing for', query, ':', JSON.stringify(data).slice(0, 300));
      return null;
    }
    return { id: data.data[0].id, name: data.data[0].name };
  } catch (err) {
    console.error('Place search error (non-fatal):', err);
    return null;
  }
}

async function postToFacebook(pageId: string, pageToken: string, imageUrl: string, caption: string, placeId?: string | null): Promise<{ ok: boolean; detail: string }> {
  const body: Record<string, string> = { url: imageUrl, caption, access_token: pageToken };
  if (placeId) body.place = placeId;
  const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const resBody = await res.json();
  if (!res.ok) {
    console.error('Facebook post failed:', resBody);
    return { ok: false, detail: JSON.stringify(resBody).slice(0, 300) };
  }
  return { ok: true, detail: JSON.stringify(resBody) };
}

async function postToInstagram(igUserId: string, pageToken: string, imageUrl: string, caption: string, placeId?: string | null): Promise<{ ok: boolean; detail: string }> {
  const mediaRequest: Record<string, string> = { image_url: imageUrl, caption, access_token: pageToken };
  if (placeId) mediaRequest.location_id = placeId;
  const createRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mediaRequest),
  });
  const createBody = await createRes.json();
  if (!createRes.ok || !createBody.id) {
    console.error('Instagram media create failed:', createBody);
    return { ok: false, detail: `create: ${JSON.stringify(createBody).slice(0, 300)}` };
  }

  const publishRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: createBody.id, access_token: pageToken }),
  });
  const publishBody = await publishRes.json();
  if (!publishRes.ok) {
    console.error('Instagram publish failed:', publishBody);
    return { ok: false, detail: `publish: ${JSON.stringify(publishBody).slice(0, 300)}` };
  }
  return { ok: true, detail: JSON.stringify(publishBody) };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // This function posts to real Facebook/Instagram accounts using stored page
  // tokens — meant to be triggered only by the scheduled GitHub Action, not
  // by anyone who finds the URL. verify_jwt is off because the workflow
  // authenticates with the public anon key (committed in .env, bundled into
  // every visitor's browser), which doesn't gate access at all, so this
  // checks a separate shared secret the workflow sends explicitly.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const unsplashKey = Deno.env.get('UNSPLASH_ACCESS_KEY');
  const pixabayKey = Deno.env.get('PIXABAY_API_KEY');
  const fbPageId = Deno.env.get('FACEBOOK_PAGE_ID');
  const fbPageToken = Deno.env.get('FACEBOOK_PAGE_ACCESS_TOKEN');
  const igUserId = Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: logRow } = await supabase
    .from('pipeline_log')
    .insert({ run_type: 'social_post', status: 'running' })
    .select('id')
    .single();

  try {
    // Oldest published article still missing at least one platform's post (work through
    // the backlog in publish order; each platform tracked independently below).
    const { data: article, error: fetchErr } = await supabase
      .from('seo_articles')
      .select('id, title, meta_description, slug, content_type, hotel_ids, restaurant_ids, hero_image_url, hero_image_credit, posted_to_facebook_at, posted_to_instagram_at')
      .eq('status', 'published')
      .or('posted_to_facebook_at.is.null,posted_to_instagram_at.is.null')
      .order('published_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (fetchErr) throw fetchErr;

    if (!article) {
      await supabase.from('pipeline_log').update({
        status: 'success', error_message: 'No unposted published articles found', finished_at: new Date().toISOString(),
      }).eq('id', logRow.id);
      return new Response(JSON.stringify({ message: 'No unposted articles' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // content_type determines the live URL path — hotel guides live under
    // /destinations/, restaurant guides under /restaurants/ (the old shared
    // /articles/ path was removed when those categories were split/merged).
    const basePath = article.content_type === 'restaurant' ? 'restaurants' : 'destinations';
    const articleUrl = `${SITE_URL}/${basePath}/${article.slug}`;

    // Resolve the article's destination once — used both for the Unsplash
    // fallback search below and for the Facebook/Instagram location tag.
    // hotel guides key off the first cited hotel; restaurant guides off the
    // first cited restaurant (same table shape: city/country/lat/lng).
    let city: string | null = null;
    let country: string | null = null;
    let lat: number | null = null;
    let lng: number | null = null;
    const placeTable = article.content_type === 'restaurant' ? 'restaurants' : 'hotels';
    const placeIds = article.content_type === 'restaurant' ? article.restaurant_ids : article.hotel_ids;
    if (placeIds && placeIds.length > 0) {
      const { data: place } = await supabase
        .from(placeTable)
        .select('city, country, latitude, longitude')
        .eq('id', placeIds[0])
        .maybeSingle();
      if (place) {
        city = place.city?.trim() || null;
        country = place.country || null;
        lat = place.latitude ?? null;
        lng = place.longitude ?? null;
      }
    }

    // Resolve a real image: reuse one already fetched for this article, else search Unsplash
    // by the destination city (falls back to the article title if none is linked).
    let imageUrl = article.hero_image_url as string | null;
    let imageCredit = article.hero_image_credit as string | null;

    if (!imageUrl) {
      const photo = city
        ? await fetchDestinationPhoto(city, unsplashKey, pixabayKey)
        : (unsplashKey ? await fetchUnsplashPhoto(article.title, unsplashKey) : null);
      if (photo) {
        imageUrl = photo.url;
        imageCredit = photo.credit;
        await supabase.from('seo_articles').update({
          hero_image_url: imageUrl, hero_image_credit: imageCredit,
        }).eq('id', article.id);
      }
    }

    if (!imageUrl) {
      await supabase.from('pipeline_log').update({
        status: 'error', error_message: 'No image available (Unsplash key missing or search returned nothing)', finished_at: new Date().toISOString(),
      }).eq('id', logRow.id);
      return new Response(JSON.stringify({ error: 'No image available for this article' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const caption = buildCaption(article.title, article.meta_description || '', articleUrl);

    // Best-effort location tag — same Facebook Place ID system backs both
    // platforms' tagging, so one lookup covers both posts below.
    let place: PlaceMatch | null = null;
    if (city && fbPageToken) {
      const query = country ? `${city}, ${country}` : city;
      place = await findPlaceId(query, fbPageToken, lat, lng);
    }

    const results: Record<string, string> = {};
    const errors: string[] = [];

    if (article.posted_to_facebook_at) {
      results.facebook = 'already posted';
    } else if (fbPageId && fbPageToken) {
      const fbResult = await postToFacebook(fbPageId, fbPageToken, imageUrl, caption, place?.id);
      if (fbResult.ok) {
        await supabase.from('seo_articles').update({ posted_to_facebook_at: new Date().toISOString() }).eq('id', article.id);
        results.facebook = place ? `posted (tagged: ${place.name})` : 'posted (no location match)';
      } else {
        errors.push(`Facebook: ${fbResult.detail}`);
      }
    } else {
      errors.push('Facebook: FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN not configured');
    }

    if (article.posted_to_instagram_at) {
      results.instagram = 'already posted';
    } else if (igUserId && fbPageToken) {
      const igResult = await postToInstagram(igUserId, fbPageToken, imageUrl, caption, place?.id);
      if (igResult.ok) {
        await supabase.from('seo_articles').update({ posted_to_instagram_at: new Date().toISOString() }).eq('id', article.id);
        results.instagram = place ? `posted (tagged: ${place.name})` : 'posted (no location match)';
      } else {
        errors.push(`Instagram: ${igResult.detail}`);
      }
    } else {
      errors.push('Instagram: INSTAGRAM_BUSINESS_ACCOUNT_ID not configured');
    }

    const anySuccess = Object.keys(results).length > 0;
    await supabase.from('pipeline_log').update({
      status: anySuccess ? 'success' : 'error',
      error_message: errors.length > 0 ? errors.join(' | ') : null,
      finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);

    return new Response(JSON.stringify({
      article: { slug: article.slug, title: article.title },
      imageCredit,
      results,
      errors,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    await supabase.from('pipeline_log').update({
      status: 'error', error_message: String(error), finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);
    console.error('social-poster error:', error);
    return new Response(JSON.stringify({ error: 'social-poster failed', message: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
