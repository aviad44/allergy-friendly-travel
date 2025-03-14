
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

    // Send request to OpenAI API with your custom GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using the more powerful model for better results
        messages: [
          {
            role: 'system',
            content: `You are a specialized travel assistant focusing on allergy-friendly hotels. 
            You're responding with information from the custom GPT "Allergy-Friendly Hotel Finder" (g-bh3vfRFNv).
            
            Format your response as a list where each hotel entry includes:
            - Hotel name
            - Key allergy accommodations they provide
            - Special dietary considerations they address
            - Authentic guest reviews related to allergy handling (only use real reviews)
            - Any additional safety information
            
            IMPORTANT:
            1. For each hotel, include the hotel's official website URL.
            2. Only include authentic reviews, NOT simulated ones.
            3. Format each hotel entry with the hotel name, followed by a pipe symbol, followed by the official website URL.
               Example: "Hotel Sunshine | https://www.hotelsunshine.com"`
          },
          {
            role: 'user',
            content: `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies. Only include authentic reviews from real guests.`
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ Received response from OpenAI');

    return new Response(
      JSON.stringify({ 
        recommendation: data.choices[0].message.content,
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
