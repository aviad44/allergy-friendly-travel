
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet';
import { DESTINATION_IMAGES } from '@/constants/destinations';

const SwissAlps = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in the Swiss Alps | Safe Mountain Accommodations";
  const pageDescription = "Discover allergy-friendly hotels and chalets in the Swiss Alps. Safe accommodations in Zermatt, St. Moritz, and Lauterbrunnen for travelers with food allergies.";
  const pageKeywords = "Swiss Alps allergy-friendly hotels, gluten-free hotel Switzerland, allergy-safe chalets, dairy-free Zermatt, celiac travel St. Moritz";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/swiss-alps";

  // Ensure we're using a consistent image that matches the teaser
  const heroImageUrl = "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=2000&h=1000&q=80";
  const heroAltText = "Stunning Swiss Alps mountain landscape with snow-capped peaks and green valleys";

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
              "@type": "Place",
              "name": "Swiss Alps",
              "description": "Mountain range in Switzerland"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": heroImageUrl
          })}
        </script>
      </Helmet>
      
      <DestinationReviews destinationId="swiss-alps" />
    </>
  );
};

export default SwissAlps;
