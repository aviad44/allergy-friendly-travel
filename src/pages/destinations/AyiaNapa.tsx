
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { destinations } from "@/types/reviews";

const AyiaNapaReviews = () => {
  // SEO metadata
  const pageTitle = "Best Allergy-Friendly Hotels in Ayia Napa for Food Allergy Travelers";
  const pageDescription = "Discover the top allergy-friendly hotels in Ayia Napa for travelers with food allergies, celiac disease, and dietary restrictions. Includes gluten-free options and allergy-conscious staff.";
  const pageKeywords = "Ayia Napa allergy-friendly hotels, gluten free Ayia Napa, food allergies Cyprus, celiac friendly hotels Ayia Napa";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/ayia-napa";
  const publishDate = "2023-05-15";
  const modifiedDate = "2023-11-10";

  useEffect(() => {
    // Adding structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelGuide",
      "name": pageTitle,
      "description": pageDescription,
      "datePublished": publishDate,
      "dateModified": modifiedDate,
      "about": {
        "@type": "City",
        "name": "Ayia Napa",
        "description": "Popular resort in Cyprus"
      },
      "audience": "Travelers with food allergies or dietary restrictions",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Grecian Bay Hotel",
            "description": "5-star hotel with allergy-friendly menu options"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Atlantica Aeneas Resort",
            "description": "Resort with gluten-free and dairy-free dining"
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pageTitle, pageDescription, publishDate, modifiedDate]);

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
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png" />
      </Helmet>
      <DestinationReviews destinationId="ayia-napa" />
    </>
  );
};

export default AyiaNapaReviews;
