
import React, { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Generate optimized hero image URL with variable size based on viewport
  const getOptimizedHeroUrl = () => {
    const baseUrl = "/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png";
    
    // Since this is an uploaded image and not an Unsplash URL,
    // we can't optimize it at runtime. Return the original URL.
    return baseUrl;
  };
  
  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = getOptimizedHeroUrl();
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section 
      className="relative min-h-[100vh] sm:min-h-[110vh] flex items-center justify-center overflow-hidden w-full font-['Poppins']"
    >
      {/* Low quality placeholder while image loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      ></div>
      
      {/* Main hero image - optimized */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url("${getOptimizedHeroUrl()}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: isMobile ? '100vh' : '110vh',
        }}
        role="img"
        aria-label="Allergy-friendly travel destination with scenic view"
      ></div>
      
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[0px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 -mt-0 sm:-mt-16">
        <div className="mx-auto max-w-[90%] sm:max-w-[700px]">
          <div 
            className="text-center p-6 sm:p-10 rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0, 85, 102, 0.4)' }}
          >
            <h1 className="text-[1.75rem] sm:text-[2.2rem] font-bold leading-tight sm:leading-relaxed mb-4 text-white drop-shadow-md">
              <span className="block">Find Your Perfect</span>
              <span className="block">
                Food Allergy Friendly Hotel
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-8 text-white font-medium drop-shadow-md max-w-xl mx-auto">
              Find hotels that understand your allergy needs for a safe and enjoyable stay
            </p>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
