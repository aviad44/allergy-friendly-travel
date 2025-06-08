
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cleanResponseText } from "@/components/search/utils";
import { Helmet } from "react-helmet";
import { HotelInfo } from "@/types/search";
import { parseHotelsFromMarkdown } from "@/utils/parseHotelsFromMarkdown";
import { BackButton } from "@/components/search/BackButton";
import { SafetyNotice } from "@/components/search/SafetyNotice";
import { LoadingState } from "@/components/search/LoadingState";
import { HotelList } from "@/components/search/hotel-list";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRef } from "react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const requestTimeoutRef = useRef<number | null>(null);
  
  const destination = searchParams.get("destination") || "";
  const allergies = searchParams.get("allergies") || "";
  
  const [recommendation, setRecommendation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState<HotelInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchStartTime, setSearchStartTime] = useState<number | null>(null);
  
  useEffect(() => {
    if (!destination || !allergies) {
      toast({
        title: "Missing search parameters",
        description: "Please perform a search from the home page",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    const performSearch = async () => {
      setIsSearching(true);
      setError(null);
      setSearchStartTime(Date.now());
      console.log('🔍 Starting search for:', { destination, allergies });
      
      // Set a timeout to show partial results if taking too long
      requestTimeoutRef.current = window.setTimeout(() => {
        toast({
          title: "Search is taking longer than expected",
          description: "We're still looking for the best allergy-friendly hotels for you. Results will appear soon.",
          variant: "default"
        });
      }, 5000);
      
      try {
        // Enhanced system prompt for better consistency
        const systemPrompt = `You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. 

IMPORTANT: Format your response EXACTLY like this example:

### Hotel Ritz Madrid ★★★★★
**Address:** Plaza de la Lealtad 5, Madrid, Spain
- ⭐ 5-star luxury hotel
- 🍽️ Dedicated gluten-free kitchen area
- 👨‍🍳 Trained staff for allergy protocols
- 📞 +34 91 701 6767

**Description:** This luxury hotel offers excellent gluten-free accommodations with trained staff.
**Guest Quote:** "Amazing gluten-free breakfast options and very helpful staff" - Maria S.

Always respond in English only. Provide 3-5 real hotels with complete information.`;
        
        const userInput = `Find allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Please provide specific hotels with detailed allergy accommodation information.`;

        console.log('📡 Calling openai-proxy function...');
        
        const { data, error } = await supabase.functions.invoke('openai-proxy', {
          body: {
            userInput: userInput,
            systemPrompt: systemPrompt,
            model: "gpt-4o-mini",
            temperature: 0.7,
            max_tokens: 2000
          }
        });
        
        if (error) {
          console.error('❌ Supabase Function Error:', error);
          throw error;
        }
        
        if (!data?.result) {
          console.error('❌ No result data:', data);
          throw new Error('No recommendation received from the AI');
        }
        
        // Calculate and log the request time
        if (searchStartTime) {
          const searchTime = (Date.now() - searchStartTime) / 1000;
          console.log(`✅ Search completed in ${searchTime.toFixed(2)} seconds`);
        }
        
        // Clean the response before displaying it
        const cleanedRecommendation = cleanResponseText(data.result);
        setRecommendation(cleanedRecommendation);
        console.log('✅ Recommendation received, length:', cleanedRecommendation.length);
        
        // Extract hotels from the recommendation using the improved parser
        try {
          const extractedHotels = parseHotelsFromMarkdown(cleanedRecommendation);
          
          if (!extractedHotels || extractedHotels.length === 0) {
            console.warn('⚠️ No hotels could be extracted from the response');
            setHotels([]);
          } else {
            // Remove any duplicates
            const uniqueHotels = extractedHotels.filter((hotel, index, self) =>
              index === self.findIndex((h) => h.name === hotel.name)
            );
            
            setHotels(uniqueHotels);
            console.log('✅ Extracted hotels:', uniqueHotels.length);
          }
        } catch (parseError) {
          console.error('❌ Error parsing hotels from markdown:', parseError);
          setError('There was an error processing the hotel information. Please try again.');
          // Still set the recommendation so users can see raw data
          setRecommendation(cleanedRecommendation);
        }
        
      } catch (error) {
        console.error('❌ Error during search:', error);
        setError('Sorry, we couldn\'t complete the search. Please try again later.');
        toast({
          title: "Search Error",
          description: "We couldn't complete your search. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
        if (requestTimeoutRef.current) {
          clearTimeout(requestTimeoutRef.current);
        }
      }
    };
    
    performSearch();
    
    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
    };
  }, [destination, allergies, toast, navigate]);

  // SEO metadata
  const pageTitle = `Allergy-Friendly Hotels in ${destination} | Safe Dining for ${allergies} Allergies`;
  const pageDescription = `Discover the best allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Expert recommendations for safe accommodations.`;
  const canonicalUrl = `https://www.allergy-free-travel.com/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergies)}`;
  const imageUrl = "https://www.allergy-free-travel.com/lovable-uploads/e8b4dc3d-60a2-4fb7-bc33-77580f4d249c.png";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <BackButton />
            <SafetyNotice />

            {error && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSearching ? (
              <LoadingState />
            ) : (
              <HotelList 
                hotels={hotels} 
                destination={destination} 
                allergies={allergies}
                error={error || undefined}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
