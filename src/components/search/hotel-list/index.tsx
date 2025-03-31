
import React, { useState } from 'react';
import { HotelListHeader } from './HotelListHeader';
import { HotelGrid } from './HotelGrid';
import { HotelDetailsDialog } from './HotelDetailsDialog';
import { FiltersDialog } from './FiltersDialog';
import { HotelInfo } from '@/types/search';

export interface HotelListProps {
  hotels: HotelInfo[];
  destination: string;
  allergies: string;
  error?: string;
}

export const HotelList: React.FC<HotelListProps> = ({
  hotels,
  destination,
  allergies,
  error
}) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelInfo | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header with sorting and filter controls */}
      <HotelListHeader 
        hotelCount={hotels.length}
        onOpenFilters={() => setIsFiltersOpen(true)}
      />
      
      {/* Main hotel list grid */}
      <HotelGrid 
        hotels={hotels} 
        onHotelSelect={setSelectedHotel}
        error={error}
      />
      
      {/* Hotel details dialog */}
      <HotelDetailsDialog
        selectedHotel={selectedHotel}
        onOpenChange={() => setSelectedHotel(null)}
      />
      
      {/* Filters dialog */}
      <FiltersDialog
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        destination={destination}
        allergies={allergies}
      />
    </div>
  );
};
