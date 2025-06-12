
import React from "react";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Tokyo = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Tokyo | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Tokyo. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tokyo";
  const imageUrl = DESTINATION_OG_IMAGES['tokyo'];

  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="tokyo" />
    </>
  );
};

export default Tokyo;
