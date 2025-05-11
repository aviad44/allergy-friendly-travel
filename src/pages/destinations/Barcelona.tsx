
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Barcelona = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Barcelona | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Barcelona. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly barcelona, gluten-free hotels barcelona, food allergies spain, barcelona hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/barcelona";
  const imageUrl = "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Aviad Beit Halachmi" />
        
        {/* Open Graph Meta Tags - Critical for Facebook sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content="Aviad Beit Halachmi" />
        
        {/* Explicitly set Facebook-specific tags */}
        <meta property="fb:app_id" content="your-fb-app-id" /> {/* Add your FB app ID if you have one */}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:creator" content="@AviadBeitHalachmi" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": "2024-06-10",
            "dateModified": "2024-06-10",
            "author": {
              "@type": "Person",
              "name": "Aviad Beit Halachmi"
            },
            "about": {
              "@type": "City",
              "name": "Barcelona",
              "description": "Popular city in Spain"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="barcelona" />
    </>
  );
};

export default Barcelona;
