import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const StockholmAllergyFriendly = () => {
  const pageTitle = "Allergy-Friendly Hotels & Gluten-Free Restaurants in Stockholm";
  const pageDescription = "Discover allergy-friendly hotels and gluten-free restaurants in Stockholm, ideal for travelers with celiac disease and food allergies. Safe dining options in Sweden's capital.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/stockholm";
  const imageUrl = DESTINATION_OG_IMAGES['stockholm'] || "/src/assets/stockholm-hero.jpg";

  return (
    <>
      <DestinationReviews destinationId="stockholm" />
    </>
  );
};

export default StockholmAllergyFriendly;