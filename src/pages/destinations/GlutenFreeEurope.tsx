
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const GlutenFreeEurope = () => {
  const pageTitle = "Top 5 Gluten-Free Travel Destinations in Europe (2025) | Allergy-Free Travel";
  const pageDescription = "Discover the top 5 gluten-free travel destinations in Europe for 2025. Find celiac-friendly hotels and certified gluten-free restaurants in Rome, Barcelona, Paris, Munich, and Amsterdam.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/gluten-free-europe";
  const imageUrl = DESTINATION_OG_IMAGES['gluten-free-europe'];

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
      <DestinationReviews destinationId="gluten-free-europe" />
    </>
  );
};

export default GlutenFreeEurope;
