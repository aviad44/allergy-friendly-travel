
import { toast } from "sonner";
import { COMPLETE_TRANSLATIONS, allergyTranslations, TranslationData } from './translations';
import { getAllergyIcon } from './allergyIcons';
import { trackLanguageUsage } from '@/utils/languageTracker';

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
 * Generate the allergy card text
 */
const generateCardText = (allergies: string[]): string => {
  // Format allergies with emojis where available
  const formattedAllergies = allergies.map(allergy => {
    const icon = getAllergyIcon(allergy);
    return icon ? `${icon} ${allergy}` : allergy;
  }).join(", ");

  return `⚠️ FOOD ALLERGY NOTIFICATION ⚠️

I have severe allergies to the following foods:
${formattedAllergies}

Cross-contamination can cause a serious allergic reaction. Please ensure that my meal is prepared without these allergens and that all cooking utensils and surfaces are thoroughly cleaned before preparing my food.

Thank you for your assistance in this important health matter.`;
};

/**
 * Translate allergies to target language
 */
const translateAllergies = (allergies: string[], targetLanguageCode: string): string[] => {
  const translations = allergyTranslations[targetLanguageCode];
  if (!translations) {
    return allergies; // Return original if no translations available
  }

  return allergies.map(allergy => {
    return translations[allergy] || allergy;
  });
};

/**
 * Generate complete translated card text
 */
const generateTranslatedCardText = (allergies: string[], targetLanguageCode: string): string => {
  const translationData = COMPLETE_TRANSLATIONS[targetLanguageCode];
  if (!translationData) {
    return `[Translation not available for ${getLanguageNameFromCode(targetLanguageCode)}]`;
  }

  // Translate the allergies
  const translatedAllergies = translateAllergies(allergies, targetLanguageCode);
  
  // Format allergies with emojis
  const formattedAllergies = translatedAllergies.map(allergy => {
    const originalAllergy = allergies.find(orig => 
      allergyTranslations[targetLanguageCode]?.[orig] === allergy
    ) || allergy;
    const icon = getAllergyIcon(originalAllergy);
    return icon ? `${icon} ${allergy}` : allergy;
  }).join(", ");

  // Construct the full translated text
  return `⚠️ ${translationData.title} ⚠️

${translationData.mainText}
${formattedAllergies}

${translationData.crossContamination}

${translationData.thankYou}`;
};

/**
 * Translates text using built-in static translations
 */
export const translateText = async (
  text: string,
  targetLanguage: string,
  allergies?: string[]
): Promise<TranslationResponse> => {
  try {
    if (!text || !targetLanguage) {
      console.error("Missing text or target language");
      return { translatedText: null, error: "Missing text or target language" };
    }

    console.log(`Starting translation to ${targetLanguage}`);
    console.log("Text to translate:", text);

    // If we have allergies and this is a standard allergy card, use our complete translations
    if (allergies && allergies.length > 0) {
      const translatedText = generateTranslatedCardText(allergies, targetLanguage);
      console.log("Generated complete translated text:", translatedText);
      
      if (translatedText.includes('[Translation not available')) {
        toast.warning(`Translation not available for ${getLanguageNameFromCode(targetLanguage)}. Please contact support to request this language.`, {
          duration: 5000,
          id: "language-not-available"
        });
        return { translatedText: null, error: `Translation not available for ${getLanguageNameFromCode(targetLanguage)}` };
      }
      
      // Track language usage
      trackLanguageUsage(targetLanguage, getLanguageNameFromCode(targetLanguage));
      
      toast.success(`Text translated to ${getLanguageNameFromCode(targetLanguage)} successfully!`, {
        duration: 3000,
        id: "translation-success"
      });
      
      return { translatedText };
    }

    // Fallback for custom text - we don't have translations for custom text
    toast.warning('Custom text translation requires OpenAI API. Only standard allergy cards can be translated automatically.', {
      duration: 5000,
      id: "custom-text-warning"
    });
    
    return { 
      translatedText: `[${getLanguageNameFromCode(targetLanguage).toUpperCase()} TRANSLATION NEEDED]

${text}

[Please contact support for custom text translation]`,
      error: "Custom text translation not available"
    };
    
  } catch (error) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    toast.error(`Translation failed: ${errorMessage}`, {
      duration: 5000,
      id: "translation-error"
    });
    
    return { translatedText: null, error: errorMessage };
  }
};
