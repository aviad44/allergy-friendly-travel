
import React, { useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
  // Preload critical destination images to avoid the default mountain image
  useEffect(() => {
    const preloadImages = () => {
      // Define critical destinations that need special attention
      const criticalDestinations = ['cyprus', 'crete', 'hotel-chains', 'turkey', 'toronto'];
      
      // Special handling for problematic destinations first
      criticalDestinations.forEach(destId => {
        const destination = destinations.find(d => d.id === destId);
        if (!destination) return;
        
        const imgKey = destination.id as keyof typeof DESTINATION_IMAGES;
        let imgSrc = '';
        
        // Use hardcoded paths for critical destinations
        if (destId === 'hotel-chains') {
          imgSrc = "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png";
        } else if (destId === 'cyprus') {
          imgSrc = "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png";
        } else if (destId === 'crete') {
          imgSrc = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80";
        } else if (destId === 'turkey') {
          imgSrc = "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
        } else if (destId === 'toronto') {
          imgSrc = "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png";
        } else if (DESTINATION_IMAGES[imgKey]) {
          imgSrc = DESTINATION_IMAGES[imgKey];
        }
        
        if (imgSrc) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => console.log(`Successfully preloaded critical image for ${destination.name}: ${imgSrc}`);
          img.onerror = () => console.error(`Failed to preload critical image for ${destination.name}: ${imgSrc}`);
        }
      });
      
      // Then preload the rest
      destinations.forEach(destination => {
        // Skip already preloaded critical destinations
        if (criticalDestinations.includes(destination.id)) return;
        
        const imgKey = destination.id as keyof typeof DESTINATION_IMAGES;
        const imgSrc = DESTINATION_IMAGES[imgKey];
        
        if (imgSrc) {
          const img = new Image();
          
          // For Unsplash photo IDs
          if (typeof imgSrc === 'string' && imgSrc.startsWith('photo-')) {
            img.src = `https://images.unsplash.com/${imgSrc}?auto=format&fit=crop&w=800&q=80`;
          } 
          // For direct URLs
          else if (typeof imgSrc === 'string' && (imgSrc.startsWith('/') || imgSrc.startsWith('http'))) {
            img.src = imgSrc;
          }
          
          img.onload = () => console.log(`Successfully preloaded image for ${destination.name}`);
          img.onerror = () => console.error(`Failed to preload image for ${destination.name}: ${imgSrc}`);
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
          let imageValue = '';
          
          // Special handling for problematic destinations
          if (destination.id === 'hotel-chains') {
            imageValue = "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png";
          } else if (destination.id === 'cyprus') {
            imageValue = "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png";
          } else if (destination.id === 'crete') {
            imageValue = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80";
          } else if (destination.id === 'turkey') {
            imageValue = "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
          } else if (destination.id === 'toronto') {
            imageValue = "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png";
          } else {
            // For other destinations, use the standard lookup
            const imageKey = destination.id as keyof typeof DESTINATION_IMAGES;
            imageValue = DESTINATION_IMAGES[imageKey] || '';
          }
          
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
