
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
import { ArrowDown, ArrowUp, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';

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
  const [sortField, setSortField] = useState<'name' | 'rating'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  
  // Sort hotels based on current sort field and direction
  const sortedHotels = useMemo(() => {
    if (!hotels.length) return [];
    
    return [...hotels].sort((a, b) => {
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
  }, [hotels, sortField, sortDirection]);

  // Calculate pagination values
  const totalPages = Math.ceil(sortedHotels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHotels = sortedHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      setSortDirection('asc');
    }
  };
  
  const handleHotelSelect = (hotel: HotelInfo) => {
    setSelectedHotel(hotel);
  };
  
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No results found. Please try another search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sorting and filters */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Allergy-Friendly Hotels in {destination}</h2>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Button 
              variant="outline" 
              size="sm"
              className="text-sm h-8"
              onClick={() => handleSort('name')}
            >
              Name
              {sortField === 'name' && (
                sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 ml-1" /> : <ArrowDown className="h-3.5 w-3.5 ml-1" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-sm h-8"
              onClick={() => handleSort('rating')}
            >
              Rating
              {sortField === 'rating' && (
                sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 ml-1" /> : <ArrowDown className="h-3.5 w-3.5 ml-1" />
              )}
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="md:hidden text-sm h-8"
            onClick={() => setIsFiltersDialogOpen(true)}
          >
            <Filter className="h-3.5 w-3.5 mr-1" />
            Sort & Filter
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
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show first page, last page, current page, and pages around current
              let pageToShow: number | null = null;
              
              if (i === 0) pageToShow = 1;
              else if (i === 4) pageToShow = totalPages;
              else if (totalPages <= 5) pageToShow = i + 1;
              else {
                // Complex logic for pagination with ellipsis
                if (currentPage <= 3) pageToShow = i + 1;
                else if (currentPage >= totalPages - 2) pageToShow = totalPages - 4 + i;
                else pageToShow = currentPage - 1 + i;
              }
              
              if (pageToShow === null) return null;
              
              // Show ellipsis for gaps
              if ((pageToShow > 2 && currentPage > 3 && i === 1) || 
                 (pageToShow < totalPages - 1 && currentPage < totalPages - 2 && i === 3)) {
                return (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return (
                <PaginationItem key={pageToShow}>
                  <PaginationLink
                    isActive={pageToShow === currentPage}
                    onClick={() => handlePageChange(pageToShow)}
                  >
                    {pageToShow}
                  </PaginationLink>
                </PaginationItem>
              );
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
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedHotel?.name}</DialogTitle>
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
          <div className="space-y-3 pt-2">
            <div className="font-medium">Sort by:</div>
            <div className="flex flex-col gap-2">
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
