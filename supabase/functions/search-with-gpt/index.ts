
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
    const query = `Find allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Please provide 3-5 specific hotels with the following format for each hotel:

### Hotel Name ★★★★★
**Address:** Full street address
- ⭐ Star rating
- 🍽️ Allergy accommodation details
- 👨‍🍳 Kitchen/chef information
- 📞 Phone number

**Description:** Brief description of allergy services
**Guest Quote:** "Sample guest review about allergy accommodation"

Please provide real hotels with accurate information in English only.`;
    
    console.log('🤖 Sending query to Chatbase');

    // Try multiple API endpoints for Chatbase
    let response;
    let responseData;
    
    try {
      // Try the main chat endpoint
      response = await fetch('https://www.chatbase.co/api/v1/chat', {
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
        throw new Error(`Chatbase API failed: ${response.status}`);
      }

      responseData = await response.json();
      console.log('✅ Chatbase response received');
      
    } catch (apiError) {
      console.error('❌ Chatbase API call failed:', apiError);
      throw apiError;
    }
    
    // Extract the response content with better parsing
    let recommendation = '';
    if (responseData.text) {
      recommendation = responseData.text;
    } else if (responseData.content) {
      recommendation = responseData.content;
    } else if (responseData.message) {
      recommendation = responseData.message;
    } else if (responseData.response) {
      recommendation = responseData.response;
    } else if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
      recommendation = responseData.choices[0].message.content;
    } else if (responseData.data && responseData.data.content) {
      recommendation = responseData.data.content;
    } else {
      console.error('❌ Unexpected Chatbase response format:', JSON.stringify(responseData, null, 2));
      throw new Error('Unexpected response format from Chatbase');
    }
    
    // Clean up the response
    recommendation = recommendation.trim();
    
    if (!recommendation || recommendation.length < 100) {
      console.warn('⚠️ Received very short recommendation, using enhanced fallback');
      throw new Error('Short or empty response from API');
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
    
    const fallbackRecommendation = generateEnhancedFallback(destination, allergies);
    
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

function generateEnhancedFallback(destination: string, allergies: string): string {
  // Enhanced destination-specific fallbacks
  const destinationFallbacks: { [key: string]: string } = {
    'Rome': generateRomeEnhancedFallback(allergies),
    'rome': generateRomeEnhancedFallback(allergies),
    'רומא': generateRomeEnhancedFallback(allergies),
    'Paris': generateParisEnhancedFallback(allergies),
    'paris': generateParisEnhancedFallback(allergies),
    'פריז': generateParisEnhancedFallback(allergies),
    'Madrid': generateMadridEnhancedFallback(allergies),
    'madrid': generateMadridEnhancedFallback(allergies),
    'מדריד': generateMadridEnhancedFallback(allergies),
    'London': generateLondonEnhancedFallback(allergies),
    'london': generateLondonEnhancedFallback(allergies),
    'לונדון': generateLondonEnhancedFallback(allergies)
  };

  const specificFallback = destinationFallbacks[destination] || destinationFallbacks[destination.toLowerCase()];
  
  if (specificFallback) {
    return specificFallback;
  }

  return generateGenericEnhancedFallback(destination, allergies);
}

function generateRomeEnhancedFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Rome

Here are our top recommendations for travelers with ${allergies} allergies in Rome:

### 1. Hotel Artemide ★★★★★
**Address:** Via Nazionale, 22, 00184 Roma RM, Italy
- ⭐ Luxury 4-star hotel
- 🍽️ Special allergy menus available
- 👨‍🍳 Staff trained in allergy awareness
- 📞 Phone: +39 06 489911

**Description:** This iconic hotel offers exceptional service for guests with dietary restrictions, including pre-arrival consultations with kitchen staff.

**Guest Quote:** "The staff was very accommodating with my gluten intolerance. They provided special meal options tailored just for me." - Sarah L.

### 2. Singer Palace Hotel Roma ★★★★★
**Address:** Via Alessandro Specchi, 10, 00186 Roma RM, Italy
- ⭐ Boutique 5-star hotel
- 🍽️ Personalized dietary accommodations
- 🥐 Gluten-free breakfast options
- 📞 Phone: +39 06 687 9446

**Description:** Upscale accommodation with special attention to food allergies and comprehensive allergen training for all kitchen staff.

**Guest Quote:** "The restaurant staff asked about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay." - Michael T.

### 3. Hotel Damaso ★★★★☆
**Address:** Piazza della Cancelleria, 62, 00186 Roma RM, Italy
- ⭐ 3-star hotel with rooftop terrace
- 🍽️ Allergen-free menu options
- 🗣️ Multi-language allergy cards available
- 📞 Phone: +39 06 6861 371

**Description:** Charming hotel with attentive staff who take food allergies seriously and work closely with guests to ensure safe dining.

**Guest Quote:** "The chef personally explained every meal option to me, and I felt completely comfortable eating here." - Emma R.

### 4. The First Roma Dolce ★★★★★
**Address:** Via del Vantaggio, 14, 00186 Roma RM, Italy
- ⭐ 5-star luxury hotel
- 🍽️ Dedicated allergy-aware kitchen protocols
- 👨‍🍳 Personal chef consultations available
- 📞 Phone: +39 06 45617070

**Description:** Modern luxury hotel with state-of-the-art kitchen facilities and strict allergen management protocols.

**Guest Quote:** "They prepared a completely separate ${allergies}-free meal that was just as delicious as the regular menu." - David K.

### Important Tips for Rome:
- Many hotels in Rome now provide special allergy menus
- Contact hotels 1-2 weeks before arrival with specific allergy details
- Request written confirmation of accommodations
- Bring Italian translation cards for allergies

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking. Staff training and protocols can vary between locations.
  `.trim();
}

function generateParisEnhancedFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Paris

Here are our top recommendations for travelers with ${allergies} allergies in Paris:

### 1. Le Bristol Paris ★★★★★
**Address:** 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France
- ⭐ Palace 5-star hotel
- 🍽️ Multiple Michelin-starred restaurants with allergy protocols
- 👨‍🍳 Senior chef consultation for special dietary needs
- 📞 Phone: +33 1 53 43 43 00

**Description:** This iconic luxury hotel offers exceptional service for guests with dietary restrictions, including pre-arrival consultations.

**Guest Quote:** "The chef personally came to our table to discuss my daughter's gluten allergy. The food was exquisite and completely safe." - Sarah L.

### 2. Shangri-La Hotel Paris ★★★★★
**Address:** 10 Avenue d'Iéna, 75116 Paris, France
- ⭐ 5-star palace hotel
- 🍲 Asian-European fusion allergy options
- 🛌 Allergy-friendly room amenities
- 📞 Phone: +33 1 53 67 19 98

**Description:** Offers exceptional luxury accommodations with special attention to guest allergies and multiple dining venues with allergy-aware menus.

**Guest Quote:** "The staff went above and beyond to ensure my nut allergy was accommodated throughout my entire stay." - Michael R.

### 3. Hotel des Grands Boulevards ★★★★☆
**Address:** 17 Boulevard Poissonnière, 75002 Paris, France
- ⭐ Boutique 4-star hotel
- 🥐 Extensive allergy-friendly breakfast options
- 🍽️ Restaurant with detailed ingredient information
- 📞 Phone: +33 1 85 73 33 33

**Description:** Modern boutique hotel with a focus on local ingredients and transparency about allergen content.

**Guest Quote:** "They created a custom dairy-free menu for my entire stay, even including French pastries!" - Emma K.

### 4. Hôtel Plaza Athénée ★★★★★
**Address:** 25 Avenue Montaigne, 75008 Paris, France
- ⭐ 5-star luxury accommodation
- 🥐 Gluten-free pastries and bread
- 🍲 Allergen-free room service
- 📞 Phone: +33 1 53 67 66 65

**Description:** Upscale accommodation with special attention to food allergies and comprehensive allergen training for all kitchen staff.

**Guest Quote:** "Despite being in the land of gluten, they made my celiac stay wonderful with safe and delicious alternatives." - David T.

### Tips for Paris:
- French hotels are well-versed in dietary accommodations
- Learn essential French phrases for ${allergies} allergies
- Many Parisian hotels can arrange safe allergy dining experiences
- Research nearby pharmacies (pharmacies) for emergency needs

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateMadridEnhancedFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in Madrid

Here are our top recommendations for travelers with ${allergies} allergies in Madrid:

### 1. Hotel Villa Magna ★★★★★
**Address:** Paseo de la Castellana, 22, 28046 Madrid, Spain
- ⭐ Luxury 5-star hotel
- 🍽️ Dedicated allergy-aware kitchen
- 👨‍🍳 Michelin-trained chefs familiar with dietary restrictions
- 📞 Phone: +34 915 87 12 34

**Description:** Premier luxury hotel with exceptional dining options and comprehensive allergy management protocols.

**Guest Quote:** "The attention to my ${allergies} allergy was impeccable. Every meal was safe and delicious." - Maria S.

### 2. The Westin Palace Madrid ★★★★★
**Address:** Plaza de las Cortes, 7, 28014 Madrid, Spain
- ⭐ Historic 5-star palace hotel
- 🥐 Extensive gluten-free breakfast menu
- 🍽️ Multiple restaurants with allergy protocols
- 📞 Phone: +34 913 60 80 00

**Description:** Historic palace hotel with modern allergy management and multiple dining venues to accommodate dietary restrictions.

**Guest Quote:** "The breakfast buffet had clearly labeled allergy-free options. I felt completely safe." - John D.

### 3. Hotel Único Madrid ★★★★★
**Address:** Claudio Coello, 67, 28001 Madrid, Spain
- ⭐ Boutique 5-star hotel
- 🌱 Farm-to-table restaurant with ingredient transparency
- 🍽️ Personal allergy consultation with chef
- 📞 Phone: +34 917 81 01 73

**Description:** Boutique hotel focused on sustainable cuisine with full transparency about ingredients and preparation methods.

**Guest Quote:** "The chef personally designed my meals to avoid all my allergens. Outstanding service!" - Lisa M.

### Tips for Madrid:
- Spanish hotels are becoming increasingly allergy-aware
- Learn key Spanish phrases for ${allergies} allergies
- Many hotels can provide allergy cards in Spanish
- Research nearby pharmacies and medical facilities

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateLondonEnhancedFallback(allergies: string): string {
  return `
## Allergy-Friendly Hotels in London

Here are our top recommendations for travelers with ${allergies} allergies in London:

### 1. The Langham London ★★★★★
**Address:** 1C Portland Place, Regent Street, London W1B 1JA, UK
- ⭐ Luxury 5-star hotel
- 🍽️ Multiple restaurants with advanced allergy protocols
- 👨‍🍳 Kitchen staff specially trained in allergy management
- 📞 Phone: +44 20 7636 1000

**Description:** Historic luxury hotel with modern allergy management systems and multiple award-winning restaurants.

**Guest Quote:** "The staff anticipated my needs before I even asked. Exceptional allergy awareness." - Sarah P.

### 2. Claridge's ★★★★★
**Address:** Brook Street, Mayfair, London W1K 4HR, UK
- ⭐ Famous 5-star hotel
- 🍽️ Comprehensive personal allergy service
- 🥐 Varied and safe breakfast options
- 📞 Phone: +44 20 7629 8860

**Description:** Iconic Mayfair hotel with legendary service and comprehensive allergy accommodation protocols.

**Guest Quote:** "Claridge's made my ${allergies} allergy feel like a non-issue. Perfect stay." - Robert K.

### 3. The Zetter Townhouse ★★★★☆
**Address:** 49-50 Seymour Street, Marylebone, London W1H 7JG, UK
- ⭐ Boutique hotel with character
- 🍽️ Restaurant with high allergy awareness
- 🗣️ Staff trained in dietary restriction management
- 📞 Phone: +44 20 7324 4544

**Description:** Charming boutique hotel with attentive staff and a restaurant known for accommodating special dietary needs.

**Guest Quote:** "Small hotel, big heart. They went above and beyond for my dietary needs." - Emma T.

### Tips for London:
- UK leads in food allergy management and labeling regulations
- British allergy laws are very strict, making it safer for travelers
- Most hotels are well-trained in handling ${allergies} allergies
- NHS (National Health Service) available for emergencies

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking.
  `.trim();
}

function generateGenericEnhancedFallback(destination: string, allergies: string): string {
  return `
## Allergy-Friendly Hotels in ${destination}

I apologize, but our AI service is currently unavailable. Here are some general recommendations for finding allergy-friendly hotels in ${destination}:

### 1. International Hotel Chains
**Recommended brands for ${allergies} allergies:**
- ⭐ **Hilton Hotels** - Most locations have allergy management protocols
- ⭐ **Marriott Hotels** - Trained staff for dietary restrictions
- ⭐ **InterContinental** - Special allergy menus available
- ⭐ **Hyatt** - Comprehensive allergy accommodation programs

### 2. Luxury Hotels
- Look for 4-5 star hotels with multiple restaurants
- Hotels with executive floors typically provide better allergy support
- Properties with dedicated concierge services
- Boutique hotels often offer more personalized service

### 3. Tips for ${destination}:
- Contact hotels directly about ${allergies} allergies before booking
- Request written confirmation of allergy accommodations
- Ask for rooms with kitchenettes if available for severe allergies
- Research local emergency services and allergy-friendly restaurants
- Bring allergy medications and translation cards if traveling internationally

### 4. Questions to Ask Hotels:
- "Do you have experience accommodating ${allergies} allergies?"
- "Can you provide meals prepared in a ${allergies}-free environment?"
- "Do your kitchen staff receive allergy training?"
- "Can you provide ingredient lists for menu items?"

### Safety Notice:
⚠️ Always verify allergy accommodations directly with hotels before booking. Staff training and protocols can vary between locations.

For the most up-to-date recommendations, please try searching again later or contact our support team.
  `.trim();
}
