
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';
import { Helmet } from "react-helmet";

const Paris = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Paris | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Paris. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/paris";
  const imageUrl = DESTINATION_OG_IMAGES['paris'];

  return (
    <>
      <CanonicalTags canonicalUrl={canonicalUrl} />
      
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="allergy-friendly hotels Paris, gluten-free hotels Paris, dairy-free hotels Paris, nut-free hotels Paris, food allergy travel Paris" />
        <meta property="og:image:alt" content="Allergy-friendly hotels in Paris for safe dining" />
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org JSON-LD for Paris destination */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": "Allergy-Friendly Hotels in Paris",
            "description": pageDescription,
            "url": canonicalUrl,
            "about": {
              "@type": "Place",
              "name": "Paris",
              "description": "Capital city of France known for its cuisine, culture, and attractions"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Travelers with food allergies"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "url": "https://www.allergy-free-travel.com"
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Allergy-Friendly Hotels in Paris",
              "itemListElement": []
            }
          })}
        </script>
      </Helmet>
      
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      <DestinationReviews destinationId="paris" />
    </>
  );
};

export default Paris;
