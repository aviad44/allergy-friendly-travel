import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const StockholmAllergyFriendly = () => {
  const pageTitle = "Allergy-Friendly Hotels & Gluten-Free Restaurants in Stockholm";
  const pageDescription = "Discover allergy-friendly hotels and gluten-free restaurants in Stockholm, ideal for travelers with celiac disease and food allergies. Safe dining options in Sweden's capital.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/stockholm";
  const imageUrl = DESTINATION_OG_IMAGES['stockholm'] || "/src/assets/stockholm-hero.jpg";

  return (
    <>
      <CanonicalTags canonicalUrl={canonicalUrl} />
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="stockholm" />
    </>
  );
};

export default StockholmAllergyFriendly;