
import React, { useState, useEffect } from 'react';
import { preloadCriticalImages, trackImagePerformance } from '@/utils/image-optimization';

export const DestinationsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  // Track LCP performance for this critical element
  trackImagePerformance('destinations-hero');
  
  // Define image dimensions based on viewport
  const width = window.innerWidth;
  const height = Math.round(width < 768 ? width * 0.5 : width * 0.35); // Maintain aspect ratio
  
  // Define the optimized image URL with proper format
  const imageUrl = "https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=1600&q=80";
  
  // Create responsive srcSet for different viewport sizes
  const srcSet = `
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=640&q=75 640w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=960&q=75 960w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=1200&q=80 1200w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=1600&q=80 1600w,
    https://images.unsplash.com/photo-1488085061387-422e29b40080?fm=webp&w=2000&q=80 2000w
  `;
  
  // Preload the hero image for better LCP
  preloadCriticalImages([imageUrl]);
  
  useEffect(() => {
    // Preload image with priority
    const img = new Image();
    img.src = imageUrl;
    img.fetchPriority = 'high';
    img.loading = 'eager';
    
    // Set timeout for slow connections
    const timeout = setTimeout(() => {
      console.log('Destinations hero image load timeout - using fallback');
      setImageFailed(true);
    }, 3000); // Reduced timeout for better UX
    
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
    <section className="relative py-10 md:py-16 mt-0" id="destinations-hero">
      <div className="absolute inset-0 overflow-hidden">
        {/* Show low quality placeholder while image loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
          style={{ width, height }}
        ></div>
        
        {/* Main image with optimized loading and explicit dimensions */}
        {!imageFailed ? (
          <img 
            src={imageUrl} 
            alt="Travel destinations" 
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="eager" 
            fetchPriority="high"
            width={width}
            height={height}
            srcSet={srcSet}
            sizes="100vw"
            decoding="async"
          />
        ) : (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600"
            style={{ width, height }}
          ></div>
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
