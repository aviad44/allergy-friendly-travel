
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200 
    });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    console.log('⏱️ OpenAI Proxy function started at:', new Date().toISOString());

    // Parse request body
    const { userInput, systemPrompt, model = "gpt-4o-mini", temperature = 0.7, max_tokens = 3000 } = await req.json();
    
    console.log('✅ Processing request:', { 
      inputLength: userInput.length,
      systemPromptLength: systemPrompt?.length || 0,
      model,
      temperature,
      max_tokens
    });

    // Enhanced system prompt for structured JSON output
    const enhancedSystemPrompt = `You are a hotel recommendation assistant for people with food allergies.

Your task is to return structured hotel recommendations based on a user's question or location. The output **must always be in clean, valid JSON** — no explanation, no markdown, no headings, and no free text outside the JSON.

Each response should return **at least 5 hotels** (if available) that meet allergy-friendly criteria. Include a mix of both luxury and affordable options.

Use the following format for the JSON array:

[
  {
    "hotel_name": "Hotel Name",
    "city": "City",
    "country": "Country", 
    "star_rating": "4★",
    "allergy_friendly_features": "Gluten-free kitchen, trained staff, no peanuts on menu",
    "guest_review_summary": "Guests consistently praise the hotel for accommodating dietary needs.",
    "price_range": "$120–$180 per night",
    "booking_link": "https://booking.example.com/hotel-link"
  }
]

Important formatting rules:
- Return only valid JSON — no text before or after it.
- Do not use markdown, bolding, bullets, or formatting characters.
- Always use double quotes for keys and values (to match JSON syntax).
- If information is unknown, leave the value as an empty string (""), but keep the key.

This structured format is critical for the front-end system (LOVABLE) to parse and display each result correctly.`;

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
            content: enhancedSystemPrompt
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
    
    // Clean up any potential markdown or formatting
    content = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/^\s*#.*$/gm, '') // Remove markdown headers
      .replace(/^\s*\*.*$/gm, '') // Remove markdown bullets
      .trim();
    
    console.log('✅ Cleaned content first 500 chars:', content.substring(0, 500));
    console.log('⏱️ Function completed at:', new Date().toISOString());

    return new Response(
      JSON.stringify({ result: content }),
      { 
        headers: corsHeaders,
        status: 200
      }
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
        headers: corsHeaders
      }
    );
  }
});
