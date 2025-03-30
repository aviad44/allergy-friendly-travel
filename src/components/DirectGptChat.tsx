
import { useState, useEffect } from "react";
import { Send, Loader, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  isComplete?: boolean;
}

export const DirectGptChat = () => {
  const defaultSystemPrompt = "You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. Your responses must be highly detailed and structured, always including:\n\n1️⃣ **Hotel Name**\n2️⃣ **City & Country**\n3️⃣ **Star Rating (⭐ Rating based on guest reviews)**\n4️⃣ **Exact Address**\n5️⃣ **Why This Hotel is Suitable for Allergy Sufferers (list specific allergy-friendly features like nut-free kitchens, dedicated allergy-trained staff, buffet labeling, hypoallergenic bedding, etc.)**\n6️⃣ **Direct Booking Links to:**\n   - The Hotel's Official Website (🔗 Hotel Website)\n   - Booking.com (🔗 Book on Booking.com)\n7️⃣ **Authentic Guest Reviews with Star Ratings (🗣 Guest Review: \"Example review\" — ⭐⭐⭐⭐⭐)**\n8️⃣ **Nearby Allergy-Friendly Restaurants (list at least 2-3 restaurants that accommodate dietary restrictions)**\n9️⃣ **General Allergy Safety Tips for Travelers in this Destination**\n\nThe goal is to ensure that users receive detailed hotel recommendations for safe travel with allergies.";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: defaultSystemPrompt
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [tokenUsage, setTokenUsage] = useState<{prompt_tokens?: number, completion_tokens?: number, total_tokens?: number} | null>(null);
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

  // Function to clean response text from any prompt instructions
  const cleanResponseText = (text: string) => {
    if (!text) return "";
    
    // Remove any prompt instructions or metadata that may have leaked into the response
    return text
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response as[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/EXTREMELY IMPORTANT SAFETY REQUIREMENTS:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/For hotels, ONLY include[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/ALL guest reviews MUST be authentic[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/If you're not 100% certain[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Include WARNING notices[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Include EXACT street addresses[\s\S]*?(?=\n\n|$)/g, '')
      .trim();
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
    setTokenUsage(null);

    try {
      console.log("📡 Sending request to Supabase openai-proxy function...");
      console.log("Request parameters:", {
        userInput,
        systemPrompt: systemPrompt.substring(0, 50) + "...",
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 2000
      });
      
      const startTime = Date.now();
      
      const { data, error } = await supabase.functions.invoke('openai-proxy', {
        body: {
          userInput: userInput,
          systemPrompt: systemPrompt,
          model: "gpt-4o",
          temperature: 0.7,
          max_tokens: 2000
        }
      });

      const endTime = Date.now();
      const requestDuration = (endTime - startTime) / 1000;

      if (error) {
        console.error("❌ Supabase function error:", error);
        throw new Error(error.message || "Failed to get response from the server");
      }

      console.log(`✅ API Response received in ${requestDuration.toFixed(2)}s:`, data);
      console.log("Response length:", data.result.length);
      console.log("Token usage:", data.tokenUsage);
      
      // Clean the response before displaying it
      const cleanedResponse = cleanResponseText(data.result);
      
      // Check if response contains expected sections
      const hasGuestReviews = cleanedResponse.includes("Guest Review") || cleanedResponse.includes("🗣");
      const hasRestaurants = cleanedResponse.includes("Nearby Allergy-Friendly Restaurants");
      const hasSafetyTips = cleanedResponse.includes("General Allergy Safety Tips");
      
      console.log("Response completeness check:", {
        hasGuestReviews,
        hasRestaurants,
        hasSafetyTips,
        isComplete: data.isComplete
      });
      
      setTokenUsage(data.tokenUsage);
      
      const assistantMessage: Message = { 
        role: "assistant", 
        content: cleanedResponse,
        isComplete: data.isComplete
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (!data.isComplete) {
        toast({
          title: "Incomplete Response",
          description: "The response may be incomplete. Try asking a more specific question or adjust settings.",
          variant: "destructive", 
        });
      }
    } catch (error) {
      console.error("❌ Error when calling Supabase proxy function:", error);
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
        
        {tokenUsage && (
          <div className="text-xs text-muted-foreground mt-2">
            <p>Token usage: {tokenUsage.completion_tokens} (response) / {tokenUsage.total_tokens} (total)</p>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-h-[400px] space-y-4 bg-card">
        {messages.filter(msg => msg.role !== "system").map((message, index) => (
          <div key={index} className="space-y-2">
            <div
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
            {message.role === "assistant" && message.isComplete === false && (
              <div className="flex justify-center">
                <Alert variant="destructive" className="max-w-[80%] p-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    This response may be incomplete. Consider asking a more specific question.
                  </AlertDescription>
                </Alert>
              </div>
            )}
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
