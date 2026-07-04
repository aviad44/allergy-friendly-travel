
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

// Helper function to always return properly formatted JSON responses
const createJsonResponse = (data: any, status = 200) => {
  // Always ensure we have a valid JSON string to return
  let responseBody: string;
  
  try {
    responseBody = JSON.stringify(data);
  } catch (stringifyError) {
    console.error("Failed to stringify response data:", stringifyError);
    // Fallback response if JSON.stringify fails
    responseBody = JSON.stringify({
      error: "Failed to generate response",
      translatedText: null
    });
  }
  
  return new Response(responseBody, { 
    status, 
    headers: corsHeaders
  });
}

serve(async (req) => {
  // Log request details for debugging
  console.log(`Received ${req.method} request`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({}), { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.error(`Method Not Allowed: ${req.method}`);
    return createJsonResponse(
      { error: 'Method Not Allowed', translatedText: null },
      405
    );
  }

  try {
    // Get request body and convert to text for safe parsing
    let requestBody: string;
    try {
      requestBody = await req.text();
      console.log("Received request body length:", requestBody.length);
    } catch (textError) {
      console.error("Failed to get request body as text:", textError);
      return createJsonResponse(
        { error: 'Failed to read request body', translatedText: null },
        400
      );
    }
    
    let requestData;
    
    try {
      requestData = JSON.parse(requestBody);
      console.log("Successfully parsed request body");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return createJsonResponse(
        {
          error: 'Invalid JSON in request body',
          receivedText: requestBody.substring(0, 100), // First 100 chars for debug
          translatedText: null
        },
        400
      );
    }
    
    const { text, targetLanguage } = requestData;

    if (!text || !targetLanguage) {
      console.error("Missing required fields:", { hasText: !!text, hasTargetLanguage: !!targetLanguage });
      return createJsonResponse(
        { error: 'Missing text or target language', translatedText: null },
        400
      );
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error('Missing OpenAI API key in environment variables');
      return createJsonResponse(
        { error: 'Server configuration error - API key missing', translatedText: null },
        500
      );
    }

    console.log(`Translating to ${targetLanguage}, text length: ${text.length}`);
    const prompt = `Translate the following allergy warning into ${targetLanguage}. Keep it polite, clear, and medically accurate:\n\n${text}`;

    // For development or testing fallback if needed
    if (Deno.env.get('DEBUG_TRANSLATION') === 'true') {
      console.log("Using debug mock translation");
      // Simulate delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return createJsonResponse({
        translatedText: `[${targetLanguage.toUpperCase()} MOCK TRANSLATION]\n\n${text}\n\n(This is a debug mock translation)`
      });
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
      let responseText: string = "";
      try {
        responseText = await response.text();
        console.log("OpenAI response received, length:", responseText.length);
      } catch (responseError) {
        console.error("Failed to get OpenAI response text:", responseError);
        return createJsonResponse(
          { error: 'Failed to read OpenAI response', translatedText: null },
          500
        );
      }
      
      if (!response.ok) {
        console.error('OpenAI API Error:', responseText);
        try {
          // Try to parse response as JSON, but provide fallback if it's not valid JSON
          const errorData = responseText ? JSON.parse(responseText) : { error: "Unknown error" };
          return createJsonResponse(
            {
              error: errorData.error?.message || `Translation failed: ${response.status} ${response.statusText}`,
              details: errorData,
              translatedText: null
            },
            500
          );
        } catch (parseError) {
          // If we can't parse response as JSON, return the raw text
          return createJsonResponse(
            {
              error: `Translation failed: ${response.status} ${response.statusText}`,
              rawError: responseText || "No error details available",
              translatedText: null
            },
            500
          );
        }
      }
      
      let data;
      try {
        // Try to parse the OpenAI response as JSON
        data = responseText ? JSON.parse(responseText) : null;
        if (!data) {
          console.error("Empty or null response from OpenAI");
          return createJsonResponse(
            { error: "Empty response from translation service", translatedText: null },
            500
          );
        }
      } catch (jsonError) {
        console.error("Failed to parse OpenAI response:", jsonError, responseText.substring(0, 200));
        return createJsonResponse(
          {
            error: "Invalid response from translation service",
            responseText: responseText.substring(0, 200),
            translatedText: null
          },
          500
        );
      }

      const translatedText = data.choices?.[0]?.message?.content?.trim();
      
      if (!translatedText) {
        console.error("Empty translation result from OpenAI");
        return createJsonResponse(
          { error: 'Empty translation result', translatedText: null },
          500
        );
      }
      
      console.log('Translation successful, returning response');
      return createJsonResponse({
        translatedText: translatedText
      });
    } catch (fetchError) {
      console.error('Fetch Error:', fetchError);
      // Generate a fallback translation for development purposes
      if (Deno.env.get('DEBUG_MODE') === 'true') {
        console.log("Using emergency fallback mock translation after error");
        return createJsonResponse({
          translatedText: `[${targetLanguage.toUpperCase()} EMERGENCY FALLBACK]\n\n${text}\n\n(Service error: ${fetchError.message})`,
          error: fetchError.message
        });
      }
      return createJsonResponse(
        { 
          error: `Translation service error: ${fetchError.message}`,
          translatedText: null
        },
        500
      );
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
    // Always return a valid response even in case of unexpected errors
    return createJsonResponse(
      { 
        error: `Unexpected server error: ${err.message}`,
        translatedText: null
      },
      500
    );
  }
});
