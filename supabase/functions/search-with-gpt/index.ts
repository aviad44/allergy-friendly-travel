
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

    // For custom GPT integration, we need to format the message appropriately
    // The query includes the assistant ID for the custom GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the current model, can be changed to your specific custom GPT model
        messages: [
          {
            role: 'system',
            content: `You are a specialized travel assistant focusing on allergy-friendly hotels. 
            Your task is to provide detailed information about hotels that cater to specific allergies and dietary restrictions.
            Format your response clearly with 3-5 hotels where each hotel entry includes:
            - Hotel name and website (if available)
            - Key allergy accommodations they provide
            - Special dietary considerations they address
            - Brief authentic guest reviews related to allergy handling
            - Any additional safety information`
          },
          {
            role: 'user',
            content: `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies.`
          },
        ],
        temperature: 0.3, // Lower temperature for more consistent answers from your custom GPT
        max_tokens: 1500, // Increasing the response length for more detailed hotel information
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
