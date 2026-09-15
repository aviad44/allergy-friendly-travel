import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GRAPH_API_VERSION = 'v19.0';

// One-off diagnostic: the user reported that Facebook's real Page only
// shows Los Angeles as the newest post, while our own posted_to_facebook_at
// timestamps say Miami/Boston/Seattle (and others) posted successfully
// weeks ago. This calls the Graph API directly (server-side, with the real
// page token) to see what Facebook itself currently has on record for this
// Page — posts, photos, and the token/page identity itself — rather than
// trusting our own DB's success flag. Read-only. Not wired into any
// schedule; invoke manually while investigating, remove once resolved.
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // Re-locked after the one-off investigation it was built for (see
  // CHANGELOG.md, 2026-09-15) — no MCP tool here can delete a deployed
  // Edge Function, so this stays locked behind the same shared-secret gate
  // as the other cron-only functions instead of being left reachable.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const fbPageId = Deno.env.get('FACEBOOK_PAGE_ID');
  const fbPageToken = Deno.env.get('FACEBOOK_PAGE_ACCESS_TOKEN');
  if (!fbPageId || !fbPageToken) {
    return new Response(JSON.stringify({ error: 'FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // Who/what does this token actually resolve to? A stale or wrong-page
  // token would explain writes succeeding against a page nobody looks at.
  const meRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/me?fields=id,name,link&access_token=${fbPageToken}`);
  const me = await meRes.json();

  const postsRes = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/posts?fields=id,message,created_time,permalink_url,status_type,is_published&limit=25&access_token=${fbPageToken}`
  );
  const posts = await postsRes.json();

  const photosRes = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/photos?type=uploaded&fields=id,created_time,link,name,picture&limit=25&access_token=${fbPageToken}`
  );
  const photos = await photosRes.json();

  return new Response(JSON.stringify({
    configuredPageId: fbPageId,
    tokenIdentity: me,
    recentPosts: posts,
    recentUploadedPhotos: photos,
  }, null, 2), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
