#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const BASE_URL = process.env.PREVIEW_URL
  || process.env.DEPLOY_PRIME_URL
  || process.env.DEPLOY_URL
  || process.env.URL
  || 'http://localhost:8888';

const routes = [
  '/',
  '/destinations',
  '/destinations/paris',
  '/destinations/london',
  '/destinations/rome',
];

function slugifyRoute(route) {
  if (route === '/') return 'home';
  return route.replace(/^\//, '').replace(/\//g, '-');
}

await fs.mkdir('reports', { recursive: true });

const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
try {
  for (const r of routes) {
    const url = new URL(r, BASE_URL).toString();
    const options = {
      port: chrome.port,
      output: 'html',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    };
    const config = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 150,
          requestLatencyMs: 150,
          throughputKbps: 1638.4,
          downloadThroughputKbps: 1638.4,
          uploadThroughputKbps: 732.2,
          cpuSlowdownMultiplier: 4,
        },
      },
    };

    const runnerResult = await lighthouse(url, options, config);
    const reportHtml = runnerResult.report;
    const { categories } = runnerResult.lhr;
    const scores = Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [k, Math.round((v.score || 0) * 100)])
    );
    console.log(`[LH][${r}] perf:${scores.performance} a11y:${scores.accessibility} seo:${scores.seo} bp:${scores['best-practices']}`);

    const outPath = path.join('reports', `lh-${slugifyRoute(r)}.html`);
    await fs.writeFile(outPath, reportHtml);
  }
} catch (e) {
  console.error('[LH] Error:', e);
  process.exitCode = 1;
} finally {
  await chrome.kill();
}
