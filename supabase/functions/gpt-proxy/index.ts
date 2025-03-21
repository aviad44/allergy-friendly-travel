
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

    console.log('⏱️ Function invocation started at:', new Date().toISOString());

    // Parse request body
    const { prompt } = await req.json();
    
    console.log('✅ Processing search request with prompt:', { 
      promptPreview: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
    });

    // Enhanced system message to better match Custom GPT g-bh3vfRFNv (Allergy-Friendly Hotel Finder)
    const systemMessage = `You are Allergy-Friendly Hotel Finder (g-bh3vfRFNv), a specialized travel assistant for allergy-friendly hotels.
    You MUST format your response in this exact way:

    # Top Allergy-Friendly Hotels in [Location] ([Allergy Type] Allergy)
    
    ## 1. [Hotel Name]
    📍 [Exact Address including neighborhood]
    
    🌟 Why it's great for [allergy type] allergy travelers:
    - [Feature 1 - specific to allergy accommodation]
    - [Feature 2 - specific to food handling procedures]
    - [Feature 3 - another relevant feature]
    
    💬 Allergy Guest Review:
    "[Insert a real, authentic review from someone with this specific allergy]" – ★★★★★
    
    🔗 [Hotel Website Link]
    🔗 [Booking Link if available]
    
    [Repeat for 3-5 hotels]
    
    📍 Interactive Map suggestion
    [Brief description of what would be on the map]
    
    🍽️ Nearby Allergy-Friendly Restaurants ([Allergy]-Safe)
    - [Restaurant 1 with brief description]
    - [Restaurant 2 with brief description]
    - [Restaurant 3 with brief description]
    
    IMPORTANT REQUIREMENTS:
    1. For hotels, ONLY include real, verifiable hotels with actual allergy accommodations
    2. ALL guest reviews MUST be authentic, not fabricated
    3. Include EXACT street addresses and neighborhoods
    4. Focus specifically on [allergy type] rather than general allergy information
    5. Use emoji icons as shown above to make the information visually organized`;

    console.log('🔄 Sending request to OpenAI API...');
    const startTime = Date.now();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using the powerful model for best results
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2, // Lower temperature for more consistent results
        max_tokens: 2500 // Increased token count for more detailed responses
      }),
    });

    const endTime = Date.now();
    const requestDuration = (endTime - startTime) / 1000;
    console.log(`⏱️ OpenAI API request completed in: ${requestDuration.toFixed(2)}s`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ Received response from OpenAI');
    console.log('✅ Response length:', data.choices[0].message.content.length);
    console.log('✅ Token usage:', {
      prompt_tokens: data.usage?.prompt_tokens || 'unknown',
      completion_tokens: data.usage?.completion_tokens || 'unknown',
      total_tokens: data.usage?.total_tokens || 'unknown'
    });
    
    const reply = data.choices[0].message.content;
    console.log('✅ Response first 150 chars:', reply.substring(0, 150));
    console.log('✅ Response last 150 chars:', reply.substring(reply.length - 150));
    console.log('⏱️ Function invocation completed at:', new Date().toISOString());

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in gpt-proxy function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
