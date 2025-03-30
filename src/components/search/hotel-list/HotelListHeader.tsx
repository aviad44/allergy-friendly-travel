
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HotelListHeaderProps {
  destination: string;
  allergies: string;
  hotelCount: number;
}

export const HotelListHeader: React.FC<HotelListHeaderProps> = ({
  destination,
  allergies,
  hotelCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Allergy-Friendly Hotels in {destination}
        </h1>
        <div className="flex items-center mt-2">
          <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-medium">
            {allergies} Allergies
          </Badge>
          <span className="text-gray-500 text-sm ml-3">
            {hotelCount} hotels found
          </span>
        </div>
      </div>
    </div>
  );
};
