
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Tuscany = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Tuscany Itinerary | Safe Dining in Italy";
  const pageDescription = "Explore our 6-day allergy-friendly Tuscany itinerary with safe hotels, restaurants & gluten-free options in Florence, Siena, and more.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tuscany";
  const imageUrl = DESTINATION_OG_IMAGES['tuscany'];
  
  return (
    <>
      <DestinationReviews destinationId="tuscany" />
    </>
  );
};

export default Tuscany;
