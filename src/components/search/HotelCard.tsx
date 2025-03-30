
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Shield, Check } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
  onViewDetails?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewDetails }) => {
  // Format price to ensure consistency
  const formattedPrice = hotel.price && typeof hotel.price === 'string' 
    ? hotel.price.startsWith('$') ? hotel.price : `$${hotel.price}` 
    : '$149';
  
  // Extract a review preview if available
  const reviewPreview = hotel.reviews && hotel.reviews.length > 0 
    ? hotel.reviews[0] 
    : null;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 p-5">
      <div className="flex flex-col">
        {/* Content */}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{hotel.name}</h2>
              {hotel.location && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{hotel.location}</span>
                </div>
              )}
            </div>
            {formattedPrice && (
              <div className="bg-teal-50 px-3 py-1.5 rounded-md">
                <span className="text-lg font-bold text-teal-600">{formattedPrice}</span>
                <span className="text-sm text-gray-500 ml-1">/night</span>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            {/* Combined Description and Accommodation Info */}
            <div className="space-y-3">
              {/* Hotel Description */}
              {hotel.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">About the Hotel</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{hotel.description}</p>
                </div>
              )}
              
              {/* Allergy Accommodations */}
              {hotel.accommodations && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 text-teal-600 mr-1.5" />
                    Allergy Accommodations
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{hotel.accommodations}</p>
                </div>
              )}
            </div>
          
            {/* Guest Review */}
            {reviewPreview && (
              <div className="mt-3 bg-gray-50 p-3 rounded-md border-l-2 border-teal-400">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Guest Review</h3>
                <p className="text-sm text-gray-600 italic">"{reviewPreview}"</p>
              </div>
            )}
            
            {/* Amenities Tags */}
            {hotel.allergyAmenities && hotel.allergyAmenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {hotel.allergyAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                    <Check className="h-3 w-3 mr-1" />
                    <span>{amenity.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="mt-auto pt-3 border-t flex flex-col sm:flex-row gap-3">
            {hotel.url ? (
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => window.open(hotel.url, "_blank")}
              >
                Book Now
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            ) : onViewDetails ? (
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={onViewDetails}
              >
                View Hotel Information
              </Button>
            ) : null}
            
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
    </div>
  );
};
