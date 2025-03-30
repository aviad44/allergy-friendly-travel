
import React from 'react';
import { HotelInfo } from '@/types/search';
import { HotelImage } from './HotelImage';
import { HotelHeader } from './HotelHeader';
import { HotelDescription } from './HotelDescription';
import { AllergyAmenities } from './AllergyAmenities';
import { DetailSections } from './DetailSections';
import { GuestReviews } from './GuestReviews';
import { BookingActions } from './BookingActions';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  return (
    <div className="space-y-6">
      <HotelImage 
        name={hotel.name} 
        rating={hotel.rating} 
      />
      
      <HotelHeader 
        name={hotel.name} 
        location={hotel.location}
      />
      
      <HotelDescription description={hotel.description} />
      
      <AllergyAmenities allergyAmenities={hotel.allergyAmenities} />
      
      <DetailSections 
        accommodations={hotel.accommodations} 
        dietary={hotel.dietary} 
        safety={hotel.safety} 
      />
      
      <GuestReviews reviews={hotel.reviews} rating={hotel.rating} />
      
      <BookingActions 
        url={hotel.url} 
        name={hotel.name} 
        location={hotel.location} 
      />
    </div>
  );
};
