
import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface HotelHeaderProps {
  name: string;
  location?: string;
  price?: string;
  rating?: number;
}

export const HotelHeader: React.FC<HotelHeaderProps> = ({ name, location, price, rating }) => {
  return (
    <div className="flex flex-wrap items-start justify-between border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        {location && (
          <div className="flex items-center mt-1.5 text-gray-600">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{location}</span>
          </div>
        )}
        
        {/* Rating display */}
        {rating && (
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
          </div>
        )}
      </div>
      {price && (
        <div className="bg-teal-50 px-3 py-1.5 rounded-md mt-2 sm:mt-0">
          <span className="text-xl font-bold text-teal-600">{price}</span>
          <span className="text-sm text-gray-500 ml-1">/night</span>
        </div>
      )}
    </div>
  );
};
