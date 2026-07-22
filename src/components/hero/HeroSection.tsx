
import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  // Same source photo, pre-resized to WebP at several widths (was a single
  // 246KB PNG at native 1920x960 served to every viewport, including
  // 360px-wide mobile screens where it was 15-20x more pixels than needed).
  const heroImageUrl = "/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86-1200w.webp";
  const heroSrcSet = [640, 960, 1200, 1600, 1920]
    .map((w) => `/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86-${w}w.webp ${w}w`)
    .join(', ');

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full max-w-full font-['Poppins']"
    >
      {/* Optimized background image for LCP discovery */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImageUrl}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt="Beautiful poolside vacation scene with palm trees - Allergy-Free Travel"
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          width="1920"
          height="960"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto box-border">
        <div className="w-full max-w-[92%] sm:max-w-[85%] md:max-w-[700px] mx-auto">
          <div 
            className="text-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0, 85, 102, 0.4)' }}
          >
            <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.2rem] font-bold leading-tight mb-3 sm:mb-4 text-white drop-shadow-md">
              Find Allergy Friendly Hotels & Restaurants
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white font-medium drop-shadow-md mx-auto max-w-full sm:max-w-xl">
              Travel safely with food allergies
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
