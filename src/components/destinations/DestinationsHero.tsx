
import React, { useState, useEffect } from 'react';

export const DestinationsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";
    img.onload = () => setImageLoaded(true);
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
        <img 
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
          alt="Travel destinations" 
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager" // This is a hero image so eager loading is appropriate
          width="1200"
          height="600"
        />
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
