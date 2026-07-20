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

const KEY_METRICS = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
];

// Pulls the specific audits dragging a category's score down, sorted by
// weight (impact), so the CI summary shows *why* a score is low, not just
// the number.
function getLowScoringAudits(lhr, categoryId, limit = 8) {
  const category = lhr.categories[categoryId];
  if (!category) return [];
  return category.auditRefs
    .filter((ref) => ref.weight > 0)
    .map((ref) => ({ ref, audit: lhr.audits[ref.id] }))
    .filter(({ audit }) => audit && audit.score !== null && audit.score < 0.9)
    .sort((a, b) => b.ref.weight - a.ref.weight)
    .slice(0, limit)
    .map(({ audit }) => ({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue || '',
    }));
}

function getMetrics(lhr) {
  return Object.fromEntries(
    KEY_METRICS.map((id) => [id, lhr.audits[id]?.displayValue || 'n/a'])
  );
}

await fs.mkdir('reports', { recursive: true });

const summary = [];

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
    const { lhr } = runnerResult;
    const { categories } = lhr;
    const scores = Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [k, Math.round((v.score || 0) * 100)])
    );
    console.log(`[LH][${r}] perf:${scores.performance} a11y:${scores.accessibility} seo:${scores.seo} bp:${scores['best-practices']}`);

    const metrics = getMetrics(lhr);
    console.log(`[LH][${r}] metrics: ${Object.entries(metrics).map(([k, v]) => `${k}=${v}`).join(' ')}`);

    const perfOpportunities = getLowScoringAudits(lhr, 'performance');
    const bpIssues = getLowScoringAudits(lhr, 'best-practices');
    for (const a of perfOpportunities) {
      console.log(`[LH][${r}][perf] ${a.id}: ${a.title} ${a.displayValue ? `(${a.displayValue})` : ''} score=${a.score}`);
    }
    for (const a of bpIssues) {
      console.log(`[LH][${r}][bp] ${a.id}: ${a.title} ${a.displayValue ? `(${a.displayValue})` : ''} score=${a.score}`);
    }

    const outPath = path.join('reports', `lh-${slugifyRoute(r)}.html`);
    await fs.writeFile(outPath, reportHtml);
    summary.push({ route: r, url, scores, metrics, perfOpportunities, bpIssues, reportFile: path.basename(outPath) });
  }
} catch (e) {
  console.error('[LH] Error:', e);
  process.exitCode = 1;
} finally {
  await chrome.kill();
  await fs.writeFile(path.join('reports', 'summary.json'), JSON.stringify(summary, null, 2));
}
