
import React from 'react';
import { DestinationsHero } from '@/components/destinations/DestinationsHero';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { destinations } from '@/data/destinations-list';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { destinations } from '@/data/destinations-list';

const DestinationsIndex = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Travel Destinations | Safe Hotels Worldwide";
  const pageDescription = "Browse our comprehensive guide to allergy-friendly travel destinations worldwide. Find safe accommodations for dietary restrictions in top cities and regions.";
  const pageKeywords = "allergy-friendly destinations, food allergy travel, gluten-free travel destinations, allergy-conscious hotels worldwide";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations";
  const currentDate = new Date().toISOString().split('T')[0];
  const imageUrl = "https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png";
  
  return (
    <div className="min-h-screen bg-gray-50">

      <DestinationsHero />
      <DestinationsList />
    </div>
  );
};

export default DestinationsIndex;
