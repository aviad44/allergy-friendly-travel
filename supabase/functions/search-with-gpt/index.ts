
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { destination, allergies } = await req.json();
    console.log('Received search request for:', { destination, allergies });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful travel assistant that provides hotel recommendations for people with allergies. 
            Focus on providing specific, practical advice about hotels that accommodate various allergies.
            Format your response exactly like this example:

            1. Hotel Name | booking.com/hotel-name
            - Feature 1 about allergy accommodation
            - Feature 2 about staff training
            - Feature 3 about facilities
            - Feature 4 about special services

            2. Second Hotel Name | hilton.com/hotel-name
            - Feature 1
            - Feature 2
            - Feature 3
            - Feature 4

            3. Third Hotel Name | marriott.com/hotel-name
            - Feature 1
            - Feature 2
            - Feature 3
            - Feature 4

            Only provide 3 hotels, each with exactly 4 features and a real booking URL after the hotel name (separated by |).
            Focus on allergy-related accommodations. Make sure the URLs are actual working URLs to the hotel booking pages.`
          },
          {
            role: 'user',
            content: `I'm looking for hotels in ${destination} that are suitable for people with ${allergies} allergies. Please recommend 3 hotels and explain why they're particularly suitable for managing these allergies. Include real booking URLs.`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(error.error?.message || 'Failed to get hotel recommendations');
    }

    const data = await response.json();
    console.log('OpenAI Response:', data);

    return new Response(
      JSON.stringify({ recommendation: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-with-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
