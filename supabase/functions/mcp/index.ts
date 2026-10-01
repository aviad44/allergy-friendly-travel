import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// RETIRED — stubbed to 410, same pattern as verify-quote
// ==========================================
// This was a public, unauthenticated MCP server (list_destinations,
// get_destination_guide, search_hotels) built with Lovable.dev's MCP
// bundler, which inlines the entire src/data/destination-*.ts catalog into
// one deployed snapshot at build time. It was never rebuilt after the
// 2026-10-01 fabricated-quote cleanup, so it kept serving the exact
// invented guest-quote testimonials ("– Sophie T., UK", "– Michael R.,
// USA"...) that cleanup removed from the real source files — a live,
// active instance of the one thing CLAUDE.md says never to ship. Confirmed
// nothing on this site (no frontend code, no other Edge Function) calls
// this endpoint, so disabling it can't break anything internal — its only
// possible consumer is an external AI client someone pointed at this URL.
// Retire for good only once it's rebuilt from the current, clean
// destination-data and redeployed with Lovable's own MCP bundler (not
// something this tool can hand-regenerate).
serve((req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  return new Response(
    JSON.stringify({ error: 'This endpoint has been retired.' }),
    { status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
