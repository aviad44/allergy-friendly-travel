// Self-hosted replacement for the third-party Prerender.io service, which
// depends on an account/quota this project no longer has access to and was
// returning "Prerender service returned 503 status." to every single bot
// request (confirmed live). Runs as part of the Netlify build: after `vite
// build` produces `dist/`, this script boots a local static server for it,
// visits every real route with headless Chrome, waits for the page's own
// "I'm done loading" signal, and writes the fully-rendered HTML back into
// `dist/<route>/index.html` — a real static file Netlify serves directly to
// everyone (bots and humans alike), no external rendering service involved.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import { STATIC_PATHS } from '../netlify/functions/sitemap.cjs';

const DIST = path.resolve('dist');
const PORT = process.env.PRERENDER_PORT || 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 12000;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://embuxlxugjkjgsusrmlx.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtYnV4bHh1Z2pramdzdXNybWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwODAxMjgsImV4cCI6MjA0OTY1NjEyOH0.iVA1pxwT2_GUBMBCIovf45o23E84FsGu8HByFDQOscQ';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

async function getRoutes() {
  const routes = new Set(STATIC_PATHS.map((p) => p.path));

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: articles, error } = await supabase
      .from('seo_articles')
      .select('slug')
      .eq('status', 'published');
    if (error) throw error;
    for (const a of articles || []) routes.add(`/articles/${a.slug}`);
  } catch (err) {
    console.warn('[prerender] Could not fetch published article slugs, skipping /articles/*:', err.message);
  }

  return [...routes];
}

// Static-file server with SPA fallback, mirroring Netlify's own `/* -> /index.html`
// redirect so client-side routing resolves the same way during prerendering.
function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(DIST, urlPath);
      if (!existsSync(filePath) || urlPath.endsWith('/')) {
        filePath = path.join(DIST, urlPath, 'index.html');
      }
      if (!existsSync(filePath)) filePath = path.join(DIST, 'index.html');

      try {
        const body = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function renderRoute(browser, route, attempt = 1) {
  const page = await browser.newPage();
  try {
    // 'load' rather than 'networkidle0': index.html defers a Google Analytics
    // script that's injected via a `load` listener and keeps making its own
    // background requests indefinitely — networkidle0 would wait forever for
    // that non-content traffic to settle. Real page-content readiness is
    // covered separately by waitForReady() below (window.prerenderReady).
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'load', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 500)); // let React mount before the first check
    await waitForReady(page);
    const html = await page.content();

    const outDir = route === '/' ? DIST : path.join(DIST, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    return { route, ok: true, bytes: html.length };
  } catch (err) {
    if (attempt < 2) return renderRoute(browser, route, attempt + 1);
    return { route, ok: false, error: err.message };
  } finally {
    await page.close();
  }
}

async function waitForReady(page) {
  const start = Date.now();
  while (Date.now() - start < READY_TIMEOUT_MS) {
    const state = await page.evaluate(() => window.prerenderReady);
    if (state !== false) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  console.warn('[prerender] Timed out waiting for prerenderReady, snapshotting anyway');
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('[prerender] dist/ not found — run `npm run build` first');
    process.exit(1);
  }

  const routes = await getRoutes();
  console.log(`[prerender] Rendering ${routes.length} routes`);

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
    executablePath: process.env.PRERENDER_CHROME_PATH || undefined,
  });

  const results = [];
  for (const route of routes) {
    const result = await renderRoute(browser, route);
    results.push(result);
    console.log(result.ok
      ? `[prerender] OK   ${route} (${result.bytes} bytes)`
      : `[prerender] FAIL ${route}: ${result.error}`);
  }

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`[prerender] Done: ${results.length - failed.length}/${results.length} succeeded`);
  if (failed.length > 0) {
    console.warn('[prerender] Failed routes:', failed.map((f) => f.route).join(', '));
  }
  // Don't fail the whole deploy over a handful of flaky dynamic pages — a
  // partial prerender (falling back to the client-rendered SPA shell for the
  // routes that failed) is still strictly better than blocking every deploy.
  if (failed.length === results.length && results.length > 0) {
    console.error('[prerender] Every route failed — something is fundamentally broken, failing the build');
    process.exit(1);
  }
}

main();
