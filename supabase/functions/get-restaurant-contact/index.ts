import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Daily quota guard
const DAILY_CONTACT_QUOTA = 200;
let dailyContactCount = 0;
let quotaResetDate = new Date().toDateString();

function checkAndIncrementQuota(): boolean {
  const today = new Date().toDateString();
  if (today !== quotaResetDate) {
    quotaResetDate = today;
    dailyContactCount = 0;
  }
  if (dailyContactCount >= DAILY_CONTACT_QUOTA) {
    console.log(`⚠️ Daily contact quota exceeded: ${dailyContactCount}/${DAILY_CONTACT_QUOTA}`);
    return false;
  }
  dailyContactCount++;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeId } = await req.json();
    
    console.log('📞 Contact details request for:', placeId);

    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'placeId is required' }),
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

    if (!checkAndIncrementQuota()) {
      return new Response(
        JSON.stringify({ error: 'Daily quota exceeded. Please try again tomorrow.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch ONLY contact fields
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,international_phone_number,opening_hours&key=${apiKey}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.result) {
      console.log(`⚠️ Contact details failed for ${placeId}: ${data.status}`);
      return new Response(
        JSON.stringify({ error: 'Could not fetch contact details' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const result = {
      placeId,
      website: data.result.website || null,
      phone: data.result.international_phone_number || null,
      openNow: data.result.opening_hours?.open_now ?? null
    };
    
    console.log('✅ Contact details fetched:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Contact details error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while fetching contact details' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
