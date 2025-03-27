
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const NewYorkPage = () => {
  // SEO metadata
  const pageTitle = "10 Best Allergy-Friendly Hotels in New York City";
  const pageDescription = "Discover the top 10 allergy-friendly hotels in New York City. These hotels offer safe dining options and accommodations for guests with food allergies.";
  const pageKeywords = "allergy-friendly hotels NYC, gluten-free hotels, nut-free hotels, celiac-friendly hotels, best hotels for allergies New York";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/newyork";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Allergy-Friendly Hotel Finder" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        
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
              "name": "New York City",
              "description": "Largest city in the United States"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="newyork" />
    </>
  );
};

export default NewYorkPage;
