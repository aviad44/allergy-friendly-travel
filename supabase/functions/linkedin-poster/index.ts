import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SITE_URL = 'https://www.allergy-free-travel.com';
const LINKEDIN_API_VERSION = '202401';

interface NewArticle {
  title: string;
  city: string | null;
  country: string | null;
}

// LinkedIn's audience and algorithm reward business-toned observations, not
// consumer travel-inspiration copy — a weekly summary of what got added and
// why it's real (evidence-based, not marketing) fits how the platform is
// actually used, unlike a daily per-article post would.
function buildCaption(newArticles: NewArticle[], totalHotels: number, totalDestinations: number): string {
  const places = newArticles
    .map(a => a.city ? (a.country ? `${a.city}, ${a.country}` : a.city) : a.title)
    .filter((v, i, arr) => arr.indexOf(v) === i) // de-dupe (a "Spain" roundup article has no single city)
    .slice(0, 5);

  const countLine = newArticles.length === 1
    ? `This week we verified 1 new destination`
    : `This week we verified ${newArticles.length} new destinations`;

  return [
    `${countLine} for our allergy-friendly hotel and restaurant database${places.length > 0 ? `: ${places.join(', ')}` : ''}.`,
    '',
    `Every listing is built from a real, public review that specifically mentions a food allergy experience, not a marketing claim on a hotel's own website. Nothing is written or invented by us — if the only review we can find is negative, that stays too.`,
    '',
    `We now cover ${totalDestinations} destinations and ${totalHotels}+ verified hotels and restaurants worldwide.`,
    '',
    SITE_URL,
  ].join('\n');
}

async function postToLinkedIn(orgId: string, accessToken: string, text: string): Promise<{ ok: boolean; detail: string }> {
  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': LINKEDIN_API_VERSION,
    },
    body: JSON.stringify({
      author: `urn:li:organization:${orgId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('LinkedIn post failed:', res.status, body);
    return { ok: false, detail: `${res.status}: ${body.slice(0, 300)}` };
  }
  const postId = res.headers.get('x-restli-id') || '';
  return { ok: true, detail: postId };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // Meant to be triggered only by its weekly GitHub Action, same shared-secret
  // pattern as the other pipeline functions — see content-pipeline/index.ts
  // for the full rationale.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const orgId = Deno.env.get('LINKEDIN_ORGANIZATION_ID');
  const accessToken = Deno.env.get('LINKEDIN_ACCESS_TOKEN');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
  if (!orgId || !accessToken) {
    return new Response(JSON.stringify({ error: 'LINKEDIN_ORGANIZATION_ID / LINKEDIN_ACCESS_TOKEN not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: logRow } = await supabase
    .from('pipeline_log')
    .insert({ run_type: 'linkedin_post', status: 'running' })
    .select('id')
    .single();

  try {
    // Cutoff = the last successful LinkedIn post's start time, so this run
    // only summarizes what's genuinely new since then. First-ever run (no
    // prior success) falls back to the last 7 days rather than the entire
    // historical backlog in one post.
    const { data: lastPost } = await supabase
      .from('pipeline_log')
      .select('started_at')
      .eq('run_type', 'linkedin_post')
      .eq('status', 'success')
      .order('started_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const cutoff = lastPost?.started_at
      ? lastPost.started_at
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: newArticlesRaw, error: fetchErr } = await supabase
      .from('seo_articles')
      .select('id, title, content_type, hotel_ids, restaurant_ids')
      .eq('status', 'published')
      .gt('published_at', cutoff)
      .order('published_at', { ascending: true });

    if (fetchErr) throw fetchErr;

    if (!newArticlesRaw || newArticlesRaw.length === 0) {
      await supabase.from('pipeline_log').update({
        status: 'success', error_message: 'Nothing new since last LinkedIn post', finished_at: new Date().toISOString(),
      }).eq('id', logRow.id);
      return new Response(JSON.stringify({ message: 'Nothing new to post' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Resolve each new article's headline city/country the same way
    // social-poster does, for the caption's highlight list.
    const newArticles: NewArticle[] = [];
    for (const a of newArticlesRaw) {
      const placeTable = a.content_type === 'restaurant' ? 'restaurants' : 'hotels';
      const placeIds = a.content_type === 'restaurant' ? a.restaurant_ids : a.hotel_ids;
      let city: string | null = null;
      let country: string | null = null;
      if (placeIds && placeIds.length > 0) {
        const { data: place } = await supabase.from(placeTable).select('city, country').eq('id', placeIds[0]).maybeSingle();
        if (place) { city = place.city?.trim() || null; country = place.country || null; }
      }
      newArticles.push({ title: a.title, city, country });
    }

    const [{ count: totalDestinations }, { count: totalHotels }] = await Promise.all([
      supabase.from('seo_articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('hotels').select('*', { count: 'exact', head: true }).eq('active', true),
    ]);

    const caption = buildCaption(newArticles, totalHotels || 0, totalDestinations || 0);
    const result = await postToLinkedIn(orgId, accessToken, caption);

    await supabase.from('pipeline_log').update({
      status: result.ok ? 'success' : 'error',
      error_message: result.ok ? null : result.detail,
      finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);

    if (!result.ok) {
      return new Response(JSON.stringify({ error: 'LinkedIn post failed', detail: result.detail }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      posted: true,
      newArticlesCount: newArticles.length,
      caption,
      linkedinPostId: result.detail,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    await supabase.from('pipeline_log').update({
      status: 'error', error_message: String(error), finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);
    console.error('linkedin-poster error:', error);
    return new Response(JSON.stringify({ error: 'linkedin-poster failed', message: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
