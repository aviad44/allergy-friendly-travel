
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Log request details for debugging
  console.log(`Received ${req.method} request`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.error(`Method Not Allowed: ${req.method}`);
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Allow': 'POST' }
      }
    );
  }

  try {
    // Get request body and convert to text for safe parsing
    const requestBody = await req.text();
    let requestData;
    
    try {
      requestData = JSON.parse(requestBody);
      console.log("Successfully parsed request body");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          receivedText: requestBody.substring(0, 100) // First 100 chars for debug
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    const { text, targetLanguage } = requestData;

    if (!text || !targetLanguage) {
      console.error("Missing required fields:", { hasText: !!text, hasTargetLanguage: !!targetLanguage });
      return new Response(
        JSON.stringify({ error: 'Missing text or target language' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error('Missing OpenAI API key in environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error - API key missing' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Translating to ${targetLanguage}, text length: ${text.length}`);
    const prompt = `Translate the following allergy warning into ${targetLanguage}. Keep it polite, clear, and medically accurate:\n\n${text}`;

    // For development or testing fallback if needed
    if (Deno.env.get('DEBUG_TRANSLATION') === 'true') {
      console.log("Using debug mock translation");
      // Simulate delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new Response(
        JSON.stringify({ 
          translation: `[${targetLanguage.toUpperCase()} MOCK TRANSLATION]\n\n${text}\n\n(This is a debug mock translation)` 
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      console.log("Sending request to OpenAI API");
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Updated to use gpt-4o-mini which is more accessible
          messages: [
            { role: 'system', content: 'You are a professional medical translator. Translate the text accurately while ensuring it is polite and clear for restaurant or hotel staff.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 800
        }),
      });

      // Get the response text first, then try to parse as JSON
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error('OpenAI API Error:', responseText);
        try {
          const errorData = JSON.parse(responseText);
          return new Response(
            JSON.stringify({ 
              error: errorData.error?.message || `Translation failed: ${response.status} ${response.statusText}`,
              details: errorData
            }), 
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } catch (parseError) {
          return new Response(
            JSON.stringify({ 
              error: `Translation failed: ${response.status} ${response.statusText}`,
              rawError: responseText || "No error details available"
            }), 
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse OpenAI response:", jsonError, responseText.substring(0, 200));
        return new Response(
          JSON.stringify({ 
            error: "Invalid response from translation service", 
            responseText: responseText.substring(0, 200) // Just include the first part of the response
          }), 
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const translatedText = data.choices?.[0]?.message?.content?.trim();
      
      if (!translatedText) {
        console.error("Empty translation result from OpenAI");
        return new Response(
          JSON.stringify({ error: 'Empty translation result' }), 
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      console.log('Translation successful, returning response');

      return new Response(
        JSON.stringify({ translation: translatedText }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (fetchError) {
      console.error('Fetch Error:', fetchError);
      return new Response(
        JSON.stringify({ error: `Translation service error: ${fetchError.message}` }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
    return new Response(
      JSON.stringify({ error: `Unexpected server error: ${err.message}` }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
