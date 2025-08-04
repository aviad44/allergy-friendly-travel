
import { toast } from "sonner";

// Set up types for the translation request and response
export interface TranslationRequest {
  text: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string | null;
  error?: string;
}

// Define a more comprehensive language map
const languageMap: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ru: "Russian",
  ar: "Arabic",
  hi: "Hindi",
  pt: "Portuguese",
  nl: "Dutch",
  tr: "Turkish",
  pl: "Polish",
  vi: "Vietnamese",
  th: "Thai",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
  no: "Norwegian",
  el: "Greek",
  he: "Hebrew",
  cs: "Czech",
  hu: "Hungarian",
};

/**
 * Helper to get the full language name from language code
 */
export const getLanguageNameFromCode = (code: string): string => {
  return languageMap[code] || code;
};

/**
 * Get available language codes
 */
export const getAvailableLanguageCodes = (): string[] => {
  return Object.keys(languageMap);
};

/**
 * Get language map for dropdowns
 */
export const getLanguageOptions = () => {
  return Object.entries(languageMap).map(([code, name]) => ({
    value: code,
    label: name
  }));
};

/**
 * Simple built-in translations for common allergy terms
 */
const simpleTranslations: Record<string, Record<string, string>> = {
  Hebrew: {
    "I have serious food allergies": "יש לי אלרגיות מזון חמורות",
    "I CANNOT EAT": "אני לא יכול/ה לאכול",
    "Tree nuts": "אגוזי עץ", 
    "Eggs": "ביצים",
    "Shellfish": "פירות ים",
    "Milk": "חלב",
    "Even a tiny amount can make me very sick": "אפילו כמות קטנה יכולה לגרום לי להיות חולה מאוד",
    "Please make sure my food is prepared without these ingredients": "אנא וודאו שהאוכל שלי מוכן ללא המרכיבים הללו",
    "and might require emergency medicine": "ועלול לדרוש תרופה חירום",
    "Cross-contamination can cause a serious allergic reaction": "זיהום צולב יכול לגרום לתגובה אלרגית חמורה",
    "Please ensure that my meal is prepared without these allergens": "אנא וודאו שהארוחה שלי מוכנה ללא האלרגנים הללו",
    "and that all cooking utensils and surfaces are thoroughly cleaned": "וכי כל כלי הבישול והמשטחים נוקו ביסודיות",
    "before preparing my food": "לפני הכנת האוכל שלי",
    "Thank you for your assistance in this important health matter": "תודה על עזרתכם בעניין בריאותי חשוב זה"
  },
  Spanish: {
    "I have serious food allergies": "Tengo alergias alimentarias graves",
    "I CANNOT EAT": "NO PUEDO COMER",
    "Tree nuts": "Frutos secos",
    "Eggs": "Huevos",
    "Shellfish": "Mariscos", 
    "Milk": "Leche",
    "Even a tiny amount can make me very sick": "Incluso una pequeña cantidad puede enfermarme gravemente",
    "Please make sure my food is prepared without these ingredients": "Por favor asegúrese de que mi comida se prepare sin estos ingredientes",
    "and might require emergency medicine": "y podría requerir medicina de emergencia"
  },
  French: {
    "I have serious food allergies": "J'ai de graves allergies alimentaires",
    "I CANNOT EAT": "JE NE PEUX PAS MANGER",
    "Tree nuts": "Noix",
    "Eggs": "Œufs",
    "Shellfish": "Fruits de mer",
    "Milk": "Lait",
    "Even a tiny amount can make me very sick": "Même une petite quantité peut me rendre très malade", 
    "Please make sure my food is prepared without these ingredients": "Veuillez vous assurer que ma nourriture est préparée sans ces ingrédients",
    "and might require emergency medicine": "et pourrait nécessiter un médicament d'urgence"
  }
};

/**
 * Translates text using built-in simple translations or mock for other languages
 */
export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> => {
  try {
    if (!text || !targetLanguage) {
      return { translatedText: null, error: "Missing text or target language" };
    }

    // Get language name from code for more accurate translations
    const languageName = getLanguageNameFromCode(targetLanguage);
    
    console.log(`Translating to ${languageName} (${targetLanguage})`);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if we have built-in translations for this language
    if (simpleTranslations[languageName]) {
      const translations = simpleTranslations[languageName];
      let translatedText = text;
      
      // Replace known phrases
      Object.entries(translations).forEach(([english, translated]) => {
        translatedText = translatedText.replace(new RegExp(english, 'gi'), translated);
      });
      
      console.log("Translation success using built-in dictionary");
      return { translatedText };
    }

    // For other languages, provide a formatted response indicating translation is needed
    const formattedText = `[${languageName.toUpperCase()} TRANSLATION NEEDED]

${text}

[Please translate the above text to ${languageName}]`;

    console.log("Provided template for manual translation");
    return { translatedText: formattedText };
    
  } catch (error) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    toast.error(`Translation failed: ${errorMessage}. Please try again later.`, {
      duration: 5000,
      id: "translation-error"
    });
    
    return { translatedText: null, error: errorMessage };
  }
};
