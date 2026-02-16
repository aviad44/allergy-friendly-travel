import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// FAST MODE CONFIG — Cost-optimized
// 1 Text Search call + up to 8 Place Details (reviews only)
// ==========================================
const FAST_MODE = {
  maxDetailsToFetch: 8,      // Hard cap: never more than 8 Details calls
  targetResults: 8,          // Stop once we have 8 with allergy quotes
  maxReviewsToScan: 5,       // Per place, scan first 5 reviews
  cacheTtlDays: 14,
};

// ==========================================
// ALLERGY KEYWORD LISTS
// ==========================================
const STRICT_TERMS = [
  'allergy', 'allergies', 'allergic', 'allergen', 'allergens',
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
  'can accommodate', 'accommodated my', 'very accommodating',
  'gf menu', 'gf options', 'df options', 'nf options',
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
  'allergy protocol', 'allergy friendly kitchen',
];

const WARNING_PHRASES = [
  'not safe', 'unsafe', 'reaction', 'allergic reaction',
  'epipen', 'epi pen', 'anaphylaxis', 'anaphylactic',
];

// ==========================================
// TEXT HELPERS
// ==========================================
function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findTerms(text: string, terms: string[]): string[] {
  const matches: string[] = [];
  for (const term of terms) {
    const pattern = normalize(term).replace(/\s+/g, '\\s+');
    if (new RegExp(`\\b${pattern}\\b`, 'i').test(text)) {
      matches.push(term);
    }
  }
  return matches;
}

// ==========================================
// REVIEW CLASSIFICATION & SNIPPET EXTRACTION
// ==========================================
interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
  matchedTerms: string[];
}

function classifyAndExtract(reviewText: string, author: string, relativeTime: string): ReviewSnippet | null {
  const norm = normalize(reviewText);

  const strictMatches = findTerms(norm, STRICT_TERMS);
  const weakMatches = findTerms(norm, WEAK_TERMS);
  const safetyMatches = findTerms(norm, SAFETY_TERMS);
  const warningMatches = findTerms(norm, WARNING_PHRASES);

  const hasStrict = strictMatches.length > 0;
  const hasWeak = weakMatches.length > 0;
  const hasSafety = safetyMatches.length > 0;
  const hasWarning = warningMatches.length > 0;

  const positiveWords = ['great', 'excellent', 'amazing', 'delicious', 'wonderful', 'fantastic', 'recommend', 'love', 'best', 'perfect'];
  const hasPositive = positiveWords.some(w => norm.includes(w));
  const dietaryIndicators = ['vegan', 'vegetarian', 'plant based', 'plant-based', 'gluten', 'dairy free', 'lactose'];
  const hasDietary = dietaryIndicators.some(d => norm.includes(d));

  const isRelevant = hasStrict || hasWarning || (hasWeak && (hasSafety || hasWarning)) || (hasDietary && hasPositive);

  if (!isRelevant) return null;

  let score = 0;
  if (hasWarning) score = 0.95;
  else if (hasStrict && hasSafety) score = 0.9;
  else if (hasStrict) score = 0.75;
  else if (hasWeak && hasSafety) score = 0.6;
  else if (hasDietary && hasPositive) score = 0.4;

  const allMatched = [...strictMatches, ...weakMatches, ...safetyMatches, ...warningMatches];

  // Extract only sentences with allergy terms
  const sentences = reviewText.split(/(?<=[.!?])\s+/);
  const relevant: string[] = [];
  for (const s of sentences) {
    const normS = normalize(s);
    if (allMatched.some(t => normS.includes(normalize(t)))) {
      relevant.push(s.trim());
    }
  }

  let snippetText = relevant.length > 0 ? relevant.join(' ') : reviewText;
  if (snippetText.length > 250) snippetText = snippetText.substring(0, 247) + '...';

  return {
    text: snippetText,
    author,
    relativeTime,
    hasAllergyMention: true,
    score,
    matchedTerms: allMatched.slice(0, 6),
  };
}

function findBestSnippet(reviews: any[]): ReviewSnippet | null {
  if (!reviews || reviews.length === 0) return null;

  let best: ReviewSnippet | null = null;

  for (const review of reviews.slice(0, FAST_MODE.maxReviewsToScan)) {
    const text = review.text || '';
    if (!text) continue;

    const author = review.author_name || 'Anonymous';
    const relTime = review.relative_time_description || '';

    const snippet = classifyAndExtract(text, author, relTime);
    if (snippet && (!best || snippet.score > best.score)) {
      best = snippet;
    }
  }

  return best;
}

// ==========================================
// QUERY BUILDING
// ==========================================
const allergyPhraseMap: Record<string, string> = {
  'celiac': 'celiac friendly', 'celiac disease': 'celiac friendly',
  'gluten': 'gluten free', 'peanuts': 'peanut allergy friendly',
  'peanut': 'peanut allergy friendly', 'tree nuts': 'tree nut allergy friendly',
  'nuts': 'nut allergy friendly', 'dairy': 'dairy free',
  'lactose': 'lactose free', 'eggs': 'egg free', 'egg': 'egg free',
  'soy': 'soy free', 'fish': 'fish allergy friendly',
  'shellfish': 'shellfish allergy friendly', 'sesame': 'sesame free',
  'vegan': 'vegan', 'vegetarian': 'vegetarian',
};

const allergyPriority = [
  'celiac disease', 'celiac', 'gluten', 'peanuts', 'peanut',
  'tree nuts', 'nuts', 'dairy', 'lactose', 'eggs', 'egg',
  'soy', 'fish', 'shellfish', 'sesame', 'vegan', 'vegetarian'
];

function getPrimaryPhrase(allergies: string[]): string {
  const lower = allergies.map(a => a.toLowerCase().trim());
  for (const p of allergyPriority) {
    if (lower.some(a => a.includes(p) || p.includes(a))) {
      return allergyPhraseMap[p];
    }
  }
  return 'allergy friendly';
}

// ==========================================
// GOOGLE PLACES API (Legacy — Text Search + Place Details)
// ==========================================

// Step A: Single Text Search call — cheap, returns candidates with rating/totalRatings for free
async function textSearch(query: string, apiKey: string): Promise<any[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&language=en&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`❌ Text Search failed: ${data.status} — ${data.error_message || ''}`);
    return [];
  }

  return data.results || [];
}

// Step B: Place Details — ONLY reviews + url. No contact/atmosphere fields.
async function fetchReviews(placeId: string, apiKey: string): Promise<any | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,url&language=en&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK' || !data.result) {
    return null;
  }

  return data.result;
}

// ==========================================
// SEARCH-LEVEL CACHE (14-day TTL)
// ==========================================
function buildCacheKey(destination: string, allergies: string[]): { dest: string; allg: string } {
  return {
    dest: destination.toLowerCase().trim(),
    allg: [...allergies].map(a => a.toLowerCase().trim()).sort().join(','),
  };
}

async function getCachedSearch(supabase: any, dest: string, allg: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('search_cache')
      .select('results_json, created_at')
      .eq('destination_normalized', dest)
      .eq('allergies_normalized', allg)
      .eq('mode', 'fast')
      .single();

    if (error || !data) return null;

    const age = Date.now() - new Date(data.created_at).getTime();
    if (age > FAST_MODE.cacheTtlDays * 24 * 60 * 60 * 1000) return null;

    return data.results_json;
  } catch {
    return null;
  }
}

async function setCachedSearch(supabase: any, dest: string, allg: string, payload: any, count: number): Promise<void> {
  try {
    await supabase.from('search_cache').upsert({
      destination_normalized: dest,
      allergies_normalized: allg,
      language: 'en',
      mode: 'fast',
      results_json: payload,
      google_calls_count: payload.googleCallsCount || 1,
      results_returned: count,
      created_at: new Date().toISOString(),
    }, { onConflict: 'destination_normalized,allergies_normalized,language,mode' });
  } catch (err) {
    console.log('⚠️ Cache write error:', err);
  }
}

// ==========================================
// LOGGING
// ==========================================
async function logSearch(supabase: any, searchId: string, destination: string, allergies: string[], googleCalls: number, resultsReturned: number, cacheHit: boolean, durationMs: number): Promise<void> {
  try {
    await supabase.from('search_log').insert({
      search_id: searchId, destination, allergies,
      mode: 'fast', google_calls_count: googleCalls,
      results_returned: resultsReturned, cache_hit: cacheHit, duration_ms: durationMs,
    });
  } catch (err) {
    console.log('⚠️ Log write error:', err);
  }
}

// ==========================================
// RESULT TYPE (matches frontend RestaurantInfo)
// ==========================================
interface PlaceResult {
  name: string;
  address: string;
  rating: number | null;
  totalRatings: number | null;
  mapsUrl: string;
  reviewSnippet: ReviewSnippet | null;
  confidenceLevel: 'high' | 'medium' | 'low';
  evidenceStatus: 'evidence_found' | 'no_evidence' | 'insufficient_evidence';
  placeId: string;
}

// ==========================================
// MAIN HANDLER
// ==========================================
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const searchId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  try {
    const { destination, allergies, mode = 'fast' } = await req.json();

    console.log(`🔍 [${searchId}] dest="${destination}", allergies=${JSON.stringify(allergies)}`);

    if (!destination) {
      return new Response(JSON.stringify({ error: 'Destination is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

    const allergiesArray = Array.isArray(allergies) ? allergies : [];
    const primaryPhrase = getPrimaryPhrase(allergiesArray);
    const queryPhrase = `${primaryPhrase} restaurants in ${destination}`;
    const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(queryPhrase)}`;

    // ---- STEP 1: Search-level cache ----
    const { dest: cDest, allg: cAllg } = buildCacheKey(destination, allergiesArray);

    if (supabase) {
      const cached = await getCachedSearch(supabase, cDest, cAllg);
      if (cached) {
        const dur = Date.now() - startTime;
        console.log(`✅ [${searchId}] CACHE HIT — ${cached.places?.length || 0} results in ${dur}ms`);
        await logSearch(supabase, searchId, destination, allergiesArray, 0, cached.places?.length || 0, true, dur);

        return new Response(JSON.stringify({
          destination, mode: 'fast', queryPhrase: primaryPhrase,
          places: cached.places || [],
          totalCandidates: cached.places?.length || 0, detailsFetched: 0,
          stats: { evidenceFound: (cached.places || []).length, cacheHits: (cached.places || []).length, totalTimeMs: dur },
          expandSearchAvailable: false, fallbackUrl,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // ---- STEP 2: Single Text Search call ----
    console.log(`🌐 [${searchId}] Text Search: "${queryPhrase}"`);
    const candidates = await textSearch(queryPhrase, apiKey);
    let googleCalls = 1;

    console.log(`📊 [${searchId}] ${candidates.length} candidates`);

    if (candidates.length === 0) {
      const dur = Date.now() - startTime;
      if (supabase) await logSearch(supabase, searchId, destination, allergiesArray, googleCalls, 0, false, dur);
      return new Response(JSON.stringify({
        destination, mode: 'fast', queryPhrase: primaryPhrase,
        places: [], totalCandidates: 0, detailsFetched: 0,
        stats: { evidenceFound: 0, totalTimeMs: dur },
        expandSearchAvailable: true, fallbackUrl,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ---- STEP 3: Fetch reviews for top candidates, early stop at 8 results ----
    const results: PlaceResult[] = [];
    let detailsFetched = 0;

    // Process up to 20 candidates but stop fetching details at 8
    for (const candidate of candidates) {
      if (results.length >= FAST_MODE.targetResults) {
        console.log(`✅ [${searchId}] Early stop: ${results.length} results with allergy quotes`);
        break;
      }
      if (detailsFetched >= FAST_MODE.maxDetailsToFetch) {
        console.log(`🛑 [${searchId}] Details cap reached: ${detailsFetched}`);
        break;
      }

      // Fetch only reviews + url
      const details = await fetchReviews(candidate.place_id, apiKey);
      detailsFetched++;
      googleCalls++;

      const reviews = details?.reviews || [];
      const snippet = findBestSnippet(reviews);

      if (!snippet) continue; // No allergy evidence — skip

      let confidenceLevel: 'high' | 'medium' | 'low' = 'low';
      if (snippet.score >= 0.7) confidenceLevel = 'high';
      else if (snippet.score >= 0.5) confidenceLevel = 'medium';

      results.push({
        name: candidate.name,
        address: candidate.formatted_address || '',
        rating: candidate.rating ?? null,
        totalRatings: candidate.user_ratings_total ?? null,
        mapsUrl: details?.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
        reviewSnippet: snippet,
        confidenceLevel,
        evidenceStatus: 'evidence_found',
        placeId: candidate.place_id,
      });
    }

    // Sort by confidence
    results.sort((a, b) => {
      const sa = a.reviewSnippet?.score || 0;
      const sb = b.reviewSnippet?.score || 0;
      if (sb !== sa) return sb - sa;
      return (b.rating || 0) - (a.rating || 0);
    });

    const dur = Date.now() - startTime;

    // ---- STEP 4: Cache & log ----
    const cachePayload = { places: results, queryPhrase: primaryPhrase, googleCallsCount: googleCalls };
    if (supabase) {
      if (results.length > 0) await setCachedSearch(supabase, cDest, cAllg, cachePayload, results.length);
      await logSearch(supabase, searchId, destination, allergiesArray, googleCalls, results.length, false, dur);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`💰 [${searchId}] COST LOG`);
    console.log(`   googleCalls=${googleCalls} (1 text + ${detailsFetched} details)`);
    console.log(`   resultsReturned=${results.length}`);
    console.log(`   cacheHit=false`);
    console.log(`   durationMs=${dur}`);
    console.log(`${'='.repeat(50)}\n`);

    return new Response(JSON.stringify({
      destination, mode: 'fast', queryPhrase: primaryPhrase,
      places: results,
      totalCandidates: candidates.length, detailsFetched,
      stats: { evidenceFound: results.length, cacheHits: 0, totalTimeMs: dur },
      expandSearchAvailable: results.length < 3, fallbackUrl,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error(`💥 [${searchId}] Error:`, error);
    return new Response(JSON.stringify({
      error: 'An error occurred while searching for restaurants',
      fallbackUrl: 'https://www.google.com/maps/search/allergy+friendly+restaurants',
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
