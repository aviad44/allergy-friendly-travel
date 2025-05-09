
import React, { useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
  // Preload critical destination images
  useEffect(() => {
    const preloadImages = () => {
      Object.entries(DESTINATION_IMAGES).forEach(([destId, imgUrl]) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => console.log(`Successfully preloaded image for ${destId}: ${imgUrl}`);
        img.onerror = () => console.error(`Failed to preload image for ${destId}: ${imgUrl}`);
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
          // Get the image from our constants file
          const destKey = destination.id as keyof typeof DESTINATION_IMAGES;
          const imageValue = destKey in DESTINATION_IMAGES ? 
            DESTINATION_IMAGES[destKey] : 
            `https://placehold.co/400x225/1e3a8a/ffffff?text=${destination.name}`;
          
          console.log(`Destination ${destination.name} (${destination.id}) using image: ${imageValue}`);
          
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
