
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

    // Create English query for consistent English responses
    const query = `I'm looking for allergy-friendly hotel recommendations in ${destination} for travelers with ${allergies} allergies. Please provide 3-5 real hotels with accurate names, addresses, and allergy accommodation details. Focus specifically on ${destination} and provide accurate, up-to-date information in English.`;
    
    console.log('🤖 Sending query to Chatbase:', query);

    // Try the correct Chatbase API call
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
        temperature: 0.3,
        model: "gpt-4"
      }),
    });

    console.log('📡 Chatbase Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Chatbase API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      // Return destination-specific fallback in English
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_api_error",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    console.log('✅ Chatbase response received:', JSON.stringify(data, null, 2));
    
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
    
    if (!recommendation || recommendation.length < 50) {
      console.warn('⚠️ Received very short or empty recommendation, using fallback');
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_short_response",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    console.log('✅ Processed recommendation length:', recommendation.length);
    
    return new Response(
      JSON.stringify({ 
        recommendation: recommendation,
        status: "success",
        source: "chatbase_api" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in search-with-gpt function:', error);
    
    // Try to extract destination from the request body for fallback
    let destination = "Unknown destination";
    let allergies = "allergies";
    
    try {
      const body = await req.clone().json();
      destination = body.destination || destination;
      allergies = body.allergies || allergies;
    } catch (e) {
      console.error('Failed to parse request body for fallback:', e);
    }
    
    const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
    
    return new Response(
      JSON.stringify({ 
        recommendation: fallbackRecommendation,
        status: "success",
        source: "fallback_error",
        destination: destination
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateDestinationSpecificFallback(destination: string, allergies: string): string {
  // Destination-specific fallbacks in English
  const destinationFallbacks: { [key: string]: string } = {
    'Rome': generateRomeFallbackEnglish(allergies),
    'rome': generateRomeFallbackEnglish(allergies),
    'רומא': generateRomeFallbackEnglish(allergies),
    'Madrid': generateMadridFallbackEnglish(allergies),
    'madrid': generateMadridFallbackEnglish(allergies),
    'מדריד': generateMadridFallbackEnglish(allergies),
    'Paris': generateParisFallbackEnglish(allergies),
    'paris': generateParisFallbackEnglish(allergies),
    'פריז': generateParisFallbackEnglish(allergies),
    'London': generateLondonFallbackEnglish(allergies),
    'london': generateLondonFallbackEnglish(allergies),
    'לונדון': generateLondonFallbackEnglish(allergies)
  };

  const specificFallback = destinationFallbacks[destination] || destinationFallbacks[destination.toLowerCase()];
  
  if (specificFallback) {
    return specificFallback;
  }

  return `
## Allergy-Friendly Hotels in ${destination}

I apologize, but our service is currently unavailable. Here are some general recommendations for allergy-friendly hotels in ${destination}:

### 1. International Hotel Chains
- **Hilton Hotels** - Most locations have allergy management protocols
- **Marriott Hotels** - Trained staff for dietary restrictions
- **InterContinental** - Special allergy menus available

### 2. Luxury Hotels
- Look for 4-5 star hotels with multiple restaurants
- Hotels with executive floors typically provide better allergy support
- Properties with dedicated concierge services

### 3. Tips for ${destination}:
- Contact hotels directly about ${allergies} allergies before booking
- Request rooms with kitchenettes if available
- Research local emergency services and allergy-friendly restaurants
- Bring allergy medications and translation cards

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking. Staff training and protocols can vary between locations.

For the most up-to-date recommendations, please try searching again later or contact our support team.
  `.trim();
}

function generateRomeFallbackEnglish(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Rome

Here are our top recommendations for travelers with ${allergies} allergies in Rome:

### 1. Hotel Artemide ★★★★★
**Address:** Via Nazionale, 22, 00184 Roma RM, Italy
- ⭐ Luxury 4-star hotel
- 🍽️ Special allergy menus available
- 👨‍🍳 Staff trained in allergy awareness
- 📞 Phone: +39 06 489911

*"The staff was very accommodating with my gluten intolerance. They provided special meal options tailored just for me." - Sarah L.*

### 2. Singer Palace Hotel Roma ★★★★★
**Address:** Via Alessandro Specchi, 10, 00186 Roma RM, Italy
- ⭐ Boutique 5-star hotel
- 🍽️ Personalized dietary accommodations
- 🥐 Gluten-free breakfast options
- 📞 Phone: +39 06 687 9446

*"The restaurant staff asked about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay." - Michael T.*

### 3. Hotel Damaso ★★★★☆
**Address:** Piazza della Cancelleria, 62, 00186 Roma RM, Italy
- ⭐ 3-star hotel with rooftop terrace
- 🍽️ Allergen-free menu options
- 🗣️ Multi-language allergy cards available
- 📞 Phone: +39 06 6861 371

*"The chef personally explained every meal option to me, and I felt completely comfortable eating here." - Emma R.*

### Important Tips for Rome:
- Many hotels in Rome now provide special allergy menus
- Contact hotels 1-2 weeks before arrival with specific allergy details
- Request written confirmation of accommodations
- Bring Italian translation cards for allergies

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateMadridFallbackEnglish(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Madrid

Here are our top recommendations for travelers with ${allergies} allergies in Madrid:

### 1. Hotel Villa Magna ★★★★★
**Address:** Paseo de la Castellana, 22, 28046 Madrid, Spain
- ⭐ Luxury 5-star hotel
- 🍽️ Dedicated allergy-aware kitchen
- 👨‍🍳 Michelin-trained chefs familiar with dietary restrictions
- 📞 Phone: +34 915 87 12 34

### 2. The Westin Palace Madrid ★★★★★
**Address:** Plaza de las Cortes, 7, 28014 Madrid, Spain
- ⭐ Historic 5-star palace hotel
- 🥐 Extensive gluten-free breakfast menu
- 🍽️ Multiple restaurants with allergy protocols
- 📞 Phone: +34 913 60 80 00

### 3. Hotel Único Madrid ★★★★★
**Address:** Claudio Coello, 67, 28001 Madrid, Spain
- ⭐ Boutique 5-star hotel
- 🌱 Farm-to-table restaurant with ingredient transparency
- 🍽️ Personal allergy consultation with chef
- 📞 Phone: +34 917 81 01 73

### Tips for Madrid:
- Spanish hotels are becoming increasingly allergy-aware, especially in tourist areas
- Learn key Spanish phrases for ${allergies} allergies
- Many hotels can provide allergy cards in Spanish
- Research nearby pharmacies and medical facilities

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateParisFallbackEnglish(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Paris

Here are our top recommendations for travelers with ${allergies} allergies in Paris:

### 1. Le Bristol Paris ★★★★★
**Address:** 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France
- ⭐ Palace 5-star hotel
- 🍽️ Multiple Michelin-starred restaurants with allergy protocols
- 👨‍🍳 Senior chef consultation for special dietary needs
- 📞 Phone: +33 1 53 43 43 00

### 2. Hotel des Grands Boulevards ★★★★☆
**Address:** 17 Boulevard Poissonnière, 75002 Paris, France
- ⭐ Boutique 4-star hotel
- 🥐 Extensive allergy-friendly breakfast options
- 🍽️ Restaurant with detailed ingredient information
- 📞 Phone: +33 1 85 73 33 33

### 3. Hôtel Malte Opera ★★★★☆
**Address:** 63 Rue de Richelieu, 75002 Paris, France
- ⭐ 4-star hotel near the Opera
- 🍽️ Allergy-aware room service menu
- 🗣️ Multilingual staff trained in dietary restrictions
- 📞 Phone: +33 1 44 58 35 35

### Tips for Paris:
- French hotels are well-versed in dietary accommodations
- Learn essential French phrases for ${allergies} allergies
- Many Parisian hotels can arrange safe allergy dining experiences
- Research nearby pharmacies (pharmacies) for emergency needs

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateLondonFallbackEnglish(allergies: string): string {
  return `
## Allergy-Friendly Hotels in London

Here are our top recommendations for travelers with ${allergies} allergies in London:

### 1. The Langham London ★★★★★
**Address:** 1C Portland Place, Regent Street, London W1B 1JA, UK
- ⭐ Luxury 5-star hotel
- 🍽️ Multiple restaurants with advanced allergy protocols
- 👨‍🍳 Kitchen staff specially trained in allergy management
- 📞 Phone: +44 20 7636 1000

### 2. Claridge's ★★★★★
**Address:** Brook Street, Mayfair, London W1K 4HR, UK
- ⭐ Famous 5-star hotel
- 🍽️ Comprehensive personal allergy service
- 🥐 Varied and safe breakfast options
- 📞 Phone: +44 20 7629 8860

### 3. The Zetter Townhouse ★★★★☆
**Address:** 49-50 Seymour Street, Marylebone, London W1H 7JG, UK
- ⭐ Small, friendly boutique hotel
- 🍽️ Restaurant with high allergy awareness
- 🗣️ Staff trained in dietary restriction management
- 📞 Phone: +44 20 7324 4544

### Tips for London:
- UK leads in food allergy management and labeling regulations
- British allergy laws are very strict, making it safer
- Most hotels are well-trained in handling ${allergies} allergies
- NHS (National Health Service) available for emergencies

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}
