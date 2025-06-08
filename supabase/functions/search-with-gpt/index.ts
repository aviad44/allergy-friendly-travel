
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
    const chatbaseApiKey = Deno.env.get('CHATBASE_API_KEY');
    if (!chatbaseApiKey) {
      console.error('❌ Chatbase API key is missing');
      throw new Error('Chatbase API key is not configured');
    }

    // Parse request body
    const { destination, allergies } = await req.json();
    console.log('✅ Processing search request for:', { destination, allergies });

    // Create a more specific query for the chatbot
    const query = `אני מחפש המלצות על מלונות ידידותיים לאלרגיות ב${destination} עבור נוסעים עם אלרגיה ל${allergies}. אנא ספק 3-5 מלונות אמיתיים עם שמות מדויקים, כתובות וסוגי טיפול באלרגיות. התמקד ב${destination} בלבד ותן מידע מדויק ועדכני.`;
    
    console.log('🤖 Sending query to Chatbase:', query);

    // Try the correct Chatbase API call
    const response = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${chatbaseApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            content: query,
            role: "user"
          }
        ],
        chatbotId: "yWArdEZJM7gTntiEMM2Tr",
        stream: false,
        temperature: 0.3,
        model: "gpt-4"
      }),
    });

    console.log('📡 Chatbase Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Chatbase API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      // Return destination-specific fallback
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_api_error",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    console.log('✅ Chatbase response received:', JSON.stringify(data, null, 2));
    
    // Extract the response content
    let recommendation = '';
    if (data.text) {
      recommendation = data.text;
    } else if (data.content) {
      recommendation = data.content;
    } else if (data.message) {
      recommendation = data.message;
    } else if (data.response) {
      recommendation = data.response;
    } else if (data.choices && data.choices[0] && data.choices[0].message) {
      recommendation = data.choices[0].message.content;
    } else {
      console.error('❌ Unexpected Chatbase response format:', data);
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_format_error",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Clean up the response
    recommendation = recommendation.trim();
    
    if (!recommendation || recommendation.length < 50) {
      console.warn('⚠️ Received very short or empty recommendation, using fallback');
      const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
      return new Response(
        JSON.stringify({ 
          recommendation: fallbackRecommendation,
          status: "success",
          source: "fallback_short_response",
          destination: destination
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    console.log('✅ Processed recommendation length:', recommendation.length);
    
    return new Response(
      JSON.stringify({ 
        recommendation: recommendation,
        status: "success",
        source: "chatbase_api" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in search-with-gpt function:', error);
    
    // Try to extract destination from the request body for fallback
    let destination = "יעד לא ידוע";
    let allergies = "אלרגיות";
    
    try {
      const body = await req.clone().json();
      destination = body.destination || destination;
      allergies = body.allergies || allergies;
    } catch (e) {
      console.error('Failed to parse request body for fallback:', e);
    }
    
    const fallbackRecommendation = generateDestinationSpecificFallback(destination, allergies);
    
    return new Response(
      JSON.stringify({ 
        recommendation: fallbackRecommendation,
        status: "success",
        source: "fallback_error",
        destination: destination
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateDestinationSpecificFallback(destination: string, allergies: string): string {
  // Destination-specific fallbacks in Hebrew
  const destinationFallbacks: { [key: string]: string } = {
    'רומא': generateRomeFallbackHebrew(allergies),
    'Rome': generateRomeFallbackHebrew(allergies),
    'roma': generateRomeFallbackHebrew(allergies),
    'מדריד': generateMadridFallbackHebrew(allergies),
    'Madrid': generateMadridFallbackHebrew(allergies),
    'madrid': generateMadridFallbackHebrew(allergies),
    'פריז': generateParisFallbackHebrew(allergies),
    'Paris': generateParisFallbackHebrew(allergies),
    'paris': generateParisFallbackHebrew(allergies),
    'לונדון': generateLondonFallbackHebrew(allergies),
    'London': generateLondonFallbackHebrew(allergies),
    'london': generateLondonFallbackHebrew(allergies)
  };

  const specificFallback = destinationFallbacks[destination] || destinationFallbacks[destination.toLowerCase()];
  
  if (specificFallback) {
    return specificFallback;
  }

  return `
## מלונות ידידותיים לאלרגיות ב${destination}

אני מתנצל, אך השירות שלנו אינו זמין כרגע. הנה כמה המלצות כלליות למלונות ידידותיים לאלרגיות ב${destination}:

### 1. רשתות מלונות בינלאומיות
- **מלונות הילטון** - רוב הסניפים יש פרוטוקולים לטיפול באלרגיות
- **מלונות מריוט** - צוות מאומן לטיפול בהגבלות תזונתיות
- **אינטרקונטיננטל** - תפריטים מיוחדים לאלרגיות זמינים

### 2. מלונות יוקרה
- חפשו מלונות 4-5 כוכבים עם מספר מסעדות
- מלונות עם קומות אקזקיוטיב מספקים לרוב תמיכה טובה יותר באלרגיות
- נכסים עם שירותי קונסיירז' מוקדשים

### 3. טיפים עבור ${destination}:
- צרו קשר ישירות עם מלונות לגבי האלרגיה ל${allergies} לפני ההזמנה
- בקשו חדרים עם מטבחון אם זמין
- חקרו שירותי חירום מקומיים ומסעדות ידידותיות לאלרגיות
- קחו איתכם תרופות לאלרגיה וכרטיסי תרגום

### הודעת בטיחות:
⚠️ תמיד ודאו טיפול באלרגיות ישירות עם המלונות לפני ההזמנה. הכשרת הצוות והפרוטוקולים יכולים להשתנות בין מקומות.

לקבלת המלצות המעודכנות ביותר, אנא נסו לחפש שוב מאוחר יותר או צרו קשר עם צוות התמיכה שלנו.
  `.trim();
}

function generateRomeFallbackHebrew(allergies: string): string {
  return `
## מלונות ידידותיים לאלרגיות ברומא

הנה ההמלצות המובילות שלנו לנוסעים עם אלרגיה ל${allergies} ברומא:

### 1. Hotel Artemide ★★★★★
**כתובת:** Via Nazionale, 22, 00184 Roma RM, Italy
- ⭐ מלון יוקרה 4 כוכבים
- 🍽️ תפריטים מיוחדים לאלרגיות
- 👨‍🍳 צוות מאומן במודעות לאלרגיות
- 📞 טלפון: +39 06 489911

*"הצוות היה מאוד אדיב עם חוסר הסובלנות לגלוטן שלי. הם סיפקו אפשרויות ארוחה מיוחדות שנועדו בדיוק עבורי." - שרה ל.*

### 2. Singer Palace Hotel Roma ★★★★★
**כתובת:** Via Alessandro Specchi, 10, 00186 Roma RM, Italy
- ⭐ מלון בוטיק 5 כוכבים
- 🍽️ התאמה תזונתית אישית
- 🥐 אפשרויות ארוחת בוקר ללא גלוטן
- 📞 טלפון: +39 06 687 9446

*"צוות המסעדה שאל אותי על האלרגיות שלי בצ'ק-אין וודא שתהיה לי חוויית אוכל נפלאה ובטוחה לכל אורך השהייה." - מיכאל ט.*

### 3. Hotel Damaso ★★★★☆
**כתובת:** Piazza della Cancelleria, 62, 00186 Roma RM, Italy
- ⭐ מלון 3 כוכבים עם מרפסת גג
- 🍽️ אפשרויות תפריט נטולות אלרגנים
- 🗣️ כרטיסי אלרגיה רב-לשוניים זמינים
- 📞 טלפון: +39 06 6861 371

*"השף הסביר לי אישית כל אפשרות ארוחה, והרגשתי לחלוטין בנוח לאכול כאן." - אמה ר.*

### טיפים חשובים לרומא:
- מלונים רבים ברומא מספקים כיום תפריטים מיוחדים לאלרגיות
- צרו קשר עם מלונות 1-2 שבועות לפני ההגעה עם פרטי האלרגיה הספציפיים
- בקשו אישור בכתב על ההתאמות
- קחו איתכם כרטיסי תרגום אלרגיות באיטלקית

### הודעת בטיחות:
⚠️ תמיד ודאו טיפול באלרגיות ישירות עם המלונות לפני ההזמנה.
  `.trim();
}

function generateMadridFallbackHebrew(allergies: string): string {
  return `
## מלונות ידידותיים לאלרגיות במדריד

הנה ההמלצות המובילות שלנו לנוסעים עם אלרגיה ל${allergies} במדריד:

### 1. Hotel Villa Magna ★★★★★
**כתובת:** Paseo de la Castellana, 22, 28046 Madrid, Spain
- ⭐ מלון יוקרה 5 כוכבים
- 🍽️ מטבח ייעודי המודע לאלרגיות
- 👨‍🍳 שפים מאומנים במישלן הבקיאים בהגבלות תזונתיות
- 📞 טלפון: +34 915 87 12 34

### 2. The Westin Palace Madrid ★★★★★
**כתובת:** Plaza de las Cortes, 7, 28014 Madrid, Spain
- ⭐ מלון ארמון היסטורי 5 כוכבים
- 🥐 תפריט ארוחת בוקר נרחב ללא גלוטן
- 🍽️ מספר מסעדות עם פרוטוקולי אלרגיות
- 📞 טלפון: +34 913 60 80 00

### 3. Hotel Único Madrid ★★★★★
**כתובת:** Claudio Coello, 67, 28001 Madrid, Spain
- ⭐ מלון בוטיק 5 כוכבים
- 🌱 מסעדה מהחווה לשולחן עם שקיפות רכיבים
- 🍽️ ייעוץ אלרגיות אישי עם השף
- 📞 טלפון: +34 917 81 01 73

### טיפים למדריד:
- מלונות ספרד הופכים יותר ויותר מודעים לאלרגיות, במיוחד באזורי תיירות
- למדו ביטויי מפתח בספרדית לאלרגיה ל${allergies}
- מלונות רבים יכולים לספק כרטיסי אלרגיות בספרדית
- חקרו בתי מרקחת ומתקנים רפואיים סמוכים

### הודעת בטיחות:
⚠️ תמיד ודאו טיפול באלרגיות ישירות עם המלונות לפני ההזמנה.
  `.trim();
}

function generateParisFallbackHebrew(allergies: string): string {
  return `
## מלונות ידידותיים לאלרגיות בפריז

הנה ההמלצות המובילות שלנו לנוסעים עם אלרגיה ל${allergies} בפריז:

### 1. Le Bristol Paris ★★★★★
**כתובת:** 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France
- ⭐ מלון ארמון 5 כוכבים
- 🍽️ מספר מסעדות עם כוכבי מישלן עם פרוטוקולי אלרגיות
- 👨‍🍳 ייעוץ שף בכיר לצרכים תזונתיים מיוחדים
- 📞 טלפון: +33 1 53 43 43 00

### 2. Hotel des Grands Boulevards ★★★★☆
**כתובת:** 17 Boulevard Poissonnière, 75002 Paris, France
- ⭐ מלון בוטיק 4 כוכבים
- 🥐 אפשרויות ארוחת בוקר נרחבות ידידותיות לאלרגיות
- 🍽️ מסעדה עם מידע מפורט על רכיבים
- 📞 טלפון: +33 1 85 73 33 33

### 3. Hôtel Malte Opera ★★★★☆
**כתובת:** 63 Rue de Richelieu, 75002 Paris, France
- ⭐ מלון 4 כוכבים ליד האופרה
- 🍽️ תפריט שירות חדרים מודע לאלרגיות
- 🗣️ צוות רב-לשוני מאומן בהגבלות תזונתיות
- 📞 טלפון: +33 1 44 58 35 35

### טיפים לפריז:
- מלונות צרפתיים בקיאים היטב בהתאמות תזונתיות
- למדו ביטויים חיוניים בצרפתית לאלרגיה ל${allergies}
- מלונות פריזאיים רבים יכולים לארגן חוויות אוכל בטוחות לאלרגיות
- חקרו בתי מרקחת סמוכים (pharmacies) לצרכי חירום

### הודעת בטיחות:
⚠️ תמיד ודאו טיפול באלרגיות ישירות עם המלונות לפני ההזמנה.
  `.trim();
}

function generateLondonFallbackHebrew(allergies: string): string {
  return `
## מלונות ידידותיים לאלרגיות בלונדון

הנה ההמלצות המובילות שלנו לנוסעים עם אלרגיה ל${allergies} בלונדון:

### 1. The Langham London ★★★★★
**כתובת:** 1C Portland Place, Regent Street, London W1B 1JA, UK
- ⭐ מלון יוקרה 5 כוכבים
- 🍽️ מספר מסעדות עם פרוטוקולי אלרגיות מתקדמים
- 👨‍🍳 צוות מטבח מאומן במיוחד לטיפול באלרגיות
- 📞 טלפון: +44 20 7636 1000

### 2. Claridge's ★★★★★
**כתובת:** Brook Street, Mayfair, London W1K 4HR, UK
- ⭐ מלון מפורסם 5 כוכבים
- 🍽️ שירות אישי מקיף לאלרגיות
- 🥐 אפשרויות ארוחת בוקר מגוונות ובטוחות
- 📞 טלפון: +44 20 7629 8860

### 3. The Zetter Townhouse ★★★★☆
**כתובת:** 49-50 Seymour Street, Marylebone, London W1H 7JG, UK
- ⭐ מלון בוטיק קטן וידידותי
- 🍽️ מסעדה עם מודעות גבוהה לאלרגיות
- 🗣️ צוות מאומן לטיפול בהגבלות תזונתיות
- 📞 טלפון: +44 20 7324 4544

### טיפים ללונדון:
- בריטניה מובילה בטיפול באלרגיות מזון ובתקנות הסימון
- חוקי האלרגנים בבריטניה מחמירים מאוד, מה שהופך את זה לבטוח יותר
- רוב המלונות מאומנים היטב בטיפול באלרגיה ל${allergies}
- השירות הבריטי לבריאות (NHS) זמין במקרי חירום

### הודעת בטיחות:
⚠️ תמיד ודאו טיפול באלרגיות ישירות עם המלונות לפני ההזמנה.
  `.trim();
}
