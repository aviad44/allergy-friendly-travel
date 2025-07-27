
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
  onViewDetails?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract simplified location (city, country)
  const getSimplifiedLocation = (location?: string) => {
    if (!location) return '';
    
    // Try to extract city and country/state
    const parts = location.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      return `${parts[0]}, ${parts[parts.length - 1]}`;
    }
    return location;
  };

  // Generate Google Maps URL with just city/location
  const getGoogleMapsUrl = (hotelName: string, location: string) => {
    if (!hotelName || !location) return '#';
    const query = encodeURIComponent(`${hotelName}, ${location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Clean hotel name by removing any numbering, stars and formatting
  const cleanHotelName = hotel.name
    ? hotel.name
        .replace(/^\d️⃣\s*\*\*Hotel Name\*\*:\s*/i, '')
        .replace(/\*\*/g, '')
        .replace(/★+/g, '') // Remove star symbols from the name
        .trim()
    : 'Allergy-Friendly Hotel';
  
  // Simplified location for display
  const simplifiedLocation = getSimplifiedLocation(hotel.location);
  
  // Extract star rating from hotel data
  const renderStars = () => {
    // Extract star rating from the name if present (e.g., "Hotel Name ★★★★★")
    let starCount = 0;
    const starsInName = (hotel.name || '').match(/★/g);
    if (starsInName) {
      starCount = starsInName.length;
    } else if (hotel.rating) {
      // Use numeric rating if available
      starCount = Math.round(hotel.rating);
    } else if (hotel.starRating) {
      // Use star rating text if available (fallback)
      return <span className="text-amber-500">{hotel.starRating}</span>;
    }

    if (starCount > 0) {
      return Array.from({ length: starCount }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ));
    }
    
    return null;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image (if available) - reduced height on mobile */}
        {hotel.imageUrl && (
          <div className="w-full md:w-1/3 h-36 md:h-auto overflow-hidden">
            <img 
              src={hotel.imageUrl} 
              alt={`${cleanHotelName} exterior`} 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-4 flex-1 flex flex-col">
          {/* Hotel Name and Stars - MORE COMPACT */}
          <div className="flex justify-between items-start mb-1.5">
            <h2 className="text-base font-bold text-gray-900 line-clamp-1">{cleanHotelName}</h2>
            <div className="flex ml-1.5 shrink-0">
              {renderStars()}
            </div>
          </div>
          
          {/* Simplified Location with Map Link */}
          {simplifiedLocation && (
            <a 
              href={getGoogleMapsUrl(cleanHotelName, hotel.location || '')}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-500 text-xs mb-2 hover:text-primary"
            >
              <MapPin className="h-3 w-3 mr-1 shrink-0" />
              <span className="truncate">{simplifiedLocation}</span>
              <ExternalLink className="h-2.5 w-2.5 ml-1 opacity-70 shrink-0" />
            </a>
          )}
          
          {/* Hotel Description with Truncation */}
          {hotel.description && (
            <div className="mb-2">
              <p className={`text-xs text-gray-600 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                {hotel.description}
              </p>
              {hotel.description.length > 100 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-primary flex items-center gap-1 p-0 h-5 mt-0.5"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp className="h-3 w-3" /></>
                  ) : (
                    <>Show More <ChevronDown className="h-3 w-3" /></>
                  )}
                </Button>
              )}
            </div>
          )}
          
          {/* Guest Reviews Preview */}
          {hotel.reviews && hotel.reviews.length > 0 && (
            <div className="mb-3">
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <div className="flex items-start mb-2">
                  <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-semibold mr-2">
                    💬
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-700 italic line-clamp-2">
                      "{hotel.reviews[0]}"
                    </p>
                    <div className="mt-1 text-xs text-teal-600 font-medium">
                      - Verified Guest Review
                    </div>
                  </div>
                </div>
                {hotel.reviews.length > 1 && (
                  <div className="text-xs text-teal-600 text-center">
                    +{hotel.reviews.length - 1} more reviews
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Allergy Features - SIMPLIFIED */}
          {hotel.allergyFeatures && hotel.allergyFeatures.length > 0 && (
            <div className="mb-3">
              <ul className="text-xs space-y-0.5">
                {hotel.allergyFeatures.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-teal-600 mr-1.5 text-xs">✓</span>
                    <span className="text-gray-600 line-clamp-1">{feature}</span>
                  </li>
                ))}
                {hotel.allergyFeatures.length > 2 && (
                  <li className="text-xs text-primary">+{hotel.allergyFeatures.length - 2} more features</li>
                )}
              </ul>
            </div>
          )}
          
          {/* Action buttons - MORE COMPACT */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t">
            {hotel.url && (
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs h-8" onClick={() => window.open(hotel.url, "_blank")}>
                Book Now
                <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            )}
            
            {onViewDetails && (
              <Button variant="outline" className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 text-xs h-8" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
