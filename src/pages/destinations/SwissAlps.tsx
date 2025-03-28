
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet-async';

const SwissAlps = () => {
  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Hotels in the Swiss Alps | Safe Travel Guide 2025</title>
        <meta 
          name="description" 
          content="Discover top allergy-friendly accommodations in the Swiss Alps. Hotels, chalets and Airbnbs in Zermatt, St. Moritz, and Lauterbrunnen for gluten-free, dairy-free, and nut-free travelers." 
        />
        <meta 
          name="keywords" 
          content="Swiss Alps allergy-friendly hotels, gluten-free hotel Switzerland, allergy-safe chalets, dairy-free Zermatt, celiac travel St. Moritz" 
        />
        <link rel="canonical" href="https://www.allergy-free-travel.com/destinations/swiss-alps" />
      </Helmet>
      <DestinationReviews destinationId="swiss-alps" />
    </>
  );
};

export default SwissAlps;
