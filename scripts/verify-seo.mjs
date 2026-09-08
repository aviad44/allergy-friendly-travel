// Post-prerender regression guard for exactly the bug fixed on 2026-09-07:
// buildCanonical() stripped trailing slashes while the host actually
// 301-redirects every non-root path to add one, so every canonical tag on
// the site silently pointed at a URL that immediately redirected — for
// months, undetected, until it showed up in Search Console as "Page with
// redirect" / excluded pages.
//
// This walks every prerendered dist/<route>/index.html and checks that its
// own <link rel="canonical"> matches the URL that file actually lives at.
// It's a static, network-free check (no live requests, no flakiness) that
// runs after `npm run prerender` and fails the build if any page's
// canonical doesn't match its real location — the same class of drift
// would be caught here before ever reaching production again, instead of
// weeks later in a Search Console report.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const BASE_URL = 'https://www.allergy-free-travel.com';

async function findIndexFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findIndexFiles(full)));
    } else if (entry.name === 'index.html') {
      out.push(full);
    }
  }
  return out;
}

function expectedCanonical(indexFilePath) {
  const relDir = path.relative(DIST, path.dirname(indexFilePath));
  if (relDir === '') return `${BASE_URL}/`;
  // Every non-root route resolves (without a redirect) only with a
  // trailing slash — see buildCanonical in src/utils/seo.ts for why.
  return `${BASE_URL}/${relDir.split(path.sep).join('/')}/`;
}

async function main() {
  console.log('[verify-seo] Starting…');
  if (!existsSync(DIST)) {
    console.error('[verify-seo] dist/ not found — run `npm run build && npm run prerender` first');
    process.exit(1);
  }

  const files = await findIndexFiles(DIST);
  const mismatches = [];
  const missingCanonical = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    // react-helmet-async renders its own attributes first —
    // <link data-rh="true" rel="canonical" href="..."> — so rel and href
    // are matched independently rather than assuming rel comes first.
    const match = html.match(/<link[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"[^>]*>/)
      || html.match(/<link[^>]*\bhref="([^"]+)"[^>]*\brel="canonical"[^>]*>/);
    const expected = expectedCanonical(file);

    if (!match) {
      missingCanonical.push(path.relative(DIST, file));
      continue;
    }

    const actual = match[1];
    if (actual !== expected) {
      mismatches.push({ file: path.relative(DIST, file), expected, actual });
    }
  }

  if (missingCanonical.length > 0) {
    console.warn(`[verify-seo] ${missingCanonical.length} page(s) with no canonical tag at all:`);
    missingCanonical.forEach((f) => console.warn(`  - ${f}`));
  }

  if (mismatches.length > 0) {
    console.error(`[verify-seo] ${mismatches.length} page(s) have a canonical URL that doesn't match where the file actually lives (would redirect if crawled):`);
    mismatches.forEach((m) => console.error(`  - ${m.file}\n      expected: ${m.expected}\n      actual:   ${m.actual}`));
    console.error('\n[verify-seo] Failing the build — a canonical/sitemap URL that redirects is exactly what caused pages to disappear from Search Console before.');
    process.exit(1);
  }

  console.log(`[verify-seo] OK — checked ${files.length} pages, all canonical URLs match their real location.`);
}

main().catch((err) => {
  // An unhandled crash here (bad fs entry, unexpected file, etc.) should
  // never silently kill the build with no explanation — print the real
  // stack so a future failure is diagnosable from the build log alone.
  console.error('[verify-seo] Unexpected error:', err);
  process.exit(1);
});
