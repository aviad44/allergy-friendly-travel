
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Shield, Check } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
  onViewDetails?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewDetails }) => {
  // Default image if none provided or if image fails to load
  const defaultImage = "/placeholder.svg";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
    e.currentTarget.classList.add("object-contain", "p-4");
    e.currentTarget.classList.remove("object-cover");
  };
  
  // Extract a review preview if available
  const reviewPreview = hotel.reviews && hotel.reviews.length > 0 
    ? hotel.reviews[0] 
    : null;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image (only on medium screens and up) */}
        <div className="md:w-1/4 lg:w-1/5 overflow-hidden md:rounded-l-lg flex-shrink-0">
          <div className="relative w-full h-48 md:h-full bg-gray-100">
            <img 
              src={hotel.imageUrl || defaultImage}
              alt={`${hotel.name}`} 
              className="w-full h-full object-cover" 
              onError={handleImageError}
              loading="lazy"
            />
            {hotel.rating && (
              <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 mr-1" />
                <span className="text-xs font-medium">{hotel.rating}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1 p-4 md:p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{hotel.name}</h2>
              {hotel.location && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{hotel.location}</span>
                </div>
              )}
            </div>
            {hotel.price && (
              <div className="bg-teal-50 px-3 py-1.5 rounded-md">
                <span className="text-lg font-bold text-teal-600">{hotel.price}</span>
                <span className="text-sm text-gray-500 ml-1">/night</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Hotel Description */}
            {hotel.description && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-700">About the Hotel</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{hotel.description}</p>
              </div>
            )}
            
            {/* Allergy Accommodations */}
            {hotel.accommodations && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Shield className="h-4 w-4 text-teal-600 mr-1.5" />
                  Allergy Accommodations
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">{hotel.accommodations}</p>
              </div>
            )}
          </div>
          
          {/* Guest Review */}
          {reviewPreview && (
            <div className="mb-4 bg-gray-50 p-3 rounded-md border-l-2 border-teal-400">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Guest Review</h3>
              <p className="text-sm text-gray-600 italic">"{reviewPreview}"</p>
            </div>
          )}
          
          {/* Amenities Tags */}
          {hotel.allergyAmenities && hotel.allergyAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.allergyAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                  <Check className="h-3 w-3 mr-1" />
                  <span>{amenity.text}</span>
                </div>
              ))}
            </div>
          )}
          
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
            ) : (
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={onViewDetails}
              >
                View Hotel Information
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            )}
            
            {onViewDetails && (
              <Button 
                variant="outline" 
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
                onClick={onViewDetails}
              >
                View Complete Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
