
import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ParisChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending message to chat-with-gpt function:', userMessage);
      
      const { data, error } = await supabase.functions.invoke('chat-with-gpt', {
        body: { messages: [...messages, userMessage] }
      });

      console.log('Response from chat-with-gpt:', { data, error });

      if (error) {
        throw error;
      }

      if (!data?.message) {
        throw new Error('No response received from assistant');
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "שגיאה",
        description: error instanceof Error ? error.message : "שגיאה בקבלת תשובה מהאסיסטנט",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 p-4 border-b">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">אסיסטנט פריז</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
              dir="rtl"
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאל שאלה על מלונות בפריז..."
            className="min-h-[80px] text-right"
            dir="rtl"
          />
        </div>
      </form>
    </div>
  );
};
