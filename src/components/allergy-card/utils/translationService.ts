
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
          // Use our safe JSON parser that won't throw errors
          data = await safelyParseJSON(netlifyResponse);
          
          // If the safe parser returned an error object instead of throwing
          if (data.error && !data.translatedText) {
            console.warn("Netlify function returned JSON with error:", data.error);
            throw new Error(data.error);
          }
          
          netlifySuccess = true;
          
          if (data.translatedText) {
            console.log("Netlify translation succeeded");
            return { translatedText: data.translatedText };
          } else if (data.translation) {
            // For backward compatibility
            console.log("Netlify translation succeeded (using 'translation' field)");
            return { translatedText: data.translation };
          } else {
            console.warn("Netlify translation returned no usable data:", data);
            throw new Error("Translation service returned an empty response");
          }
        } catch (jsonError) {
          console.error("Failed to parse Netlify response:", jsonError);
          throw jsonError;
        }
      } else {
        // Get the error text but handle it safely
        const errorData = await safelyParseJSON(netlifyResponse);
        console.warn("Netlify translation failed:", netlifyResponse.status, errorData);
        
        // If we got a valid error response with an error message
        if (errorData && errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error(`Netlify translation failed: ${netlifyResponse.status}`);
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
      // Always provide a simulated response in development if both endpoints fail
      // This ensures the frontend always has something to work with during development
      if (process.env.NODE_ENV === 'development') {
        console.log("Development mode: Providing simulated translation after real services failed");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        return { 
          translatedText: `[${languageName.toUpperCase()} SIMULATED TRANSLATION]\n\n${text}\n\n(This is a simulated translation after services failed)` 
        };
      }
      
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
        // Try to extract error details from the response using our safe parser
        const errorData = await safelyParseJSON(response);
        
        // If we got a valid error response with an error message
        if (errorData && errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error(`Translation API error: HTTP ${response.status}`);
        }
      }

      // Use the safe JSON parsing function that won't throw errors
      const responseData = await safelyParseJSON(response);
      
      // If the safe parser returned an error object instead of throwing
      if (responseData.error && !responseData.translatedText) {
        console.error("Supabase API returned JSON with error:", responseData.error);
        throw new Error(responseData.error);
      }
      
      // Check for both translation and translatedText fields for backward compatibility
      const translationText = responseData.translation || responseData.translatedText;
      
      if (!translationText) {
        const errorMessage = "Translation API returned empty result";
        console.error(errorMessage, responseData);
        throw new Error(errorMessage);
      }
      
      console.log("Translation success, result:", translationText.substring(0, 50) + "...");
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
