
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AllergyChatBox = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast({
        title: "שאלה נדרשת",
        description: "אנא הזן שאלה לפני השליחה",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-gpt', {
        body: {
          messages: [
            {
              role: 'user',
              content: question
            }
          ]
        }
      });

      if (error) throw error;
      
      setAnswer(data.message);
      setQuestion("");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שליחת השאלה. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="שאל שאלה על מלונות ידידותיים לאלרגיות..."
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="text-right"
            dir="rtl"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {answer && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-right" dir="rtl">
            <p className="whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
