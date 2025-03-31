
import React from 'react';
import { MapPin, Star, ExternalLink } from 'lucide-react';

interface HotelHeaderProps {
  name: string;
  location?: string;
  price?: string;
  rating?: number;
}

export const HotelHeader: React.FC<HotelHeaderProps> = ({ name, location, price, rating }) => {
  // Generate Google Maps URL
  const getGoogleMapsUrl = (hotelName: string, hotelLocation: string) => {
    const query = encodeURIComponent(`${hotelName}, ${hotelLocation}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Extract star rating if available in the name
  const extractStarRating = (hotelName: string): number => {
    const starMatch = hotelName.match(/(\d+)[\s-]stars?|(\d+)[\s-]★/i);
    if (starMatch) {
      return parseInt(starMatch[1] || starMatch[2], 10);
    }
    
    // Count the number of star symbols
    const stars = (hotelName.match(/★/g) || []).length;
    if (stars > 0) {
      return stars;
    }
    
    // Use provided rating or default
    return rating || 4;
  };
  
  const starRating = extractStarRating(name);
  
  // Clean hotel name by removing star indicators
  const cleanHotelName = name
    .replace(/\d+[\s-]stars?/i, '')
    .replace(/★+/g, '')
    .trim();

  return (
    <div className="flex flex-wrap items-start justify-between border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{cleanHotelName}</h2>
        {location && (
          <a 
            href={getGoogleMapsUrl(cleanHotelName, location)} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mt-1.5 text-gray-600 hover:text-primary"
          >
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{location}</span>
            <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
          </a>
        )}
        
        {/* Star Rating display */}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: starRating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
