
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
    <div className="space-y-0">
      {/* Hotel Cards Section - First part visible on initial scroll */}
      <div className="mb-8">
        {hotels.map((hotel, index) => (
          <HotelCard key={`card-${index}`} hotel={hotel} />
        ))}
      </div>
      
      {/* Additional Information Section - Visible on scrolling down */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold mb-6">Additional Information</h2>
        <div className="space-y-2">
          <p className="mb-6 text-lg">
            Here are some allergy-friendly hotels in {destination} that cater to guests with {allergies} allergies:
          </p>
          
          {hotels.map((hotel, index) => (
            <HotelDetails key={`details-${index}`} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};
