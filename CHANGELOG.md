# Changelog

All notable changes to this project will be documented in this file.

## 2026-08-30 (3)
- Added `tripadvisor-reviews` Edge Function: looks up real Tripadvisor ratings + review excerpts (with links back) via their new Terra API, cached permanently per place, gated by a hard monthly budget ceiling enforced in our own code (independent from the Google Places one). Backend only — not yet wired into hotel/restaurant pages; pending the API secret being configured and a live verification pass.

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
