// Static prerendering for SEO.
// After `vite build`, this launches a headless browser, visits each public
// route against a local static server (with SPA fallback), waits for the React
// app to render the real content, and writes a fully-rendered index.html for
// each route into dist/. Crawlers (and `curl`) then receive full HTML instead
// of an empty <div id="root">.
import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

if (!existsSync(path.join(dist, 'index.html'))) {
  console.warn('[prerender] dist/index.html not found — skipping prerender.');
  process.exit(0);
}

// Derive destination slugs from the source list so this stays in sync.
const listSrc = readFileSync(path.join(root, 'src/data/destinations-list.ts'), 'utf8');
const destinationSlugs = [...listSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

const staticRoutes = [
  '/',
  '/destinations',
  '/about',
  '/contact',
  '/faq',
  '/reviews',
  '/categories',
  '/terms',
  '/privacy',
  '/allergy-translation-card',
];

const routes = [
  ...staticRoutes,
  ...destinationSlugs.map((slug) => `/destinations/${slug}`),
];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.xml': 'application/xml', '.txt': 'text/plain',
};

const indexHtml = await readFile(path.join(dist, 'index.html'));

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filePath = path.join(dist, urlPath);
    if (urlPath !== '/' && existsSync(filePath) && !filePath.endsWith(path.sep)) {
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
      return;
    }
  } catch { /* fall through to SPA index */ }
  // SPA fallback
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(indexHtml);
});

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;
const base = `http://localhost:${port}`;

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

let ok = 0;
let failed = 0;
try {
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 45000 });
      // Ensure the React app has painted real content into #root.
      await page.waitForFunction(
        () => {
          const el = document.getElementById('root');
          return el && el.innerText && el.innerText.trim().length > 200;
        },
        { timeout: 30000 }
      );
      const html = await page.content();
      const outDir = route === '/' ? dist : path.join(dist, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      ok++;
      console.log(`[prerender] ✓ ${route}`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] ✗ ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`[prerender] done — ${ok} rendered, ${failed} failed of ${routes.length}.`);
