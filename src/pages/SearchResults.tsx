
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

// Verified working hotel images
const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
];

// Sample guest reviews
const SAMPLE_REVIEWS = [
  "The kitchen staff was extremely knowledgeable about gluten cross-contamination. I felt completely safe dining here.",
  "They provided me with detailed allergen information for every dish and even prepared a special menu for my nut allergy.",
  "The chef personally came to discuss my dietary restrictions and created custom meals throughout my stay.",
  "They have a dedicated allergy-friendly menu. I was able to enjoy delicious meals despite my severe allergies.",
  "The staff took my celiac disease seriously and ensured all my meals were 100% gluten-free."
];

// Different price points for more realistic hotel pricing
const PRICE_POINTS = ['$129', '$159', '$189', '$219', '$249', '$299'];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const destination = searchParams.get("destination") || "";
  const allergies = searchParams.get("allergies") || "";
  
  const [recommendation, setRecommendation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState<HotelInfo[]>([]);
  
  // Memoized function to enhance hotels with proper images, pricing, and reviews
  const enhanceHotelData = useCallback((extractedHotels: HotelInfo[]) => {
    return extractedHotels.map((hotel, index) => {
      // Ensure each hotel has a unique index for image selection
      const imageIndex = index % HOTEL_IMAGES.length;
      const priceIndex = (index + Math.floor(Math.random() * 3)) % PRICE_POINTS.length;
      
      const enhancedHotel: HotelInfo = {
        ...hotel,
        rating: (Math.floor(Math.random() * 10) + 36) / 10, // Random rating between 3.6-4.5
        location: destination, // Add location information
        imageUrl: HOTEL_IMAGES[imageIndex],
        price: PRICE_POINTS[priceIndex],
        reviews: hotel.reviews && hotel.reviews.length > 0 
          ? hotel.reviews 
          : [SAMPLE_REVIEWS[index % SAMPLE_REVIEWS.length]],
        allergyAmenities: [
          { icon: "✓", text: "Allergen menu available" },
          { icon: "✓", text: "Staff trained on cross-contamination" },
          { icon: "✓", text: `${allergies}-free options available` }
        ],
        description: hotel.description || `A premier hotel in ${destination} offering exceptional accommodations for guests with dietary restrictions and allergies. The staff is well-trained to handle ${allergies} allergies with the utmost care.`
      };
      
      return enhancedHotel;
    });
  }, [destination, allergies]);
  
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
        
        // Enhance hotels with additional information
        const enhancedHotels = enhanceHotelData(extractedHotels);
        
        // Remove any duplicates
        const uniqueHotels = enhancedHotels.filter((hotel, index, self) =>
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
  }, [destination, allergies, toast, navigate, enhanceHotelData]);

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
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6">
            {/* Back Button */}
            <BackButton />
            
            {/* Safety Notice */}
            <SafetyNotice />

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
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
