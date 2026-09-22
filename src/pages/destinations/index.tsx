
import React from 'react';
import { MetaManager } from '@/components/MetaManager';
import { DestinationsHero } from '@/components/destinations/DestinationsHero';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { RegionQuickLinks } from '@/components/destinations/RegionQuickLinks';
import { destinations } from '@/data/destinations-list';

const DestinationsIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager />
      <DestinationsHero />
      <div className="container mx-auto px-4 pt-8">
        <RegionQuickLinks basePath="/destinations/region" />
      </div>
      <DestinationsList />
    </div>
  );
};

export default DestinationsIndex;
