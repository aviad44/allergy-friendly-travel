
import React from 'react';
import { HotelCard } from '../HotelCard';
import { HotelInfo } from '@/types/search';

interface HotelGridProps {
  hotels: HotelInfo[];
  onHotelSelect: (hotel: HotelInfo) => void;
}

export const HotelGrid: React.FC<HotelGridProps> = ({ hotels, onHotelSelect }) => {
  // Deduplicate hotels by name to prevent duplicate listings
  const uniqueHotels = hotels.reduce((acc: HotelInfo[], current) => {
    const isDuplicate = acc.find(item => item.name === current.name);
    if (!isDuplicate) {
      return [...acc, current];
    }
    return acc;
  }, []);

  // Clean hotel data to remove internal prompt markers and format properly
  const cleanedHotels = uniqueHotels.map(hotel => {
    // Remove any internal prompt markers from description
    let description = hotel.description || '';
    description = description
      .replace(/^\*\*(Authentic Guest Reviews|Additional Safety Information|Why This Hotel is Suitable|Key Allergy Accommodations|Exact Address).*?\*\*:?\s*/gi, '')
      .replace(/^\*\*.*?\*\*:?\s*/gi, '') // Remove any other bold headers
      .replace(/\*\*/g, '')
      .trim();

    // Clean up amenities as well
    const cleanedAmenities = hotel.allergyAmenities?.map(amenity => ({
      ...amenity,
      text: amenity.text
        .replace(/^\*\*(Authentic Guest Reviews|Additional Safety Information|Why This Hotel is Suitable|Key Allergy Accommodations|Exact Address).*?\*\*:?\s*/gi, '')
        .replace(/^\*\*.*?\*\*:?\s*/gi, '') // Remove any other bold headers
        .replace(/\*\*/g, '')
        .trim()
    })) || [];

    // Remove any duplicate amenities
    const uniqueAmenities = cleanedAmenities.filter((amenity, index, self) => 
      index === self.findIndex(a => a.text === amenity.text)
    );

    // Ensure description is reasonably sized for consistent card heights
    const maxDescLength = 200;
    if (description.length > maxDescLength) {
      description = description.substring(0, maxDescLength) + '...';
    }

    return {
      ...hotel,
      description,
      allergyAmenities: uniqueAmenities
    };
  });

  if (cleanedHotels.length === 0) {
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
    <div className="space-y-6">
      {cleanedHotels.map((hotel, index) => (
        <HotelCard 
          key={`${hotel.name}-${index}`} 
          hotel={hotel} 
          onViewDetails={() => onHotelSelect(hotel)}
        />
      ))}
    </div>
  );
};
