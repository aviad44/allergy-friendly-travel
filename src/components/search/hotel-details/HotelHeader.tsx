
import React from 'react';
import { MapPin } from 'lucide-react';

interface HotelHeaderProps {
  name: string;
  location?: string;
  price?: string;
}

export const HotelHeader: React.FC<HotelHeaderProps> = ({ name, location, price }) => {
  return (
    <div className="flex items-start justify-between border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        {location && (
          <div className="flex items-center mt-1.5 text-gray-600">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{location}</span>
          </div>
        )}
      </div>
      {price && (
        <div className="bg-primary/5 px-3 py-1.5 rounded-md">
          <span className="text-xl font-bold text-primary">{price}</span>
          <span className="text-sm text-gray-500 ml-1">/night</span>
        </div>
      )}
    </div>
  );
};
