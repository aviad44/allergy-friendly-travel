
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
            Format your response in this EXACT numbered format for each hotel (number each section exactly as shown):
            
            ## 1. [Hotel Name] ⭐⭐⭐⭐⭐
            
            📍 [Exact Address including neighborhood, City, Country]
            
            🌟 Why it's great for [allergy type] allergy travelers:
            - [Feature 1 - specific to allergy accommodation]
            - [Feature 2 - specific to food handling procedures]
            - [Feature 3 - another relevant feature]
            
            💬 Allergy Guest Review:
            "[Insert a real, authentic review from someone with this specific allergy]"
            
            🔗 [Official Hotel Website URL]
            
            ---
            
            ## 2. [Next Hotel Name]
            
            [Continue with same format]
            
            IMPORTANT:
            1. Make sure EVERY hotel includes the hotel name, address, allergy features, guest review, and website URL
            2. Format needs to be EXACTLY as shown with markdown headers and emoji
            3. Include 2-4 hotels for the given destination that truly accommodate the specific allergies
            4. Only include accurate information and working URLs
            5. Be concise but thorough in your descriptions
            6. Always use the ## header format for hotel names and --- separators between hotels`
          },
          {
            role: 'user',
            content: `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide 2-4 hotels with their full details.`
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
    
    // Process the response to remove any potential prompt indicators
    let processedResponse = data.choices[0].message.content;
    processedResponse = processedResponse
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/IMPORTANT RULES:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format exactly as shown[\s\S]*?(?=\n\n|$)/g, '')
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
