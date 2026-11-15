// Pure analysis logic for the seo-geo-agent Edge Function. Deliberately has
// NO Deno/network imports so it can be unit-tested under plain Node
// (scripts/test-seo-geo-analyze.mjs) against HTML fixtures — the sandbox
// can't reach the live site, so this is the part that must be provable
// offline.
//
// "SEO" = classic ranking signals for Google and Bing (indexability,
// canonical/redirect hygiene, titles/descriptions, structured data).
// "GEO" (generative-engine optimization) = whether AI answer engines
// (ChatGPT search, Claude, Perplexity, Google AI Overviews, Bing Copilot)
// can fetch, extract, and confidently cite the page: content present in
// static HTML (they don't run JS), crawler access in robots.txt, llms.txt,
// answer-shaped structure, visible dates/authorship, and real outbound
// citations to primary sources.
//
// Every check here is something verifiable from the HTML itself. Nothing
// here generates or rewrites content — the project's no-fabrication policy
// (CLAUDE.md) means the agent reports problems, a human/PR fixes them.

export const SITE_URL = 'https://www.allergy-free-travel.com';

export type Severity = 'critical' | 'warning' | 'info';
export type Engine = 'google' | 'bing' | 'ai' | 'all';

export interface Issue {
  severity: Severity;
  code: string;
  engine: Engine;
  message: string;
}

export interface PageStats {
  titleLength: number;
  descriptionLength: number;
  h1Count: number;
  wordCount: number;
  jsonLdTypes: string[];
  externalLinks: number;
  internalLinks: number;
  questionHeadings: number;
}

export interface PageAudit {
  url: string;
  status: number;
  issues: Issue[];
  stats: PageStats | null;
  score: number;
  title?: string;
  description?: string;
}

// ---------- tiny HTML helpers (regex-based: no DOM in Deno edge runtime) ----------

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag))) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? '';
  return attrs;
}

function metaTags(html: string): Record<string, string>[] {
  return (html.match(/<meta\b[^>]*>/gi) || []).map(parseAttrs);
}

function metaContent(metas: Record<string, string>[], key: 'name' | 'property', value: string): string | undefined {
  return metas.find((m) => m[key]?.toLowerCase() === value)?.content;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function visibleText(html: string): string {
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

function parseJsonLd(html: string): { nodes: Record<string, unknown>[]; invalid: number } {
  const nodes: Record<string, unknown>[] = [];
  let invalid = 0;
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const queue = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of queue) {
        if (item && typeof item === 'object') {
          nodes.push(item as Record<string, unknown>);
          const graph = (item as Record<string, unknown>)['@graph'];
          if (Array.isArray(graph)) for (const g of graph) if (g && typeof g === 'object') nodes.push(g as Record<string, unknown>);
        }
      }
    } catch {
      invalid++;
    }
  }
  return { nodes, invalid };
}

function typesOf(node: Record<string, unknown>): string[] {
  const t = node['@type'];
  return Array.isArray(t) ? t.map(String) : t ? [String(t)] : [];
}

export function normalizeUrl(u: string): string {
  try {
    const url = new URL(u);
    url.hash = '';
    return url.toString();
  } catch {
    return u;
  }
}

// ---------- page classification ----------

export type PageKind = 'home' | 'article' | 'news' | 'faq' | 'other';

export function classifyPage(url: string): PageKind {
  let path = '/';
  try { path = new URL(url).pathname; } catch { /* keep default */ }
  if (path === '/' || path === '') return 'home';
  const segs = path.split('/').filter(Boolean);
  if (segs[0] === 'faq') return 'faq';
  if (segs[0] === 'news' && segs.length >= 2) return 'news';
  if ((segs[0] === 'destinations' || segs[0] === 'restaurants' || segs[0] === 'articles') && segs.length === 2) return 'article';
  return 'other';
}

// ---------- per-page audit ----------

const ARTICLE_TYPES = new Set(['Article', 'NewsArticle', 'BlogPosting', 'TravelGuide']);

export function auditPageHtml(url: string, html: string, status = 200): PageAudit {
  const issues: Issue[] = [];
  const add = (severity: Severity, code: string, engine: Engine, message: string) =>
    issues.push({ severity, code, engine, message });

  const kind = classifyPage(url);
  const metas = metaTags(html);

  // --- indexability ---
  const robotsMeta = (metaContent(metas, 'name', 'robots') || '').toLowerCase();
  if (/\bnoindex\b/.test(robotsMeta)) add('critical', 'noindex', 'all', 'Page has a robots noindex directive — it will not be indexed by Google, Bing, or AI search.');

  // --- title ---
  const titleRaw = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title = titleRaw ? decodeEntities(titleRaw).replace(/\s+/g, ' ').trim() : '';
  if (!title) add('critical', 'title-missing', 'all', 'Missing <title>.');
  else {
    if (title.length > 65) add('warning', 'title-long', 'google', `Title is ${title.length} chars (>65) — Google/Bing will truncate it in results.`);
    if (title.length < 20) add('warning', 'title-short', 'all', `Title is only ${title.length} chars — too thin to carry keywords.`);
  }

  // --- description ---
  const description = (metaContent(metas, 'name', 'description') || '').trim();
  if (!description) add('critical', 'description-missing', 'all', 'Missing meta description — Google/Bing write their own snippet and AI engines get no summary.');
  else {
    if (description.length > 160) add('warning', 'description-long', 'google', `Meta description is ${description.length} chars (>160) — will be truncated.`);
    if (description.length < 70) add('warning', 'description-short', 'all', `Meta description is only ${description.length} chars — under-uses the snippet.`);
  }

  // --- canonical (project policy: absolute, trailing slash, self-referencing) ---
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) || []).map(parseAttrs).find((a) => a.rel?.toLowerCase() === 'canonical');
  if (!canonicalTag?.href) add('critical', 'canonical-missing', 'all', 'Missing canonical link.');
  else if (normalizeUrl(canonicalTag.href) !== normalizeUrl(url)) {
    add('critical', 'canonical-mismatch', 'all', `Canonical is ${canonicalTag.href}, expected self-reference ${url} (trailing slash policy).`);
  }

  // --- basics ---
  if (!/<html\b[^>]*\blang=/i.test(html)) add('warning', 'html-lang-missing', 'all', '<html> has no lang attribute.');
  if (!metas.some((m) => m.name?.toLowerCase() === 'viewport')) add('warning', 'viewport-missing', 'google', 'Missing viewport meta (mobile-first indexing).');

  // --- headings ---
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count === 0) add('warning', 'h1-missing', 'all', 'No <h1> in static HTML.');
  if (h1Count > 1) add('warning', 'h1-multiple', 'all', `${h1Count} <h1> tags — should be exactly one.`);
  const headings = html.match(/<h[2-3]\b[^>]*>[\s\S]*?<\/h[2-3]>/gi) || [];
  const questionHeadings = headings.filter((h) => /\?\s*(<|$)/.test(decodeEntities(h.replace(/<[^>]+>/g, '')).trim() + '<')).length;

  // --- social / share cards (Bing + link previews also read these) ---
  for (const p of ['og:title', 'og:description', 'og:image']) {
    if (!metaContent(metas, 'property', p)) add('warning', `${p.replace(':', '-')}-missing`, 'all', `Missing ${p}.`);
  }
  if (!metaContent(metas, 'name', 'twitter:card')) add('info', 'twitter-card-missing', 'all', 'Missing twitter:card.');

  // --- static content (GEO's #1 prerequisite: AI crawlers do not run JS) ---
  const text = visibleText(html);
  const wordCount = text ? text.split(/\s+/).length : 0;
  if (wordCount < 50) {
    add('critical', 'no-static-content', 'ai', `Only ${wordCount} words in static HTML — AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't execute JS, so they see an empty shell. Check prerender.`);
  } else if ((kind === 'article' || kind === 'news') && wordCount < 300) {
    add('warning', 'thin-content', 'all', `Only ${wordCount} words of static content on a guide/news page — thin for ranking and for AI to quote.`);
  }

  // --- links ---
  let internalLinks = 0;
  let externalLinks = 0;
  const noSlashLinks: string[] = [];
  for (const a of html.match(/<a\b[^>]*>/gi) || []) {
    const href = parseAttrs(a).href;
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let abs: URL;
    try { abs = new URL(href, url); } catch { continue; }
    if (abs.origin === SITE_URL) {
      internalLinks++;
      const last = abs.pathname.split('/').pop() || '';
      if (abs.pathname !== '/' && !abs.pathname.endsWith('/') && !last.includes('.')) noSlashLinks.push(abs.pathname);
    } else if (/^https?:$/.test(abs.protocol)) {
      externalLinks++;
    }
  }
  if (noSlashLinks.length > 0) {
    add('warning', 'internal-link-no-trailing-slash', 'all', `${noSlashLinks.length} internal link(s) without trailing slash (each costs a 301 hop): ${[...new Set(noSlashLinks)].slice(0, 3).join(', ')}`);
  }
  if (kind !== 'home' && internalLinks < 3) add('warning', 'few-internal-links', 'google', `Only ${internalLinks} internal links — weak internal linking/discovery.`);

  // --- images ---
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((i) => parseAttrs(i).alt === undefined).length;
  if (noAlt > 0) add('info', 'img-alt-missing', 'google', `${noAlt} image(s) with no alt attribute.`);

  // --- structured data ---
  const { nodes, invalid } = parseJsonLd(html);
  if (invalid > 0) add('critical', 'jsonld-invalid', 'all', `${invalid} JSON-LD block(s) fail to parse — rich results and entity extraction lost.`);
  const jsonLdTypes = [...new Set(nodes.flatMap(typesOf))];
  const has = (...t: string[]) => t.some((x) => jsonLdTypes.includes(x));

  if (kind === 'home' && !has('Organization', 'WebSite')) add('warning', 'jsonld-org-missing', 'all', 'Homepage lacks Organization/WebSite JSON-LD (entity + sitelinks-search signals).');
  if (kind !== 'home' && !has('BreadcrumbList')) add('info', 'jsonld-breadcrumb-missing', 'google', 'No BreadcrumbList JSON-LD.');
  if (kind === 'faq' && !has('FAQPage')) add('warning', 'jsonld-faq-missing', 'ai', 'FAQ page has no FAQPage JSON-LD.');

  if (kind === 'article' || kind === 'news') {
    const art = nodes.find((n) => typesOf(n).some((t) => ARTICLE_TYPES.has(t)));
    if (!art) {
      add('warning', 'jsonld-article-missing', 'all', 'Guide/news page has no Article/NewsArticle JSON-LD.');
    } else {
      for (const f of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image']) {
        if (!art[f]) add('warning', `jsonld-article-${f}`, f === 'dateModified' || f === 'author' ? 'ai' : 'google', `Article JSON-LD lacks "${f}" — ${f === 'dateModified' ? 'freshness signal for Google/Bing/AI' : f === 'author' ? 'E-E-A-T attribution (YMYL-adjacent health topic)' : 'required for rich results'}.`);
      }
    }
  }

  // --- GEO: answer-shaped, citable content ---
  if (kind === 'article' || kind === 'news') {
    if (!/<time\b/i.test(html)) add('warning', 'no-visible-date', 'ai', 'No visible <time> element — AI engines weight dated, recently-updated sources.');
    if (!/<(ul|ol|table)\b/i.test(html)) add('info', 'no-lists-or-tables', 'ai', 'No lists/tables — structured blocks are what answer engines extract and quote.');
    if (questionHeadings === 0) add('info', 'no-question-headings', 'ai', 'No question-style H2/H3 — question headings map directly to the prompts people ask AI engines.');
    if (kind === 'news' && externalLinks === 0) add('warning', 'news-no-sources', 'ai', 'News page has no outbound source links (project policy: every factual claim links to a primary source).');
    if (kind === 'article' && externalLinks === 0) add('info', 'no-outbound-citations', 'ai', 'No outbound links — citing real sources raises trust for AI engines and readers.');
  }

  const crit = issues.filter((i) => i.severity === 'critical').length;
  const warn = issues.filter((i) => i.severity === 'warning').length;
  const info = issues.filter((i) => i.severity === 'info').length;
  const score = Math.max(0, 100 - crit * 15 - warn * 5 - info);

  return {
    url, status, issues, score, title, description,
    stats: {
      titleLength: title.length, descriptionLength: description.length, h1Count, wordCount,
      jsonLdTypes, externalLinks, internalLinks, questionHeadings,
    },
  };
}

// ---------- site-level: robots.txt, sitemap, llms.txt ----------

// Crawlers that matter for each engine. Blocking any of these silently
// removes the site from that engine's index/answers.
export const KEY_BOTS: { ua: string; engine: Engine; note: string }[] = [
  { ua: 'Googlebot', engine: 'google', note: 'Google Search' },
  { ua: 'Google-Extended', engine: 'ai', note: 'Gemini / AI Overviews grounding opt-in' },
  { ua: 'Bingbot', engine: 'bing', note: 'Bing Search + Copilot' },
  { ua: 'OAI-SearchBot', engine: 'ai', note: 'ChatGPT search results' },
  { ua: 'ChatGPT-User', engine: 'ai', note: 'ChatGPT live browsing' },
  { ua: 'GPTBot', engine: 'ai', note: 'OpenAI training/crawl' },
  { ua: 'ClaudeBot', engine: 'ai', note: 'Anthropic crawl' },
  { ua: 'Claude-SearchBot', engine: 'ai', note: 'Claude search' },
  { ua: 'PerplexityBot', engine: 'ai', note: 'Perplexity index' },
  { ua: 'Applebot-Extended', engine: 'ai', note: 'Apple Intelligence' },
];

interface RobotsGroup { agents: string[]; disallow: string[]; }

function parseRobots(text: string): { groups: RobotsGroup[]; sitemaps: string[]; crawlDelay: boolean } {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let crawlDelay = false;
  let cur: RobotsGroup | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (field === 'user-agent') {
      if (!cur || !lastWasAgent) { cur = { agents: [], disallow: [] }; groups.push(cur); }
      cur.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (field === 'disallow' && cur) cur.disallow.push(value);
      else if (field === 'sitemap') sitemaps.push(value);
      else if (field === 'crawl-delay') crawlDelay = true;
    }
  }
  return { groups, sitemaps, crawlDelay };
}

export function auditRobots(text: string): Issue[] {
  const issues: Issue[] = [];
  const { groups, sitemaps, crawlDelay } = parseRobots(text);
  if (sitemaps.length === 0) issues.push({ severity: 'warning', code: 'robots-no-sitemap', engine: 'all', message: 'robots.txt has no Sitemap: directive.' });
  for (const bot of KEY_BOTS) {
    const group = groups.find((g) => g.agents.includes(bot.ua.toLowerCase())) || groups.find((g) => g.agents.includes('*'));
    if (group?.disallow.some((d) => d === '/')) {
      issues.push({ severity: 'critical', code: `robots-blocks-${bot.ua.toLowerCase()}`, engine: bot.engine, message: `robots.txt disallows "/" for ${bot.ua} (${bot.note}).` });
    }
  }
  if (crawlDelay) issues.push({ severity: 'info', code: 'robots-crawl-delay', engine: 'bing', message: 'Crawl-delay is set: Bing honors it (slows indexing of a growing site); Google ignores it. Consider removing it unless the host is struggling.' });
  return issues;
}

export interface SitemapEntry { loc: string; lastmod?: string; }

export function parseSitemap(xml: string): SitemapEntry[] {
  const out: SitemapEntry[] = [];
  for (const block of xml.match(/<url\b[\s\S]*?<\/url>/gi) || []) {
    const loc = block.match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1];
    if (!loc) continue;
    out.push({ loc: decodeEntities(loc), lastmod: block.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i)?.[1] });
  }
  return out;
}

export function auditSitemap(entries: SitemapEntry[]): Issue[] {
  const issues: Issue[] = [];
  if (entries.length === 0) {
    issues.push({ severity: 'critical', code: 'sitemap-empty', engine: 'all', message: 'sitemap.xml has no <url> entries.' });
    return issues;
  }
  const noSlash = entries.filter((e) => {
    try { const p = new URL(e.loc).pathname; return p !== '/' && !p.endsWith('/'); } catch { return true; }
  });
  if (noSlash.length) issues.push({ severity: 'critical', code: 'sitemap-no-trailing-slash', engine: 'all', message: `${noSlash.length} sitemap URL(s) lack a trailing slash and would 301: ${noSlash.slice(0, 3).map((e) => e.loc).join(', ')}` });
  const noLastmod = entries.filter((e) => !e.lastmod).length;
  if (noLastmod) issues.push({ severity: 'warning', code: 'sitemap-no-lastmod', engine: 'bing', message: `${noLastmod} sitemap URL(s) have no <lastmod> — Bing relies on accurate lastmod to prioritize recrawls.` });
  const dupes = entries.length - new Set(entries.map((e) => e.loc)).size;
  if (dupes) issues.push({ severity: 'warning', code: 'sitemap-duplicates', engine: 'all', message: `${dupes} duplicate sitemap URL(s).` });
  // Every URL stamped with the same lastmod = lastmod is "now", not real.
  const distinct = new Set(entries.map((e) => (e.lastmod || '').slice(0, 10)).filter(Boolean));
  if (entries.length > 20 && distinct.size === 1) issues.push({ severity: 'warning', code: 'sitemap-lastmod-uniform', engine: 'google', message: 'Every URL has the same lastmod date — Google learns to ignore lastmod when it is not truthful.' });
  return issues;
}

export function auditLlmsTxt(text: string | null, sitemapLocs: Set<string>): Issue[] {
  if (text === null) return [{ severity: 'warning', code: 'llms-txt-missing', engine: 'ai', message: '/llms.txt not found.' }];
  const issues: Issue[] = [];
  const links = [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  const noSlash = links.filter((l) => { try { const p = new URL(l).pathname; return p !== '/' && !p.endsWith('/'); } catch { return false; } });
  if (noSlash.length) issues.push({ severity: 'warning', code: 'llms-txt-no-trailing-slash', engine: 'ai', message: `${noSlash.length} llms.txt link(s) lack a trailing slash (301 hop for every AI fetch): ${noSlash.slice(0, 3).join(', ')}` });
  if (sitemapLocs.size > 0) {
    const missing = links.filter((l) => { const n = l.endsWith('/') ? l : `${l}/`; return new URL(n).origin === SITE_URL && !sitemapLocs.has(n); });
    if (missing.length) issues.push({ severity: 'warning', code: 'llms-txt-not-in-sitemap', engine: 'ai', message: `${missing.length} llms.txt link(s) are not in sitemap.xml (dead or retired page?): ${missing.slice(0, 3).join(', ')}` });
  }
  const missingFromLlms = [...sitemapLocs].filter((l) => classifyPage(l) === 'news' && !links.some((x) => (x.endsWith('/') ? x : `${x}/`) === l));
  if (missingFromLlms.length) issues.push({ severity: 'info', code: 'llms-txt-missing-news', engine: 'ai', message: `${missingFromLlms.length} news article(s) in the sitemap are not listed in llms.txt: ${missingFromLlms.slice(0, 3).join(', ')}` });
  return issues;
}

// ---------- aggregation ----------

export interface TopFix {
  code: string; severity: Severity; engine: Engine; message: string;
  pagesAffected: number; impressionsAffected: number; examples: string[];
}

// Rank issues by how much real search traffic they sit on (GSC impressions),
// then by severity — so the first fix on the list is the one most worth
// doing, not just the one most common.
export function rankFixes(pages: PageAudit[], impressions: Map<string, number>): TopFix[] {
  const byCode = new Map<string, TopFix>();
  for (const p of pages) {
    for (const i of p.issues) {
      const f = byCode.get(i.code) || { code: i.code, severity: i.severity, engine: i.engine, message: i.message, pagesAffected: 0, impressionsAffected: 0, examples: [] };
      f.pagesAffected++;
      f.impressionsAffected += impressions.get(p.url) || 0;
      if (f.examples.length < 3) f.examples.push(p.url);
      byCode.set(i.code, f);
    }
  }
  const sev = { critical: 0, warning: 1, info: 2 } as const;
  return [...byCode.values()].sort((a, b) =>
    sev[a.severity] - sev[b.severity] || b.impressionsAffected - a.impressionsAffected || b.pagesAffected - a.pagesAffected);
}

export function findDuplicates(pages: PageAudit[]): Issue[] {
  const issues: Issue[] = [];
  for (const [field, code] of [['title', 'duplicate-title'], ['description', 'duplicate-description']] as const) {
    const seen = new Map<string, string[]>();
    for (const p of pages) {
      const v = (p[field] || '').toLowerCase();
      if (v) seen.set(v, [...(seen.get(v) || []), p.url]);
    }
    for (const urls of seen.values()) {
      if (urls.length > 1) issues.push({ severity: 'warning', code, engine: 'all', message: `${urls.length} pages share the same ${field}: ${urls.slice(0, 3).join(', ')}` });
    }
  }
  return issues;
}
