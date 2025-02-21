
import React from 'react';
import { HotelCard } from './HotelCard';

interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  allergyInfo: string;
}

interface HotelSectionProps {
  hotels: Hotel[];
}

const HotelSection: React.FC<HotelSectionProps> = ({ hotels }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          name={hotel.name}
          address={`${hotel.city}, ${hotel.country}`}
          features={[
            `⭐ ${hotel.rating}-star hotel`,
            `📍 ${hotel.city}`,
            hotel.allergyInfo
          ]}
        />
      ))}
    </div>
  );
};

export default HotelSection;
