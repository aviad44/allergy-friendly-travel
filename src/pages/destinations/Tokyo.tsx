
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";

const TokyoReviews = () => {
  // SEO metadata
  const pageTitle = "Top 10 Allergy-Friendly Hotels in Tokyo for Travelers with Food Allergies";
  const pageDescription = "Discover the best allergy-friendly hotels in Tokyo for travelers with celiac disease, gluten intolerance, dairy, nut, and egg allergies. Includes real guest reviews and booking links.";
  const pageKeywords = "Tokyo allergy friendly hotels, celiac safe hotel Tokyo, gluten free hotels Tokyo, nut allergy hotel Tokyo, dairy free travel Japan";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tokyo";
  const publishDate = "2024-06-15";
  const modifiedDate = new Date().toISOString().split('T')[0];

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
        "name": "Tokyo",
        "description": "Capital city of Japan"
      },
      "audience": "Travelers with food allergies or dietary restrictions",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "The Capitol Hotel Tokyu",
            "description": "5-star hotel with staff trained in food allergy management"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Park Hyatt Tokyo",
            "description": "5-star hotel with allergy-conscious fine dining options"
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
        <meta property="og:image" content="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      <DestinationReviews destinationId="tokyo" />
    </>
  );
};

export default TokyoReviews;
