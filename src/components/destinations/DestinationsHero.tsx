
import React, { useState, useEffect } from 'react';

export const DestinationsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  // Determine optimized image URL based on device type
  const getResponsiveImageUrl = () => {
    const width = window.innerWidth < 768 ? 800 : 1600;
    const baseUrl = "https://images.unsplash.com/photo-1488085061387-422e29b40080";
    return `${baseUrl}?fm=webp&w=${width}&q=${window.innerWidth < 768 ? 75 : 80}`;
  };
  
  // Create responsive srcSet for different viewport sizes
  const srcSet = `
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=640&q=75 640w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=960&q=75 960w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=1200&q=80 1200w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=1600&q=80 1600w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=2000&q=80 2000w
  `;
  
  useEffect(() => {
    // Preload image with timeout for mobile
    const img = new Image();
    img.src = getResponsiveImageUrl();
    
    // Set timeout for slow connections
    const timeout = setTimeout(() => {
      console.log('Destinations hero image load timeout - using fallback');
      setImageFailed(true);
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      setImageFailed(true);
      console.error('Failed to load destinations hero image');
    };
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative py-10 md:py-16 mt-0">
      <div className="absolute inset-0 overflow-hidden">
        {/* Show low quality placeholder while image loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        ></div>
        
        {/* Main image with optimized loading */}
        {!imageFailed ? (
          <img 
            src={getResponsiveImageUrl()} 
            alt="Travel destinations" 
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="eager" // This is a hero image so eager loading is appropriate
            width={window.innerWidth < 768 ? 800 : 1600}
            height={window.innerWidth < 768 ? 400 : 600}
            srcSet={srcSet}
            sizes="(max-width: 640px) 640px, (max-width: 960px) 960px, (max-width: 1200px) 1200px, (max-width: 1600px) 1600px, 2000px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-6 leading-tight">
          <span className="text-sky-200 font-bold">Discover</span>
          <span className="block mt-1 sm:mt-2 text-teal-300 font-bold">Allergy-Friendly Destinations</span>
        </h1>
        <p className="text-white text-base md:text-xl mx-auto">
          Find the perfect accommodation that caters to your specific allergy needs
        </p>
      </div>
    </section>
  );
};
