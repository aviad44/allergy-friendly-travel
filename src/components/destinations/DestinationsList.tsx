
import React, { useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
  // Preload critical destination images to avoid the default mountain image
  useEffect(() => {
    const preloadImages = () => {
      // Preload all destination images to ensure they're ready
      destinations.forEach(destination => {
        const imgKey = destination.id as keyof typeof DESTINATION_IMAGES;
        const imgSrc = DESTINATION_IMAGES[imgKey];
        
        if (imgSrc) {
          // For Unsplash photo IDs
          if (typeof imgSrc === 'string' && imgSrc.startsWith('photo-')) {
            const img = new Image();
            img.src = `https://images.unsplash.com/${imgSrc}?auto=format&fit=crop&w=800&q=80`;
          } 
          // For direct URLs (like hotel-chains, turkey, toronto)
          else if (typeof imgSrc === 'string' && (imgSrc.startsWith('/') || imgSrc.startsWith('http'))) {
            const img = new Image();
            img.src = imgSrc;
          }
        }
      });
    };
    
    // Use a small timeout to not block the main thread during initial load
    const timer = setTimeout(() => {
      preloadImages();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => {
          const imageKey = destination.id as keyof typeof DESTINATION_IMAGES;
          const imageValue = DESTINATION_IMAGES[imageKey] || '';
          
          return (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              country={destination.country}
              description={destination.description}
              image={imageValue}
              path={`/destinations/${destination.id}`}
            />
          );
        })}
      </div>
    </section>
  );
};
