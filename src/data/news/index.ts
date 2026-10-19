import type { NewsArticle } from './types';
import { airlineFoodAllergyPolicies2026 } from './airline-food-allergy-policies-2026';

export type { NewsArticle, NewsFaq, NewsSource } from './types';

// To publish a new article: add a module next to this one and list it here,
// then add its path to STATIC_PATHS in netlify/functions/sitemap.cjs (that
// list also drives prerendering). Newest first.
export const NEWS_ARTICLES: NewsArticle[] = [airlineFoodAllergyPolicies2026].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}
