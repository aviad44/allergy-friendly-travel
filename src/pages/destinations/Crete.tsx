
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Crete = () => {
  // SEO metadata with absolute URLs
  const pageTitle = "Allergy-Friendly Hotels in Crete | Safe Dining in Greece";
  const pageDescription = "Discover the best allergy-friendly hotels in Crete. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/crete";
  const imageUrl = DESTINATION_OG_IMAGES['crete'];

  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="crete" />
    </>
  );
};

export default Crete;
