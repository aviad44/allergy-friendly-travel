
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hotel } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cleanResponseText } from "@/components/search/utils";
import { Helmet } from "react-helmet";

interface HotelInfo {
  name: string;
  url?: string;
  accommodations?: string;
  dietary?: string;
  reviews?: string;
  safety?: string;
}

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
        setHotels(extractedHotels);
        
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

      <div className="min-h-screen bg-white pb-12">
        {/* Hero Section */}
        <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] overflow-hidden">
          <img
            src={`https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80`}
            alt={`${destination} hotels`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-white font-bold mb-2">
              Allergy-Friendly Hotels in {destination}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Safe accommodations for visitors with {allergies} allergies
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-6 text-amber-800 text-sm">
            <p className="flex items-start gap-2">
              <span className="font-semibold">Safety Notice:</span> Always verify allergy accommodations directly 
              with hotels before booking. Allergy severity varies, and hotel policies may change.
            </p>
          </div>

          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-lg">Finding the perfect hotel for your needs...</p>
            </div>
          ) : hotels.length > 0 ? (
            <div className="space-y-0">
              {hotels.map((hotel, index) => (
                <div 
                  key={index}
                  className="border-b border-gray-200 py-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-teal-600 flex-shrink-0">
                        <Hotel className="h-10 w-10" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">**{hotel.name}</h2>
                        {hotel.url && (
                          <a 
                            href={hotel.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-teal-600 hover:underline flex items-center gap-1"
                          >
                            Website <span className="inline-block h-3 w-3">⟶</span>
                          </a>
                        )}
                      </div>
                    </div>
                    {hotel.url && (
                      <Button 
                        className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto"
                        onClick={() => window.open(hotel.url, "_blank")}
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <p className="mb-4">
                    Here are some allergy-friendly hotels in {destination} that cater to guests with {allergies} allergies:
                  </p>
                  
                  {hotels.map((hotel, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-bold mb-1">{hotel.name} {hotel.url ? `| ${hotel.url}` : ''}</h3>
                      
                      {hotel.accommodations && (
                        <p className="mb-3">
                          <span className="font-bold">Key Allergy Accommodations:</span> {hotel.accommodations}
                        </p>
                      )}
                      
                      {hotel.dietary && (
                        <p className="mb-3">
                          <span className="font-bold">Special Dietary Considerations:</span> {hotel.dietary}
                        </p>
                      )}
                      
                      {hotel.reviews && (
                        <p className="mb-3">
                          <span className="font-bold">Authentic Guest Reviews:</span> {hotel.reviews}
                        </p>
                      )}
                      
                      {hotel.safety && (
                        <p className="mb-3">
                          <span className="font-bold">Additional Safety Information:</span> {hotel.safety}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p>No results found. Please try another search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Function to parse hotel information from the markdown response
function parseHotelsFromMarkdown(markdown: string): HotelInfo[] {
  const hotels: HotelInfo[] = [];
  
  // Split by hotel entries (separated by --- or by double newlines)
  const hotelSections = markdown.split(/---|(?:\n\n|\r\n\r\n)/);
  
  for (const section of hotelSections) {
    if (!section.trim()) continue;
    
    // Extract hotel name and URL
    const nameUrlMatch = section.match(/\*\*(.*?)\*\*\s*\|\s*(https?:\/\/[\w\d\.-]+\.[a-z\.]{2,6}[^\s]*)/i);
    
    if (!nameUrlMatch) continue;
    
    const name = nameUrlMatch[1].trim();
    const url = nameUrlMatch[2].trim();
    
    // Extract accommodations info
    const accommodationsMatch = section.match(/\*\*Key Allergy Accommodations:\*\*(.*?)(?:\*\*|$)/is);
    const dietaryMatch = section.match(/\*\*Special Dietary Considerations:\*\*(.*?)(?:\*\*|$)/is);
    const reviewsMatch = section.match(/\*\*Authentic Guest Reviews:\*\*(.*?)(?:\*\*|$)/is);
    const safetyMatch = section.match(/\*\*Additional Safety Information:\*\*(.*?)(?:\*\*|$)/is);
    
    const hotel: HotelInfo = {
      name,
      url,
      accommodations: accommodationsMatch ? accommodationsMatch[1].trim() : undefined,
      dietary: dietaryMatch ? dietaryMatch[1].trim() : undefined,
      reviews: reviewsMatch ? reviewsMatch[1].trim() : undefined,
      safety: safetyMatch ? safetyMatch[1].trim() : undefined,
    };
    
    hotels.push(hotel);
  }
  
  return hotels;
}

export default SearchResults;
