
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Rome = () => {
  const pageTitle = "Top 5 Allergy-Friendly Hotels in Rome – Safe & Comfortable Stays";
  const pageDescription = "Discover the top allergy-friendly hotels in Rome. Safe accommodations with real guest reviews and personalized dining options.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/rome";
  const imageUrl = DESTINATION_OG_IMAGES['rome'];
  
  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="rome" />
    </>
  );
};

export default Rome;
