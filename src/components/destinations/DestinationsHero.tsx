
import React, { useState, useEffect, useRef } from 'react';

export const DestinationsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Determine image URL based on device type with WebP support
  const getResponsiveImageUrl = () => {
    const isMobile = window.innerWidth < 768;
    const baseUrl = "https://images.unsplash.com/photo-1488085061387-422e29b40080";
    // Request WebP format for better compression
    const params = isMobile 
      ? "?ixlib=rb-4.0.3&auto=format&fm=webp&fit=crop&w=800&q=75" 
      : "?ixlib=rb-4.0.3&auto=format&fm=webp&fit=crop&w=1200&q=75";
    return baseUrl + params;
  };
  
  useEffect(() => {
    // Only load the image when the hero section is about to come into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Preload image with timeout for mobile
          const img = new Image();
          img.src = getResponsiveImageUrl();
          
          // Set timeout for slow connections
          const timeout = setTimeout(() => {
            setImageFailed(true);
          }, 8000);
          
          img.onload = () => {
            clearTimeout(timeout);
            setImageLoaded(true);
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            setImageFailed(true);
          };
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative py-10 md:py-16 mt-0" ref={heroRef}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Show low quality placeholder while image loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        ></div>
        
        {/* Main image with optimized loading */}
        {!imageFailed ? (
          <img 
            src={imageLoaded ? getResponsiveImageUrl() : ''}
            alt="Travel destinations" 
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            width={window.innerWidth < 768 ? 800 : 1200}
            height={window.innerWidth < 768 ? 400 : 600}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            fetchpriority="low"
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
