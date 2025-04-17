
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from "react-helmet";
import { HeroSection } from "@/components/hero/HeroSection";
import { useEffect } from "react";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";

export default function Index() {
  // Define currentDate for use in the JSON-LD schema
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
        <meta name="description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="keywords" content="allergy-friendly travel, food allergy hotels, gluten-free accommodation, dairy-free travel, nut-free hotels, allergen-free vacation, safe travel with allergies" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/lovable-uploads/521a0582-0fd0-49a1-92e5-e0975d113512.webp" as="image" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions" />
        <meta property="og:description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/" />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions" />
        <meta name="twitter:description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.webp" />
        
        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Allergy Free Travel",
            "description": "Helping travelers with food allergies and dietary restrictions find safe accommodations worldwide.",
            "url": "https://www.allergy-free-travel.com",
            "logo": "https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.webp",
            "telephone": "+1-123-456-7890",
            "email": "info@allergy-free-travel.com",
            "areaServed": "Worldwide",
            "serviceType": "Allergy-Friendly Travel Planning",
            "dateModified": currentDate,
            "image": "https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.webp"
          })}
        </script>
      </Helmet>
      
      <HeroSection />
      
      <section className="py-10 sm:py-16 md:py-20 px-4 bg-gray-50 w-full">
        <div className="container mx-auto max-w-[1400px]">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center font-bold text-blue-800">
            {HOME_CONTENT.featured.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.featured.description}
          </p>
          <FeaturedDestinations />
        </div>
      </section>
    </>
  );
}
