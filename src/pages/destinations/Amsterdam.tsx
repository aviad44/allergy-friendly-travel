import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const AmsterdamAllergyFriendly = () => {
  const pageTitle = "Top 10 Allergy-Friendly Hotels in Amsterdam (2025 Guide)";
  const pageDescription = "Discover the top 10 allergy-friendly hotels in Amsterdam with allergy-free rooms and nearby allergy-aware restaurants. Perfect for travelers with nut, gluten, dairy, and dust allergies.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/amsterdam";
  const imageUrl = DESTINATION_OG_IMAGES['amsterdam'] || "/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png";

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
      <DestinationReviews destinationId="amsterdam" />
    </>
  );
};

export default AmsterdamAllergyFriendly;