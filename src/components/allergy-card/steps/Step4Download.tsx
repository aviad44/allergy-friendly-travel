
import React, { useState } from 'react';
import { Download, Share2, Copy, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Step4Props {
  generatedCard: string | null;
  translatedCard: string | null;
  userName?: string;
  selectedAllergies: string[];
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onCopyToClipboard: () => void;
  onShareToWhatsApp: () => void;
}

export const Step4Download: React.FC<Step4Props> = ({
  generatedCard,
  translatedCard,
  userName = "",
  selectedAllergies,
  onDownloadPDF,
  onDownloadPNG,
  onCopyToClipboard,
  onShareToWhatsApp
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  if (!generatedCard) {
    return <div className="text-center py-8">No card content generated yet.</div>;
  }

  // Apply name replacement if userName is provided
  const displayedCard = generatedCard.replace("_________", userName || "_________");
  const displayedTranslation = translatedCard || "Translation not available";

  return (
    <div className="space-y-6">
      {/* Live Card Preview */}
      <div className="mb-4">
        <div className="flex justify-end mb-2">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={setIsDarkMode} 
              id="card-theme" 
            />
            <Label htmlFor="card-theme"><Moon className="h-4 w-4" /></Label>
          </div>
        </div>
        
        <Card id="allergy-card" className={`${isDarkMode ? 'bg-blue-900 text-white border-blue-700' : 'bg-white border-blue-200'} overflow-hidden`}>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Allergy Translation Card
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedAllergies.map((allergy, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={`whitespace-pre-wrap mb-4 p-3 rounded-md ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}`}>
              {displayedCard}
            </div>
            
            {translatedCard && (
              <div className={`whitespace-pre-wrap pt-4 border-t ${isDarkMode ? 'border-blue-700' : 'border-blue-100'}`}>
                <div className={`p-3 rounded-md ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}`}>
                  {displayedTranslation}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button onClick={onDownloadPDF} className="gap-2 bg-teal-600 hover:bg-teal-700">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={onDownloadPNG} className="gap-2 bg-teal-600 hover:bg-teal-700">
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
        <Button onClick={onShareToWhatsApp} className="gap-2 bg-teal-600 hover:bg-teal-700">
          <Share2 className="h-4 w-4" />
          Send to WhatsApp
        </Button>
        <Button onClick={onCopyToClipboard} className="gap-2 bg-teal-600 hover:bg-teal-700">
          <Copy className="h-4 w-4" />
          Copy Text
        </Button>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">Your card is ready!</h3>
        <p className="text-blue-700 mb-2">
          Remember to save multiple copies and keep them accessible during your travels.
        </p>
      </div>
    </div>
  );
};
