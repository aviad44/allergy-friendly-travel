# Changelog

All notable changes to this project will be documented in this file.

## 2026-09-13
- Fixed why Facebook hadn't posted in 3 days: `content-pipeline` silently failed to generate an article on 09-12 (logged as the useless `"[object Object]"` instead of the real error, because `String(err)` on a non-`Error` object loses the message — fixed everywhere the pipeline logs an error to `pipeline_log`), so `social-poster` kept retrying the same 09-11 article, which Facebook rejected twice running with a genuine Graph API error on its Google Places Photo hero image ("Missing or invalid image file") while Instagram posted the same image fine both times.
- Root-caused the deeper issue: Google Places Photos (used only for restaurant-guide hero images, when Unsplash/Pixabay wasn't used) are not licensed for redistribution to Facebook/Instagram/Pinterest as standalone marketing content — Google's Places API terms restrict content to display "within the Services" and require contributor attribution to appear alongside the photo, which none of the three posters' captions ever carried. `social-poster`, `pinterest-poster`, and `content-pipeline`'s on-publish Pinterest pin now all use only Unsplash/Pixabay images (properly licensed for this) for anything sent off-site, falling back to a fresh Unsplash/Pixabay fetch whenever an article's on-site hero image is Google-sourced — the article's own hero_image_url/credit shown on the site is never touched, since that on-site, single-place, attributed use is a legitimate one.
- `social-poster` no longer permanently abandons a recently-published article that fails on one platform — it now retries the oldest still-incomplete article within a 30-day window (was: always the single newest, which orphaned a stuck article the moment a newer one published) — and flags an error with "⚠️ STUCK Nd" once an article has gone 2+ days without posting somewhere, so it's visible in the job summary instead of blending into routine transient-error noise.

## 2026-09-07
- Fixed the real cause of guide pages showing up excluded in Search Console: `buildCanonical()` was stripping trailing slashes from every canonical URL, while the host actually 301-redirects every non-root path to *add* one — so every canonical tag site-wide pointed at a URL that immediately redirected. Fixed the shared canonical builder plus every other place that builds these URLs directly (sitemap.xml, JSON-LD, article/related-article links).

## 2026-08-30 (5)
- Live hotel/restaurant search now enriches the single top-ranked result of every fresh search with a real Tripadvisor rating + review excerpt, via the same `tripadvisor-reviews` function guide pages use — deliberately scoped to just the top result (not the whole list): measured from `search_cache`, enriching every result would mean ~400 distinct new places/month site-wide, vs. roughly one lookup per unique destination search when scoped to the top result. Raised the shared Tripadvisor budget ceiling from ₪25 to ₪50/month to cover both consumers (guide pages + this).
- `SearchResults.tsx`/`RestaurantCard.tsx` now render that Tripadvisor rating + review excerpt (visually distinguished from the existing Google-sourced quote) whenever it's present on a result.

## 2026-08-30 (4)
- Removed fabricated guest-quote testimonials (attributed to invented named guests) from `TopHotelsSection`'s hardcoded London/Barcelona/Abu Dhabi hotel blocks — these are real, well-known hotels, so they now get the same real Tripadvisor lookup as every other card instead of an invented review.

## 2026-08-30 (3)
- Hotel and restaurant guide pages now show real Tripadvisor ratings and a genuine review excerpt (with a link back), via a new `tripadvisor-reviews` Edge Function on Tripadvisor's Terra API. Cached permanently per place, gated by a hard monthly ILS budget ceiling enforced in our own code (separate from, and independent of, the Google Places one). Verified live end-to-end before shipping.
- Fixed `HotelCard`'s guest-review fallback text, which previously claimed reviews were "sourced from TripAdvisor, Booking.com, and Google Reviews" unconditionally, whether or not any were shown.

## 2026-08-30 (2)
- Pinterest automation reaches Facebook/Instagram-level maturity: `posted_to_pinterest_at` tracking + success logging on the existing on-publish pin, plus a new daily `pinterest-poster` backlog sweep (oldest-first, small batches) that Facebook/Instagram's equivalent deliberately skips — Pinterest content has long-tail search value unlike a social feed.
- The monthly search-budget guard (see below) now shows visitors the same calm "no results found" copy used for a genuine empty search, instead of a message naming an internal cost control.

## 2026-08-30 (1)
- Fixed hotel search returning too few results (often just 1) for hotel-dense cities: raised the Place Details candidate cap from 8 to 20 so more real hotels get checked per search before falling back.
- E-E-A-T: guide pages (hotel + restaurant articles) now attribute content to a real named author (visible byline + JSON-LD Person) instead of a generic organization voice, matching the founder identity already on /about.
- Added a hard monthly Google API budget ceiling (₪100, calibrated against real billing) shared by hotel-search and restaurants-search — both are public, unauthenticated, unthrottled endpoints that trigger real billed Google Places calls on every cache miss.
- SEO: added `noindex` to /search-results (unbounded, parameterized, near-duplicate thin content, not canonical guide content) and Pinterest domain verification meta tag.

## 2025-08-08
- Added governance and QA tooling: TASKS.md, CHANGELOG.md, PR template.
- Added Lighthouse and Axe Node scripts (scripts/run-lh.mjs, scripts/run-axe.mjs).
- Installed dev dependencies for performance and accessibility audits.
- SEO: Consolidated meta/OG/Twitter into MetaManager; added canonical normalization and JSON-LD (Organization, Breadcrumbs, Hotels).
- Completed SEO migration on remaining pages (AboutUs, DirectChat, FAQ, Sitemap, SearchResults, Destinations Index, Paris, New York, Hotel Chains). Removed legacy SocialSharingHandler. Implemented dynamic SEO for /search-results.
