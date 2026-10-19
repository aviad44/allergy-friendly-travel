import type { ComponentType } from 'react';

export interface NewsFaq {
  question: string;
  answer: string;
}

export interface NewsSource {
  label: string;
  url: string;
}

// One hand-written, fact-checked news article. News lives in code rather
// than in `seo_articles` on purpose: every consumer of that table
// (social-poster, pinterest-poster, linkedin-poster, gsc-report, the XML
// sitemap, prerender) builds URLs as /destinations/ or /restaurants/ from
// content_type and assumes hotel_ids/restaurant_ids — a news row there would
// be posted and indexed under a wrong, 404ing URL.
export interface NewsArticle {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title> tag — keep it close to 60 characters. */
  seoTitle: string;
  /** Meta description — keep it under ~155 characters. */
  description: string;
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  heroImage: string;
  heroAlt: string;
  heroCredit?: string;
  /** Short answer-first summary shown above the body (and cited by AI answer engines). */
  keyTakeaways: string[];
  /** Rendered visibly AND as FAQPage JSON-LD from the same data, so they never drift apart. */
  faqs: NewsFaq[];
  /** Primary sources every factual claim in the body traces to. */
  sources: NewsSource[];
  Body: ComponentType;
}
