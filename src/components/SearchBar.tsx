
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!destination || !allergies) {
      toast({
        title: "Please fill all fields",
        description: "Please enter both destination and allergy details so we can help you find the right hotel",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-gpt', {
        body: {
          messages: [
            {
              role: 'user',
              content: `I'm looking for a hotel in ${destination} that's suitable for people with ${allergies} allergies. Please recommend a hotel and explain why it's particularly suitable for the allergies I mentioned.`
            }
          ]
        }
      });

      if (error) throw error;

      toast({
        title: "Hotel Recommendation",
        description: data.message,
        duration: 10000,
      });

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
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto">
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
          placeholder="Type of allergies" 
          className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      </div>
      <Button 
        className="h-12 px-8 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
        onClick={handleSearch}
        disabled={isSearching}
      >
        <Search className="mr-2 h-5 w-5" />
        {isSearching ? "Searching..." : "Search Now"}
      </Button>
    </div>
  );
};
