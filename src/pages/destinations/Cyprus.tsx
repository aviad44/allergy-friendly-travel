
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Cyprus = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Cyprus | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Cyprus. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cyprus";
  const imageUrl = DESTINATION_OG_IMAGES['cyprus'];
  
  return (
    <>
      <DestinationReviews destinationId="cyprus" />
    </>
  );
};

export default Cyprus;
