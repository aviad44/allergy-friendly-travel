
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, MapPin } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
  onViewDetails?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="p-5">
        {/* Hotel Name and Location */}
        <div className="mb-3">
          <h2 className="text-lg font-bold text-gray-900">{hotel.name}</h2>
          {hotel.location && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>{hotel.location}</span>
            </div>
          )}
        </div>
        
        {/* Hotel Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 line-clamp-3">
            {hotel.description || `A hotel offering accommodations for guests with dietary restrictions and allergies.`}
          </p>
        </div>
        
        {/* Guest Review */}
        {hotel.reviews && hotel.reviews.length > 0 && (
          <div className="mb-3 bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600 italic line-clamp-2">"{hotel.reviews[0]}"</p>
          </div>
        )}
        
        {/* Allergy Amenities Tags */}
        {hotel.allergyAmenities && hotel.allergyAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.allergyAmenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
                <Check className="h-3 w-3 text-teal-600 mr-1" />
                <span>{amenity.text}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
          {hotel.url ? (
            <Button 
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm h-9"
              onClick={() => window.open(hotel.url, "_blank")}
            >
              Book Now
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          ) : null}
          
          {onViewDetails && (
            <Button 
              variant="outline" 
              className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 text-sm h-9"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
