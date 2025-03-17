
import { useState, useEffect } from "react";
import { Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert assistant specialized in recommending allergy-friendly hotels. Always provide accurate, clear, and concise information."
  );
  const { toast } = useToast();

  useEffect(() => {
    // Load API key from localStorage if available
    const savedApiKey = localStorage.getItem("openai_direct_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_direct_api_key", apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely in your browser.",
      });
    }
  };

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

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key in the settings section.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      console.log("Sending request to OpenAI API...");
      
      // Create a properly structured messages array for the API
      const apiMessages = [
        ...messages.filter(msg => msg.role === "system"),
        ...messages.filter(msg => msg.role !== "system"),
        userMessage
      ];
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o", // Using the latest model
          messages: apiMessages,
          temperature: 0.2,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        throw new Error(errorData.error?.message || "Failed to get response from OpenAI");
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const assistantMessage: Message = data.choices[0].message;
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error when calling OpenAI API:", error);
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
          Ask questions about allergy-friendly hotels directly using OpenAI's API
        </p>
      </div>
      
      {/* API Key and System Prompt Settings */}
      <div className="p-4 border-b bg-muted/10">
        <details className="mb-4">
          <summary className="cursor-pointer text-sm font-medium">
            Settings
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                OpenAI API Key
              </label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey} size="sm">
                  Save Key
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your API key is stored only in your browser and never sent to our servers.
              </p>
            </div>
            
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
