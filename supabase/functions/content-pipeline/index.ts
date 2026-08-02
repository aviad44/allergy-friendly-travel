import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ==========================================
// Destinations NOT already covered by a static /destinations/* page on the
// site — expands geographic coverage instead of competing with existing
// pages for the same keyword. Rotates one per run.
// ==========================================
const DESTINATIONS = [
  // Original 30
  { city: 'Vienna', country: 'Austria' },
  { city: 'Prague', country: 'Czech Republic' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Lisbon', country: 'Portugal' },
  { city: 'Dublin', country: 'Ireland' },
  { city: 'Copenhagen', country: 'Denmark' },
  { city: 'Florence', country: 'Italy' },
  { city: 'Zurich', country: 'Switzerland' },
  { city: 'San Francisco', country: 'USA' },
  { city: 'Chicago', country: 'USA' },
  { city: 'Los Angeles', country: 'USA' },
  { city: 'Miami', country: 'USA' },
  { city: 'Seattle', country: 'USA' },
  { city: 'Boston', country: 'USA' },
  { city: 'Vancouver', country: 'Canada' },
  { city: 'Montreal', country: 'Canada' },
  { city: 'Kyoto', country: 'Japan' },
  { city: 'Osaka', country: 'Japan' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Bangkok', country: 'Thailand' },
  { city: 'Hong Kong', country: 'China' },
  { city: 'Seoul', country: 'South Korea' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Melbourne', country: 'Australia' },
  { city: 'Budapest', country: 'Hungary' },
  { city: 'Reykjavik', country: 'Iceland' },
  { city: 'Edinburgh', country: 'Scotland' },
  { city: 'Porto', country: 'Portugal' },
  { city: 'Seville', country: 'Spain' },
  // Europe
  { city: 'Munich', country: 'Germany' },
  { city: 'Hamburg', country: 'Germany' },
  { city: 'Cologne', country: 'Germany' },
  { city: 'Frankfurt', country: 'Germany' },
  { city: 'Milan', country: 'Italy' },
  { city: 'Venice', country: 'Italy' },
  { city: 'Naples', country: 'Italy' },
  { city: 'Bologna', country: 'Italy' },
  { city: 'Turin', country: 'Italy' },
  { city: 'Valencia', country: 'Spain' },
  { city: 'Malaga', country: 'Spain' },
  { city: 'Bilbao', country: 'Spain' },
  { city: 'Nice', country: 'France' },
  { city: 'Lyon', country: 'France' },
  { city: 'Marseille', country: 'France' },
  { city: 'Bordeaux', country: 'France' },
  { city: 'Strasbourg', country: 'France' },
  { city: 'Brussels', country: 'Belgium' },
  { city: 'Antwerp', country: 'Belgium' },
  { city: 'Warsaw', country: 'Poland' },
  { city: 'Krakow', country: 'Poland' },
  { city: 'Bratislava', country: 'Slovakia' },
  { city: 'Ljubljana', country: 'Slovenia' },
  { city: 'Zagreb', country: 'Croatia' },
  { city: 'Split', country: 'Croatia' },
  { city: 'Dubrovnik', country: 'Croatia' },
  { city: 'Bucharest', country: 'Romania' },
  { city: 'Sofia', country: 'Bulgaria' },
  { city: 'Belgrade', country: 'Serbia' },
  { city: 'Vilnius', country: 'Lithuania' },
  { city: 'Riga', country: 'Latvia' },
  { city: 'Tallinn', country: 'Estonia' },
  { city: 'Helsinki', country: 'Finland' },
  { city: 'Oslo', country: 'Norway' },
  { city: 'Bergen', country: 'Norway' },
  { city: 'Gothenburg', country: 'Sweden' },
  { city: 'Geneva', country: 'Switzerland' },
  { city: 'Basel', country: 'Switzerland' },
  { city: 'Innsbruck', country: 'Austria' },
  { city: 'Salzburg', country: 'Austria' },
  { city: 'Manchester', country: 'UK' },
  { city: 'Glasgow', country: 'UK' },
  { city: 'Cork', country: 'Ireland' },
  { city: 'Belfast', country: 'UK' },
  { city: 'Cardiff', country: 'UK' },
  { city: 'Liverpool', country: 'UK' },
  // Americas
  { city: 'Washington DC', country: 'USA' },
  { city: 'Philadelphia', country: 'USA' },
  { city: 'Austin', country: 'USA' },
  { city: 'Denver', country: 'USA' },
  { city: 'Portland', country: 'USA' },
  { city: 'San Diego', country: 'USA' },
  { city: 'Las Vegas', country: 'USA' },
  { city: 'New Orleans', country: 'USA' },
  { city: 'Nashville', country: 'USA' },
  { city: 'Quebec City', country: 'Canada' },
  { city: 'Ottawa', country: 'Canada' },
  { city: 'Calgary', country: 'Canada' },
  { city: 'Mexico City', country: 'Mexico' },
  { city: 'Cancun', country: 'Mexico' },
  { city: 'Buenos Aires', country: 'Argentina' },
  { city: 'Rio de Janeiro', country: 'Brazil' },
  { city: 'Sao Paulo', country: 'Brazil' },
  { city: 'Lima', country: 'Peru' },
  { city: 'Santiago', country: 'Chile' },
  { city: 'Bogota', country: 'Colombia' },
  { city: 'Cartagena', country: 'Colombia' },
  // Asia
  { city: 'Taipei', country: 'Taiwan' },
  { city: 'Shanghai', country: 'China' },
  { city: 'Beijing', country: 'China' },
  { city: 'Busan', country: 'South Korea' },
  { city: 'Chiang Mai', country: 'Thailand' },
  { city: 'Phuket', country: 'Thailand' },
  { city: 'Bali', country: 'Indonesia' },
  { city: 'Kuala Lumpur', country: 'Malaysia' },
  { city: 'Ho Chi Minh City', country: 'Vietnam' },
  { city: 'Hanoi', country: 'Vietnam' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Delhi', country: 'India' },
  { city: 'Goa', country: 'India' },
  { city: 'Colombo', country: 'Sri Lanka' },
  { city: 'Kathmandu', country: 'Nepal' },
  // Middle East & Africa
  { city: 'Doha', country: 'Qatar' },
  { city: 'Amman', country: 'Jordan' },
  { city: 'Marrakech', country: 'Morocco' },
  { city: 'Casablanca', country: 'Morocco' },
  { city: 'Cairo', country: 'Egypt' },
  { city: 'Cape Town', country: 'South Africa' },
  { city: 'Nairobi', country: 'Kenya' },
  // Oceania
  { city: 'Auckland', country: 'New Zealand' },
  { city: 'Brisbane', country: 'Australia' },
  { city: 'Perth', country: 'Australia' },
  { city: 'Queenstown', country: 'New Zealand' },
];

// ==========================================
// ALLERGY KEYWORD LISTS — same matcher as hotel-search/restaurants-search
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
  'allergy protocol', 'allergy friendly kitchen',
];

const WARNING_PHRASES = [
  'not safe', 'unsafe', 'reaction', 'allergic reaction',
  'epipen', 'epi pen', 'anaphylaxis', 'anaphylactic',
];

// Bare 'allergy'/'allergies'/'allergic'/'allergen'/'allergens' match any kind
// of allergy — dust, pet, pollen, not just food (this is how "runny nose due
// to my dust allergy" ended up counted as food-allergy evidence for a hotel
// that has nothing to do with dietary accommodation). Unlike the more
// specific STRICT_TERMS phrases above, these only count as evidence when
// paired with something that shows the allergy discussion was actually
// about food.
const GENERIC_ALLERGY_TERMS = ['allergy', 'allergies', 'allergic', 'allergen', 'allergens'];
const FOOD_CONTEXT_TERMS = ['food', 'meal', 'meals', 'eat', 'eating', 'ate', 'menu', 'kitchen', 'diet', 'dish', 'dishes', 'cook', 'cooked', 'chef', 'restaurant', 'dining', 'breakfast', 'lunch', 'dinner', 'buffet', 'snack'];

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

function classifyAndExtract(reviewText: string): ReviewSnippet | null {
  const norm = normalize(reviewText);
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
  // vegan/vegetarian/plant-based excluded: this +hasPositive path has no
  // safety-language requirement, so "great vegan food!" alone would pass as
  // allergy evidence. They still count via WEAK_TERMS, which does require
  // safety/warning co-occurrence.
  const dietaryIndicators = ['gluten', 'dairy free', 'lactose'];
  const hasDietary = dietaryIndicators.some(d => norm.includes(d));

  // hasWarning alone used to be enough ('unsafe', 'reaction', 'not safe' —
  // meant to catch allergy-reaction safety concerns), but those words are
  // generic enough to match completely unrelated complaints (a real review
  // about staff harassment matched on "unsafe" and got a 0.95 allergy score
  // purely from that). Now requires a warning phrase to co-occur with an
  // actual dietary/allergen term, so an out-of-context "unsafe" no longer
  // qualifies on its own.
  // Generic allergy words only count as strong evidence when paired with
  // food context — same principle as the hasWarning fix above.
  const hasFoodAllergyEvidence = hasStrict || (hasGenericAllergy && (hasWeak || hasDietary || hasSafety || hasFoodContext));
  const isRelevant = hasFoodAllergyEvidence || (hasWarning && (hasWeak || hasDietary)) || (hasWeak && (hasSafety || hasWarning)) || (hasDietary && hasPositive);
  if (!isRelevant) return null;

  let score = 0;
  if (hasWarning) score = 0.95;
  else if (hasFoodAllergyEvidence && hasSafety) score = 0.9;
  else if (hasFoodAllergyEvidence) score = 0.75;
  else if (hasWeak && hasSafety) score = 0.6;
  else if (hasDietary && hasPositive) score = 0.4;

  const allMatched = [...new Set([...strictMatches, ...weakMatches, ...safetyMatches, ...warningMatches, ...(hasFoodAllergyEvidence ? genericAllergyMatches : [])])];

  const sentences = reviewText.split(/(?<=[.!?])\s+/);
  const relevant: string[] = [];
  for (const s of sentences) {
    const normS = normalize(s);
    if (allMatched.some(t => normS.includes(normalize(t)))) relevant.push(s.trim());
  }
  let snippetText = relevant.length > 0 ? relevant.join(' ') : reviewText;
  if (snippetText.length > 300) snippetText = snippetText.substring(0, 297) + '...';

  const allergens = [...new Set(allMatched.map(t => ALLERGEN_LABELS[t]).filter(Boolean))];

  return { text: snippetText, score, matchedTerms: allMatched.slice(0, 6), allergens };
}

// Google returns up to 20 results per page, up to 3 pages (60 total) via
// next_page_token. Previously this only fetched page 1, capping the
// candidate pool at 20 regardless of how many real hotels/restaurants
// Google actually has for the city — a real limit on top of the separate,
// unavoidable one of 5 reviews per place from fetchDetails below.
async function textSearch(query: string, apiKey: string, placeType: string = 'lodging'): Promise<any[]> {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=${placeType}&language=en&key=${apiKey}`;
  let results: any[] = [];
  let nextPageToken: string | undefined;

  for (let page = 0; page < 3; page++) {
    const url = nextPageToken ? `${baseUrl}&pagetoken=${nextPageToken}` : baseUrl;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error(`Text Search failed: ${data.status}`);
      break;
    }
    results = results.concat(data.results || []);
    nextPageToken = data.next_page_token;
    if (!nextPageToken) break;
    // A freshly issued next_page_token isn't valid for a few seconds.
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

function slugifyHotel(name: string, city: string): string {
  return `${name}-${city}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

interface UnsplashPhoto {
  url: string;
  credit: string;
}

// Unsplash API guidelines require: (1) attribution to photographer + Unsplash,
// (2) a "download" tracking ping when a photo is used in production.
async function fetchUnsplashPhoto(query: string, accessKey: string): Promise<UnsplashPhoto | null> {
  try {
    const searchRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!searchRes.ok) {
      console.error('Unsplash search failed:', searchRes.status, await searchRes.text());
      return null;
    }
    const data = await searchRes.json();
    const photo = data.results?.[0];
    if (!photo) return null;

    try {
      await fetch(`${photo.links.download_location}&client_id=${accessKey}`);
    } catch (err) {
      console.error('Unsplash download ping failed (non-fatal):', err);
    }

    return {
      url: photo.urls.regular,
      credit: `Photo by ${photo.user.name} on Unsplash (${photo.links.html})`,
    };
  } catch (err) {
    console.error('Unsplash fetch error:', err);
    return null;
  }
}

// Fallback when Unsplash has nothing good for a query — Pixabay's free tier
// (no attribution required by its Content License, kept here anyway for
// consistency with the Unsplash credit) covers the gap.
async function fetchPixabayPhoto(query: string, apiKey: string): Promise<UnsplashPhoto | null> {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`
    );
    if (!res.ok) {
      console.error('Pixabay search failed:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const hit = data.hits?.[0];
    if (!hit) return null;
    return { url: hit.largeImageURL, credit: `Photo by ${hit.user} on Pixabay` };
  } catch (err) {
    console.error('Pixabay fetch error:', err);
    return null;
  }
}

// A reliably attractive, recognizable shot of the destination itself beats a
// mediocre/irrelevant photo that's more narrowly "on topic" (e.g. a random
// plate of food) — skyline/landmark queries are what both providers do best,
// and Pixabay only gets tried if Unsplash has nothing.
async function fetchDestinationPhoto(city: string, unsplashKey?: string, pixabayKey?: string): Promise<UnsplashPhoto | null> {
  const query = `${city} skyline`;
  if (unsplashKey) {
    const photo = await fetchUnsplashPhoto(query, unsplashKey);
    if (photo) return photo;
  }
  if (pixabayKey) {
    const photo = await fetchPixabayPhoto(query, pixabayKey);
    if (photo) return photo;
  }
  return null;
}

// Pinterest is the highest-leverage passive distribution channel for a new
// travel-content domain: its own search surfaces content on relevance signals
// much faster than Google trusts a young domain. This is a fire-and-forget
// side effect of publishing — never let it block or fail the actual article
// publish, hence the try/catch swallowing everything and returning silently
// when the credentials/board aren't configured yet.
//
// Pinterest access tokens expire after 30 days and must be renewed via the
// refresh token — and Pinterest rotates the refresh token itself on every
// use (the old one stops working the moment a new one is issued). A static
// Supabase secret can't hold a value that changes every run, so the current
// refresh token lives in the pinterest_auth table instead, and this
// function persists the newly-issued one back to that table after each
// successful refresh — otherwise the *next* run's refresh call would fail
// with an already-consumed token.
async function publishToPinterest(
  supabase: any,
  clientId: string,
  clientSecret: string,
  boardId: string,
  params: { title: string; description: string; slug: string; basePath: 'destinations' | 'restaurants'; imageUrl: string | null }
): Promise<void> {
  if (!params.imageUrl) return; // Pinterest requires an image; skip silently if we have none
  try {
    const { data: authRow, error: authErr } = await supabase
      .from('pinterest_auth')
      .select('refresh_token')
      .eq('id', true)
      .single();
    if (authErr || !authRow) {
      console.error('Pinterest publish skipped: no stored refresh token (non-fatal):', authErr?.message);
      return;
    }

    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const tokenRes = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: authRow.refresh_token }),
    });
    if (!tokenRes.ok) {
      console.error('Pinterest token refresh failed (non-fatal):', tokenRes.status, await tokenRes.text());
      return;
    }
    const tokenData = await tokenRes.json();
    const accessToken: string | undefined = tokenData.access_token;
    const newRefreshToken: string | undefined = tokenData.refresh_token;
    if (!accessToken) {
      console.error('Pinterest token refresh returned no access_token (non-fatal)');
      return;
    }

    if (newRefreshToken && newRefreshToken !== authRow.refresh_token) {
      const { error: updateErr } = await supabase
        .from('pinterest_auth')
        .update({ refresh_token: newRefreshToken, updated_at: new Date().toISOString() })
        .eq('id', true);
      if (updateErr) console.error('Pinterest: failed to persist rotated refresh token (non-fatal):', updateErr.message);
    }

    const link = `https://www.allergy-free-travel.com/${params.basePath}/${params.slug}`;
    const res = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        title: params.title.slice(0, 100),
        description: params.description.slice(0, 500),
        link,
        media_source: { source_type: 'image_url', url: params.imageUrl },
      }),
    });
    if (!res.ok) {
      console.error('Pinterest pin creation failed (non-fatal):', res.status, await res.text());
    }
  } catch (err) {
    console.error('Pinterest publish error (non-fatal):', err);
  }
}

// Facebook Page + Instagram cross-posting is handled by the separate
// social-poster Edge Function (its own daily GitHub Action), which tracks
// posted_to_facebook_at/posted_to_instagram_at per article and works
// through any backlog — intentionally NOT duplicated here to avoid
// double-posting the same article once immediately and again from that
// backlog sweep.

// ==========================================
// STEP 1: Discover real hotels + real allergy evidence for a destination
// ==========================================
async function discoverHotels(supabase: any, apiKey: string, destination: { city: string; country: string }) {
  const query = `allergy friendly hotels in ${destination.city}`;
  const candidates = await textSearch(query, apiKey);

  const discovered: { hotelId: string; name: string; allergens: string[] }[] = [];
  let detailsFetched = 0;

  for (const candidate of candidates.slice(0, 60)) {
    if (detailsFetched >= 60) break;
    const details = await fetchDetails(candidate.place_id, apiKey);
    detailsFetched++;
    const reviews = details?.reviews || [];

    let best: ReviewSnippet | null = null;
    for (const review of reviews.slice(0, 5)) {
      const snip = classifyAndExtract(review.text || '');
      if (snip && (!best || snip.score > best.score)) best = snip;
    }
    if (!best) continue;

    const slug = slugifyHotel(candidate.name, destination.city);
    const allergyScore = Math.min(5, Math.max(1, Math.round(best.score * 5 * 10) / 10));

    const { data: hotelRow, error: hotelErr } = await supabase
      .from('hotels')
      .upsert({
        name: candidate.name,
        slug,
        city: destination.city,
        country: destination.country,
        address: candidate.formatted_address || null,
        website_url: details?.website || null,
        booking_url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${candidate.name} ${destination.city}`)}`,
        latitude: candidate.geometry?.location?.lat ?? null,
        longitude: candidate.geometry?.location?.lng ?? null,
        allergy_score: allergyScore,
        verified: false,
        active: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (hotelErr || !hotelRow) {
      console.log('hotels upsert error:', hotelErr?.message);
      continue;
    }

    await supabase.from('hotel_sources').insert({
      hotel_id: hotelRow.id,
      source_type: 'google',
      source_url: details?.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
      title: candidate.name,
      snippet: best.text,
      allergy_score: allergyScore,
      raw_text: best.text,
      ai_summary: null,
    });

    for (const allergen of best.allergens) {
      await supabase.from('hotel_allergy_info').upsert({
        hotel_id: hotelRow.id,
        allergen_type: allergen,
        support_level: 'on_request',
        notes: best.text,
        source_url: details?.url || null,
      }, { onConflict: 'hotel_id,allergen_type' });
    }

    discovered.push({ hotelId: hotelRow.id, name: candidate.name, allergens: best.allergens });
  }

  return { candidatesFound: candidates.length, discovered };
}

// Same real-evidence-only discovery as discoverHotels, pointed at
// restaurants instead of lodging. Deliberately not merged into one generic
// function — the two write to different tables with different columns
// (cuisine_type vs stars/hotel_chain), and keeping them separate is easier
// to follow than a shared function branching on every table/column name.
async function discoverRestaurants(supabase: any, apiKey: string, destination: { city: string; country: string }) {
  const query = `allergy friendly restaurants in ${destination.city}`;
  const candidates = await textSearch(query, apiKey, 'restaurant');

  const discovered: { restaurantId: string; name: string; allergens: string[] }[] = [];
  let detailsFetched = 0;

  for (const candidate of candidates.slice(0, 60)) {
    if (detailsFetched >= 60) break;
    const details = await fetchDetails(candidate.place_id, apiKey);
    detailsFetched++;
    const reviews = details?.reviews || [];

    let best: ReviewSnippet | null = null;
    for (const review of reviews.slice(0, 5)) {
      const snip = classifyAndExtract(review.text || '');
      if (snip && (!best || snip.score > best.score)) best = snip;
    }
    if (!best) continue;

    const slug = slugifyHotel(candidate.name, destination.city);
    const allergyScore = Math.min(5, Math.max(1, Math.round(best.score * 5 * 10) / 10));

    const { data: restaurantRow, error: restaurantErr } = await supabase
      .from('restaurants')
      .upsert({
        name: candidate.name,
        slug,
        city: destination.city,
        country: destination.country,
        address: candidate.formatted_address || null,
        website_url: details?.website || null,
        latitude: candidate.geometry?.location?.lat ?? null,
        longitude: candidate.geometry?.location?.lng ?? null,
        allergy_score: allergyScore,
        verified: false,
        active: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (restaurantErr || !restaurantRow) {
      console.log('restaurants upsert error:', restaurantErr?.message);
      continue;
    }

    await supabase.from('restaurant_sources').insert({
      restaurant_id: restaurantRow.id,
      source_type: 'google',
      source_url: details?.url || `https://www.google.com/maps/place/?q=place_id:${candidate.place_id}`,
      title: candidate.name,
      snippet: best.text,
      allergy_score: allergyScore,
      raw_text: best.text,
      ai_summary: null,
    });

    for (const allergen of best.allergens) {
      await supabase.from('restaurant_allergy_info').upsert({
        restaurant_id: restaurantRow.id,
        allergen_type: allergen,
        support_level: 'on_request',
        notes: best.text,
        source_url: details?.url || null,
      }, { onConflict: 'restaurant_id,allergen_type' });
    }

    discovered.push({ restaurantId: restaurantRow.id, name: candidate.name, allergens: best.allergens });
  }

  return { candidatesFound: candidates.length, discovered };
}

// ==========================================
// STEP 2: Write an SEO article grounded ONLY in the real evidence just discovered
// ==========================================
async function generateArticle(openaiKey: string, destination: { city: string; country: string }, hotelIds: string[], supabase: any) {
  const { data: sources } = await supabase
    .from('hotel_sources')
    .select('hotel_id, snippet, raw_text, source_url, hotels(name, address, website_url, booking_url)')
    .in('hotel_id', hotelIds)
    .eq('source_type', 'google');

  if (!sources || sources.length === 0) return { article: null, errorDetail: 'No hotel_sources rows found for discovered hotel IDs' };

  const allowedNames: string[] = sources.map((s: any) => s.hotels?.name).filter(Boolean);
  const evidenceBlock = sources.map((s: any, i: number) =>
    `Hotel ${i + 1}: ${s.hotels?.name}\nAddress: ${s.hotels?.address || 'N/A'}\nReal Google review excerpt: "${s.raw_text}"`
  ).join('\n\n');
  const allowedNamesList = allowedNames.map((n, i) => `${i + 1}. ${n}`).join('\n');

  const prompt = `You are writing a factual travel guide article for a food-allergy travel website. You may ONLY use the real hotels and real review excerpts provided below — do not invent hotels, quotes, or reviewer names. Do not attribute quotes to specific reviewer names (say "one guest wrote" instead).

THE ONLY HOTELS YOU ARE ALLOWED TO NAME ANYWHERE IN THIS ARTICLE (including the introduction and conclusion — do not name any other hotel, even a real, famous one you know from training data):
${allowedNamesList}

Destination: ${destination.city}, ${destination.country}

Real evidence (from actual Google reviews):
${evidenceBlock}

Write a JSON object with this exact shape, no markdown fences:
{
  "title": "SEO title 55-65 chars mentioning ${destination.city} and food allergies",
  "slug": "lowercase-hyphenated-slug",
  "meta_description": "150-160 char meta description",
  "focus_keyword": "primary keyword phrase",
  "related_keywords": ["keyword1", "keyword2", "keyword3"],
  "content_markdown": "full article in Markdown, 500-800 words: intro, a section per hotel referencing its real review excerpt (paraphrase or quote it directly, never invent new claims beyond what the excerpt supports), a short practical tips section, and a conclusion. The conclusion must only reference hotels from the allowed list above.",
  "hotels_mentioned": ["every hotel name you named anywhere in content_markdown, including the conclusion — must be an exact or near-exact match to names from the allowed list above"]
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${openaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const bodyText = await res.text();
    console.error('OpenAI API error:', res.status, bodyText);
    return { article: null, errorDetail: `OpenAI API ${res.status}: ${bodyText.slice(0, 300)}` };
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "";
  let article: any;
  try {
    article = JSON.parse(raw.replace(/```json\s*/g, '').replace(/```\s*/g, ''));
  } catch (e) {
    console.error('Failed to parse article JSON:', e, raw.slice(0, 300));
    return { article: null, errorDetail: `JSON parse failed: ${String(e)}. Raw: ${raw.slice(0, 300)}` };
  }

  // Safety net: the model self-reports every hotel name it used (including in the
  // conclusion, where fabrication has actually happened in practice — it named a real
  // but unrelated hotel that was never in the evidence). Reject rather than publish
  // if any self-reported name doesn't match one we actually provided.
  const normalizeName = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const normalizedAllowed = allowedNames.map(normalizeName);
  const mentioned: string[] = Array.isArray(article.hotels_mentioned) ? article.hotels_mentioned : [];
  const unrecognized = mentioned.filter((m) => {
    const norm = normalizeName(String(m));
    return !normalizedAllowed.some((allowed) => norm.includes(allowed) || allowed.includes(norm));
  });

  if (unrecognized.length > 0) {
    console.error('Fabricated hotel names detected:', unrecognized, 'allowed:', allowedNames);
    return { article: null, errorDetail: `Rejected: article mentioned hotel(s) not in the real evidence list: ${unrecognized.join(', ')}` };
  }

  return { article, errorDetail: null };
}

// Same real-evidence-only article generation as generateArticle, restaurant-flavored.
async function generateRestaurantArticle(openaiKey: string, destination: { city: string; country: string }, restaurantIds: string[], supabase: any) {
  const { data: sources } = await supabase
    .from('restaurant_sources')
    .select('restaurant_id, snippet, raw_text, source_url, restaurants(name, address, website_url, booking_url)')
    .in('restaurant_id', restaurantIds)
    .eq('source_type', 'google');

  if (!sources || sources.length === 0) return { article: null, errorDetail: 'No restaurant_sources rows found for discovered restaurant IDs' };

  const allowedNames: string[] = sources.map((s: any) => s.restaurants?.name).filter(Boolean);
  const evidenceBlock = sources.map((s: any, i: number) =>
    `Restaurant ${i + 1}: ${s.restaurants?.name}\nAddress: ${s.restaurants?.address || 'N/A'}\nReal Google review excerpt: "${s.raw_text}"`
  ).join('\n\n');
  const allowedNamesList = allowedNames.map((n, i) => `${i + 1}. ${n}`).join('\n');

  const prompt = `You are writing a factual travel guide article for a food-allergy travel website. You may ONLY use the real restaurants and real review excerpts provided below — do not invent restaurants, quotes, or reviewer names. Do not attribute quotes to specific reviewer names (say "one guest wrote" instead).

THE ONLY RESTAURANTS YOU ARE ALLOWED TO NAME ANYWHERE IN THIS ARTICLE (including the introduction and conclusion — do not name any other restaurant, even a real, famous one you know from training data):
${allowedNamesList}

Destination: ${destination.city}, ${destination.country}

Real evidence (from actual Google reviews):
${evidenceBlock}

Write a JSON object with this exact shape, no markdown fences:
{
  "title": "SEO title 55-65 chars mentioning ${destination.city} and food allergies",
  "slug": "lowercase-hyphenated-slug",
  "meta_description": "150-160 char meta description",
  "focus_keyword": "primary keyword phrase",
  "related_keywords": ["keyword1", "keyword2", "keyword3"],
  "content_markdown": "full article in Markdown, 500-800 words: intro, a section per restaurant referencing its real review excerpt (paraphrase or quote it directly, never invent new claims beyond what the excerpt supports), a short practical tips section, and a conclusion. The conclusion must only reference restaurants from the allowed list above.",
  "restaurants_mentioned": ["every restaurant name you named anywhere in content_markdown, including the conclusion — must be an exact or near-exact match to names from the allowed list above"]
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${openaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const bodyText = await res.text();
    console.error('OpenAI API error:', res.status, bodyText);
    return { article: null, errorDetail: `OpenAI API ${res.status}: ${bodyText.slice(0, 300)}` };
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "";
  let article: any;
  try {
    article = JSON.parse(raw.replace(/```json\s*/g, '').replace(/```\s*/g, ''));
  } catch (e) {
    console.error('Failed to parse article JSON:', e, raw.slice(0, 300));
    return { article: null, errorDetail: `JSON parse failed: ${String(e)}. Raw: ${raw.slice(0, 300)}` };
  }

  const normalizeName = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const normalizedAllowed = allowedNames.map(normalizeName);
  const mentioned: string[] = Array.isArray(article.restaurants_mentioned) ? article.restaurants_mentioned : [];
  const unrecognized = mentioned.filter((m) => {
    const norm = normalizeName(String(m));
    return !normalizedAllowed.some((allowed) => norm.includes(allowed) || allowed.includes(norm));
  });

  if (unrecognized.length > 0) {
    console.error('Fabricated restaurant names detected:', unrecognized, 'allowed:', allowedNames);
    return { article: null, errorDetail: `Rejected: article mentioned restaurant(s) not in the real evidence list: ${unrecognized.join(', ')}` };
  }

  return { article, errorDetail: null };
}

// ==========================================
// MAIN HANDLER
// ==========================================
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  // This function makes paid API calls (Google Maps, OpenAI) and writes to
  // production tables — it's meant to be triggered only by the scheduled
  // GitHub Action, not by anyone who finds the URL. verify_jwt is off because
  // the workflow authenticates with the public anon key (committed in .env,
  // bundled into every visitor's browser), which doesn't gate access at all,
  // so this checks a separate shared secret the workflow sends explicitly.
  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const unsplashKey = Deno.env.get('UNSPLASH_ACCESS_KEY');
  const pinterestClientId = Deno.env.get('PINTEREST_CLIENT_ID');
  const pinterestClientSecret = Deno.env.get('PINTEREST_CLIENT_SECRET');
  const pinterestBoardId = Deno.env.get('PINTEREST_BOARD_ID');
  const pixabayKey = Deno.env.get('PIXABAY_API_KEY');

  if (!supabaseUrl || !supabaseKey || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing required environment configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Optional manual override (e.g. { "city": "Dublin", "country": "Ireland",
    // "contentType": "restaurant" }) to re-check a specific destination on
    // demand instead of following the rotation — used for re-verifying a
    // destination that already has hotels/restaurants or an article.
    let destination: { city: string; country: string } | undefined;
    let manualOverride = false;
    let contentType: 'hotel' | 'restaurant' = 'hotel';
    let contentTypeOverride = false;
    try {
      const body = await req.json();
      if (body?.city && body?.country) { destination = { city: body.city, country: body.country }; manualOverride = true; }
      if (body?.contentType === 'restaurant' || body?.contentType === 'hotel') { contentType = body.contentType; contentTypeOverride = true; }
    } catch {
      // no/invalid JSON body — fall through to the normal rotation
    }

    // Alternates hotel/restaurant runs (rather than doing both every run) to
    // keep the combined content velocity roughly where it was before
    // restaurants existed, instead of doubling the Google Places/OpenAI
    // spend on every single run. Skipped when the caller explicitly asked
    // for a specific contentType (e.g. testing/backfilling one type).
    if (!contentTypeOverride) {
      const [{ count: hotelRunCount }, { count: restaurantRunCount }] = await Promise.all([
        supabase.from('pipeline_log').select('*', { count: 'exact', head: true }).eq('run_type', 'hotel_discovery'),
        supabase.from('pipeline_log').select('*', { count: 'exact', head: true }).eq('run_type', 'restaurant_discovery'),
      ]);
      contentType = ((hotelRunCount || 0) + (restaurantRunCount || 0)) % 2 === 0 ? 'hotel' : 'restaurant';
    }

    const discoveryRunType = contentType === 'hotel' ? 'hotel_discovery' : 'restaurant_discovery';

    let baseCount = 0;
    if (!manualOverride) {
      const { count } = await supabase
        .from('pipeline_log')
        .select('*', { count: 'exact', head: true })
        .eq('run_type', discoveryRunType);
      baseCount = count || 0;
    }

    // A single city with zero allergy-relevant reviews on a given day
    // shouldn't mean skipping this run's article entirely — try the next
    // city in rotation instead, up to a bounded number of attempts (manual
    // overrides stay single-shot: the caller asked for that one city).
    const MAX_ATTEMPTS = manualOverride ? 1 : 5;
    const attemptedDestinations: string[] = [];
    let discovery: Awaited<ReturnType<typeof discoverHotels>> | Awaited<ReturnType<typeof discoverRestaurants>> | undefined;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      if (!manualOverride) {
        destination = DESTINATIONS[(baseCount + attempt) % DESTINATIONS.length];
      }
      console.log(`Pipeline run — ${contentType} — destination: ${destination!.city}, ${destination!.country} (attempt ${attempt + 1}/${MAX_ATTEMPTS})`);
      attemptedDestinations.push(`${destination!.city}, ${destination!.country}`);

      const { data: discoveryLog } = await supabase
        .from('pipeline_log')
        .insert({ run_type: discoveryRunType, status: 'running' })
        .select('id')
        .single();

      try {
        discovery = contentType === 'hotel'
          ? await discoverHotels(supabase, apiKey, destination!)
          : await discoverRestaurants(supabase, apiKey, destination!);
        await supabase.from('pipeline_log').update({
          status: 'success',
          hotels_found: discovery.candidatesFound,
          hotels_added: discovery.discovered.length,
          finished_at: new Date().toISOString(),
        }).eq('id', discoveryLog.id);
      } catch (err) {
        await supabase.from('pipeline_log').update({
          status: 'error', error_message: String(err), finished_at: new Date().toISOString(),
        }).eq('id', discoveryLog.id);
        throw err;
      }

      if (discovery.discovered.length >= 1) break;
    }
    discovery = discovery!;

    let articleResult: any = null;

    if (contentType === 'hotel' && discovery.discovered.length >= 1) {
      const newHotelIds = (discovery.discovered as { hotelId: string }[]).map(d => d.hotelId);

      // Does a published article already cover this destination? Detected by
      // checking whether any published article's hotel_ids overlaps with any
      // hotel we've ever recorded for this city — not just this run's finds,
      // since a previous run may have discovered a different subset.
      const { data: cityHotels } = await supabase.from('hotels').select('id').eq('city', destination.city);
      const cityHotelIds = (cityHotels || []).map((h: any) => h.id);

      let existingArticle: { id: string; slug: string; title: string; hotel_ids: string[] } | null = null;
      if (cityHotelIds.length > 0) {
        const { data: existing } = await supabase
          .from('seo_articles')
          .select('id, slug, title, hotel_ids')
          .eq('status', 'published')
          .eq('content_type', 'hotel')
          .overlaps('hotel_ids', cityHotelIds)
          .limit(1)
          .maybeSingle();
        existingArticle = existing;
      }

      if (existingArticle) {
        // Real hotels the automated classifier has already surfaced evidence
        // for exist on this page — add any newly-discovered ones to the same
        // article's hotel_ids rather than writing a second, separate article
        // for the same city. The article page renders hotel cards live from
        // hotel_ids (real name/address/review/allergy-score each time), so
        // this alone is enough for the new hotel to appear with real evidence
        // — no need to regenerate the AI-written prose.
        const mergedHotelIds = [...new Set([...(existingArticle.hotel_ids || []), ...newHotelIds])];
        const addedCount = mergedHotelIds.length - (existingArticle.hotel_ids || []).length;

        if (addedCount > 0) {
          const { error: updateErr } = await supabase
            .from('seo_articles')
            .update({ hotel_ids: mergedHotelIds, updated_at: new Date().toISOString() })
            .eq('id', existingArticle.id);

          await supabase.from('pipeline_log').insert({
            run_type: 'content_generation',
            status: updateErr ? 'error' : 'success',
            articles_updated: updateErr ? 0 : 1,
            error_message: updateErr ? updateErr.message : null,
            finished_at: new Date().toISOString(),
          });

          if (!updateErr) articleResult = { slug: existingArticle.slug, title: existingArticle.title, updated: true, hotelsAdded: addedCount };
        } else {
          console.log(`No new hotels for existing article "${existingArticle.slug}" — all ${newHotelIds.length} discovered hotel(s) already linked.`);
        }
      } else if (openaiKey) {
      const { data: contentLog } = await supabase
        .from('pipeline_log')
        .insert({ run_type: 'content_generation', status: 'running' })
        .select('id')
        .single();

      try {
        const hotelIds = newHotelIds;
        const { article, errorDetail } = await generateArticle(openaiKey, destination, hotelIds, supabase);

        if (article?.slug && article?.content_markdown) {
          const wordCount = article.content_markdown.split(/\s+/).length;

          let heroImageUrl: string | null = null;
          let heroImageCredit: string | null = null;
          const photo = await fetchDestinationPhoto(destination.city, unsplashKey, pixabayKey);
          if (photo) {
            heroImageUrl = photo.url;
            heroImageCredit = photo.credit;
          }

          const { error: insertErr } = await supabase.from('seo_articles').upsert({
            title: article.title,
            slug: article.slug,
            meta_description: article.meta_description,
            focus_keyword: article.focus_keyword,
            related_keywords: article.related_keywords || [],
            content_markdown: article.content_markdown,
            content_type: 'hotel',
            hotel_ids: hotelIds,
            word_count: wordCount,
            status: 'published',
            ai_generated: true,
            hero_image_url: heroImageUrl,
            hero_image_credit: heroImageCredit,
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'slug' });

          if (insertErr) throw insertErr;
          articleResult = { slug: article.slug, title: article.title };

          if (pinterestClientId && pinterestClientSecret && pinterestBoardId) {
            await publishToPinterest(supabase, pinterestClientId, pinterestClientSecret, pinterestBoardId, {
              title: article.title,
              description: article.meta_description,
              slug: article.slug,
              basePath: 'destinations',
              imageUrl: heroImageUrl,
            });
          }

          await supabase.from('pipeline_log').update({
            status: 'success', articles_created: 1, finished_at: new Date().toISOString(),
          }).eq('id', contentLog.id);
        } else {
          await supabase.from('pipeline_log').update({
            status: 'error', error_message: errorDetail || 'AI did not return a valid article', finished_at: new Date().toISOString(),
          }).eq('id', contentLog.id);
        }
      } catch (err) {
        await supabase.from('pipeline_log').update({
          status: 'error', error_message: String(err), finished_at: new Date().toISOString(),
        }).eq('id', contentLog.id);
      }
      }
    } else if (contentType === 'restaurant' && discovery.discovered.length >= 1) {
      const newRestaurantIds = (discovery.discovered as { restaurantId: string }[]).map(d => d.restaurantId);

      const { data: cityRestaurants } = await supabase.from('restaurants').select('id').eq('city', destination.city);
      const cityRestaurantIds = (cityRestaurants || []).map((r: any) => r.id);

      let existingArticle: { id: string; slug: string; title: string; restaurant_ids: string[] } | null = null;
      if (cityRestaurantIds.length > 0) {
        const { data: existing } = await supabase
          .from('seo_articles')
          .select('id, slug, title, restaurant_ids')
          .eq('status', 'published')
          .eq('content_type', 'restaurant')
          .overlaps('restaurant_ids', cityRestaurantIds)
          .limit(1)
          .maybeSingle();
        existingArticle = existing;
      }

      if (existingArticle) {
        const mergedRestaurantIds = [...new Set([...(existingArticle.restaurant_ids || []), ...newRestaurantIds])];
        const addedCount = mergedRestaurantIds.length - (existingArticle.restaurant_ids || []).length;

        if (addedCount > 0) {
          const { error: updateErr } = await supabase
            .from('seo_articles')
            .update({ restaurant_ids: mergedRestaurantIds, updated_at: new Date().toISOString() })
            .eq('id', existingArticle.id);

          await supabase.from('pipeline_log').insert({
            run_type: 'content_generation',
            status: updateErr ? 'error' : 'success',
            articles_updated: updateErr ? 0 : 1,
            error_message: updateErr ? updateErr.message : null,
            finished_at: new Date().toISOString(),
          });

          if (!updateErr) articleResult = { slug: existingArticle.slug, title: existingArticle.title, updated: true, restaurantsAdded: addedCount };
        } else {
          console.log(`No new restaurants for existing article "${existingArticle.slug}" — all ${newRestaurantIds.length} discovered restaurant(s) already linked.`);
        }
      } else if (openaiKey) {
        const { data: contentLog } = await supabase
          .from('pipeline_log')
          .insert({ run_type: 'content_generation', status: 'running' })
          .select('id')
          .single();

        try {
          const restaurantIds = newRestaurantIds;
          const { article, errorDetail } = await generateRestaurantArticle(openaiKey, destination, restaurantIds, supabase);

          if (article?.slug && article?.content_markdown) {
            const wordCount = article.content_markdown.split(/\s+/).length;

            let heroImageUrl: string | null = null;
            let heroImageCredit: string | null = null;
            const photo = await fetchDestinationPhoto(destination.city, unsplashKey, pixabayKey);
            if (photo) {
              heroImageUrl = photo.url;
              heroImageCredit = photo.credit;
            }

            const { error: insertErr } = await supabase.from('seo_articles').upsert({
              title: article.title,
              slug: article.slug,
              meta_description: article.meta_description,
              focus_keyword: article.focus_keyword,
              related_keywords: article.related_keywords || [],
              content_markdown: article.content_markdown,
              content_type: 'restaurant',
              restaurant_ids: restaurantIds,
              word_count: wordCount,
              status: 'published',
              ai_generated: true,
              hero_image_url: heroImageUrl,
              hero_image_credit: heroImageCredit,
              published_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, { onConflict: 'slug' });

            if (insertErr) throw insertErr;
            articleResult = { slug: article.slug, title: article.title };

            if (pinterestClientId && pinterestClientSecret && pinterestBoardId) {
              await publishToPinterest(supabase, pinterestClientId, pinterestClientSecret, pinterestBoardId, {
                title: article.title,
                description: article.meta_description,
                slug: article.slug,
                basePath: 'restaurants',
                imageUrl: heroImageUrl,
              });
            }

            await supabase.from('pipeline_log').update({
              status: 'success', articles_created: 1, finished_at: new Date().toISOString(),
            }).eq('id', contentLog.id);
          } else {
            await supabase.from('pipeline_log').update({
              status: 'error', error_message: errorDetail || 'AI did not return a valid article', finished_at: new Date().toISOString(),
            }).eq('id', contentLog.id);
          }
        } catch (err) {
          await supabase.from('pipeline_log').update({
            status: 'error', error_message: String(err), finished_at: new Date().toISOString(),
          }).eq('id', contentLog.id);
        }
      }
    }

    return new Response(JSON.stringify({
      contentType,
      destination: `${destination!.city}, ${destination!.country}`,
      attemptedDestinations,
      hotelsFound: discovery.candidatesFound,
      hotelsWithEvidence: discovery.discovered.length,
      article: articleResult,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Pipeline error:', error);
    return new Response(JSON.stringify({ error: 'Pipeline run failed', message: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
