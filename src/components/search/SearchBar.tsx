
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Autocomplete } from "./Autocomplete";
import { SearchResults } from "./SearchResults";
import { cleanResponseText } from "./utils";

export const SearchBar = () => {
  // Original state
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Refs for closing dropdowns when clicking outside
  const destinationInputRef = useRef<HTMLDivElement>(null);
  const allergyInputRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationInputRef.current && !destinationInputRef.current.contains(event.target as Node)) {
        // Dropdown will close itself due to the Autocomplete component
      }
      if (allergyInputRef.current && !allergyInputRef.current.contains(event.target as Node)) {
        // Dropdown will close itself due to the Autocomplete component
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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
    setRecommendation("");
    
    // Use Dialog for mobile and Sheet for desktop
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      setIsSheetOpen(true);
    }
    
    try {
      console.log('Sending search request to Supabase search-with-gpt function');
      const {
        data,
        error
      } = await supabase.functions.invoke('search-with-gpt', {
        body: {
          destination,
          allergies
        }
      });
      
      if (error) {
        console.error('Supabase Function Error:', error);
        throw error;
      }
      
      if (!data?.recommendation) {
        console.error('No recommendation data:', data);
        throw new Error('No recommendation received from the AI');
      }
      
      console.log('Received recommendation:', data.recommendation);
      
      // Clean the response before displaying it
      const cleanedRecommendation = cleanResponseText(data.recommendation);
      setRecommendation(cleanedRecommendation);
      
    } catch (error) {
      console.error('Error during search:', error);
      toast({
        title: "Search Error",
        description: "Sorry, we couldn't complete the search. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const closeAll = () => {
    setIsSheetOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col sm:flex-row gap-2 flex-grow">
        {/* Destination input with autocomplete */}
        <Autocomplete
          ref={destinationInputRef}
          placeholder="Enter destination"
          value={destination}
          onChange={setDestination}
          suggestions={destinationSuggestions}
        />
        
        {/* Allergy input with autocomplete */}
        <Autocomplete
          ref={allergyInputRef}
          placeholder="Type of allergies"
          value={allergies}
          onChange={setAllergies}
          suggestions={allergySuggestions}
        />
      </div>
      
      {/* Search button and modals */}
      <Button 
        className="h-9 sm:h-12 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md" 
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="mr-2 h-5 w-5" />
        <span>Search Now</span>
      </Button>
        
      {/* Sheet for desktop */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6" side="bottom">
          <SearchResults
            destination={destination}
            allergies={allergies}
            recommendation={recommendation}
            isSearching={isSearching}
            onClose={closeAll}
          />
        </SheetContent>
      </Sheet>
        
      {/* Dialog for mobile - better full-screen experience */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-2xl h-[90vh] max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6 rounded-t-xl">
          <SearchResults
            destination={destination}
            allergies={allergies}
            recommendation={recommendation}
            isSearching={isSearching}
            onClose={closeAll}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
