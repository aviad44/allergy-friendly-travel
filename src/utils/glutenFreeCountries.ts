// Countries that get their own /gluten-free/<slug>/ page. Only countries with
// at least 5 published gluten-evidenced guides (checked 2026-10-08) are listed,
// so a country page is never a near-empty shell. `aliases` are the spellings
// that actually appear in hotels.country / restaurants.country (the tables mix
// short and long forms, e.g. "USA" / "United States"). To add a country, add it
// here and to STATIC_PATHS in netlify/functions/sitemap.cjs (prerender and
// sitemap read that list).
export interface GlutenFreeCountry {
  slug: string;
  label: string;
  aliases: string[];
}

export const GLUTEN_FREE_COUNTRIES: GlutenFreeCountry[] = [
  { slug: 'italy', label: 'Italy', aliases: ['italy'] },
  { slug: 'spain', label: 'Spain', aliases: ['spain'] },
  { slug: 'usa', label: 'the USA', aliases: ['usa', 'united states'] },
  { slug: 'canada', label: 'Canada', aliases: ['canada'] },
  { slug: 'germany', label: 'Germany', aliases: ['germany'] },
];

export function findGlutenFreeCountry(slug: string | undefined): GlutenFreeCountry | undefined {
  return GLUTEN_FREE_COUNTRIES.find((c) => c.slug === slug);
}

export function countryPageForName(name: string): GlutenFreeCountry | undefined {
  const key = name.trim().toLowerCase();
  return GLUTEN_FREE_COUNTRIES.find((c) => c.aliases.includes(key));
}
