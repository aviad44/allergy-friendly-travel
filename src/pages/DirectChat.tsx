
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DirectGptChat } from "@/components/DirectGptChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader, Shield, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DirectChat = () => {
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isLocked, setIsLocked] = useState(false);
  
  // Simple access code for basic protection
  const EXPECTED_CODE = "allfriendly2024";
  
  useEffect(() => {
    // Check if user was previously authorized in this session
    const wasAuthorized = sessionStorage.getItem("chat_authorized") === "true";
    if (wasAuthorized) {
      setIsAuthorized(true);
    }
    
    // Check if access is temporarily locked
    const lockUntil = localStorage.getItem("chat_lock_until");
    if (lockUntil && new Date(lockUntil) > new Date()) {
      setIsLocked(true);
      
      // Set a timer to unlock
      const unlockTime = new Date(lockUntil).getTime() - new Date().getTime();
      setTimeout(() => {
        setIsLocked(false);
        localStorage.removeItem("chat_lock_until");
        setAttemptsLeft(3);
      }, unlockTime);
    }
  }, []);
  
  const checkAccessCode = () => {
    if (accessCode === EXPECTED_CODE) {
      setIsAuthorized(true);
      sessionStorage.setItem("chat_authorized", "true");
      toast.success("גישה אושרה", {
        description: "ברוכים הבאים למערכת הצ'אט המאובטחת"
      });
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      
      if (newAttemptsLeft <= 0) {
        // Lock access for 30 minutes
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString();
        localStorage.setItem("chat_lock_until", lockUntil);
        setIsLocked(true);
        toast.error("הגישה ננעלה", {
          description: "יותר מדי ניסיונות כושלים. נסה שוב בעוד 30 דקות."
        });
      } else {
        toast.error(`קוד גישה שגוי. נותרו ${newAttemptsLeft} ניסיונות.`);
      }
    }
    
    // Clear input field
    setAccessCode("");
  };

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

  if (!isAuthorized) {
    return (
      <>
        <Helmet>
          <title>Secure Access | Allergy-Friendly Hotel Finder</title>
          <meta 
            name="description" 
            content="Secure access page for Allergy-Friendly Hotel Finder chat system." 
          />
        </Helmet>
  
        <div className="container max-w-md mx-auto py-16 px-4">
          <Card className="p-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 mx-auto mb-2 text-teal-500" />
              <h1 className="text-2xl font-bold">גישה מאובטחת</h1>
              <p className="text-muted-foreground mt-2">
                אנא הזן את קוד הגישה כדי להמשיך למערכת הצ'אט
              </p>
            </div>
            
            {isLocked ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>
                    <strong>גישה ננעלה:</strong> יותר מדי ניסיונות כושלים.
                    נסה שוב מאוחר יותר.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="הקלד קוד גישה"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkAccessCode()}
                    className="text-center"
                    disabled={isLocked}
                  />
                  {attemptsLeft < 3 && (
                    <p className="text-amber-600 dark:text-amber-400 text-sm text-center">
                      נותרו {attemptsLeft} ניסיונות
                    </p>
                  )}
                </div>
                
                <Button 
                  onClick={checkAccessCode} 
                  className="w-full"
                  disabled={isLocked || !accessCode.trim()}
                >
                  כניסה למערכת
                </Button>
              </div>
            )}
          </Card>
        </div>
      </>
    );
  }

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
