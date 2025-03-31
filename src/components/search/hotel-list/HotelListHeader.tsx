
import React from 'react';
import { Badge } from '@/components/ui/badge';

export interface HotelListHeaderProps {
  destination: string;
  allergies: string;
  hotelCount: number;
  onOpenFilters?: () => void;
}

export const HotelListHeader: React.FC<HotelListHeaderProps> = ({
  destination,
  allergies,
  hotelCount,
  onOpenFilters
}) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Allergy-Friendly Hotels in {destination}
      </h1>
      <p className="text-gray-600 mb-3">
        Safe accommodations for visitors with {allergies} allergies
      </p>
      <div className="flex items-center mt-2">
        <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-medium">
          {allergies} Allergies
        </Badge>
        <span className="text-gray-500 text-sm ml-3">
          {hotelCount} hotels found
        </span>
        {onOpenFilters && (
          <button 
            onClick={onOpenFilters} 
            className="ml-3 text-sm text-primary hover:underline"
          >
            Open Filters
          </button>
        )}
      </div>
    </div>
  );
};

