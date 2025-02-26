
import { Search, Star, ShieldCheck, ChefHat, AirVent, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";

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
    const lines = text.split('\n').filter(line => line.trim());
    const hotels = [];
    let currentHotel: any = {};

    for (const line of lines) {
      if (line.includes('Hotel') || line.includes('Hilton') || line.includes('Ritz')) {
        if (currentHotel.name) {
          hotels.push(currentHotel);
        }
        currentHotel = {
          name: line.replace(/\d+\.\s+/, '').trim(),
          features: []
        };
      } else if (line.startsWith('-')) {
        currentHotel.features = currentHotel.features || [];
        currentHotel.features.push(line.replace('-', '').trim());
      }
    }
    
    if (currentHotel.name) {
      hotels.push(currentHotel);
    }

    return hotels;
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
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-2xl" side="bottom">
            <div className="flex justify-between items-center">
              <SheetHeader>
                <SheetTitle className="text-2xl font-display">
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
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Results for {destination} - Hotels suitable for {allergies} allergies
                  </h3>
                  {formatRecommendations(recommendation).map((hotel, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-primary" />
                        <h4 className="text-xl font-semibold">{hotel.name}</h4>
                      </div>
                      <div className="space-y-2">
                        {hotel.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-1" />
                            <p className="text-muted-foreground">{feature}</p>
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
    </div>
  );
};
