
// Netlify function to handle translation requests
// This function serves as a proxy to the OpenAI API for translations

const handler = async (event) => {
  // Check if this is a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Allow': 'POST',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  try {
    // Parse the request body
    const { text, targetLanguage } = JSON.parse(event.body);

    if (!text || !targetLanguage) {
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
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
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
          // Check if the error is related to the API key
          if (parsedError.error && parsedError.error.message && parsedError.error.message.toLowerCase().includes('api key')) {
            return {
              statusCode: 500,
              body: JSON.stringify({ error: 'Server configuration error - API key missing or invalid' }),
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            };
          }
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: parsedError.error?.message || `Translation service error: ${response.statusText}` 
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
              error: `Translation service error: ${response.statusText}` 
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
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Empty translation result' }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };
      }

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
