
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Turkey = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Turkey (2025 Guide) | Safe Travel";
  const pageDescription = "Discover allergy-friendly hotels in Turkey. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs in Antalya, Belek, and more.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/turkey";
  const imageUrl = DESTINATION_OG_IMAGES['turkey'];

  return (
    <>
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="turkey" />
    </>
  );
};

export default Turkey;
