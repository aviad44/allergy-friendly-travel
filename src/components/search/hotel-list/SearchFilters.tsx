
import React from 'react';
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from 'lucide-react';
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
  sortField,
  sortDirection,
  onFiltersDialogOpen,
  onSortFieldChange,
  onSortDirectionChange
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-2">
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
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
