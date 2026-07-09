
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MetaManager } from "@/components/MetaManager";

import { BackButton } from "@/components/search/BackButton";
import { SafetyNotice } from "@/components/search/SafetyNotice";
import { LoadingState } from "@/components/search/LoadingState";
import { RestaurantResults } from "@/components/search/RestaurantResults";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RestaurantInfo } from "@/types/restaurant";

// Hotel results display component
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

  const confidenceLabel: Record<string, string> = {
    high: 'Strong match in real reviews',
    medium: 'Some match in real reviews',
    low: 'Possible match in real reviews',
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Found {hotels.length} hotels in {destination} with real guest reviews mentioning allergies
      </h2>

      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              {hotel.name}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mb-2">
              {typeof hotel.rating === 'number' && (
                <span className="text-sm text-gray-700">
                  ⭐ {hotel.rating.toFixed(1)}
                  {hotel.totalRatings ? ` (${hotel.totalRatings} Google reviews)` : ''}
                </span>
              )}
              {hotel.confidenceLevel && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                  {confidenceLabel[hotel.confidenceLevel] || 'Match in real reviews'}
                </span>
              )}
            </div>

            {hotel.reviewSnippet?.matchedTerms?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.reviewSnippet.matchedTerms.slice(0, 4).map((term: string, idx: number) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                    "{term}" mentioned by a guest
                  </span>
                ))}
              </div>
            )}

            {hotel.address && (
              <p className="text-gray-600 text-sm mb-1">
                <strong>Address:</strong> {hotel.address}
              </p>
            )}
            {hotel.mapsUrl && (
              <a
                href={hotel.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
              >
                📍 View on Google Maps
              </a>
            )}
          </div>

          {hotel.reviewSnippet && (
            <div className="mb-4">
              <strong className="text-gray-700 block mb-2">From a real guest review:</strong>
              <blockquote className="border-l-4 border-blue-200 pl-4 mb-2 bg-blue-50 py-2 rounded-r">
                <p className="text-sm text-gray-700 italic">"{hotel.reviewSnippet.text}"</p>
                <cite className="text-xs text-gray-500 mt-1 block">
                  – {hotel.reviewSnippet.author}
                  {hotel.reviewSnippet.relativeTime && `, ${hotel.reviewSnippet.relativeTime}`}
                  {' '}via Google
                </cite>
              </blockquote>
            </div>
          )}

          <div className="border-t pt-4 flex flex-wrap gap-3">
            {hotel.websiteUrl && (
              <a
                href={hotel.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Hotel Website
              </a>
            )}
            {hotel.bookingSearchUrl && (
              <a
                href={createBookingUrl(hotel.bookingSearchUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                🏨 Check Availability on Booking.com
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
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
  
  const destination = searchParams.get("destination") || "";
  const allergiesParam = searchParams.get("allergies") || "";
  const mode = searchParams.get("mode") || "hotels";
  const allergies = allergiesParam;
  
  // Hotels state
  const [isSearchingHotels, setIsSearchingHotels] = useState(false);
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelError, setHotelError] = useState<string | null>(null);
  
  // Restaurants state
  const [isSearchingRestaurants, setIsSearchingRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);
  const [queryPhrase, setQueryPhrase] = useState<string>("");
  const [fallbackUrl, setFallbackUrl] = useState<string>("");
  
  // Hotels search
  useEffect(() => {
    if (mode !== "hotels") return;
    
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
      console.log('✅ Using existing hotel results from navigation state');
      setHotels(existingResults.results);
      return;
    }
    
    const performSearch = async () => {
      setIsSearchingHotels(true);
      setHotelError(null);
      
      try {
        console.log('🏨 Calling hotel-search function for:', { destination, allergies });
        
        const allergiesArray = allergies.includes(',') ? allergies.split(',').map(a => a.trim()) : [allergies];
        
        const { data, error } = await supabase.functions.invoke('hotel-search', {
          body: { destination, allergies: allergiesArray }
        });
        
        console.log('📡 Supabase function response:', { data, error });
        
        if (error) {
          console.error('❌ Hotel search error:', error);
          setHotelError('Failed to search for hotels. Please try again.');
          return;
        }
        
        console.log('✅ Hotel search results:', data);
        
        if (data && data.results && data.results.length > 0) {
          setHotels(data.results);
          console.log(`🏨 Found ${data.results.length} hotels`);
        } else {
          setHotelError('No allergy-friendly hotels found for your search criteria.');
          console.log('⚠️ No hotels found in response');
        }
      } catch (error) {
        console.error('💥 Search error:', error);
        setHotelError('An error occurred while searching. Please try again.');
      } finally {
        setIsSearchingHotels(false);
      }
    };
    
    performSearch();
  }, [destination, allergies, mode, toast, navigate, location.state]);

  // Restaurants search
  const performRestaurantSearch = async () => {
    if (!destination) return;
    
    setIsSearchingRestaurants(true);
    setRestaurantError(null);
    
    try {
      console.log('🍽️ Calling restaurants-search function for:', { destination, allergies });
      
      const allergiesArray = allergies ? (allergies.includes(',') ? allergies.split(',').map(a => a.trim()) : [allergies]) : [];
      
      const { data, error } = await supabase.functions.invoke('restaurants-search', {
        body: { destination, allergies: allergiesArray, mode: 'fast' }
      });
      
      console.log('📡 Restaurant search response:', { data, error });
      
      if (error) {
        console.error('❌ Restaurant search error:', error);
        setRestaurantError('Failed to search for restaurants. Please try again.');
        setFallbackUrl(`https://www.google.com/maps/search/allergy+friendly+restaurants+in+${encodeURIComponent(destination)}`);
        return;
      }
      
      if (data.error) {
        setRestaurantError(data.error);
        setFallbackUrl(data.fallbackUrl || `https://www.google.com/maps/search/allergy+friendly+restaurants+in+${encodeURIComponent(destination)}`);
        return;
      }
      
      console.log('✅ Restaurant search results:', data);
      
      setRestaurants(data.places || []);
      setQueryPhrase(data.queryPhrase || 'allergy friendly');
      setFallbackUrl(data.fallbackUrl || `https://www.google.com/maps/search/allergy+friendly+restaurants+in+${encodeURIComponent(destination)}`);
      
      console.log(`🍽️ Found ${data.places?.length || 0} restaurants`);
    } catch (error) {
      console.error('💥 Restaurant search error:', error);
      setRestaurantError('An error occurred while searching for restaurants.');
      setFallbackUrl(`https://www.google.com/maps/search/allergy+friendly+restaurants+in+${encodeURIComponent(destination)}`);
    } finally {
      setIsSearchingRestaurants(false);
    }
  };

  // Initial restaurant search
  useEffect(() => {
    if (mode !== "restaurants") return;
    
    if (!destination) {
      toast({
        title: "Missing destination",
        description: "Please perform a search from the home page",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    performRestaurantSearch();
  }, [destination, allergies, mode]);

  const isLoading = mode === "hotels" ? isSearchingHotels : isSearchingRestaurants;
  const error = mode === "hotels" ? hotelError : restaurantError;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <MetaManager />
          <h1 className="sr-only">
            Allergy-Friendly Hotels in {destination || "Your Destination"}
          </h1>
          <BackButton />
          
          {mode === "hotels" && <SafetyNotice />}

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                {mode === "restaurants" && fallbackUrl && (
                  <a 
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 inline-flex items-center gap-1 text-primary-foreground underline hover:no-underline"
                  >
                    View on Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </AlertDescription>
            </Alert>
          )}

          {mode === "hotels" ? (
            isSearchingHotels ? (
              <LoadingState />
            ) : (
              <HotelResults 
                hotels={hotels} 
                destination={destination} 
                allergies={allergies}
              />
            )
          ) : (
            <RestaurantResults 
              restaurants={restaurants}
              destination={destination}
              queryPhrase={queryPhrase}
              fallbackUrl={fallbackUrl}
              isLoading={isSearchingRestaurants}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
