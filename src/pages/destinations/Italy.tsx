import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Italy = () => {
  const pageTitle = "Discover Italy: Top Destination for Celiacs & Gluten‑Sensitive Travelers";
  const pageDescription = "Italy offers exceptional gluten-free dining and accommodations across Rome, Florence, Milan, and Naples. From AIC-certified restaurants to hotels with dedicated gluten-free breakfast options.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/italy";
  const imageUrl = DESTINATION_OG_IMAGES['italy'] || DESTINATION_OG_IMAGES['default'];
  
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
      <DestinationReviews destinationId="italy" />
    </>
  );
};

export default Italy;