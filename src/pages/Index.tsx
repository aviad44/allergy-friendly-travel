
import { lazy, Suspense } from "react";
import { HOME_CONTENT } from "@/constants/home";
import { HeroSection } from "@/components/hero/HeroSection";
import { MetaManager } from "@/components/MetaManager";

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
  const mainImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
  
  return (
    <>
      <MetaManager
        routeKey="/"
        dynamicData={{
          image: mainImage,
        }}
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
