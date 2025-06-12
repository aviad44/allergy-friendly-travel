
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const LondonReviews = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in London | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in London. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/london";
  const imageUrl = DESTINATION_OG_IMAGES['london'];

  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="london" />
    </>
  );
};

export default LondonReviews;
