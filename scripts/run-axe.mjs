#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { source as axeSource } from 'axe-core';

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

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
let totalCritical = 0;
try {
  const page = await browser.newPage();
  for (const r of routes) {
    const url = new URL(r, BASE_URL).toString();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.addScriptTag({ content: axeSource });

    const results = await page.evaluate(async () => {
      return await axe.run(document, {
        resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      });
    });

    const counts = results.violations.reduce((acc, v) => {
      const impact = v.impact || 'unknown';
      acc[impact] = (acc[impact] || 0) + 1;
      return acc;
    }, {});

    const critical = counts.critical || 0;
    totalCritical += critical;
    const summary = ['critical', 'serious', 'moderate', 'minor', 'unknown']
      .map((k) => `${k}:${counts[k] || 0}`)
      .join(' ');

    console.log(`[AXE][${r}] violations:${results.violations.length} ${summary}`);
  }
} catch (e) {
  console.error('[AXE] Error:', e);
  process.exitCode = 1;
} finally {
  await browser.close();
}

if (totalCritical > 0) {
  console.error(`[AXE] Failing: critical issues found: ${totalCritical}`);
  process.exit(1);
} else {
  console.log('[AXE] Pass: 0 critical issues');
}
