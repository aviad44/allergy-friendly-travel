
import React from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';
import { destinations } from '@/data/destinations-list';

export const DestinationsList = () => {
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
