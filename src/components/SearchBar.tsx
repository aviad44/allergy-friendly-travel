
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
        title: "נא למלא את כל השדות",
        description: "אנא הזן יעד ופרטי אלרגיות כדי שנוכל לעזור לך למצוא את המלון המתאים",
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
              content: `אני מחפש מלון ב${destination} שמתאים לאנשים עם אלרגיה ל${allergies}. אנא המלץ לי על מלון מתאים והסבר למה הוא מתאים במיוחד לאלרגיות שציינתי.`
            }
          ]
        }
      });

      if (error) throw error;

      toast({
        title: "המלצת מלון",
        description: data.message,
        duration: 10000,
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה בחיפוש",
        description: "מצטערים, לא הצלחנו לבצע את החיפוש. אנא נסו שוב מאוחר יותר.",
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
          placeholder="הכנס יעד" 
          className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors text-right"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          dir="rtl"
        />
      </div>
      <div className="flex-1">
        <Input 
          placeholder="סוג האלרגיות" 
          className="h-12 text-lg border-2 border-primary/20 hover:border-primary/40 transition-colors text-right"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          dir="rtl"
        />
      </div>
      <Button 
        className="h-12 px-8 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
        onClick={handleSearch}
        disabled={isSearching}
      >
        <Search className="mr-2 h-5 w-5" />
        {isSearching ? "מחפש..." : "חפש עכשיו"}
      </Button>
    </div>
  );
};
