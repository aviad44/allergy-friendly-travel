
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    // Parse request body
    const { userInput, systemPrompt, model = "gpt-4o", temperature = 0.7, max_tokens = 2000 } = await req.json();
    
    console.log('✅ Processing chat request with input:', { 
      inputPreview: userInput.substring(0, 50) + (userInput.length > 50 ? '...' : ''),
      model,
      temperature,
      max_tokens
    });

    // Default system prompt if none provided
    const defaultSystemPrompt = "You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. Your responses must be highly detailed and structured, always including:\n\n1️⃣ **Hotel Name**\n2️⃣ **City & Country**\n3️⃣ **Star Rating (⭐ Rating based on guest reviews)**\n4️⃣ **Exact Address**\n5️⃣ **Why This Hotel is Suitable for Allergy Sufferers (list specific allergy-friendly features like nut-free kitchens, dedicated allergy-trained staff, buffet labeling, hypoallergenic bedding, etc.)**\n6️⃣ **Direct Booking Links to:**\n   - The Hotel's Official Website (🔗 Hotel Website)\n   - Booking.com (🔗 Book on Booking.com)\n7️⃣ **Authentic Guest Reviews with Star Ratings (🗣 Guest Review: \"Example review\" — ⭐⭐⭐⭐⭐)**\n8️⃣ **Nearby Allergy-Friendly Restaurants (list at least 2-3 restaurants that accommodate dietary restrictions)**\n9️⃣ **General Allergy Safety Tips for Travelers in this Destination**\n\n✅ **Important Formatting Rules:**\n- Always use structured bullet points for clarity.\n- Never omit star ratings, guest reviews, or booking links.\n- If guest reviews are not available, generate a plausible review based on verified guest experiences.\n- If no dedicated nut-free restaurants are available, recommend general allergy-aware dining options.\n- Maintain consistent hotel ranking order based on suitability.\n\nThe goal is to ensure that users receive hotel recommendations as rich and structured as those provided in ChatGPT's Custom GPT.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt || defaultSystemPrompt
          },
          { role: 'user', content: userInput }
        ],
        temperature: temperature,
        max_tokens: max_tokens,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ Received response from OpenAI');
    console.log('✅ Response length:', data.choices[0].message.content.length);
    console.log('✅ Token usage:', {
      prompt_tokens: data.usage?.prompt_tokens || 'unknown',
      completion_tokens: data.usage?.completion_tokens || 'unknown',
      total_tokens: data.usage?.total_tokens || 'unknown'
    });
    
    // Check if response includes guest reviews
    const content = data.choices[0].message.content;
    console.log('✅ Response first 100 chars:', content.substring(0, 100));
    console.log('✅ Response last 100 chars:', content.substring(content.length - 100));
    
    // Check for guest reviews section
    const hasGuestReviews = content.includes("Guest Review") || content.includes("🗣");
    console.log('✅ Contains guest reviews:', hasGuestReviews);
    
    // Check for restaurants section
    const hasRestaurants = content.includes("Nearby Allergy-Friendly Restaurants") || 
                           content.includes("Allergy-Friendly Restaurants") ||
                           content.includes("Restaurants");
    console.log('✅ Contains restaurants section:', hasRestaurants);
    
    // Check if response was likely truncated
    const isLikelyTruncated = !content.includes("General Allergy Safety Tips") || 
                             !hasGuestReviews || 
                             !hasRestaurants;
    console.log('✅ Response likely truncated:', isLikelyTruncated);

    return new Response(
      JSON.stringify({ 
        result: data.choices[0].message.content,
        tokenUsage: data.usage,
        isComplete: !isLikelyTruncated
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in openai-proxy function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
