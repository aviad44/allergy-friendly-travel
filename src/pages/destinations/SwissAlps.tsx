
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet-async';

const SwissAlps = () => {
  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Hotels in the Swiss Alps | Safe Mountain Accommodations</title>
        <meta 
          name="description" 
          content="Discover allergy-friendly hotels and chalets in the Swiss Alps. Safe accommodations in Zermatt, St. Moritz, and Lauterbrunnen for travelers with food allergies."
        />
        <meta 
          name="keywords" 
          content="Swiss Alps allergy-friendly hotels, gluten-free hotel Switzerland, allergy-safe chalets, dairy-free Zermatt, celiac travel St. Moritz" 
        />
      </Helmet>
      <DestinationReviews destinationId="swiss-alps" />
    </>
  );
};

export default SwissAlps;
