
import React, { useEffect } from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet';
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

const Portugal = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Portugal (2025 Guide) | Safe Travel";
  const pageDescription = "Allergy-friendly hotels in Portugal for travelers with food allergies. Family-friendly, gluten-free, dairy-free, and nut-aware accommodations in Lisbon, Algarve, and Porto.";
  const pageKeywords = "Portugal allergy friendly hotels, gluten free hotel Portugal, celiac Portugal travel, nut free hotel Lisbon, dairy free hotels Algarve";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/portugal";
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Always use our verified working images from the centralized repository
  const imageUrl = DESTINATION_OG_IMAGES['portugal'];
  const imageAlt = "Beautiful view of Portugal's coastline - Allergy-friendly travel destination";
  
  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Allergy-Free Travel" />
        
        {/* Open Graph Meta Tags - Essential for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Allergy-Free Travel" />
        
        {/* Facebook and WhatsApp specific */}
        <link rel="image_src" href={imageUrl} />
        <link itemProp="thumbnailUrl" href={imageUrl} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={imageAlt} />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelArticle",
            "headline": "Allergy-Friendly Hotels in Portugal (2025 Guide)",
            "description": pageDescription,
            "image": {
              "@type": "ImageObject",
              "url": imageUrl,
              "width": "1200",
              "height": "630",
              "caption": imageAlt
            },
            "author": {
              "@type": "Organization",
              "name": "Allergy-Free Travel"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allergy-free-travel.com/lovable-uploads/9a760c6c-9c78-40fe-bd6f-90c7fbef6663.png"
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
