
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Thailand = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Thailand | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Thailand. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/thailand";
  const imageUrl = DESTINATION_OG_IMAGES['thailand'];

  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="thailand" />
    </>
  );
};

export default Thailand;
