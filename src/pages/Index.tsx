
import { lazy, Suspense, useEffect } from "react";
import { HOME_CONTENT } from "@/constants/home";
import { HeroSection } from "@/components/hero/HeroSection";
import { SocialTags } from "@/components/SocialTags";
import { Helmet } from "react-helmet";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

// Lazy load non-critical components with better chunking
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
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  const mainImage = 'https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';
  
  // Initialize performance optimizations
  usePerformanceOptimization();
  
  return (
    <>
      {/* Optimized meta tags with performance hints */}
      <Helmet>
        <meta property="og:image" content={mainImage} />
        <meta property="og:image:secure_url" content={mainImage} />
        <meta property="og:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions" />
        <meta property="og:description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/" />
        <link rel="image_src" href={mainImage} />
        
        {/* Performance optimization hints */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Helmet>
    
      <SocialTags
        title="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions"
        description="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more."
        imageUrl={mainImage}
        url={`${baseUrl}/`}
        type="website"
      />
      
      {/* Hero loads immediately - critical for LCP */}
      <HeroSection />
      
      {/* Featured destinations load lazily with improved intersection observer */}
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
