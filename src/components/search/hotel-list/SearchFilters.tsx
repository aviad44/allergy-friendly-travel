
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from 'lucide-react';
import { SortControls } from './SortControls';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onFiltersDialogOpen: () => void;
  sortField: 'name' | 'rating';
  sortDirection: 'asc' | 'desc';
  onSortFieldChange: (field: 'name' | 'rating') => void;
  onSortDirectionChange: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchQueryChange,
  onFiltersDialogOpen,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search hotels by name or features..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <SortControls
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={onSortFieldChange}
          onSortDirectionChange={onSortDirectionChange}
        />
        
        <Button 
          variant="outline"
          size="icon"
          onClick={onFiltersDialogOpen}
          className="md:hidden"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
