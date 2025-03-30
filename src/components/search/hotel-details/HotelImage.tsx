
import React from 'react';
import { Star } from 'lucide-react';

interface HotelImageProps {
  name: string;
  rating?: number;
}

export const HotelImage: React.FC<HotelImageProps> = ({ name, rating }) => {
  return (
    <div className="relative w-full py-4 bg-teal-50 rounded-lg mb-4">
      <div className="text-center text-gray-500">
        <h2 className="text-xl font-bold text-teal-700">{name}</h2>
        {rating && (
          <div className="mt-2 inline-flex items-center px-2.5 py-1 bg-white rounded-full shadow-sm">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
            <span className="text-sm font-medium">{rating}/5</span>
          </div>
        )}
      </div>
    </div>
  );
};
