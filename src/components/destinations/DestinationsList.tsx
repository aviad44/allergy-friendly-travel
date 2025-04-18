
import React, { useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
  // Preload critical destination images to avoid the default mountain image
  useEffect(() => {
    const preloadImages = () => {
      // Preload the most visited destination images
      const criticalDestinations = ['paris', 'london', 'barcelona', 'cyprus', 'turkey'];
      
      criticalDestinations.forEach(destId => {
        const imgSrc = DESTINATION_IMAGES[destId as keyof typeof DESTINATION_IMAGES];
        
        if (imgSrc) {
          // For Unsplash photo IDs
          if (imgSrc.startsWith('photo-')) {
            const img = new Image();
            img.src = `https://images.unsplash.com/${imgSrc}?auto=format&fit=crop&w=800&q=80`;
          } 
          // For direct URLs (like Turkey)
          else if (imgSrc.startsWith('/') || imgSrc.startsWith('http')) {
            const img = new Image();
            img.src = imgSrc;
          }
        }
      });
    };
    
    preloadImages();
  }, []);

  return (
    <section className="py-8 md:py-12 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            id={destination.id}
            name={destination.name}
            country={destination.country}
            description={destination.description}
            image={DESTINATION_IMAGES[destination.id as keyof typeof DESTINATION_IMAGES] || ''}
            path={`/destinations/${destination.id}`}
          />
        ))}
      </div>
    </section>
  );
};
