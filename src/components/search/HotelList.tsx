
import React from 'react';
import { HotelCard } from './HotelCard';
import { HotelDetails } from './HotelDetails';
import { HotelInfo } from '@/types/search';

interface HotelListProps {
  hotels: HotelInfo[];
  destination: string;
  allergies: string;
}

export const HotelList: React.FC<HotelListProps> = ({ hotels, destination, allergies }) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No results found. Please try another search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hotel Cards Section - First part visible on initial scroll */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Allergy-Friendly Hotels in {destination}</h2>
        <div className="space-y-6">
          {hotels.map((hotel, index) => (
            <HotelCard key={`card-${index}`} hotel={hotel} />
          ))}
        </div>
      </div>
      
      {/* Additional Information Section - Visible on scrolling down */}
      <div className="pt-6 border-t border-gray-200 mt-10">
        <h2 className="text-2xl font-bold mb-6">Detailed Information</h2>
        <p className="mb-6 text-gray-700">
          Here are detailed allergy-friendly accommodations for hotels in {destination} that cater to guests with {allergies} allergies:
        </p>
        
        <div className="space-y-6">
          {hotels.map((hotel, index) => (
            <HotelDetails key={`details-${index}`} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};
