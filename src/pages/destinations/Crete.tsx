
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from "@/components/SocialTags";

const Crete = () => {
  // SEO metadata with absolute URLs
  const pageTitle = "Allergy-Friendly Hotels in Crete | Safe Dining in Greece";
  const pageDescription = "Discover the best allergy-friendly hotels in Crete. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/crete";
  
  // CRITICAL: Use absolute path for image to ensure social sharing works
  const imageUrl = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80";

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
