
import { lazy, Suspense } from "react";
import { HOME_CONTENT } from "@/constants/home";
import { HeroSection } from "@/components/hero/HeroSection";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { Helmet } from "react-helmet";

// Lazy load non-critical components
const FeaturedDestinations = lazy(() => 
  import("@/components/FeaturedDestinations").then(module => ({
    default: module.FeaturedDestinations
  }))
);

// Lightweight loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-2 border-[#00b397] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Index() {
  const baseUrl = 'https://www.allergy-free-travel.com';
  const mainImage = 'https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';
  
  return (
    <>
      <CanonicalTags canonicalUrl={`${baseUrl}/`} />
      
      {/* Meta tags */}
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Food Allergies</title>
        <meta name="description" content="Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers. Book with confidence worldwide." />
        <meta name="keywords" content="allergy-friendly hotels, gluten-free travel, food allergy travel, safe restaurants, dairy-free hotels, nut-free travel" />
        <meta property="og:image" content={mainImage} />
        <meta property="og:image:secure_url" content={mainImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Allergy-friendly travel guide showing safe hotels and restaurants" />
        <meta property="og:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Food Allergies" />
        <meta property="og:description" content="Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers. Book with confidence worldwide." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Food Allergies" />
        <meta name="twitter:description" content="Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers." />
        <meta name="twitter:image" content={mainImage} />
        <link rel="image_src" href={mainImage} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Allergy-Free Travel",
            "description": "Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers.",
            "url": "https://www.allergy-free-travel.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.allergy-free-travel.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "url": "https://www.allergy-free-travel.com"
            }
          })}
        </script>
      </Helmet>
    
      <SocialTags
        title="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Food Allergies"
        description="Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers. Book with confidence worldwide."
        imageUrl={mainImage}
        url={`${baseUrl}/`}
        type="website"
      />
      
      {/* Hero loads immediately */}
      <HeroSection />
      
      {/* Featured destinations */}
      <section className="py-10 sm:py-16 md:py-20 px-4 bg-gray-50 w-full">
        <div className="container mx-auto max-w-[1400px]">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center font-bold text-blue-800">
            {HOME_CONTENT.featured.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.featured.description}
          </p>
          
          <Suspense fallback={<SectionLoader />}>
            <FeaturedDestinations />
          </Suspense>
        </div>
      </section>
    </>
  );
}
