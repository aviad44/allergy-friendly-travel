
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

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const destination = searchParams.get("destination") || "";
  const allergies = searchParams.get("allergies") || "";
  
  const [recommendation, setRecommendation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
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
        <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
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

        <div className="container mx-auto px-4 py-8">
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
          ) : recommendation ? (
            <div className="grid grid-cols-1 gap-8">
              <Card className="p-6 sm:p-8 shadow-lg">
                <div className="prose prose-sm sm:prose max-w-none">
                  <ReactMarkdown components={{
                    h1: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mt-2 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-2 flex items-center gap-2" {...props} />,
                    p: ({node, ...props}) => <p className="my-3 text-base" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 my-3" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2" {...props} />,
                    a: ({node, href, ...props}) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-teal-600 hover:underline flex items-center gap-1" 
                        {...props}
                      >
                        {props.children} <ExternalLink className="inline-block h-4 w-4" />
                      </a>
                    ),
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />
                  }}>
                    {recommendation}
                  </ReactMarkdown>
                </div>
              </Card>

              {/* Extract hotel names and create booking buttons */}
              {extractHotelsFromRecommendation(recommendation).map((hotel, index) => (
                <Card key={index} className="p-4 border-teal-100 shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Hotel className="h-5 w-5 text-teal-600" />
                      <h3 className="font-bold text-lg">{hotel}</h3>
                    </div>
                    <Button 
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(hotel + " " + destination + " booking")}`, "_blank")}
                    >
                      Book Now
                    </Button>
                  </div>
                </Card>
              ))}
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

// Helper function to extract hotel names from the recommendation
function extractHotelsFromRecommendation(text: string): string[] {
  const hotels: string[] = [];
  
  // Look for patterns like "Hotel Name |" or "Hotel Name:"
  const hotelPatterns = [
    /([A-Za-z0-9\s&'"-]+)\s+\|/g,
    /([A-Za-z0-9\s&'"-]+):/g
  ];
  
  hotelPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const hotelName = match[1].trim();
      // Filter out non-hotel matches
      if (
        hotelName.length > 3 && 
        !hotelName.toLowerCase().includes("key") && 
        !hotelName.toLowerCase().includes("special") &&
        !hotelName.toLowerCase().includes("authentic") &&
        !hotelName.toLowerCase().includes("review") &&
        !hotelName.toLowerCase().includes("considerations")
      ) {
        hotels.push(hotelName);
      }
    }
  });
  
  // Remove duplicates
  return [...new Set(hotels)];
}

export default SearchResults;
