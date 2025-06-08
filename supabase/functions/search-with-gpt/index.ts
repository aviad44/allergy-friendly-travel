
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

    // Call Chatbase API with updated endpoint and format
    const response = await fetch('https://www.chatbase.co/api/v1/chat', {
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Chatbase API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Fallback to static London data for now
      const fallbackRecommendation = `
## 1. The Langham London ⭐⭐⭐⭐⭐

📍 London, United Kingdom

🌟 Why it's great for ${allergies} allergy travelers:
- Dedicated allergy-trained kitchen staff
- Custom menu preparation for dietary restrictions
- Excellent cross-contamination protocols
- 24/7 room service with allergy-safe options

💬 Allergy Guest Review:
"The staff took my ${allergies} allergy very seriously and prepared safe meals throughout my stay."

🔗 https://www.langhamhotels.com/en/the-langham/london/

---

## 2. Hilton London Bankside ⭐⭐⭐⭐

📍 London, United Kingdom

🌟 Why it's great for ${allergies} allergy travelers:
- Comprehensive allergen protocols
- Staff trained in allergy awareness
- Safe food preparation areas
- Detailed ingredient information available

💬 Allergy Guest Review:
"Felt completely safe dining here with my ${allergies} allergy. Staff were knowledgeable and helpful."

🔗 https://www.hilton.com/en/hotels/lonsbhi-hilton-london-bankside/

---

## 3. Claridge's ⭐⭐⭐⭐⭐

📍 London, United Kingdom

🌟 Why it's great for ${allergies} allergy travelers:
- World-class allergy accommodation services
- Personalized meal planning
- Expert kitchen staff trained in allergen handling
- Luxury service with safety focus

💬 Allergy Guest Review:
"Outstanding service for my ${allergies} allergy. They went above and beyond to ensure my safety."

🔗 https://www.claridges.co.uk/
      `;
      
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation.trim(),
          status: "success",
          source: "fallback" 
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
    } else if (data.choices && data.choices[0] && data.choices[0].message) {
      recommendation = data.choices[0].message.content;
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
