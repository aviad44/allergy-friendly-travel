
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Cyprus = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Cyprus | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Cyprus. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly cyprus, gluten-free hotels cyprus, food allergies cyprus, cyprus hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cyprus";
  
  // CRITICAL: Using a reliable Ayia Napa image for Cyprus
  // Updated to use Unsplash image that's guaranteed to load
  const imageUrl = "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80";
  
  console.log("Cyprus page rendering with image:", imageUrl);

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
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
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
              "@type": "Country",
              "name": "Cyprus",
              "description": "Island country in the Mediterranean Sea with beautiful beaches"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": imageUrl
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="cyprus" />
    </>
  );
};

export default Cyprus;
