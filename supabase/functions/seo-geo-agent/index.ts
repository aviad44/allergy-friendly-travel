import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  SITE_URL, auditPageHtml, auditRobots, auditSitemap, auditLlmsTxt, parseSitemap,
  findDuplicates, rankFixes, type PageAudit, type Issue,
} from "./analyze.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SEO + GEO audit agent. Report-only by design, same posture as gsc-report:
//  - crawls ONLY our own public site (no paid APIs → zero impact on the
//    Google Places / Tripadvisor cost ceilings in CLAUDE.md);
//  - never writes to seo_articles or changes live content (the
//    no-fabrication policy: it reports problems, a human/PR fixes them);
//  - the one outward action, IndexNow (tells Bing/Yandex/others which URLs
//    changed), is OFF unless the caller asks for it AND INDEXNOW_KEY is
//    configured AND the key file is verifiably served from our own domain.
// Findings are ranked by real Search Console impressions (from the
// seo_search_console_snapshots table gsc-report fills) so the first item is
// the fix that sits on the most actual traffic.

const UA = 'AllergyFreeTravel-SEO-Agent/1.0 (+https://www.allergy-free-travel.com/)';
const DEFAULT_MAX_PAGES = 40;   // 150s Edge Function idle limit — keep the crawl bounded
const CONCURRENCY = 6;
const FETCH_TIMEOUT_MS = 12_000;

async function fetchText(url: string, redirect: RequestRedirect = 'follow'): Promise<{ status: number; text: string; location?: string }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' }, redirect, signal: ctrl.signal });
    return { status: res.status, text: await res.text(), location: res.headers.get('location') || undefined };
  } finally {
    clearTimeout(t);
  }
}

async function auditPage(url: string): Promise<PageAudit> {
  try {
    // redirect:'manual' on purpose — a sitemap URL that redirects is itself
    // a defect (the exact 2026-09-07 canonical/redirect bug in CHANGELOG.md).
    const res = await fetchText(url, 'manual');
    if (res.status >= 300 && res.status < 400) {
      return { url, status: res.status, score: 0, stats: null, issues: [{ severity: 'critical', code: 'sitemap-url-redirects', engine: 'all', message: `Sitemap URL returns ${res.status} → ${res.location}. Sitemap/canonical URLs must resolve with 200.` }] };
    }
    if (res.status !== 200) {
      return { url, status: res.status, score: 0, stats: null, issues: [{ severity: 'critical', code: 'http-error', engine: 'all', message: `HTTP ${res.status}.` }] };
    }
    return auditPageHtml(url, res.text, res.status);
  } catch (err) {
    return { url, status: 0, score: 0, stats: null, issues: [{ severity: 'critical', code: 'fetch-failed', engine: 'all', message: `Fetch failed: ${err instanceof Error ? err.message : String(err)}` }] };
  }
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  }));
  return out;
}

// IndexNow: public protocol (Bing, Yandex, Naver, Seznam…). The key is NOT
// a secret by design — it must be publicly served at keyLocation so the
// engine can verify we own the host. We verify that ourselves first and
// skip (rather than fail) if it isn't set up yet.
async function submitIndexNow(urls: string[]): Promise<{ status: string; submitted: number; detail?: string }> {
  const key = Deno.env.get('INDEXNOW_KEY');
  if (!key) return { status: 'skipped', submitted: 0, detail: 'INDEXNOW_KEY secret not set' };
  const keyLocation = `${SITE_URL}/${key}.txt`;
  try {
    const check = await fetchText(keyLocation);
    if (check.status !== 200 || check.text.trim() !== key) {
      return { status: 'skipped', submitted: 0, detail: `key file at ${keyLocation} not served correctly (HTTP ${check.status}) — deploy public/${key}.txt first` };
    }
  } catch (err) {
    return { status: 'skipped', submitted: 0, detail: `key file check failed: ${err instanceof Error ? err.message : String(err)}` };
  }
  if (urls.length === 0) return { status: 'skipped', submitted: 0, detail: 'no URLs changed in the window' };
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation, urlList: urls.slice(0, 100) }),
  });
  // 200/202 = accepted. Anything else is reported, never retried blindly.
  return res.status === 200 || res.status === 202
    ? { status: 'submitted', submitted: Math.min(urls.length, 100) }
    : { status: 'failed', submitted: 0, detail: `IndexNow HTTP ${res.status}` };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  let body: { max_pages?: number; submit_indexnow?: boolean; indexnow_days?: number } = {};
  try { body = await req.json(); } catch { /* empty body is fine */ }
  const maxPages = Math.min(Math.max(Number(body.max_pages) || DEFAULT_MAX_PAGES, 5), 80);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: logRow } = await supabase
    .from('pipeline_log').insert({ run_type: 'seo_geo_audit', status: 'running' }).select('id').single();

  try {
    // ---- site-level files ----
    const [robotsRes, sitemapRes, llmsRes] = await Promise.all([
      fetchText(`${SITE_URL}/robots.txt`),
      fetchText(`${SITE_URL}/sitemap.xml`),
      fetchText(`${SITE_URL}/llms.txt`),
    ]);
    const siteIssues: Issue[] = [];
    if (robotsRes.status !== 200) siteIssues.push({ severity: 'critical', code: 'robots-missing', engine: 'all', message: `robots.txt returned HTTP ${robotsRes.status}.` });
    else siteIssues.push(...auditRobots(robotsRes.text));

    const entries = sitemapRes.status === 200 ? parseSitemap(sitemapRes.text) : [];
    if (sitemapRes.status !== 200) siteIssues.push({ severity: 'critical', code: 'sitemap-unreachable', engine: 'all', message: `sitemap.xml returned HTTP ${sitemapRes.status}.` });
    else siteIssues.push(...auditSitemap(entries));

    const locs = new Set(entries.map((e) => e.loc));
    siteIssues.push(...auditLlmsTxt(llmsRes.status === 200 ? llmsRes.text : null, locs));

    // ---- pick pages: home first, then by real GSC impressions, then newest lastmod ----
    const impressions = new Map<string, number>();
    const { data: latest } = await supabase
      .from('seo_search_console_snapshots').select('period_end').order('period_end', { ascending: false }).limit(1);
    if (latest?.[0]) {
      const { data: snap } = await supabase
        .from('seo_search_console_snapshots').select('page_url, impressions')
        .eq('period_end', latest[0].period_end).limit(1000);
      for (const r of snap || []) impressions.set(r.page_url, r.impressions || 0);
    }
    const ranked = [...entries].sort((a, b) =>
      (impressions.get(b.loc) || 0) - (impressions.get(a.loc) || 0) ||
      (b.lastmod || '').localeCompare(a.lastmod || ''));
    const home = `${SITE_URL}/`;
    const targets = [home, ...ranked.map((e) => e.loc).filter((u) => u !== home)].slice(0, maxPages);

    const pages = await mapLimit(targets, CONCURRENCY, auditPage);
    siteIssues.push(...findDuplicates(pages));

    const fixes = rankFixes(pages, impressions);
    const avgScore = pages.length ? Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length) : 0;
    const count = (sev: string) => fixes.filter((f) => f.severity === sev).length + siteIssues.filter((i) => i.severity === sev).length;

    // ---- optional IndexNow ----
    let indexNow: { status: string; submitted: number; detail?: string } = { status: 'not-requested', submitted: 0 };
    if (body.submit_indexnow) {
      const days = Math.min(Math.max(Number(body.indexnow_days) || 7, 1), 30);
      const cutoff = new Date(Date.now() - days * 86_400_000).toISOString();
      const changed = entries.filter((e) => e.lastmod && e.lastmod >= cutoff).map((e) => e.loc);
      indexNow = await submitIndexNow(changed);
    }

    const summary = `Audited ${pages.length}/${entries.length} sitemap pages, avg score ${avgScore}/100. `
      + `Issue types — critical: ${count('critical')}, warning: ${count('warning')}, info: ${count('info')}. `
      + `Top fix: ${fixes[0] ? `${fixes[0].code} (${fixes[0].pagesAffected} pages)` : 'none'}. IndexNow: ${indexNow.status}.`;
    await supabase.from('pipeline_log').update({
      status: 'success', error_message: summary, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);

    return new Response(JSON.stringify({
      summary,
      avgScore,
      pagesAudited: pages.length,
      sitemapUrls: entries.length,
      siteIssues,
      topFixes: fixes.slice(0, 25),
      worstPages: [...pages].sort((a, b) => a.score - b.score).slice(0, 10).map((p) => ({ url: p.url, score: p.score, issues: p.issues.map((i) => i.code) })),
      indexNow,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    await supabase.from('pipeline_log').update({
      status: 'error', error_message: message, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);
    console.error('seo-geo-agent error:', err);
    return new Response(JSON.stringify({ error: 'seo-geo-agent failed', message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
