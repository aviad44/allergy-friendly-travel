
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, Star, ShieldCheck } from "lucide-react";

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
        description: "Both destination and allergy type are required to help find suitable hotels",
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

      console.log('Received recommendation:', data.recommendation);
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

  const formatRecommendations = (text: string) => {
    console.log('Formatting text:', text);
    const lines = text.split('\n').filter(line => line.trim());
    const hotels = [];
    let currentHotel: any = {};

    for (const line of lines) {
      if (line.match(/^\d+\./)) {  // Look for lines starting with a number and period
        if (currentHotel.name) {
          hotels.push(currentHotel);
        }
        const [fullName, url] = line.split('|').map(part => part.trim());
        currentHotel = {
          name: fullName.replace(/^\d+\.\s+/, '').trim(),
          url: url,
          features: []
        };
      } else if (line.trim().startsWith('-')) {
        if (!currentHotel.features) {
          currentHotel.features = [];
        }
        currentHotel.features.push(line.trim().substring(1).trim());
      }
    }
    
    if (currentHotel.name) {
      hotels.push(currentHotel);
    }

    console.log('Formatted hotels:', hotels);
    return hotels;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-grow">
        <Input 
          placeholder="Enter destination" 
          className="h-12 text-base sm:text-lg border border-gray-300 rounded-md bg-white"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Input 
          placeholder="Type of allergies" 
          className="h-12 text-base sm:text-lg border border-gray-300 rounded-md bg-white"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="h-12 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md"
            onClick={handleSearch}
            disabled={isSearching}
          >
            <Search className="mr-2 h-5 w-5" />
            <span>Search Now</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-2xl" side="bottom">
          <div className="flex justify-between items-center">
            <SheetHeader>
              <SheetTitle className="text-xl sm:text-2xl font-display">
                Personalized Hotel Recommendations
              </SheetTitle>
            </SheetHeader>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <div className="mt-6">
            {recommendation ? (
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium mb-4">
                  Results for {destination} - Hotels suitable for {allergies} allergies
                </h3>
                {formatRecommendations(recommendation).map((hotel, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                      <h4 className="text-lg sm:text-xl font-semibold">{hotel.name}</h4>
                      {hotel.url && (
                        <a 
                          href={hotel.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline ml-2"
                        >
                          <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4" />
                          <span className="hidden sm:inline">Book Now</span>
                          <span className="sm:hidden">Book</span>
                        </a>
                      )}
                    </div>
                    <div className="space-y-2">
                      {hotel.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <p className="text-sm sm:text-base text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                {isSearching ? (
                  "Finding the perfect hotel for your needs..."
                ) : (
                  "Enter destination and allergy details to get personalized recommendations"
                )}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
