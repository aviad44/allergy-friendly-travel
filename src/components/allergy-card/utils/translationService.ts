
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
  const text = await response.text();
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON parsing error:", error);
    console.error("Response text received:", text);
    throw new Error(`Failed to parse JSON response: ${text.substring(0, 100)}...`);
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

    // First, try Netlify function
    const baseUrl = window.location.origin;
    const netlifyFunctionUrl = `${baseUrl}/.netlify/functions/translate-card`;
    
    console.log(`Calling Netlify translation function at: ${netlifyFunctionUrl}`);
    
    try {
      // Ensure we're making a POST request with the correct headers and body structure
      const netlifyResponse = await fetch(netlifyFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage: languageName
        }),
        // Set a shorter timeout for the Netlify function
        signal: AbortSignal.timeout(15000),
      });
      
      console.log("Netlify response status:", netlifyResponse.status);
      
      // If Netlify function succeeds, use its result
      if (netlifyResponse.ok) {
        try {
          const data = await safelyParseJSON(netlifyResponse);
          
          if (data.translation) {
            console.log("Netlify translation succeeded");
            return { translatedText: data.translation };
          } else if (data.error) {
            console.warn("Netlify translation returned error:", data.error);
            throw new Error(data.error);
          }
        } catch (jsonError) {
          console.error("Failed to parse Netlify response:", jsonError);
          throw new Error(`Failed to parse Netlify response: ${jsonError.message}`);
        }
      } else {
        // Get the error text but handle it safely in case it's not valid JSON
        try {
          const errorData = await safelyParseJSON(netlifyResponse);
          console.warn("Netlify translation failed:", netlifyResponse.status, errorData);
          throw new Error(errorData.error || `Netlify translation failed: ${netlifyResponse.status}`);
        } catch (jsonError) {
          const errorText = await netlifyResponse.text();
          console.warn("Netlify translation failed (invalid JSON response):", netlifyResponse.status, errorText);
          throw new Error(`Netlify translation failed: ${netlifyResponse.status} - ${errorText.substring(0, 100)}`);
        }
      }
    } catch (netlifyError) {
      console.warn("Netlify function error:", netlifyError);
      // Continue to try Supabase function
    }
    
    // If Netlify function fails, try Supabase Edge Function
    const supabaseUrl = `${baseUrl}/functions/v1/translate-card`;
    
    console.log(`Falling back to Supabase translation function at: ${supabaseUrl}`);
    
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

    // Parse the response text and handle JSON parsing errors safely
    try {
      const data = await safelyParseJSON(response);
      
      if (!response.ok || data.error) {
        const errorMessage = data.error || `Translation failed: ${response.statusText}`;
        console.error("Translation API error:", errorMessage, data);
        toast.error(`Translation error: ${errorMessage}. Please try again later.`, {
          duration: 5000,
          id: "translation-error"
        });
        return { translatedText: null, error: errorMessage };
      }

      console.log("Translation success, result:", data.translation);
      if (!data.translation) {
        throw new Error("Translation API returned empty result");
      }
      return { translatedText: data.translation };
    } catch (jsonError) {
      const errorMessage = `JSON parsing error: ${jsonError.message}`;
      console.error("Translation response parsing error:", jsonError);
      toast.error(`Translation failed: ${errorMessage}. Please try again later.`, {
        duration: 5000,
        id: "translation-error"
      });
      return { translatedText: null, error: errorMessage };
    }
  } catch (error) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    toast.error(`Translation failed: ${errorMessage}. Please try again later.`, {
      duration: 5000,
      id: "translation-error"
    });
    
    // For development, provide a mock translation after API failure
    if (process.env.NODE_ENV === 'development') {
      console.warn("Translation API failed, using mock translation for development");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
      const languageName = getLanguageNameFromCode(targetLanguage);
      return { 
        translatedText: `[${languageName.toUpperCase()} MOCK TRANSLATION]\n\n${text}\n\n(This is a mock translation because the API failed)` 
      };
    }
    
    return { translatedText: null, error: errorMessage };
  }
};
