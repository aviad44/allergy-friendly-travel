import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, ChevronDown, Home } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { destinationSuggestions, allergySuggestions } from "@/utils/searchSuggestions";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const SearchBar = () => {
  // Original state
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Autocomplete state
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showAllergySuggestions, setShowAllergySuggestions] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [filteredAllergies, setFilteredAllergies] = useState<string[]>([]);
  
  // Refs for closing dropdowns when clicking outside
  const destinationInputRef = useRef<HTMLDivElement>(null);
  const allergyInputRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Filter suggestions based on input
  useEffect(() => {
    if (destination) {
      const filtered = destinationSuggestions.filter(item => 
        item.toLowerCase().startsWith(destination.toLowerCase())
      );
      setFilteredDestinations(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setFilteredDestinations([]);
    }
  }, [destination]);
  
  useEffect(() => {
    if (allergies) {
      const filtered = allergySuggestions.filter(item => 
        item.toLowerCase().startsWith(allergies.toLowerCase())
      );
      setFilteredAllergies(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setFilteredAllergies([]);
    }
  }, [allergies]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationInputRef.current && !destinationInputRef.current.contains(event.target as Node)) {
        setShowDestinationSuggestions(false);
      }
      if (allergyInputRef.current && !allergyInputRef.current.contains(event.target as Node)) {
        setShowAllergySuggestions(false);
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
      console.log('Sending search request to Supabase gpt-proxy function');
      const prompt = `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies, including addresses, authentic guest reviews, and nearby restaurants.`;
      const {
        data,
        error
      } = await supabase.functions.invoke('gpt-proxy', {
        body: {
          prompt
        }
      });
      if (error) {
        console.error('Supabase Function Error:', error);
        throw error;
      }
      if (!data?.reply) {
        console.error('No recommendation data:', data);
        throw new Error('No recommendation received from the AI');
      }
      console.log('Received recommendation:', data.reply);
      setRecommendation(data.reply);
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
  
  const handleDestinationSelection = (value: string) => {
    setDestination(value);
    setShowDestinationSuggestions(false);
  };
  
  const handleAllergySelection = (value: string) => {
    setAllergies(value);
    setShowAllergySuggestions(false);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  const closeAll = () => {
    setIsSheetOpen(false);
    setIsDialogOpen(false);
  };

  const renderSearchResults = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-display">
              Allergy-Friendly Hotels
            </h3>
            <p className="text-sm text-muted-foreground">
              Search results for {destination} with {allergies} allergies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex gap-1 items-center">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeAll} 
              className="text-gray-500 hover:bg-gray-100 flex-shrink-0"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-3 text-amber-800 text-sm">
          <p className="flex items-start gap-2">
            <span className="font-semibold">Safety Notice:</span> Always verify allergy accommodations directly 
            with hotels before booking. Allergy severity varies, and hotel policies may change.
          </p>
        </div>
          
        <div className="mt-2 overflow-y-auto flex-grow pb-safe pr-1">
          {recommendation ? (
            <Card className="p-3 sm:p-6 mb-4 overflow-y-auto">
              <div className="prose prose-sm sm:prose max-w-none">
                <ReactMarkdown components={{
                  h1: ({node, ...props}) => <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mt-2 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 flex items-center gap-2" {...props} />,
                  p: ({node, ...props}) => <p className="my-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  a: ({node, href, ...props}) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-600 hover:underline inline-flex items-center gap-1" 
                      {...props}
                    >
                      {props.children} <ExternalLink className="h-3 w-3" />
                    </a>
                  )
                }}>
                  {recommendation}
                </ReactMarkdown>
              </div>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground h-48">
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                  <p>Finding the perfect hotel for your needs...</p>
                </>
              ) : (
                <p>Enter destination and allergy details to get personalized recommendations</p>
              )}
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 w-full bg-background pt-2 pb-4 border-t mt-auto">
          <Link to="/" className="w-full">
            <Button variant="default" className="w-full" onClick={closeAll}>
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Destination input with autocomplete */}
      <div ref={destinationInputRef} className="relative w-full">
        <Input 
          placeholder="Enter destination" 
          className="h-12 sm:h-12 text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" 
          value={destination} 
          onChange={e => setDestination(e.target.value)}
          onFocus={() => setShowDestinationSuggestions(true)}
          aria-autocomplete="list"
          aria-controls="destination-suggestions"
          aria-expanded={showDestinationSuggestions}
        />
        
        {/* Destination suggestions dropdown */}
        {showDestinationSuggestions && filteredDestinations.length > 0 && (
          <ul 
            id="destination-suggestions"
            className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-50"
            role="listbox"
          >
            {filteredDestinations.map((item, index) => (
              <li 
                key={index} 
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left"
                role="option"
                onClick={() => handleDestinationSelection(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Allergy input with autocomplete */}
      <div ref={allergyInputRef} className="relative w-full">
        <Input 
          placeholder="Type of allergies" 
          className="h-12 sm:h-12 text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" 
          value={allergies} 
          onChange={e => setAllergies(e.target.value)}
          onFocus={() => setShowAllergySuggestions(true)}
          aria-autocomplete="list"
          aria-controls="allergy-suggestions"
          aria-expanded={showAllergySuggestions}
        />
        
        {/* Allergy suggestions dropdown */}
        {showAllergySuggestions && filteredAllergies.length > 0 && (
          <ul 
            id="allergy-suggestions"
            className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-50"
            role="listbox"
          >
            {filteredAllergies.map((item, index) => (
              <li 
                key={index} 
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left"
                role="option"
                onClick={() => handleAllergySelection(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Search button */}
      <Button 
        className="h-12 sm:h-12 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md w-full" 
        onClick={handleSearch} 
        disabled={isSearching}
      >
        <Search className="mr-2 h-5 w-5" />
        <span>Search Now</span>
      </Button>
      
      {/* Sheet for desktop */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6" side="bottom">
          {renderSearchResults()}
        </SheetContent>
      </Sheet>
      
      {/* Dialog for mobile - better full-screen experience */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-2xl h-[90vh] max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6 rounded-t-xl">
          {renderSearchResults()}
        </DialogContent>
      </Dialog>
    </div>
  );
};
