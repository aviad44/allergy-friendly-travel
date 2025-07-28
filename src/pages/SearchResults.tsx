
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
  const allergiesParam = searchParams.get("allergies") || "";
  // Handle both comma-separated and single allergy formats for backward compatibility
  const allergies = allergiesParam.includes(',') ? allergiesParam : allergiesParam;
  
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
      
      try {
        console.log('🚀 Starting hybrid search for:', { destination, allergies });
        
        // שימוש במנוע החיפוש ההיברידי החדש
        const { hybridSearch } = await import('@/utils/hybridSearch');
        const results = await hybridSearch.search({ destination, allergies });
        
        if (searchStartTime) {
          const searchTime = (Date.now() - searchStartTime) / 1000;
          console.log(`Hybrid search completed in ${searchTime.toFixed(2)} seconds`);
        }
        
        console.log(`✅ Hybrid search found ${results.length} hotels`);
        
        if (results && results.length > 0) {
          setHotels(results);
        } else {
          setError('לא נמצאו מלונות מתאימים. אנא נסה חיפוש אחר.');
        }
      } catch (error) {
        console.error('💥 Hybrid search error:', error);
        setError('אירעה שגיאה בחיפוש. אנא נסה שוב מאוחר יותר.');
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

  // SEO metadata - handle multiple allergies in the description
  const allergiesDisplay = allergiesParam.includes(',') ? allergiesParam.replace(/,/g, ', ') : allergiesParam;
  const pageTitle = `Allergy-Friendly Hotels in ${destination} | Safe Dining for ${allergiesDisplay} Allergies`;
  const pageDescription = `Discover the best allergy-friendly hotels in ${destination} for travelers with ${allergiesDisplay} allergies. Expert recommendations for safe accommodations.`;
  const canonicalUrl = `https://www.allergy-free-travel.com/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}`;
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
