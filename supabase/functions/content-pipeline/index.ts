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
];

// ==========================================
// ALLERGY KEYWORD LISTS — same matcher as hotel-search/restaurants-search
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

  const allMatched = [...new Set([...strictMatches, ...weakMatches, ...safetyMatches, ...warningMatches])];

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

async function textSearch(query: string, apiKey: string): Promise<any[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=lodging&language=en&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`Text Search failed: ${data.status}`);
    return [];
  }
  return data.results || [];
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

// ==========================================
// STEP 1: Discover real hotels + real allergy evidence for a destination
// ==========================================
async function discoverHotels(supabase: any, apiKey: string, destination: { city: string; country: string }) {
  const query = `allergy friendly hotels in ${destination.city}`;
  const candidates = await textSearch(query, apiKey);

  const discovered: { hotelId: string; name: string; allergens: string[] }[] = [];
  let detailsFetched = 0;

  for (const candidate of candidates.slice(0, 20)) {
    if (detailsFetched >= 20) break;
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

  if (!supabaseUrl || !supabaseKey || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing required environment configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { count } = await supabase
      .from('pipeline_log')
      .select('*', { count: 'exact', head: true })
      .eq('run_type', 'hotel_discovery');

    const destination = DESTINATIONS[(count || 0) % DESTINATIONS.length];
    console.log(`Pipeline run — destination: ${destination.city}, ${destination.country}`);

    const { data: discoveryLog } = await supabase
      .from('pipeline_log')
      .insert({ run_type: 'hotel_discovery', status: 'running' })
      .select('id')
      .single();

    let discovery;
    try {
      discovery = await discoverHotels(supabase, apiKey, destination);
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

    let articleResult: any = null;
    if (discovery.discovered.length >= 1 && openaiKey) {
      const { data: contentLog } = await supabase
        .from('pipeline_log')
        .insert({ run_type: 'content_generation', status: 'running' })
        .select('id')
        .single();

      try {
        const hotelIds = discovery.discovered.map(d => d.hotelId);
        const { article, errorDetail } = await generateArticle(openaiKey, destination, hotelIds, supabase);

        if (article?.slug && article?.content_markdown) {
          const wordCount = article.content_markdown.split(/\s+/).length;

          let heroImageUrl: string | null = null;
          let heroImageCredit: string | null = null;
          if (unsplashKey) {
            const photo = await fetchUnsplashPhoto(`${destination.city} travel`, unsplashKey);
            if (photo) {
              heroImageUrl = photo.url;
              heroImageCredit = photo.credit;
            }
          }

          const { error: insertErr } = await supabase.from('seo_articles').upsert({
            title: article.title,
            slug: article.slug,
            meta_description: article.meta_description,
            focus_keyword: article.focus_keyword,
            related_keywords: article.related_keywords || [],
            content_markdown: article.content_markdown,
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

    return new Response(JSON.stringify({
      destination: `${destination.city}, ${destination.country}`,
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
