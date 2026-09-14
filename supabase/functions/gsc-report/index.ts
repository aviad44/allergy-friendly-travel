import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { JWT } from "npm:google-auth-library@9";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://www.allergy-free-travel.com';

// Search Console addresses a site as either a Domain property (sc-domain:…)
// or a URL-prefix property. This project's property is the URL-prefix form,
// matching the exact prefix buildCanonical() in src/utils/seo.ts settled on
// (trailing slash, see CLAUDE.md) — Search Console is strict about this
// matching the verified property exactly, or every call 403s.
const GSC_SITE_URL = `${SITE_URL}/`;

interface AnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

// Reporting-only integration: pulls real Search Console data into a place we
// can actually query (closing the "no GSC access, only screenshots the user
// pastes" gap noted in CLAUDE.md) and surfaces simple, human-checkable
// opportunities. Deliberately does NOT touch the Indexing API — that's
// restricted by Google's own terms to JobPosting/BroadcastEvent content,
// and using it for regular guide pages would be the same kind of
// terms-of-service problem this project just fixed for Google Places
// Photos. Nothing here writes to seo_articles or changes live content.

// GSC's own data is provisional for the most recent ~2-3 days (Google's
// documented processing delay) — a window ending "today" would undercount.
// A trailing 7-day window ending 3 days ago gives one full, stable week.
function reportingWindow(): { startDate: string; endDate: string } {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: fmt(start), endDate: fmt(end) };
}

async function getAccessToken(credentialsJson: string): Promise<string> {
  let credentials: { client_email?: string; private_key?: string };
  try {
    credentials = JSON.parse(credentialsJson);
  } catch {
    throw new Error('GOOGLE_SEARCH_CONSOLE_CREDENTIALS is not valid JSON — expected the full service-account key file content');
  }
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('GOOGLE_SEARCH_CONSOLE_CREDENTIALS is missing client_email/private_key');
  }
  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    // Read-only: this integration only ever reads GSC data, never submits
    // URLs, changes settings, or manages users.
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const token = await client.authorize();
  if (!token.access_token) throw new Error('Google did not return an access token — check the service account has been added as a Search Console user');
  return token.access_token;
}

async function fetchSearchAnalytics(accessToken: string, startDate: string, endDate: string): Promise<AnalyticsRow[]> {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, dimensions: ['page'], rowLimit: 1000 }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search Analytics API ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  return data.rows || [];
}

// Best-effort indexing spot-check via the URL Inspection API — read-only,
// same as Search Analytics. A failed inspection for one URL shouldn't stop
// the rest of the report, hence the try/catch returning an ERROR verdict
// string instead of throwing.
async function inspectUrl(accessToken: string, url: string): Promise<{ url: string; verdict: string; coverageState?: string }> {
  try {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_SITE_URL }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { url, verdict: `ERROR (${res.status}): ${text.slice(0, 200)}` };
    }
    const data = await res.json();
    const result = data.inspectionResult?.indexStatusResult;
    return { url, verdict: result?.verdict || 'UNKNOWN', coverageState: result?.coverageState };
  } catch (err) {
    return { url, verdict: `ERROR: ${err instanceof Error ? err.message : String(err)}` };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // Same posture as the other scheduled functions: meant to be triggered
  // only by the weekly GitHub Action, gated by a shared secret since the
  // anon key alone (public, bundled client-side) doesn't restrict access.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const gscCredentials = Deno.env.get('GOOGLE_SEARCH_CONSOLE_CREDENTIALS');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
  if (!gscCredentials) {
    return new Response(JSON.stringify({
      error: 'GOOGLE_SEARCH_CONSOLE_CREDENTIALS not configured',
      hint: 'Add a Google service-account JSON key as this Supabase secret, and add its client_email as a (read-only) user on the Search Console property first — see CLAUDE.md.',
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: logRow } = await supabase
    .from('pipeline_log')
    .insert({ run_type: 'gsc_report', status: 'running' })
    .select('id')
    .single();

  try {
    const accessToken = await getAccessToken(gscCredentials);
    const { startDate, endDate } = reportingWindow();
    const rows = await fetchSearchAnalytics(accessToken, startDate, endDate);

    // Upsert (not insert) so a re-run for the same window — a manual retry,
    // or this week's window happening to overlap a prior manual trigger —
    // replaces that window's numbers instead of duplicating rows.
    if (rows.length > 0) {
      const snapshotRows = rows.map((r) => ({
        page_url: r.keys[0],
        period_start: startDate,
        period_end: endDate,
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      }));
      const { error: upsertErr } = await supabase
        .from('seo_search_console_snapshots')
        .upsert(snapshotRows, { onConflict: 'page_url,period_start,period_end' });
      if (upsertErr) throw upsertErr;
    }

    // Simple, human-checkable heuristics — not a scored/ranked model. This
    // is a starting point to make GSC data visible at all (the gap this
    // function exists to close), not the final word on what to fix first.
    const lowCtr = rows
      .filter((r) => r.impressions >= 50 && r.position <= 15 && r.ctr < 0.02)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10)
      .map((r) => ({ page: r.keys[0], impressions: r.impressions, clicks: r.clicks, ctr: Math.round(r.ctr * 1000) / 10, position: Math.round(r.position * 10) / 10 }));

    const nearPageOne = rows
      .filter((r) => r.position > 10 && r.position <= 20 && r.impressions >= 20)
      .sort((a, b) => a.position - b.position)
      .slice(0, 10)
      .map((r) => ({ page: r.keys[0], impressions: r.impressions, position: Math.round(r.position * 10) / 10 }));

    const zeroClick = rows
      .filter((r) => r.impressions >= 20 && r.clicks === 0)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10)
      .map((r) => ({ page: r.keys[0], impressions: r.impressions, position: Math.round(r.position * 10) / 10 }));

    // Indexing spot-check: the homepage plus the most recently published
    // articles — content-pipeline publishes daily and until now there was
    // no visibility into whether Google actually indexes what gets
    // published, beyond the user manually checking Search Console.
    const { data: recentArticles } = await supabase
      .from('seo_articles')
      .select('slug, content_type')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3);

    const inspectionTargets = [
      GSC_SITE_URL,
      ...(recentArticles || []).map((a: { slug: string; content_type: string }) =>
        `${SITE_URL}/${a.content_type === 'restaurant' ? 'restaurants' : 'destinations'}/${a.slug}/`
      ),
    ];
    const indexingChecks = [];
    for (const url of inspectionTargets) {
      indexingChecks.push(await inspectUrl(accessToken, url));
    }
    const notIndexed = indexingChecks.filter((c) => c.verdict !== 'PASS');

    const summary = `Analyzed ${rows.length} pages for ${startDate}..${endDate}. `
      + `Opportunities — low-CTR: ${lowCtr.length}, near-page-1: ${nearPageOne.length}, zero-click: ${zeroClick.length}. `
      + `Indexing spot-check: ${indexingChecks.length - notIndexed.length}/${indexingChecks.length} PASS`
      + (notIndexed.length > 0 ? ` — not indexed: ${notIndexed.map((c) => `${c.url} (${c.verdict})`).join(', ')}` : '');

    await supabase.from('pipeline_log').update({
      status: 'success', error_message: summary, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);

    return new Response(JSON.stringify({
      period: { startDate, endDate },
      pagesAnalyzed: rows.length,
      opportunities: { lowCtr, nearPageOne, zeroClick },
      indexingChecks,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    await supabase.from('pipeline_log').update({
      status: 'error', error_message: message, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);
    console.error('gsc-report error:', err);
    return new Response(JSON.stringify({ error: 'gsc-report failed', message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
