
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const AthensGlutenFree = () => {
  const pageTitle = "Top 10 Gluten-Free Restaurants in Athens for Celiacs";
  const pageDescription = "Discover the top 10 gluten-free restaurants in Athens, Greece — safe for celiacs. Includes fully GF spots, menus, reviews & allergy-safe tips.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/athens";
  const imageUrl = DESTINATION_OG_IMAGES['athens'];

  return (
    <>
      <DestinationReviews destinationId="athens" />
    </>
  );
};

export default AthensGlutenFree;
