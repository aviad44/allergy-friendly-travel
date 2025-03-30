
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Hotel, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import { cleanResponseText } from "@/components/search/utils";
import { Helmet } from "react-helmet";

interface HotelInfo {
  name: string;
  url?: string;
  accommodations?: string;
  dietary?: string;
  reviews?: string;
  safety?: string;
  additionalInfo?: string;
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

      <div className="min-h-screen bg-gray-50 pb-12">
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
            <div className="space-y-4">
              {hotels.map((hotel, index) => (
                <div 
                  key={index}
                  className="bg-white border-b border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                      <Hotel className="h-6 w-6 text-teal-600 flex-shrink-0" />
                      <h2 className="text-xl font-semibold">
                        {hotel.name}
                        {hotel.url && (
                          <a 
                            href={hotel.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-2 inline-flex items-center text-sm text-teal-600 hover:underline"
                          >
                            <span className="text-sm font-normal">Website</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </h2>
                    </div>
                    <Button 
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6"
                      onClick={() => {
                        if (hotel.url) {
                          window.open(hotel.url, "_blank");
                        } else {
                          window.open(`https://www.google.com/search?q=${encodeURIComponent(hotel.name + " " + destination + " booking")}`, "_blank");
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                  
                  {(hotel.accommodations || hotel.dietary || hotel.reviews || hotel.safety) && (
                    <div className="px-4 pb-4 pt-0">
                      <ul className="space-y-2">
                        {hotel.accommodations && (
                          <li>
                            <span className="font-bold">Key Allergy Accommodations:</span> {hotel.accommodations}
                          </li>
                        )}
                        {hotel.dietary && (
                          <li>
                            <span className="font-bold">Special Dietary Considerations:</span> {hotel.dietary}
                          </li>
                        )}
                        {hotel.reviews && (
                          <li>
                            <span className="font-bold">Authentic Guest Reviews:</span> {hotel.reviews}
                          </li>
                        )}
                        {hotel.safety && (
                          <li>
                            <span className="font-bold">Additional Safety Information:</span> {hotel.safety}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              {recommendation && (
                <Card className="p-6 shadow-sm mt-8 bg-gray-50 border-gray-100">
                  <h3 className="text-lg font-medium mb-3">Additional Information</h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown>
                      {recommendation}
                    </ReactMarkdown>
                  </div>
                </Card>
              )}
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
  
  // Split the markdown into sections (usually divided by headers)
  const sections = markdown.split(/(?=##?\s|(?:\d+\.)\s)/g);
  
  for (const section of sections) {
    // Skip sections that don't look like hotels
    if (!section.includes("Key Allergy Accommodations") && 
        !section.includes("Special Dietary") &&
        !section.includes("Guest Reviews")) {
      continue;
    }
    
    // Extract hotel name - look for headers or bold text at the beginning
    const nameMatch = section.match(/^(?:##?\s+|(?:\d+\.)\s+|)([^|\n]+)(?:\s+\||:)/m);
    if (!nameMatch) continue;
    
    const hotelName = nameMatch[1].trim();
    
    // Skip if it doesn't look like a hotel name
    if (hotelName.length < 3 || 
        hotelName.toLowerCase().includes("key") ||
        hotelName.toLowerCase().includes("special") ||
        hotelName.toLowerCase().includes("authentic") ||
        hotelName.toLowerCase().includes("review") ||
        hotelName.toLowerCase().includes("additional")) {
      continue;
    }
    
    // Extract URL if available
    const urlMatch = section.match(/(?:https?:\/\/[^\s)]+)/);
    const url = urlMatch ? urlMatch[0] : undefined;
    
    // Extract different sections
    const accommodationsMatch = section.match(/Key Allergy Accommodations:?\s+([^\n]*(?:\n(?!\n)[^\n]*)*)/i);
    const dietaryMatch = section.match(/Special Dietary Considerations:?\s+([^\n]*(?:\n(?!\n)[^\n]*)*)/i);
    const reviewsMatch = section.match(/(?:Authentic )?Guest Reviews:?\s+([^\n]*(?:\n(?!\n)[^\n]*)*)/i);
    const safetyMatch = section.match(/Additional Safety Information:?\s+([^\n]*(?:\n(?!\n)[^\n]*)*)/i);
    
    hotels.push({
      name: hotelName,
      url,
      accommodations: accommodationsMatch ? accommodationsMatch[1].trim() : undefined,
      dietary: dietaryMatch ? dietaryMatch[1].trim() : undefined,
      reviews: reviewsMatch ? reviewsMatch[1].trim() : undefined,
      safety: safetyMatch ? safetyMatch[1].trim() : undefined
    });
  }
  
  return hotels;
}

export default SearchResults;
