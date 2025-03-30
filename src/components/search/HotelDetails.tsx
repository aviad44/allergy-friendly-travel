
import React from 'react';
import { HotelInfo } from '@/types/search';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-3">{hotel.name}</h3>
      
      <div className="space-y-3 text-gray-700">
        {hotel.url && (
          <div>
            <h4 className="font-semibold text-gray-900">Official Website:</h4>
            <a 
              href={hotel.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-600 hover:underline break-words"
            >
              {hotel.url}
            </a>
          </div>
        )}
        
        {hotel.accommodations && (
          <div>
            <h4 className="font-semibold text-gray-900">Allergy Program Details:</h4>
            <p>{hotel.accommodations}</p>
          </div>
        )}
        
        {hotel.dietary && (
          <div>
            <h4 className="font-semibold text-gray-900">Dietary Considerations:</h4>
            <p>{hotel.dietary}</p>
          </div>
        )}
        
        {hotel.safety && (
          <div>
            <h4 className="font-semibold text-gray-900">Safety Protocols:</h4>
            <p>{hotel.safety}</p>
          </div>
        )}
        
        {hotel.reviews && (
          <div>
            <h4 className="font-semibold text-gray-900">Guest Reviews:</h4>
            <p>{hotel.reviews}</p>
          </div>
        )}
      </div>
    </div>
  );
};
