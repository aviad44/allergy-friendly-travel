
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
            Format your response in a clean, easy-to-parse format like this:

            **Hotel Name** | https://www.hotelwebsite.com
            
            **Key Allergy Accommodations:** [Specific allergy accommodations details]
            **Special Dietary Considerations:** [Dietary options details]
            **Authentic Guest Reviews:** [Real guest feedback]
            **Additional Safety Information:** [Safety details]
            
            ---
            
            **Next Hotel Name** | https://www.nexthotelwebsite.com
            
            [Continue with same format]
            
            IMPORTANT RULES:
            1. Format exactly as shown above with the hotel name and URL on the same line separated by |
            2. Each detail section should be a separate paragraph with the bold heading
            3. Include 4-5 hotels for the given destination
            4. Use real hotel websites and information
            5. Only include authentic information relevant to the specific allergies mentioned
            6. Always format URLs correctly and place them on the same line as the hotel name separated by a pipe character
            7. For each hotel, use the EXACT format: "**Hotel Name** | https://website.com" (note the | character between name and URL)`
          },
          {
            role: 'user',
            content: `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies.`
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
    
    // Process the response to remove any unwanted instructions
    let processedResponse = data.choices[0].message.content;
    
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
