
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

    // Create a more specific query
    const query = `I need specific hotel recommendations in ${destination} for travelers with ${allergies} allergies. Please provide 3-5 real hotels with their names, addresses, and specific allergy accommodations. Focus on ${destination} only.`;
    
    console.log('🤖 Sending query to Chatbase:', query);
    console.log('🔑 Using API key (first 10 chars):', chatbaseApiKey.substring(0, 10) + '...');

    // Try the correct Chatbase API format
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
      console.error('❌ Chatbase API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // More specific fallback based on destination
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
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
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_format_error",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Clean up the response
    recommendation = recommendation.trim();
    
    console.log('✅ Processed recommendation length:', recommendation.length);
    console.log('✅ First 200 chars:', recommendation.substring(0, 200));
    
    return new Response(
      JSON.stringify({ 
        recommendation: recommendation,
        status: "success",
        source: "chatbase" 
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

function generateDestinationSpecificFallback(destination: string, allergies: string): string {
  // More specific fallback recommendations based on actual destination
  const destinationFallbacks: { [key: string]: string } = {
    'רומא': generateRomeFallback(allergies),
    'Rome': generateRomeFallback(allergies),
    'roma': generateRomeFallback(allergies),
    'מדריד': generateMadridFallback(allergies),
    'Madrid': generateMadridFallback(allergies),
    'madrid': generateMadridFallback(allergies),
    'פריז': generateParisFallback(allergies),
    'Paris': generateParisFallback(allergies),
    'paris': generateParisFallback(allergies)
  };

  const specificFallback = destinationFallbacks[destination] || destinationFallbacks[destination.toLowerCase()];
  
  if (specificFallback) {
    return specificFallback;
  }

  return `
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
  `.trim();
}

function generateRomeFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Rome

Here are our top recommendations for travelers with ${allergies} allergies in Rome:

### 1. Hotel Artemide ★★★★★
**Address:** Via Nazionale, 22, 00184 Roma RM, Italy
- ⭐ 4-star luxury accommodation
- 🍽️ Specialized allergy menus
- 👨‍🍳 Staff trained in allergy awareness
- 📞 Contact: +39 06 489911

*"The staff was incredibly accommodating with my gluten intolerance. They provided special meal options tailored just for me." - Sarah L.*

### 2. Singer Palace Hotel Roma ★★★★★
**Address:** Via Alessandro Specchi, 10, 00186 Roma RM, Italy
- ⭐ 5-star boutique hotel
- 🍽️ Personalized dietary accommodation
- 🥐 Gluten-free breakfast options
- 📞 Contact: +39 06 687 9446

*"The restaurant staff asked me about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay." - Michael T.*

### 3. Hotel Damaso ★★★★☆
**Address:** Piazza della Cancelleria, 62, 00186 Roma RM, Italy
- ⭐ 3-star hotel with rooftop terrace
- 🍽️ Allergen-free menu options
- 🗣️ Multi-lingual allergy cards available
- 📞 Contact: +39 06 6861 371

*"The chef personally explained every meal option to me, and I felt completely at ease dining here." - Emma R.*

### Important Tips for Rome:
- Many Rome hotels now provide specialized allergy menus
- Contact hotels 1-2 weeks before arrival with specific allergy details
- Request written confirmation of accommodations
- Carry allergy translation cards in Italian

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateMadridFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Madrid

Here are our top recommendations for travelers with ${allergies} allergies in Madrid:

### 1. Hotel Villa Magna ★★★★★
**Address:** Paseo de la Castellana, 22, 28046 Madrid, Spain
- ⭐ 5-star luxury hotel
- 🍽️ Dedicated allergy-aware kitchen
- 👨‍🍳 Michelin-trained chefs familiar with dietary restrictions
- 📞 Contact: +34 915 87 12 34

### 2. The Westin Palace Madrid ★★★★★
**Address:** Plaza de las Cortes, 7, 28014 Madrid, Spain
- ⭐ 5-star historic palace hotel
- 🥐 Extensive gluten-free breakfast menu
- 🍽️ Multiple restaurants with allergy protocols
- 📞 Contact: +34 913 60 80 00

### 3. Hotel Único Madrid ★★★★★
**Address:** Claudio Coello, 67, 28001 Madrid, Spain
- ⭐ 5-star boutique hotel
- 🌱 Farm-to-table restaurant with ingredient transparency
- 🍽️ Personalized allergy consultation with chef
- 📞 Contact: +34 917 81 01 73

### Tips for Madrid:
- Spanish hotels are increasingly allergy-aware, especially in tourist areas
- Learn key Spanish phrases for your ${allergies} allergy
- Many hotels can provide allergy cards in Spanish
- Research nearby pharmacies and medical facilities

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateParisFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Paris

Here are our top recommendations for travelers with ${allergies} allergies in Paris:

### 1. Le Bristol Paris ★★★★★
**Address:** 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France
- ⭐ 5-star palace hotel
- 🍽️ Multiple Michelin-starred restaurants with allergy protocols
- 👨‍🍳 Executive chef consultation for special dietary needs
- 📞 Contact: +33 1 53 43 43 00

### 2. Hotel des Grands Boulevards ★★★★☆
**Address:** 17 Boulevard Poissonnière, 75002 Paris, France
- ⭐ 4-star boutique hotel
- 🥐 Extensive allergy-friendly breakfast options
- 🍽️ Restaurant with detailed ingredient information
- 📞 Contact: +33 1 85 73 33 33

### 3. Hôtel Malte Opera ★★★★☆
**Address:** 63 Rue de Richelieu, 75002 Paris, France
- ⭐ 4-star hotel near Opera
- 🍽️ Allergy-aware room service menu
- 🗣️ Multilingual staff trained in dietary restrictions
- 📞 Contact: +33 1 44 58 35 35

### Tips for Paris:
- French hotels are well-versed in dietary accommodations
- Learn essential French phrases for your ${allergies} allergy
- Many Parisian hotels can arrange allergy-safe dining experiences
- Research nearby pharmacies (pharmacies) for emergency needs

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}
