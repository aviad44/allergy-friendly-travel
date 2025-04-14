
import React from 'react';
import { Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface HotelImageProps {
  name: string;
  rating?: number;
}

export const HotelImage: React.FC<HotelImageProps> = ({ name, rating }) => {
  return (
    <AspectRatio ratio={16/9} className="relative w-full mb-4 overflow-hidden rounded-lg">
      <div className="h-full w-full bg-gradient-to-b from-sky-200 to-teal-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-xl font-bold text-teal-700">{name}</h2>
          {rating && (
            <div className="mt-2 inline-flex items-center px-2.5 py-1 bg-white rounded-full shadow-sm">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
              <span className="text-sm font-medium">{rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </AspectRatio>
  );
};
