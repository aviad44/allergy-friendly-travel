
import React, { useState, useRef } from 'react';
import { Download, Share2, Copy, Sun, Moon, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SharingOptions } from '../components/SharingOptions';

interface Step4Props {
  generatedCard: string | null;
  translatedCard: string | null;
  selectedAllergies: string[];
  isTranslating: boolean;
  onRequestTranslation: () => void;
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
  selectedAllergies,
  isTranslating,
  onRequestTranslation,
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

  const displayedCard = generatedCard;
  const displayedTranslation = translatedCard || "Translation not available";

  // Format allergies with emojis
  const formattedAllergies = selectedAllergies.map(allergy => {
    const emoji = allergyEmojiMap[allergy] || '⚠️';
    return `${emoji} ${allergy}`;
  });

  return (
    <div className="space-y-6">
      
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
        ${isDarkMode ? 'bg-blue-900 text-white' : 'bg-white'} 
        rounded-xl overflow-hidden border border-blue-200 transition-all duration-300
        relative
      `} style={{ backgroundColor: isDarkMode ? '#1e40af' : '#ffffff' }}>
        <CardContent className="p-6">
          <div className="mb-4 text-center">
            <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Allergy Translation Card
            </h3>
          </div>
          
          {/* Allergies Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {formattedAllergies.map((allergy, index) => (
              <span 
                key={index}
                className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                  isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}
              >
                {allergy}
              </span>
            ))}
          </div>
            
          {/* Original Text */}
          <div className={`
            whitespace-pre-wrap mb-4 p-3 rounded-lg
            ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}
          `}>
            {displayedCard}
          </div>
            
          {/* Translation */}
          {translatedCard && (
            <div className={`pt-4 border-t ${isDarkMode ? 'border-blue-700' : 'border-blue-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Translation:
              </h4>
              <div className={`
                whitespace-pre-wrap p-3 rounded-lg 
                ${isDarkMode ? 'bg-blue-950' : 'bg-white'}
              `}>
                {displayedTranslation}
              </div>
            </div>
          )}
          
          {isTranslating && (
            <div className="text-center py-4">
              <div className="text-blue-600">Translating...</div>
            </div>
          )}
          
          {!translatedCard && !isTranslating && (
            <div className="text-center py-4">
              <Button onClick={onRequestTranslation} variant="outline">
                Generate Translation
              </Button>
            </div>
          )}
        </CardContent>
      </div>

      {/* Enhanced Sharing Options */}
      <SharingOptions
        cardContent={displayedCard}
        translatedContent={translatedCard}
        onDownloadPDF={onDownloadPDF}
        onDownloadPNG={onDownloadPNG}
        onCopyToClipboard={onCopyToClipboard}
        onShareToWhatsApp={onShareToWhatsApp}
      />
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">Your card is ready!</h3>
        <p className="text-blue-700 mb-2">
          Remember to save multiple copies and keep them accessible during your travels.
        </p>
      </div>
    </div>
  );
};
