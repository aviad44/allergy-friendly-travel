
import { useEffect, useState, useCallback } from "react";
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

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const destination = searchParams.get("destination") || "";
  const allergies = searchParams.get("allergies") || "";
  
  const [recommendation, setRecommendation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState<HotelInfo[]>([]);
  
  useEffect(() => {
    console.log('Search Parameters:', { destination, allergies }); // Debug log
    
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
      
      try {
        console.log('Sending search request to Supabase search-with-gpt function');
        const {
          data,
          error
        } = await supabase.functions.invoke('search-with-gpt', {
          body: {
            destination,
            allergies
          }
        });
        
        if (error) {
          console.error('Supabase Function Error:', error);
          throw error;
        }
        
        if (!data?.recommendation) {
          console.error('No recommendation data:', data);
          throw new Error('No recommendation received from the AI');
        }
        
        console.log('Received recommendation:', data.recommendation);
        
        // Clean the response before displaying it
        const cleanedRecommendation = cleanResponseText(data.recommendation);
        setRecommendation(cleanedRecommendation);
        
        // Extract hotels from the recommendation
        const extractedHotels = parseHotelsFromMarkdown(cleanedRecommendation);
        console.log('Extracted hotels:', extractedHotels);
        
        // Remove any duplicates
        const uniqueHotels = extractedHotels.filter((hotel, index, self) =>
          index === self.findIndex((h) => h.name === hotel.name)
        );
        
        setHotels(uniqueHotels);
        
      } catch (error) {
        console.error('Error during search:', error);
        toast({
          title: "Search Error",
          description: "Sorry, we couldn't complete the search. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    };
    
    performSearch();
  }, [destination, allergies, toast, navigate]);

  // SEO metadata
  const pageTitle = `Allergy-Friendly Hotels in ${destination} | Safe Dining for ${allergies} Allergies`;
  const pageDescription = `Discover the best allergy-friendly hotels in ${destination} for travelers with ${allergies} allergies. Expert recommendations for safe accommodations.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {/* Back Button */}
            <BackButton />
            
            {/* Safety Notice */}
            <SafetyNotice />

            {/* Title section */}
            <div className="mb-6 mt-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2">
                Allergy-Friendly Hotels in {destination}
              </h1>
              <p className="text-gray-600">
                Safe accommodations for visitors with {allergies} allergies
              </p>
            </div>

            {isSearching ? (
              <LoadingState />
            ) : (
              <HotelList 
                hotels={hotels} 
                destination={destination} 
                allergies={allergies} 
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
