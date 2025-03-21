import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, Star, MapPin, ShieldCheck, ChevronDown, Utensils } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  
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
    setIsSheetOpen(true);
    try {
      console.log('Sending search request to Supabase gpt-proxy function');
      const prompt = `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies, including addresses, authentic guest reviews, and nearby restaurants.`;
      
      const { data, error } = await supabase.functions.invoke('gpt-proxy', {
        body: { prompt }
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
      // Keep the sheet open to show the error state
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col sm:flex-row gap-2 flex-grow">
        <Input 
          placeholder="Enter destination" 
          className="h-9 sm:h-12 text-sm sm:text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" 
          value={destination} 
          onChange={e => setDestination(e.target.value)} 
        />
        <Input 
          placeholder="Type of allergies" 
          className="h-9 sm:h-12 text-sm sm:text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" 
          value={allergies} 
          onChange={e => setAllergies(e.target.value)} 
        />
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button 
            className="h-9 sm:h-12 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md" 
            onClick={handleSearch} 
            disabled={isSearching}
          >
            <Search className="mr-2 h-5 w-5" />
            <span>Search Now</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" side="bottom">
          <div className="flex justify-between items-center">
            <SheetHeader>
              <SheetTitle className="text-xl sm:text-2xl font-display">
                Allergy-Friendly Hotels
              </SheetTitle>
            </SheetHeader>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          
          <div className="md:hidden flex justify-center my-2">
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
            <span className="text-xs text-muted-foreground ml-1">Scroll for more</span>
          </div>
          
          <div className="mt-2 overflow-y-auto flex-grow pb-safe pr-1">
            {recommendation ? (
              <Card className="p-3 sm:p-6 mb-4 overflow-y-auto">
                <h3 className="text-base sm:text-lg font-medium mb-4">
                  Search results for {destination} with {allergies} allergies
                </h3>
                <div className="prose prose-sm sm:prose max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mt-2 mb-4" {...props} />,
                      h2: ({node, ...props}) => <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 flex items-center gap-2" {...props} />,
                      p: ({node, ...props}) => <p className="my-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      a: ({node, href, ...props}) => 
                        <a href={href} target="_blank" rel="noopener noreferrer" 
                          className="text-teal-600 hover:underline inline-flex items-center gap-1" {...props}>
                          {props.children} <ExternalLink className="h-3 w-3" />
                        </a>
                    }}
                  >
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
          
          <div className="h-6 md:hidden"></div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
