import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================================
// ONE-OFF TOOL — 2026-10-01, Christmas-markets pilot
// ==========================================
// Standalone city-discovery tool, used to seed real hotel evidence for
// cities not yet in the daily content-pipeline rotation's DB. Reuses the
// exact, already-fixed discoverHotels()/classifyAndExtract() logic from
// content-pipeline/index.ts verbatim (per-sentence matching + negation
// detection, fixed 2026-10-01 — see CHANGELOG) -- same classification,
// same hotels/hotel_sources/hotel_allergy_info persistence -- just
// triggered on demand for one city instead of the daily rotation.
// Deliberately NOT a change to content-pipeline itself, so it can't
// regress the live daily job. Safe to delete/retire once this round of
// article work is done.
//
// Candidate scan depth raised 30->60 (2026-10-01, same round): the
// original 30-candidate cap missed real, already-verified hotels (e.g.
// Nashville's Union Station and Fairfield by Marriott, both with genuine
// positive evidence from an earlier deeper scan) because Google's
// relevance ranking for "allergy friendly hotels in X" doesn't reliably
// put the best-evidenced hotel in the top 30 -- now matches
// content-pipeline's own discoverHotels() cap exactly.
//
// Multi-query search added 2026-10-01 (same round, user directive): a
// single "allergy friendly hotels in X" query mostly surfaces mainstream
// chain hotels (Hilton, Marriott, Hyatt) whose visible reviews are
// generic — confirmed live against 6 cities including Nashville, which
// has 2 confirmed-real hotels that don't even appear in a fresh 52-result
// search for that exact query. Running 3 differently-phrased queries and
// merging/deduplicating their candidates by place_id surfaces a
// meaningfully different, more specialty-skewed pool (small boutique
// hotels and B&Bs that actively brand themselves around dietary
// accommodation, which chains don't) — verified live: a bare "gluten
// free hotel X" / "celiac friendly hotel X" query returns different
// top results than the original phrasing for the same city. Each query
// still costs just 1 extra Text Search call (negligible); the expensive
// part (Place Details, up to 60 calls) stays capped at 60 TOTAL across
// the merged candidate pool, not 60 per query, so overall cost per city
// is barely higher than the single-query version.

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

// Per-sentence matching (fixed 2026-10-01, ported verbatim from
// content-pipeline/hotel-search/restaurants-search) — see CHANGELOG for
// the full rationale: whole-text matching let negated sentences ("No
// gluten free options") score as positive, and let a safety word in one
// sentence pair with an allergy word in an unrelated sentence.
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

async function textSearch(query: string, apiKey: string, placeType: string): Promise<any[]> {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=${placeType}&language=en&key=${apiKey}`;
  let results: any[] = [];
  let nextPageToken: string | undefined;

  for (let page = 0; page < 3; page++) {
    const url = nextPageToken ? `${baseUrl}&pagetoken=${nextPageToken}` : baseUrl;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') break;
    results = results.concat(data.results || []);
    nextPageToken = data.next_page_token;
    if (!nextPageToken) break;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return results;
}

async function fetchDetails(placeId: string, apiKey: string): Promise<any | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,url,website&language=en&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK' || !data.result) return null;
  return data.result;
}

function slugify(name: string, city: string): string {
  return `${name}-${city}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Same shared ceiling as hotel-search/restaurants-search/content-pipeline.
// Raised ₪100→₪250/month 2026-10-02 with explicit user authorization — see
// hotel-search/index.ts's copy of this constant for the full writeup.
const MONTHLY_BUDGET_ILS = 250;
const BUDGET_SAFETY_MARGIN = 0.9;
const COST_PER_CALL_ILS = 0.0342;

async function isMonthlyBudgetExceeded(supabase: any): Promise<boolean> {
  try {
    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);
    const { data, error } = await supabase
      .from('search_log')
      .select('google_calls_count')
      // 'content_pipeline' added 2026-10-02 — that function now shares this
      // same ceiling too (see its own copy of this guard for the writeup).
      .in('mode', ['hotels_fast', 'fast', 'article_photo', 'content_pipeline', 'quote_verify'])
      .eq('cache_hit', false)
      .gte('created_at', monthStart.toISOString());
    if (error || !data) return true;
    const totalCalls = data.reduce((sum: number, row: any) => sum + (row.google_calls_count || 0), 0);
    return totalCalls * COST_PER_CALL_ILS >= MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN;
  } catch {
    return true;
  }
}

// Three differently-phrased queries whose results are merged and
// deduplicated by place_id before scoring — see the top-of-file comment
// for why: the original single "allergy friendly hotels/restaurants in X"
// phrasing skews heavily toward mainstream chains with generic reviews.
function buildQueries(city: string, isRestaurant: boolean): string[] {
  return isRestaurant
    ? [
        `allergy friendly restaurants in ${city}`,
        `gluten free restaurant ${city}`,
        `celiac friendly restaurant ${city}`,
      ]
    : [
        `allergy friendly hotels in ${city}`,
        `gluten free hotel ${city}`,
        `celiac friendly hotel ${city}`,
      ];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { city, country, category } = await req.json();
    if (!city || !country) {
      return new Response(JSON.stringify({ error: 'city and country are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!apiKey || !supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Missing environment configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (await isMonthlyBudgetExceeded(supabase)) {
      return new Response(JSON.stringify({ error: 'Monthly budget reached, skipping' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const isRestaurant = category === 'restaurant';
    const placeType = isRestaurant ? 'restaurant' : 'lodging';
    const queries = buildQueries(city, isRestaurant);

    const seenPlaceIds = new Set<string>();
    const candidates: any[] = [];
    let googleCalls = 0;
    for (const q of queries) {
      const results = await textSearch(q, apiKey, placeType);
      googleCalls++; // textSearch's own pagination calls aren't separately counted here, matching the original single-query accounting
      for (const r of results) {
        if (r.place_id && !seenPlaceIds.has(r.place_id)) {
          seenPlaceIds.add(r.place_id);
          candidates.push(r);
        }
      }
    }

    const discovered: { id: string; name: string; score: number; text: string; allergens: string[] }[] = [];
    let detailsFetched = 0;

    for (const candidate of candidates.slice(0, 60)) {
      if (detailsFetched >= 60) break;
      const details = await fetchDetails(candidate.place_id, apiKey);
      detailsFetched++;
      googleCalls++;
      const reviews = details?.reviews || [];

      let best: ReviewSnippet | null = null;
      for (const review of reviews.slice(0, 5)) {
        const snip = classifyAndExtract(review.text || '');
        if (snip && (!best || snip.score > best.score)) best = snip;
      }
      if (!best) continue;

      const slug = slugify(candidate.name, city);
      const allergyScore = Math.min(5, Math.max(1, Math.round(best.score * 5 * 10) / 10));
      const table = isRestaurant ? 'restaurants' : 'hotels';
      const idCol = isRestaurant ? 'restaurant_id' : 'hotel_id';
      const sourceTable = isRestaurant ? 'restaurant_sources' : 'hotel_sources';
      const infoTable = isRestaurant ? 'restaurant_allergy_info' : 'hotel_allergy_info';

      const upsertPayload: Record<string, unknown> = {
        name: candidate.name,
        slug,
        city,
        country,
        address: candidate.formatted_address || null,
        website_url: details?.website || null,
        latitude: candidate.geometry?.location?.lat ?? null,
        longitude: candidate.geometry?.location?.lng ?? null,
        allergy_score: allergyScore,
        verified: false,
        active: true,
        updated_at: new Date().toISOString(),
      };
      if (!isRestaurant) {
        upsertPayload.booking_url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${candidate.name} ${city}`)}`;
      }

      const { data: row, error: upsertErr } = await supabase
        .from(table)
        .upsert(upsertPayload, { onConflict: 'slug' })
        .select('id')
        .single();
      if (upsertErr || !row) continue;

      await supabase.from(sourceTable).insert({
        [idCol]: row.id,
        source_type: 'google',
        source_url: details?.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
        title: candidate.name,
        snippet: best.text,
        allergy_score: allergyScore,
        raw_text: best.text,
        ai_summary: null,
      });

      for (const allergen of best.allergens) {
        await supabase.from(infoTable).upsert({
          [idCol]: row.id,
          allergen_type: allergen,
          support_level: 'on_request',
          notes: best.text,
          source_url: details?.url || null,
        }, { onConflict: `${idCol},allergen_type` });
      }

      discovered.push({ id: row.id, name: candidate.name, score: allergyScore, text: best.text, allergens: best.allergens });
    }

    await supabase.from('search_log').insert({
      search_id: `discover-city-${Date.now()}`, destination: city, allergies: [],
      mode: 'hotels_fast', google_calls_count: googleCalls,
      results_returned: discovered.length, cache_hit: false, duration_ms: 0,
    });

    return new Response(JSON.stringify({
      city, country, category: isRestaurant ? 'restaurant' : 'hotel',
      queriesUsed: queries, candidatesFound: candidates.length, detailsFetched, discovered,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'discovery failed', message: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
