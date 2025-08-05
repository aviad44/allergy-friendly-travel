import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🚀 Edge Function started!');
  
  if (req.method === 'OPTIONS') {
    console.log('✅ Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📋 Request method:', req.method);
    console.log('📋 Request URL:', req.url);
    
    const requestData = await req.json();
    console.log('📨 Received data:', requestData);
    
    const { destination, allergies } = requestData;
    
    if (!destination || !allergies) {
      console.log('❌ Missing required data');
      return new Response(JSON.stringify({ 
        error: "Missing destination or allergies",
        received: { destination, allergies }
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    console.log('🔑 API Key exists:', !!OPENAI_API_KEY);
    console.log('🔑 API Key length:', OPENAI_API_KEY?.length || 0);
    
    if (!OPENAI_API_KEY) {
      console.log('❌ No OpenAI API key found');
      return new Response(JSON.stringify({ 
        error: "OpenAI API key not configured",
        hint: "Set OPENAI_API_KEY in Supabase secrets"
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('🚀 Making OpenAI request...');
    
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a travel assistant specializing in allergy-friendly hotels worldwide.

Find 8-10 REAL hotels that accommodate the specified allergies in the requested destination.
Include budget, mid-range, and luxury options when possible.
Only provide EXISTING hotels with verified allergy-friendly features.

FORMAT (EXACT):

## 1. [Hotel Name] ⭐⭐⭐⭐

📍 [City, Country]

🌟 Allergy-friendly features for [allergy type]:
- [Feature 1]
- [Feature 2] 
- [Feature 3]

💬 Guest Review: "[Guest review about allergy experience]"

💰 Price Range: [Budget/Mid-Range/Luxury]

🔗 [Booking URL or hotel website]

---

IMPORTANT: Always find hotels even for less common destinations. Research thoroughly.`
          },
          {
            role: "user",
            content: `Find 8-10 allergy-friendly hotels in ${destination} that accommodate guests with ${allergies} allergies.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    console.log('📡 OpenAI response status:', openaiResponse.status);

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.log('❌ OpenAI API error:', errorData);
      return new Response(JSON.stringify({ 
        error: "OpenAI API error",
        details: errorData.error?.message || "Unknown OpenAI error"
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData.choices?.[0]?.message?.content || "";
    
    console.log('✅ OpenAI success! Content length:', content.length);

    return new Response(JSON.stringify({ 
      hotelsMarkdown: content,
      success: true 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Edge Function error:', error);
    return new Response(JSON.stringify({ 
      error: "Edge Function error",
      message: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});