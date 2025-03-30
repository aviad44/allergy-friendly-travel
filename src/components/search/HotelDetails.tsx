
import React from 'react';
import { HotelInfo } from '@/types/search';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  return (
    <div className="mb-4">
      <div className="text-xl font-bold mb-1">{hotel.name}{hotel.url ? ' |' : ''}</div>
      
      {hotel.url && (
        <div className="mb-2">
          <a 
            href={hotel.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="break-words"
          >
            {hotel.url}
          </a>
        </div>
      )}
      
      {hotel.accommodations && (
        <p className="mb-3">
          <span className="font-bold">Key Allergy Accommodations:</span> {hotel.accommodations}
        </p>
      )}
      
      {hotel.dietary && (
        <p className="mb-3">
          <span className="font-bold">Special Dietary Considerations:</span> {hotel.dietary}
        </p>
      )}
      
      {hotel.reviews && (
        <p className="mb-3">
          <span className="font-bold">Authentic Guest Reviews:</span> {hotel.reviews}
        </p>
      )}
      
      {hotel.safety && (
        <p className="mb-3">
          <span className="font-bold">Additional Safety Information:</span> {hotel.safety}
        </p>
      )}
    </div>
  );
};
