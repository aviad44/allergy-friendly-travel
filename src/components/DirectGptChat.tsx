
import { useState, useEffect } from "react";
import { Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export const DirectGptChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are an expert assistant specialized in recommending allergy-friendly hotels. Always provide accurate, clear, and concise information."
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert assistant specialized in recommending allergy-friendly hotels. Always provide accurate, clear, and concise information."
  );
  const { toast } = useToast();

  useEffect(() => {
    // Load system prompt from localStorage if available
    const savedSystemPrompt = localStorage.getItem("openai_system_prompt");
    if (savedSystemPrompt) {
      setSystemPrompt(savedSystemPrompt);
      // Update the system message in the messages array
      setMessages(prev => [
        { role: "system", content: savedSystemPrompt },
        ...prev.filter(msg => msg.role !== "system")
      ]);
    }
  }, []);

  const handleSaveSystemPrompt = () => {
    if (systemPrompt.trim()) {
      localStorage.setItem("openai_system_prompt", systemPrompt.trim());
      
      // Update the system message in the messages array
      setMessages(prev => [
        { role: "system", content: systemPrompt },
        ...prev.filter(msg => msg.role !== "system")
      ]);
      
      toast({
        title: "System Prompt Saved",
        description: "Your custom system prompt has been updated.",
      });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!userInput.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      console.log("Sending request to Supabase proxy function...");
      
      const { data, error } = await supabase.functions.invoke('openai-proxy', {
        body: {
          userInput: userInput,
          systemPrompt: systemPrompt,
          model: "gpt-4o",
          temperature: 0.5,
          max_tokens: 800
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to get response from the server");
      }

      console.log("API Response:", data);
      
      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.result 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error when calling Supabase proxy function:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while getting a response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border rounded-lg shadow-lg">
      <div className="p-4 border-b bg-muted/20">
        <h2 className="text-xl font-semibold">Direct OpenAI GPT Chat</h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about allergy-friendly hotels using our secure proxy
        </p>
      </div>
      
      {/* System Prompt Settings */}
      <div className="p-4 border-b bg-muted/10">
        <details className="mb-4">
          <summary className="cursor-pointer text-sm font-medium">
            Settings
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="systemPrompt" className="block text-sm font-medium mb-1">
                System Prompt
              </label>
              <div className="flex gap-2">
                <Textarea
                  id="systemPrompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="flex-1"
                  rows={3}
                />
                <Button onClick={handleSaveSystemPrompt} size="sm" className="self-start">
                  Update
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This prompt defines how the AI assistant will behave.
              </p>
            </div>
          </div>
        </details>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-h-[400px] space-y-4 bg-card">
        {messages.filter(msg => msg.role !== "system").map((message, index) => (
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
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about allergy-friendly hotels..."
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="self-end">
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </Card>
  );
};
