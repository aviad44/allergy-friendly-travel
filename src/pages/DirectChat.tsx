
import { useState } from "react";
import { Helmet } from "react-helmet";
import { DirectGptChat } from "@/components/DirectGptChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader } from "lucide-react";

const DirectChat = () => {
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const testOpenAiProxy = async () => {
    setIsTestingApi(true);
    setTestResult(null);
    
    try {
      console.log("📡 Testing openai-proxy function...");
      
      const startTime = Date.now();
      const { data, error } = await supabase.functions.invoke('openai-proxy', {
        body: {
          userInput: "Find me an allergy-friendly hotel in London",
          systemPrompt: "Respond with a short test message. This is a connectivity test.",
          model: "gpt-4o-mini", // Using the smaller model for faster test
          temperature: 0.7,
          max_tokens: 100
        }
      });

      const endTime = Date.now();
      const requestDuration = (endTime - startTime) / 1000;

      if (error) {
        console.error("❌ Test failed:", error);
        throw new Error(error.message || "Failed to get response from the server");
      }

      console.log(`✅ Test successful (${requestDuration.toFixed(2)}s):`, data);
      
      setTestResult({
        success: true,
        message: `Connection successful in ${requestDuration.toFixed(2)}s. Token usage: ${data.tokenUsage?.total_tokens || 'unknown'}`
      });
    } catch (error) {
      console.error("Error testing API:", error);
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred during the API test"
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure OpenAI Chat | Allergy-Friendly Hotel Finder</title>
        <meta 
          name="description" 
          content="Chat securely with our AI assistant to find allergy-friendly hotels using our OpenAI GPT proxy." 
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Secure OpenAI GPT Integration</h1>
        <p className="text-muted-foreground mb-8">
          This page features a secure integration with the OpenAI API through our Supabase Edge Function proxy.
          Your requests are processed securely on our server, and no API keys are exposed to the client.
        </p>
        
        <Card className="p-4 mb-6 bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">API Connection Status</h3>
              <p className="text-sm text-muted-foreground">Test the connection to our OpenAI proxy service</p>
            </div>
            <Button 
              onClick={testOpenAiProxy} 
              disabled={isTestingApi}
              variant="outline"
            >
              {isTestingApi ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Test Connection
            </Button>
          </div>
          
          {testResult && (
            <div className={`mt-3 p-3 text-sm rounded-md ${testResult.success ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
              {testResult.message}
            </div>
          )}
        </Card>
        
        <DirectGptChat />
      </div>
    </>
  );
};

export default DirectChat;
