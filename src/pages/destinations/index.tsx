
import React from 'react';
import { Helmet } from 'react-helmet';
import { DestinationsHero } from '@/components/destinations/DestinationsHero';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { destinations } from '@/data/destinations-list';

const DestinationsIndex = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Travel Destinations | Safe Hotels Worldwide";
  const pageDescription = "Browse our comprehensive guide to allergy-friendly travel destinations worldwide. Find safe accommodations for dietary restrictions in top cities and regions.";
  const pageKeywords = "allergy-friendly destinations, food allergy travel, gluten-free travel destinations, allergy-conscious hotels worldwide";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations";
  const currentDate = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": destinations.map((dest, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "TouristDestination",
                  "name": dest.name,
                  "description": dest.description,
                  "url": `https://www.allergy-free-travel.com/destinations/${dest.id}`
                }
              }))
            },
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "dateModified": currentDate
          })}
        </script>
      </Helmet>

      <DestinationsHero />
      <DestinationsList />
    </div>
  );
};

export default DestinationsIndex;
