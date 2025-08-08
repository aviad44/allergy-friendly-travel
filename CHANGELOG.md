# Changelog

All notable changes to this project will be documented in this file.

## 2025-08-08
- Added governance and QA tooling: TASKS.md, CHANGELOG.md, PR template.
- Added Lighthouse and Axe Node scripts (scripts/run-lh.mjs, scripts/run-axe.mjs).
- Installed dev dependencies for performance and accessibility audits.
- SEO: Consolidated meta/OG/Twitter into MetaManager; added canonical normalization and JSON-LD (Organization, Breadcrumbs, Hotels).
- Completed SEO migration on remaining pages (AboutUs, DirectChat, FAQ, Sitemap, SearchResults, Destinations Index, Paris, New York, Hotel Chains). Removed legacy SocialSharingHandler. Implemented dynamic SEO for /search-results.
