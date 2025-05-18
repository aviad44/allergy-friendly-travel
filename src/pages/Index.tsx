
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from "react-helmet";
import { HeroSection } from "@/components/hero/HeroSection";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/image-optimization";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";

export default function Index() {
  const currentDate = new Date().toISOString().split('T')[0];
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  const mainImage = '/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';
  
  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
    
    // Preload critical images and verify they exist
    const imagesToPreload = [
      mainImage,
      '/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png',
      '/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png'
    ];
    
    // Verify images exist before preloading
    imagesToPreload.forEach(img => {
      const testImg = new Image();
      testImg.onload = () => console.log(`Image verified: ${img}`);
      testImg.onerror = () => console.error(`Image failed to load: ${img}`);
      testImg.src = img;
    });
    
    preloadCriticalImages(imagesToPreload);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
        <meta name="description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="keywords" content="allergy-friendly travel, food allergy hotels, gluten-free accommodation, dairy-free travel, nut-free hotels, allergen-free vacation, safe travel with allergies" />
        <link rel="canonical" href={`${baseUrl}/`} />
        
        {/* Preloads for critical resources */}
        <link rel="preload" href={mainImage} as="image" />
        
        {/* Open Graph Meta Tags - CRITICAL FOR FACEBOOK/WHATSAPP SHARING */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
        <meta property="og:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
        <meta property="og:url" content={`${baseUrl}/`} />
        <meta property="og:image" content={`${baseUrl}${mainImage}`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Toronto Skyline - Allergy-Free Travel" />
        <meta property="og:site_name" content="Allergy-Free Travel" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
        <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
        <meta name="twitter:image" content={`${baseUrl}${mainImage}`} />
        <meta name="twitter:image:alt" content="Toronto Skyline - Allergy-Free Travel" />
        
        {/* WhatsApp specific meta - additional tags to ensure compatibility */}
        <meta property="og:image:secure_url" content={`${baseUrl}${mainImage}`} />
        <link itemProp="thumbnailUrl" href={`${baseUrl}${mainImage}`} />
        <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
          <link itemProp="url" href={`${baseUrl}${mainImage}`} />
        </span>
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Allergy Free Travel",
            "description": "Helping travelers with food allergies and dietary restrictions find safe accommodations worldwide.",
            "url": baseUrl,
            "logo": `${baseUrl}${mainImage}`,
            "telephone": "+1-123-456-7890",
            "email": "info@allergy-free-travel.com",
            "areaServed": "Worldwide",
            "serviceType": "Allergy-Friendly Travel Planning",
            "dateModified": currentDate,
            "image": {
              "@type": "ImageObject",
              "url": `${baseUrl}${mainImage}`,
              "width": "1200",
              "height": "800"
            }
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
