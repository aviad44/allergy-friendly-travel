
// Netlify function to handle translation requests
// This function serves as a proxy to the OpenAI API for translations

const handler = async (event) => {
  // Add detailed request logging
  console.log(`Received ${event.httpMethod} request with headers:`, 
              JSON.stringify(event.headers));
  console.log(`Request body: ${event.body ? event.body.substring(0, 100) + '...' : 'empty'}`);
  
  // Check if this is a POST request
  if (event.httpMethod !== 'POST') {
    console.error(`Method Not Allowed: ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Allow': 'POST',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
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
      body: '',
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
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const { text, targetLanguage } = parsedBody;

    if (!text || !targetLanguage) {
      console.error("Missing required fields:", { text: !!text, targetLanguage: !!targetLanguage });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing text or target language' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Missing OpenAI API key in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error - API key missing' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    console.log(`Translating to ${targetLanguage}, text length: ${text.length}`);
    const prompt = `Translate the following allergy warning into ${targetLanguage}. Keep it polite, clear, and medically accurate:\n\n${text}`;

    try {
      console.log("Sending request to OpenAI API");
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

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API Error:', errorData);
        try {
          const parsedError = JSON.parse(errorData);
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: parsedError.error?.message || `Translation service error: ${response.statusText}`,
              details: parsedError
            }),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          };
        } catch (parseError) {
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: `Translation service error: ${response.statusText}`,
              rawError: errorData
            }),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          };
        }
      }

      const data = await response.json();
      const translatedText = data.choices?.[0]?.message?.content?.trim();

      if (!translatedText) {
        console.error("Empty translation result from OpenAI");
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Empty translation result' }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };
      }

      console.log("Translation successful, returning response");
      return {
        statusCode: 200,
        body: JSON.stringify({ translation: translatedText }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    } catch (fetchError) {
      console.error('Fetch Error:', fetchError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: `Translation service error: ${fetchError.message}` 
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }
  } catch (error) {
    console.error('Translation Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error during translation: ${error.message}` }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

module.exports = { handler };
