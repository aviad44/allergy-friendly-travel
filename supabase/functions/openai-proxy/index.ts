
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

    console.log('⏱️ Function invocation started at:', new Date().toISOString());

    // Parse request body
    const { userInput, systemPrompt, model = "gpt-4o", temperature = 0.7, max_tokens = 2000 } = await req.json();
    
    console.log('✅ Processing chat request with input:', { 
      inputPreview: userInput.substring(0, 50) + (userInput.length > 50 ? '...' : ''),
      systemPromptPreview: systemPrompt?.substring(0, 50) + (systemPrompt?.length > 50 ? '...' : ''),
      model,
      temperature,
      max_tokens
    });

    // Default system prompt if none provided
    const defaultSystemPrompt = "You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. Your responses must be highly detailed and structured, always including:\n\n1️⃣ **Hotel Name**\n2️⃣ **City & Country**\n3️⃣ **Star Rating (⭐ Rating based on guest reviews)**\n4️⃣ **Exact Address**\n5️⃣ **Why This Hotel is Suitable for Allergy Sufferers (list specific allergy-friendly features like nut-free kitchens, dedicated allergy-trained staff, buffet labeling, hypoallergenic bedding, etc.)**\n6️⃣ **Direct Booking Links to:**\n   - The Hotel's Official Website (🔗 Hotel Website)\n   - Booking.com (🔗 Book on Booking.com)\n7️⃣ **Authentic Guest Reviews with Star Ratings (🗣 Guest Review: \"Example review\" — ⭐⭐⭐⭐⭐)**\n8️⃣ **Nearby Allergy-Friendly Restaurants (list at least 2-3 restaurants that accommodate dietary restrictions)**\n9️⃣ **General Allergy Safety Tips for Travelers in this Destination**\n\nThe goal is to ensure that users receive detailed hotel recommendations for safe travel with allergies.";

    console.log('🔄 Sending request to OpenAI API...');
    const startTime = Date.now();

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

    const endTime = Date.now();
    const requestDuration = (endTime - startTime) / 1000;
    console.log(`⏱️ OpenAI API request completed in: ${requestDuration.toFixed(2)}s`);

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
    
    // Clean the response before returning it
    let content = data.choices[0].message.content;
    
    // Process response to remove prompt instructions that might have leaked into the response
    content = content
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response as[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/EXTREMELY IMPORTANT SAFETY REQUIREMENTS:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/For hotels, ONLY include[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/ALL guest reviews MUST be authentic[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/If you're not 100% certain[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Include WARNING notices[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Include EXACT street addresses[\s\S]*?(?=\n\n|$)/g, '');
    
    console.log('✅ Response first 100 chars:', content.substring(0, 100));
    console.log('✅ Response last 100 chars:', content.substring(content.length - 100));
    
    // Enhanced section checking
    const checkSections = {
      'Hotel Name': content.includes("Hotel Name") || content.match(/^\d+\./) !== null || content.match(/\*\*[\w\s]+Hotel[\w\s]+\*\*/) !== null,
      'Star Rating': content.includes("Star Rating") || content.includes("⭐"),
      'Address': content.includes("Address") || content.includes("located at"),
      'Allergy Features': content.includes("Allergy") || content.includes("allergen") || content.includes("gluten") || content.includes("nut-free"),
      'Booking Links': content.includes("Booking") || content.includes("🔗") || content.includes("Official Website"),
      'Guest Reviews': content.includes("Guest Review") || content.includes("🗣") || content.includes("review"),
      'Restaurants': content.includes("Restaurant") || content.includes("dining"),
      'Safety Tips': content.includes("Safety Tips") || content.includes("Safety") || content.includes("Tips for")
    };
    
    console.log('✅ Section check results:', checkSections);
    
    // Check if response was likely truncated based on a more comprehensive set of criteria
    const isLikelyTruncated = 
      !checkSections['Safety Tips'] || 
      !checkSections['Guest Reviews'] || 
      !checkSections['Restaurants'] ||
      (data.usage?.completion_tokens > 1900); // If we're close to the token limit
    
    console.log('✅ Response likely truncated:', isLikelyTruncated);
    console.log('⏱️ Function invocation completed at:', new Date().toISOString());

    return new Response(
      JSON.stringify({ 
        result: content,
        tokenUsage: data.usage,
        isComplete: !isLikelyTruncated,
        sectionCheck: checkSections
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
