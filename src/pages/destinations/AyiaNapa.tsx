
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const AyiaNapaReviews = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Ayia Napa | Safe Dining in Cyprus";
  const pageDescription = "Discover the best allergy-friendly hotels in Ayia Napa, Cyprus. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly ayia napa, gluten-free hotels ayia napa, food allergies cyprus, ayia napa hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/ayia-napa";

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
        <meta property="og:image" content="https://images.unsplash.com/photo-1625587279904-ac75e0e49045?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1625587279904-ac75e0e49045?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        
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
              "name": "Ayia Napa",
              "description": "Popular resort town in Cyprus"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="ayia-napa" />
    </>
  );
};

export default AyiaNapaReviews;
