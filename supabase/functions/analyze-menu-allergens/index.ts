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
- Dairy (milk, cheese, cream, butter, yogurt)
- Eggs 
- Fish (salmon, tuna, cod, etc.)
- Shellfish (shrimp, crab, lobster, mussels)
- Tree nuts (almonds, walnuts, cashews, pistachios)
- Peanuts
- Wheat (bread, pasta, flour)
- Gluten (wheat, barley, rye)
- Soy (soy sauce, tofu, soybean oil)
- Sesame (tahini, sesame oil, seeds)
- Celery
- Mustard
- Sulfites
- Peas
- Lentils
- Beans

For each allergen found:
1. Identify the specific allergen
2. Rate severity: high (major allergen), medium (common sensitivity), low (rare sensitivity)  
3. List the specific menu items that contain this allergen

Return ONLY a valid JSON object in this exact format:
{
  "allergens": [
    {
      "allergen": "Dairy",
      "severity": "high",
      "items": ["Cheese pizza", "Cream pasta", "Ice cream"]
    }
  ]
}

If no allergens are found, return: {"allergens": []}

Analyze text in ANY language (English, Hebrew, Arabic, French, Spanish, Italian, German, Russian, Chinese, Japanese, etc.). Be thorough but only include allergens you are confident about.`;

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