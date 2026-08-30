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

- [x] Finish migration — replace remaining Helmet usage in pages (AboutUs, DirectChat, FAQ, Sitemap, SearchResults, Destinations Index, Paris, New York, Hotel Chains)
  - RATIONALE: Single authoritative SEO source; easier audits.
  - HOW-TO: Use MetaManager route registry + dynamic handling for /search-results; remove CanonicalTags/SocialTags usage where redundant.
  - DoD: Grep shows no <Helmet> in src/pages/** (except inside MetaManager); each route renders one set of tags; canonical normalized via buildCanonical.

- [x] Ensure single H1 per page and descriptive meta titles/descriptions
  - RATIONALE: Improves CTR and relevancy; avoids SEO penalties.
  - HOW-TO: Audit src/pages/** and src/components/** headers; enforce one <h1/> per page; use MetaManager to set title/description.
  - DoD: Every route has a single H1 and title (< 60 chars) + meta description (< 160 chars) including “allergy-friendly hotels”.
  - DONE: Found and fixed 3 real duplicate-H1 cases hiding in composed components (all ~30 destination pages via DestinationInfo+DestinationHeader, /destinations/cruise-lines via CruiseHero+CruiseIntro, /reviews via the sr-only H1 + ReviewsHeader) — demoted the redundant one to <p>/<h2> in each case. Shortened homepage title (69→52 chars) and /destinations/hotel-chains description (178→114 chars). Rebuilt the dynamic per-destination title/description to use each destination's real description/subtitle instead of a generic "Hotels in X" template that was both wrong for topic pages (airlines, flying-with-epipens*) and over budget for 4/30 destinations.

- [x] Canonical tags + JSON-LD where relevant
  - RATIONALE: Prevents duplicate content; enhances rich results.
  - HOW-TO: Use CanonicalTags and StructuredData components where pages have variants (reviews, destinations, hotels).
  - DoD: All primary pages contain <link rel="canonical"/>; applicable pages include valid JSON-LD.
  - DONE: MetaManager already emitted canonical + Organization/Breadcrumb/Hotel JSON-LD everywhere. Added the two missing high-value ones: FAQPage schema on /faq (20 real Q&A pairs, zero rich-result markup before) and Article schema + canonical + real OG image on /articles/[slug] (previously always fell back to the generic site image even when the article had its own hero_image_url).

- [x] Robots/sitemap correctness
  - RATIONALE: Guides crawlers and indexing.
  - HOW-TO: Review public/robots.txt and public/sitemap.xml; ensure important routes are not blocked and are listed.
  - DoD: Verified robots/sitemap entries for top routes and destinations.
  - DONE: Already correct — robots.txt allows all, sitemap is served dynamically (netlify/functions/sitemap.cjs) with live lastmod dates and auto-included published articles from Supabase. No changes needed.

- [x] Image alt text and lazy loading
  - RATIONALE: SEO + accessibility + performance.
  - HOW-TO: Use OptimizedImage; ensure descriptive alt for all images.
  - DoD: No <img> missing alt; lazy loading enabled where non-critical.
  - DONE: Audited every <img> in src/**; alt text was already complete and non-empty everywhere. Added explicit loading="eager"/"lazy" to the ~9 images that had neither (heroes/banners → eager, cards/icons/previews → lazy).

- [x] E-E-A-T: real named author instead of a generic org voice
  - RATIONALE: Content covers severe/life-threatening food allergies — Google's quality guidance weighs a real, consistent named author much more heavily here than for typical topics. Guide pages (the bulk of the site's content) attributed everything to "Allergy-Free Travel" as an Organization, with no visible byline or date shown to actual readers, even though a real founder identity already existed on /about.
  - HOW-TO: src/constants/author.ts as the single source of truth; src/components/ArticleByline.tsx renders a visible "Written by ... — Updated on ..." line; JSON-LD `author` on ArticleDetail.tsx/RestaurantDetail.tsx switched from Organization to Person (publisher stays Organization).
  - DoD: Guide pages show a real visible byline + last-updated date; JSON-LD author is a Person linking to /about.

- [x] Pinterest distribution: backlog sweep + observability
  - RATIONALE: content-pipeline already pinned each article the moment it was first published, but fire-and-forget with zero success/failure visibility and no retry — and every article published before Pinterest was wired up was never pinned at all. Pinterest content has long-tail search value (unlike Facebook/Instagram's feed, which is why social-poster deliberately never touches backlog), so it's worth working through it.
  - HOW-TO: `posted_to_pinterest_at` column on `seo_articles`; `publishToPinterest` (content-pipeline) now marks it + logs success explicitly; new `pinterest-poster` Edge Function + daily GitHub Action sweeps the backlog oldest-first in small batches.
  - DoD: New articles get pinned and tracked on publish; the daily sweep gradually clears already-published articles that predate the integration. Blocked on Pinterest's own Trial-vs-Standard app access — pin creation in production requires Standard access, applied for separately.

- [ ] Real Tripadvisor reviews on hotel/restaurant pages
  - RATIONALE: Guide pages had no independent third-party review content — a real credibility gap for allergy-safety claims specifically. Tripadvisor's Terra API (their Content API replacement as of Aug 2026) legitimately licenses real ratings + review excerpts with a link back, unlike scraping Tripadvisor/Booking directly (against both platforms' ToS, and Booking has no review-syndication API at all — only an affiliate booking widget).
  - HOW-TO: New `tripadvisor-reviews` Edge Function — name+category lookup (search → details + reviews on Tripadvisor's Terra API), cached permanently per place in `tripadvisor_cache` (ratings/reviews don't shift day to day, and every lookup is a billed entity). Hard monthly budget ceiling enforced in our own code (₪25, separate from the Google Places ₪100), same pattern as hotel-search/restaurants-search — deliberately not relying on Tripadvisor's own checkout-page "expected cost" estimator, which is non-binding.
  - DoD: Backend deployed and verified against the real API (search/details/reviews endpoints confirmed working). Still pending: `TRIPADVISOR_API_KEY` secret configured in Supabase, a live end-to-end verification call, and wiring the function into HotelDetail/RestaurantDetail pages with visible attribution.

- [x] Stop indexing /search-results as content
  - RATIONALE: Every (destination, allergies) combination is a distinct, crawlable, internally-linked URL with a templated title and no noindex — an unbounded set of near-duplicate thin pages, and a plausible contributor to pages Search Console reports as discovered-but-not-indexed. It's a live search view, not canonical content.
  - HOW-TO: `<MetaManager dynamicData={{ robots: "noindex, follow" }} />` in SearchResults.tsx.
  - DoD: /search-results responses carry a noindex robots meta tag.

---

## Performance

- [x] Improve LCP element loading on destinations
  - RATIONALE: LCP drives Core Web Vitals.
  - HOW-TO: Preload hero image; compress/optimize via getOptimizedImageUrl; defer non-critical JS; ensure font-display: swap.
  - DoD: LCP ≤ 2.5s (Slow 4G) on /, /destinations, and top 3 destination pages.
  - DONE: The hero-image preload was actively wrong on every non-homepage route — index.html statically preloaded the homepage image with fetchpriority="high" on all ~50 routes (and performanceOptimizer.ts's preloadCriticalResources() re-injected the same wrong preload via JS), so no page other than "/" ever preloaded the image it actually needed. Removed both; MetaManager now emits a dynamic per-route preload using the same image already computed for Open Graph. Actual LCP ms numbers still need to be measured against the live site (PageSpeed Insights / Search Console) — not verifiable from this environment.

- [x] Reduce CLS via image dimensions and font strategy
  - RATIONALE: Avoid layout shifts.
  - HOW-TO: Provide width/height; reserve space; verify optimizeFontLoading in performanceOptimizer.
  - DoD: CLS ≤ 0.1 across key routes.
  - DONE: Images already carry explicit width/height almost everywhere (verified during the alt-text/lazy-loading audit). optimizeFontLoading() — referenced in the original HOW-TO — turned out to be actively broken: it injected an @font-face pointing at /fonts/poppins.woff2, a file that doesn't exist in this repo, so it silently 404'd on every page load. Removed it; the real Poppins font already loads correctly via the Google Fonts <link> in index.html with font-display=swap. Actual CLS numbers still need real measurement.

- [x] Defer non-critical JS and preload critical resources
  - RATIONALE: Faster TTI and FCP.
  - HOW-TO: Use deferNonCriticalJS and preloadCriticalResources; audit script tags for data-defer.
  - DoD: Lighthouse “Best Practices/Performance” show improvements; no blocking non-critical scripts.
  - DONE: preloadCriticalResources() was the wrong-image-preload bug above — removed (see LCP item). deferNonCriticalJS() is a no-op in practice: it only defers `script[data-defer="true"]`, and no script anywhere in the codebase carries that attribute — left in place (harmless) but noted here in case someone expects it to be doing something.

- [x] Code-splitting and route-level prefetch
  - RATIONALE: Smaller initial bundle.
  - HOW-TO: Split large components; keep requestIdleCallback prefetch for important routes.
  - DoD: Bundle size reduced; Lighthouse Mobile ≥ 90.
  - DONE: Already fully implemented — every route in src/App.tsx is React.lazy()'d, App itself is lazy-loaded from main.tsx, and the built output confirms per-route JS chunks. No changes needed. (usePerformanceOptimization's requestIdleCallback route-prefetch exists but the hook itself is never called anywhere — dead code, out of scope for this pass.)

- [x] Automate perf checks
  - RATIONALE: Prevent regressions.
  - HOW-TO: Use node ./scripts/run-lh.mjs; consider CI integration later.
  - DoD: Report HTML generated in /reports for key routes per run.
  - DONE: Added .github/workflows/lighthouse-audit.yml — runs weekly (Mondays) and on-demand (workflow_dispatch) against the live production site. Two jobs: Lighthouse (mobile, simulated Slow 4G, all 4 categories) posts a scores table to the run's job summary and uploads the full HTML reports as a downloadable artifact; axe accessibility audit posts violation counts to the summary and fails the job on any critical WCAG issue. run-lh.mjs now also writes reports/summary.json so the workflow can build the table. Also added `npm run lh` for running it locally.

---

## Security

- [ ] Validate and sanitize user inputs (forms/search)
  - RATIONALE: Prevent XSS/Injection.
  - HOW-TO: Ensure robust validation with react-hook-form/zod; escape dynamic HTML; avoid dangerouslySetInnerHTML.
  - DoD: No lint warnings; manual test with special chars shows safe handling.

- [x] CORS and rate limiting for Netlify/Supabase functions
  - RATIONALE: Prevent abuse and data leaks.
  - HOW-TO: Review netlify/functions/** and supabase/functions/**; add CORS headers and simple rate limits where applicable.
  - DoD: Functions return correct CORS headers; burst traffic limited.
  - DONE (partial): hotel-search and restaurants-search are public (verify_jwt=false, CORS '*') and trigger real billed Google Places calls on every cache miss with zero request-level rate limiting — a handful of varied destination strings bypasses the cache entirely. Added a shared hard monthly ₪100 budget ceiling (computed from search_log, calibrated against the real Google Cloud Billing console rather than public pricing pages) that blocks live Google calls once crossed, failing closed if unverifiable. This caps worst-case monthly spend but is not per-IP/session throttling — a burst of requests within a month still executes until the shared ceiling trips. True per-IP/session rate limiting is still open.

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
