
import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="container mx-auto px-4 pt-8 flex flex-wrap items-center justify-between gap-4">
        <RegionQuickLinks basePath="/destinations/region" />
        <Link
          to="/gluten-free/"
          className="text-sm px-4 py-2 rounded-full border border-amber-300 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100 transition-colors font-medium whitespace-nowrap"
        >
          🌾 Gluten-Free &amp; Celiac Guide →
        </Link>
      </div>
      <DestinationsList />
    </div>
  );
};

export default DestinationsIndex;
