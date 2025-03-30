
import React from 'react';
import { HotelInfo } from '@/types/search';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-1">{hotel.name} {hotel.url ? `| ${hotel.url}` : ''}</h3>
      
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
