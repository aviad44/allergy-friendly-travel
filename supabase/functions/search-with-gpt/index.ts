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
    // קבל נתונים מהקליינט
    const { destination, allergies } = await req.json();

    if (!destination || !allergies) {
      return new Response(JSON.stringify({ error: "Missing destination or allergies" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // קח את ה-API KEY מהסביבה (הגדר בסודית Supabase)
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // קריאה ל-OpenAI GPT-3.5-Turbo (הכי משתלם)
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // אפשר להחליף ל-gpt-4o אם רוצים יקר ומדויק יותר
        messages: [
          {
            role: "system",
            content: `
You are a travel assistant specializing in allergy-friendly hotels worldwide.

REQUIREMENTS:
- Find 8-10 REAL hotels that accommodate the specified allergies in the requested destination
- Include budget, mid-range, and luxury options when possible
- Only provide EXISTING hotels with verified allergy-friendly features
- If destination is not in English, search by both local and English names
- For destinations like Israel/ישראל, search Tel Aviv, Jerusalem, and other major cities

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

IMPORTANT: Always find hotels even for less common destinations. Research thoroughly.
`
          },
          {
            role: "user",
            content: `Find 8-10 allergy-friendly hotels in ${destination} that accommodate guests with ${allergies} allergies.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1200,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.json();
      return new Response(JSON.stringify({ error: err.error?.message || "OpenAI API error" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content || "";

    // בינתיים נחזיר רק את התשובה של GPT כטקסט (אפשר להוסיף parsing בהמשך)
    return new Response(JSON.stringify({ hotelsMarkdown: content }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});