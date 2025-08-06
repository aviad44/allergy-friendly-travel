import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AllergenMatch {
  allergen: string;
  severity: 'high' | 'medium' | 'low';
  items: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { menuText } = await req.json();

    if (!menuText || typeof menuText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Menu text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert allergen detection system for restaurant menus. 

Your task is to analyze menu text and identify potential allergens with high accuracy.

Common allergens to look for:
- Fish (דג, fish, salmon, tuna, cod, sea bass, etc.) - Hebrew: דג, דגים, סלמון, טונה
- Shellfish (שרימפס, crab, lobster, mussels) - Hebrew: שרימפס, סרטנים, לובסטר
- Dairy (חלב, milk, cheese, cream, butter, yogurt) - Hebrew: חלב, גבינה, חמאה, יוגורט, קרם
- Eggs (ביצה, ביצים) - Hebrew: ביצה, ביצים, אומלט
- Tree nuts (אגוזים, almonds, walnuts, cashews, pistachios) - Hebrew: אגוזים, שקדים, אגוזי מלך
- Peanuts (בוטנים, אגוזי אדמה) - Hebrew: בוטנים, אגוזי אדמה
- Wheat/Gluten (חיטה, לחם, פסטה, קמח) - Hebrew: חיטה, לחם, פסטה, קמח, גלוטן
- Soy (סויה, soy sauce, tofu) - Hebrew: סויה, רוטב סויה, טופו
- Sesame (שומשום, tahini, sesame oil) - Hebrew: שומשום, טחינה, שמן שומשום
- Celery (סלרי)
- Mustard (חרדל)
- Sulfites (סולפיטים)

CRITICAL: Pay special attention to Hebrew food terms:
- דג = fish (MAJOR ALLERGEN)
- לברק = sea bass (type of fish - MAJOR ALLERGEN)
- סלמון = salmon (fish - MAJOR ALLERGEN)
- טונה = tuna (fish - MAJOR ALLERGEN)
- שרימפס = shrimp (shellfish - MAJOR ALLERGEN)
- חלב = milk (dairy - MAJOR ALLERGEN)
- גבינה = cheese (dairy - MAJOR ALLERGEN)
- ביצה/ביצים = eggs (MAJOR ALLERGEN)

For each allergen found:
1. Identify the specific allergen
2. Rate severity: high (major allergen), medium (common sensitivity), low (rare sensitivity)  
3. List the specific menu items that contain this allergen

Return ONLY a valid JSON object in this exact format:
{
  "allergens": [
    {
      "allergen": "Fish",
      "severity": "high",
      "items": ["דג לברק", "סלמון גריל"]
    }
  ]
}

If no allergens are found, return: {"allergens": []}

Analyze text in ANY language. Be VERY thorough and check every word against the allergen list above.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this menu text for allergens:\n\n${menuText}` }
        ],
        temperature: 0.1,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response:', aiResponse);

    // Parse the JSON response
    let allergenData;
    try {
      allergenData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      allergenData = { allergens: [] };
    }

    // Validate the response structure
    if (!allergenData.allergens || !Array.isArray(allergenData.allergens)) {
      allergenData = { allergens: [] };
    }

    console.log('Processed allergen data:', allergenData);

    return new Response(
      JSON.stringify(allergenData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-menu-allergens function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze menu for allergens',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});