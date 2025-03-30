
import React from 'react';
import { HotelInfo } from '@/types/search';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  return (
    <div className="mb-6">
      <div className="text-2xl font-bold mb-2">
        {hotel.name} {hotel.url ? '|' : ''}
      </div>
      
      {hotel.url && (
        <div className="mb-3">
          <a 
            href={hotel.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl text-gray-800 break-words"
          >
            {hotel.url}
          </a>
        </div>
      )}
      
      {hotel.accommodations && (
        <p className="mb-3 text-lg">
          <span className="font-bold">Key Allergy Accommodations:</span> {hotel.accommodations}
        </p>
      )}
      
      {hotel.dietary && (
        <p className="mb-3 text-lg">
          <span className="font-bold">Special Dietary Considerations:</span> {hotel.dietary}
        </p>
      )}
      
      {hotel.reviews && (
        <p className="mb-3 text-lg">
          <span className="font-bold">Authentic Guest Reviews:</span> {hotel.reviews}
        </p>
      )}
      
      {hotel.safety && (
        <p className="mb-3 text-lg">
          <span className="font-bold">Additional Safety Information:</span> {hotel.safety}
        </p>
      )}
    </div>
  );
};
