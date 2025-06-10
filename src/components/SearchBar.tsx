
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, memo, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Autocomplete } from "./search/Autocomplete";
import { MultiSelectAutocomplete } from "./search/MultiSelectAutocomplete";
import { useIsMobile } from "@/hooks/use-mobile";

// Memoized components to prevent unnecessary re-renders
const MemoizedAutocomplete = memo(Autocomplete);
const MemoizedMultiSelectAutocomplete = memo(MultiSelectAutocomplete);

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearch, setLastSearch] = useState<{destination: string, allergies: string[]} | null>(null);
  const isMobile = useIsMobile();
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const recentSearch = localStorage.getItem('recentSearch');
    if (recentSearch) {
      try {
        const parsed = JSON.parse(recentSearch);
        setLastSearch(parsed);
      } catch (e) {
        console.error('Error parsing recent search:', e);
      }
    }
  }, []);
  
  // Memoize handlers to prevent unnecessary re-renders
  const handleDestinationChange = useCallback((value: string) => {
    setDestination(value);
  }, []);
  
  const handleAllergiesChange = useCallback((values: string[]) => {
    setAllergies(values);
  }, []);
  
  // Clear the form
  const handleClearForm = useCallback(() => {
    setDestination("");
    setAllergies([]);
  }, []);
  
  // Use last search
  const handleUseLastSearch = useCallback(() => {
    if (lastSearch) {
      setDestination(lastSearch.destination);
      setAllergies(lastSearch.allergies || []);
    }
  }, [lastSearch]);
  
  const handleSearch = useCallback(async () => {
    if (!destination || allergies.length === 0) {
      toast({
        title: "Please fill in all fields",
        description: "Both destination and at least one allergy type are required to help find suitable hotels",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Save recent search to localStorage
    const searchData = { destination, allergies };
    localStorage.setItem('recentSearch', JSON.stringify(searchData));
    setLastSearch(searchData);
    
    // Show loading feedback immediately
    toast({
      title: "Searching...",
      description: "Finding allergy-friendly hotels in " + destination,
    });
    
    // Navigate to search results page with query parameters
    const allergiesParam = allergies.join(',');
    navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}`);
    
    setIsSearching(false);
  }, [destination, allergies, navigate, toast]);

  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-full">
      <div className="flex flex-col gap-2 sm:gap-3 w-full">
        {/* Destination input with autocomplete */}
        <div className="w-full">
          <MemoizedAutocomplete
            placeholder="Enter destination"
            value={destination}
            onChange={handleDestinationChange}
            suggestions={destinationSuggestions}
            className="bg-white/90 backdrop-blur-sm w-full text-sm sm:text-base"
          />
        </div>
        
        {/* Multi-select allergy input with autocomplete */}
        <div className="w-full">
          <MemoizedMultiSelectAutocomplete
            placeholder="Select allergies (choose multiple)"
            selectedValues={allergies}
            onSelectedValuesChange={handleAllergiesChange}
            suggestions={allergySuggestions}
            className="bg-white/90 backdrop-blur-sm w-full text-sm sm:text-base"
          />
        </div>
      </div>
      
      {/* Recent search suggestion */}
      {lastSearch && !destination && allergies.length === 0 && (
        <div className="text-xs text-blue-200 cursor-pointer hover:underline text-center px-2" onClick={handleUseLastSearch}>
          Use last search: {lastSearch.destination} with {Array.isArray(lastSearch.allergies) ? lastSearch.allergies.join(', ') : lastSearch.allergies} allergies
        </div>
      )}
      
      {/* Search button */}
      <Button 
        className="w-full p-3 sm:p-4 bg-[#00b397] hover:bg-[#009f84] text-white text-sm sm:text-base md:text-[1.1em] transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>{isSearching ? "Searching..." : "Search Now"}</span>
      </Button>
    </div>
  );
};
