
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Cyprus = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Cyprus | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Cyprus. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cyprus";
  const imageUrl = DESTINATION_OG_IMAGES['cyprus'];
  
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
      <DestinationReviews destinationId="cyprus" />
    </>
  );
};

export default Cyprus;
