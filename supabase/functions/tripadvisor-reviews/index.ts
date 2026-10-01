import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// TRIPADVISOR REVIEWS ENRICHMENT
// ==========================================
// Looks up a hotel/restaurant on Tripadvisor's Terra API (the Content API's
// replacement as of Aug 2026) and returns its real rating + any of its
// reviews that are genuinely about food allergies/dietary needs (filtered
// via the same classifier hotel-search/restaurants-search/content-pipeline
// use — see filterAllergyRelevantReviews below), with links back to
// Tripadvisor — genuine third-party content for detail pages, not a
// paraphrase of it, and never a generic review passed off as allergy
// evidence just because it's the only one Tripadvisor returned.
//
// Cached PERMANENTLY per place once found (no refresh): ratings/reviews
// don't shift meaningfully day to day, and every lookup is a billed
// "entity" on Tripadvisor's side, so re-fetching the same place buys us
// nothing but cost.
//
// Cost ceiling: same philosophy as hotel-search/restaurants-search — a
// hard monthly cap enforced in OUR OWN code, not Tripadvisor's own
// "Expected cost" estimator on their checkout page (which turned out to be
// non-binding: dragging it to 1000 entities still showed "$0 due today").
// TRIPADVISOR_COST_PER_CALL_ILS below is an approximation from their
// published $0.015/entity list price at an approximate USD/ILS rate — it
// is NOT yet calibrated against a real Tripadvisor invoice the way the
// Google Places constant was. Recalibrate once a month of real billing
// has posted.
const TRIPADVISOR_COST_PER_CALL_ILS = 0.056;
const CALLS_PER_NEW_PLACE = 3; // search + details + reviews — counted conservatively as 3 billable calls
// ₪50/month total, independent from the Google Places ₪100 ceiling — sized
// for two consumers sharing this same cache+budget: the slow-growing guide
// page catalog (small), plus hotel-search/restaurants-search enriching only
// the single top result per live search (measured from search_cache:
// ~400 distinct new places/month site-wide if every result were enriched,
// vs. roughly one lookup per unique destination search when scoped to the
// top result only — real Tripadvisor pricing is $0.015/entity, list price,
// not yet calibrated against an actual invoice).
const MONTHLY_BUDGET_ILS = 50;
const BUDGET_SAFETY_MARGIN = 0.9;

type Category = 'hotel' | 'restaurant';

// ==========================================
// ALLERGY RELEVANCE FILTER (same matcher as hotel-search/restaurants-search/
// content-pipeline, kept in sync) — applied to Tripadvisor's reviews before
// any of them are shown as a "quote" on a hotel/restaurant card.
// ==========================================
// Tripadvisor's API returns its own top/most-recent reviews for a place —
// there is no way to ask it for allergy-relevant ones specifically, and most
// reviews are about location, cleanliness or value, not food allergies. This
// function previously returned the top 3 reviews unfiltered, and the caller
// (TripadvisorEnrichedHotelCard) used reviews[0] as-is — so a hotel with no
// real allergy-specific review on Tripadvisor would still show a generic
// quote ("Nice room, large enough for two people...") right under an
// allergy-feature badge, implying relevance it didn't have. Found live
// 2026-10-01 (Amsterdam, among others). Same "never fabricate/misrepresent
// relevance" principle as every other review-evidence fix in this project —
// this is the one review-evidence path that had never been run through it.
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

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findTerms(text: string, terms: string[]): string[] {
  const matches: string[] = [];
  for (const term of terms) {
    const pattern = normalizeText(term).replace(/\s+/g, '\\s+');
    if (new RegExp(`\\b${pattern}\\b`, 'i').test(text)) {
      matches.push(term);
    }
  }
  return matches;
}

// Mirrors hotel-search/restaurants-search's classifyAndExtract scoring and
// hasWarning exclusion exactly, adapted for Tripadvisor's review shape.
// Returns null when the review isn't genuinely about food allergies/dietary
// needs — never shown as a quote in that case.
function classifyTripadvisorReview(text: string): { score: number; snippet: string } | null {
  if (!text) return null;
  const norm = normalizeText(text);

  const strictMatches = findTerms(norm, STRICT_TERMS);
  const weakMatches = findTerms(norm, WEAK_TERMS);
  const safetyMatches = findTerms(norm, SAFETY_TERMS);
  const warningMatches = findTerms(norm, WARNING_PHRASES);
  const genericAllergyMatches = findTerms(norm, GENERIC_ALLERGY_TERMS);
  const foodContextMatches = findTerms(norm, FOOD_CONTEXT_TERMS);

  const hasStrict = strictMatches.length > 0;
  const hasWeak = weakMatches.length > 0;
  const hasSafety = safetyMatches.length > 0;
  const hasWarning = warningMatches.length > 0;
  const hasGenericAllergy = genericAllergyMatches.length > 0;
  const hasFoodContext = foodContextMatches.length > 0;

  const positiveWords = ['great', 'excellent', 'amazing', 'delicious', 'wonderful', 'fantastic', 'recommend', 'love', 'best', 'perfect'];
  const hasPositive = positiveWords.some(w => norm.includes(w));
  const dietaryIndicators = ['vegan', 'vegetarian', 'plant based', 'plant-based', 'gluten', 'dairy free', 'lactose'];
  const hasDietary = dietaryIndicators.some(d => norm.includes(d));

  // A review flagging an actual allergic reaction/safety incident is never
  // shown as positive evidence, same as every other review-evidence path.
  if (hasWarning) return null;

  const hasFoodAllergyEvidence = hasStrict || (hasGenericAllergy && (hasWeak || hasDietary || hasSafety || hasFoodContext));
  const isRelevant = hasFoodAllergyEvidence || (hasWeak && hasSafety) || (hasDietary && hasPositive);
  if (!isRelevant) return null;

  let score = 0;
  if (hasFoodAllergyEvidence && hasSafety) score = 0.9;
  else if (hasFoodAllergyEvidence) score = 0.75;
  else if (hasWeak && hasSafety) score = 0.6;
  else if (hasDietary && hasPositive) score = 0.4;

  const allMatched = [...strictMatches, ...weakMatches, ...safetyMatches, ...(hasFoodAllergyEvidence ? genericAllergyMatches : [])];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const relevant = sentences.filter(s => allMatched.some(t => normalizeText(s).includes(normalizeText(t))));
  let snippet = relevant.length > 0 ? relevant.join(' ') : text;
  if (snippet.length > 250) snippet = snippet.substring(0, 247) + '...';

  return { score, snippet };
}

// Filters a Tripadvisor reviews array down to only the allergy-relevant
// ones, replaces each kept review's text with its extracted snippet, and
// sorts best-first. Applied at serve time (both on a fresh fetch and on a
// cache hit) so already-cached, pre-filter rows self-heal with no re-fetch
// and no added Tripadvisor API cost.
function filterAllergyRelevantReviews(reviews: any[]): any[] {
  return (reviews || [])
    .map((r) => ({ review: r, classified: classifyTripadvisorReview(r.text || '') }))
    .filter((r): r is { review: any; classified: { score: number; snippet: string } } => r.classified !== null)
    .sort((a, b) => b.classified.score - a.classified.score)
    .map(({ review, classified }) => ({ ...review, text: classified.snippet }));
}

function normalizeKey(name: string, city: string): string {
  return `${name}|${city}`.toLowerCase().trim().replace(/\s+/g, ' ');
}

async function isMonthlyBudgetExceeded(supabase: any): Promise<boolean> {
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('tripadvisor_cache')
    .select('id', { count: 'exact', head: true })
    .gte('fetched_at', monthStart.toISOString());

  if (error) {
    console.error('Tripadvisor budget check failed, failing closed:', error.message);
    return true;
  }

  const costIls = (count ?? 0) * CALLS_PER_NEW_PLACE * TRIPADVISOR_COST_PER_CALL_ILS;
  return costIls >= MONTHLY_BUDGET_ILS * BUDGET_SAFETY_MARGIN;
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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { name, city, category } = await req.json() as { name?: string; city?: string; category?: Category };
    if (!name || (category !== 'hotel' && category !== 'restaurant')) {
      return new Response(JSON.stringify({ error: "Missing name or category ('hotel' | 'restaurant')" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const apiKey = Deno.env.get('TRIPADVISOR_API_KEY');
    if (!supabaseUrl || !supabaseKey || !apiKey) {
      return new Response(JSON.stringify({ error: 'Missing configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const placeKey = normalizeKey(name, city || '');

    // 1. Cache hit — permanent, no refresh.
    const { data: cached } = await supabase
      .from('tripadvisor_cache')
      .select('*')
      .eq('place_key', placeKey)
      .maybeSingle();

    if (cached) {
      if (!cached.found) {
        return new Response(JSON.stringify({ available: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({
        available: true,
        rating: cached.rating,
        reviewCount: cached.review_count,
        tripadvisorUrl: cached.tripadvisor_url,
        // Re-filtered at serve time, not just at insert time — so hotels
        // cached before this filter existed self-heal with no re-fetch.
        reviews: filterAllergyRelevantReviews(cached.reviews),
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 2. Hard budget ceiling, checked before any live call.
    if (await isMonthlyBudgetExceeded(supabase)) {
      console.log('🛑 Tripadvisor monthly budget reached — skipping live lookup');
      return new Response(JSON.stringify({ available: false, budgetLimitReached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 3. Live lookup: name search -> details + reviews for the top match.
    // `city` was accepted as a parameter but never actually used in the
    // search query — name-only search let Tripadvisor's fuzzy matching
    // return a same-named but wrong property (confirmed live 2026-10-01:
    // "Hotel Elisabeth" in Kitzbühel, Austria matched to an unrelated
    // "Hotel Garni Elisabeth" in Zell am Ziller). Including the city in the
    // query is the same fix hotel-search/restaurants-search already apply
    // to their own place searches.
    const taCategory = category === 'hotel' ? 'HOTEL' : 'RESTAURANT';
    const searchQuery = city ? `${name} ${city}` : name;
    const searchResult = await taFetch(`/locations/search?query=${encodeURIComponent(searchQuery)}&category=${taCategory}`, apiKey);
    const locationId = searchResult?.data?.[0]?.location?.id;

    if (!locationId) {
      await supabase.from('tripadvisor_cache').insert({ place_key: placeKey, name, category, found: false });
      return new Response(JSON.stringify({ available: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const [details, reviewsRes] = await Promise.all([
      taFetch(`/locations/${locationId}?locale=en-US`, apiKey),
      taFetch(`/locations/${locationId}/reviews?locale=en-US`, apiKey),
    ]);

    const rating = details?.traveler_ratings?.overall?.rating ?? null;
    const reviewCount = details?.traveler_ratings?.overall?.count ?? null;
    const tripadvisorUrl = details?.urls?.tripadvisor?.main ?? null;
    // Not sliced to a small number before filtering — the single reviews
    // call already returns whatever page Tripadvisor gives us (typically
    // up to 10-15) at no extra cost, and most of them won't be about food
    // allergies, so keeping more raw candidates materially improves the
    // odds of finding one that actually is. The cache stores all of them
    // (raw, unfiltered) so a better future classifier can re-filter without
    // a re-fetch; only the filtered, best-first subset is ever returned.
    const reviews = (reviewsRes?.data ?? []).slice(0, 15).map((r: any) => ({
      rating: r.rating,
      text: r.text?.find((t: any) => t.primary)?.value ?? r.text?.[0]?.value ?? '',
      title: r.title?.find((t: any) => t.primary)?.value ?? r.title?.[0]?.value ?? '',
      author: r.user?.username ?? 'Tripadvisor traveler',
      publishedAt: r.publish_ts,
      url: r.url,
    }));

    await supabase.from('tripadvisor_cache').insert({
      place_key: placeKey, name, category, found: true,
      tripadvisor_location_id: locationId, rating, review_count: reviewCount,
      tripadvisor_url: tripadvisorUrl, reviews,
    });

    console.log(`✅ Tripadvisor: cached "${name}" (${locationId})`);
    return new Response(JSON.stringify({
      available: true, rating, reviewCount, tripadvisorUrl,
      reviews: filterAllergyRelevantReviews(reviews),
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('tripadvisor-reviews error:', err);
    return new Response(JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
