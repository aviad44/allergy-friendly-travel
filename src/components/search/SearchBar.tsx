
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Autocomplete } from "./Autocomplete";

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSearch = async () => {
    if (!destination || !allergies) {
      toast({
        title: "Please fill in all fields",
        description: "Both destination and allergy type are required to help find suitable hotels",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Navigate to search results page with query parameters
    navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergies)}`);
    
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Destination input with autocomplete */}
        <Autocomplete
          placeholder="Enter destination"
          value={destination}
          onChange={setDestination}
          suggestions={destinationSuggestions}
          className="bg-white/90 backdrop-blur-sm"
        />
        
        {/* Allergy input with autocomplete */}
        <Autocomplete
          placeholder="Type of allergies"
          value={allergies}
          onChange={setAllergies}
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
