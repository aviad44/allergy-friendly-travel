
import React, { useState, useMemo } from 'react';
import { HotelCard } from './HotelCard';
import { HotelDetails } from './HotelDetails';
import { HotelInfo } from '@/types/search';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis,
  PaginationItem, 
  PaginationLink,
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Filter, Search, SlidersHorizontal, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

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
  
  const handleHotelSelect = (hotel: HotelInfo) => {
    setSelectedHotel(hotel);
  };
  
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
          <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-600">
            We couldn't find any allergy-friendly hotels matching your criteria. 
            Please try adjusting your search or contact us for personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page title and allergen tag */}
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
              {filteredAndSortedHotels.length} hotels found
            </span>
          </div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hotels by name or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-2 min-w-[280px]">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select
              value={sortField}
              onValueChange={(value) => {
                setSortField(value as 'name' | 'rating');
                setSortDirection(value === 'rating' ? 'desc' : 'asc');
              }}
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
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="ml-1"
              aria-label={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
            >
              {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsFiltersDialogOpen(true)} 
            className="md:hidden"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Hotel grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedHotels.map((hotel, index) => (
          <HotelCard 
            key={`${hotel.name}-${index}`} 
            hotel={hotel} 
            onViewDetails={() => handleHotelSelect(hotel)}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              // Show current page and a few around it
              if (
                pageNumber === 1 || 
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              // Show ellipsis when needed
              if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return (
                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Hotel Details Dialog */}
      <Dialog open={!!selectedHotel} onOpenChange={(open) => !open && setSelectedHotel(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedHotel?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedHotel && <HotelDetails hotel={selectedHotel} />}
        </DialogContent>
      </Dialog>
      
      {/* Mobile Filters Dialog */}
      <Dialog open={isFiltersDialogOpen} onOpenChange={setIsFiltersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sort Options</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <h3 className="font-medium">Sort by:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={sortField === 'name' ? 'default' : 'outline'}
                  className="w-full justify-between"
                  onClick={() => {
                    handleSort('name');
                    setIsFiltersDialogOpen(false);
                  }}
                >
                  <span>Name</span>
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button 
                  variant={sortField === 'rating' ? 'default' : 'outline'}
                  className="w-full justify-between"
                  onClick={() => {
                    handleSort('rating');
                    setIsFiltersDialogOpen(false);
                  }}
                >
                  <span>Rating</span>
                  {sortField === 'rating' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
