
import React, { useState, useMemo } from 'react';
import { HotelInfo } from '@/types/search';
import { SearchFilters } from './SearchFilters';
import { HotelGrid } from './HotelGrid';
import { HotelsPagination } from './HotelsPagination';
import { HotelDetailsDialog } from './HotelDetailsDialog';
import { FiltersDialog } from './FiltersDialog';
import { HotelListHeader } from './HotelListHeader';

interface HotelListProps {
  hotels: HotelInfo[];
  destination: string;
  allergies: string;
}

// Hotels per page
const ITEMS_PER_PAGE = 6;

export const HotelList: React.FC<HotelListProps> = ({ hotels, destination, allergies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<HotelInfo | null>(null);
  const [sortField, setSortField] = useState<'name' | 'rating'>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter and sort hotels based on current criteria
  const filteredAndSortedHotels = useMemo(() => {
    if (!hotels.length) return [];
    
    let filtered = [...hotels];
    
    // Apply search query filter if any
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(query) || 
        (hotel.location && hotel.location.toLowerCase().includes(query)) ||
        (hotel.accommodations && hotel.accommodations.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'rating') {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return sortDirection === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      }
      return 0;
    });
  }, [hotels, sortField, sortDirection, searchQuery]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredAndSortedHotels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHotels = filteredAndSortedHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Pagination navigation
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Sorting handlers
  const handleSort = (field: 'name' | 'rating') => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new sort field
      setSortField(field);
      setSortDirection(field === 'rating' ? 'desc' : 'asc');
    }
  };
  
  const handleSortFieldChange = (field: 'name' | 'rating') => {
    setSortField(field);
    setSortDirection(field === 'rating' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      {/* Page title and allergen tag */}
      <HotelListHeader 
        destination={destination} 
        allergies={allergies}
        hotelCount={filteredAndSortedHotels.length} 
      />
      
      {/* Search and filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onFiltersDialogOpen={() => setIsFiltersDialogOpen(true)}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortFieldChange={handleSortFieldChange}
        onSortDirectionChange={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
      />
      
      {/* Hotel grid */}
      <HotelGrid 
        hotels={paginatedHotels}
        onHotelSelect={setSelectedHotel}
      />
      
      {/* Pagination */}
      <HotelsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      {/* Hotel Details Dialog */}
      <HotelDetailsDialog 
        selectedHotel={selectedHotel} 
        onOpenChange={() => setSelectedHotel(null)} 
      />
      
      {/* Mobile Filters Dialog */}
      <FiltersDialog
        isOpen={isFiltersDialogOpen}
        onOpenChange={setIsFiltersDialogOpen}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSort}
      />
    </div>
  );
};

export default HotelList;
