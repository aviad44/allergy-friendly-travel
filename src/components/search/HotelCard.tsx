
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Star } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
  onViewDetails?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onViewDetails
}) => {
  // Generate Google Maps URL
  const getGoogleMapsUrl = (hotelName: string, location: string) => {
    if (!hotelName || !location) return '#';
    const query = encodeURIComponent(`${hotelName}, ${location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

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

  // Clean hotel name by removing any numbering or formatting
  const cleanHotelName = hotel.name
    ? hotel.name
        .replace(/^\d️⃣\s*\*\*Hotel Name\*\*:\s*/i, '')
        .replace(/\*\*/g, '')
        .trim()
    : 'Allergy-Friendly Hotel';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        {/* Hotel Name and Stars */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-900">{cleanHotelName}</h2>
          <div className="flex">
            {renderStars()}
          </div>
        </div>
        
        {/* Location with Map Link */}
        {hotel.location && (
          <a 
            href={getGoogleMapsUrl(cleanHotelName, hotel.location)}
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-500 text-sm mb-3 hover:text-primary"
          >
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{hotel.location}</span>
          </a>
        )}
        
        {/* Hotel Description */}
        {hotel.description && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 line-clamp-3">
              {hotel.description}
            </p>
          </div>
        )}
        
        {/* Allergy Amenities */}
        {hotel.allergyFeatures && hotel.allergyFeatures.length > 0 && (
          <div className="mb-4">
            <ul className="text-sm space-y-1">
              {hotel.allergyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-teal-600 mr-2 text-sm">✓</span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Guest Review */}
        {hotel.reviews && hotel.reviews.length > 0 && (
          <div className="mb-4 bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600 italic">"{hotel.reviews[0]}"</p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
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
  );
};
