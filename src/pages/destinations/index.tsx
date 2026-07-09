
import React from 'react';
import { MetaManager } from '@/components/MetaManager';
import { DestinationsHero } from '@/components/destinations/DestinationsHero';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { destinations } from '@/data/destinations-list';

const DestinationsIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager />
      <DestinationsHero />
      <DestinationsList />
    </div>
  );
};

export default DestinationsIndex;
