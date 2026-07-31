// Peak-season lookup used to surface currently in-season destinations first
// on the /destinations grid. Keyed by static destination id (matches
// src/data/destinations-list.ts) or by lowercased city name (matches the
// `city` field on auto-generated hotel articles, joined from the `hotels`
// table) — one shared map covers both, since a city only needs one entry
// regardless of which system produced the page.
//
// Values are the 1-12 month numbers when the destination is at its best.
// Southern Hemisphere entries use their real calendar (Dec-Mar summer), not
// a Northern-Hemisphere-flipped label, so "in season now" stays correct
// everywhere rather than only for one hemisphere.
//
// Not an attempt at exhaustive tourism-season research for every city in the
// rotation — deliberately conservative: only destinations with an obvious,
// strong seasonal skew (beach/tropical, ski, or "escape winter cold") are
// listed. Everything else (most city-break destinations, and all topical
// guides like Airlines/Hotel Chains/Cruise Lines) is intentionally absent —
// those rank as season-neutral rather than guessed into a bucket that isn't
// clearly true.
export const PEAK_MONTHS: Record<string, number[]> = {
  // Northern Hemisphere summer beach/warm-weather destinations
  'ayia-napa': [6, 7, 8, 9],
  'koh-samui': [6, 7, 8, 9],
  cyprus: [6, 7, 8, 9],
  crete: [6, 7, 8, 9],
  tuscany: [5, 6, 7, 8, 9],
  portugal: [6, 7, 8, 9],
  turkey: [6, 7, 8, 9],
  barcelona: [6, 7, 8],
  stockholm: [6, 7, 8],
  thailand: [6, 7, 8, 9],
  athens: [6, 7, 8, 9],
  nice: [6, 7, 8],
  marseille: [6, 7, 8],
  malaga: [6, 7, 8],
  valencia: [6, 7, 8],
  bilbao: [6, 7, 8],
  split: [6, 7, 8, 9],
  dubrovnik: [6, 7, 8, 9],
  venice: [5, 6, 7, 8, 9],
  naples: [5, 6, 7, 8, 9],
  bangkok: [6, 7, 8, 9],
  phuket: [6, 7, 8, 9],
  'chiang mai': [6, 7, 8, 9],
  bali: [6, 7, 8, 9],
  'kuala lumpur': [6, 7, 8, 9],
  'ho chi minh city': [6, 7, 8, 9],
  hanoi: [6, 7, 8, 9],
  goa: [6, 7, 8, 9],
  colombo: [6, 7, 8, 9],
  reykjavik: [6, 7, 8],
  oslo: [6, 7, 8],
  helsinki: [6, 7, 8],
  gothenburg: [6, 7, 8],
  bergen: [6, 7, 8],

  // Northern Hemisphere ski/mountain (winter) destinations
  'swiss-alps': [12, 1, 2, 3],
  innsbruck: [12, 1, 2, 3],
  salzburg: [12, 1, 2, 3],
  geneva: [12, 1, 2, 3],
  basel: [12, 1, 2, 3],

  // "Escape the cold" warm-winter destinations
  'warm-winter-destinations': [11, 12, 1, 2, 3],
  eilat: [11, 12, 1, 2, 3],
  'abu-dhabi': [11, 12, 1, 2, 3],
  dubai: [11, 12, 1, 2, 3],
  doha: [11, 12, 1, 2, 3],
  cairo: [11, 12, 1, 2, 3],
  marrakech: [10, 11, 12, 1, 2, 3],
  casablanca: [10, 11, 12, 1, 2, 3],
  miami: [11, 12, 1, 2, 3],
  cancun: [11, 12, 1, 2, 3],

  // Southern Hemisphere — real calendar summer (their warm season)
  sydney: [12, 1, 2, 3],
  melbourne: [12, 1, 2, 3],
  brisbane: [12, 1, 2, 3],
  perth: [12, 1, 2, 3],
  auckland: [12, 1, 2, 3],
  'buenos aires': [12, 1, 2, 3],
  'rio de janeiro': [12, 1, 2, 3],
  'sao paulo': [12, 1, 2, 3],
  santiago: [12, 1, 2, 3],
  'cape town': [12, 1, 2, 3],
  // Southern Hemisphere ski town — real calendar winter (Jun-Sep)
  queenstown: [6, 7, 8, 9],
};

export type SeasonTier = 0 | 1 | 2; // 0 = in season now, 1 = neutral (no data), 2 = off season

// Lower tier = higher display priority. Matches first by static destination
// id, then falls back to lowercased city name.
export function getSeasonTier(key: string, now: Date = new Date()): SeasonTier {
  const months = PEAK_MONTHS[key.toLowerCase()];
  if (!months) return 1;
  const currentMonth = now.getMonth() + 1;
  return months.includes(currentMonth) ? 0 : 2;
}
