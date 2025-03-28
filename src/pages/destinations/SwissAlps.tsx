
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet-async';

const SwissAlps = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in the Swiss Alps | Safe Travel Guide 2025";
  const pageDescription = "Discover top allergy-friendly accommodations in the Swiss Alps. Hotels, chalets and Airbnbs in Zermatt, St. Moritz, and Lauterbrunnen for gluten-free, dairy-free, and nut-free travelers.";
  const pageKeywords = "Swiss Alps allergy-friendly hotels, gluten-free hotel Switzerland, allergy-safe chalets, dairy-free Zermatt, celiac travel St. Moritz";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/swiss-alps";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Allergy-Free Travel" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelArticle",
            "headline": "Allergy-Friendly Hotels in the Swiss Alps (2025 Guide)",
            "description": pageDescription,
            "image": "https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80",
            "author": {
              "@type": "Organization",
              "name": "Allergy-Free Travel"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png"
              }
            },
            "datePublished": new Date().toISOString().split('T')[0],
            "dateModified": new Date().toISOString().split('T')[0]
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="swiss-alps" />
    </>
  );
};

export default SwissAlps;
