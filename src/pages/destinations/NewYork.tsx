
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewYork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect handling to ensure consistent URL structure
  useEffect(() => {
    // If accessed via /destinations/newyork, redirect to /destinations/new-york
    if (location.pathname === "/destinations/newyork") {
      navigate("/destinations/new-york", { replace: true });
    }
  }, [location.pathname, navigate]);

  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in New York | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in New York. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly new york, gluten-free hotels new york, food allergies USA, new york hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/new-york";

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
        <meta property="og:image" content="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80" />
        
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
              "name": "New York",
              "description": "Major city in the United States"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="new-york" />
    </>
  );
};

export default NewYork;
