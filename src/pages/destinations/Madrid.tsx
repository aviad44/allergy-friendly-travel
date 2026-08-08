import { DestinationReviews } from "@/components/reviews/DestinationReviews";
const Madrid = () => {
  // SEO metadata with absolute URLs for proper social sharing
  const pageTitle = "Top 10 Allergy-Friendly Hotels in Madrid | Safe Travel Guide";
  const pageDescription = "Discover the best allergy-friendly hotels in Madrid. Expert reviews of accommodations with allergen-aware staff, gluten-free dining, and safety protocols for travelers with food allergies.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/madrid";
  
  // Use the generated Madrid hero image
  const imageUrl = "https://www.allergy-free-travel.com/src/assets/madrid-hero.jpg";

  return (
    <>
      <DestinationReviews destinationId="madrid" />
    </>
  );
};

export default Madrid;