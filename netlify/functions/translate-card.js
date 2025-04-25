
// Netlify function to handle translation requests
// This function serves as a proxy to the OpenAI API for translations

const handler = async (event) => {
  // Add detailed request logging
  console.log(`Received ${event.httpMethod} request with headers:`, 
              JSON.stringify(event.headers));
  console.log(`Request body: ${event.body ? event.body.substring(0, 100) + '...' : 'empty'}`);
  
  // Helper function to ensure we always return valid JSON
  const createResponse = (data, statusCode = 200) => {
    // Ensure we have a valid JSON string
    let responseBody;
    try {
      responseBody = JSON.stringify(data);
    } catch (stringifyError) {
      console.error("Failed to stringify response data:", stringifyError);
      // Fallback if JSON.stringify fails
      responseBody = JSON.stringify({ 
        error: "Failed to generate response", 
        translatedText: null 
      });
    }
    
    return {
      statusCode,
      body: responseBody,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  };
  
  // Check if this is a POST request
  if (event.httpMethod !== 'POST') {
    console.error(`Method Not Allowed: ${event.httpMethod}`);
    return createResponse({ error: 'Method Not Allowed', translatedText: null }, 405);
  }

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No content for OPTIONS
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Length': '0',
      },
      body: '{}', // Empty but valid JSON
    };
  }

  try {
    // Parse the request body
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
      console.log("Successfully parsed request body");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return createResponse({ 
        error: 'Invalid JSON in request body', 
        translatedText: null 
      }, 400);
    }

    const { text, targetLanguage } = parsedBody;

    if (!text || !targetLanguage) {
      console.error("Missing required fields:", { text: !!text, targetLanguage: !!targetLanguage });
      return createResponse({ 
        error: 'Missing text or target language', 
        translatedText: null 
      }, 400);
    }

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Missing OpenAI API key in environment variables');
      return createResponse({ 
        error: 'Server configuration error - API key missing', 
        translatedText: null 
      }, 500);
    }

    console.log(`Translating to ${targetLanguage}, text length: ${text.length}`);
    const prompt = `Translate the following allergy warning into ${targetLanguage}. Keep it polite, clear, and medically accurate:\n\n${text}`;

    try {
      console.log("Sending request to OpenAI API");
      
      // For development fallback if needed
      if (process.env.NODE_ENV === 'development' && process.env.VITE_DEBUG_TRANSLATION === 'true') {
        console.log("Using debug mock translation");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        return createResponse({ 
          translatedText: `[${targetLanguage.toUpperCase()} TRANSLATION]\n\n${text}\n\n(This is a debug mock translation)` 
        });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
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

      let responseText;
      try {
        responseText = await response.text();
        console.log("OpenAI response received, length:", responseText ? responseText.length : 0);
      } catch (responseError) {
        console.error("Failed to get OpenAI response text:", responseError);
        return createResponse({ 
          error: 'Failed to read OpenAI response', 
          translatedText: null 
        }, 500);
      }

      if (!response.ok) {
        console.error('OpenAI API Error:', responseText);
        try {
          const parsedError = JSON.parse(responseText);
          return createResponse({ 
            error: parsedError.error?.message || `Translation service error: ${response.statusText}`,
            details: parsedError,
            translatedText: null
          }, 500);
        } catch (parseError) {
          return createResponse({ 
            error: `Translation service error: ${response.statusText}`,
            rawError: responseText || "No error details available",
            translatedText: null
          }, 500);
        }
      }

      let data;
      try {
        // Try to parse the OpenAI response as JSON
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse OpenAI response:", jsonError, responseText ? responseText.substring(0, 200) : "empty");
        return createResponse({ 
          error: "Invalid response from translation service", 
          responseText: responseText ? responseText.substring(0, 200) : "empty response",
          translatedText: null
        }, 500);
      }

      const translatedText = data.choices?.[0]?.message?.content?.trim();

      if (!translatedText) {
        console.error("Empty translation result from OpenAI");
        return createResponse({ 
          error: 'Empty translation result', 
          translatedText: null 
        }, 500);
      }

      console.log("Translation successful, returning response");
      return createResponse({ 
        translatedText: translatedText 
      });
    } catch (fetchError) {
      console.error('Fetch Error:', fetchError);
      return createResponse({ 
        error: `Translation service error: ${fetchError.message}`,
        translatedText: null
      }, 500);
    }
  } catch (error) {
    console.error('Translation Error:', error);
    return createResponse({ 
      error: `Server error during translation: ${error.message}`,
      translatedText: null
    }, 500);
  }
};

module.exports = { handler };
