
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

  const formatRecommendation = (text: string) => {
    // Extract hotel name and location from the first line
    const firstLine = text.split('\n')[0];
    const hotelInfo = firstLine.match(/\*\*(.*?)\*\*/) || [];
    const hotelName = hotelInfo[1] || "Recommended Hotel";

    // Split the recommendation into sections based on numbered points
    const sections = text.split(/\d\.\s\*\*/).filter(Boolean);

    return {
      hotelName,
      sections: sections.map(section => {
        const [title, ...content] = section.split('**:');
        return {
          title: title.trim(),
          content: content.join('**:').trim()
        };
      })
    };
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
            <div className="flex justify-between items-center">
              <SheetHeader>
                <SheetTitle className="text-2xl font-display">Personalized Hotel Recommendation</SheetTitle>
              </SheetHeader>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div className="mt-6">
              {recommendation ? (
                <Card className="p-6 space-y-6">
                  {(() => {
                    const { hotelName, sections } = formatRecommendation(recommendation);
                    const icons = {
                      'Kitchen Facilities & Food Preparation': <ChefHat className="h-5 w-5 text-primary" />,
                      'Room Cleaning Protocols': <ShieldCheck className="h-5 w-5 text-primary" />,
                      'Air Filtration Systems': <AirVent className="h-5 w-5 text-primary" />,
                      'Staff Training for Allergy Awareness': <GraduationCap className="h-5 w-5 text-primary" />
                    };

                    return (
                      <>
                        <div className="flex items-center gap-2 border-b pb-4">
                          <Star className="h-6 w-6 text-primary" />
                          <h3 className="text-xl font-semibold">{hotelName}</h3>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                          {sections.map((section, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center gap-2">
                                {icons[section.title as keyof typeof icons]}
                                <h4 className="font-medium">{section.title}</h4>
                              </div>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {section.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </Card>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  {isSearching ? (
                    "Finding the perfect hotel for your needs..."
                  ) : (
                    "Enter your destination and allergy details to get personalized recommendations"
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
