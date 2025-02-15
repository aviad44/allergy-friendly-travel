
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!destination || !allergies) {
      toast({
        title: "Please fill in all fields",
        description: "Enter both destination and allergy details to help you find the right hotel",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setRecommendation("");

    try {
      const { data, error } = await supabase.functions.invoke('search-with-gpt', {
        body: { destination, allergies }
      });

      if (error) {
        console.error('Supabase Function Error:', error);
        throw error;
      }

      if (!data?.recommendation) {
        throw new Error('No recommendation received from the AI');
      }

      setRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Search Error",
        description: "Sorry, we couldn't complete the search. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Enter destination" 
            className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input 
            placeholder="Type of allergy" 
            className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="h-12 px-8 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={handleSearch}
              disabled={isSearching}
            >
              <Search className="mr-2 h-5 w-5" />
              {isSearching ? "Searching..." : "Search Now"}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-2xl" side="bottom">
            <SheetHeader>
              <SheetTitle>Personalized Hotel Recommendation</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              {recommendation ? (
                <div className="prose prose-lg max-w-none">
                  {recommendation}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {isSearching ? "Searching for personalized recommendations..." : "Click the search button to get recommendations"}
                </p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
