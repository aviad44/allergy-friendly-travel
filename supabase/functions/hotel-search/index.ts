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
        model: "gpt-4.1-2025-04-14",
        messages: [
          {
            role: "system",
            content: `You are an expert travel advisor specializing in allergy-friendly accommodations. You provide ONLY real, verified hotels that are known for their excellent allergy accommodation services.

CRITICAL REQUIREMENTS:
- Only recommend REAL hotels that exist and have verified allergy-friendly services
- Focus on hotels with dedicated allergy protocols, trained staff, and safe food preparation
- Rate safety from 1-10 based on actual allergy accommodation quality
- Include specific reasons why each hotel is safe for the mentioned allergies
- Include full address and direct booking links
- ONLY include REAL, AUTHENTIC guest reviews from actual review platforms (TripAdvisor, Booking.com, Google Reviews, etc.)
- If you cannot find real guest reviews about allergy safety, leave the guest_reviews array empty - DO NOT create fictional reviews

Response format MUST be a JSON array of hotel objects with this exact structure:
{
  "results": [
    {
      "hotel_name": "Exact hotel name",
      "city": "City name",
      "country": "Country name",
      "address": "Full street address with postal code",
      "summary": "Brief description focusing on allergy safety",
      "safety_score": 8,
      "reasons": ["Specific reason 1", "Specific reason 2"],
      "booking_url": "https://direct-booking-link.com",
      "guest_reviews": [
        {"text": "Authentic guest quote about allergy safety", "author": "Guest name", "source": "Review platform"}
      ]
    }
  ]
}`
          },
          {
            role: "user", 
            content: `Find 5-7 REAL allergy-friendly hotels in ${destination} that safely accommodate guests with ${allergiesText} allergies. 

REQUIREMENTS:
- Only real, existing hotels with verified names and addresses
- Full street addresses with postal codes
- Direct booking URLs (hotel websites or Booking.com/Expedia)
- At least 1-2 authentic guest reviews about allergy safety
- Specific allergy accommodation features

For each hotel provide ALL required fields:
- hotel_name: Real hotel name
- city: City name
- country: Country name  
- address: Complete street address with postal code
- summary: Brief allergy safety description
- safety_score: Number 1-10
- reasons: Array of 2-3 specific safety reasons
- booking_url: Direct booking link (hotel website preferred)
- guest_reviews: Array with text, author, source

Focus on hotels with proven track records, trained staff, and dedicated allergy protocols.`
          }
        ],
        max_completion_tokens: 2000,
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

    // Validate and filter results
    const validResults = (hotelResults.results || []).filter(hotel => 
      hotel.hotel_name && 
      hotel.hotel_name.trim().length > 3 &&
      !hotel.hotel_name.toLowerCase().includes('not found') &&
      !hotel.hotel_name.toLowerCase().includes('n/a') &&
      !hotel.hotel_name.toLowerCase().includes('unknown')
    );

    console.log(`✅ Returning ${validResults.length} valid hotels`);

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