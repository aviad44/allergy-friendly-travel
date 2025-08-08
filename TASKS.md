# Engineering Task Board (Performance, SEO, Security, DX, UX)

Purpose: Track, execute, and verify improvements across the product. All tasks include rationale, how-to, and clear Definition of Done.

KPIs (target):
- Lighthouse Mobile ≥ 90
- CLS ≤ 0.1
- LCP ≤ 2.5s on Slow 4G
- Axe: 0 critical issues

How to run audits locally:
- Start app (e.g., Netlify dev): netlify dev (serves at http://localhost:8888)
- Performance: node ./scripts/run-lh.mjs
- Accessibility: node ./scripts/run-axe.mjs

Note: package.json scripts cannot be auto-updated here; use the commands above or add scripts manually when possible.

---

## SEO

- [x] Consolidate SEO into central MetaManager component
  - RATIONALE: Prevents duplicated tags and inconsistent SEO across routes; simplifies maintenance.
  - HOW-TO: Implement src/components/MetaManager.tsx with route-based config, canonical builder, and JSON-LD helpers; replace page-level Helmet usage.
  - DoD: One set of meta tags per route; canonical normalized; JSON-LD valid for destinations; old components re-export MetaManager.

- [ ] Ensure single H1 per page and descriptive meta titles/descriptions
  - RATIONALE: Improves CTR and relevancy; avoids SEO penalties.
  - HOW-TO: Audit src/pages/** and src/components/** headers; enforce one <h1/> per page; use MetaManager to set title/description.
  - DoD: Every route has a single H1 and title (< 60 chars) + meta description (< 160 chars) including “allergy-friendly hotels”.

- [ ] Canonical tags + JSON-LD where relevant
  - RATIONALE: Prevents duplicate content; enhances rich results.
  - HOW-TO: Use CanonicalTags and StructuredData components where pages have variants (reviews, destinations, hotels).
  - DoD: All primary pages contain <link rel="canonical"/>; applicable pages include valid JSON-LD.

- [ ] Robots/sitemap correctness
  - RATIONALE: Guides crawlers and indexing.
  - HOW-TO: Review public/robots.txt and public/sitemap.xml; ensure important routes are not blocked and are listed.
  - DoD: Verified robots/sitemap entries for top routes and destinations.

- [ ] Image alt text and lazy loading
  - RATIONALE: SEO + accessibility + performance.
  - HOW-TO: Use OptimizedImage; ensure descriptive alt for all images.
  - DoD: No <img> missing alt; lazy loading enabled where non-critical.

---

## Performance

- [ ] Improve LCP element loading on destinations
  - RATIONALE: LCP drives Core Web Vitals.
  - HOW-TO: Preload hero image; compress/optimize via getOptimizedImageUrl; defer non-critical JS; ensure font-display: swap.
  - DoD: LCP ≤ 2.5s (Slow 4G) on /, /destinations, and top 3 destination pages.

- [ ] Reduce CLS via image dimensions and font strategy
  - RATIONALE: Avoid layout shifts.
  - HOW-TO: Provide width/height; reserve space; verify optimizeFontLoading in performanceOptimizer.
  - DoD: CLS ≤ 0.1 across key routes.

- [ ] Defer non-critical JS and preload critical resources
  - RATIONALE: Faster TTI and FCP.
  - HOW-TO: Use deferNonCriticalJS and preloadCriticalResources; audit script tags for data-defer.
  - DoD: Lighthouse “Best Practices/Performance” show improvements; no blocking non-critical scripts.

- [ ] Code-splitting and route-level prefetch
  - RATIONALE: Smaller initial bundle.
  - HOW-TO: Split large components; keep requestIdleCallback prefetch for important routes.
  - DoD: Bundle size reduced; Lighthouse Mobile ≥ 90.

- [ ] Automate perf checks
  - RATIONALE: Prevent regressions.
  - HOW-TO: Use node ./scripts/run-lh.mjs; consider CI integration later.
  - DoD: Report HTML generated in /reports for key routes per run.

---

## Security

- [ ] Validate and sanitize user inputs (forms/search)
  - RATIONALE: Prevent XSS/Injection.
  - HOW-TO: Ensure robust validation with react-hook-form/zod; escape dynamic HTML; avoid dangerouslySetInnerHTML.
  - DoD: No lint warnings; manual test with special chars shows safe handling.

- [ ] CORS and rate limiting for Netlify/Supabase functions
  - RATIONALE: Prevent abuse and data leaks.
  - HOW-TO: Review netlify/functions/** and supabase/functions/**; add CORS headers and simple rate limits where applicable.
  - DoD: Functions return correct CORS headers; burst traffic limited.

- [ ] Security headers
  - RATIONALE: Browser-level protections.
  - HOW-TO: Add headers in netlify.toml or Edge functions (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
  - DoD: Headers present on key routes; no CSP violations in console.

- [ ] Supabase RLS verification
  - RATIONALE: Data isolation.
  - HOW-TO: Ensure RLS enabled; validate policies; no overly permissive rules.
  - DoD: Linter passes; manual tests confirm access control.

---

## DX

- [ ] Strict TS build for type-safety
  - RATIONALE: Catch errors early.
  - HOW-TO: Run tsc -p . --noEmit; fix types; adopt build:strict script when possible.
  - DoD: build:strict passes with 0 errors.

- [ ] Perf & a11y test scripts
  - RATIONALE: Guardrails in CI.
  - HOW-TO: node ./scripts/run-lh.mjs and node ./scripts/run-axe.mjs; optionally add npm scripts when allowed.
  - DoD: Scripts run successfully; Axe 0 critical.

- [ ] PR template adoption
  - RATIONALE: Enforce quality gates.
  - HOW-TO: Use .github/pull_request_template.md.
  - DoD: All PRs include the checklist.

---

## UX

- [ ] Keyboard navigability and focus visibility
  - RATIONALE: Accessibility and usability.
  - HOW-TO: Tab through primary flows; ensure visible focus; fix traps.
  - DoD: Axe shows 0 critical; manual keyboard test passes.

- [ ] Content clarity and hierarchy
  - RATIONALE: Reduce bounce; improve comprehension.
  - HOW-TO: Single H1, logical headings, concise copy; mobile-first spacing.
  - DoD: Heuristic review passes; Lighthouse a11y ≥ 95.

- [ ] Loading states and error handling
  - RATIONALE: Feedback and trust.
  - HOW-TO: Use skeletons/spinners and toasts; informative errors.
  - DoD: All async views show acceptable loading states.

---

## Weekly Rollout Plan

- Week 1 — Baseline & Tooling
  - Milestones: Add TASKS/CHANGELOG/PR template; wire Lighthouse/Axe scripts; capture baseline.
  - KPIs: Baseline recorded; automated reports generated in /reports.

- Week 2 — SEO & A11y
  - Milestones: Single H1 + meta pass; JSON-LD; alt text; fix Axe serious/critical.
  - KPIs: Axe 0 critical; SEO score ≥ 90.

- Week 3 — Performance (LCP/CLS)
  - Milestones: Preload hero; defer JS; image dims; font swap.
  - KPIs: LCP ≤ 2.5s (Slow 4G); CLS ≤ 0.1; Lighthouse Mobile ≥ 90.

- Week 4 — Security & Polish
  - Milestones: CORS/rate limits; security headers; DX strict types.
  - KPIs: 0 critical security/a11y issues; build:strict passes.
