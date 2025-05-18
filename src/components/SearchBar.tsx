
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, memo, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Autocomplete } from "./search/Autocomplete";
import { useIsMobile } from "@/hooks/use-mobile";

// Memoized Autocomplete to prevent unnecessary re-renders
const MemoizedAutocomplete = memo(Autocomplete);

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearch, setLastSearch] = useState<{destination: string, allergies: string} | null>(null);
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
  
  const handleAllergiesChange = useCallback((value: string) => {
    setAllergies(value);
  }, []);
  
  // Clear the form
  const handleClearForm = useCallback(() => {
    setDestination("");
    setAllergies("");
  }, []);
  
  // Use last search
  const handleUseLastSearch = useCallback(() => {
    if (lastSearch) {
      setDestination(lastSearch.destination);
      setAllergies(lastSearch.allergies);
    }
  }, [lastSearch]);
  
  const handleSearch = useCallback(async () => {
    if (!destination || !allergies) {
      toast({
        title: "Please fill in all fields",
        description: "Both destination and allergy type are required to help find suitable hotels",
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
    navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergies)}`);
    
    setIsSearching(false);
  }, [destination, allergies, navigate, toast]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Destination input with autocomplete */}
        <MemoizedAutocomplete
          placeholder="Enter destination"
          value={destination}
          onChange={handleDestinationChange}
          suggestions={destinationSuggestions}
          className="bg-white/90 backdrop-blur-sm"
        />
        
        {/* Allergy input with autocomplete */}
        <MemoizedAutocomplete
          placeholder="Type of allergies"
          value={allergies}
          onChange={handleAllergiesChange}
          suggestions={allergySuggestions}
          className="bg-white/90 backdrop-blur-sm"
        />
      </div>
      
      {/* Recent search suggestion */}
      {lastSearch && !destination && !allergies && (
        <div className="text-xs text-blue-600 cursor-pointer hover:underline" onClick={handleUseLastSearch}>
          Use last search: {lastSearch.destination} with {lastSearch.allergies} allergies
        </div>
      )}
      
      {/* Search button */}
      <Button 
        className="w-full p-3 md:p-4 bg-[#00b397] hover:bg-[#009f84] text-white text-[1.1em] transition-colors duration-300 flex items-center justify-center gap-2"
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="h-5 w-5" />
        <span>{isSearching ? "Searching..." : "Search Now"}</span>
      </Button>
    </div>
  );
};
