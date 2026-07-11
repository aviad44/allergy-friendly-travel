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

function buildCaption(title: string, metaDescription: string, articleUrl: string): string {
  return `${title}\n\n${metaDescription}\n\nFull guide (link in profile / below): ${articleUrl}\n\n#AllergyFriendlyTravel #FoodAllergy #GlutenFreeTravel #CeliacTravel #TravelSafe`;
}

async function postToFacebook(pageId: string, pageToken: string, imageUrl: string, caption: string): Promise<{ ok: boolean; detail: string }> {
  const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: imageUrl, caption, access_token: pageToken }),
  });
  const body = await res.json();
  if (!res.ok) {
    console.error('Facebook post failed:', body);
    return { ok: false, detail: JSON.stringify(body).slice(0, 300) };
  }
  return { ok: true, detail: JSON.stringify(body) };
}

async function postToInstagram(igUserId: string, pageToken: string, imageUrl: string, caption: string): Promise<{ ok: boolean; detail: string }> {
  const createRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrl, caption, access_token: pageToken }),
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

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const unsplashKey = Deno.env.get('UNSPLASH_ACCESS_KEY');
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
      .select('id, title, meta_description, slug, hotel_ids, hero_image_url, hero_image_credit, posted_to_facebook_at, posted_to_instagram_at')
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

    const articleUrl = `${SITE_URL}/articles/${article.slug}`;

    // Resolve a real image: reuse one already fetched for this article, else search Unsplash
    // by the first cited hotel's city (falls back to the article title if no hotel is linked).
    let imageUrl = article.hero_image_url as string | null;
    let imageCredit = article.hero_image_credit as string | null;

    if (!imageUrl && unsplashKey) {
      let searchQuery = article.title;
      if (article.hotel_ids && article.hotel_ids.length > 0) {
        const { data: hotel } = await supabase
          .from('hotels')
          .select('city')
          .eq('id', article.hotel_ids[0])
          .maybeSingle();
        if (hotel?.city) searchQuery = `${hotel.city} travel`;
      }
      const photo = await fetchUnsplashPhoto(searchQuery, unsplashKey);
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

    const results: Record<string, string> = {};
    const errors: string[] = [];

    if (article.posted_to_facebook_at) {
      results.facebook = 'already posted';
    } else if (fbPageId && fbPageToken) {
      const fbResult = await postToFacebook(fbPageId, fbPageToken, imageUrl, caption);
      if (fbResult.ok) {
        await supabase.from('seo_articles').update({ posted_to_facebook_at: new Date().toISOString() }).eq('id', article.id);
        results.facebook = 'posted';
      } else {
        errors.push(`Facebook: ${fbResult.detail}`);
      }
    } else {
      errors.push('Facebook: FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN not configured');
    }

    if (article.posted_to_instagram_at) {
      results.instagram = 'already posted';
    } else if (igUserId && fbPageToken) {
      const igResult = await postToInstagram(igUserId, fbPageToken, imageUrl, caption);
      if (igResult.ok) {
        await supabase.from('seo_articles').update({ posted_to_instagram_at: new Date().toISOString() }).eq('id', article.id);
        results.instagram = 'posted';
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
