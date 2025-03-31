
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
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col sm:flex-row gap-2 flex-grow">
        {/* Destination input with autocomplete */}
        <Autocomplete
          placeholder="Enter destination"
          value={destination}
          onChange={setDestination}
          suggestions={destinationSuggestions}
        />
        
        {/* Allergy input with autocomplete */}
        <Autocomplete
          placeholder="Type of allergies"
          value={allergies}
          onChange={setAllergies}
          suggestions={allergySuggestions}
        />
      </div>
      
      {/* Search button */}
      <Button 
        className="h-9 sm:h-9 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md" 
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="mr-2 h-5 w-5" />
        <span>Search Now</span>
      </Button>
    </div>
  );
};
