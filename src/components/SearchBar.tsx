
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
        title: "אנא מלא את כל השדות",
        description: "יש להזין את היעד ואת פרטי האלרגיה כדי שנוכל לעזור לך למצוא את המלון המתאים",
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

      if (error) throw error;

      setRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה בחיפוש",
        description: "מצטערים, לא הצלחנו להשלים את החיפוש. אנא נסה שוב מאוחר יותר.",
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
            placeholder="הכנס יעד" 
            className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors text-right"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            dir="rtl"
          />
        </div>
        <div className="flex-1">
          <Input 
            placeholder="סוג האלרגיה" 
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
              {isSearching ? "מחפש..." : "חפש עכשיו"}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-2xl" side="bottom">
            <SheetHeader>
              <SheetTitle className="text-right">המלצת מלון מותאמת אישית</SheetTitle>
            </SheetHeader>
            <div className="mt-4 text-right" dir="rtl">
              {recommendation ? (
                <div className="prose prose-lg max-w-none">
                  {recommendation}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {isSearching ? "מחפש המלצות מותאמות אישית..." : "לחץ על כפתור החיפוש לקבלת המלצות"}
                </p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
