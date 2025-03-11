
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { destination, allergies } = await req.json();
    console.log('Received search request for:', { destination, allergies });
    try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
        throw new Error('OpenAI API key is not configured');
    }

    const { destination, allergies } = await req.json();
    console.log('📌 Received search request for:', { destination, allergies }); // ✅ הדפסה לוודא שהפרמטרים התקבלו

    // ✅ יצירת השאילתה שנשלחת ל-GPT
    const payload = {
        model: "gpt-4-turbo",
        messages: [
            { role: "system", content: "You are a travel assistant specializing in allergy-friendly hotels." },
            { role: "user", content: `Find 3-5 hotels in ${destination} suitable for guests with ${allergies} allergies. Include:
              - Hotel name and website link
              - Allergy-friendly features (e.g., dairy-free menu, no cross-contamination)
              - Guest reviews from people with allergies
              - Booking links
              Be concise but include essential details.` }
        ],
        temperature: 0.3,
        max_tokens: 1500,
    };

    console.log("📤 Sending to GPT:", JSON.stringify(payload, null, 2)); // ✅ הדפסת השאילתה שנשלחת ל-GPT

    // ✅ שליחת השאילתה ל-GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("❌ OpenAI API Error:", error);
        throw new Error(error.error.message || 'Failed to get hotel recommendations');
    }

    const data = await response.json();
    console.log("✅ OpenAI Response:", data.choices[0].message.content); // ✅ הדפסת התגובה שה-GPT מחזיר

// ✅ הדפסת מה שנשלח ל-GPT לפני שליחת הבקשה

// 🔹 שליחת הבקשה ל-GPT
console.log("📤 Sending to GPT:", JSON.stringify({
    model: "gpt-4-turbo",
    messages: [
        { role: "system", content: "You are a travel assistant specializing in allergy-friendly hotels." },
        { role: "user", content: `Find 3-5 hotels in ${destination} suitable for guests with ${allergies} allergies. Include:
          - Hotel name and website link
          - Allergy-friendly features (e.g., dairy-free menu, no cross-contamination)
          - Guest reviews from people with allergies
          - Booking links
          Be concise but include essential details.` }
    ],
    temperature: 0.3,
    max_tokens: 1500,
}, null, 2));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful travel assistant that specializes in finding allergy-friendly hotels.
            Your task is to provide real, accurate hotel recommendations for people with specific allergies.
            
            Respond with exactly 3 hotel recommendations in this format:
            
            1. Hotel Name | https://www.booking.com/hotel/real-hotel-url-if-available
            - Feature about allergy accommodation (be specific about how they handle the user's exact allergy)
            - Staff training for allergy awareness
            - Special dining options related to the allergy
            - Room features that help with allergy management
            
            2. Second Hotel | https://www.hotels.com/real-hotel-url-if-available
            - Feature 1 about allergy accommodations
            - Feature 2 about kitchen protocols
            - Feature 3 about room cleaning for allergies
            - Feature 4 about medical support if needed
            
            3. Third Hotel | https://www.expedia.com/real-hotel-url-if-available
            - Feature 1
            - Feature 2
            - Feature 3
            - Feature 4
            
            Be accurate, helpful, and focus on hotels that genuinely accommodate the specific allergies mentioned.`
          },
          {
            role: 'user',
            content: `I'm looking for hotels in ${destination} that are suitable for people with ${allergies} allergies. Please recommend 3 hotels that are best for managing these specific allergies, with details about their allergy-friendly features and policies.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(error.error?.message || 'Failed to get hotel recommendations');
    }

    const data = await response.json();
    console.log('OpenAI Response:', data.choices[0].message.content);

    return new Response(
      JSON.stringify({ 
        recommendation: data.choices[0].message.content,
        status: 'success'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in search-with-gpt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
