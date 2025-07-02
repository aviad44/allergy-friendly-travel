
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Airlines = () => {
  // SEO metadata
  const pageTitle = "Best Airlines for Food Allergy Sufferers (2025 Guide) | Safe Flying";
  const pageDescription = "Discover the top allergy-friendly airlines worldwide. Complete guide to safe air travel with food allergies, including airline rankings and expert tips.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/airlines";
  const imageUrl = DESTINATION_OG_IMAGES['airlines'];
  
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
      <DestinationReviews destinationId="airlines" />
    </>
  );
};

export default Airlines;
