
import React from 'react';
import { Helmet } from 'react-helmet';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';

const GlutenFreeEurope = () => {
  return (
    <>
      <Helmet>
        <title>Top 5 Gluten-Free Travel Destinations in Europe (2025) | Allergy-Free Travel</title>
        <meta name="description" content="Discover the top 5 gluten-free travel destinations in Europe for 2025. Find celiac-friendly hotels and certified gluten-free restaurants in Rome, Barcelona, Paris, Munich, and Amsterdam." />
        <meta name="keywords" content="gluten-free travel, celiac friendly hotels, Europe gluten-free, Rome, Barcelona, Paris, Munich, Amsterdam, celiac disease, allergy-free travel" />
        <meta property="og:title" content="Top 5 Gluten-Free Travel Destinations in Europe (2025)" />
        <meta property="og:description" content="Discover the top 5 gluten-free travel destinations in Europe for 2025. Find celiac-friendly hotels and certified gluten-free restaurants in Rome, Barcelona, Paris, Munich, and Amsterdam." />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/f28f531e-9914-4d6c-9971-afd6d989b8e5.png" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.allergy-free-travel.com/destinations/gluten-free-europe" />
        <meta property="article:published_time" content="2025-03-30" />
        <meta property="article:author" content="Allergy-Free Travel Team" />
        
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.allergy-free-travel.com/destinations/gluten-free-europe"
            },
            "headline": "Top 5 Gluten-Free Travel Destinations in Europe (2025)",
            "description": "Discover the best gluten-free cities in Europe for celiac-safe travel, featuring hotels and restaurants that cater to gluten-free diets.",
            "image": "https://www.allergy-free-travel.com/lovable-uploads/f28f531e-9914-4d6c-9971-afd6d989b8e5.png",
            "author": {
              "@type": "Organization",
              "name": "Allergy-Free Travel Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allergy-free-travel.com/logo.png"
              }
            },
            "datePublished": "2025-03-30"
          }
        `}</script>
      </Helmet>
      
      <DestinationReviews destinationId="gluten-free-europe" />
    </>
  );
};

export default GlutenFreeEurope;
