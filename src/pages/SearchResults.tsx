
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

import { HotelInfo } from "@/types/search";
import { BackButton } from "@/components/search/BackButton";
import { SafetyNotice } from "@/components/search/SafetyNotice";
import { LoadingState } from "@/components/search/LoadingState";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRef } from "react";

// New hotel results display component
interface HotelResultsProps {
  hotels: any[];
  destination: string;
  allergies: string;
}

const HotelResults = ({ hotels, destination, allergies }: HotelResultsProps) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">⚠️ No safe options found for your filters.</div>
        <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Found {hotels.length} allergy-friendly hotels in {destination}
      </h2>
      
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card bg-white border-radius-12 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            {hotel.hotel_name || hotel.name} {hotel.city && `– ${hotel.city}`}{hotel.country && `, ${hotel.country}`}
          </h3>
          
          {hotel.summary && (
            <p className="text-gray-600 mb-3">{hotel.summary}</p>
          )}
          
          {hotel.safety_score && (
            <p className="mb-3">
              <strong className="text-green-600">Safety score:</strong> 
              <span className="ml-1 font-semibold">{hotel.safety_score}/10</span>
            </p>
          )}
          
          {hotel.reasons && hotel.reasons.length > 0 && (
            <div className="mb-3">
              <strong className="text-gray-700">Why it's safe:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {hotel.reasons.map((reason: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600">{reason}</li>
                ))}
              </ul>
            </div>
          )}
          
          {hotel.proof_points && hotel.proof_points.length > 0 && (
            <div>
              <strong className="text-gray-700">Proof:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {hotel.proof_points.map((proof: any, idx: number) => (
                  <li key={idx} className="text-sm">
                    <a 
                      href={proof.url} 
                      target="_blank" 
                      rel="nofollow noopener" 
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {proof.title || proof.type || proof.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const requestTimeoutRef = useRef<number | null>(null);
  
  const destination = searchParams.get("destination") || "";
  const allergiesParam = searchParams.get("allergies") || "";
  const allergies = allergiesParam;
  
  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
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
    
    // Check if we already have search results from navigation state
    const existingResults = location.state?.searchResults;
    if (existingResults && existingResults.results) {
      console.log('✅ Using existing search results from navigation state');
      setHotels(existingResults.results);
      return;
    }
    
    const performSearch = async () => {
      setIsSearching(true);
      setError(null);
      
      try {
        console.log('🏨 Calling hotel-search function for:', { destination, allergies });
        
        const { data, error } = await supabase.functions.invoke('hotel-search', {
          body: { destination, allergies: allergies.split(',') }
        });
        
        if (error) {
          console.error('❌ Hotel search error:', error);
          setError('Failed to search for hotels. Please try again.');
          return;
        }
        
        console.log('✅ Hotel search results:', data);
        
        if (data && data.results && data.results.length > 0) {
          setHotels(data.results);
        } else {
          setError('No allergy-friendly hotels found for your search criteria.');
        }
      } catch (error) {
        console.error('💥 Search error:', error);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setIsSearching(false);
      }
    };
    
    performSearch();
  }, [destination, allergies, toast, navigate, location.state]);


  return (
    <>

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
              <HotelResults 
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
