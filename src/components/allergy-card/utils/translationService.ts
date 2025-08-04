
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
 * Safely parse JSON from response text
 */
const safelyParseJSON = async (response: Response): Promise<any> => {
  let text = "";
  
  try {
    text = await response.text();
    console.log("Response text received, length:", text.length);
    
    if (!text || text.trim() === "") {
      console.error("Empty response received from server");
      // Return a standardized object for empty responses
      return { 
        error: "Empty response received from server", 
        translatedText: null 
      };
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON parsing error:", error);
    console.error("Response text received:", text ? text.substring(0, 100) : "No response text");
    
    // Return a standardized error object instead of throwing
    return { 
      error: `Failed to parse JSON response: ${error.message}`, 
      responseText: text ? text.substring(0, 100) + "..." : "Could not retrieve response body",
      translatedText: null 
    };
  }
};

/**
 * Translates text using our translation function
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

    // Skip Netlify function and go directly to Supabase Edge Function for better reliability
    // The error suggests Netlify function is returning HTML instead of JSON
    console.log("Skipping Netlify function due to parsing issues, using Supabase Edge Function");
    
    const baseUrl = window.location.origin;
    const supabaseUrl = `${baseUrl}/functions/v1/translate-card`;
    
    console.log(`Using Supabase translation function at: ${supabaseUrl}`);
    
    try {
      const response = await fetch(supabaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage: languageName
        }),
      });

      console.log("Supabase response status:", response.status);

      if (!response.ok) {
        const errorData = await safelyParseJSON(response);
        
        if (errorData && errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error(`Translation API error: HTTP ${response.status}`);
        }
      }

      const responseData = await safelyParseJSON(response);
      
      if (responseData.error && !responseData.translatedText) {
        console.error("Supabase API returned JSON with error:", responseData.error);
        throw new Error(responseData.error);
      }
      
      const translationText = responseData.translation || responseData.translatedText;
      
      if (!translationText) {
        const errorMessage = "Translation API returned empty result";
        console.error(errorMessage, responseData);
        throw new Error(errorMessage);
      }
      
      console.log("Translation success, result:", translationText.substring(0, 50) + "...");
      return { translatedText: translationText };
    } catch (error) {
      console.error("Supabase translation error:", error);
      
      // For development, provide a mock translation after API failure
      if (process.env.NODE_ENV === 'development') {
        console.warn("Translation service failed, using mock translation for development");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        return { 
          translatedText: `[${languageName.toUpperCase()} EMERGENCY MOCK]\n\n${text}\n\n(Mock after services failed: ${error.message})` 
        };
      }
      
      throw error;
    }
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
