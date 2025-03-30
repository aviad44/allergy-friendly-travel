
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-5 mb-6">
      <div className="flex flex-col">
        {/* Hotel Name and Location */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{hotel.name}</h2>
          {hotel.location && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span>{hotel.location}</span>
            </div>
          )}
        </div>
        
        {/* About the Hotel */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">About the Hotel</h3>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">
            {hotel.description || `A premier hotel offering exceptional accommodations for guests with dietary restrictions and allergies.`}
          </p>
        </div>
        
        {/* Guest Review */}
        {hotel.reviews && hotel.reviews.length > 0 && (
          <div className="mb-4 border-l-4 border-teal-500 pl-3 py-1">
            <h3 className="text-sm font-medium text-gray-700">Guest Review</h3>
            <p className="text-sm text-gray-600 italic mt-1">"{hotel.reviews[0]}"</p>
          </div>
        )}
        
        {/* Allergy Amenities Tags */}
        {hotel.allergyAmenities && hotel.allergyAmenities.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4 mt-2">
            {hotel.allergyAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-sm text-teal-700">
                <Check className="h-4 w-4 text-teal-600 mr-1.5" />
                <span>{amenity.text}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
          {hotel.url ? (
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => window.open(hotel.url, "_blank")}
            >
              Book Now
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={onViewDetails}
            >
              Book Now
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          )}
          
          {onViewDetails && (
            <Button 
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
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
