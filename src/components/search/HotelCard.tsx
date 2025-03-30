
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Shield } from "lucide-react";
import { HotelInfo } from '@/types/search';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  
  // Extract a single review as preview if available
  const reviewPreview = hotel.reviews && hotel.reviews.length > 0 
    ? hotel.reviews[0] 
    : null;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col border-gray-200">
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={hotel.imageUrl || defaultImage}
          alt={`${hotel.name}`} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        {hotel.rating && (
          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-md">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-xs font-medium">{hotel.rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1.5">{hotel.name}</h2>
        
        {hotel.location && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{hotel.location}</span>
          </div>
        )}
        
        {hotel.accommodations && (
          <div className="mb-3">
            <div className="flex items-start mb-1.5">
              <Shield className="h-4 w-4 text-teal-600 mt-0.5 mr-1.5 flex-shrink-0" />
              <h3 className="text-sm font-medium text-gray-700">Allergy Accommodations</h3>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 pl-6">
              {hotel.accommodations}
            </p>
          </div>
        )}
        
        {reviewPreview && (
          <div className="mt-3">
            <div className="flex items-center mb-1">
              <span className="text-xs font-medium text-gray-700">Guest Review:</span>
            </div>
            <p className="text-xs text-gray-600 italic line-clamp-2">
              "{reviewPreview}"
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-2 mt-auto border-t border-gray-100 flex gap-2">
        <Button 
          variant="outline" 
          className="text-teal-600 border-teal-600 hover:bg-teal-50 text-sm h-9 flex-1 px-2"
          onClick={onViewDetails}
        >
          View Details
        </Button>
        
        {hotel.url && (
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm h-9 flex-1 px-2"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Book Now
            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
