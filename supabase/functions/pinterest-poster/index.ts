import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// PINTEREST BACKLOG SWEEP
// ==========================================
// content-pipeline already pins each article the moment it's first
// published (see publishToPinterest there) — that keeps fresh content
// timely, which matters for Pinterest since its own search surfaces new
// pins on relevance signals fast. But that's fire-and-forget: it never
// retried a failure, and every article published before Pinterest was wired
// up (or before PINTEREST_* secrets existed) was never pinned at all —
// deliberately different from social-poster's Facebook/Instagram sweep,
// which by design only ever chases the newest article and never touches
// backlog. Pinterest content has long-tail value (a pin from months ago can
// still surface in search), so unlike FB/IG it's worth working through the
// backlog — just gradually, oldest first, so a burst of decades-old-looking
// activity doesn't look like spam and Trial-tier rate limits aren't an
// issue.
const BATCH_SIZE = 3;

async function refreshAccessToken(supabase: any, clientId: string, clientSecret: string): Promise<string | null> {
  const { data: authRow, error: authErr } = await supabase
    .from('pinterest_auth')
    .select('refresh_token')
    .eq('id', true)
    .single();
  if (authErr || !authRow) {
    console.error('Pinterest: no stored refresh token:', authErr?.message);
    return null;
  }

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const tokenRes = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: authRow.refresh_token }),
  });
  if (!tokenRes.ok) {
    console.error('Pinterest: token refresh failed:', tokenRes.status, await tokenRes.text());
    return null;
  }
  const tokenData = await tokenRes.json();
  const accessToken: string | undefined = tokenData.access_token;
  const newRefreshToken: string | undefined = tokenData.refresh_token;
  if (!accessToken) {
    console.error('Pinterest: token refresh returned no access_token');
    return null;
  }

  if (newRefreshToken && newRefreshToken !== authRow.refresh_token) {
    const { error: updateErr } = await supabase
      .from('pinterest_auth')
      .update({ refresh_token: newRefreshToken, updated_at: new Date().toISOString() })
      .eq('id', true);
    if (updateErr) console.error('Pinterest: failed to persist rotated refresh token:', updateErr.message);
  }

  return accessToken;
}

async function createPin(accessToken: string, boardId: string, params: { title: string; description: string; link: string; imageUrl: string }): Promise<{ ok: boolean; detail: string }> {
  const res = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board_id: boardId,
      title: params.title.slice(0, 100),
      description: params.description.slice(0, 500),
      link: params.link,
      media_source: { source_type: 'image_url', url: params.imageUrl },
    }),
  });
  const detail = await res.text();
  return { ok: res.ok, detail };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // Same posture as social-poster: meant to be triggered only by the
  // scheduled GitHub Action, gated by a shared secret since the anon key
  // alone (public, bundled client-side) doesn't restrict access.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const clientId = Deno.env.get('PINTEREST_CLIENT_ID');
  const clientSecret = Deno.env.get('PINTEREST_CLIENT_SECRET');
  const boardId = Deno.env.get('PINTEREST_BOARD_ID');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
  if (!clientId || !clientSecret || !boardId) {
    return new Response(JSON.stringify({ error: 'Missing PINTEREST_CLIENT_ID/PINTEREST_CLIENT_SECRET/PINTEREST_BOARD_ID' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: articles, error: fetchErr } = await supabase
    .from('seo_articles')
    .select('id, title, meta_description, slug, content_type, hero_image_url')
    .eq('status', 'published')
    .is('posted_to_pinterest_at', null)
    .not('hero_image_url', 'is', null) // Pinterest requires an image
    .order('published_at', { ascending: true }) // oldest first — working through the backlog
    .limit(BATCH_SIZE);

  if (fetchErr) {
    await supabase.from('pipeline_log').insert({
      run_type: 'pinterest_post', status: 'error', error_message: String(fetchErr), finished_at: new Date().toISOString(),
    });
    return new Response(JSON.stringify({ error: 'pinterest-poster failed', message: String(fetchErr) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  if (!articles || articles.length === 0) {
    console.log('Pinterest backlog sweep: nothing to post — caught up.');
    await supabase.from('pipeline_log').insert({
      run_type: 'pinterest_post', status: 'success', error_message: 'Backlog caught up — no unposted articles', finished_at: new Date().toISOString(),
    });
    return new Response(JSON.stringify({ message: 'Backlog caught up' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const accessToken = await refreshAccessToken(supabase, clientId, clientSecret);
  if (!accessToken) {
    await supabase.from('pipeline_log').insert({
      run_type: 'pinterest_post', status: 'error', error_message: 'Could not obtain Pinterest access token', finished_at: new Date().toISOString(),
    });
    return new Response(JSON.stringify({ error: 'Could not obtain Pinterest access token' }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const results: Array<{ slug: string; ok: boolean; detail?: string }> = [];

  for (const article of articles) {
    const basePath = article.content_type === 'restaurant' ? 'restaurants' : 'destinations';
    const link = `https://www.allergy-free-travel.com/${basePath}/${article.slug}`;

    const pinResult = await createPin(accessToken, boardId, {
      title: article.title,
      description: article.meta_description || article.title,
      link,
      imageUrl: article.hero_image_url,
    });

    if (pinResult.ok) {
      await supabase.from('seo_articles').update({ posted_to_pinterest_at: new Date().toISOString() }).eq('id', article.id);
      console.log(`✅ Pinterest: pinned "${article.slug}"`);
      results.push({ slug: article.slug, ok: true });
    } else {
      console.error(`❌ Pinterest: failed to pin "${article.slug}":`, pinResult.detail);
      results.push({ slug: article.slug, ok: false, detail: pinResult.detail });
    }
  }

  const pinnedCount = results.filter((r) => r.ok).length;
  await supabase.from('pipeline_log').insert({
    run_type: 'pinterest_post',
    status: pinnedCount > 0 ? 'success' : 'error',
    error_message: `Pinned ${pinnedCount}/${results.length}: ${JSON.stringify(results)}`,
    finished_at: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ pinned: pinnedCount, total: results.length, results }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
