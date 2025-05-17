
import { useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
  // Preload critical destination images to avoid loading issues
  useEffect(() => {
    const preloadImages = () => {
      // Define all critical destinations that need special attention
      const criticalDestinations = ['cyprus', 'crete', 'hotel-chains', 'turkey', 'toronto', 'barcelona', 'munich'];
      
      // Special handling for critical destinations with direct hardcoded paths
      const criticalImageMap: Record<string, string> = {
        'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
        'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", // Updated Cyprus image with beachfront resort
        'crete': DESTINATION_IMAGES['crete'], 
        'turkey': DESTINATION_IMAGES['turkey'],
        'toronto': DESTINATION_IMAGES['toronto'], 
        'barcelona': DESTINATION_IMAGES['barcelona'],
        'munich': "/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png" // Add Munich to critical images
      };
      
      // First preload critical destinations with direct hardcoded paths
      criticalDestinations.forEach(destId => {
        const destination = destinations.find(d => d.id === destId);
        if (!destination) return;
        
        // Use the hardcoded path
        const imgSrc = criticalImageMap[destId] || '';
        
        if (imgSrc) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => console.log(`Successfully preloaded critical image for ${destination.name}: ${imgSrc}`);
          img.onerror = () => console.error(`Failed to preload critical image for ${destination.name}: ${imgSrc}`);
        }
      });
      
      // Then preload the rest of the destinations
      destinations.forEach(destination => {
        // Skip already preloaded critical destinations
        if (criticalDestinations.includes(destination.id)) return;
        
        const imgKey = destination.id as keyof typeof DESTINATION_IMAGES;
        const imgSrc = DESTINATION_IMAGES[imgKey];
        
        if (imgSrc) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => console.log(`Successfully preloaded image for ${destination.name}`);
          img.onerror = () => console.error(`Failed to preload image for ${destination.name}`);
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
          // CRITICAL: Hardcoded paths for specific destinations
          const criticalImageMap: Record<string, string> = {
            'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
            'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", // Updated Cyprus image with beachfront resort
            'crete': DESTINATION_IMAGES['crete'], 
            'turkey': DESTINATION_IMAGES['turkey'],
            'toronto': DESTINATION_IMAGES['toronto'], 
            'barcelona': DESTINATION_IMAGES['barcelona'],
            'munich': "/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png" // Add Munich to critical images
          };
          
          // Get image value with fallbacks
          let imageValue = '';
          
          // First check critical destinations mapping
          if (destination.id in criticalImageMap) {
            imageValue = criticalImageMap[destination.id];
          }
          // Then try central DESTINATION_IMAGES
          else {
            const imageKey = destination.id as keyof typeof DESTINATION_IMAGES;
            imageValue = DESTINATION_IMAGES[imageKey] || '';
          }
          
          // If still no image, use a placeholder
          if (!imageValue) {
            imageValue = `https://placehold.co/400x225/1e3a8a/ffffff?text=${destination.name}`;
          }
          
          console.log(`DestinationsList: ${destination.name} (${destination.id}) using image: ${imageValue}`);
          
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
