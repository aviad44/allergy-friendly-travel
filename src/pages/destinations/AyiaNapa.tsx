
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const AyiaNapa = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Ayia Napa | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Ayia Napa. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/ayia-napa";
  const imageUrl = DESTINATION_OG_IMAGES['ayia-napa'];

  return (
    <>
      <DestinationReviews destinationId="ayia-napa" />
    </>
  );
};

export default AyiaNapa;
