
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

  // Clean hotel name by removing any numbering or formatting
  const cleanHotelName = hotel.name
    ? hotel.name
        .replace(/^\d️⃣\s*\*\*Hotel Name\*\*:\s*/i, '')
        .replace(/\*\*/g, '')
        .trim()
    : 'Allergy-Friendly Hotel';
  
  // Simplified location for display
  const simplifiedLocation = getSimplifiedLocation(hotel.location);
  
  // Extract star rating from hotel data
  const renderStars = () => {
    if (hotel.rating) {
      const starCount = Math.round(hotel.rating);
      return Array.from({ length: starCount }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ));
    } else if (hotel.starRating) {
      return <span className="text-amber-500">{hotel.starRating}</span>;
    }
    return null;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image (if available) */}
        {hotel.imageUrl && (
          <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
            <img 
              src={hotel.imageUrl} 
              alt={`${cleanHotelName} exterior`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-5 flex-1 flex flex-col">
          {/* Hotel Name and Stars - ONLY SHOW STARS HERE */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-gray-900">{cleanHotelName}</h2>
            <div className="flex ml-2 shrink-0">
              {renderStars()}
            </div>
          </div>
          
          {/* Simplified Location with Map Link */}
          {simplifiedLocation && (
            <a 
              href={getGoogleMapsUrl(cleanHotelName, hotel.location || '')}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-500 text-sm mb-3 hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>{simplifiedLocation}</span>
            </a>
          )}
          
          {/* Hotel Description with Truncation */}
          {hotel.description && (
            <div className="mb-3">
              <p className={`text-sm text-gray-600 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                {hotel.description}
              </p>
              {hotel.description.length > 150 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-primary flex items-center gap-1 p-0 h-6 mt-1"
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
          
          {/* Allergy Features */}
          {hotel.allergyFeatures && hotel.allergyFeatures.length > 0 && (
            <div className="mb-4">
              <ul className="text-sm space-y-1">
                {hotel.allergyFeatures.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-teal-600 mr-2 text-sm">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {hotel.allergyFeatures.length > 3 && (
                  <li className="text-xs text-primary mt-1">+{hotel.allergyFeatures.length - 3} more features</li>
                )}
              </ul>
            </div>
          )}
          
          {/* Guest Review - Full display with quote styling */}
          {hotel.reviews && hotel.reviews.length > 0 && hotel.reviews[0] && (
            <div className="mb-4 bg-gray-50 p-4 rounded-md relative border-l-4 border-primary/40">
              <div className="absolute top-1 left-2 text-primary/20 text-3xl">"</div>
              <p className="text-sm text-gray-700 italic pl-4 pr-4">
                {hotel.reviews[0]}
              </p>
              <div className="absolute bottom-1 right-2 text-primary/20 text-3xl">"</div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t">
            {hotel.url && (
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm h-9" onClick={() => window.open(hotel.url, "_blank")}>
                Book Now
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            )}
            
            {onViewDetails && (
              <Button variant="outline" className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 text-sm h-9" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
