import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const FlyingWithEpipensNorthAmerica = () => {
  const pageTitle = "North America guide to flying with EpiPens and allergy medication";
  const pageDescription = "Clear guidance for traveling in the United States, Canada and Mexico with EpiPens and prescription medicines. Airport screening rules, airline expectations, and a practical packing checklist. Updated 21 September 2025.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/flying-with-epipens-north-america";
  const imageUrl = DESTINATION_OG_IMAGES['flying-with-epipens-north-america'] || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80";

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
      <DestinationReviews destinationId="flying-with-epipens-north-america" />
    </>
  );
};

export default FlyingWithEpipensNorthAmerica;