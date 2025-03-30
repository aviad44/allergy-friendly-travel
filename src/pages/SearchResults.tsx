
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

// Sample real hotel images for demo purposes
const SAMPLE_HOTEL_IMAGES = [
  'https://www.marriott.com/content/dam/marriott-kit/marriott/hotels/CHIDT-downtown-chicago-marriott-magnificent-mile/basic-property-information/facade/CYsDTIxkiiwj.jpg',
  'https://www.hilton.com/im/en/ORDWAHH/3254503/hh-chicago-exterior-1.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=333&rw=768&rh=512',
  'https://www.hyatt.com/content/dam/hyatt/hyattdam/images/2021/06/25/1340/CHIWH-P0765-Hotel-Exterior-16x9.jpg',
  'https://www.ihg.com/content/dam/digital/media/images/content/dam/digital/kimpton/unified/property/gallery/exterior/ORDGP/ordgp-gate-00-hero-largesm.jpg',
  'https://www.fourseasons.com/alt/img-opt/~80.930.0,0000-313,7500-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/CHI/CHI_079_aspect16x9.jpg'
];

// Sample guest reviews
const SAMPLE_REVIEWS = [
  "The kitchen staff was extremely knowledgeable about gluten cross-contamination. I felt completely safe dining here.",
  "They provided me with detailed allergen information for every dish and even prepared a special menu for my nut allergy.",
  "The chef personally came to discuss my dietary restrictions and created custom meals throughout my stay.",
  "They have a dedicated allergy-friendly menu. I was able to enjoy delicious meals despite my severe allergies.",
  "The staff took my celiac disease seriously and ensured all my meals were 100% gluten-free."
];

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
        
        // Enhance hotels with additional information for demo purposes
        const enhancedHotels = extractedHotels.map((hotel, index) => {
          // Sample data for demonstration
          const enhancedHotel: HotelInfo = {
            ...hotel,
            rating: Math.floor(Math.random() * 1.5) + 3.5, // Random rating between 3.5-5
            location: destination, // Add location information
            imageUrl: SAMPLE_HOTEL_IMAGES[index % SAMPLE_HOTEL_IMAGES.length],
            price: `$${Math.floor(Math.random() * 150) + 100}`,
            reviews: [SAMPLE_REVIEWS[index % SAMPLE_REVIEWS.length]],
            allergyAmenities: [
              { icon: "✓", text: "Allergen menu available" },
              { icon: "✓", text: "Staff trained on cross-contamination" },
              { icon: "✓", text: `${allergies}-free options available` }
            ],
            description: `A premier hotel in ${destination} offering exceptional accommodations for guests with dietary restrictions and allergies. The staff is well-trained to handle ${allergies} allergies with the utmost care.`
          };
          
          return enhancedHotel;
        });
        
        setHotels(enhancedHotels);
        
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
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="bg-white rounded-lg shadow-sm p-5 sm:p-8">
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
