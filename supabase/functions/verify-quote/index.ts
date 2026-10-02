import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================================
// ONE-OFF TOOL — rebuilt 2026-10-02, 144-static-hotel real-evidence pass
// ==========================================
// Read-only, standalone verification tool: given a batch of named
// hotels/restaurants (as they appear in src/data/destination-*.ts), looks
// each one up on Google Places and runs the same already-fixed
// classifyAndExtract() against its real reviews, returning whatever
// genuine allergy-relevant evidence (if any) was found. Makes NO database
// writes of any kind — same reasoning as the original verify-quote tool
// this replaces (see CHANGELOG 2026-09-30ish, the 134-quote fabrication
// cleanup): a read-only tool can't regress any live process, and the
// actual destination-*.ts edits are applied by hand from its output, not
// automatically.
//
// The original verify-quote was a one-off, deliberately thrown away
// (stubbed to 410) once that job was done, and was never committed to
// git — this is a fresh rebuild for the 144-entry real-evidence
// verification pass (see TASKS.md), same approach, now also wired into
// the shared Google budget ceiling (the original predates the 2026-10-02
// finding that every Google-calling function needs this — see
// content-pipeline's copy of this guard for the full writeup of why).
//
// Batch input (not one-hotel-per-call like the original) so a whole
// destination-*.ts file's worth of lookups can be done in a single
// request instead of ~5-10 separate round-trips.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ==========================================
// ALLERGY KEYWORD LISTS — verbatim copy, same as hotel-search/restaurants-search/
// content-pipeline/tripadvisor-reviews/discover-city/discover-city-tripadvisor
// ==========================================
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
  'gf', 'df', 'vg',
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

const CONTRACTION_NEGATION_REGEX = /\b(dont|cant|wont|isnt|arent|wasnt|werent|hasnt|hadnt|doesnt|didnt|couldnt|wouldnt|shouldnt)\b/;

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
}

// Per-sentence matching, same fixed logic as every other copy of this
// classifier in the project (2026-10-01 fix — see CHANGELOG).
function classifyAndExtract(reviewText: string): ReviewSnippet | null {
  const positiveWords = ['great', 'excellent', 'amazing', 'delicious', 'wonderful', 'fantastic', 'recommend', 'love', 'best', 'perfect'];
  const dietaryIndicators = ['vegan', 'vegetarian', 'plant based', 'plant-based', 'gluten', 'dairy free', 'lactose'];

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

  return { text: snippetText, score: bestScore, matchedTerms: [...allMatchedSet].slice(0, 6) };
}

async function textSearch(query: string, apiKey: string): Promise<any[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&language=en&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`Text Search failed: ${data.status}`);
    return [];
  }
  return data.results || [];
}

async function fetchDetails(placeId: string, apiKey: string): Promise<any | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,url,formatted_address&language=en&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK' || !data.result) return null;
  return data.result;
}

// ==========================================
// MONTHLY BUDGET GUARD — shared Google budget ceiling with hotel-search/
// restaurants-search/discover-city/content-pipeline
// ==========================================
// The original verify-quote predates the 2026-10-02 finding that every
// Google-calling function needs to share this ceiling (see
// content-pipeline's copy of this guard for the full writeup of that gap)
// — this rebuild adds it from the start rather than repeating the mistake.
// Logs under its own mode, 'quote_verify', and the other five functions'
// isMonthlyBudgetExceeded() checks now include this mode too.
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

interface VerifyRequest {
  name: string;
  city: string;
  country?: string;
}

interface VerifyResult {
  name: string;
  city: string;
  found: boolean;
  placeId?: string;
  address?: string;
  mapsUrl?: string;
  evidence: { text: string; score: number; matchedTerms: string[] } | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { hotels } = await req.json() as { hotels: VerifyRequest[] };
    if (!Array.isArray(hotels) || hotels.length === 0) {
      return new Response(JSON.stringify({ error: 'hotels array is required' }),
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
      return new Response(JSON.stringify({ error: 'Monthly budget reached, skipping', results: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const results: VerifyResult[] = [];
    let googleCalls = 0;

    for (const hotel of hotels) {
      if (googleCalls > 0 && await isMonthlyBudgetExceeded(supabase)) {
        console.log('Budget reached mid-batch — stopping further lookups');
        break;
      }

      const query = hotel.city ? `${hotel.name} ${hotel.city}` : hotel.name;
      const candidates = await textSearch(query, apiKey);
      googleCalls++;

      const top = candidates[0];
      if (!top) {
        results.push({ name: hotel.name, city: hotel.city, found: false, evidence: null });
        continue;
      }

      const details = await fetchDetails(top.place_id, apiKey);
      googleCalls++;

      const reviews = details?.reviews || [];
      let best: ReviewSnippet | null = null;
      for (const review of reviews.slice(0, 5)) {
        const snip = classifyAndExtract(review.text || '');
        if (snip && (!best || snip.score > best.score)) best = snip;
      }

      results.push({
        name: hotel.name,
        city: hotel.city,
        found: true,
        placeId: top.place_id,
        address: top.formatted_address || details?.formatted_address,
        mapsUrl: details?.url || `https://www.google.com/maps/place/?q=place_id:${top.place_id}`,
        evidence: best,
      });
    }

    await supabase.from('search_log').insert({
      search_id: `quote-verify-${Date.now()}`,
      destination: hotels[0]?.city || 'batch',
      allergies: [],
      mode: 'quote_verify',
      google_calls_count: googleCalls,
      results_returned: results.filter(r => r.evidence).length,
      cache_hit: false,
      duration_ms: 0,
    });

    return new Response(JSON.stringify({ results, googleCalls }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'verification failed', message: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
