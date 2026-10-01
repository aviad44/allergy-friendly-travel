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

- [x] Fix canonical URLs pointing at redirecting URLs (real cause of pages GSC showed as excluded)
  - RATIONALE: User reported real guide pages (Helsinki, Belgrade, Lyon) showing up in Search Console under a "Excluded by..." reason. Investigation (verified live via direct HTTP requests) found `buildCanonical()` had an explicit policy to *strip* trailing slashes from every canonical URL — but the actual host 301-redirects every non-root path (the prerender step writes `dist/<route>/index.html` per route) to *add* one. So every canonical tag, sitemap.xml entry, and JSON-LD url/mainEntityOfPage on the entire site pointed at a URL that immediately redirected elsewhere — confirmed on `/about`, `/destinations/toronto`, and every guide page tested. This is the real, previously-undiagnosed root cause of the "Page with redirect" theory raised earlier in this same session (which an earlier direct test seemed to disprove — because that test happened to use the trailing-slash variant, not the one this codebase was actually generating).
  - HOW-TO: Flipped `buildCanonical()` in `src/utils/seo.ts` to add a trailing slash instead of stripping one (covers every page's canonical + OG:url automatically, since all of them route through this one function). Also fixed the other places that build these URLs directly and bypass `buildCanonical`: `netlify/functions/sitemap.cjs` (every `<loc>`), `src/utils/jsonld.ts` (`hotelJsonLd` url, `breadcrumbJsonLd` item urls), `ArticleDetail.tsx`/`RestaurantDetail.tsx` (`articleUrl` used for `mainEntityOfPage`), and internal `<Link>` hrefs across `Sitemap.tsx`, `DestinationsList.tsx`, `Restaurants.tsx`, `RelatedDestinations.tsx`.
  - DoD: Verified live (via the Postgres `http` extension, since this sandbox can't reach the site directly) that `/about`, `/destinations/toronto`, and the three reported guide pages all 301 the no-slash form to the slash form, and that the slash form itself serves 200 with `index, follow`. Fix shipped; full re-crawl/re-index by Google is out of our hands and will take Google's own time — recommend using GSC's "Validate Fix" on the affected URLs after this deploys.

- [x] Fix sitewide nav/footer/homepage links still pointing at no-slash URLs
  - RATIONALE: User pasted a live Search Console "Some fixes failed" email — the 09-07/08 trailing-slash canonical fix's validation had been failing since 09-08, 34 pages affected and growing. Root cause: the fix corrected each page's own canonical tag, but never touched the site's own internal links — `MainMenu.tsx`, `constants/home.ts` (→ `Footer.tsx`'s Quick Links), `Footer.tsx`'s Popular Destinations, and homepage-only `FeaturedDestinations.tsx` all hardcoded `to="/destinations/paris"` etc. without the trailing slash, so Google kept rediscovering the redirecting no-slash URLs from the homepage and global nav/footer — the two most-crawled surfaces on the site — on every crawl.
  - HOW-TO: Grepped all of `src/` for literal `to="/..."`/`href="/..."` internal links missing a trailing slash; found and fixed 25 occurrences across 13 files (`MainMenu.tsx`, `constants/home.ts`, `Footer.tsx`, `FeaturedDestinations.tsx`, `Restaurants.tsx`, `destinations/HotelChains.tsx`, `ArticleDetail.tsx`, `RestaurantDetail.tsx`, `AllergyTranslationCard.tsx`, `AllergyCardPromo.tsx`, `contact/ServicesSection.tsx`, `ArticleByline.tsx`, `allergy-card/components/LanguageUsageStats.tsx`, `reviews/ShareExperienceSection.tsx`).
  - DoD: Confirmed via re-grep that no internal `<Link>`/`<a>` in `src/` points at a non-root path without a trailing slash. Not yet re-validated in Search Console (that takes Google's own time on its side) — recommend re-running "Validate Fix" a few days after this deploys. Follow-up worth considering: extend `scripts/verify-seo.mjs` to also flag internal links missing a trailing slash, since the existing guard only checks each page's own canonical against its own URL, not the links other pages use to reach it.

- [x] Regression guard: fail the build on any canonical/URL-shape mismatch
  - RATIONALE: The bug above shipped silently and sat undetected for months — first symptom anyone saw was pages disappearing from Search Console, weeks after the fact. Nothing in the build would have caught a canonical tag pointing at a URL that doesn't match where the page actually lives. User asked explicitly to prevent this *class* of indexing bug from recurring, not just fix this one instance.
  - HOW-TO: New `scripts/verify-seo.mjs`, wired into the Netlify build as `npm run build && npm run prerender && npm run verify-seo`. Walks every prerendered `dist/<route>/index.html`, extracts its `<link rel="canonical">`, and asserts it exactly equals the URL that file actually lives at (host + trailing slash) — a static, network-free check with no flakiness. Any mismatch fails the build outright, so a future regression (in `buildCanonical`, or a page hardcoding its own canonical) gets caught in CI before it ever reaches production, instead of surfacing weeks later in Search Console.
  - DoD: Smoke-tested against a mock `dist/` — correctly passes (exit 0) when every canonical matches, and correctly fails (exit 1, listing the exact mismatch) when one page's canonical is missing its trailing slash (the precise shape of the real bug). Not yet exercised against a real full `npm run build && npm run prerender` run — this sandbox's `npm run build` fails on an unrelated, pre-existing issue (missing `@lovable.dev/mcp-js`), so first real validation happens on Netlify's own build for this PR.

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

- [x] Real Tripadvisor reviews on hotel/restaurant pages
  - RATIONALE: Guide pages had no independent third-party review content — a real credibility gap for allergy-safety claims specifically. Tripadvisor's Terra API (their Content API replacement as of Aug 2026) legitimately licenses real ratings + review excerpts with a link back, unlike scraping Tripadvisor/Booking directly (against both platforms' ToS, and Booking has no review-syndication API at all — only an affiliate booking widget). Also fixed `HotelCard`'s fallback copy, which unconditionally claimed reviews were "sourced from TripAdvisor, Booking.com, and Google Reviews" regardless of whether any were — true now only when Tripadvisor data is actually shown.
  - HOW-TO: `tripadvisor-reviews` Edge Function (name+category search → details + reviews on Tripadvisor's Terra API), cached permanently per place in `tripadvisor_cache` (ratings/reviews don't shift day to day, and every lookup is a billed entity). Hard monthly budget ceiling enforced in our own code (₪50, separate from the Google Places ₪100), same pattern as hotel-search/restaurants-search — deliberately not relying on Tripadvisor's own checkout-page "expected cost" estimator, which is non-binding. `TripadvisorEnrichedHotelCard` wraps `HotelCard` and fetches per-card; wired into `TopHotelsSection` (hotel guide pages) and `RestaurantDetail` (restaurant guide pages) — the bounded, slow-growing curated catalog. Live `hotel-search`/`restaurants-search` also enrich just the single top-ranked result of every fresh search (not the whole list) — measured from `search_cache`, enriching every result would mean ~400 distinct new places/month site-wide (~₪67/mo) vs. roughly one lookup per unique destination search when scoped to the top result (~₪23/mo); budget raised from ₪25 to ₪50/month to cover both consumers.
  - DoD: Backend deployed and verified against the real API with a live call (Le Bristol Paris: real 4.9 rating, 2476 reviews, 3 review excerpts, all cached correctly). Frontend wired and shipped. Search-path enrichment confirmed firing on real production traffic (Kyoto/Lisbon/Berlin entries appeared in `tripadvisor_cache` within minutes of deploy); a fully live search-to-enrichment test is blocked today only by the (unrelated, pre-existing) Google Places ₪100/month budget already being exhausted for August.

- [x] Stop indexing /search-results as content
  - RATIONALE: Every (destination, allergies) combination is a distinct, crawlable, internally-linked URL with a templated title and no noindex — an unbounded set of near-duplicate thin pages, and a plausible contributor to pages Search Console reports as discovered-but-not-indexed. It's a live search view, not canonical content.
  - HOW-TO: `<MetaManager dynamicData={{ robots: "noindex, follow" }} />` in SearchResults.tsx.
  - DoD: /search-results responses carry a noindex robots meta tag.

- [x] Real Google Search Console data instead of user-pasted screenshots
  - RATIONALE: Every prior SEO investigation on this project (the canonical-slash bug included) depended on the user manually checking Search Console and pasting a screenshot — a real, documented gap (see CLAUDE.md's "Known gaps"). Automating this closes the loop and surfaces concrete opportunities (low-CTR pages, near-page-1 rankings, unindexed pages) without waiting on that.
  - HOW-TO: New `gsc-report` Edge Function (weekly `gsc-report.yml`), authenticating via a Google service-account JWT (`npm:google-auth-library`), scoped `webmasters.readonly`. Pulls Search Analytics (page-level, trailing 7-day window ending 3 days ago to respect GSC's own processing delay) into a new `seo_search_console_snapshots` table, plus a read-only URL Inspection spot-check of the homepage + 3 newest articles. Report-only: never edits `seo_articles`, never calls the Indexing API (restricted by Google's terms to JobPosting/BroadcastEvent content — using it for regular guide pages would repeat the exact terms-of-service mistake just fixed for Google Places Photos elsewhere in this pass).
  - DoD: Function deployed; requires the user to create a Google Cloud service account, grant it read access on the Search Console property, and add its key as the `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` Supabase secret before it can run successfully (no tool available here can do that part). Once configured, `pipeline_log` will show `run_type = 'gsc_report'` rows.
  - STATUS 2026-09-29: Confirmed still not configured — the one scheduled run so far (2026-09-28) failed with the expected "not configured" error, and `pipeline_log` has zero `gsc_report` rows (the function returns before ever inserting one when the secret is missing). Still needs the user's own Google Cloud/Search Console setup.

- [x] GA4 hotel-booking-click report (which hotels/pages, for affiliate research)
  - RATIONALE: User checked GA4 and found 94 `hotel_booking_click` events (the "Book Now" click, see `src/utils/googleAnalytics.ts`) over ~2 months, with no visibility into which hotels/pages they were on — directly relevant to deciding where to focus (or eventually monetize via an affiliate link, see below). Same shape of gap as Search Console: real data existed in GA4 but only reachable by the user manually building a GA4 Explore report.
  - HOW-TO: New `ga4-report` Edge Function (weekly `ga4-report.yml`, same Monday slot as `gsc-report`), authenticating via a Google service-account JWT, scoped `analytics.readonly`, against the GA4 Data API (`analyticsdata.googleapis.com`). Pulls a trailing 30-day breakdown of `hotel_booking_click` events by `hotel_name` (custom event param) and by `pagePath`, plus a total count, and logs a summary into `pipeline_log` (`run_type = 'ga4_report'`, added to the `pipeline_log_run_type_check` constraint). Report-only, same posture as `gsc-report`.
  - DoD: Function deployed. Requires the user to enable the Google Analytics Data API on a service account (the same one used for `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` can be reused), add it as a Viewer on the GA4 property, and add two Supabase secrets: `GOOGLE_ANALYTICS_CREDENTIALS` (the service-account JSON key) and `GA4_PROPERTY_ID` (the GA4 property's numeric ID) — no tool available here can do that part. Once configured, `pipeline_log` will show `run_type = 'ga4_report'` rows.
  - Related, separately blocked: the current "Book Now" link (`hotel-search`'s `bookingSearchUrl`) is a plain `booking.com/searchresults.html` link with no affiliate/partner tag — confirmed via code read, no `aid=` or partner ID anywhere in the repo. So none of these clicks earn commission today, and there is no way (from Booking.com's side) to know if any resulted in an actual booking, independent of this GA4 report. User confirmed 2026-09-29 they don't have a Booking.com affiliate account yet — flagged as a real revenue opportunity once they do (swap in a tagged URL, one-line change).

- [x] Booking.com affiliate links (monetize the "Book Now" exit)
  - RATIONALE: `hotel_booking_click` is the site's clearest purchase-intent signal (94 events in ~2 months per GA4), but every Booking.com link was an untagged `searchresults.html` URL, so none of it could earn commission or be attributed to a booking.
  - HOW-TO: `src/utils/bookingAffiliate.ts` is the single choke point, wired into every Booking.com exit. `withBookingAffiliate(url, placement)` wraps real booking.com URLs in a CJ deep link, `outboundRel()` adds `sponsored`, and the footer and /terms/ carry an affiliate disclosure. Route: Booking moved small publishers off its direct `aid=` program onto affiliate networks in 2025. The user was approved for the **Booking.com MEA** program on CJ Affiliate (advertiser 4347392; our website property PID 101893797). `BOOKING_DEEPLINK_TEMPLATE` was built from a real deep link the user generated in CJ (text link 11891539), and our output matches it byte-for-byte. Each placement passes CJ's `sid` (`aft-guide`, `aft-search`, `aft-search-card`, `aft-search-details`, `aft-book-section`, `aft-region-guide`, `aft-hotel-chains`), so CJ reports break down by page type. CJ payouts go to a Payoneer USD receiving account, because Israel isn't a supported bank country in CJ Payments. The W-8BEN (individual, US-Israel treaty Article 8, 0%) is on file. Not covered: `/direct-chat` (DirectGptChat) renders model output as plain text, so there are no clickable links to tag.
  - FOLLOW-UP (2026-09-30): Hotel exits are now Booking-only, with no links to hotels' own websites (user's call, for monetization). `bookingUrlForHotel()` builds a Booking.com search when a hotel has no Booking URL. See CHANGELOG for what was deliberately left untouched.
  - CAVEAT: CJ requires a commission within 6 months of account reactivation (by ~2027-03-30) or the account goes dormant again. Commission is paid on completed stays, so expect a lag of weeks to months between a click and it showing as payable.
  - DoD: After deploy, a live Booking.com link from an article, a search result and the Hotel Chains page each go through `jdoqocy.com/click-101893797-11891539` with the right `sid`. A test click appears in CJ's reports (Reports → clicks, which can take up to about a day).

- [x] Region hubs for /destinations/ and /restaurants/
  - RATIONALE: User flagged that both listings had become one long flat grid (~29 hand-authored destination pages plus a daily-growing set of content-pipeline hotel/restaurant articles — ~50+ and ~25+ respectively, spanning ~40 countries) with no geographic grouping — a real UX problem as the count keeps growing, and a missed opportunity for internal-linking structure that both SEO and GEO (AI answer engines) reward.
  - HOW-TO: New `src/utils/regions.ts` defines 7 regions (Europe, North America, South America, Asia, Middle East, Oceania, Worldwide Guides) and a country→region lookup covering every country string currently used across `hotels`/`restaurants`/`destinations-list.ts`. New routes `/destinations/region/:region/` and `/restaurants/region/:region/` (`src/pages/destinations/RegionHub.tsx`, `src/pages/restaurants/RegionHub.tsx`) render a filtered grid per region, combining the static `destinations-list.ts` entries (now carrying an optional `region` field) with a live `seo_articles` query joined to `hotels`/`restaurants` for country. Deliberately additive, not a migration: every existing URL (`/destinations/<slug>/`, `/restaurants/<slug>/`) is untouched, and the new `/region/` path segment guarantees zero collision with any single-segment slug (existing or future) — React Router can't shadow a 2-segment route with a 3-segment one. `/destinations/` and `/restaurants/` each gained a small "Browse by Region" link row (`RegionQuickLinks.tsx`) above their existing, unmodified listing components. New paths added to `STATIC_PATHS` in `netlify/functions/sitemap.cjs`, so they're automatically prerendered (`scripts/prerender.mjs`) and included in `sitemap.xml`; `verify-seo` covers them for free since it walks whatever got prerendered.
  - DoD: New routes render without touching any existing route, component, or URL — verified by reading every existing `<Route>` in `App.tsx` unchanged (in particular `/allergy-translation-card`, the site's most-viewed page). `npm run build` can't be verified in this sandbox (pre-existing, unrelated `@lovable.dev/mcp-js` issue — see CLAUDE.md); real validation happens on Netlify's own Deploy Preview build.

- [x] Fix broken restaurant-article hero images (17 of 26 articles)
  - RATIONALE: User spotted broken-image icons on `/restaurants/` cards live. Root cause: `content-pipeline`'s restaurant path stored a raw `maps.googleapis.com/.../place/photo` URL (with the live `GOOGLE_MAPS_API_KEY` embedded) directly as `hero_image_url` — Google Places photo URLs aren't meant to be hotlinked long-term like that, so every one of the 17 affected articles was broken in production (verified live via the Postgres `http` extension: mix of 400/403 and fake-200 HTML error pages), and the API key was exposed publicly in the DB/page source the whole time.
  - HOW-TO: Removed `fetchRestaurantDishPhoto` from `content-pipeline/index.ts` — restaurant articles now always use `fetchDestinationPhoto` (Unsplash/Pixabay), the same 100%-reliable source hotel articles already use. Extended `backfill-hero-image/index.ts` to also target rows matching the broken Google-photo pattern (not just `NULL`), and to look up `restaurant_ids`→city (previously only checked `hotel_ids`). Deployed both functions directly to Supabase; ran the fix via the existing `backfill-hero-image.yml` workflow_dispatch.
  - DoD: `select count(*) from seo_articles where hero_image_url ilike '%googleapis.com/maps%'` = 0. Spot-checked Boston/Seattle (the two visibly broken in the user's screenshot) plus a random sample — all now real Unsplash JPEGs, 100-200KB, HTTP 200. Scanned the rest of the site for the same class of bug (all hotel articles, all evergreen `/destinations/*` static images, `/allergy-translation-card/`) — all fine, nothing else broken.

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

- [x] Fix `social-poster` starving Facebook behind an Instagram-only backlog
  - RATIONALE: User reported Facebook hadn't posted since 2026-09-13 (Los Angeles) despite Instagram posting daily. Root cause: the daily job picked a single "oldest incomplete on either platform" article per run — a backlog of 6 older articles that already had Facebook but were only missing Instagram (from before Instagram catch-up existed) meant every day's pick happened to only need Instagram, so Facebook's own gap (Seoul, then Dubai/Rio/Sydney/Lima) never got attempted at all. At one pick/day it would have taken another ~6 days before Facebook was even retried.
  - HOW-TO: `supabase/functions/social-poster/index.ts` now runs two independent oldest-first queries — one for articles missing Facebook, one for articles missing Instagram — and processes the (deduped) union each run, so both platforms' backlogs make progress every day regardless of which one happens to be older. Also fixed an unrelated but real bug found while investigating: the "Write job summary" step in `social-poster.yml`, `pinterest-poster.yml`, `content-pipeline.yml`, `gsc-report.yml`, `linkedin-poster.yml`, and `backfill-hero-image.yml` all interpolated `${{ steps.call.outputs.body }}` directly inside a single-quoted `echo`, which breaks (shell syntax error) whenever a title/caption contains an apostrophe (e.g. "Vancouver's") — the run then shows as a red ❌ in GitHub Actions even though the actual post already succeeded. Fixed by passing the body through an `env:` var instead.
  - DoD: Deployed; verified via a real `workflow_dispatch` run that the edge function's response now processes 2 distinct articles in one run (one missing-Facebook pick, one missing-Instagram pick) and that the job summary step no longer crashes on an apostrophe.

---

## Content Integrity

- [x] Stop showcasing negative/irrelevant reviews as top allergy evidence
  - RATIONALE: User spotted a live hotel card quoting an actual allergic-reaction incident ("my face broke out in a terribly itchy allergic reaction") under a green "✅ Allergy-conscious reviews from real guests" badge and a 4.8/5 "Allergy score" — the shared `classifyAndExtract()` scorer (duplicated in `hotel-search`, `restaurants-search`, `content-pipeline`) scored any `WARNING_PHRASES` match ('unsafe', 'reaction', 'anaphylaxis', 'epipen'...) at 0.95 — *higher* than genuine positive safety evidence (0.9) — so an actual allergy incident, or even an unrelated complaint that only matched on the bare word "unsafe" (staff harassment, a "sketchy neighborhood" comment), could become a place's top-billed, maximum-scored quote.
  - HOW-TO: `if (hasWarning) return null;` in `classifyAndExtract()` in all three functions — a warning signal is now excluded from evidence entirely rather than scored as the best case. Deployed to Supabase (hotel-search v76, restaurants-search v80, content-pipeline v44).
  - DoD: Live-tested (Bangkok hotel search returns only genuine positive snippets, no warning-phrase matches). Found and cleaned up 21 hotels + 7 restaurants already corrupted by the bug (`allergy_score` exactly 4.8 with a warning-phrase snippet as their only evidence) — deleted the bad source rows and nulled their `allergy_score`; `HotelCard` already falls back gracefully with no evidence shown. Also found and fixed the deeper issue: an article's own prose is generated once from that same raw evidence, so 3 already-published articles (`food-allergy-bangkok-hotels`, `tallinn-food-allergy-guide`, `food-allergies-reykjavik-guide`) had already paraphrased a bad excerpt directly into their body text — rewrote each in place (same id/slug/published_at) using only real, currently-evidenced hotels/restaurants, following the same no-fabrication rule the generation prompt enforces.

- [x] Remove fabricated guest-quote testimonials from static destination-*.ts pages
  - RATIONALE: While investigating the review-scoring bug above, found the same "never fabricate content" violation CLAUDE.md already documents once from `TopHotelsSection.tsx` — except at ~10x the scope, across all 22 live `src/data/destination-*.ts` pages, never caught by that earlier fix. 154 hardcoded `quote`/`guestReview` fields found; the `Hotel`/`Restaurant` type has no source/author field at all, 38 carried an outright invented reviewer name, and `destination-amsterdam.ts` additionally claimed a fake citation per quote ("(Source: Marriott Reviews)").
  - HOW-TO: Built a standalone, read-only `verify-quote` Edge Function (no DB writes, no shared code with `hotel-search`/`restaurants-search`/`content-pipeline`, so it couldn't regress any live process) that looks up each named place on Google Places and runs the same already-fixed `classifyAndExtract()` against its real reviews. Checked all 134 live entries (20 more in dead-code `destination-generic.ts` were deleted outright).
  - DoD: 19 entries had genuine, verifiable evidence and were replaced with the real review text (no invented attribution); the other 115 had no qualifying evidence and had their quote removed rather than replaced with anything invented. `npx tsc --noEmit` clean across all 22 edited files. Regression-tested `hotel-search`/`restaurants-search` before and after (both unchanged, unaffected, confirmed via live calls). `verify-quote` retired (stubbed to 410) now that the job is done.

- [x] Retire the stale `mcp` Edge Function; remove dead `allergyInfo` from Amsterdam hotels
  - RATIONALE: User flagged unverified `description`/`allergyInfo`/`amenities` claims in `destination-*.ts` (separate from, and never covered by, the quote-only cleanup above). Tracing `allergyInfo`'s consumers surfaced something more urgent: a live, public, unauthenticated `mcp` Edge Function (Lovable.dev MCP bundler, inlines the whole destination-data catalog into one frozen snapshot) that was never rebuilt after the fabricated-quote cleanup above — it was still actively serving the exact invented, falsely-attributed quotes that cleanup removed, to any external AI client that queried it.
  - HOW-TO: Confirmed via full-codebase search that nothing internal calls the `mcp` endpoint (no frontend route, no other Edge Function) — user confirmed disabling it first ("won't this break other site processes?"), then approved once confirmed it's genuinely standalone. Stubbed to 410, same pattern as `verify-quote`. Separately, spot-verified a sample of the 27 `allergyInfo` entries against independent sources (AIC membership records, Tripadvisor, restaurant directories): Italy/Madrid/Warm Winter's 17 restaurant entries (dedicated gluten-free/vegan specialty places) all check out genuine; the 10 Amsterdam hotel entries contain specific technical claims ("HEPA filtration systems", "Michelin-trained allergen-free cuisine") that independent sources don't corroborate for those specific properties.
  - DoD: `mcp` v23 deployed and live-verified returning 410. Removed `allergyInfo` from the 10 Amsterdam hotels (narrow scope, user-approved) — but traced first and found it's **dead data on the live page already** (`TopHotelsSection`/`HotelCard` never reads it; its only real consumer was the now-retired `mcp` function), so this specific edit has no visible effect on `/destinations/amsterdam/` today. `npx tsc --noEmit` clean. **Flagged, not done**: the same unverifiable specifics are duplicated into `description`/`amenities` on those same 10 hotels, which *are* rendered live — out of scope for this round's "narrow first" approach; a decision on those (and the 4 Amsterdam restaurant `allergyInfo` entries, not yet checked) is still open. Rebuilding `mcp` properly from clean data needs Lovable.dev's own MCP bundler, not available in this environment.

- [x] Christmas-markets / holiday-season article series (user request)
  - RATIONALE: User asked for a series of articles on allergy-friendly Christmas-market travel, split by region (matching the existing `/destinations/region/` hub pattern). Real-evidence-only applies here too — no Christmas-specific hotel claim may be made beyond what a real guest review actually supports.
  - HOW-TO: Built `discover-city`, a standalone one-off Edge Function reusing `content-pipeline`'s exact already-fixed `discoverHotels()` logic (same query, same `classifyAndExtract()`, same `hotels`/`hotel_sources`/`hotel_allergy_info` persistence) to seed real evidence for cities not yet in the DB, without touching any live function. Europe pilot: Vienna, Strasbourg, Innsbruck, Cologne (Munich/Salzburg skipped, no qualifying evidence). North America round: New York, Montreal, Boston (framed "holiday season" rather than "Christmas market" — no dedicated market-stall tradition there).
  - DoD: 7 articles published — `vienna-christmas-markets-allergy-friendly-hotels`, `strasbourg-christmas-market-allergy-friendly-hotel`, `innsbruck-christmas-markets-allergy-friendly-hotels`, `cologne-christmas-markets-allergy-friendly-hotels`, `new-york-holiday-season-allergy-friendly-hotels`, `montreal-christmas-market-allergy-friendly-hotel`, `boston-holiday-season-allergy-friendly-hotel` — each hand-written from real evidence only, no warning-phrase language. **Closed out as-is**: user redirected the "ski vacation" intent (originally meant for this series) into a separate pillar-article series below instead of continuing this one into more cities/regions (Asia discovery was done — 3 real Tokyo hotels, 1 ambiguous Seoul match — but never turned into an article and is not planned to be). No hero images (`hero_image_url` null on all 7). `discover-city` carried forward to the ski series below rather than retired here.

- [x] Ski-vacation pillar article series (user request, corrected from the Christmas-markets series above)
  - RATIONALE: User clarified mid-series that the intended theme was ski vacations, not Christmas markets, and asked for a different structure than the rest of the site's one-article-per-city pattern: one combined pillar article per continent (Europe, US), internally organized by country/state and then by ski destination. Real-evidence-only applies here too.
  - HOW-TO: Ran `discover-city` against 17 ski-town candidates. Usable real evidence found in 10: Zermatt, St. Moritz (Switzerland), Kitzbühel (Austria), Cortina d'Ampezzo (Italy), Courchevel (France), Park City (Utah), Jackson Hole (Wyoming), Stowe (Vermont), Sun Valley (Idaho). No qualifying evidence: Aspen, Vail, Breckenridge, Telluride, Chamonix. One review excluded by hand despite a high classifier score — One&Only Moonlight Basin (Big Sky, Montana) was a guest reporting the hotel's welcome amenities were *unsafe* for their children's nut/peanut allergy, not a positive accommodation story; same "negative review scored as positive evidence" failure mode as the fix at the top of this file's Content Integrity section, just one that didn't happen to trip `hasWarning`.
  - DoD: 2 articles published — `europe-ski-vacation-allergy-friendly-hotels` (8 hotels across Switzerland/Austria/Italy/France) and `us-ski-vacation-allergy-friendly-hotels` (5 hotels across Utah/Wyoming/Vermont/Idaho) — each organized by country or state, then ski destination, per the user's requested layout. Added a "Quick answer" lead paragraph and a plain-markdown FAQ section to both (user asked specifically for strong SEO/GEO) — no JSON-LD FAQPage schema or markdown tables, since `ArticleDetail.tsx` renders `content_markdown` through bare `react-markdown` with no `remark-gfm`, and this was a content-only round by design. No hero images. `discover-city` still deployed (budget-gated, same ₪100/month shared ceiling as `hotel-search`); worth retiring (stub to 410) if no further rounds are planned for this series.

- [x] Stop showing generic Tripadvisor reviews as allergy evidence; title/SEO cleanup
  - RATIONALE: User spotted a live card (W Amsterdam) showing an unrelated Tripadvisor review ("Nice room, large enough for two people...") right under an "Allergy-clean rooms" badge — `tripadvisor-reviews`, unlike the other three review-evidence functions, never ran Tripadvisor's reviews through any allergy-relevance check; it cached the API's top 3 verbatim and the frontend used `reviews[0]` unconditionally. Same "never fabricate/misrepresent relevance" principle as every fix above, just a code path that had never been covered by it. Also asked to remove "Real Guest Reviews" from article titles (reads as straining for credibility) and to keep new articles SEO-strong.
  - HOW-TO: Ported the same `classifyAndExtract` term lists + `hasWarning` exclusion from `hotel-search`/`restaurants-search`/`content-pipeline` into a new `filterAllergyRelevantReviews()` in `tripadvisor-reviews`, applied at serve time on both the cache-hit and fresh-fetch paths — so already-cached rows self-heal with no re-fetch and no added Tripadvisor budget cost. Raised the raw candidate pool kept per place from 3 to 15 (same single API call, free). While verifying, also found and fixed `city` being accepted but never used in Tripadvisor's search query, letting a same-named wrong-location property be matched (confirmed live: Kitzbühel's "Hotel Elisabeth" resolved to an unrelated "Hotel Garni Elisabeth" in Zell am Ziller) — now included in the query.
  - DoD: Deployed (`tripadvisor-reviews` v8). Live-verified the exact W Amsterdam case now returns `reviews: []` (rating/count/link still shown, just no misleading quote). Removed "Real Guest Reviews" from 5 article titles. Fixed a duplicate-`<h1>` on the 2 new ski articles (`content_markdown` had its own leading `# Title` line on top of `ArticleDetail.tsx`'s own `<h1>{article.title}</h1>` — `react-markdown` has no heading overrides in this repo, so both rendered). **Flagged, not done**: (1) existing `tripadvisor_cache` rows cached before the city fix may still hold a wrong location/rating/URL — needs a dedicated audit; (2) the same duplicate-H1 pattern likely exists across the rest of the article corpus (confirmed present in the Cologne article checked as a reference) — not audited site-wide; (3) while investigating, found `src/data/destination-*.ts` static pages still carry extensive unverified `description`/`allergyInfo`/`amenities` claims per hotel (e.g. Amsterdam's W Amsterdam: "Premium allergy accommodations, dust-free cleaning protocols, HEPA filtration systems") that were never covered by the earlier quote-only fabrication cleanup — same class of problem, much bigger scope, needs its own decision/task before touching.

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
