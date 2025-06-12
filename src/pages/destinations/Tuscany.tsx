
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Tuscany = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Tuscany Itinerary | Safe Dining in Italy";
  const pageDescription = "Explore our 6-day allergy-friendly Tuscany itinerary with safe hotels, restaurants & gluten-free options in Florence, Siena, and more. Updated for 2025!";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tuscany";
  const imageUrl = DESTINATION_OG_IMAGES['tuscany'];
  
  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="tuscany" />
    </>
  );
};

export default Tuscany;
