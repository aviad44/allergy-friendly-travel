
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
  bookingUrl: string;
}

interface HotelSectionProps {
  hotels: Hotel[];
}

const HotelSection: React.FC<HotelSectionProps> = ({ hotels }) => {
  console.log("HotelSection rendering with hotels:", hotels);
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hotels && hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            name={hotel.name}
            address={`${hotel.city}, ${hotel.country}`}
            features={[
              `⭐ ${hotel.rating}-star hotel`,
              `📍 ${hotel.city}`,
              hotel.allergyInfo
            ]}
            bookingUrl={hotel.bookingUrl}
          />
        ))
      ) : (
        <div className="col-span-3 text-center p-5">
          <p>No hotels available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default HotelSection;
