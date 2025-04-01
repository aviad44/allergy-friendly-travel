
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

/**
 * Translates text using the OpenAI API via our Supabase edge function
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

    const response = await fetch("/api/functions/v1/openai-proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: `Please translate the following text into ${languageName}. The translation should be polite, culturally appropriate, and clearly understood by restaurant or hotel staff:
        
        ${text}`,
        systemPrompt: `You are a professional translator helping a traveler with food allergies. Your task is to translate the provided text accurately while ensuring it is polite, culturally appropriate, and clearly conveys the severity of allergies.
        
        IMPORTANT: Only respond with the translated text. Do not include any explanations, notes, or original text. Do not output markdown formatting.`,
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Translation failed");
    }

    const data = await response.json();
    return { translatedText: data.result };
  } catch (error) {
    console.error("Translation error:", error);
    toast.error("Translation failed. Please try again.");
    return { translatedText: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

/**
 * Helper to get the full language name from language code
 */
const getLanguageNameFromCode = (code: string): string => {
  // This is a simplified approach - in a real app, we'd use a complete mapping
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
    // Add more languages as needed
  };

  return languageMap[code] || code;
};
