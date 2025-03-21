import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, Star, ShieldCheck, ChevronDown } from "lucide-react";

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    toast
  } = useToast();
  
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
      const prompt = `Find the best allergy-friendly hotels in ${destination} that can accommodate guests with ${allergies} allergies. Provide detailed information about their accommodations for people with these specific allergies.`;
      
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
      // Keep the sheet open to show the error state
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
      if (line.match(/^\d+\./) || line.match(/^[A-Za-z\s]+:/) || line.match(/^Hotel/i)) {
        if (currentHotel.name) {
          hotels.push(currentHotel);
        }
        let hotelName = line.replace(/^\d+\.\s*/, '').split('|')[0].trim();
        if (hotelName.includes(':')) {
          hotelName = hotelName.split(':')[0].trim();
        }
        currentHotel = {
          name: hotelName,
          url: line.includes('|') ? line.split('|')[1].trim() : '',
          features: []
        };
      } else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        if (!currentHotel.features) {
          currentHotel.features = [];
        }
        currentHotel.features.push(line.trim().substring(1).trim());
      } else if (currentHotel.name) {
        if (!currentHotel.features) {
          currentHotel.features = [];
        }
        if (line.length > 10 && !line.startsWith('http')) {
          currentHotel.features.push(line.trim());
        }
      }
    }
    if (currentHotel.name) {
      hotels.push(currentHotel);
    }
    if (hotels.length === 0) {
      const paragraphs = text.split('\n\n').filter(p => p.trim());
      for (const paragraph of paragraphs) {
        if (paragraph.length > 30) {
          const lines = paragraph.split('\n');
          const name = lines[0].trim();
          hotels.push({
            name,
            features: lines.slice(1).map(l => l.trim()).filter(l => l)
          });
        }
      }
    }
    console.log('Formatted hotels:', hotels);
    return hotels.length > 0 ? hotels : [{
      name: "Results",
      features: [text]
    }];
  };
  
  return <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col sm:flex-row gap-2 flex-grow">
        <Input placeholder="Enter destination" className="h-9 sm:h-12 text-sm sm:text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" value={destination} onChange={e => setDestination(e.target.value)} />
        <Input placeholder="Type of allergies" className="h-9 sm:h-12 text-sm sm:text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm" value={allergies} onChange={e => setAllergies(e.target.value)} />
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="h-9 sm:h-12 px-4 md:px-6 text-white bg-teal-500 hover:bg-teal-600 rounded-md" onClick={handleSearch} disabled={isSearching}>
            <Search className="mr-2 h-5 w-5" />
            <span>Search Now</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" side="bottom">
          <div className="flex justify-between items-center">
            <SheetHeader>
              <SheetTitle className="text-xl sm:text-2xl font-display">
                Personalized Hotel Recommendations
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
            {recommendation ? <Card className="p-3 sm:p-6 mb-4 overflow-y-auto">
                <h3 className="text-base sm:text-lg font-medium mb-4">
                  Results for {destination} - Hotels suitable for {allergies} allergies
                </h3>
                <div className="space-y-6">
                  {formatRecommendations(recommendation).map((hotel, index) => <div key={index} className="mb-5 last:mb-0 pb-4 border-b last:border-b-0 border-gray-100">
                      <div className="flex items-start gap-2 mb-2 flex-wrap">
                        <Star className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0 mt-1" />
                        <h4 className="text-lg sm:text-xl font-semibold flex-grow">{hotel.name}</h4>
                        {hotel.url && <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4" />
                            <span className="hidden sm:inline">Book Now</span>
                            <span className="sm:hidden">Book</span>
                          </a>}
                      </div>
                      <div className="space-y-2 mt-3">
                        {hotel.features?.map((feature, idx) => <div key={idx} className="flex items-start gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-1" />
                            <p className="text-sm sm:text-base text-muted-foreground">{feature}</p>
                          </div>)}
                      </div>
                    </div>)}
                </div>
              </Card> : <div className="flex flex-col items-center justify-center py-8 text-muted-foreground h-48">
                {isSearching ? <>
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                    <p>Finding the perfect hotel for your needs...</p>
                  </> : <p>Enter destination and allergy details to get personalized recommendations</p>}
              </div>}
          </div>
          
          <div className="h-6 md:hidden"></div>
        </SheetContent>
        
      </Sheet>
    </div>;
};
