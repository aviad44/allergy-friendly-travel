
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
      throw new Error("Empty response received from server");
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON parsing error:", error);
    console.error("Response text received:", text || "No response text");
    throw new Error(`Failed to parse JSON response: ${error.message}. Response: ${text ? text.substring(0, 100) + "..." : "Could not retrieve response body"}`);
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
    
    let netlifySuccess = false;
    let data;
    
    try {
      // Ensure we're making a POST request with the correct headers and body structure
      const netlifyResponse = await fetch(netlifyFunctionUrl, {
        method: "POST", // Explicitly use POST method
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
          data = await safelyParseJSON(netlifyResponse);
          netlifySuccess = true;
          
          if (data.translatedText) {
            console.log("Netlify translation succeeded");
            return { translatedText: data.translatedText };
          } else if (data.translation) {
            // For backward compatibility
            console.log("Netlify translation succeeded (using 'translation' field)");
            return { translatedText: data.translation };
          } else if (data.error) {
            console.warn("Netlify translation returned error:", data.error);
            throw new Error(data.error);
          } else {
            console.warn("Netlify translation returned no usable data:", data);
            throw new Error("Translation service returned an empty response");
          }
        } catch (jsonError) {
          console.error("Failed to parse Netlify response:", jsonError);
          throw jsonError;
        }
      } else {
        // Get the error text but handle it safely in case it's not valid JSON
        try {
          const errorData = await safelyParseJSON(netlifyResponse);
          console.warn("Netlify translation failed:", netlifyResponse.status, errorData);
          throw new Error(errorData.error || `Netlify translation failed: ${netlifyResponse.status}`);
        } catch (jsonError) {
          // Handle case where the error response itself isn't valid JSON
          let errorText;
          try {
            errorText = await netlifyResponse.text();
          } catch (textError) {
            errorText = "Could not retrieve error response";
          }
          
          console.warn("Netlify translation failed (invalid JSON response):", netlifyResponse.status, errorText);
          throw new Error(`Netlify translation failed: ${netlifyResponse.status} - ${String(errorText).substring(0, 100)}`);
        }
      }
    } catch (netlifyError) {
      console.warn("Netlify function error:", netlifyError);
      
      // If we already parsed valid data but hit another issue
      if (netlifySuccess && data?.translatedText) {
        return { translatedText: data.translatedText };
      }
      
      // Continue to try Supabase function
    }
    
    // If Netlify function fails, try Supabase Edge Function
    const supabaseUrl = `${baseUrl}/functions/v1/translate-card`;
    
    console.log(`Falling back to Supabase translation function at: ${supabaseUrl}`);
    
    try {
      const response = await fetch(supabaseUrl, {
        method: "POST", // Explicitly use POST method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage: languageName
        }),
      });

      console.log("Supabase response status:", response.status);

      // A valid response must be returned even in error cases
      if (!response.ok) {
        // Try to extract error details from the response
        let errorDetails = "Unknown error";
        try {
          const errorData = await safelyParseJSON(response);
          errorDetails = errorData.error || `HTTP error: ${response.status}`;
        } catch (e) {
          // If we can't parse JSON, use status text
          errorDetails = `HTTP error: ${response.status} ${response.statusText}`;
        }
        
        console.error("Supabase translation API error:", errorDetails);
        throw new Error(`Translation API error: ${errorDetails}`);
      }

      let responseData;
      try {
        // Use the safe JSON parsing function
        responseData = await safelyParseJSON(response);
      } catch (jsonError) {
        console.error("Failed to parse Supabase response:", jsonError);
        
        // For development, provide a mock translation after API failure
        if (process.env.NODE_ENV === 'development') {
          console.warn("Supabase API response parsing failed, using mock translation for development");
          await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
          return { 
            translatedText: `[${languageName.toUpperCase()} EMERGENCY MOCK]\n\n${text}\n\n(Mock after API error: ${jsonError.message})` 
          };
        }
        
        throw jsonError;
      }
      
      // Check for both translation and translatedText fields for backward compatibility
      const translationText = responseData.translation || responseData.translatedText;
      
      if (!translationText) {
        const errorMessage = "Translation API returned empty result";
        console.error(errorMessage, responseData);
        throw new Error(errorMessage);
      }
      
      console.log("Translation success, result:", translationText);
      return { translatedText: translationText };
    } catch (error) {
      // This catch covers all Supabase function errors
      console.error("Supabase translation error:", error);
      
      // For development, provide a mock translation after API failure
      if (process.env.NODE_ENV === 'development') {
        console.warn("Both translation services failed, using mock translation for development");
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
