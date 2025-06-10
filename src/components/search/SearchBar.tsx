
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, memo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Autocomplete } from "./Autocomplete";
import { MultiSelectAutocomplete } from "./MultiSelectAutocomplete";

// Memoized components to prevent unnecessary re-renders
const MemoizedAutocomplete = memo(Autocomplete);
const MemoizedMultiSelectAutocomplete = memo(MultiSelectAutocomplete);

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Memoize handlers to prevent unnecessary re-renders
  const handleDestinationChange = useCallback((value: string) => {
    setDestination(value);
  }, []);
  
  const handleAllergiesChange = useCallback((values: string[]) => {
    setAllergies(values);
  }, []);
  
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
    
    // Navigate to search results page with query parameters
    const allergiesParam = allergies.join(',');
    navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}`);
    
    setIsSearching(false);
  }, [destination, allergies, navigate, toast]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Destination input with autocomplete */}
        <MemoizedAutocomplete
          placeholder="Enter destination"
          value={destination}
          onChange={handleDestinationChange}
          suggestions={destinationSuggestions}
          className="bg-white/90 backdrop-blur-sm"
        />
        
        {/* Multi-select allergy input with autocomplete */}
        <MemoizedMultiSelectAutocomplete
          placeholder="Select allergies (choose multiple)"
          selectedValues={allergies}
          onSelectedValuesChange={handleAllergiesChange}
          suggestions={allergySuggestions}
          className="bg-white/90 backdrop-blur-sm"
        />
      </div>
      
      {/* Search button */}
      <Button 
        className="w-full p-4 bg-[#00b397] hover:bg-[#009f84] text-white text-[1.1em] transition-colors duration-300 flex items-center justify-center gap-2"
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="h-5 w-5" />
        <span>Search Now</span>
      </Button>
    </div>
  );
};
