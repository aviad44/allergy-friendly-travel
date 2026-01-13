import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// MODE CONFIGURATION
// ==========================================
const FAST_MODE = {
  maxQueries: 6,          // More queries for better coverage
  maxPagesPerQuery: 2,    // Allow pagination for more results
  topNForDetails: 30,     // Fetch details for top 30
  maxResultsReturned: 20, // Return max 20
  minTextCharsForEvidence: 50, // Low threshold
  filterToEvidenceFound: true, // Show only evidence_found
};

const DEEP_MODE = {
  maxQueries: 8,          // Even more queries
  maxPagesPerQuery: 3,    // More pagination
  topNForDetails: 60,     // Fetch details for top 60
  maxResultsReturned: 50, // Return all
  minTextCharsForEvidence: 30, // Very low threshold
  filterToEvidenceFound: false, // Show all results
};

const PAGE_DELAY_MS = 1500;
const PARALLEL_DETAILS_BATCH = 10;
const MAX_TOTAL_TIME_MS = 25000;

// ==========================================
// STRICT LAYER A: Only Explicit Allergy/Free Terms
// These are STRONG signals that directly indicate allergy awareness
// ==========================================
const strictLayerATerms = [
  // Core explicit allergy terms
  'allergy', 'allergies', 'allergic', 'allergen', 'allergens',
  'food allergy', 'severe allergy', 'multiple allergies',
  'allergy aware', 'allergy conscious', 'allergy safe', 'allergy friendly',
  'allergen free', 'allergen menu', 'allergen info', 'allergen list',
  
  // Explicit "free" terms (strong signals)
  'gluten free', 'glutenfree', 'gluten-free',
  'dairy free', 'dairyfree', 'dairy-free', 'milk free',
  'lactose free', 'lactosefree', 'lactose-free',
  'nut free', 'nutfree', 'nut-free', 'peanut free', 'peanutfree', 'peanut-free',
  'egg free', 'eggfree', 'egg-free',
  'soy free', 'soyfree', 'soy-free',
  'sesame free', 'sesame-free',
  'wheat free', 'wheat-free',
  
  // Medical conditions
  'celiac', 'coeliac', 'celiac disease',
  'lactose intolerant', 'gluten intolerant',
  'food sensitivities', 'food sensitivity', 'intolerance', 'intolerant',
  
  // Explicit allergy phrases
  'peanut allergy', 'nut allergy', 'tree nut allergy',
  'milk allergy', 'egg allergy', 'soy allergy',
  'fish allergy', 'seafood allergy', 'shellfish allergy',
  
  // International explicit "free" terms
  'senza glutine', 'senza lattosio', 'senza noci', 'senza uova', // Italian
  'sin gluten', 'sin lactosa', 'sin nueces', // Spanish
  'sans gluten', 'sans lactose', 'sans noix', // French
  'glutenfrei', 'laktosefrei', 'nussfrei', // German
  
  // Explicit dietary accommodation phrases
  'dietary needs', 'dietary requirements', 'special dietary',
  'can accommodate', 'accommodated my', 'very accommodating',
  
  // Abbreviations in context (gf menu, df options, etc.)
  'gf menu', 'gf options', 'df options', 'nf options',
];

// ==========================================
// WEAK LAYER A: Ingredient mentions that need context
// These alone are NOT enough - they need Layer B confirmation
// ==========================================
const weakLayerATerms = [
  // Food items that could just be menu items
  'gluten', 'dairy', 'lactose', 'wheat',
  'peanut', 'peanuts', 'tree nut', 'nuts', 'almond', 'hazelnut', 'walnut', 
  'pecan', 'cashew', 'pistachio', 'macadamia',
  'soy', 'soya', 'sesame',
  'shellfish', 'shrimp', 'crab', 'lobster',
  'vegan', 'vegetarian', 'plant based', 'plant-based',
  'no eggs', 'no dairy', 'no nuts', 'no shellfish', 'no seafood',
  'without nuts', 'without dairy',
];

// ==========================================
// LAYER B: Safety and Accommodation Signals
// ==========================================
const layerBTerms = [
  'cross contamination', 'cross contact',
  'traces', 'may contain', 'contains traces',
  'shared kitchen', 'shared fryer',
  'allergen menu', 'allergen information', 'allergen list',
  'dietary restrictions', 'dietary requirement', 'special diet',
  'accommodated my allergy', 'can accommodate', 'accommodating', 'very accommodating',
  'informed staff', 'knowledgeable staff', 'staff understood', 'took it seriously',
  'safe to eat', 'felt safe', 'felt comfortable', 'cautious', 'careful',
  'allergy protocol', 'allergy friendly kitchen'
];

// ==========================================
// Strong Warning Phrases
// ==========================================
const strongWarningPhrases = [
  'not safe', 'unsafe', 'reaction', 'allergic reaction',
  'epipen', 'epi pen', 'anaphylaxis', 'anaphylactic'
];

// ==========================================
// Language mapping
// ==========================================
const DESTINATION_LANGUAGES: Record<string, string> = {
  'prague': 'cs', 'czech': 'cs',
  'rome': 'it', 'italy': 'it', 'milan': 'it', 'florence': 'it', 'tuscany': 'it',
  'venice': 'it', 'venezia': 'it', 'naples': 'it', 'napoli': 'it', 'bologna': 'it',
  'paris': 'fr', 'france': 'fr', 'lyon': 'fr', 'nice': 'fr', 'marseille': 'fr',
  'madrid': 'es', 'spain': 'es', 'barcelona': 'es', 'seville': 'es', 'valencia': 'es',
  'berlin': 'de', 'germany': 'de', 'munich': 'de', 'frankfurt': 'de', 'hamburg': 'de',
  'amsterdam': 'nl', 'netherlands': 'nl', 'rotterdam': 'nl',
  'lisbon': 'pt', 'portugal': 'pt', 'porto': 'pt',
  'athens': 'el', 'greece': 'el', 'crete': 'el', 'santorini': 'el', 'mykonos': 'el',
  'tokyo': 'ja', 'japan': 'ja', 'osaka': 'ja', 'kyoto': 'ja',
  'bangkok': 'th', 'thailand': 'th', 'phuket': 'th', 'chiang mai': 'th',
  'istanbul': 'tr', 'turkey': 'tr', 'antalya': 'tr',
  'london': 'en', 'uk': 'en', 'edinburgh': 'en', 'manchester': 'en',
  'new york': 'en', 'usa': 'en', 'los angeles': 'en', 'chicago': 'en', 'miami': 'en',
  'tel aviv': 'he', 'israel': 'he', 'jerusalem': 'he',
  'vienna': 'de', 'austria': 'de', 'salzburg': 'de',
  'zurich': 'de', 'switzerland': 'de', 'geneva': 'fr',
  'brussels': 'nl', 'belgium': 'nl',
  'dublin': 'en', 'ireland': 'en',
  'copenhagen': 'da', 'denmark': 'da',
  'stockholm': 'sv', 'sweden': 'sv',
  'oslo': 'no', 'norway': 'no',
  'helsinki': 'fi', 'finland': 'fi',
};

const allergyPhraseMap: Record<string, string> = {
  'celiac': 'celiac friendly',
  'celiac disease': 'celiac friendly',
  'gluten': 'gluten free',
  'peanuts': 'peanut allergy friendly',
  'peanut': 'peanut allergy friendly',
  'tree nuts': 'tree nut allergy friendly',
  'nuts': 'nut allergy friendly',
  'dairy': 'dairy free',
  'lactose': 'lactose free',
  'eggs': 'egg free',
  'egg': 'egg free',
  'soy': 'soy free',
  'fish': 'fish allergy friendly',
  'shellfish': 'shellfish allergy friendly',
  'sesame': 'sesame free',
  'vegan': 'vegan',
  'vegetarian': 'vegetarian',
};

const allergyPriority = [
  'celiac disease', 'celiac', 'gluten', 'peanuts', 'peanut', 
  'tree nuts', 'nuts', 'dairy', 'lactose', 'eggs', 'egg',
  'soy', 'fish', 'shellfish', 'sesame', 'vegan', 'vegetarian'
];

function getPrimaryPhrase(allergies: string[]): string {
  const normalizedAllergies = allergies.map(a => a.toLowerCase().trim());
  for (const priority of allergyPriority) {
    if (normalizedAllergies.some(a => a.includes(priority) || priority.includes(a))) {
      return allergyPhraseMap[priority];
    }
  }
  return 'allergy friendly';
}

function getDestinationLanguage(destination: string): string {
  const normalizedDest = destination.toLowerCase().trim();
  for (const [key, lang] of Object.entries(DESTINATION_LANGUAGES)) {
    if (normalizedDest.includes(key) || key.includes(normalizedDest)) {
      return lang;
    }
  }
  return 'en';
}

// ==========================================
// QUERY TEMPLATES - Build based on mode
// ==========================================
function buildSearchQueries(
  destination: string,
  primaryPhrase: string,
  allergies: string[],
  mode: 'fast' | 'deep'
): string[] {
  const queries: string[] = [];
  const config = mode === 'fast' ? FAST_MODE : DEEP_MODE;
  const allergyLower = allergies.map(a => a.toLowerCase()).join(' ');
  
  // Query 1: Primary allergy phrase (most specific)
  queries.push(`${primaryPhrase} restaurants in ${destination}`);
  
  // Query 2: Allergy friendly (general)
  queries.push(`allergy friendly restaurants in ${destination}`);
  
  // Query 3: Gluten free (very common, high signal)
  queries.push(`gluten free restaurants in ${destination}`);
  
  // Query 4: Vegan/vegetarian (often allergen-aware)
  queries.push(`vegan restaurants in ${destination}`);
  
  // Query 5: Dietary restrictions
  queries.push(`dietary restrictions restaurants in ${destination}`);
  
  // Query 6: Specific allergy if not already covered
  if (allergyLower.includes('nut') || allergyLower.includes('peanut')) {
    queries.push(`nut free restaurants in ${destination}`);
  } else if (allergyLower.includes('dairy') || allergyLower.includes('lactose')) {
    queries.push(`dairy free restaurants in ${destination}`);
  } else {
    queries.push(`food allergy restaurants ${destination}`);
  }
  
  if (mode === 'deep') {
    // Extra queries for deep mode
    queries.push(`safe dining ${destination}`);
    queries.push(`healthy restaurants ${destination}`);
  }
  
  return queries.slice(0, config.maxQueries);
}

// ==========================================
// Classification System
// ==========================================
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findMatchingTerms(normalizedText: string, terms: string[]): string[] {
  const matches: string[] = [];
  for (const term of terms) {
    const normalizedTerm = normalizeText(term);
    const regexPattern = normalizedTerm.replace(/\s+/g, '\\s+');
    const regex = new RegExp(`\\b${regexPattern}\\b`, 'i');
    if (regex.test(normalizedText)) {
      matches.push(term);
    }
  }
  return matches;
}

function findStrongWarningPhrases(normalizedText: string): string[] {
  const matches: string[] = [];
  for (const phrase of strongWarningPhrases) {
    const normalizedPhrase = normalizeText(phrase);
    if (normalizedText.includes(normalizedPhrase)) {
      matches.push(phrase);
    }
  }
  return matches;
}

interface ClassificationResult {
  isAllergyRelated: boolean;
  confidence: number;
  matchedLayerATerms: string[];
  matchedLayerBTerms: string[];
  matchedStrongPhrases: string[];
  shortReason: string;
}

function classifyReview(text: string): ClassificationResult {
  const normalizedText = normalizeText(text);
  
  // Check strict terms (strong signals)
  const strictMatches = findMatchingTerms(normalizedText, strictLayerATerms);
  // Check weak terms (need context)
  const weakMatches = findMatchingTerms(normalizedText, weakLayerATerms);
  const layerBMatches = findMatchingTerms(normalizedText, layerBTerms);
  const strongPhraseMatches = findStrongWarningPhrases(normalizedText);
  
  const hasStrictLayerA = strictMatches.length > 0;
  const hasWeakLayerA = weakMatches.length > 0;
  const hasLayerB = layerBMatches.length > 0;
  const hasStrongPhrase = strongPhraseMatches.length > 0;
  
  // STRICTER CRITERIA:
  // - Strict Layer A terms alone are enough (explicit allergy mentions)
  // - Weak Layer A terms MUST have Layer B or strong phrase context
  // - Just mentioning "shrimp" or "lobster" is NOT enough
  const isAllergyRelated = hasStrictLayerA || 
    (hasWeakLayerA && (hasLayerB || hasStrongPhrase)) ||
    hasStrongPhrase;
  
  // Combine matched terms for display
  const allLayerAMatches = [...strictMatches, ...weakMatches];
  
  let confidence = 0;
  if (isAllergyRelated) {
    if (hasStrongPhrase) {
      // Highest confidence for strong warnings
      confidence = 0.95;
    } else if (hasStrictLayerA && hasLayerB) {
      // Explicit allergy term + safety context
      confidence = 0.9;
    } else if (hasStrictLayerA) {
      // Explicit allergy term alone
      confidence = 0.75;
    } else if (hasWeakLayerA && hasLayerB) {
      // Weak term with context
      confidence = 0.6;
    }
  }
  
  let shortReason = '';
  if (isAllergyRelated) {
    if (hasStrongPhrase) {
      shortReason = `Contains strong allergy warning: ${strongPhraseMatches[0]}`;
    } else if (hasStrictLayerA) {
      shortReason = `Explicit allergy mention: ${strictMatches.slice(0, 2).join(', ')}`;
    } else if (hasWeakLayerA && hasLayerB) {
      shortReason = `Allergy context: ${weakMatches[0]} with ${layerBMatches[0]}`;
    }
  } else {
    shortReason = 'No allergy-related content found';
  }
  
  return {
    isAllergyRelated,
    confidence,
    matchedLayerATerms: allLayerAMatches,
    matchedLayerBTerms: layerBMatches,
    matchedStrongPhrases: strongPhraseMatches,
    shortReason
  };
}

type ConfidenceLevel = 'high' | 'medium' | 'low';
type EvidenceStatus = 'evidence_found' | 'no_evidence' | 'insufficient_evidence';

function getConfidenceLevel(classification: ClassificationResult): ConfidenceLevel {
  if (!classification.isAllergyRelated) return 'low';
  if (classification.confidence >= 0.7 || classification.matchedStrongPhrases.length > 0) return 'high';
  if (classification.confidence >= 0.5) return 'medium';
  return 'low';
}

interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
  matchedTerms: string[];
}

// Extract only the relevant sentence(s) containing allergy terms
function extractAllergyRelevantSnippet(fullText: string, matchedTerms: string[]): string {
  if (!fullText || matchedTerms.length === 0) return fullText;
  
  // Split text into sentences
  const sentences = fullText.split(/(?<=[.!?])\s+/);
  const relevantSentences: string[] = [];
  
  // Find sentences containing any matched term
  for (const sentence of sentences) {
    const normalizedSentence = normalizeText(sentence);
    const hasMatch = matchedTerms.some(term => {
      const normalizedTerm = normalizeText(term);
      return normalizedSentence.includes(normalizedTerm);
    });
    
    if (hasMatch) {
      relevantSentences.push(sentence.trim());
    }
  }
  
  // If we found relevant sentences, return them (up to 250 chars)
  if (relevantSentences.length > 0) {
    let result = relevantSentences.join(' ');
    if (result.length > 250) {
      result = result.substring(0, 247) + '...';
    }
    return result;
  }
  
  // Fallback: if no sentence-level match, try to find the phrase context
  const normalizedFull = fullText.toLowerCase();
  for (const term of matchedTerms) {
    const normalizedTerm = term.toLowerCase();
    const termIndex = normalizedFull.indexOf(normalizedTerm);
    if (termIndex !== -1) {
      // Extract context around the term (50 chars before, term, 100 chars after)
      const start = Math.max(0, termIndex - 50);
      const end = Math.min(fullText.length, termIndex + normalizedTerm.length + 100);
      let snippet = fullText.substring(start, end);
      if (start > 0) snippet = '...' + snippet;
      if (end < fullText.length) snippet = snippet + '...';
      return snippet;
    }
  }
  
  // Final fallback: return truncated original
  return fullText.length > 200 ? fullText.substring(0, 197) + '...' : fullText;
}

function findBestReviewSnippet(reviews: any[]): ReviewSnippet {
  if (!reviews || reviews.length === 0) {
    return { text: '', author: '', relativeTime: '', hasAllergyMention: false, score: 0, matchedTerms: [] };
  }
  
  let bestReview: ReviewSnippet | null = null;
  let bestScore = -1;
  
  for (const review of reviews) {
    const text = review.text?.text || review.text || '';
    if (!text) continue;
    
    const classification = classifyReview(text);
    
    if (classification.isAllergyRelated && classification.confidence > bestScore) {
      bestScore = classification.confidence;
      
      const matchedTerms = [
        ...classification.matchedLayerATerms,
        ...classification.matchedLayerBTerms,
        ...classification.matchedStrongPhrases
      ];
      
      // Extract only the relevant part of the review
      const relevantText = extractAllergyRelevantSnippet(text, matchedTerms);
      
      bestReview = {
        text: relevantText,
        author: review.authorAttribution?.displayName || review.author_name || 'Anonymous',
        relativeTime: review.relativePublishTimeDescription || review.relative_time_description || '',
        hasAllergyMention: true,
        score: classification.confidence,
        matchedTerms
      };
    }
  }
  
  return bestReview || { text: '', author: '', relativeTime: '', hasAllergyMention: false, score: 0, matchedTerms: [] };
}

// ==========================================
// CACHING SYSTEM
// ==========================================
interface CachedPlaceDetails {
  data: any;
  timestamp: number;
}

const placeDetailsCache = new Map<string, CachedPlaceDetails>();
const PLACE_DETAILS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

function getCachedPlaceDetails(placeId: string): any | null {
  const cached = placeDetailsCache.get(placeId);
  if (cached && Date.now() - cached.timestamp < PLACE_DETAILS_CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedPlaceDetails(placeId: string, data: any): void {
  placeDetailsCache.set(placeId, { data, timestamp: Date.now() });
}

// ==========================================
// GEOCODING
// ==========================================
interface GeoLocation {
  lat: number;
  lng: number;
}

async function geocodeDestination(destination: string, apiKey: string): Promise<GeoLocation | null> {
  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${apiKey}`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results?.[0]?.geometry?.location) {
      const { lat, lng } = data.results[0].geometry.location;
      console.log(`📍 Geocoded "${destination}" to lat:${lat}, lng:${lng}`);
      return { lat, lng };
    }
    console.log(`⚠️ Geocoding failed for "${destination}": ${data.status}`);
    return null;
  } catch (error) {
    console.error(`❌ Geocoding error:`, error);
    return null;
  }
}

// ==========================================
// TEXT SEARCH WITH OPTIONAL PAGINATION
// ==========================================
async function fetchTextSearchResults(
  query: string,
  apiKey: string,
  location: GeoLocation | null,
  language: string,
  maxPages: number,
  startTime: number
): Promise<any[]> {
  const allResults: any[] = [];
  let nextPageToken: string | null = null;
  
  for (let page = 0; page < maxPages; page++) {
    if (Date.now() - startTime > MAX_TOTAL_TIME_MS) {
      console.log(`⏱️ Time limit reached, stopping at page ${page + 1}`);
      break;
    }
    
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${apiKey}&language=${language}`;
    
    if (location) {
      url += `&location=${location.lat},${location.lng}&radius=25000`;
    }
    
    if (nextPageToken) {
      url += `&pagetoken=${nextPageToken}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error(`❌ Text search failed: ${data.status}`);
      break;
    }
    
    if (data.results?.length > 0) {
      allResults.push(...data.results);
      console.log(`   [${language}] Page ${page + 1}: ${data.results.length} results`);
    }
    
    nextPageToken = data.next_page_token;
    if (!nextPageToken) break;
    
    await new Promise(resolve => setTimeout(resolve, PAGE_DELAY_MS));
  }
  
  return allResults;
}

// ==========================================
// MULTI-QUERY SEARCH
// ==========================================
interface CandidatePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  matchedQueries: string[];
  matchCount: number;
}

async function runSearch(
  destination: string,
  primaryPhrase: string,
  allergies: string[],
  apiKey: string,
  location: GeoLocation | null,
  mode: 'fast' | 'deep',
  startTime: number
): Promise<CandidatePlace[]> {
  const config = mode === 'fast' ? FAST_MODE : DEEP_MODE;
  const candidatesMap = new Map<string, CandidatePlace>();
  const destLanguage = getDestinationLanguage(destination);
  
  const queries = buildSearchQueries(destination, primaryPhrase, allergies, mode);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 ${mode.toUpperCase()} MODE SEARCH`);
  console.log(`   Destination: ${destination}`);
  console.log(`   Primary phrase: ${primaryPhrase}`);
  console.log(`   Queries: ${queries.length}`);
  console.log(`   Max pages per query: ${config.maxPagesPerQuery}`);
  console.log(`   Top N for details: ${config.topNForDetails}`);
  console.log(`${'='.repeat(60)}\n`);
  
  let queryIndex = 0;
  const queryStats: { query: string; results: number; timeMs: number }[] = [];
  
  // Run queries (destination language only in fast mode)
  const language = mode === 'fast' ? destLanguage : 'en';
  
  for (const query of queries) {
    if (Date.now() - startTime > MAX_TOTAL_TIME_MS) {
      console.log(`⏱️ Time limit reached after ${queryIndex} queries`);
      break;
    }
    
    queryIndex++;
    const queryStart = Date.now();
    console.log(`📋 Query ${queryIndex}/${queries.length}: "${query}" [${language}]`);
    
    const results = await fetchTextSearchResults(
      query, apiKey, location, language, config.maxPagesPerQuery, startTime
    );
    
    queryStats.push({
      query,
      results: results.length,
      timeMs: Date.now() - queryStart
    });
    
    for (const place of results) {
      if (!place.place_id) continue;
      
      const existing = candidatesMap.get(place.place_id);
      if (existing) {
        if (!existing.matchedQueries.includes(query)) {
          existing.matchedQueries.push(query);
          existing.matchCount++;
        }
      } else {
        candidatesMap.set(place.place_id, {
          place_id: place.place_id,
          name: place.name,
          formatted_address: place.formatted_address,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          matchedQueries: [query],
          matchCount: 1
        });
      }
    }
  }
  
  const totalResults = queryStats.reduce((sum, s) => sum + s.results, 0);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 SEARCH SUMMARY (${Date.now() - startTime}ms)`);
  console.log(`   Queries executed: ${queryStats.length}`);
  console.log(`   Total results: ${totalResults}`);
  console.log(`   Unique places: ${candidatesMap.size}`);
  console.log(`   Duplicates removed: ${totalResults - candidatesMap.size}`);
  
  // matchCount distribution
  const matchDist: Record<number, number> = {};
  for (const c of candidatesMap.values()) {
    matchDist[c.matchCount] = (matchDist[c.matchCount] || 0) + 1;
  }
  console.log(`   matchCount distribution: ${JSON.stringify(matchDist)}`);
  console.log(`${'='.repeat(60)}\n`);
  
  return Array.from(candidatesMap.values());
}

// ==========================================
// RANKING
// ==========================================
function rankCandidates(candidates: CandidatePlace[]): CandidatePlace[] {
  return candidates.sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    if ((b.user_ratings_total || 0) !== (a.user_ratings_total || 0)) {
      return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    }
    return (b.rating || 0) - (a.rating || 0);
  });
}

// ==========================================
// PLACE DETAILS
// ==========================================
async function fetchPlaceDetails(placeId: string, apiKey: string): Promise<any | null> {
  const cached = getCachedPlaceDetails(placeId);
  if (cached) {
    console.log(`📦 Cache hit: ${placeId}`);
    return cached;
  }
  
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,user_ratings_total,opening_hours,price_level,url,reviews,website,editorial_summary,types,international_phone_number&key=${apiKey}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.result) {
      console.log(`⚠️ Details failed for ${placeId}: ${data.status}`);
      return null;
    }
    
    setCachedPlaceDetails(placeId, data.result);
    return data.result;
  } catch (error) {
    console.error(`❌ Error fetching details:`, error);
    return null;
  }
}

// ==========================================
// MAIN SERVER
// ==========================================
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, allergies, mode = 'fast' } = await req.json();
    const searchMode = mode === 'deep' ? 'deep' : 'fast';
    const config = searchMode === 'fast' ? FAST_MODE : DEEP_MODE;
    
    console.log('📍 Restaurant search request:', { destination, allergies, mode: searchMode });

    if (!destination) {
      return new Response(
        JSON.stringify({ error: 'Destination is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      console.error('❌ GOOGLE_MAPS_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const startTime = Date.now();
    const allergiesArray = Array.isArray(allergies) ? allergies : [];
    const primaryPhrase = getPrimaryPhrase(allergiesArray);
    
    console.log('🔍 Primary phrase:', primaryPhrase);

    // Step 1: Geocode
    const location = await geocodeDestination(destination, apiKey);

    // Step 2: Multi-query search
    const candidates = await runSearch(
      destination, primaryPhrase, allergiesArray, apiKey, location, searchMode, startTime
    );

    if (candidates.length === 0) {
      return new Response(
        JSON.stringify({ 
          destination,
          mode: searchMode,
          queryPhrase: primaryPhrase,
          places: [],
          expandSearchAvailable: searchMode === 'fast',
          fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(`${primaryPhrase} restaurants ${destination}`)}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Rank and select top N
    const rankedCandidates = rankCandidates(candidates);
    const topCandidates = rankedCandidates.slice(0, config.topNForDetails);
    console.log(`💰 Fetching Place Details for top ${topCandidates.length} candidates...`);

    // Step 4: Fetch Place Details
    const places = [];
    let cacheHits = 0;
    
    for (let i = 0; i < topCandidates.length; i += PARALLEL_DETAILS_BATCH) {
      const batch = topCandidates.slice(i, i + PARALLEL_DETAILS_BATCH);
      const batchPromises = batch.map(async (candidate) => {
        const wasCached = getCachedPlaceDetails(candidate.place_id) !== null;
        if (wasCached) cacheHits++;
        
        const details = await fetchPlaceDetails(candidate.place_id, apiKey);
        if (!details) return null;
        
        // Combine all text for evidence classification
        const reviews = details.reviews || [];
        const editorialSummary = details.editorial_summary?.overview || '';
        const allText = [
          ...reviews.map((r: any) => r.text?.text || r.text || ''),
          editorialSummary
        ].join(' ');
        const totalTextChars = allText.length;
        
        const reviewSnippet = findBestReviewSnippet(reviews);
        
        // Determine evidence status based on total text chars
        let evidenceStatus: EvidenceStatus = 'no_evidence';
        let confidenceLevel: ConfidenceLevel = 'low';
        
        if (reviewSnippet.hasAllergyMention && reviewSnippet.text) {
          const classification = classifyReview(reviewSnippet.text);
          confidenceLevel = getConfidenceLevel(classification);
          evidenceStatus = 'evidence_found';
        } else if (reviews.length === 0 || totalTextChars < config.minTextCharsForEvidence) {
          evidenceStatus = 'insufficient_evidence';
        } else {
          evidenceStatus = 'no_evidence';
        }
        
        return {
          name: details.name || candidate.name,
          address: details.formatted_address || candidate.formatted_address,
          rating: details.rating || candidate.rating,
          totalRatings: details.user_ratings_total || candidate.user_ratings_total,
          openNow: details.opening_hours?.open_now,
          priceLevel: details.price_level,
          mapsUrl: details.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
          website: details.website,
          editorialSummary,
          types: details.types,
          phone: details.international_phone_number,
          reviewSnippet: {
            text: reviewSnippet.text,
            author: reviewSnippet.author,
            relativeTime: reviewSnippet.relativeTime,
            hasAllergyMention: reviewSnippet.hasAllergyMention,
            score: reviewSnippet.score,
            matchedTerms: reviewSnippet.matchedTerms
          },
          confidenceLevel,
          evidenceStatus,
          matchCount: candidate.matchCount,
          matchedQueries: candidate.matchedQueries,
        };
      });
      
      const batchResults = await Promise.all(batchPromises);
      places.push(...batchResults.filter(p => p !== null));
    }

    // Step 5: Sort and filter
    places.sort((a, b) => {
      const evidenceOrder = { evidence_found: 3, insufficient_evidence: 2, no_evidence: 1 };
      const aEvidence = evidenceOrder[a.evidenceStatus] || 0;
      const bEvidence = evidenceOrder[b.evidenceStatus] || 0;
      if (aEvidence !== bEvidence) return bEvidence - aEvidence;
      
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      if (confidenceOrder[b.confidenceLevel] !== confidenceOrder[a.confidenceLevel]) {
        return confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
      }
      
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return (b.rating || 0) - (a.rating || 0);
    });

    // Filter to evidence_found only in fast mode
    let filteredPlaces = places;
    if (config.filterToEvidenceFound) {
      filteredPlaces = places.filter(p => p.evidenceStatus === 'evidence_found');
    }
    
    // Limit results
    const finalPlaces = filteredPlaces.slice(0, config.maxResultsReturned);
    
    const evidenceFoundCount = places.filter(p => p.evidenceStatus === 'evidence_found').length;
    const insufficientCount = places.filter(p => p.evidenceStatus === 'insufficient_evidence').length;
    const noEvidenceCount = places.filter(p => p.evidenceStatus === 'no_evidence').length;
    
    const totalTime = Date.now() - startTime;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ FINAL RESULTS (${totalTime}ms)`);
    console.log(`   Mode: ${searchMode.toUpperCase()}`);
    console.log(`   Candidates found: ${candidates.length}`);
    console.log(`   Details fetched: ${places.length}`);
    console.log(`   Cache hits: ${cacheHits}`);
    console.log(`   Evidence found: ${evidenceFoundCount}`);
    console.log(`   Insufficient evidence: ${insufficientCount}`);
    console.log(`   No evidence: ${noEvidenceCount}`);
    console.log(`   Returning: ${finalPlaces.length} results`);
    console.log(`   Expand search available: ${searchMode === 'fast' && evidenceFoundCount < 5}`);
    console.log(`${'='.repeat(60)}\n`);

    const searchQuery = `${primaryPhrase} restaurants in ${destination}`;
    const expandSearchAvailable = searchMode === 'fast' && evidenceFoundCount < 5;

    return new Response(
      JSON.stringify({
        destination,
        mode: searchMode,
        queryPhrase: primaryPhrase,
        places: finalPlaces,
        totalCandidates: candidates.length,
        detailsFetched: places.length,
        stats: {
          evidenceFound: evidenceFoundCount,
          insufficientEvidence: insufficientCount,
          noEvidence: noEvidenceCount,
          cacheHits,
          totalTimeMs: totalTime
        },
        expandSearchAvailable,
        fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Restaurant search error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while searching for restaurants',
        fallbackUrl: 'https://www.google.com/maps/search/allergy+friendly+restaurants'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
