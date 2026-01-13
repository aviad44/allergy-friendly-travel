import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ==========================================
// PERFORMANCE CONFIGURATION
// ==========================================
const MAX_PAGES_PER_QUERY = 2; // Reduced from 3 to save time (40 results per query max)
const PAGE_DELAY_MS = 1500; // Reduced from 2000, still within Google's tolerance
const TOP_N = 50; // Top candidates for Place Details
const PARALLEL_DETAILS_BATCH = 10; // Increased from 5 for faster fetching
const MAX_QUERIES = 4; // Limit number of query templates to reduce total time
const MAX_TOTAL_TIME_MS = 25000; // 25 seconds max execution time for search phase

// ==========================================
// LAYER A: Core Allergy Terms
// ==========================================
const layerATerms = [
  // Core allergy terms
  'allergy', 'allergies', 'allergic', 'allergen', 'allergens',
  'food allergy', 'severe allergy', 'multiple allergies',
  'allergy aware', 'allergy conscious', 'allergy safe', 'allergy friendly',
  
  // Gluten/Wheat/Celiac
  'gluten', 'gluten free', 'glutenfree', 'celiac', 'coeliac', 'celiac disease',
  'gluten intolerance', 'gluten intolerant', 'non celiac gluten sensitivity', 'ncgs',
  'wheat', 'wheat free', 'no wheat', 'rye', 'barley', 'oats',
  
  // Dairy/Milk/Lactose
  'dairy free', 'dairyfree', 'milk allergy', 'milk free', 'no milk',
  'lactose', 'lactose free', 'lactosefree', 'lactose intolerant', 'lactose intolerance',
  'casein', 'whey',
  
  // Egg
  'egg allergy', 'egg free', 'eggfree', 'egg intolerance',
  'albumin', 'egg white', 'egg yolk',
  
  // Peanut/Tree Nut
  'peanut', 'peanut allergy', 'peanut free', 'peanutfree', 'groundnut',
  'tree nut', 'nuts', 'nut allergy', 'nut free', 'nutfree',
  'almond', 'hazelnut', 'walnut', 'pecan', 'cashew', 'pistachio',
  'macadamia', 'brazil nut', 'pine nut',
  
  // Soy/Sesame/Fish/Shellfish
  'soy', 'soya', 'soy allergy', 'soy free', 'soyfree', 'soy sauce',
  'sesame', 'sesame free', 'tahini', 'sesame seeds',
  'fish allergy', 'seafood allergy', 'shellfish', 'shellfish allergy',
  'shrimp', 'prawn', 'crab', 'lobster', 'clam', 'oyster', 'scallop',
  'mussels', 'squid', 'octopus', 'mollusc',
  
  // Other regulated allergens
  'mustard', 'celery', 'lupin', 'sulfites', 'sulphites',
  
  // Misspellings
  'alergy', 'alergies', 'alergic',
  
  // Abbreviations (only match as standalone words)
  'gf', 'df', 'nf', 'ff', 'ef'
];

// ==========================================
// LAYER B: Safety and Accommodation Signals
// ==========================================
const layerBTerms = [
  // Safety and accommodation
  'cross contamination', 'cross contamination risk', 'cross contact',
  'traces', 'may contain', 'contains traces',
  'shared kitchen', 'shared fryer', 'shared oil',
  'allergen menu', 'allergen information', 'allergen list', 'ingredient list',
  'dietary restrictions', 'dietary requirement', 'special diet', 'restricted diet',
  'accommodated my allergy', 'can accommodate', 'accommodating', 'very accommodating',
  'informed staff', 'knowledgeable staff', 'staff understood', 'took it seriously',
  'safe to eat', 'felt safe', 'felt comfortable', 'cautious', 'careful',
  'allergy protocol', 'allergy friendly kitchen'
];

// ==========================================
// Strong Warning Phrases (bypass Layer B requirement)
// ==========================================
const strongWarningPhrases = [
  'not safe', 'unsafe', 'wouldnt recommend for allergies', 'wouldn\'t recommend for allergies',
  'reaction', 'allergic reaction', 'flare up', 'flareup',
  'epipen', 'epi pen', 'adrenaline pen',
  'anaphylaxis', 'anaphylactic', 'anaphylactic shock'
];

// ==========================================
// Multi-query Templates - PRIORITIZED by relevance
// ==========================================
const SEARCH_QUERY_TEMPLATES = [
  '{phrase} restaurants in {destination}',  // Most specific based on user's allergy
  'allergy friendly restaurants in {destination}',  // General allergy search
  'celiac safe restaurants in {destination}',  // Celiac-specific
  'dietary restrictions restaurants in {destination}'  // Broader dietary search
];

// Language mapping for destinations
const DESTINATION_LANGUAGES: Record<string, string> = {
  'prague': 'cs', 'czech': 'cs', 'czechia': 'cs',
  'rome': 'it', 'italy': 'it', 'milan': 'it', 'florence': 'it', 'naples': 'it', 'venice': 'it', 'tuscany': 'it',
  'paris': 'fr', 'france': 'fr', 'lyon': 'fr', 'nice': 'fr', 'marseille': 'fr',
  'madrid': 'es', 'spain': 'es', 'barcelona': 'es', 'seville': 'es', 'valencia': 'es',
  'berlin': 'de', 'germany': 'de', 'munich': 'de', 'frankfurt': 'de', 'hamburg': 'de',
  'amsterdam': 'nl', 'netherlands': 'nl', 'rotterdam': 'nl',
  'lisbon': 'pt', 'portugal': 'pt', 'porto': 'pt',
  'athens': 'el', 'greece': 'el', 'crete': 'el', 'rhodes': 'el', 'santorini': 'el',
  'vienna': 'de', 'austria': 'de', 'salzburg': 'de',
  'stockholm': 'sv', 'sweden': 'sv', 'gothenburg': 'sv',
  'copenhagen': 'da', 'denmark': 'da',
  'oslo': 'no', 'norway': 'no',
  'helsinki': 'fi', 'finland': 'fi',
  'warsaw': 'pl', 'poland': 'pl', 'krakow': 'pl',
  'budapest': 'hu', 'hungary': 'hu',
  'brussels': 'nl', 'belgium': 'nl',
  'zurich': 'de', 'switzerland': 'de', 'geneva': 'fr',
  'tokyo': 'ja', 'japan': 'ja', 'osaka': 'ja', 'kyoto': 'ja',
  'bangkok': 'th', 'thailand': 'th', 'phuket': 'th', 'chiang mai': 'th', 'koh samui': 'th',
  'istanbul': 'tr', 'turkey': 'tr', 'antalya': 'tr',
  'tel aviv': 'he', 'israel': 'he', 'jerusalem': 'he', 'eilat': 'he',
  'dubai': 'ar', 'abu dhabi': 'ar', 'uae': 'ar',
  'toronto': 'en', 'canada': 'en', 'vancouver': 'en', 'montreal': 'fr',
  'new york': 'en', 'usa': 'en', 'los angeles': 'en', 'chicago': 'en', 'miami': 'en',
  'london': 'en', 'uk': 'en', 'england': 'en', 'scotland': 'en',
  'sydney': 'en', 'australia': 'en', 'melbourne': 'en',
  'cyprus': 'el', 'ayia napa': 'el', 'paphos': 'el', 'limassol': 'el',
};

// Priority order for allergy phrases (for search query optimization)
const allergyPhraseMap: Record<string, string> = {
  'celiac': 'celiac friendly',
  'celiac disease': 'celiac friendly',
  'gluten': 'gluten free',
  'peanuts': 'peanut allergy friendly',
  'peanut': 'peanut allergy friendly',
  'tree nuts': 'tree nut allergy friendly',
  'tree nut': 'tree nut allergy friendly',
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
  'tree nuts', 'tree nut', 'nuts', 'dairy', 'lactose',
  'eggs', 'egg', 'soy', 'fish', 'shellfish', 'sesame',
  'vegan', 'vegetarian'
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
// Two-Layer Classification System
// ==========================================

// Normalize text for matching: lowercase, punctuation to spaces, collapse spaces
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Find all matching terms from a list using word boundary matching
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

// Check for strong warning phrases
function findStrongWarningPhrases(normalizedText: string): string[] {
  const matches: string[] = [];
  for (const phrase of strongWarningPhrases) {
    const normalizedPhrase = normalizeText(phrase);
    const regexPattern = normalizedPhrase.replace(/\s+/g, '\\s+');
    const regex = new RegExp(`\\b${regexPattern}\\b`, 'i');
    if (regex.test(normalizedText)) {
      matches.push(phrase);
    }
  }
  return matches;
}

// Main classification result interface
interface ClassificationResult {
  isAllergyRelated: boolean;
  confidence: number;
  matchedLayerATerms: string[];
  matchedLayerBTerms: string[];
  matchedStrongPhrases: string[];
  shortReason: string;
}

// Main classification function implementing the two-layer rule
function classifyReview(text: string): ClassificationResult {
  const normalizedText = normalizeText(text);
  
  const layerAMatches = findMatchingTerms(normalizedText, layerATerms);
  const layerBMatches = findMatchingTerms(normalizedText, layerBTerms);
  const strongPhraseMatches = findStrongWarningPhrases(normalizedText);
  
  const hasLayerA = layerAMatches.length > 0;
  const hasLayerB = layerBMatches.length > 0;
  const hasStrongPhrase = strongPhraseMatches.length > 0;
  
  const isAllergyRelated = (hasLayerA && hasLayerB) || (hasLayerA && hasStrongPhrase);
  
  let confidence = 0;
  if (isAllergyRelated) {
    const totalMatches = layerAMatches.length + layerBMatches.length + strongPhraseMatches.length;
    if (hasStrongPhrase) {
      confidence = Math.min(0.95, 0.7 + (totalMatches * 0.05));
    } else {
      confidence = Math.min(0.9, 0.5 + (totalMatches * 0.08));
    }
  }
  
  let shortReason = '';
  if (isAllergyRelated) {
    if (hasStrongPhrase) {
      shortReason = `Contains strong allergy warning: ${strongPhraseMatches[0]}`;
    } else {
      shortReason = `Matches allergy terms (${layerAMatches[0]}) with safety context (${layerBMatches[0]})`;
    }
  } else if (hasLayerA && !hasLayerB) {
    shortReason = 'Contains allergy terms but lacks safety/accommodation context';
  } else {
    shortReason = 'No meaningful allergy-related content found';
  }
  
  return {
    isAllergyRelated,
    confidence,
    matchedLayerATerms: layerAMatches,
    matchedLayerBTerms: layerBMatches,
    matchedStrongPhrases: strongPhraseMatches,
    shortReason
  };
}

// Get confidence level based on classification
type ConfidenceLevel = 'high' | 'medium' | 'low';
type EvidenceStatus = 'evidence_found' | 'no_evidence' | 'insufficient_evidence';

function getConfidenceLevel(classification: ClassificationResult): ConfidenceLevel {
  if (!classification.isAllergyRelated) {
    return 'low';
  }
  if (classification.confidence >= 0.7 || classification.matchedStrongPhrases.length > 0) {
    return 'high';
  }
  if (classification.confidence >= 0.5) {
    return 'medium';
  }
  return 'low';
}

// Review snippet interface
interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
  matchedTerms: string[];
}

// Find the best allergy-related review snippet
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
      const allMatchedTerms = [
        ...classification.matchedLayerATerms,
        ...classification.matchedLayerBTerms,
        ...classification.matchedStrongPhrases
      ];
      
      bestReview = {
        text: text.length > 220 ? text.substring(0, 217) + '...' : text,
        author: review.authorAttribution?.displayName || review.author_name || 'Anonymous',
        relativeTime: review.relativePublishTimeDescription || review.relative_time_description || '',
        hasAllergyMention: true,
        score: classification.confidence,
        matchedTerms: allMatchedTerms
      };
    }
  }
  
  if (!bestReview) {
    return { text: '', author: '', relativeTime: '', hasAllergyMention: false, score: 0, matchedTerms: [] };
  }
  
  return bestReview;
}

// ==========================================
// CACHING SYSTEM - 7 day TTL
// ==========================================
interface CachedPlaceDetails {
  data: any;
  timestamp: number;
}

interface CachedSearchResult {
  data: any;
  timestamp: number;
}

const placeDetailsCache = new Map<string, CachedPlaceDetails>();
const searchResultsCache = new Map<string, CachedSearchResult>();
const PLACE_DETAILS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const SEARCH_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours for search results

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
    console.error(`❌ Geocoding error for "${destination}":`, error);
    return null;
  }
}

// ==========================================
// PAGINATION: Fetch up to MAX_PAGES_PER_QUERY pages
// ==========================================
async function fetchAllTextSearchResults(
  query: string,
  apiKey: string,
  location: GeoLocation | null,
  language: string,
  maxPages: number = MAX_PAGES_PER_QUERY,
  startTime: number = Date.now()
): Promise<any[]> {
  const allResults: any[] = [];
  let nextPageToken: string | null = null;
  
  for (let page = 0; page < maxPages; page++) {
    // Check if we've exceeded time limit
    if (Date.now() - startTime > MAX_TOTAL_TIME_MS) {
      console.log(`⏱️ Time limit reached, stopping pagination at page ${page + 1}`);
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
      console.error(`❌ Text search failed (page ${page + 1}):`, data.status);
      break;
    }
    
    if (data.results && data.results.length > 0) {
      allResults.push(...data.results);
      console.log(`   [${language}] Page ${page + 1}: ${data.results.length} results`);
    }
    
    nextPageToken = data.next_page_token;
    
    if (!nextPageToken) break;
    
    // Reduced delay - Google tolerates 1.5s typically
    await new Promise(resolve => setTimeout(resolve, PAGE_DELAY_MS));
  }
  
  return allResults;
}

// ==========================================
// MULTI-QUERY SEARCH WITH MERGE BY PLACE_ID
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

async function runMultiQuerySearch(
  destination: string,
  primaryPhrase: string,
  apiKey: string,
  location: GeoLocation | null,
  startTime: number = Date.now()
): Promise<CandidatePlace[]> {
  const candidatesMap = new Map<string, CandidatePlace>();
  const destLanguage = getDestinationLanguage(destination);
  
  // Run only English for speed, add local language only if time permits
  const languages = ['en'];
  const useLocalLang = destLanguage !== 'en';
  
  // Limit query templates based on MAX_QUERIES
  const limitedTemplates = SEARCH_QUERY_TEMPLATES.slice(0, MAX_QUERIES);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 FAST MULTI-QUERY SEARCH`);
  console.log(`   Destination: ${destination}`);
  console.log(`   Primary phrase: ${primaryPhrase}`);
  console.log(`   Languages: en${useLocalLang ? ` + ${destLanguage} (if time permits)` : ''}`);
  console.log(`   Query templates: ${limitedTemplates.length} (limited for speed)`);
  console.log(`   Time budget: ${MAX_TOTAL_TIME_MS}ms`);
  console.log(`${'='.repeat(60)}\n`);
  
  let queryIndex = 0;
  const queryStats: { query: string; lang: string; results: number; timeMs: number }[] = [];
  
  // First pass: English queries (priority)
  for (const template of limitedTemplates) {
    if (Date.now() - startTime > MAX_TOTAL_TIME_MS) {
      console.log(`⏱️ Time limit reached after ${queryIndex} queries`);
      break;
    }
    
    const query = template
      .replace('{phrase}', primaryPhrase)
      .replace('{destination}', destination);
    
    queryIndex++;
    const queryStart = Date.now();
    console.log(`📋 Query ${queryIndex}: "${query}" [en]`);
    
    const results = await fetchAllTextSearchResults(query, apiKey, location, 'en', MAX_PAGES_PER_QUERY, startTime);
    
    queryStats.push({
      query,
      lang: 'en',
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
  
  // Second pass: Local language (only if time permits and we need more results)
  if (useLocalLang && candidatesMap.size < 100 && Date.now() - startTime < MAX_TOTAL_TIME_MS * 0.7) {
    console.log(`\n🌍 Adding local language (${destLanguage}) queries...`);
    
    for (const template of limitedTemplates.slice(0, 2)) { // Only first 2 templates
      if (Date.now() - startTime > MAX_TOTAL_TIME_MS) break;
      
      const query = template
        .replace('{phrase}', primaryPhrase)
        .replace('{destination}', destination);
      
      queryIndex++;
      const queryStart = Date.now();
      console.log(`📋 Query ${queryIndex}: "${query}" [${destLanguage}]`);
      
      const results = await fetchAllTextSearchResults(query, apiKey, location, destLanguage, 1, startTime); // Only 1 page
      
      queryStats.push({
        query,
        lang: destLanguage,
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
  }
  
  // Log summary
  const totalTime = Date.now() - startTime;
  const totalResults = queryStats.reduce((sum, s) => sum + s.results, 0);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 SEARCH SUMMARY (${totalTime}ms)`);
  console.log(`${'='.repeat(60)}`);
  console.log(`   Queries executed: ${queryStats.length}`);
  console.log(`   Total results: ${totalResults}`);
  console.log(`   Unique places: ${candidatesMap.size}`);
  console.log(`   Duplicates removed: ${totalResults - candidatesMap.size}`);
  
  for (const stat of queryStats) {
    console.log(`   [${stat.lang}] ${stat.results} results in ${stat.timeMs}ms`);
  }
  console.log(`${'='.repeat(60)}\n`);
  
  return Array.from(candidatesMap.values());
}

// ==========================================
// CANDIDATE RANKING (before Place Details)
// ==========================================
function rankCandidates(candidates: CandidatePlace[]): CandidatePlace[] {
  return candidates.sort((a, b) => {
    // 1. Match count (appears in more queries = higher priority)
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }
    // 2. Total ratings (popularity indicator)
    if ((b.user_ratings_total || 0) !== (a.user_ratings_total || 0)) {
      return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    }
    // 3. Rating
    return (b.rating || 0) - (a.rating || 0);
  });
}

// ==========================================
// FETCH PLACE DETAILS WITH CACHING
// ==========================================
async function fetchPlaceDetails(
  placeId: string,
  apiKey: string
): Promise<any | null> {
  // Check cache first
  const cached = getCachedPlaceDetails(placeId);
  if (cached) {
    console.log(`📦 Cache hit for place: ${placeId}`);
    return cached;
  }
  
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,user_ratings_total,opening_hours,price_level,url,reviews,website,editorial_summary,types,international_phone_number&key=${apiKey}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.result) {
      console.log(`⚠️ Failed to get details for place ${placeId}: ${data.status}`);
      return null;
    }
    
    // Cache the result
    setCachedPlaceDetails(placeId, data.result);
    console.log(`💾 Cached details for place: ${placeId}`);
    
    return data.result;
  } catch (error) {
    console.error(`❌ Error fetching details for ${placeId}:`, error);
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
    const { destination, allergies } = await req.json();
    
    console.log('📍 Restaurant search request:', { destination, allergies });

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
        JSON.stringify({ error: 'Google Maps API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const startTime = Date.now();
    const allergiesArray = Array.isArray(allergies) ? allergies : [];
    const primaryPhrase = getPrimaryPhrase(allergiesArray);
    const hasAllergies = allergiesArray.length > 0;
    
    console.log('🔍 Primary phrase:', primaryPhrase);
    console.log('🌍 Destination language:', getDestinationLanguage(destination));

    // Step 1: Geocode destination (quick, ~100ms)
    console.log('📍 Step 1: Geocoding destination...');
    const location = await geocodeDestination(destination, apiKey);
    console.log(`⏱️ Geocoding took ${Date.now() - startTime}ms`);

    // Step 2: Run multi-query search with pagination
    console.log('🔍 Step 2: Running multi-query search...');
    const candidates = await runMultiQuerySearch(destination, primaryPhrase, apiKey, location, startTime);
    console.log(`⏱️ Search phase took ${Date.now() - startTime}ms`);

    if (candidates.length === 0) {
      console.log('⚠️ No restaurants found');
      return new Response(
        JSON.stringify({ 
          destination,
          mode: 'Restaurants',
          queryPhrase: primaryPhrase,
          places: [],
          fallbackUrl: `https://www.google.com/maps/search/allergy+friendly+restaurants+${encodeURIComponent(destination)}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Rank candidates
    console.log('📊 Step 3: Ranking candidates...');
    const rankedCandidates = rankCandidates(candidates);
    console.log(`📊 Top candidates: ${rankedCandidates.slice(0, 5).map(c => `${c.name} (${c.matchCount})`).join(', ')}`);

    // Step 4: Fetch Place Details only for top N (cost saving)
    const topCandidates = rankedCandidates.slice(0, TOP_N);
    console.log(`💰 Step 4: Fetching Place Details for top ${TOP_N} candidates...`);

    const places = [];
    let cacheHits = 0;
    
    // Increased batch size for faster completion
    for (let i = 0; i < topCandidates.length; i += PARALLEL_DETAILS_BATCH) {
      const batch = topCandidates.slice(i, i + PARALLEL_DETAILS_BATCH);
      const batchPromises = batch.map(async (candidate) => {
        const wasCached = getCachedPlaceDetails(candidate.place_id) !== null;
        if (wasCached) cacheHits++;
        
        const details = await fetchPlaceDetails(candidate.place_id, apiKey);
        if (!details) return null;
        
        const reviewSnippet = findBestReviewSnippet(details.reviews);
        
        // Improved evidence status determination
        let evidenceStatus: EvidenceStatus = 'no_evidence';
        let confidenceLevel: ConfidenceLevel = 'low';
        
        // Calculate total review text length for determining if we have enough data
        const reviews = details.reviews || [];
        const totalReviewTextLength = reviews.reduce((sum: number, r: any) => {
          const text = r.text?.text || r.text || '';
          return sum + text.length;
        }, 0);
        
        if (reviewSnippet.hasAllergyMention && reviewSnippet.text) {
          // Evidence found - we have an allergy-related review
          const classification = classifyReview(reviewSnippet.text);
          confidenceLevel = getConfidenceLevel(classification);
          evidenceStatus = 'evidence_found';
        } else if (
          reviews.length === 0 ||                      // No reviews at all
          totalReviewTextLength < 200 ||               // Very little text to analyze
          (reviews.length < 3 && totalReviewTextLength < 500) // Few reviews with short text
        ) {
          // Insufficient evidence - not enough data to make a determination
          evidenceStatus = 'insufficient_evidence';
        } else {
          // No evidence - we analyzed enough reviews but found nothing
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
          editorialSummary: details.editorial_summary?.overview,
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
          reviewCount: reviews.length,
          totalReviewTextLength
        };
      });
      
      const batchResults = await Promise.all(batchPromises);
      places.push(...batchResults.filter(p => p !== null));
    }
    
    console.log(`⏱️ Place Details phase took ${Date.now() - startTime}ms total`);

    // Step 5: Final sorting
    console.log('📊 Step 5: Final sorting...');
    places.sort((a, b) => {
      // 1. Evidence found first
      const evidenceOrder = { evidence_found: 3, insufficient_evidence: 2, no_evidence: 1 };
      const aEvidence = evidenceOrder[a.evidenceStatus] || 0;
      const bEvidence = evidenceOrder[b.evidenceStatus] || 0;
      if (aEvidence !== bEvidence) return bEvidence - aEvidence;
      
      // 2. Confidence level
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      const aConf = confidenceOrder[a.confidenceLevel] || 0;
      const bConf = confidenceOrder[b.confidenceLevel] || 0;
      if (aConf !== bConf) return bConf - aConf;
      
      // 3. Match count (appeared in more queries)
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      
      // 4. Rating
      return (b.rating || 0) - (a.rating || 0);
    });

    const allergyMentionCount = places.filter(p => p.reviewSnippet?.hasAllergyMention).length;
    const evidenceFoundCount = places.filter(p => p.evidenceStatus === 'evidence_found').length;
    const insufficientCount = places.filter(p => p.evidenceStatus === 'insufficient_evidence').length;
    const noEvidenceCount = places.length - evidenceFoundCount - insufficientCount;
    
    const totalTime = Date.now() - startTime;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ FINAL RESULTS (${totalTime}ms total)`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📊 Total candidates found: ${candidates.length}`);
    console.log(`📊 Top N selected for details: ${TOP_N}`);
    console.log(`📊 Place Details fetched: ${places.length}`);
    console.log(`📊 Place Details from cache: ${cacheHits}`);
    console.log(`📊 Place Details saved (not fetched): ${Math.max(0, candidates.length - TOP_N)}`);
    console.log(`\n📊 EVIDENCE STATUS DISTRIBUTION:`);
    console.log(`   📗 Evidence found: ${evidenceFoundCount} (${((evidenceFoundCount/places.length)*100).toFixed(1)}%)`);
    console.log(`   📙 Insufficient evidence: ${insufficientCount} (${((insufficientCount/places.length)*100).toFixed(1)}%)`);
    console.log(`   📕 No evidence: ${noEvidenceCount} (${((noEvidenceCount/places.length)*100).toFixed(1)}%)`);
    console.log(`   🔍 Allergy mentions in snippets: ${allergyMentionCount}`);
    
    // Log top 10 results
    console.log(`\n📊 TOP 10 RESULTS:`);
    places.slice(0, 10).forEach((p, i) => {
      console.log(`   ${i+1}. ${p.name}`);
      console.log(`      Evidence: ${p.evidenceStatus} | Confidence: ${p.confidenceLevel} | Match count: ${p.matchCount}`);
      console.log(`      Rating: ${p.rating?.toFixed(1) || 'N/A'} (${p.totalRatings || 0} reviews)`);
    });
    console.log(`${'='.repeat(60)}\n`);

    const searchQuery = hasAllergies 
      ? `${primaryPhrase} allergy friendly restaurants in ${destination}`
      : `allergy friendly restaurants in ${destination}`;

    const response = {
      destination,
      mode: 'Restaurants',
      queryPhrase: primaryPhrase,
      places,
      totalCandidates: candidates.length,
      detailsFetched: places.length,
      stats: {
        evidenceFound: evidenceFoundCount,
        insufficientEvidence: insufficientCount,
        noEvidence: noEvidenceCount,
        allergyMentions: allergyMentionCount,
        cacheHits,
        totalTimeMs: totalTime
      },
      fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
    };

    return new Response(
      JSON.stringify(response),
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
