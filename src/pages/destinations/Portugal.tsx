
import React, { useEffect } from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Portugal = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Portugal (2025 Guide) | Safe Travel";
  const pageDescription = "Allergy-friendly hotels in Portugal for travelers with food allergies. Family-friendly, gluten-free, dairy-free, and nut-aware accommodations in Lisbon, Algarve, and Porto.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/portugal";
  const imageUrl = DESTINATION_OG_IMAGES['portugal'];
  
  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, [imageUrl]);

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
      <DestinationReviews destinationId="portugal" />
    </>
  );
};

export default Portugal;
