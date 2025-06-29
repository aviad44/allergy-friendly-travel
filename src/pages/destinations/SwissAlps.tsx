
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const SwissAlps = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in the Swiss Alps | Safe Mountain Accommodations";
  const pageDescription = "Discover allergy-friendly hotels and chalets in the Swiss Alps. Safe accommodations in Zermatt, St. Moritz, and Lauterbrunnen for travelers with food allergies.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/swiss-alps";
  const imageUrl = DESTINATION_OG_IMAGES['swiss-alps'];

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
      <DestinationReviews destinationId="swiss-alps" />
    </>
  );
};

export default SwissAlps;
