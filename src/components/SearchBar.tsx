
import { Search, Star, ShieldCheck, ChefHat, AirVent, GraduationCap, X, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [allergies, setAllergies] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!destination || !allergies) {
      toast({
        title: "נא למלא את כל השדות",
        description: "יש להזין גם יעד וגם סוג אלרגיה כדי שנוכל לעזור במציאת המלון המתאים",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setRecommendation("");

    // Simulated API response for testing
    setTimeout(() => {
      const sampleRecommendation = `
        המלצות מלונות עבור אלרגיה ל${allergies} ב${destination}:

        1. מלון מנדרין אוריינטל:
        - מטבח נפרד לאוכל ללא גלוטן
        - צוות מיומן בטיפול באלרגיות
        - תפריט מותאם אישית
        - ניקיון ברמה גבוהה

        2. ריץ קרלטון:
        - שף מומחה לתזונה מיוחדת
        - חדרים היפואלרגניים
        - מערכת סינון אוויר מתקדמת
        
        3. פור סיזנס:
        - פרוטוקול מיוחד לניקוי חדרים
        - תפריט עשיר לבעלי אלרגיות
        - צוות רפואי זמין 24/7
      `;
      
      setRecommendation(sampleRecommendation);
      setIsSearching(false);
    }, 1500);
  };

  const formatRecommendations = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const hotels = [];
    let currentHotel: any = {};

    for (const line of lines) {
      if (line.includes('מלון')) {
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
            placeholder="הכנס יעד" 
            className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors text-right"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            dir="rtl"
          />
        </div>
        <div className="flex-1">
          <Input 
            placeholder="סוג אלרגיה" 
            className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors text-right"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            dir="rtl"
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
              {isSearching ? "מחפש..." : "חפש"}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-4xl overflow-y-auto" side="bottom">
            <div className="flex justify-between items-center mb-6">
              <SheetHeader>
                <SheetTitle className="text-2xl font-display text-right">
                  המלצות מלונות מותאמות אישית
                </SheetTitle>
              </SheetHeader>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>

            <div className="mt-6" dir="rtl">
              {recommendation ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">
                      תוצאות עבור {destination} - מלונות מתאימים לאלרגיה ל{allergies}
                    </h3>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {formatRecommendations(recommendation).map((hotel, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="p-6 space-y-4">
                          <div className="flex items-start gap-2">
                            <Star className="h-5 w-5 text-primary shrink-0 mt-1" />
                            <h3 className="text-xl font-semibold">{hotel.name}</h3>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            {hotel.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-1" />
                                <p className="text-muted-foreground">{feature}</p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-4">
                            <Button variant="outline" className="w-full">
                              <Clock className="mr-2 h-4 w-4" />
                              הזמן עכשיו
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  {isSearching ? (
                    "מחפש את המלונות המתאימים ביותר עבורך..."
                  ) : (
                    "הזן יעד וסוג אלרגיה כדי לקבל המלצות מותאמות אישית"
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
