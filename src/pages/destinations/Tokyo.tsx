
import React from "react";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Tokyo = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Tokyo | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Tokyo. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly tokyo, gluten-free hotels tokyo, food allergies japan, tokyo hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tokyo";
  
  // Ensure we're using a consistent image that matches the teaser
  const heroImageUrl = "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80";

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
        <meta property="og:image" content={heroImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={heroImageUrl} />
        
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
              "name": "Tokyo",
              "description": "Capital city of Japan"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": heroImageUrl
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="tokyo" />
    </>
  );
};

export default Tokyo;
