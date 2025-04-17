
import React, { useState, useEffect } from 'react';

export const DestinationsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  // Determine image URL based on device type
  const getResponsiveImageUrl = () => {
    const isMobile = window.innerWidth < 768;
    const baseUrl = "https://images.unsplash.com/photo-1488085061387-422e29b40080";
    const params = isMobile 
      ? "?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
      : "?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    return baseUrl + params;
  };
  
  useEffect(() => {
    // Preload image with timeout for mobile
    const img = new Image();
    img.src = getResponsiveImageUrl();
    
    // Set timeout for slow connections
    const timeout = setTimeout(() => {
      console.log('Destinations hero image load timeout - using fallback');
      setImageFailed(true);
    }, 8000);
    
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
            width={window.innerWidth < 768 ? 800 : 1200}
            height={window.innerWidth < 768 ? 400 : 600}
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
