
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

    // Use the improved system prompt for strict JSON output
    const strictJsonSystemPrompt = `You are a hotel recommendation assistant for people with food allergies.

Your task is to respond to each user query with a structured, accurate, and reliable list of at least 5 allergy-friendly hotels (if available) in the requested destination. You must ensure that your output is always a valid, parsable JSON array (see the format below), with no markdown, no explanations, and no extra characters before or after the JSON.

JSON Format:
[
  {
    "hotel_name": "Example Hotel Name",
    "city": "City Name",
    "country": "Country Name",
    "star_rating": "3★, 4★, or 5★",
    "allergy_friendly_features": "e.g. gluten-free kitchen, trained staff, no peanuts, etc.",
    "guest_review_summary": "One or two short sentences with real guest feedback on allergy-friendliness.",
    "price_range": "$120–$180 per night",
    "booking_link": "https://booking.example.com/hotel-link"
  }
]

Formatting Instructions:
- Only output valid JSON. Do NOT include any text, commentary, explanation, code blocks, markdown, headings, or bullet points.
- Always use double quotes for both keys and values (JSON syntax).
- If a field is unknown, leave its value as an empty string (e.g. "price_range": "") but always include all keys.
- Provide a mix of both luxury and affordable hotels as long as they are allergy-safe.
- Each hotel must meet clear allergy-friendly criteria.
- Separate each hotel as an object within the array.
- Output a minimum of 5 hotels, if possible.

This structured response is required for our front-end to correctly parse and display the results for users with food allergies. Your response must always be clean, well-formed JSON and nothing else.`;

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
            content: strictJsonSystemPrompt
          },
          { 
            role: 'user', 
            content: `Find allergy-friendly hotels for: ${userInput}`
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
    
    console.log('🔍 Raw content first 300 chars:', content.substring(0, 300));
    console.log('🔍 Raw content last 300 chars:', content.substring(content.length - 300));
    
    // Advanced cleaning: Remove everything that's not JSON
    content = content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .replace(/^[^[\{]*/, '') // Remove everything before first [ or {
      .replace(/[^\]\}]*$/, '') // Remove everything after last ] or }
      .trim();
    
    // If content doesn't start with [ or {, try to extract JSON from within
    if (!content.startsWith('[') && !content.startsWith('{')) {
      const jsonMatch = content.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (jsonMatch) {
        content = jsonMatch[1];
      }
    }
    
    // Ensure it starts with [ or {
    if (!content.startsWith('[') && !content.startsWith('{')) {
      console.error('❌ Content does not start with [ or {:', content.substring(0, 100));
      throw new Error('Invalid JSON format received from OpenAI');
    }
    
    // Validate JSON by parsing it
    try {
      const parsedContent = JSON.parse(content);
      console.log('✅ JSON validation successful, hotels count:', Array.isArray(parsedContent) ? parsedContent.length : 1);
      
      // Additional validation: ensure it's an array with required fields
      if (!Array.isArray(parsedContent)) {
        throw new Error('Response is not an array');
      }
      
      // Validate each hotel has required fields
      parsedContent.forEach((hotel, index) => {
        const requiredFields = ['hotel_name', 'city', 'country', 'star_rating', 'allergy_friendly_features', 'guest_review_summary', 'price_range', 'booking_link'];
        requiredFields.forEach(field => {
          if (!hotel.hasOwnProperty(field)) {
            console.warn(`⚠️ Hotel ${index} missing field: ${field}`);
          }
        });
      });
      
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.error('❌ Content that failed to parse:', content);
      throw new Error('Invalid JSON received from OpenAI');
    }
    
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
