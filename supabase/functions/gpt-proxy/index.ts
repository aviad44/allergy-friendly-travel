
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
    
    console.log('✅ Processing chat request with prompt:', { 
      promptPreview: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
    });

    // System message that emulates the Custom GPT
    const systemMessage = `You are a specialized travel assistant focusing on allergy-friendly hotels. 
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
       Example: "Hotel Sunshine | https://www.hotelsunshine.com"`;

    console.log('🔄 Sending request to OpenAI API...');
    const startTime = Date.now();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using the powerful model
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 2000
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
    console.log('✅ Response first 100 chars:', reply.substring(0, 100));
    console.log('✅ Response last 100 chars:', reply.substring(reply.length - 100));
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
