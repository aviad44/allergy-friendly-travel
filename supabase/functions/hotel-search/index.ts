import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
};

serve(async (req) => {
  console.log('🏨 Hotel Search Function started');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('📨 Request data:', requestData);
    
    const { destination, allergies } = requestData;
    
    if (!destination || !allergies) {
      return new Response(JSON.stringify({ 
        error: "Missing destination or allergies data"
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: "OpenAI API key not configured"
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const allergiesText = Array.isArray(allergies) ? allergies.join(', ') : allergies;
    
    console.log('🤖 Making OpenAI request for:', destination, 'with allergies:', allergiesText);
    
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an expert travel advisor specializing in allergy-friendly accommodations.

Return a JSON object with a "results" array containing 5-7 real hotels.

IMPORTANT: Return ONLY valid JSON, no markdown, no explanations.

Each hotel object must have:
- hotel_name: string (real hotel name)
- city: string
- country: string
- address: string (full address with postal code)
- summary: string (brief allergy safety description)
- safety_score: number (1-10)
- reasons: string[] (2-3 specific safety reasons)
- booking_url: string (hotel website or Booking.com link)
- guest_reviews: array of {text: string, author: string, source: string}

Example response:
{
  "results": [
    {
      "hotel_name": "Hotel Example",
      "city": "Paris",
      "country": "France",
      "address": "123 Rue Example, 75001 Paris",
      "summary": "Excellent allergy protocols with trained staff",
      "safety_score": 9,
      "reasons": ["Dedicated allergy-free kitchen", "Staff trained in allergen handling"],
      "booking_url": "https://www.booking.com/hotel/example",
      "guest_reviews": [{"text": "Great for allergies!", "author": "Guest", "source": "TripAdvisor"}]
    }
  ]
}`
          },
          {
            role: "user", 
            content: `Find 5-7 REAL allergy-friendly hotels in ${destination} for guests with ${allergiesText} allergies. Return only the JSON object with results array.`
          }
        ],
        max_tokens: 2500,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.log('❌ OpenAI API error:', errorData);
      return new Response(JSON.stringify({ 
        error: "Failed to get hotel recommendations",
        details: errorData.error?.message || "Unknown error"
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData.choices?.[0]?.message?.content || "";
    
    console.log('✅ OpenAI response received, length:', content.length);
    console.log('📝 Content preview:', content.substring(0, 200));

    // Parse the JSON response from OpenAI
    let hotelResults;
    try {
      // First try to parse directly
      hotelResults = JSON.parse(content);
    } catch (parseError) {
      console.error('❌ Failed to parse OpenAI JSON response:', parseError);
      
      // Try to extract JSON from markdown code blocks
      let cleanContent = content;
      
      // Remove markdown code block markers
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Try to find JSON object
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          hotelResults = JSON.parse(jsonMatch[0]);
          console.log('✅ Successfully parsed JSON after cleaning markdown');
        } catch (secondParseError) {
          console.error('❌ Fallback JSON parse also failed:', secondParseError);
          console.log('📝 Raw content that failed to parse:', content.substring(0, 500));
          return new Response(JSON.stringify({ 
            error: "Failed to parse hotel data",
            raw_content: content.substring(0, 500)
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        console.error('❌ No valid JSON object found in response');
        console.log('📝 Raw content:', content.substring(0, 500));
        return new Response(JSON.stringify({ 
          error: "No valid JSON found in response",
          raw_content: content.substring(0, 500)
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Validate and filter results - handle both array and object with results property
    const hotelsArray = Array.isArray(hotelResults) ? hotelResults : (hotelResults.results || []);
    const validResults = hotelsArray.filter(hotel => 
      hotel.hotel_name && 
      hotel.hotel_name.trim().length > 3 &&
      !hotel.hotel_name.toLowerCase().includes('not found') &&
      !hotel.hotel_name.toLowerCase().includes('n/a') &&
      !hotel.hotel_name.toLowerCase().includes('unknown')
    );

    console.log(`✅ Returning ${validResults.length} valid hotels out of ${hotelsArray.length} total`);

    return new Response(JSON.stringify({ 
      results: validResults,
      total: validResults.length
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Hotel search function error:', error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      message: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});