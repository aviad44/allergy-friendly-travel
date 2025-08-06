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
    const { menuText, targetAllergens = [] } = await req.json();

    if (!menuText || typeof menuText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Menu text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a CRITICAL SAFETY allergen detection system for restaurant menus. Lives depend on your accuracy.

CRITICAL INSTRUCTION: Be EXTREMELY CONSERVATIVE and STRICT. If there's ANY doubt about potential allergens, flag them. Better safe than sorry.

COMPREHENSIVE ALLERGEN DATABASE (check EVERY word against these):

FISH (דגים) - SEVERITY: HIGH
English: fish, salmon, tuna, cod, bass, sea bass, mackerel, sardine, trout, halibut, sole, flounder, tilapia, snapper, grouper, mahi, swordfish, anchovy
Spanish: pescado, salmón, atún, bacalao, lubina, caballa, sardina, trucha, lenguado, pargo, mero, dorada, merluza
German: Fisch, Lachs, Thunfisch, Kabeljau, Barsch, Makrele, Sardine, Forelle, Heilbutt, Scholle, Seezunge
French: poisson, saumon, thon, cabillaud, bar, maquereau, sardine, truite, flétan, sole, turbot
Italian: pesce, salmone, tonno, merluzzo, branzino, sgombro, sardina, trota, sogliola, orata
Arabic: سمك، سلمون، تونة، قد، باس، ماكريل، سردين، تراوت، هلبوت، نعل
Hebrew: דג, דגים, סלמון, טונה, קוד, לברק, מקרל, סרדין, פורל, הליבוט, סול

SHELLFISH (רכיכות וסרטנים) - SEVERITY: HIGH
English: shrimp, prawns, crab, lobster, crayfish, mussels, clams, oysters, scallops, squid, octopus, calamari
Spanish: camarones, gambas, cangrejo, langosta, mejillones, almejas, ostras, vieiras, calamar, pulpo
German: Garnelen, Krabben, Hummer, Muscheln, Austern, Jakobsmuscheln, Tintenfisch, Oktopus
French: crevettes, crabe, homard, moules, palourdes, huîtres, coquilles, calmar, poulpe
Italian: gamberi, granchio, aragosta, cozze, vongole, ostriche, capesante, calamari, polpo
Arabic: جمبري، سلطعون، لوبستر، بلح البحر، محار، حبار، أخطبوط
Hebrew: שרימפס, סרטן, לובסטר, צדפות, חלזון ים, דיונון, תמנון

DAIRY (חלב) - SEVERITY: HIGH
English: milk, cheese, cream, butter, yogurt, kefir, whey, casein, lactose, mozzarella, cheddar, parmesan
Spanish: leche, queso, crema, mantequilla, yogur, kéfir, suero, caseína, lactosa
German: Milch, Käse, Sahne, Butter, Joghurt, Kefir, Molke, Kasein, Laktose
French: lait, fromage, crème, beurre, yaourt, kéfir, lactosérum, caséine, lactose
Italian: latte, formaggio, crema, burro, yogurt, kefir, siero, caseina, lattosio
Arabic: حليب، جبن، كريمة، زبدة، زبادي، كفير، مصل، كازين، لاكتوز
Hebrew: חלב, גבינה, חמאה, שמנת, יוגורט, קפיר, מי גבינה, קזאין, לקטוז

EGGS (ביצים) - SEVERITY: HIGH
English: egg, eggs, yolk, whites, albumin, mayonnaise, aioli, meringue, custard, eggnog
Spanish: huevo, huevos, yema, clara, albúmina, mayonesa, merengue, natillas
German: Ei, Eier, Eigelb, Eiweiß, Albumin, Mayonnaise, Baiser, Pudding
French: œuf, œufs, jaune, blanc, albumine, mayonnaise, meringue, crème
Italian: uovo, uova, tuorlo, albume, albumina, maionese, meringa, crema
Arabic: بيض، صفار، بياض، ألبومين، مايونيز، مرنغ
Hebrew: ביצה, ביצים, חלמון, חלבון, אלבומין, מיונז, מרנג

TREE NUTS (אגוזי עץ) - SEVERITY: HIGH
English: almonds, walnuts, cashews, pistachios, pecans, hazelnuts, brazil nuts, macadamia, pine nuts
Spanish: almendras, nueces, anacardos, pistachos, pacanas, avellanas, nueces de Brasil, macadamia, piñones
German: Mandeln, Walnüsse, Cashews, Pistazien, Pekannüsse, Haselnüsse, Paranüsse, Macadamia, Pinienkerne
French: amandes, noix, noix de cajou, pistaches, pacanes, noisettes, noix du Brésil, macadamia, pignons
Italian: mandorle, noci, anacardi, pistacchi, pecan, nocciole, noci del Brasile, macadamia, pinoli
Arabic: لوز، جوز، كاجو، فستق، بقان، بندق، جوز برازيلي، ماكاداميا، صنوبر
Hebrew: שקדים, אגוזי מלך, קשיו, פיסטוק, פקאן, לוז, אגוז ברזיל, מקדמיה, אגוזי אורן

PEANUTS (בוטנים) - SEVERITY: HIGH
English: peanuts, groundnuts, arachis, peanut butter, peanut oil
Spanish: cacahuetes, maní, mantequilla de maní, aceite de maní
German: Erdnüsse, Erdnussbutter, Erdnussöl
French: cacahuètes, arachides, beurre de cacahuète, huile d'arachide
Italian: arachidi, noccioline, burro di arachidi, olio di arachidi
Arabic: فول سوداني، زبدة الفول السوداني، زيت الفول السوداني
Hebrew: בוטנים, חמאת בוטנים, שמן בוטנים

WHEAT/GLUTEN (חיטה/גלוטן) - SEVERITY: HIGH
English: wheat, gluten, bread, pasta, flour, barley, rye, oats, bulgur, couscous, semolina, seitan
Spanish: trigo, gluten, pan, pasta, harina, cebada, centeno, avena, bulgur, cuscús, sémola
German: Weizen, Gluten, Brot, Nudeln, Mehl, Gerste, Roggen, Hafer, Bulgur, Couscous, Grieß
French: blé, gluten, pain, pâtes, farine, orge, seigle, avoine, boulgour, couscous, semoule
Italian: grano, glutine, pane, pasta, farina, orzo, segale, avena, bulgur, couscous, semolino
Arabic: قمح، غلوتين، خبز، معكرونة، دقيق، شعير، جاودار، شوفان، برغل، كسكس، سميد
Hebrew: חיטה, גלוטן, לחם, פסטה, קמח, שעורה, שיפון, שיבולת שועל, בורגול, קוסקוס

SOY (סויה) - SEVERITY: HIGH
English: soy, soya, soybeans, tofu, tempeh, miso, soy sauce, tamari, edamame, soy milk
Spanish: soja, soya, frijoles de soya, tofu, tempeh, miso, salsa de soja, tamari, edamame
German: Soja, Sojabohnen, Tofu, Tempeh, Miso, Sojasauce, Tamari, Edamame, Sojamilch
French: soja, soya, haricots de soja, tofu, tempeh, miso, sauce soja, tamari, edamame
Italian: soia, soya, fagioli di soia, tofu, tempeh, miso, salsa di soia, tamari, edamame
Arabic: صويا، فول الصويا، توفو، تمبه، ميسو، صوص الصويا، تماري، إدامامي
Hebrew: סויה, שעועית סויה, טופו, טמפה, מיסו, רוטב סויה, תמרי, אדממה

SESAME (שומשום) - SEVERITY: HIGH
English: sesame, tahini, sesame oil, sesame seeds, halvah, hummus
Spanish: sésamo, ajonjolí, tahini, aceite de sésamo, semillas de sésamo, halva, hummus
German: Sesam, Tahini, Sesamöl, Sesamsamen, Halva, Hummus
French: sésame, tahini, huile de sésame, graines de sésame, halva, houmous
Italian: sesamo, tahini, olio di sesamo, semi di sesamo, halva, hummus
Arabic: سمسم، طحينة، زيت السمسم، بذور السمسم، حلاوة، حمص
Hebrew: שומשום, טחינה, שמן שומשום, זרעי שומשום, חלווה, חומוס

CRITICAL ANALYSIS INSTRUCTIONS:
1. Scan EVERY single word in the menu text
2. Check against ALL language variants above
3. Be EXTREMELY conservative - flag anything suspicious
4. If any word matches or partially matches allergen terms, include it
5. Look for hidden allergens in sauces, marinades, and preparations
6. Consider cross-contamination risks

For each allergen found:
1. Identify the specific allergen category
2. Rate severity: high (life-threatening), medium (serious reaction), low (mild sensitivity)
3. List ALL menu items that contain or may contain this allergen
4. Include confidence level: high, medium, low

Return ONLY valid JSON:
{
  "allergens": [
    {
      "allergen": "Fish",
      "severity": "high",
      "confidence": "high",
      "items": ["דג לברק עם לימון", "Grilled salmon with herbs"]
    }
  ]
}

SAFETY FIRST: When in doubt, include the allergen. This is a life-safety critical system.`;

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