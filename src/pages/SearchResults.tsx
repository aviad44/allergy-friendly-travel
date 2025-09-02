
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

  const createBookingUrl = (url: string) => {
    if (!url) return '#';
    const utmParams = new URLSearchParams({
      utm_source: 'allergy-free-travel.com',
      utm_medium: 'hotel_search',
      utm_campaign: 'allergy_friendly_booking',
      utm_content: 'hotel_recommendation'
    });
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${utmParams.toString()}`;
  };

  const createMapsUrl = (hotelName: string, address: string) => {
    const query = encodeURIComponent(`${hotelName} ${address}`);
    return `https://maps.google.com/?q=${query}`;
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Found {hotels.length} allergy-friendly hotels in {destination}
      </h2>
      
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              {hotel.hotel_name || hotel.name}
              {hotel.city && ` – ${hotel.city}`}
              {hotel.country && `, ${hotel.country}`}
            </h3>
            
            {hotel.address ? (
              <div className="mb-3">
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Address:</strong> {hotel.address}
                </p>
                <a 
                  href={createMapsUrl(hotel.hotel_name || hotel.name || '', hotel.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                >
                  📍 View on Google Maps
                </a>
              </div>
            ) : (
              // Fallback if no address - create maps link with hotel name and city
              (hotel.city || hotel.country) && (
                <div className="mb-3">
                  <a 
                    href={createMapsUrl(hotel.hotel_name || hotel.name || '', `${hotel.city || ''} ${hotel.country || ''}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                  >
                    📍 View on Google Maps
                  </a>
                </div>
              )
            )}
          </div>
          
          {hotel.summary && (
            <p className="text-gray-600 mb-3">{hotel.summary}</p>
          )}
          
          {hotel.safety_score && (
            <div className="mb-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                Safety score: {hotel.safety_score}/10
              </span>
            </div>
          )}
          
          {hotel.reasons && hotel.reasons.length > 0 && (
            <div className="mb-4">
              <strong className="text-gray-700 block mb-2">Why it's safe:</strong>
              <ul className="list-disc list-inside space-y-1">
                {hotel.reasons.map((reason: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600">{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {hotel.guest_reviews && hotel.guest_reviews.length > 0 && (
            <div className="mb-4">
              <strong className="text-gray-700 block mb-2">Guest Reviews:</strong>
              {hotel.guest_reviews.map((review: any, idx: number) => (
                <blockquote key={idx} className="border-l-4 border-blue-200 pl-4 mb-2 bg-blue-50 py-2 rounded-r">
                  <p className="text-sm text-gray-700 italic">"{review.text}"</p>
                  {review.author && (
                    <cite className="text-xs text-gray-500 mt-1 block">
                      – {review.author}
                      {review.source && ` via ${review.source}`}
                    </cite>
                  )}
                </blockquote>
              ))}
            </div>
          )}
          
          {hotel.proof_points && hotel.proof_points.length > 0 && (
            <div className="mb-4">
              <strong className="text-gray-700 block mb-2">Proof & Resources:</strong>
              <ul className="space-y-1">
                {hotel.proof_points.map((proof: any, idx: number) => (
                  <li key={idx} className="text-sm">
                    <a 
                      href={proof.url} 
                      target="_blank" 
                      rel="nofollow noopener" 
                      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                    >
                      🔗 {proof.title || proof.type || proof.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(hotel.booking_url || (hotel.hotel_name && hotel.city)) && (
            <div className="border-t pt-4">
              <a
                href={createBookingUrl(hotel.booking_url || `https://www.booking.com/searchresults.html?ss=${encodeURIComponent((hotel.hotel_name || '') + ' ' + (hotel.city || '') + ' ' + (hotel.country || ''))}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                🏨 Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
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
        
        // Split allergies if it's a comma-separated string
        const allergiesArray = allergies.includes(',') ? allergies.split(',').map(a => a.trim()) : [allergies];
        
        const { data, error } = await supabase.functions.invoke('hotel-search', {
          body: { destination, allergies: allergiesArray }
        });
        
        console.log('📡 Supabase function response:', { data, error });
        
        if (error) {
          console.error('❌ Hotel search error:', error);
          setError('Failed to search for hotels. Please try again.');
          return;
        }
        
        console.log('✅ Hotel search results:', data);
        
        if (data && data.results && data.results.length > 0) {
          setHotels(data.results);
          console.log(`🏨 Found ${data.results.length} hotels`);
        } else {
          setError('No allergy-friendly hotels found for your search criteria.');
          console.log('⚠️ No hotels found in response');
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
