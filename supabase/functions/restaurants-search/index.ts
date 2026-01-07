import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

// ==========================================
// Two-Layer Classification System
// ==========================================

// Normalize text for matching: lowercase, punctuation to spaces, collapse spaces
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')  // Replace punctuation with spaces
    .replace(/\s+/g, ' ')      // Collapse multiple spaces
    .trim();
}

// Find all matching terms from a list using word boundary matching
function findMatchingTerms(normalizedText: string, terms: string[]): string[] {
  const matches: string[] = [];
  for (const term of terms) {
    const normalizedTerm = normalizeText(term);
    // Use word boundary matching - escape special regex chars and allow flexible spacing
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
  
  // Decision rule:
  // - (Layer A AND Layer B) = related
  // - (Layer A AND Strong Warning) = related (exception rule)
  const isAllergyRelated = (hasLayerA && hasLayerB) || (hasLayerA && hasStrongPhrase);
  
  // Calculate confidence score
  let confidence = 0;
  if (isAllergyRelated) {
    const totalMatches = layerAMatches.length + layerBMatches.length + strongPhraseMatches.length;
    if (hasStrongPhrase) {
      // Strong phrases get higher base confidence
      confidence = Math.min(0.95, 0.7 + (totalMatches * 0.05));
    } else {
      confidence = Math.min(0.9, 0.5 + (totalMatches * 0.08));
    }
  }
  
  // Generate human-readable reason
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
    
    // Only consider reviews that pass the two-layer test
    if (classification.isAllergyRelated && classification.confidence > bestScore) {
      bestScore = classification.confidence;
      const allMatchedTerms = [
        ...classification.matchedLayerATerms,
        ...classification.matchedLayerBTerms,
        ...classification.matchedStrongPhrases
      ];
      
      console.log(`✅ Found allergy-related review (confidence: ${classification.confidence.toFixed(2)}): "${text.substring(0, 80)}..."`);
      console.log(`   Layer A: [${classification.matchedLayerATerms.join(', ')}]`);
      console.log(`   Layer B: [${classification.matchedLayerBTerms.join(', ')}]`);
      if (classification.matchedStrongPhrases.length > 0) {
        console.log(`   Strong phrases: [${classification.matchedStrongPhrases.join(', ')}]`);
      }
      
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
  
  // If no allergy-related review found, return empty (NOT a generic review)
  if (!bestReview) {
    console.log(`ℹ️ No allergy-related reviews found (two-layer test failed for all reviews)`);
    return { text: '', author: '', relativeTime: '', hasAllergyMention: false, score: 0, matchedTerms: [] };
  }
  
  return bestReview;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(destination: string, phrase: string): string {
  return `${destination.toLowerCase().trim()}_${phrase}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
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

    const allergiesArray = Array.isArray(allergies) ? allergies : [];
    const primaryPhrase = getPrimaryPhrase(allergiesArray);
    const hasAllergies = allergiesArray.length > 0;
    const searchQuery = hasAllergies 
      ? `${primaryPhrase} allergy friendly restaurants in ${destination}`
      : `${primaryPhrase} restaurants in ${destination}`;
    
    console.log('🔍 Search query:', searchQuery);

    // Check cache
    const cacheKey = getCacheKey(destination, primaryPhrase);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('📦 Returning cached results');
      return new Response(
        JSON.stringify(cached.data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Text Search to find restaurants
    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&type=restaurant&key=${apiKey}`;
    
    console.log('🔎 Performing text search...');
    const searchResponse = await fetch(textSearchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      console.error('❌ Text search failed:', searchData.status, searchData.error_message);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to search for restaurants',
          fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!searchData.results || searchData.results.length === 0) {
      console.log('⚠️ No restaurants found');
      return new Response(
        JSON.stringify({ 
          destination,
          mode: 'Restaurants',
          queryPhrase: primaryPhrase,
          places: [],
          fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit to 10 restaurants
    const topResults = searchData.results.slice(0, 10);
    console.log(`📍 Found ${topResults.length} restaurants, fetching details...`);

    // Step 2: Fetch place details for each restaurant (with concurrency limit of 4)
    const places = [];
    const batchSize = 4;
    
    for (let i = 0; i < topResults.length; i += batchSize) {
      const batch = topResults.slice(i, i + batchSize);
      const batchPromises = batch.map(async (place: any) => {
        try {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,rating,user_ratings_total,opening_hours,price_level,url,reviews&key=${apiKey}`;
          
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();
          
          if (detailsData.status !== 'OK' || !detailsData.result) {
            console.log(`⚠️ Failed to get details for ${place.name}`);
            return null;
          }
          
          const details = detailsData.result;
          const reviewSnippet = findBestReviewSnippet(details.reviews);
          
          // Get classification-based confidence
          let confidenceLevel: ConfidenceLevel = 'low';
          if (reviewSnippet.hasAllergyMention && reviewSnippet.text) {
            const classification = classifyReview(reviewSnippet.text);
            confidenceLevel = getConfidenceLevel(classification);
          }
          
          return {
            name: details.name || place.name,
            address: details.formatted_address || place.formatted_address,
            rating: details.rating || place.rating,
            totalRatings: details.user_ratings_total || place.user_ratings_total,
            openNow: details.opening_hours?.open_now,
            priceLevel: details.price_level,
            mapsUrl: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            reviewSnippet: {
              text: reviewSnippet.text,
              author: reviewSnippet.author,
              relativeTime: reviewSnippet.relativeTime,
              hasAllergyMention: reviewSnippet.hasAllergyMention,
              score: reviewSnippet.score
            },
            confidenceLevel
          };
        } catch (err) {
          console.error(`❌ Error fetching details for ${place.name}:`, err);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      places.push(...batchResults.filter(p => p !== null));
    }

    // Sort: allergy-mentioned restaurants first, then by confidence, then by rating
    places.sort((a, b) => {
      const aHasAllergy = a.reviewSnippet?.hasAllergyMention ? 1 : 0;
      const bHasAllergy = b.reviewSnippet?.hasAllergyMention ? 1 : 0;
      
      if (aHasAllergy !== bHasAllergy) {
        return bHasAllergy - aHasAllergy;
      }
      
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      const aConf = confidenceOrder[a.confidenceLevel] || 0;
      const bConf = confidenceOrder[b.confidenceLevel] || 0;
      
      if (aConf !== bConf) {
        return bConf - aConf;
      }
      
      return (b.rating || 0) - (a.rating || 0);
    });

    const allergyMentionCount = places.filter(p => p.reviewSnippet?.hasAllergyMention).length;
    console.log(`✅ Processed ${places.length} restaurants, ${allergyMentionCount} with verified allergy mentions (two-layer test)`);

    const response = {
      destination,
      mode: 'Restaurants',
      queryPhrase: primaryPhrase,
      places,
      fallbackUrl: `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
    };

    // Cache the results
    cache.set(cacheKey, { data: response, timestamp: Date.now() });

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
