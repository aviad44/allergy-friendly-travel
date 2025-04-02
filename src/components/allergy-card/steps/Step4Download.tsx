
import React, { useState, useRef } from 'react';
import { Download, Share2, Copy, Sun, Moon, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Map of common allergies to emojis
const allergyEmojiMap: Record<string, string> = {
  'Dairy': '🥛',
  'Eggs': '🥚',
  'Peanuts': '🥜',
  'Tree Nuts': '🌰',
  'Fish': '🐟',
  'Shellfish': '🦞',
  'Wheat': '🌾',
  'Soy': '🫘',
  'Sesame': '🌱',
  'Gluten': '🍞',
  'Mustard': '🟡',
  'Celery': '🥬',
  'Lupin': '🌿',
  'Molluscs': '🦪',
};

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
  const [cardMode, setCardMode] = useState<'adult' | 'child'>('child');
  const cardRef = useRef<HTMLDivElement>(null);
  
  if (!generatedCard) {
    return <div className="text-center py-8">No card content generated yet.</div>;
  }

  // Apply name replacement if userName is provided
  const displayedCard = generatedCard.replace("_________", userName || "_________");
  const displayedTranslation = translatedCard || "Translation not available";

  // Format allergies with emojis
  const formattedAllergies = selectedAllergies.map(allergy => {
    const emoji = allergyEmojiMap[allergy] || '⚠️';
    return `${emoji} ${allergy}`;
  });

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-4">
        <Tabs defaultValue="child" className="w-full max-w-md" onValueChange={(value) => setCardMode(value as 'adult' | 'child')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="child" className="text-base">Child Mode</TabsTrigger>
            <TabsTrigger value="adult" className="text-base">Adult Mode</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Light/Dark Toggle */}
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
        
      {/* Live Card Preview */}
      <div ref={cardRef} id="allergy-card" className={`
        ${isDarkMode ? 'bg-blue-900 text-white' : cardMode === 'child' ? 'bg-[#e0f7fa]' : 'bg-white'} 
        rounded-xl overflow-hidden 
        ${cardMode === 'child' ? 'border-4 border-[#26c6da]' : 'border border-blue-200'}
        transition-all duration-300
      `}>
        <CardContent className="p-6">
          {cardMode === 'child' && (
            <div className="mb-6 text-center">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-bold text-xl ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  {userName ? `Child Allergy Card for ${userName}` : "Child Allergy Card"}
                </h3>
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className={`text-red-600 font-bold py-2 px-3 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-100'} mb-4`}>
                ⚠️ This is a medical emergency. Please read carefully.
              </div>
            </div>
          )}

          {cardMode === 'adult' && (
            <div className="mb-4">
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Allergy Translation Card
                {userName && ` for ${userName}`}
              </h3>
            </div>
          )}
          
          {/* Allergies Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cardMode === 'child' ? (
              formattedAllergies.map((allergy, index) => (
                <span 
                  key={index}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                    isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {allergy}
                </span>
              ))
            ) : (
              selectedAllergies.map((allergy, index) => (
                <span 
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {allergy}
                </span>
              ))
            )}
          </div>
            
          {/* Original Text */}
          <div className={`
            whitespace-pre-wrap mb-4 p-3 rounded-lg
            ${cardMode === 'child' ? 'text-base font-medium' : ''}
            ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}
          `}>
            {displayedCard}
          </div>
            
          {/* Translation */}
          {translatedCard && (
            <div className={`pt-4 border-t ${isDarkMode ? 'border-blue-700' : 'border-blue-100'}`}>
              <div className={`
                whitespace-pre-wrap p-3 rounded-lg 
                ${isDarkMode ? 'bg-blue-950' : 'bg-white'}
                ${cardMode === 'child' ? 'text-base font-medium' : ''}
              `}>
                {displayedTranslation}
              </div>
            </div>
          )}
          
          {/* QR Code */}
          {cardMode === 'child' && (
            <div className="flex justify-end mt-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-white p-1 rounded-lg inline-flex items-center justify-center">
                  <div className="bg-black w-16 h-16 flex items-center justify-center text-white text-xs">
                    QR Code
                  </div>
                </div>
                <div className="text-xs mt-1">Scan to view online</div>
              </div>
            </div>
          )}
        </CardContent>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button 
          onClick={onDownloadPDF} 
          className="gap-2 bg-[#26c6da] hover:bg-[#00acc1] hover:scale-105 transform transition-all shadow hover:shadow-md"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button 
          onClick={onDownloadPNG} 
          className="gap-2 bg-[#26c6da] hover:bg-[#00acc1] hover:scale-105 transform transition-all shadow hover:shadow-md"
        >
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
        <Button 
          onClick={onShareToWhatsApp} 
          className="gap-2 bg-[#25d366] hover:bg-[#128c7e] hover:scale-105 transform transition-all shadow hover:shadow-md"
        >
          <Share2 className="h-4 w-4" />
          Send to WhatsApp
        </Button>
        <Button 
          onClick={onCopyToClipboard} 
          className="gap-2 bg-[#26c6da] hover:bg-[#00acc1] hover:scale-105 transform transition-all shadow hover:shadow-md"
        >
          <Copy className="h-4 w-4" />
          Copy Text
        </Button>
        
        <Button 
          onClick={() => window.print()} 
          className="col-span-1 sm:col-span-2 gap-2 bg-[#26c6da] hover:bg-[#00acc1] hover:scale-105 transform transition-all shadow hover:shadow-md"
        >
          <span className="mr-2">🖨️</span>
          Print Now
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
