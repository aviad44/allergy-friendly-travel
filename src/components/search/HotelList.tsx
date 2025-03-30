
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
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
      
      <div className="mt-10 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <div className="space-y-4">
          <p className="mb-4">
            Here are some allergy-friendly hotels in {destination} that cater to guests with {allergies} allergies:
          </p>
          
          {hotels.map((hotel, index) => (
            <HotelDetails key={index} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};
