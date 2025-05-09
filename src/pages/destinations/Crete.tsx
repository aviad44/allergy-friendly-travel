
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const Crete = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Crete | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Crete. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly crete, gluten-free hotels crete, food allergies greece, crete hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/crete";
  const imageUrl = DESTINATION_IMAGES['crete']; // Use constant directly

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Allergy-Free Travel" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": "2024-06-10",
            "dateModified": "2024-06-10",
            "image": {
              "@type": "ImageObject",
              "url": imageUrl,
              "width": "1200",
              "height": "630"
            },
            "about": {
              "@type": "Place",
              "name": "Crete",
              "description": "Greek island in the Mediterranean Sea"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="crete" />
    </>
  );
};

export default Crete;
