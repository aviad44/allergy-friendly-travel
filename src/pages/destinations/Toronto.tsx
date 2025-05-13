
import React from "react";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Toronto = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Toronto | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Toronto. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly toronto, gluten-free hotels toronto, food allergies canada, toronto hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/toronto";

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
        <meta property="og:image" content="/lovable-uploads/toronto-skyline.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/lovable-uploads/toronto-skyline.png" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": "2024-06-10",
            "dateModified": "2024-06-10",
            "about": {
              "@type": "City",
              "name": "Toronto",
              "description": "Capital city of Ontario, Canada"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": "/lovable-uploads/toronto-skyline.png"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="toronto" />
    </>
  );
};

export default Toronto;
