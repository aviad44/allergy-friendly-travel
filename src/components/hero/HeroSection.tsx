
import React, { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  const heroImageUrl = "/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png";
  
  // Aggressive preloading for LCP optimization
  useEffect(() => {
    // Create high-priority image preload
    const img = new Image();
    img.fetchPriority = 'high';
    img.loading = 'eager';
    img.onload = () => setImageLoaded(true);
    img.src = heroImageUrl;
    
    // Prefetch critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImageUrl;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden w-full font-['Poppins']"
      style={{
        // Inline critical styles for faster rendering
        backgroundImage: imageLoaded ? `url("${heroImageUrl}")` : 'linear-gradient(135deg, #00b397 0%, #0085a3 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optimized overlay */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full max-w-[95%] sm:max-w-[85%] md:max-w-[700px] mx-auto">
          <div 
            className="text-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0, 85, 102, 0.4)' }}
          >
            <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.2rem] font-bold leading-tight mb-3 sm:mb-4 text-white drop-shadow-md">
              <span className="block">Find Your Perfect</span>
              <span className="block">
                Food Allergy Friendly Hotel
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white font-medium drop-shadow-md mx-auto max-w-full sm:max-w-xl">
              Find hotels that understand your allergy needs for a safe and enjoyable stay
            </p>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02] w-full">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
