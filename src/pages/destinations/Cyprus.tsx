
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";

const Cyprus = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Cyprus | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Cyprus. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cyprus";
  
  // CRITICAL: Using the Cyprus beach resort image (now with absolute URL)
  const imageUrl = "https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png";
  
  return (
    <>
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
