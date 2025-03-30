
import React from 'react';
import { Star } from 'lucide-react';

interface HotelImageProps {
  imageUrl?: string;
  name: string;
  rating?: number;
}

export const HotelImage: React.FC<HotelImageProps> = ({ imageUrl, name, rating }) => {
  // Default image if none provided
  const defaultImage = "/placeholder.svg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
    e.currentTarget.classList.add("object-contain", "p-4");
    e.currentTarget.classList.remove("object-cover");
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg bg-gray-50">
      <img 
        src={imageUrl || defaultImage}
        alt={`${name}`} 
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading="lazy"
      />
      {rating && (
        <div className="absolute top-4 right-4 bg-white/90 px-2.5 py-1.5 rounded-full flex items-center shadow-sm">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
          <span className="text-sm font-medium">{rating}/5</span>
        </div>
      )}
    </div>
  );
};
