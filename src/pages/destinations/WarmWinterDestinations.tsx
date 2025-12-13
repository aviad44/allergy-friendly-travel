import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";

const WarmWinterDestinations = () => {
  const pageTitle = "Warm Winter & Christmas Getaways for Food-Allergic Travelers | 2025 Guide";
  const pageDescription = "Discover the best warm winter destinations for food-allergic travelers. Verified allergy-friendly hotels and restaurants in Madeira, Hurghada, Canary Islands, and Israel.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/warm-winter-destinations";
  const imageUrl = "https://www.allergy-free-travel.com/src/assets/warm-winter-destinations-hero.jpg";

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
      <DestinationReviews destinationId="warm-winter-destinations" />
    </>
  );
};

export default WarmWinterDestinations;
