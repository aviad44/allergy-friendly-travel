
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet";

const Tuscany = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Tuscany Itinerary | Safe Dining in Italy";
  const pageDescription = "Explore our 6-day allergy-friendly Tuscany itinerary with safe hotels, restaurants & gluten-free options in Florence, Siena, and more. Updated for 2025!";
  const pageKeywords = "allergy-friendly tuscany, gluten-free tuscany, food allergies italy, tuscany itinerary, celiac florence, dairy-free tuscany";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tuscany";
  
  // The image we're using is the uploaded Ponte Vecchio view
  const imageUrl = "/lovable-uploads/ea1edce9-b144-449c-a4c7-0e3f02c54be9.png";
  
  console.log("Tuscany page rendering with image:", imageUrl);

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
            "datePublished": "2025-05-10",
            "dateModified": "2025-05-11",
            "about": {
              "@type": "Place",
              "name": "Tuscany",
              "description": "Italian region known for Renaissance art, wine and beautiful landscapes"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "image": imageUrl
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="tuscany" />
    </>
  );
};

export default Tuscany;
