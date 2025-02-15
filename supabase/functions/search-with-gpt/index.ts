
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
            Include details about:
            - Kitchen facilities and food preparation
            - Room cleaning protocols
            - Air filtration systems
            - Staff training for allergy awareness
            Your responses should be in Hebrew and be concise but informative.`
          },
          {
            role: 'user',
            content: `אני מחפש מלון ב-${destination} שמתאים לאנשים עם ${allergies}. 
            אנא המלץ על מלון והסבר מדוע הוא מתאים במיוחד לאלרגיות שציינתי.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to get hotel recommendations');
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
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
