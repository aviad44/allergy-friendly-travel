
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { HotelInfo } from '@/types/search';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative w-full h-52 overflow-hidden bg-gray-50">
        <img 
          src={hotel.imageUrl || defaultImage}
          alt={`${hotel.name}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        {hotel.rating && (
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-xs font-medium">{hotel.rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{hotel.name}</h2>
        {hotel.location && (
          <p className="text-sm text-gray-500 mb-2">{hotel.location}</p>
        )}
        
        <div className="text-sm text-gray-700 space-y-1.5 mt-3">
          {hotel.accommodations && (
            <p className="flex items-start">
              <span className="text-teal-600 mr-1.5">✓</span>
              <span className="flex-grow"><span className="font-medium">Allergy Program:</span> {hotel.accommodations.length > 60 ? `${hotel.accommodations.substring(0, 60)}...` : hotel.accommodations}</span>
            </p>
          )}
          
          {hotel.dietary && (
            <p className="flex items-start">
              <span className="text-teal-600 mr-1.5">✓</span>
              <span className="flex-grow"><span className="font-medium">Special Diets:</span> {hotel.dietary.length > 60 ? `${hotel.dietary.substring(0, 60)}...` : hotel.dietary}</span>
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center gap-2">
        {hotel.url && (
          <Button 
            variant="outline"
            className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:text-teal-700 flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
        
        {hotel.url && (
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white flex-1"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Book Now
            <ExternalLink className="h-4 w-4 ml-1.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
