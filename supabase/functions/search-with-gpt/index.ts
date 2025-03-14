
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) {
      console.error("❌ OpenAI API key is missing");
      throw new Error("OpenAI API key is not configured");
    }

    const { destination, allergies } = await req.json();
    console.log("✅ Processing search request for:", { destination, allergies });

    // Improved prompt for better, more consistent results
    const payload = {
      model: "gpt-4o-mini", // Using the faster, more cost-effective model
      messages: [
        {
          role: "system",
          content: `You are an expert travel assistant specializing in allergy-friendly hotels. 
          Your task is to provide accurate, structured information about hotels that cater to specific dietary restrictions and allergies.
          Format your response as a clear, structured list with exactly 3-5 hotels.
          For each hotel include:
          - Hotel name with its official website (if available)
          - Key allergy-friendly features (special menus, kitchen practices, staff training)
          - Any special accommodations they make for the specific allergy mentioned
          - One brief but authentic guest review related to allergy handling
          - Any additional safety information

          Present each hotel in a format that's easy to parse programmatically, with each hotel starting with a number followed by the name, then listing features with bullet points.`
        },
        {
          role: "user",
          content: `Find 3-5 highly-rated hotels in ${destination} that are suitable for guests with ${allergies} allergies.`,
        },
      ],
      temperature: 0.5, // Lower temperature for more consistent outputs
      max_tokens: 1000,
    };

    console.log("📤 Sending request to OpenAI");

    // Send request to OpenAI
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
      throw new Error(error.error?.message || "Failed to get hotel recommendations");
    }

    const data = await response.json();
    const gptResponse = data.choices[0]?.message?.content?.trim();

    console.log("✅ Received response from OpenAI");

    return new Response(
      JSON.stringify({ 
        recommendation: gptResponse, 
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("❌ Error in search-with-gpt function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred", 
        status: "error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
