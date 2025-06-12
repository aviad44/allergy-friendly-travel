
import React from "react";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const KohSamui = () => {
  // SEO metadata
  const pageTitle = "Four Seasons Koh Samui – Allergy-Friendly & White Lotus Filming Location";
  const pageDescription = "Discover why Four Seasons Resort Koh Samui, filming location of The White Lotus Season 3, is ideal for guests with food allergies – including gluten-free, nut-free, and dairy-free travelers.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/koh-samui";
  const imageUrl = DESTINATION_OG_IMAGES['koh-samui'];
  
  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="koh-samui" />
    </>
  );
};

export default KohSamui;
