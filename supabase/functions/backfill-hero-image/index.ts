import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// One-off maintenance function: backfills hero_image_url/hero_image_credit
// on published articles that predate the image-fetching feature in
// content-pipeline. Uses the exact same Unsplash search + attribution logic.
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

  try {
    const { data: articles, error } = await supabase
      .from('seo_articles')
      .select('id, slug, hotel_ids')
      .eq('status', 'published')
      .is('hero_image_url', null);

    if (error) throw error;

    const results: any[] = [];

    for (const article of articles || []) {
      let city = article.slug;
      if (article.hotel_ids && article.hotel_ids.length > 0) {
        const { data: hotel } = await supabase
          .from('hotels')
          .select('city')
          .eq('id', article.hotel_ids[0])
          .single();
        if (hotel?.city) city = hotel.city;
      }

      const searchRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(`${city} travel`)}&per_page=1&orientation=landscape&content_filter=high`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` } }
      );
      if (!searchRes.ok) {
        results.push({ slug: article.slug, error: `Unsplash search failed: ${searchRes.status}` });
        continue;
      }
      const data = await searchRes.json();
      const photo = data.results?.[0];
      if (!photo) {
        results.push({ slug: article.slug, error: 'No Unsplash results' });
        continue;
      }

      try {
        await fetch(`${photo.links.download_location}&client_id=${unsplashKey}`);
      } catch (_) {
        // non-fatal
      }

      const heroImageUrl = photo.urls.regular;
      const heroImageCredit = `Photo by ${photo.user.name} on Unsplash (${photo.links.html})`;

      const { error: updateErr } = await supabase
        .from('seo_articles')
        .update({ hero_image_url: heroImageUrl, hero_image_credit: heroImageCredit, updated_at: new Date().toISOString() })
        .eq('id', article.id);

      if (updateErr) {
        results.push({ slug: article.slug, error: updateErr.message });
      } else {
        results.push({ slug: article.slug, heroImageUrl, heroImageCredit });
      }
    }

    return new Response(JSON.stringify({ backfilled: results }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
