
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
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
        model: 'gpt-4o', // Keep using the powerful model but with optimized parameters
        messages: [
          {
            role: 'system',
            content: `You are a specialized travel assistant focusing on allergy-friendly hotels.
            Format your response in this EXACT numbered format for each hotel:
            
            ## 1. [Hotel Name] ⭐⭐⭐⭐⭐
            
            📍 [City, Country]
            
            🌟 Why it's great for [allergy type] allergy travelers:
            - [Feature 1]
            - [Feature 2]
            
            💬 Allergy Guest Review:
            "[Brief review]"
            
            🔗 [Official Hotel Website URL]
            
            ---`
          },
          {
            role: 'user',
            content: `Find the best 3-5 allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies.`
          },
        ],
        temperature: 0.2, // Lower temperature for more deterministic responses
        max_tokens: 1000, // Reduced token limit for faster responses
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
