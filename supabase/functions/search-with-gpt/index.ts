
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
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a helpful travel assistant that provides hotel recommendations for people with allergies. 
            Focus on providing specific, practical advice about hotels that accommodate various allergies.
            You must respond EXACTLY in this format (with real, working booking URLs):

            1. Hotel Name | https://www.booking.com/hotel/real-hotel-url
            - They have certified allergy-friendly rooms
            - Staff is trained in allergy protocols
            - Dedicated allergy-safe dining options
            - Medical facilities nearby

            2. Second Hotel | https://www.hotels.com/real-hotel-url
            - Feature 1 about allergy safety
            - Feature 2 about kitchen protocols
            - Feature 3 about room cleaning
            - Feature 4 about medical support

            3. Third Hotel | https://www.expedia.com/real-hotel-url
            - Feature 1
            - Feature 2
            - Feature 3
            - Feature 4`
          },
          {
            role: 'user',
            content: `I'm looking for hotels in ${destination} that are suitable for people with ${allergies} allergies. Please recommend 3 hotels and explain why they're particularly suitable for managing these allergies.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(error.error?.message || 'Failed to get hotel recommendations');
    }

    const data = await response.json();
    console.log('OpenAI Response:', data.choices[0].message.content);

    return new Response(
      JSON.stringify({ 
        recommendation: data.choices[0].message.content,
        status: 'success'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in search-with-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
