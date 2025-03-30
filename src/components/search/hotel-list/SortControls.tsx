
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface SortControlsProps {
  sortField: 'name' | 'rating';
  sortDirection: 'asc' | 'desc';
  onSortFieldChange: (value: 'name' | 'rating') => void;
  onSortDirectionChange: () => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ 
  sortField, 
  sortDirection, 
  onSortFieldChange, 
  onSortDirectionChange 
}) => {
  return (
    <div className="hidden md:flex items-center gap-2 min-w-[280px]">
      <span className="text-sm text-gray-500">Sort by:</span>
      <Select
        value={sortField}
        onValueChange={(value) => onSortFieldChange(value as 'name' | 'rating')}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onSortDirectionChange}
        className="ml-1"
        aria-label={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
      >
        {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};
