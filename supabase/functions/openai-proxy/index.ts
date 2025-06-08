
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
    const { userInput, systemPrompt, model = "gpt-4o-mini", temperature = 0.3, max_tokens = 4000 } = await req.json();
    
    console.log('✅ Processing request:', { 
      inputLength: userInput.length,
      model,
      temperature,
      max_tokens
    });

    // System prompt that FORCES JSON output
    const jsonSystemPrompt = `You are a hotel recommendation system that MUST return ONLY valid JSON.

CRITICAL RULES:
1. Return ONLY a JSON array - no text before or after
2. No markdown, no explanations, no additional text
3. Each hotel must have ALL required fields
4. Return exactly 5-7 hotels minimum
5. Use this EXACT structure:

[
  {
    "hotel_name": "Hotel Name Here",
    "city": "City Name",
    "country": "Country Name", 
    "star_rating": "4★",
    "allergy_friendly_features": "Feature 1, Feature 2, Feature 3",
    "guest_review_summary": "Review summary here",
    "price_range": "$100-200 per night",
    "booking_link": "https://www.booking.com/hotel/link"
  }
]

IMPORTANT: Start your response with [ and end with ] - nothing else.`;

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
            content: jsonSystemPrompt
          },
          { 
            role: 'user', 
            content: `Find allergy-friendly hotels for: ${userInput}. Return ONLY the JSON array as specified.`
          }
        ],
        temperature: temperature,
        max_tokens: max_tokens,
        top_p: 0.9,
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
    
    // Extract and aggressively clean the response content
    let content = data.choices[0].message.content.trim();
    
    console.log('🔍 Raw content first 200 chars:', content.substring(0, 200));
    console.log('🔍 Raw content last 200 chars:', content.substring(content.length - 200));
    
    // Remove any non-JSON content
    content = content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .replace(/^[^[\{]*/, '') // Remove everything before first [ or {
      .replace(/[^\]\}]*$/, '') // Remove everything after last ] or }
      .trim();
    
    // Ensure it starts with [ or {
    if (!content.startsWith('[') && !content.startsWith('{')) {
      console.error('❌ Content does not start with [ or {:', content.substring(0, 100));
      throw new Error('Invalid JSON format received from OpenAI');
    }
    
    // Validate JSON by parsing it
    try {
      const parsedContent = JSON.parse(content);
      console.log('✅ JSON validation successful, hotels count:', Array.isArray(parsedContent) ? parsedContent.length : 1);
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.error('❌ Content that failed to parse:', content);
      throw new Error('Invalid JSON received from OpenAI');
    }
    
    console.log('✅ Cleaned content first 300 chars:', content.substring(0, 300));
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
