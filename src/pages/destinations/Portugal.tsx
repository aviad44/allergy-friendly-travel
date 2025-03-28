
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet';
import { DESTINATION_IMAGES } from '@/constants/destinations';

const Portugal = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Portugal (2025 Guide) | Safe Travel";
  const pageDescription = "Allergy-friendly hotels in Portugal for travelers with food allergies. Family-friendly, gluten-free, dairy-free, and nut-aware accommodations in Lisbon, Algarve, and Porto.";
  const pageKeywords = "Portugal allergy friendly hotels, gluten free hotel Portugal, celiac Portugal travel, nut free hotel Lisbon, dairy free hotels Algarve";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/portugal";
  const currentDate = new Date().toISOString().split('T')[0];

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
        <meta property="og:image" content={`https://images.unsplash.com/${DESTINATION_IMAGES.portugal}?auto=format&fit=crop&w=1200&h=630&q=80`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`https://images.unsplash.com/${DESTINATION_IMAGES.portugal}?auto=format&fit=crop&w=1200&h=630&q=80`} />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelArticle",
            "headline": "Allergy-Friendly Hotels in Portugal (2025 Guide)",
            "description": pageDescription,
            "image": `https://images.unsplash.com/${DESTINATION_IMAGES.portugal}?auto=format&fit=crop&w=1200&h=630&q=80`,
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
            "datePublished": currentDate,
            "dateModified": currentDate
          })}
        </script>
      </Helmet>
      
      <DestinationReviews destinationId="portugal" />
    </>
  );
};

export default Portugal;
