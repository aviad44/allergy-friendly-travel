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
        const userInput = `Find allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Please provide specific hotels with detailed allergy accommodation information.`;

        console.log('📡 Calling openai-proxy function...');
        
        const { data, error } = await supabase.functions.invoke('openai-proxy', {
          body: {
            userInput: userInput,
            model: "gpt-4o-mini",
            temperature: 0.7,
            max_tokens: 2500
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
        
        console.log('📄 Raw OpenAI response received');
        console.log('📊 Response length:', data.result.length);
        console.log('📋 First 500 chars:', data.result.substring(0, 500));
        console.log('📋 Last 500 chars:', data.result.substring(data.result.length - 500));
        
        // Clean the response
        const cleanedRecommendation = cleanResponseText(data.result);
        setRecommendation(cleanedRecommendation);
        
        // Parse hotels with improved logging
        console.log('🔧 Starting hotel extraction with improved parser...');
        const extractedHotels = parseHotelsFromMarkdown(cleanedRecommendation);
        
        console.log('🎯 Parser results:', {
          hotelsFound: extractedHotels.length,
          hotels: extractedHotels.map(h => ({ name: h.name, features: h.allergyFeatures?.length || 0 }))
        });
        
        if (!extractedHotels || extractedHotels.length === 0) {
          console.warn('⚠️ No hotels extracted, but response was received');
          setError('Could not extract hotel information from the response. The search worked, but we had trouble formatting the results. Please try again.');
          setHotels([]);
        } else {
          // Remove duplicates and validate
          const validHotels = extractedHotels.filter(hotel => 
            hotel && hotel.name && hotel.name.length > 3
          );
          
          const uniqueHotels = validHotels.filter((hotel, index, self) =>
            index === self.findIndex((h) => h.name === hotel.name)
          );
          
          console.log(`✅ Final result: ${uniqueHotels.length} valid unique hotels`);
          setHotels(uniqueHotels);
        }
        
      } catch (error) {
        console.error('❌ Error during search:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        if (errorMessage.includes('insufficient_quota') || errorMessage.includes('429')) {
          setError('API quota exceeded. Please check your OpenAI account billing and try again later.');
        } else if (errorMessage.includes('401')) {
          setError('API authentication failed. Please check your OpenAI API key configuration.');
        } else {
          setError('Sorry, we couldn\'t complete the search. Please try again later.');
        }
        
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
    
    // Cleanup function
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
