
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
    const query = encodeURIComponent(`${hotelName}, ${location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Extract star rating
  const starRating = hotel.rating ? Math.round(hotel.rating) : 4;

  // Clean hotel name by removing star indicators
  const cleanHotelName = hotel.name.replace(/\d+[\s-]stars?/i, '').replace(/★+/g, '').trim();
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-5">
        {/* Hotel Name and Stars */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-900">{cleanHotelName}</h2>
          <div className="flex">
            {Array.from({ length: starRating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        
        {/* Location with Map Link */}
        {hotel.location && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <a 
              href={getGoogleMapsUrl(cleanHotelName, hotel.location)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>{hotel.location}</span>
            </a>
          </div>
        )}
        
        {/* Hotel Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {hotel.description || `A hotel offering accommodations for guests with dietary restrictions and allergies.`}
          </p>
        </div>
        
        {/* Guest Review */}
        {hotel.reviews && hotel.reviews.length > 0 && (
          <div className="mb-4 bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600 italic">"{hotel.reviews[0]}"</p>
          </div>
        )}
        
        {/* Allergy Amenities Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.allergyAmenities && hotel.allergyAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
              <span className="text-teal-600 mr-1">✓</span>
              <span>{amenity.text}</span>
            </div>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
          {hotel.url ? (
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm h-9" onClick={() => window.open(hotel.url, "_blank")}>
              Book Now
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          ) : null}
          
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
