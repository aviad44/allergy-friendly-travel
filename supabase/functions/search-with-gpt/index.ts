import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    // Parse request body
    const { destination, allergies } = await req.json();
    console.log('✅ Processing search request for:', { destination, allergies });

    // Optimized request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini-2025-04-14', // Fastest model for quick responses
        messages: [
          {
            role: 'system',
            content: `You are a travel assistant specializing in allergy-friendly hotels worldwide.
            
            REQUIREMENTS:
            - Find 8-10 REAL hotels that accommodate the specified allergies in the requested destination
            - Include budget, mid-range, and luxury options when possible
            - Only provide EXISTING hotels with verified allergy-friendly features
            - If destination is not in English, search by both local and English names
            - For destinations like Israel/ישראל, search Tel Aviv, Jerusalem, and other major cities
            
            FORMAT (EXACT):
            
            ## 1. [Hotel Name] ⭐⭐⭐⭐
            
            📍 [City, Country]
            
            🌟 Allergy-friendly features for [allergy type]:
            - [Feature 1]
            - [Feature 2] 
            - [Feature 3]
            
            💬 Guest Review: "[Guest review about allergy experience]"
            
            💰 Price Range: [Budget/Mid-Range/Luxury]
            
            🔗 [Booking URL or hotel website]
            
            ---
            
            IMPORTANT: Always find hotels even for less common destinations. Research thoroughly.`
          },
          {
            role: 'user',
            content: `Find 8-10 allergy-friendly hotels in ${destination} that accommodate guests with ${allergies} allergies.`
          },
        ],
        temperature: 0.3,
        max_tokens: 1200, // Reduced for faster responses
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ Received response from OpenAI');
    
    // Process the response
    let processedResponse = data.choices[0].message.content;
    processedResponse = processedResponse
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
      .trim();
    
    return new Response(
      JSON.stringify({ 
        recommendation: processedResponse,
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in search-with-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined,
        status: "error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});