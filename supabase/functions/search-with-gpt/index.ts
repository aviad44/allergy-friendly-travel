
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
    const chatbaseApiKey = Deno.env.get('CHATBASE_API_KEY');
    if (!chatbaseApiKey) {
      console.error('❌ Chatbase API key is missing');
      throw new Error('Chatbase API key is not configured');
    }

    // Parse request body
    const { destination, allergies } = await req.json();
    console.log('✅ Processing search request for:', { destination, allergies });

    // Create the query for Chatbase
    const query = `Find the best allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Please provide 3-5 specific hotel recommendations with detailed information about their allergy accommodations.`;
    
    console.log('🤖 Sending query to Chatbase:', query);
    console.log('🔑 Using API key (first 10 chars):', chatbaseApiKey.substring(0, 10) + '...');

    // Try the new Chatbase API format first
    let response = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${chatbaseApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            content: query,
            role: "user"
          }
        ],
        chatbotId: "yWArdEZJM7gTntiEMM2Tr",
        stream: false,
        temperature: 0.2
      }),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    // If first API call fails, try alternative endpoint
    if (!response.ok) {
      console.log('🔄 Trying alternative Chatbase API endpoint...');
      
      response = await fetch('https://www.chatbase.co/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatbaseApiKey}`,
        },
        body: JSON.stringify({
          chatbotId: "yWArdEZJM7gTntiEMM2Tr",
          messages: [
            {
              role: "user",
              content: query
            }
          ]
        }),
      });
    }

    // If still not working, try the public API endpoint
    if (!response.ok) {
      console.log('🔄 Trying public Chatbase API endpoint...');
      
      response = await fetch(`https://www.chatbase.co/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': chatbaseApiKey,
        },
        body: JSON.stringify({
          chatbotId: "yWArdEZJM7gTntiEMM2Tr",
          message: query
        }),
      });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ All Chatbase API attempts failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Dynamic fallback based on destination
      const fallbackRecommendation = `
## Allergy-Friendly Hotels in ${destination}

I apologize, but our AI service is temporarily unavailable. Here are some general recommendations for allergy-friendly accommodations in ${destination}:

### 1. International Chain Hotels
- **Hilton Hotels** - Most locations have allergy protocols
- **Marriott Hotels** - Trained staff for dietary restrictions  
- **InterContinental** - Dedicated allergy menus available

### 2. Luxury Hotels
- Look for 4-5 star hotels with multiple restaurants
- Hotels with executive floors often provide better allergy support
- Properties with dedicated concierge services

### 3. Tips for ${destination}:
- Contact hotels directly about your ${allergies} allergy before booking
- Request rooms with kitchenette if available
- Research local emergency services and allergy-friendly restaurants
- Carry allergy medication and translation cards

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking. Staff training and protocols can vary by location.

For the most up-to-date recommendations, please try searching again later or contact our support team.
      `;
      
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation.trim(),
          status: "success",
          source: "fallback",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    console.log('✅ Received response from Chatbase:', JSON.stringify(data, null, 2));
    
    // Extract the response content
    let recommendation = '';
    if (data.text) {
      recommendation = data.text;
    } else if (data.content) {
      recommendation = data.content;
    } else if (data.message) {
      recommendation = data.message;
    } else if (data.response) {
      recommendation = data.response;
    } else if (data.choices && data.choices[0] && data.choices[0].message) {
      recommendation = data.choices[0].message.content;
    } else if (data.data && data.data.message) {
      recommendation = data.data.message;
    } else {
      console.error('❌ Unexpected Chatbase response format:', data);
      throw new Error('Invalid response format from Chatbase');
    }
    
    // Clean up the response
    recommendation = recommendation.trim();
    
    console.log('✅ Processed recommendation length:', recommendation.length);
    
    return new Response(
      JSON.stringify({ 
        recommendation: recommendation,
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in search-with-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined,
        status: "error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
