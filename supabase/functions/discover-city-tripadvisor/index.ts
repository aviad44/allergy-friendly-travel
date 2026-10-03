import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================================
// ONE-OFF TOOL — 2026-10-01
// ==========================================
// Tripadvisor-based counterpart to discover-city (which uses Google
// Places). Google's Place Details caps at 5 visible reviews per place and
// "allergy friendly hotels in X" text search tends to surface mainstream
// chain hotels whose top-5 reviews are generic ("amazing stay") rather
// than allergy-specific — confirmed live 2026-10-01 against Nashville,
// which has 2 already-verified real hotels that don't even appear in a
// fresh 52-candidate Google search for that exact query. This is a second,
// independent discovery path using its own candidate set (Tripadvisor's
// own location search) and the exact same (now-fixed) per-sentence
// classifier as tripadvisor-reviews/hotel-search/restaurants-search/
// content-pipeline. Live-verified 2026-10-01, though: this account's Terra
// API tier caps /locations/{id}/reviews at exactly 3 reviews per location
// regardless of requested size (not the "up to 15" originally assumed here
// — see tripadvisor-reviews/index.ts and CHANGELOG/TASKS for the full
// finding), so in practice this tool's real edge over discover-city is its
// different candidate pool, not deeper review coverage per place — a minor,
// supplementary source rather than the fix for Google's low hit rate it was
// first hoped to be. Shares the SAME ₪50/month Tripadvisor budget ceiling
// as tripadvisor-reviews (reads the same tripadvisor_cache row count), and
// writes to the same hotels/hotel_sources/hotel_allergy_info tables as
// discover-city, with source_type 'tripadvisor' instead of 'google' so
// provenance is traceable. Safe to delete/retire once this round of
// article work is done.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const STRICT_TERMS = [
  'food allergy', 'severe allergy', 'multiple allergies',
  'allergy aware', 'allergy conscious', 'allergy safe', 'allergy friendly',
  'allergen free', 'allergen menu', 'allergen info', 'allergen list',
  'gluten free', 'glutenfree', 'gluten-free',
  'dairy free', 'dairyfree', 'dairy-free', 'milk free',
  'lactose free', 'lactosefree', 'lactose-free',
  'nut free', 'nutfree', 'nut-free', 'peanut free', 'peanutfree', 'peanut-free',
  'egg free', 'eggfree', 'egg-free',
  'soy free', 'soyfree', 'soy-free',
  'sesame free', 'sesame-free',
  'wheat free', 'wheat-free',
  'celiac', 'coeliac', 'celiac disease',
  'lactose intolerant', 'gluten intolerant',
  'food sensitivities', 'food sensitivity', 'intolerance', 'intolerant',
  'peanut allergy', 'nut allergy', 'tree nut allergy',
  'milk allergy', 'egg allergy', 'soy allergy',
  'fish allergy', 'seafood allergy', 'shellfish allergy',
  'senza glutine', 'senza lattosio', 'senza noci', 'senza uova',
  'sin gluten', 'sin lactosa', 'sin nueces',
  'sans gluten', 'sans lactose', 'sans noix',
  'glutenfrei', 'laktosefrei', 'nussfrei',
  'dietary needs', 'dietary requirements', 'special dietary',
  'gf menu', 'gf options', 'df options', 'nf options',
  'room service allergy', 'breakfast allergy', 'buffet allergy',
];

const WEAK_TERMS = [
  'gluten', 'dairy', 'lactose', 'wheat',
  'peanut', 'peanuts', 'tree nut', 'nuts', 'almond', 'hazelnut', 'walnut',
  'pecan', 'cashew', 'pistachio', 'macadamia',
  'soy', 'soya', 'sesame',
  'shellfish', 'shrimp', 'crab', 'lobster',
  'vegan', 'vegetarian', 'plant based', 'plant-based',
  'no eggs', 'no dairy', 'no nuts', 'no shellfish', 'no seafood',
  'without nuts', 'without dairy',
  'special diet', 'dietary', 'food restrictions',
];

const SAFETY_TERMS = [
  'cross contamination', 'cross contact',
  'traces', 'may contain', 'contains traces',
  'shared kitchen', 'shared fryer',
  'allergen menu', 'allergen information', 'allergen list',
  'dietary restrictions', 'dietary requirement', 'special diet',
  'accommodated my allergy', 'can accommodate', 'accommodating', 'very accommodating',
  'informed staff', 'knowledgeable staff', 'staff understood', 'took it seriously',
  'safe to eat', 'felt safe', 'felt comfortable', 'cautious', 'careful',
  'allergy protocol', 'allergy friendly kitchen', 'chef spoke to us', 'chef came to our table',
];

const WARNING_PHRASES = [
  'not safe', 'unsafe', 'reaction', 'allergic reaction',
  'epipen', 'epi pen', 'anaphylaxis', 'anaphylactic',
];

const GENERIC_ALLERGY_TERMS = ['allergy', 'allergies', 'allergic', 'allergen', 'allergens'];
const FOOD_CONTEXT_TERMS = ['food', 'meal', 'meals', 'eat', 'eating', 'ate', 'menu', 'kitchen', 'diet', 'dish', 'dishes', 'cook', 'cooked', 'chef', 'restaurant', 'dining', 'breakfast', 'lunch', 'dinner', 'buffet', 'snack'];

const NEGATION_MARKERS = [
  'no ', 'not ', 'lack of', 'lacking', 'lacks', 'missing',
  'limited', 'disappointing', 'nothing for', 'none of', 'barely any', 'hardly any',
  'doesn t', 'didn t', 'don t', 'wasn t', 'isn t', 'aren t', 'weren t', 'haven t', 'hasn t', 'won t',
];
const DOUBLE_NEGATIVE_POSITIVES = [
  'no problem', 'no issue', 'no trouble', 'no worries', 'no complaints', 'no difficulty',
  'without any problem', 'without issue', 'without difficulty', 'without trouble', 'without a problem', 'without any issue',
];

// Contractions without an apostrophe ("dont", "cant", "wont"...) survive
// normalize() as a single word, not split into "don t"/"can t" the way
// NEGATION_MARKERS' apostrophe'd forms expect — confirmed live 2026-10-01:
// "they dont even have one version of a lactose free... milk" slipped
// through as a false positive because of this gap. Word-boundary regex
// (not a plain substring, since "cant" is also a real substring of
// "Cantonese"/"cantina") catches the informal spelling too.
const CONTRACTION_NEGATION_REGEX = /\b(dont|cant|wont|isnt|arent|wasnt|werent|hasnt|hadnt|doesnt|didnt|couldnt|wouldnt|shouldnt)\b/;

const ALLERGEN_LABELS: Record<string, string> = {
  'gluten free': 'gluten', 'glutenfree': 'gluten', 'gluten-free': 'gluten', 'gluten': 'gluten', 'celiac': 'gluten', 'coeliac': 'gluten', 'celiac disease': 'gluten',
  'dairy free': 'dairy', 'dairyfree': 'dairy', 'dairy-free': 'dairy', 'dairy': 'dairy', 'lactose': 'dairy', 'lactose free': 'dairy', 'lactose intolerant': 'dairy', 'milk free': 'dairy', 'milk allergy': 'dairy',
  'nut free': 'nuts', 'nutfree': 'nuts', 'nut-free': 'nuts', 'nuts': 'nuts', 'nut allergy': 'nuts', 'tree nut allergy': 'nuts', 'peanut': 'peanuts', 'peanuts': 'peanuts', 'peanut free': 'peanuts', 'peanut allergy': 'peanuts',
  'egg free': 'eggs', 'eggfree': 'eggs', 'egg-free': 'eggs', 'no eggs': 'eggs', 'egg allergy': 'eggs',
  'soy free': 'soy', 'soyfree': 'soy', 'soy-free': 'soy', 'soy': 'soy', 'soya': 'soy', 'soy allergy': 'soy',
  'shellfish': 'shellfish', 'shellfish allergy': 'shellfish', 'shrimp': 'shellfish', 'crab': 'shellfish', 'lobster': 'shellfish', 'seafood allergy': 'shellfish', 'fish allergy': 'shellfish',
  'sesame free': 'sesame', 'sesame-free': 'sesame', 'sesame': 'sesame',
  'vegan': 'vegan', 'vegetarian': 'vegetarian',
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findTerms(text: string, terms: string[]): string[] {
  const matches: string[] = [];
  for (const term of terms) {
    const pattern = normalize(term).replace(/\s+/g, '\\s+');
    if (new RegExp(`\\b${pattern}\\b`, 'i').test(text)) matches.push(term);
  }
  return matches;
}

interface ReviewSnippet {
  text: string;
  score: number;
  matchedTerms: string[];
  allergens: string[];
}

// Per-sentence matching, same fixed logic as hotel-search/restaurants-search/
// content-pipeline/tripadvisor-reviews (2026-10-01).
function classifyAndExtract(reviewText: string): ReviewSnippet | null {
  const positiveWords = ['great', 'excellent', 'amazing', 'delicious', 'wonderful', 'fantastic', 'recommend', 'love', 'best', 'perfect'];
  const dietaryIndicators = ['gluten', 'dairy free', 'lactose'];

  const sentences = reviewText.split(/(?<=[.!?])\s+/);
  let bestScore = 0;
  const matchedSentences: string[] = [];
  const allMatchedSet = new Set<string>();

  for (const s of sentences) {
    const normS = normalize(s);

    const sStrict = findTerms(normS, STRICT_TERMS);
    const sWeak = findTerms(normS, WEAK_TERMS);
    const sSafety = findTerms(normS, SAFETY_TERMS);
    const sWarning = findTerms(normS, WARNING_PHRASES);
    const sGeneric = findTerms(normS, GENERIC_ALLERGY_TERMS);
    const sFoodCtx = findTerms(normS, FOOD_CONTEXT_TERMS);

    if (sWarning.length > 0) continue;

    const hasAnyAllergyTerm = sStrict.length > 0 || sWeak.length > 0 || sGeneric.length > 0;
    if (!hasAnyAllergyTerm) continue;

    const isSuggestionComplaint = normS.includes('recommend') && normS.includes('include');
    const isDoubleNegativePositive = DOUBLE_NEGATIVE_POSITIVES.some(p => normS.includes(p));
    const isNegated = !isDoubleNegativePositive && (NEGATION_MARKERS.some(m => normS.includes(m)) || CONTRACTION_NEGATION_REGEX.test(normS));
    if (isSuggestionComplaint || isNegated) continue;

    const hasStrictS = sStrict.length > 0;
    const hasWeakS = sWeak.length > 0;
    const hasSafetyS = sSafety.length > 0;
    const hasGenericS = sGeneric.length > 0;
    const hasFoodCtxS = sFoodCtx.length > 0;
    const hasDietaryS = dietaryIndicators.some(d => normS.includes(d));
    const hasPositiveS = positiveWords.some(w => normS.includes(w));

    const hasFoodAllergyEvidenceS = hasStrictS || (hasGenericS && (hasWeakS || hasDietaryS || hasSafetyS || hasFoodCtxS));
    const isRelevantS = hasFoodAllergyEvidenceS || (hasWeakS && hasSafetyS) || (hasDietaryS && hasPositiveS);
    if (!isRelevantS) continue;

    let scoreS = 0;
    if (hasFoodAllergyEvidenceS && hasSafetyS) scoreS = 0.9;
    else if (hasFoodAllergyEvidenceS) scoreS = 0.75;
    else if (hasWeakS && hasSafetyS) scoreS = 0.6;
    else if (hasDietaryS && hasPositiveS) scoreS = 0.4;

    bestScore = Math.max(bestScore, scoreS);
    matchedSentences.push(s.trim());
    [...sStrict, ...sWeak, ...sSafety, ...(hasFoodAllergyEvidenceS ? sGeneric : [])].forEach(t => allMatchedSet.add(t));
  }

  if (matchedSentences.length === 0) return null;

  let snippetText = matchedSentences.join(' ');
  if (snippetText.length > 300) snippetText = snippetText.substring(0, 297) + '...';

  const allMatched = [...allMatchedSet];
  const allergens = [...new Set(allMatched.map(t => ALLERGEN_LABELS[t]).filter(Boolean))];

  return { text: snippetText, score: bestScore, matchedTerms: allMatched.slice(0, 6), allergens };
}

async function taFetch(path: string, apiKey: string): Promise<any | null> {
  const res = await fetch(`https://terra.tripadvisor.com/api${path}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) {
    console.error(`Tripadvisor ${path} failed:`, res.status, await res.text());
    return null;
  }
  return res.json();
}

function slugify(name: string, city: string): string {
  return `${name}-${city}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Tripadvisor's bare-city-name search (see the /locations/search comment
// above) does a fuzzy NAME match with no city/region filter, so a listing
// can come back for "Vancouver" even though it's actually ~500km up the
// coast — confirmed live 2026-10-03: "King Pacific Lodge" matched a
// Vancouver hotel search and was saved with city="Vancouver", but its own
// returned address is "Milbanke Sound, Bella Bella V7E 0B5 Canada", nowhere
// near Vancouver. The Terra API's location details give no structured
// city/region field to filter on, only this free-text `formatted` address
// string, so this checks whether any significant word of the target city
// actually appears in it before the candidate is accepted.
function cityMatchesAddress(city: string, addressFormatted: string | null): boolean {
  if (!addressFormatted) return true; // can't verify — don't block discovery over a missing field
  const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ');
  const addrWords = strip(addressFormatted);
  const cityWords = strip(city).split(/\s+/).filter((w) => w.length >= 3);
  if (cityWords.length === 0) return true;
  return cityWords.some((w) => new RegExp(`\\b${w}\\b`).test(addrWords));
}

// Shares the exact same budget accounting as tripadvisor-reviews (same
// table, same formula) — one shared ceiling across both tools, raised
// ₪50→₪75/month 2026-10-02 with explicit user authorization (see
// hotel-search/index.ts's copy of the Google equivalent for the full
// writeup), then ₪75→₪100/month 2026-10-03 (also explicit user
// authorization) after the ₪75 ceiling blocked a requested re-run for
// New York.
const TRIPADVISOR_COST_PER_CALL_ILS = 0.056;
const CALLS_PER_NEW_PLACE = 3;
const MONTHLY_BUDGET_ILS = 100;
const BUDGET_SAFETY_MARGIN = 0.9;

async function isMonthlyBudgetExceeded(supabase: any): Promise<boolean> {
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from('tripadvisor_cache')
    .select('id', { count: 'exact', head: true })
    .gte('fetched_at', monthStart.toISOString());
  if (error) return true;
  const costIls = (count ?? 0) * CALLS_PER_NEW_PLACE * TRIPADVISOR_COST_PER_CALL_ILS;
  return costIls >= MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { city, country, category, maxCandidates } = await req.json();
    if (!city || !country) {
      return new Response(JSON.stringify({ error: 'city and country are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiKey = Deno.env.get('TRIPADVISOR_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!apiKey || !supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Missing environment configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (await isMonthlyBudgetExceeded(supabase)) {
      return new Response(JSON.stringify({ error: 'Tripadvisor monthly budget reached, skipping' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const isRestaurant = category === 'restaurant';
    const taCategory = isRestaurant ? 'RESTAURANT' : 'HOTEL';
    // Plain city name, not "hotels in X" — Tripadvisor's /locations/search
    // does a fuzzy name match rather than full-text search like Google's
    // Text Search, so a natural-language query returns zero results
    // (confirmed live 2026-10-01: "hotels in Vilnius" -> 0 results,
    // "Vilnius" -> 127 results). The `category` param already scopes to
    // hotels/restaurants.
    const searchResult = await taFetch(`/locations/search?query=${encodeURIComponent(city)}&category=${taCategory}`, apiKey);
    const candidates: any[] = searchResult?.data ?? [];

    const cap = Math.min(maxCandidates ?? 20, 40);
    const discovered: { id: string; name: string; score: number; text: string; allergens: string[] }[] = [];
    let placesChecked = 0;

    for (const candidate of candidates.slice(0, cap)) {
      if (await isMonthlyBudgetExceeded(supabase)) break;

      const locationId = candidate?.location?.id;
      // Location name comes back as an array of {language, value, primary}
      // entries, not a flat `name` string (confirmed live 2026-10-01 — the
      // original version of this silently extracted `undefined` for every
      // candidate, which is why the very first live run found 0 discovered
      // despite 127 real candidates).
      const nameEntries: any[] = candidate?.location?.names ?? [];
      const name: string | undefined = nameEntries.find((n) => n.primary)?.value ?? nameEntries[0]?.value;
      if (!locationId || !name) continue;

      const [details, reviewsRes] = await Promise.all([
        taFetch(`/locations/${locationId}?locale=en-US`, apiKey),
        taFetch(`/locations/${locationId}/reviews?locale=en-US`, apiKey),
      ]);
      placesChecked++;

      const rawReviews = (reviewsRes?.data ?? []).slice(0, 15);
      let best: ReviewSnippet | null = null;
      for (const r of rawReviews) {
        const text = r.text?.find((t: any) => t.primary)?.value ?? r.text?.[0]?.value ?? '';
        const snip = classifyAndExtract(text);
        if (snip && (!best || snip.score > best.score)) best = snip;
      }

      // Cache this place regardless of match, same as tripadvisor-reviews,
      // so budget accounting stays accurate and re-discovery doesn't
      // re-bill the same place.
      const placeKey = `${name}|${city}`.toLowerCase().trim().replace(/\s+/g, ' ');
      await supabase.from('tripadvisor_cache').upsert({
        place_key: placeKey, name, category: isRestaurant ? 'restaurant' : 'hotel', found: true,
        tripadvisor_location_id: locationId,
        rating: details?.traveler_ratings?.overall?.rating ?? null,
        review_count: details?.traveler_ratings?.overall?.count ?? null,
        tripadvisor_url: details?.urls?.tripadvisor?.main ?? null,
        reviews: rawReviews.map((r: any) => ({
          rating: r.rating,
          text: r.text?.find((t: any) => t.primary)?.value ?? r.text?.[0]?.value ?? '',
          author: r.user?.username ?? 'Tripadvisor traveler',
          url: r.url,
        })),
      }, { onConflict: 'place_key' });

      if (!best) continue;

      // `addresses` is an array (same shape as `names`), not a singular
      // `address` object — same class of bug as the name extraction above.
      const addressFormatted: string | null = details?.addresses?.find((a: any) => a?.formatted)?.formatted ?? details?.addresses?.[0]?.formatted ?? null;
      if (!cityMatchesAddress(city, addressFormatted)) {
        console.warn(`[discover-city-tripadvisor] geo-mismatch: "${name}" address "${addressFormatted}" doesn't mention "${city}" — skipping`);
        continue;
      }

      const slug = slugify(name, city);
      const allergyScore = Math.min(5, Math.max(1, Math.round(best.score * 5 * 10) / 10));
      const table = isRestaurant ? 'restaurants' : 'hotels';
      const idCol = isRestaurant ? 'restaurant_id' : 'hotel_id';
      const sourceTable = isRestaurant ? 'restaurant_sources' : 'hotel_sources';
      const infoTable = isRestaurant ? 'restaurant_allergy_info' : 'hotel_allergy_info';

      const upsertPayload: Record<string, unknown> = {
        name, slug, city, country,
        address: addressFormatted,
        allergy_score: allergyScore,
        verified: false, active: true,
        updated_at: new Date().toISOString(),
      };
      if (!isRestaurant) {
        upsertPayload.booking_url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${name} ${city}`)}`;
      }

      const { data: row, error: upsertErr } = await supabase
        .from(table).upsert(upsertPayload, { onConflict: 'slug' }).select('id').single();
      if (upsertErr || !row) continue;

      await supabase.from(sourceTable).insert({
        [idCol]: row.id,
        source_type: 'tripadvisor',
        source_url: details?.urls?.tripadvisor?.main ?? null,
        title: name,
        snippet: best.text,
        allergy_score: allergyScore,
        raw_text: best.text,
        ai_summary: null,
      });

      for (const allergen of best.allergens) {
        await supabase.from(infoTable).upsert({
          [idCol]: row.id, allergen_type: allergen, support_level: 'on_request',
          notes: best.text, source_url: details?.urls?.tripadvisor?.main ?? null,
        }, { onConflict: `${idCol},allergen_type` });
      }

      discovered.push({ id: row.id, name, score: allergyScore, text: best.text, allergens: best.allergens });
    }

    return new Response(JSON.stringify({
      city, country, category: isRestaurant ? 'restaurant' : 'hotel',
      candidatesFound: candidates.length, placesChecked, discovered,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'discovery failed', message: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
