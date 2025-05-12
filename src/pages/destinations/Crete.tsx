
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from "react-helmet";
import { useEffect } from 'react';

const Crete = () => {
  // SEO metadata with absolute URLs
  const pageTitle = "Allergy-Friendly Hotels in Crete | Safe Dining in Greece";
  const pageDescription = "Discover the best allergy-friendly hotels in Crete. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly crete, gluten-free hotels crete, food allergies greece, crete hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/crete";
  
  // CRITICAL: Use absolute path for image to ensure social sharing works
  const imageUrl = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80";
  const imageAlt = "Beautiful beach resort in Crete, Greece - Allergy-friendly accommodations";

  // Force preload of crucial images
  useEffect(() => {
    // Force preload of the image for social sharing
    const img = new Image();
    img.src = imageUrl;
    
    // Debug meta tags
    console.log("Crete page loaded with image:", imageUrl);
    console.log("Canonical URL:", canonicalUrl);
  }, [imageUrl]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags for Facebook/WhatsApp */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Allergy-Free Travel" />
        
        {/* Extra tags to force Facebook to recognize the image */}
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta itemProp="image" content={imageUrl} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Schema.org markup for rich results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "about": {
              "@type": "Place",
              "name": "Crete",
              "description": "Greek island known for beautiful beaches and historic sites"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": imageUrl
          })}
        </script>
      </Helmet>
      
      <DestinationReviews destinationId="crete" />
    </>
  );
};

export default Crete;
