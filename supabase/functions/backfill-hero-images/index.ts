import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================================
// ONE-OFF TOOL — 2026-10-02
// ==========================================
// Backfills hero_image_url/hero_image_credit on any published article that
// doesn't have one (the 9 Christmas-market/holiday-season/ski-vacation
// articles published 2026-10-01 never got a hero image — their round was
// content-only by design, see CHANGELOG). Reuses fetchDestinationPhoto()
// and all its supporting quality filters (isMoodyPhoto, isDistantAerialShot,
// pickBestPhoto, hexBrightness/hexSaturation) verbatim from
// content-pipeline/index.ts — the same proven, 100%-success-rate source
// every other article's hero image already comes from. Unsplash first
// (with the required download-tracking ping + real photographer
// attribution per Unsplash's API guidelines), Pixabay as fallback — both
// free, properly licensed, attribution included in hero_image_credit, no
// Google Places involved at all so this doesn't touch the Google budget
// ceiling. Safe to delete/retire once the one-off backfill is done.
//
// Takes an explicit {slug, query} per call rather than inferring a query
// automatically from each article's linked hotels: single-destination
// articles (Boston, Cologne, Innsbruck, Montreal, New York, Strasbourg,
// Vienna) use their own city name, same as every other article site-wide;
// the two multi-country ski pillar articles (europe-ski-vacation,
// us-ski-vacation) use a representative "ski resort" query instead of one
// arbitrary sub-destination's city, since a single-city photo would
// misrepresent a continent-wide piece.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface UnsplashPhoto {
  url: string;
  credit: string;
}

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
  const searchRes = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape&content_filter=high`,
    { headers: { Authorization: `Client-ID ${accessKey}` } }
  );
  if (!searchRes.ok) {
    console.error('Unsplash search failed:', searchRes.status, await searchRes.text());
    return [];
  }
  const data = await searchRes.json();
  return data.results || [];
}

async function confirmUnsplashDownload(photo: any, accessKey: string) {
  try {
    await fetch(`${photo.links.download_location}&client_id=${accessKey}`);
  } catch (err) {
    console.error('Unsplash download ping failed (non-fatal):', err);
  }
}

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

// Same merged skyline+landmark+plain-query approach as content-pipeline's
// copy — see that file's comment for the full rationale (a single "skyline"
// search skews toward dusk/aerial shots for some cities).
async function fetchDestinationPhoto(query: string, unsplashKey?: string, pixabayKey?: string): Promise<UnsplashPhoto | null> {
  if (unsplashKey) {
    try {
      const [skylineResults, landmarkResults, plainResults] = await Promise.all([
        fetchUnsplashCandidates(`${query} skyline`, unsplashKey),
        fetchUnsplashCandidates(`${query} landmark`, unsplashKey),
        fetchUnsplashCandidates(query, unsplashKey),
      ]);
      const seen = new Set<string>();
      const merged = [...skylineResults, ...landmarkResults, ...plainResults].filter((p: any) => {
        if (!p?.id || seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
      const photo = pickBestPhoto(merged);
      if (photo) {
        await confirmUnsplashDownload(photo, unsplashKey);
        return {
          url: photo.urls.regular,
          credit: `Photo by ${photo.user.name} on Unsplash (${photo.links.html})`,
        };
      }
    } catch (err) {
      console.error('Unsplash destination photo error:', err);
    }
  }
  if (pixabayKey) {
    const photo = await fetchPixabayPhoto(query, pixabayKey);
    if (photo) return photo;
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { slug, query } = await req.json();
    if (!slug || !query) {
      return new Response(JSON.stringify({ error: 'slug and query are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const unsplashKey = Deno.env.get('UNSPLASH_ACCESS_KEY');
    const pixabayKey = Deno.env.get('PIXABAY_API_KEY');
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Missing environment configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: article } = await supabase
      .from('seo_articles')
      .select('id, slug, hero_image_url')
      .eq('slug', slug)
      .maybeSingle();

    if (!article) {
      return new Response(JSON.stringify({ error: `No article found with slug "${slug}"` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (article.hero_image_url) {
      return new Response(JSON.stringify({ skipped: true, reason: 'Article already has a hero image', slug }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const photo = await fetchDestinationPhoto(query, unsplashKey, pixabayKey);
    if (!photo) {
      return new Response(JSON.stringify({ found: false, slug, query }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { error: updateErr } = await supabase
      .from('seo_articles')
      .update({ hero_image_url: photo.url, hero_image_credit: photo.credit, updated_at: new Date().toISOString() })
      .eq('id', article.id);

    if (updateErr) {
      return new Response(JSON.stringify({ error: updateErr.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ found: true, slug, query, heroImageUrl: photo.url, heroImageCredit: photo.credit }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'backfill failed', message: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
