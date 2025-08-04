import { useState, useEffect } from "react";
import { Settings, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const OpenAISettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      toast.success("OpenAI API key saved successfully", {
        id: "api-key-saved"
      });
      setIsOpen(false);
    } else {
      localStorage.removeItem('openai_api_key');
      toast.success("OpenAI API key removed", {
        id: "api-key-removed"
      });
      setIsOpen(false);
    }
  };

  const hasApiKey = apiKey.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          {hasApiKey ? "API Key Set" : "Set OpenAI API"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              OpenAI API Settings
            </CardTitle>
            <CardDescription>
              Set your OpenAI API key for automatic translation. 
              This will be stored locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></p>
              <p>• Your key is stored locally and never sent to our servers</p>
              <p>• Used only for automatic translation of allergy cards</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                Save API Key
              </Button>
              {hasApiKey && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setApiKey("");
                    localStorage.removeItem('openai_api_key');
                    toast.success("API key removed");
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};