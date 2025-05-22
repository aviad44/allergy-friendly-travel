
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { sortOptions } from "@/types/definitions";

interface ReviewFiltersProps {
  selectedDestination: string;
  selectedTravelerType: string;
  sortBy: typeof sortOptions[number];
  onDestinationChange: (destination: string) => void;
  onTravelerTypeChange: (travelerType: string) => void;
  onSortChange: (sortOption: string) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  selectedDestination,
  selectedTravelerType,
  sortBy,
  onDestinationChange,
  onTravelerTypeChange,
  onSortChange
}) => {
  const destinations = [
    { value: 'all', label: 'All Destinations' },
    { value: 'london', label: 'London' },
    { value: 'paris', label: 'Paris' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'new-york', label: 'New York' }
  ];

  const travelerTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'family', label: 'Family' },
    { value: 'couple', label: 'Couple' },
    { value: 'solo', label: 'Solo' },
    { value: 'friends', label: 'Friends' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select 
        value={selectedDestination} 
        onValueChange={onDestinationChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Destination" />
        </SelectTrigger>
        <SelectContent>
          {destinations.map((dest) => (
            <SelectItem key={dest.value} value={dest.value}>
              {dest.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedTravelerType} 
        onValueChange={onTravelerTypeChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Traveler Type" />
        </SelectTrigger>
        <SelectContent>
          {travelerTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={sortBy} 
        onValueChange={onSortChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="highestRated">Highest Rated</SelectItem>
          <SelectItem value="lowestRated">Lowest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
