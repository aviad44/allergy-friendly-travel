
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

    console.log('⏱️ OpenAI Proxy function started at:', new Date().toISOString());

    // Parse request body
    const { userInput, systemPrompt, model = "gpt-4o-mini", temperature = 0.7, max_tokens = 2000 } = await req.json();
    
    console.log('✅ Processing request:', { 
      inputLength: userInput.length,
      systemPromptLength: systemPrompt?.length || 0,
      model,
      temperature,
      max_tokens
    });

    // Improved system prompt that ensures consistent formatting
    const enhancedSystemPrompt = `You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. 

IMPORTANT: Format your response EXACTLY like this example:

### Hotel Ritz Madrid ★★★★★
**Address:** Plaza de la Lealtad 5, Madrid, Spain
- ⭐ 5-star luxury hotel
- 🍽️ Dedicated gluten-free kitchen area
- 👨‍🍳 Trained staff for allergy protocols
- 📞 +34 91 701 6767

**Description:** This luxury hotel offers excellent gluten-free accommodations with trained staff.
**Guest Quote:** "Amazing gluten-free breakfast options and very helpful staff" - Maria S.

### Villa Magna Madrid ★★★★★
**Address:** Paseo de la Castellana 22, Madrid, Spain
- ⭐ 5-star hotel with spa
- 🍽️ Gluten-free menu available
- 👨‍🍳 Chef trained in allergy management
- 📞 +34 91 587 1234

**Description:** Modern hotel with excellent allergy-friendly dining options.
**Guest Quote:** "Perfect for my celiac needs, great restaurant" - John D.

Always respond in English only. Provide 3-5 real hotels with complete information.`;

    console.log('🔄 Sending request to OpenAI API...');
    const startTime = Date.now();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt || enhancedSystemPrompt
          },
          { role: 'user', content: userInput }
        ],
        temperature: temperature,
        max_tokens: max_tokens,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
    });

    const endTime = Date.now();
    const requestDuration = (endTime - startTime) / 1000;
    console.log(`⏱️ OpenAI API request completed in: ${requestDuration.toFixed(2)}s`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Received response from OpenAI');
    console.log('✅ Response content length:', data.choices[0].message.content.length);
    console.log('✅ Token usage:', {
      prompt_tokens: data.usage?.prompt_tokens || 'unknown',
      completion_tokens: data.usage?.completion_tokens || 'unknown',
      total_tokens: data.usage?.total_tokens || 'unknown'
    });
    
    // Extract and clean the response content
    let content = data.choices[0].message.content;
    
    // Basic cleanup - remove any system instructions that might have leaked
    content = content
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response as[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/EXTREMELY IMPORTANT SAFETY REQUIREMENTS:[\s\S]*?(?=\n\n|$)/g, '')
      .trim();
    
    console.log('✅ Cleaned content first 200 chars:', content.substring(0, 200));
    console.log('⏱️ Function completed at:', new Date().toISOString());

    return new Response(
      JSON.stringify({ result: content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in openai-proxy function:', error);
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
