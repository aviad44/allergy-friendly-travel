
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
const getLanguageNameFromCode = (code: string): string => {
  return languageMap[code] || code;
};

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
    
    console.log(`Translating to ${languageName} (${targetLanguage})`);

    // For debugging if API is not working
    if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_DEBUG_TRANSLATION === 'true') {
      console.log("Using debug mock translation");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
      return { 
        translatedText: `[${languageName.toUpperCase()} TRANSLATION]\n\n${text}\n\n(This is a debug mock translation)` 
      };
    }

    try {
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
        const errorText = await response.text();
        console.error("Translation API error response:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || `Translation failed: ${response.statusText}`);
        } catch (parseError) {
          throw new Error(`Translation failed: ${response.statusText} (${errorText.substring(0, 100)}...)`);
        }
      }

      const data = await response.json();
      console.log("Translation success, result:", data.result);
      if (!data.result) {
        throw new Error("Translation API returned empty result");
      }
      return { translatedText: data.result };
    } catch (error) {
      console.error("Translation API error details:", error);
      
      // Show user-facing error message
      toast.error(`Translation error: ${error.message || "Unknown error"}. Please try again later.`, {
        duration: 5000,
        id: "translation-error"
      });
      
      // For development, provide a mock translation after API failure
      if (process.env.NODE_ENV === 'development') {
        console.warn("Translation API failed, using mock translation for development");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        return { 
          translatedText: `[${languageName.toUpperCase()} MOCK TRANSLATION]\n\n${text}\n\n(This is a mock translation because the API failed)` 
        };
      }
      
      return { translatedText: null, error: error.message || "Translation API error" };
    }
  } catch (error) {
    console.error("Translation error:", error);
    toast.error("Translation failed. Please try again.", {
      duration: 5000
    });
    return { translatedText: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
