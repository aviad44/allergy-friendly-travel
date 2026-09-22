// Region taxonomy for grouping destination/restaurant guides geographically
// (both the ~29 hand-authored evergreen pages in destinations-list.ts and
// the unbounded, daily-growing content-pipeline articles in seo_articles).
// Purely additive: nothing here changes how any existing page resolves.
export type RegionSlug =
  | 'europe'
  | 'north-america'
  | 'south-america'
  | 'asia'
  | 'middle-east'
  | 'oceania'
  | 'worldwide';

export interface RegionDef {
  slug: RegionSlug;
  label: string;
  description: string;
}

export const REGIONS: RegionDef[] = [
  { slug: 'europe', label: 'Europe', description: 'Allergy-friendly hotel and restaurant guides across Europe.' },
  { slug: 'north-america', label: 'North America', description: 'Allergy-friendly hotel and restaurant guides across the US, Canada, Mexico and the Caribbean.' },
  { slug: 'south-america', label: 'South America', description: 'Allergy-friendly hotel and restaurant guides across South America.' },
  { slug: 'asia', label: 'Asia', description: 'Allergy-friendly hotel and restaurant guides across Asia.' },
  { slug: 'middle-east', label: 'Middle East', description: 'Allergy-friendly hotel and restaurant guides across the Middle East.' },
  { slug: 'oceania', label: 'Oceania', description: 'Allergy-friendly hotel and restaurant guides across Australia and the Pacific.' },
  { slug: 'worldwide', label: 'Worldwide Guides', description: 'Allergy-friendly guides that span multiple destinations — hotel chains, cruise lines, airlines and seasonal picks.' },
];

const REGION_SLUGS = new Set<string>(REGIONS.map((r) => r.slug));

export function isRegionSlug(value: string | undefined): value is RegionSlug {
  return !!value && REGION_SLUGS.has(value);
}

// Country strings as they actually appear in this project — the `hotels`/
// `restaurants` tables use short forms ("USA", "UAE"), the hand-authored
// destinations-list.ts uses long forms ("United States", "United Kingdom"),
// and a few static "topic" pages (gluten-free-europe, flying-with-epipens)
// use a continent name directly as their `country` field. All three are
// normalized here so one lookup covers every source.
const COUNTRY_TO_REGION: Record<string, RegionSlug> = {
  // Europe
  austria: 'europe',
  belgium: 'europe',
  croatia: 'europe',
  'czech republic': 'europe',
  denmark: 'europe',
  estonia: 'europe',
  finland: 'europe',
  france: 'europe',
  germany: 'europe',
  greece: 'europe',
  hungary: 'europe',
  ireland: 'europe',
  italy: 'europe',
  latvia: 'europe',
  lithuania: 'europe',
  netherlands: 'europe',
  norway: 'europe',
  poland: 'europe',
  portugal: 'europe',
  romania: 'europe',
  serbia: 'europe',
  slovakia: 'europe',
  spain: 'europe',
  sweden: 'europe',
  switzerland: 'europe',
  'united kingdom': 'europe',
  uk: 'europe',
  cyprus: 'europe',
  turkey: 'europe',
  europe: 'europe',
  // North America
  canada: 'north-america',
  usa: 'north-america',
  'united states': 'north-america',
  mexico: 'north-america',
  jamaica: 'north-america',
  'north america': 'north-america',
  // South America
  argentina: 'south-america',
  brazil: 'south-america',
  chile: 'south-america',
  colombia: 'south-america',
  peru: 'south-america',
  // Asia
  china: 'asia',
  indonesia: 'asia',
  japan: 'asia',
  singapore: 'asia',
  'south korea': 'asia',
  thailand: 'asia',
  // Middle East
  uae: 'middle-east',
  israel: 'middle-east',
  // Oceania
  australia: 'oceania',
  // Worldwide / multi-destination topic pages
  multiple: 'worldwide',
  worldwide: 'worldwide',
};

// Returns undefined (rather than a default/fallback region) for a country
// not yet in the map above — callers should treat that as "not grouped
// yet", not crash. When a new country starts showing up ungrouped, add it
// to COUNTRY_TO_REGION rather than guessing a default here.
export function getRegionForCountry(country: string | null | undefined): RegionSlug | undefined {
  if (!country) return undefined;
  return COUNTRY_TO_REGION[country.trim().toLowerCase()];
}
