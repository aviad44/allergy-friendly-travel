// Offline test for the seo-geo-agent's pure analysis logic. The sandbox can't
// reach the live site, so correctness has to be provable against fixtures.
//   node scripts/test-seo-geo-analyze.mjs
import assert from 'node:assert/strict';
import {
  auditPageHtml, auditRobots, auditSitemap, auditLlmsTxt, parseSitemap, rankFixes, classifyPage,
} from '../supabase/functions/seo-geo-agent/analyze.ts';

const B = 'https://www.allergy-free-travel.com';
const codes = (a) => a.issues.map((i) => i.code);
const words = (n) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ');

// --- a well-formed guide page should be clean of critical issues ---
const good = `<!doctype html><html lang="en"><head>
<title>Allergy-Friendly Hotels in Rome: Real Guest Evidence</title>
<meta name="description" content="Rome hotels where real guests reported safe handling of gluten, nut and dairy allergies, with quotes from verified Google reviews and booking links.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="${B}/destinations/rome-guide/">
<meta property="og:title" content="t"><meta property="og:description" content="d"><meta property="og:image" content="https://x/y.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
 {"@type":"Article","headline":"h","datePublished":"2026-01-01","dateModified":"2026-02-01","author":{"@type":"Organization","name":"a"},"publisher":{"@type":"Organization","name":"p"},"image":"https://x/y.png"},
 {"@type":"BreadcrumbList","itemListElement":[]}]}</script>
</head><body><h1>Rome</h1><time datetime="2026-02-01">Feb 1</time>
<h2>Which Rome hotels handle celiac disease well?</h2><ul><li>a</li></ul>
<p>${words(400)}</p>
<a href="/destinations/">a</a><a href="/restaurants/">b</a><a href="/about/">c</a>
<a href="https://www.faa.gov/x">source</a><img src="a.png" alt="a"></body></html>`;
const g = auditPageHtml(`${B}/destinations/rome-guide/`, good);
assert.deepEqual(g.issues.filter((i) => i.severity !== 'info'), [], JSON.stringify(g.issues));
assert.equal(g.stats.questionHeadings, 1);

// --- broken page: every important defect is caught ---
const bad = `<html><head><title>x</title><meta name="robots" content="noindex, follow">
<link rel="canonical" href="${B}/destinations/rome-guide"><script type="application/ld+json">{bad json</script></head>
<body><h1>a</h1><h1>b</h1><a href="/about">no slash</a></body></html>`;
const b = auditPageHtml(`${B}/destinations/rome-guide/`, bad);
for (const c of ['noindex', 'canonical-mismatch', 'description-missing', 'jsonld-invalid', 'h1-multiple', 'no-static-content', 'internal-link-no-trailing-slash', 'html-lang-missing', 'title-short']) {
  assert.ok(codes(b).includes(c), `expected ${c}, got ${codes(b)}`);
}
assert.ok(b.score < 30);

// --- SPA shell (no prerender) is flagged as an AI-visibility failure ---
const shell = auditPageHtml(`${B}/about/`, '<html lang="en"><head><title>About Allergy-Free Travel and our team</title></head><body><div id="root"></div><script>window.x=1</script></body></html>');
assert.ok(codes(shell).includes('no-static-content'));

// --- robots: blocking an AI/Bing bot is critical; crawl-delay noted ---
const r = auditRobots('User-agent: *\nAllow: /\nCrawl-delay: 1\n\nUser-agent: GPTBot\nDisallow: /\n');
assert.ok(r.some((i) => i.code === 'robots-blocks-gptbot' && i.severity === 'critical'));
assert.ok(r.some((i) => i.code === 'robots-no-sitemap'));
assert.ok(r.some((i) => i.code === 'robots-crawl-delay'));
assert.ok(!r.some((i) => i.code === 'robots-blocks-bingbot'));
assert.deepEqual(auditRobots('User-agent: *\nAllow: /\nSitemap: https://x/sitemap.xml').filter((i) => i.severity === 'critical'), []);

// --- sitemap ---
const xml = `<urlset><url><loc>${B}/</loc><lastmod>2026-11-01</lastmod></url><url><loc>${B}/about</loc></url></urlset>`;
const entries = parseSitemap(xml);
assert.equal(entries.length, 2);
const s = auditSitemap(entries);
assert.ok(s.some((i) => i.code === 'sitemap-no-trailing-slash'));
assert.ok(s.some((i) => i.code === 'sitemap-no-lastmod'));

// --- llms.txt: the exact issues the live file has today (no trailing slashes) ---
const l = auditLlmsTxt('- [Paris](https://www.allergy-free-travel.com/destinations/paris)\n- [Gone](https://www.allergy-free-travel.com/destinations/gone/)', new Set([`${B}/destinations/paris/`]));
assert.ok(l.some((i) => i.code === 'llms-txt-no-trailing-slash'));
assert.ok(l.some((i) => i.code === 'llms-txt-not-in-sitemap'));
assert.ok(auditLlmsTxt(null, new Set()).some((i) => i.code === 'llms-txt-missing'));

// --- classification + traffic-weighted ranking ---
assert.equal(classifyPage(`${B}/news/foo/`), 'news');
assert.equal(classifyPage(`${B}/destinations/`), 'other');
assert.equal(classifyPage(`${B}/restaurants/x/`), 'article');
const imp = new Map([[`${B}/destinations/rome-guide/`, 900]]);
const fixes = rankFixes([b, shell], imp);
assert.equal(fixes[0].severity, 'critical');
const nsc = fixes.find((f) => f.code === 'no-static-content');
assert.equal(nsc.pagesAffected, 2);
assert.equal(nsc.impressionsAffected, 900);

console.log('seo-geo-analyze: all assertions passed');
