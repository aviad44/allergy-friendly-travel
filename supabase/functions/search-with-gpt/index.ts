import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    const { destination, allergies } = await req.json();
    console.log("✅ Received search request for:", { destination, allergies }); // הדפסת הקלט שהתקבל

    // יצירת השאילתא שנשלחת ל-GPT
    const payload = {
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a travel assistant specializing in allergy-friendly hotels." },
        {
          role: "user",
          content: `Find 3-5 hotels in ${destination} suitable for guests with ${allergies} allergies. Include:
          - Hotel name and website link
          - Allergy-friendly features (e.g., dairy-free menu, no cross-contamination)
          - Guest reviews from people with allergies
          - Booking links
          Be concise but include essential details.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    console.log("📤 Sending to GPT:", JSON.stringify(payload, null, 2)); // ✅ הדפסת השאילתא שנשלחת ל-GPT

    // שליחת הבקשה ל-OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ OpenAI API Error:", error);
      throw new Error(error.error.message || "Failed to get hotel recommendations");
    }

    const data = await response.json();
    console.log("✅ OpenAI Response:", data.choices[0].message.content); // ✅ הדפסת התשובה שהתקבלה מ-GPT

    return new Response(
      JSON.stringify({ recommendation: data.choices[0].message.content, status: "success" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("❌ Error in search-with-gpt function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unexpected error occurred", status: "error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
