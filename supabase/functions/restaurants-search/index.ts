import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Priority order for allergy phrases
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

// Priority order for phrase selection
const allergyPriority = [
  'celiac disease', 'celiac', 'gluten', 'peanuts', 'peanut', 
  'tree nuts', 'tree nut', 'nuts', 'dairy', 'lactose',
  'eggs', 'egg', 'soy', 'fish', 'shellfish', 'sesame',
  'vegan', 'vegetarian'
];

// General allergy keywords (always included)
const generalAllergyKeywords = [
  'allergy', 'allergic', 'allergen', 'anaphylaxis', 'epipen',
  'cross contamination', 'contamination', 'dietary restriction', 
  'dietary requirements', 'intolerance', 'intolerant', 'sensitivity',
  'special diet'
];

// Accommodation keywords (positive signals)
const accommodationKeywords = [
  'accommodated', 'accommodate', 'careful', 'safe', 'staff', 'manager',
  'chef', 'understood', 'protocol', 'separate', 'dedicated fryer', 
  'took seriously'
];

// Allergy-specific keywords based on primary phrase
const specificAllergyKeywords: Record<string, string[]> = {
  'dairy free': ['dairy free', 'dairy-free', 'milk free', 'lactose free', 'casein', 'whey'],
  'lactose free': ['dairy free', 'dairy-free', 'milk free', 'lactose free', 'casein', 'whey'],
  'gluten free': ['gluten free', 'gluten-free', 'celiac', 'coeliac', 'gf', 'cross contamination'],
  'celiac friendly': ['gluten free', 'gluten-free', 'celiac', 'coeliac', 'gf', 'cross contamination'],
  'peanut allergy friendly': ['peanut', 'peanuts', 'nut', 'nuts', 'almond', 'walnut', 'cashew', 'hazelnut'],
  'tree nut allergy friendly': ['peanut', 'peanuts', 'nut', 'nuts', 'almond', 'walnut', 'cashew', 'hazelnut'],
  'nut allergy friendly': ['peanut', 'peanuts', 'nut', 'nuts', 'almond', 'walnut', 'cashew', 'hazelnut'],
  'egg free': ['egg free', 'egg-free', 'eggs'],
  'soy free': ['soy free', 'soy-free', 'soya'],
  'sesame free': ['sesame free', 'sesame-free', 'sesame'],
  'fish allergy friendly': ['seafood allergy', 'fish allergy', 'fish free'],
  'shellfish allergy friendly': ['seafood allergy', 'shellfish allergy', 'shellfish free'],
  'vegan': ['vegan', 'plant based', 'plant-based'],
  'vegetarian': ['vegetarian', 'veggie'],
  'allergy friendly': []
};

const REVIEW_SCORE_THRESHOLD = 2;

function getPrimaryPhrase(allergies: string[]): string {
  const normalizedAllergies = allergies.map(a => a.toLowerCase().trim());
  
  for (const priority of allergyPriority) {
    if (normalizedAllergies.some(a => a.includes(priority) || priority.includes(a))) {
      return allergyPhraseMap[priority];
    }
  }
  
  return 'allergy friendly';
}

function scoreReview(reviewText: string, primaryPhrase: string): number {
  const text = reviewText.toLowerCase();
  let score = 0;
  
  // Check general allergy keywords
  for (const keyword of generalAllergyKeywords) {
    if (text.includes(keyword)) score++;
  }
  
  // Check accommodation keywords
  for (const keyword of accommodationKeywords) {
    if (text.includes(keyword)) score++;
  }
  
  // Check allergy-specific keywords based on primary phrase
  const specificKeywords = specificAllergyKeywords[primaryPhrase] || [];
  for (const keyword of specificKeywords) {
    if (text.includes(keyword)) score++;
  }
  
  return score;
}

function findBestReviewSnippet(
  reviews: any[], 
  primaryPhrase: string
): { text: string; author: string; relativeTime: string; hasAllergyMention: boolean } | null {
  if (!reviews || reviews.length === 0) return null;
  
  // Score all reviews and find the best one
  let bestReview = null;
  let bestScore = 0;
  
  for (const review of reviews) {
    const reviewText = review.text?.text || review.text || '';
    const score = scoreReview(reviewText, primaryPhrase);
    
    if (score > bestScore) {
      bestScore = score;
      bestReview = review;
    }
  }
  
  // Only return as allergy-related if score meets threshold
  if (bestScore >= REVIEW_SCORE_THRESHOLD && bestReview) {
    const text = bestReview.text?.text || bestReview.text || '';
    return {
      text: text.length > 220 ? text.substring(0, 217) + '...' : text,
      author: bestReview.authorAttribution?.displayName || bestReview.author_name || '',
      relativeTime: bestReview.relativePublishTimeDescription || bestReview.relative_time_description || '',
      hasAllergyMention: true
    };
  }
  
  // No allergy-relevant review found - return null to indicate no match
  return {
    text: '',
    author: '',
    relativeTime: '',
    hasAllergyMention: false
  };
}

function findBestReviewSnippet(reviews: any[]): { text: string; author: string; relativeTime: string } | null {
  if (!reviews || reviews.length === 0) return null;
  
  // First, try to find a review mentioning allergy-related keywords
  for (const review of reviews) {
    const reviewText = (review.text?.text || review.text || '').toLowerCase();
    if (allergyKeywords.some(keyword => reviewText.includes(keyword))) {
      const text = review.text?.text || review.text || '';
      return {
        text: text.length > 220 ? text.substring(0, 217) + '...' : text,
        author: review.authorAttribution?.displayName || review.author_name || '',
        relativeTime: review.relativePublishTimeDescription || review.relative_time_description || ''
      };
    }
  }
  
  // Fallback: use the first (most relevant/recent) review
  const firstReview = reviews[0];
  const text = firstReview.text?.text || firstReview.text || '';
  return {
    text: text.length > 220 ? text.substring(0, 217) + '...' : text,
    author: firstReview.authorAttribution?.displayName || firstReview.author_name || '',
    relativeTime: firstReview.relativePublishTimeDescription || firstReview.relative_time_description || ''
  };
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
    // Include "allergy" in the search query when allergies are selected to increase relevance
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
          const reviewSnippet = findBestReviewSnippet(details.reviews, primaryPhrase);
          
          return {
            name: details.name || place.name,
            address: details.formatted_address || place.formatted_address,
            rating: details.rating || place.rating,
            totalRatings: details.user_ratings_total || place.user_ratings_total,
            openNow: details.opening_hours?.open_now,
            priceLevel: details.price_level,
            mapsUrl: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            reviewSnippet: reviewSnippet
          };
        } catch (err) {
          console.error(`❌ Error fetching details for ${place.name}:`, err);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      places.push(...batchResults.filter(p => p !== null));
    }

    console.log(`✅ Successfully processed ${places.length} restaurants`);

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
