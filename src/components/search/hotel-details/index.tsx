
import React from 'react';
import { HotelHeader } from './HotelHeader';
import { HotelDescription } from './HotelDescription';
import { AllergyAmenities } from './AllergyAmenities';
import { GuestReviews } from './GuestReviews';
import { BookingActions } from './BookingActions';
import { HotelInfo } from '@/types/search';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  // Clean hotel name by removing star indicators
  const cleanHotelName = hotel.name.replace(/\d+[\s-]stars?/i, '').replace(/★+/g, '').trim();
  
  return (
    <div className="space-y-4">
      <HotelHeader name={cleanHotelName} location={hotel.location} rating={hotel.rating} />
      
      <AllergyAmenities allergyAmenities={hotel.allergyAmenities} />
      
      <HotelDescription description={hotel.description} />
      
      <GuestReviews reviews={hotel.reviews} />
      
      <BookingActions url={hotel.url} name={cleanHotelName} location={hotel.location} />
    </div>
  );
};
