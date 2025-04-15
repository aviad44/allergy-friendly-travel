
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet-async";

const Turkey = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Turkey (2025 Guide) | Safe Travel";
  const pageDescription = "Discover allergy-friendly hotels in Turkey. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs in Antalya, Belek, and more.";
  const pageKeywords = "Turkey allergy friendly hotels, gluten free hotel Turkey, celiac Turkey travel, nut free hotels Antalya, dairy free hotels Belek";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/turkey";
  const currentDate = new Date().toISOString().split('T')[0];

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
        <meta property="og:image" content="https://images.unsplash.com/photo-1570598838702-920e0cde602b?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1570598838702-920e0cde602b?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelArticle",
            "headline": "Allergy-Friendly Hotels in Turkey (2025 Guide)",
            "description": pageDescription,
            "image": "https://images.unsplash.com/photo-1570598838702-920e0cde602b?auto=format&fit=crop&w=1200&q=80",
            "author": {
              "@type": "Organization",
              "name": "Allergy-Free Travel"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png"
              }
            },
            "datePublished": currentDate,
            "dateModified": currentDate
          })}
        </script>
      </Helmet>
      
      <DestinationReviews destinationId="turkey" />
    </>
  );
};

export default Turkey;
