
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Crete = () => {
  // SEO metadata with absolute URLs for proper social sharing
  const pageTitle = "Allergy-Friendly Hotels in Crete | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Crete. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly crete, gluten-free hotels crete, food allergies greece, crete hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/crete";
  
  // Use a direct, absolute image URL for Crete (Facebook crawler requires absolute URLs)
  const imageUrl = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags - Critical for Facebook sharing */}
        <meta property="og:title" content={pageTitle} data-react-helmet="true" />
        <meta property="og:description" content={pageDescription} data-react-helmet="true" />
        <meta property="og:image" content={imageUrl} data-react-helmet="true" />
        <meta property="og:image:width" content="1200" data-react-helmet="true" />
        <meta property="og:image:height" content="630" data-react-helmet="true" />
        <meta property="og:url" content={canonicalUrl} data-react-helmet="true" />
        <meta property="og:type" content="article" data-react-helmet="true" />
        <meta property="og:site_name" content="Allergy-Free Travel" data-react-helmet="true" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
        <meta name="twitter:title" content={pageTitle} data-react-helmet="true" />
        <meta name="twitter:description" content={pageDescription} data-react-helmet="true" />
        <meta name="twitter:image" content={imageUrl} data-react-helmet="true" />
        
        {/* WhatsApp specific Meta Tags */}
        <link itemProp="thumbnailUrl" href={imageUrl} />
        <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
          <link itemProp="url" href={imageUrl} />
        </span>
        
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
