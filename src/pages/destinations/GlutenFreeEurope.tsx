
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const GlutenFreeEurope = () => {
  const pageTitle = "Top 5 Gluten-Free Travel Destinations in Europe | Allergy-Free Travel";
  const pageDescription = "Discover the top 5 gluten-free travel destinations in Europe. Find celiac-friendly hotels and certified gluten-free restaurants in Rome, Barcelona, Paris, Munich, and Amsterdam.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/gluten-free-europe";
  const imageUrl = DESTINATION_OG_IMAGES['gluten-free-europe'];

  return (
    <>
      <DestinationReviews destinationId="gluten-free-europe" />
    </>
  );
};

export default GlutenFreeEurope;
