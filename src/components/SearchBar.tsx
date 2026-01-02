
import { Search, Hotel, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, memo, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Autocomplete } from "./search/Autocomplete";
import { MultiSelectAutocomplete } from "./search/MultiSelectAutocomplete";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Memoized components to prevent unnecessary re-renders
const MemoizedAutocomplete = memo(Autocomplete);
const MemoizedMultiSelectAutocomplete = memo(MultiSelectAutocomplete);

type SearchMode = "hotels" | "restaurants";

export const SearchBar = () => {
  const [mode, setMode] = useState<SearchMode>("hotels");
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearch, setLastSearch] = useState<{destination: string, allergies: string[], mode?: SearchMode} | null>(null);
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
      if (lastSearch.mode) {
        setMode(lastSearch.mode);
      }
    }
  }, [lastSearch]);
  
  const handleSearch = useCallback(async () => {
    if (!destination) {
      toast({
        title: "Please enter a destination",
        description: "A destination is required to search",
        variant: "destructive"
      });
      return;
    }

    if (mode === "hotels" && allergies.length === 0) {
      toast({
        title: "Please select allergies",
        description: "At least one allergy type is required to find suitable hotels",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Save recent search to localStorage
    const searchData = { destination, allergies, mode };
    localStorage.setItem('recentSearch', JSON.stringify(searchData));
    setLastSearch(searchData);

    if (mode === "restaurants") {
      // Navigate to search results with mode=restaurants
      const allergiesParam = allergies.join(',');
      navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}&mode=restaurants`);
      setIsSearching(false);
    } else {
      // Hotels mode - navigate to search results page
      const allergiesParam = allergies.join(',');
      navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}&mode=hotels`);
    }
  }, [destination, allergies, mode, navigate, toast]);


  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      {/* Search mode toggle */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-white/80">Search for</span>
        <ToggleGroup 
          type="single" 
          value={mode} 
          onValueChange={(value) => value && setMode(value as SearchMode)}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
        >
          <ToggleGroupItem 
            value="hotels" 
            aria-label="Search hotels"
            className="data-[state=on]:bg-white data-[state=on]:text-primary px-4 py-2 rounded-md transition-all"
          >
            <Hotel className="h-4 w-4 mr-2" />
            Hotels
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="restaurants" 
            aria-label="Search restaurants"
            className="data-[state=on]:bg-white data-[state=on]:text-primary px-4 py-2 rounded-md transition-all"
          >
            <UtensilsCrossed className="h-4 w-4 mr-2" />
            Restaurants
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-4 w-full">
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
            placeholder={mode === "hotels" ? "Select allergies (required)" : "Select allergies (optional)"}
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

      {/* Restaurant mode notice */}
      {mode === "restaurants" && (
        <p className="text-xs text-white/70 text-center px-2">
          Results are based on Google Maps data and are not a safety guarantee. Always verify with the restaurant.
        </p>
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
