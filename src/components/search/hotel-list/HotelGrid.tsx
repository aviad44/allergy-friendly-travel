
import React from 'react';
import { HotelCard } from '../HotelCard';
import { HotelInfo } from '@/types/search';

interface HotelGridProps {
  hotels: HotelInfo[];
  onHotelSelect: (hotel: HotelInfo) => void;
}

export const HotelGrid: React.FC<HotelGridProps> = ({ hotels, onHotelSelect }) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
          <div className="h-12 w-12 mx-auto text-gray-400 mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-600">
            We couldn't find any allergy-friendly hotels matching your criteria. 
            Please try adjusting your search or contact us for personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel, index) => (
        <HotelCard 
          key={`${hotel.name}-${index}`} 
          hotel={hotel} 
          onViewDetails={() => onHotelSelect(hotel)}
        />
      ))}
    </div>
  );
};
