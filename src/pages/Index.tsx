
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { HOME_CONTENT } from "@/constants/home";
import { HeroSection } from "@/components/hero/HeroSection";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/image-optimization";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";
import { SocialTags } from "@/components/SocialTags";
import { preloadDefaultImage } from "@/utils/socialSharing";
import { Helmet } from "react-helmet";

export default function Index() {
  const currentDate = new Date().toISOString().split('T')[0];
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  // Using the correct hero image for social sharing
  const mainImage = 'https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';
  
  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
    preloadDefaultImage(); // Preload the default sharing image
  }, []);
  
  // Preload critical images for index page
  preloadCriticalImages([
    mainImage,
    'https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png',
    'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png'
  ]);
  
  return (
    <>
      {/* Add direct Helmet tags for the homepage for maximum compatibility */}
      <Helmet>
        <meta property="og:image" content={mainImage} />
        <meta property="og:image:secure_url" content={mainImage} />
        <meta property="og:title" content="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions" />
        <meta property="og:description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/" />
        <link rel="image_src" href={mainImage} />
      </Helmet>
    
      <SocialTags
        title="Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions"
        description="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more."
        imageUrl={mainImage}
        url={`${baseUrl}/`}
        type="website"
      />
      
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
