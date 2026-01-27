import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// MODE CONFIGURATION - COST-OPTIMIZED (2024-01)
// ==========================================
// FAST_MODE billing facts:
// - Atmosphere Data SKU ($5/1000): rating, priceLevel, reviews → avoid in details
// - Contact Data SKU ($3/1000): phone, website, opening_hours → never in main search
// - Text Search SKU ($32/1000): includes rating, user_ratings_total for free
// ==========================================
const FAST_MODE = {
  maxCandidateSearchCalls: 3, // Allow 3 text search calls for better coverage
  maxQueries: 3,              // Three queries for better allergy term coverage
  maxPagesPerQuery: 1,        // Single page only
  targetEvidenceResults: 8,   // Stop when we have 8 evidence results
  maxDetailsToFetch: 15,      // Allow up to 15 details to find 5-10 good results
  maxResultsReturned: 10,     // Return max 10
  minResultsReturned: 5,      // Always try to return at least 5
  minTextCharsForEvidence: 50,
  filterToEvidenceFound: true,
  cacheTtlDays: 7,            // Cache for 7 days
};

const DEEP_MODE = {
  maxCandidateSearchCalls: 3,
  maxQueries: 4,
  maxPagesPerQuery: 2,
  targetEvidenceResults: 15,
  maxDetailsToFetch: 15,      // Reduced from 20
  maxResultsReturned: 15,
  minTextCharsForEvidence: 30,
  filterToEvidenceFound: false,
  cacheTtlDays: 7,
};

const PAGE_DELAY_MS = 1500;
const MAX_TOTAL_TIME_MS = 25000;
const CACHE_TTL_DAYS = 7;

// Daily quota guard - prevent runaway API calls
const DAILY_DETAILS_QUOTA = 500;
let dailyDetailsCount = 0;
let quotaResetDate = new Date().toDateString();

function checkAndIncrementQuota(): boolean {
  const today = new Date().toDateString();
  if (today !== quotaResetDate) {
    quotaResetDate = today;
    dailyDetailsCount = 0;
  }
  if (dailyDetailsCount >= DAILY_DETAILS_QUOTA) {
    console.log(`⚠️ Daily quota exceeded: ${dailyDetailsCount}/${DAILY_DETAILS_QUOTA}`);
    return false;
  }
  dailyDetailsCount++;
  return true;
}

// ==========================================
// STRICT LAYER A: Only Explicit Allergy/Free Terms
// ==========================================
const strictLayerATerms = [
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

const weakLayerATerms = [
  'gluten', 'dairy', 'lactose', 'wheat',
  'peanut', 'peanuts', 'tree nut', 'nuts', 'almond', 'hazelnut', 'walnut', 
  'pecan', 'cashew', 'pistachio', 'macadamia',
  'soy', 'soya', 'sesame',
  'shellfish', 'shrimp', 'crab', 'lobster',
  'vegan', 'vegetarian', 'plant based', 'plant-based',
  'no eggs', 'no dairy', 'no nuts', 'no shellfish', 'no seafood',
  'without nuts', 'without dairy',
  // Common review patterns
  'special diet', 'dietary', 'food restrictions', 'eating restrictions',
  'menu for', 'options for', 'cater for', 'cater to',
  'gf', 'df', 'vg', 'v option', 'v options',
];

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
  'bangkok': 'th', 'thailand': 'th', 'phuket': 'th', 'chiang mai': 'th', 'koh samui': 'th',
  'istanbul': 'tr', 'turkey': 'tr', 'antalya': 'tr',
  'london': 'en', 'uk': 'en', 'edinburgh': 'en', 'manchester': 'en',
  'new york': 'en', 'usa': 'en', 'los angeles': 'en', 'chicago': 'en', 'miami': 'en',
  'tel aviv': 'he', 'israel': 'he', 'jerusalem': 'he', 'eilat': 'he',
  'vienna': 'de', 'austria': 'de', 'salzburg': 'de',
  'zurich': 'de', 'switzerland': 'de', 'geneva': 'fr',
  'brussels': 'nl', 'belgium': 'nl',
  'dublin': 'en', 'ireland': 'en',
  'copenhagen': 'da', 'denmark': 'da',
  'stockholm': 'sv', 'sweden': 'sv',
  'oslo': 'no', 'norway': 'no',
  'helsinki': 'fi', 'finland': 'fi',
  // Cyprus locations
  'paphos': 'en', 'pafos': 'en', 'cyprus': 'en', 'limassol': 'en', 'larnaca': 'en', 'nicosia': 'en', 'ayia napa': 'en',
  // Add more Mediterranean destinations
  'rhodes': 'el', 'corfu': 'el', 'zakynthos': 'el',
  'malta': 'en', 'valletta': 'en',
  'dubrovnik': 'hr', 'croatia': 'hr', 'split': 'hr',
  'abu dhabi': 'en', 'dubai': 'en', 'uae': 'en',
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
// QUERY TEMPLATES - IMPROVED FOR ALLERGY DISCOVERY
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
  
  // FAST mode: Use 3 different query strategies for maximum coverage
  if (mode === 'fast') {
    // Query 1: Primary phrase (e.g., "allergy friendly restaurants in Paphos")
    queries.push(`${primaryPhrase} restaurants in ${destination}`);
    
    // Query 2: Gluten free - most common allergy term in reviews
    if (!primaryPhrase.toLowerCase().includes('gluten')) {
      queries.push(`gluten free restaurants in ${destination}`);
    } else {
      queries.push(`celiac safe restaurants ${destination}`);
    }
    
    // Query 3: Vegan - often has overlap with allergy-friendly options
    queries.push(`vegan vegetarian restaurants ${destination}`);
    
    return queries.slice(0, config.maxQueries);
  }
  
  // DEEP mode: Additional queries
  queries.push(`${primaryPhrase} restaurants in ${destination}`);
  queries.push(`allergy friendly restaurants in ${destination}`);
  queries.push(`gluten free restaurants in ${destination}`);
  queries.push(`celiac restaurants ${destination}`);
  queries.push(`vegan vegetarian restaurants ${destination}`);
  
  if (allergyLower.includes('nut') || allergyLower.includes('peanut')) {
    queries.push(`nut free restaurants in ${destination}`);
  } else if (allergyLower.includes('dairy') || allergyLower.includes('lactose')) {
    queries.push(`dairy free restaurants in ${destination}`);
  } else {
    queries.push(`dietary restrictions restaurants ${destination}`);
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
  
  const strictMatches = findMatchingTerms(normalizedText, strictLayerATerms);
  const weakMatches = findMatchingTerms(normalizedText, weakLayerATerms);
  const layerBMatches = findMatchingTerms(normalizedText, layerBTerms);
  const strongPhraseMatches = findStrongWarningPhrases(normalizedText);
  
  const hasStrictLayerA = strictMatches.length > 0;
  const hasWeakLayerA = weakMatches.length > 0;
  const hasLayerB = layerBMatches.length > 0;
  const hasStrongPhrase = strongPhraseMatches.length > 0;
  
  // Check for dietary indicators that suggest the restaurant is aware of dietary needs
  const dietaryIndicators = ['vegan', 'vegetarian', 'plant based', 'plant-based', 'gluten', 'dairy free', 'lactose'];
  const hasDietaryIndicator = dietaryIndicators.some(ind => normalizedText.includes(ind));
  
  // Expanded classification: Consider vegan/vegetarian as evidence when in a positive review context
  const positiveContextWords = ['great', 'excellent', 'amazing', 'delicious', 'wonderful', 'fantastic', 'recommend', 'love', 'best', 'perfect'];
  const hasPositiveContext = positiveContextWords.some(word => normalizedText.includes(word));
  
  const isAllergyRelated = hasStrictLayerA || 
    (hasWeakLayerA && (hasLayerB || hasStrongPhrase)) ||
    hasStrongPhrase ||
    // NEW: Accept weak dietary mentions (vegan, vegetarian, gluten) in positive contexts
    (hasDietaryIndicator && hasPositiveContext);
  
  const allLayerAMatches = [...strictMatches, ...weakMatches];
  
  let confidence = 0;
  if (isAllergyRelated) {
    if (hasStrongPhrase) {
      confidence = 0.95;
    } else if (hasStrictLayerA && hasLayerB) {
      confidence = 0.9;
    } else if (hasStrictLayerA) {
      confidence = 0.75;
    } else if (hasWeakLayerA && hasLayerB) {
      confidence = 0.6;
    } else if (hasDietaryIndicator && hasPositiveContext) {
      // Lower confidence for dietary-indicator-only matches
      confidence = 0.4;
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
    } else if (hasDietaryIndicator && hasPositiveContext) {
      const matchedIndicator = dietaryIndicators.find(ind => normalizedText.includes(ind)) || 'dietary options';
      shortReason = `Dietary awareness: ${matchedIndicator} options mentioned`;
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

function extractAllergyRelevantSnippet(fullText: string, matchedTerms: string[]): string {
  if (!fullText || matchedTerms.length === 0) return fullText;
  
  const sentences = fullText.split(/(?<=[.!?])\s+/);
  const relevantSentences: string[] = [];
  
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
  
  if (relevantSentences.length > 0) {
    let result = relevantSentences.join(' ');
    if (result.length > 250) {
      result = result.substring(0, 247) + '...';
    }
    return result;
  }
  
  const normalizedFull = fullText.toLowerCase();
  for (const term of matchedTerms) {
    const normalizedTerm = term.toLowerCase();
    const termIndex = normalizedFull.indexOf(normalizedTerm);
    if (termIndex !== -1) {
      const start = Math.max(0, termIndex - 50);
      const end = Math.min(fullText.length, termIndex + normalizedTerm.length + 100);
      let snippet = fullText.substring(start, end);
      if (start > 0) snippet = '...' + snippet;
      if (end < fullText.length) snippet = snippet + '...';
      return snippet;
    }
  }
  
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
// SUPABASE CACHING
// ==========================================
interface CachedRestaurant {
  place_id: string;
  name: string;
  address: string;
  rating: number | null;
  total_ratings: number | null;
  maps_url: string;
  types: string[] | null;
  review_snippet: ReviewSnippet | null;
  confidence_level: ConfidenceLevel;
  evidence_status: EvidenceStatus;
  cached_at: string;
}

async function getCachedRestaurants(supabase: any, placeIds: string[]): Promise<Map<string, CachedRestaurant>> {
  const cache = new Map<string, CachedRestaurant>();
  if (placeIds.length === 0) return cache;
  
  try {
    const { data, error } = await supabase
      .from('restaurant_cache')
      .select('*')
      .in('place_id', placeIds);
    
    if (error) {
      console.log('⚠️ Cache read error:', error.message);
      return cache;
    }
    
    const now = new Date();
    const ttlMs = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
    
    for (const row of data || []) {
      const cachedAt = new Date(row.cached_at);
      if (now.getTime() - cachedAt.getTime() < ttlMs) {
        cache.set(row.place_id, row);
      }
    }
    
    console.log(`📦 Cache: ${cache.size}/${placeIds.length} hits`);
  } catch (err) {
    console.log('⚠️ Cache error:', err);
  }
  
  return cache;
}

async function cacheRestaurants(supabase: any, restaurants: CachedRestaurant[]): Promise<void> {
  if (restaurants.length === 0) return;
  
  try {
    const { error } = await supabase
      .from('restaurant_cache')
      .upsert(restaurants, { onConflict: 'place_id' });
    
    if (error) {
      console.log('⚠️ Cache write error:', error.message);
    } else {
      console.log(`💾 Cached ${restaurants.length} restaurants`);
    }
  } catch (err) {
    console.log('⚠️ Cache write error:', err);
  }
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
// TEXT SEARCH - Step A (Cheap)
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
  console.log(`   Max details to fetch: ${config.maxDetailsToFetch}`);
  console.log(`   Geocoding: ${location ? 'SUCCESS' : 'FALLBACK (no location bias)'}`);
  console.log(`${'='.repeat(60)}\n`);
  
  let queryIndex = 0;
  
  // Always use English for reviews to find allergy mentions (most common language for reviews)
  // The destination is already part of the query string
  const language = 'en';
  
  for (const query of queries) {
    if (Date.now() - startTime > MAX_TOTAL_TIME_MS) {
      console.log(`⏱️ Time limit reached after ${queryIndex} queries`);
      break;
    }
    
    queryIndex++;
    console.log(`📋 Query ${queryIndex}/${queries.length}: "${query}" [${language}]`);
    
    const results = await fetchTextSearchResults(
      query, apiKey, location, language, config.maxPagesPerQuery, startTime
    );
    
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
  
  console.log(`📊 Total unique candidates: ${candidatesMap.size}`);
  
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
// PLACE DETAILS - Step B (REVIEWS ONLY - Maximum Cost Savings)
// ==========================================
// COST OPTIMIZATION:
// - DO NOT request: rating, user_ratings_total (available from Text Search for free)
// - DO NOT request: website, phone, opening_hours (Contact Data SKU $3/1000)
// - DO NOT request: priceLevel (Atmosphere Data SKU)
// - ONLY request: reviews, url (for Maps link)
// This reduces Place Details cost from $17/1000 to ~$0-5/1000
// ==========================================
async function fetchPlaceDetailsForReviews(placeId: string, apiKey: string, language: string = 'en'): Promise<any | null> {
  if (!checkAndIncrementQuota()) {
    console.log(`⚠️ Quota exceeded, skipping ${placeId}`);
    return null;
  }
  
  try {
    // MINIMAL FIELDS - Only reviews and url (Maps link)
    // Rating/totalRatings come from Text Search (free)
    // No contact fields (website, phone, opening_hours) - use lazy load endpoint
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,url&language=${language}&key=${apiKey}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.result) {
      console.log(`⚠️ Details failed for ${placeId}: ${data.status}`);
      return null;
    }
    
    return data.result;
  } catch (error) {
    console.error(`❌ Error fetching details:`, error);
    return null;
  }
}

// ==========================================
// Result type (no contact fields)
// ==========================================
interface RestaurantResult {
  name: string;
  address: string;
  rating: number | null;
  totalRatings: number | null;
  mapsUrl: string;
  types?: string[];
  reviewSnippet: ReviewSnippet;
  confidenceLevel: ConfidenceLevel;
  evidenceStatus: EvidenceStatus;
  matchCount?: number;
  placeId: string; // For lazy loading contact details
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

    // Initialize Supabase for caching
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = supabaseUrl && supabaseKey 
      ? createClient(supabaseUrl, supabaseKey)
      : null;

    const startTime = Date.now();
    const allergiesArray = Array.isArray(allergies) ? allergies : [];
    const primaryPhrase = getPrimaryPhrase(allergiesArray);
    
    console.log('🔍 Primary phrase:', primaryPhrase);

    // Step 1: Geocode
    const location = await geocodeDestination(destination, apiKey);

    // Step 2: Multi-query search (cheap - no details)
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

    // Step 3: Rank candidates
    const rankedCandidates = rankCandidates(candidates);
    
    // Step 4: Check cache first
    const candidatePlaceIds = rankedCandidates.slice(0, config.maxDetailsToFetch * 2).map(c => c.place_id);
    const cachedData = supabase ? await getCachedRestaurants(supabase, candidatePlaceIds) : new Map();
    
    // Step 5: Fetch details with EARLY STOPPING
    const places: RestaurantResult[] = [];
    let detailsFetched = 0;
    let cacheHits = 0;
    const toCache: CachedRestaurant[] = [];
    
    console.log(`💰 Fetching Place Details with early stop at ${config.targetEvidenceResults} evidence results...`);
    
    for (const candidate of rankedCandidates) {
      // EARLY STOP: If we have enough evidence results, stop
      const evidenceCount = places.filter(p => p.evidenceStatus === 'evidence_found').length;
      if (evidenceCount >= config.targetEvidenceResults) {
        console.log(`✅ Early stop: Got ${evidenceCount} evidence results`);
        break;
      }
      
      // HARD LIMIT: Never fetch more than maxDetailsToFetch
      if (detailsFetched >= config.maxDetailsToFetch) {
        console.log(`🛑 Hard limit: Fetched ${detailsFetched} details`);
        break;
      }
      
      // Check cache first
      const cached = cachedData.get(candidate.place_id);
      if (cached && cached.evidence_status === 'evidence_found') {
        cacheHits++;
        places.push({
          name: cached.name,
          address: cached.address,
          rating: cached.rating,
          totalRatings: cached.total_ratings,
          mapsUrl: cached.maps_url,
          types: cached.types || undefined,
          reviewSnippet: cached.review_snippet || { text: '', author: '', relativeTime: '', hasAllergyMention: false, score: 0, matchedTerms: [] },
          confidenceLevel: cached.confidence_level,
          evidenceStatus: cached.evidence_status,
          matchCount: candidate.matchCount,
          placeId: candidate.place_id
        });
        continue;
      }
      
      // Fetch from API - ONLY reviews, no rating/contact fields
      // Always use English for reviews to maximize allergy term matches
      const details = await fetchPlaceDetailsForReviews(candidate.place_id, apiKey, 'en');
      if (!details) continue;
      
      detailsFetched++;
      
      const reviews = details.reviews || [];
      const reviewSnippet = findBestReviewSnippet(reviews);
      
      // Debug: Log review analysis for first few candidates
      if (detailsFetched <= 3) {
        const reviewTexts = reviews.map((r: any) => r.text?.text || r.text || '').slice(0, 2);
        console.log(`🔍 ${candidate.name}: ${reviews.length} reviews, hasEvidence=${reviewSnippet.hasAllergyMention}`);
        if (reviewTexts.length > 0) {
          console.log(`   Sample: "${reviewTexts[0]?.substring(0, 100)}..."`);
        }
      }
      
      let evidenceStatus: EvidenceStatus = 'no_evidence';
      let confidenceLevel: ConfidenceLevel = 'low';
      
      if (reviewSnippet.hasAllergyMention && reviewSnippet.text) {
        const classification = classifyReview(reviewSnippet.text);
        confidenceLevel = getConfidenceLevel(classification);
        evidenceStatus = 'evidence_found';
      } else if (reviews.length === 0) {
        evidenceStatus = 'insufficient_evidence';
      }
      
      // Use rating/totalRatings from Text Search (free) - not from Place Details
      const result: RestaurantResult = {
        name: candidate.name,
        address: candidate.formatted_address,
        rating: candidate.rating || null,           // From Text Search (free)
        totalRatings: candidate.user_ratings_total || null, // From Text Search (free)
        mapsUrl: details.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
        types: undefined, // Not fetching types to save cost
        reviewSnippet,
        confidenceLevel,
        evidenceStatus,
        matchCount: candidate.matchCount,
        placeId: candidate.place_id
      };
      
      places.push(result);
      
      // Prepare for caching
      if (evidenceStatus === 'evidence_found') {
        toCache.push({
          place_id: candidate.place_id,
          name: result.name,
          address: result.address,
          rating: result.rating,
          total_ratings: result.totalRatings,
          maps_url: result.mapsUrl,
          types: result.types || null,
          review_snippet: reviewSnippet,
          confidence_level: confidenceLevel,
          evidence_status: evidenceStatus,
          cached_at: new Date().toISOString()
        });
      }
    }
    
    // Step 6: Cache new results
    if (supabase && toCache.length > 0) {
      await cacheRestaurants(supabase, toCache);
    }

    // Step 7: Sort and filter
    places.sort((a, b) => {
      const evidenceOrder = { evidence_found: 3, insufficient_evidence: 2, no_evidence: 1 };
      const aEvidence = evidenceOrder[a.evidenceStatus] || 0;
      const bEvidence = evidenceOrder[b.evidenceStatus] || 0;
      if (aEvidence !== bEvidence) return bEvidence - aEvidence;
      
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      if (confidenceOrder[b.confidenceLevel] !== confidenceOrder[a.confidenceLevel]) {
        return confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
      }
      
      if ((b.matchCount || 0) !== (a.matchCount || 0)) return (b.matchCount || 0) - (a.matchCount || 0);
      return (b.rating || 0) - (a.rating || 0);
    });

    // Filter to evidence_found only in fast mode, but fall back to include more if needed
    let filteredPlaces = places;
    if (config.filterToEvidenceFound) {
      const evidenceOnly = places.filter(p => p.evidenceStatus === 'evidence_found');
      const minResults = (config as typeof FAST_MODE).minResultsReturned || 3;
      
      // If we don't have enough evidence_found, include insufficient_evidence too
      if (evidenceOnly.length < minResults) {
        const insufficientEvidence = places.filter(p => p.evidenceStatus === 'insufficient_evidence');
        filteredPlaces = [...evidenceOnly, ...insufficientEvidence];
      } else {
        filteredPlaces = evidenceOnly;
      }
    }
    
    // Limit results
    const finalPlaces = filteredPlaces.slice(0, config.maxResultsReturned);
    
    const evidenceFoundCount = places.filter(p => p.evidenceStatus === 'evidence_found').length;
    const insufficientCount = places.filter(p => p.evidenceStatus === 'insufficient_evidence').length;
    const noEvidenceCount = places.filter(p => p.evidenceStatus === 'no_evidence').length;
    
    const totalTime = Date.now() - startTime;
    
    // Generate unique search ID for cost tracking
    const searchId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    
    // COST VISIBILITY LOGGING
    console.log(`\n${'='.repeat(60)}`);
    console.log(`💰 COST LOG | searchId=${searchId}`);
    console.log(`   candidateSearchCalls=1`);
    console.log(`   detailsCalls=${detailsFetched}`);
    console.log(`   fieldsRequested=reviews_url_only`);
    console.log(`   cacheHits=${cacheHits}`);
    console.log(`   totalCandidates=${candidates.length}`);
    console.log(`   evidenceFound=${evidenceFoundCount}`);
    console.log(`   mode=${searchMode.toUpperCase()}`);
    console.log(`   timeMs=${totalTime}`);
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
        detailsFetched,
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
