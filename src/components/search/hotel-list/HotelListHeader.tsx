
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HotelListHeaderProps {
  destination: string;
  allergies: string;
  hotelCount: number;
}

export const HotelListHeader: React.FC<HotelListHeaderProps> = ({
  allergies,
  hotelCount
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mt-2">
        <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-medium">
          {allergies} Allergies
        </Badge>
        <span className="text-gray-500 text-sm ml-3">
          {hotelCount} hotels found
        </span>
      </div>
    </div>
  );
};
