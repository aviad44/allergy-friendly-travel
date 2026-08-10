
import { toast } from "sonner";
import { COMPLETE_TRANSLATIONS, allergyTranslations, TranslationData } from './translations';
import { getAllergyIcon } from './allergyIcons';
import { trackLanguageUsage } from '@/utils/languageTracker';
import { supabase } from '@/integrations/supabase/client';

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
  ka: "Georgian",
  ro: "Romanian",
  sk: "Slovak",
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
 * Get language map for dropdowns, sorted alphabetically by language name
 * (A to Z) so the list is easy to scan regardless of insertion order above.
 */
export const getLanguageOptions = () => {
  return Object.entries(languageMap)
    .map(([code, name]) => ({ value: code, label: name }))
    .sort((a, b) => a.label.localeCompare(b.label));
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

// In-memory cache so re-generating a card (e.g. after toggling another
// allergy) doesn't re-request a translation we already fetched this session.
const customWordTranslationCache = new Map<string, string>();

/**
 * Translates a single word/phrase that isn't one of our ~26 preset allergens
 * (e.g. a custom allergy someone typed in, like "butter" or "dough") by
 * calling the translate-card edge function, which is backed by OpenAI.
 * Best-effort: any failure just falls back to the original English word so
 * one bad lookup never blocks the rest of the card from being generated.
 */
const translateCustomWord = async (word: string, targetLanguageCode: string): Promise<string> => {
  const cacheKey = `${targetLanguageCode}:${word.toLowerCase()}`;
  const cached = customWordTranslationCache.get(cacheKey);
  if (cached) return cached;

  try {
    const { data, error } = await supabase.functions.invoke('translate-card', {
      body: { text: word, targetLanguage: getLanguageNameFromCode(targetLanguageCode) },
    });
    const translated = !error && data?.translatedText ? String(data.translatedText).trim() : null;
    if (translated) {
      customWordTranslationCache.set(cacheKey, translated);
      return translated;
    }
    console.error('Custom allergy translation returned nothing for', word, error || data);
  } catch (err) {
    console.error('Custom allergy translation failed for', word, err);
  }
  return word;
};

/**
 * Generate complete translated card text
 */
const generateTranslatedCardText = async (allergies: string[], targetLanguageCode: string): Promise<string> => {
  const translationData = COMPLETE_TRANSLATIONS[targetLanguageCode];
  if (!translationData) {
    return `[Translation not available for ${getLanguageNameFromCode(targetLanguageCode)}]`;
  }

  const knownTranslations = allergyTranslations[targetLanguageCode];

  // Translate each allergy: use the static dictionary for our preset list
  // (fast, free), and fall back to a live translation for anything a user
  // typed in themselves that isn't in that list.
  const formattedAllergies = (await Promise.all(allergies.map(async (allergy) => {
    const translated = knownTranslations?.[allergy]
      || (targetLanguageCode === 'en' ? allergy : await translateCustomWord(allergy, targetLanguageCode));
    const icon = getAllergyIcon(allergy);
    return icon ? `${icon} ${translated}` : translated;
  }))).join(", ");

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
      const translatedText = await generateTranslatedCardText(allergies, targetLanguage);
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

    // Fallback for free-form text with no structured allergy list attached —
    // translate the whole thing via the same OpenAI-backed edge function.
    try {
      const { data, error } = await supabase.functions.invoke('translate-card', {
        body: { text, targetLanguage: getLanguageNameFromCode(targetLanguage) },
      });
      if (!error && data?.translatedText) {
        trackLanguageUsage(targetLanguage, getLanguageNameFromCode(targetLanguage));
        toast.success(`Text translated to ${getLanguageNameFromCode(targetLanguage)} successfully!`, {
          duration: 3000,
          id: "translation-success"
        });
        return { translatedText: data.translatedText };
      }
      console.error("translate-card returned nothing:", error || data);
    } catch (err) {
      console.error("Custom text translation via translate-card failed:", err);
    }

    toast.error(`Translation failed for ${getLanguageNameFromCode(targetLanguage)}. Please try again.`, {
      duration: 5000,
      id: "translation-error"
    });

    return { translatedText: null, error: "Custom text translation failed" };

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
