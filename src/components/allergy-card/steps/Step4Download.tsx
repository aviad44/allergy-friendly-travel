
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
      <div ref={cardRef} id="allergy-card" className="relative bg-white text-black border-2 border-gray-300 rounded-xl overflow-visible p-6 min-h-[500px] w-full max-w-none" style={{ 
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '16px',
        lineHeight: '1.6',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div className="p-0">
          <div className="mb-6 text-center">
            <h3 className="font-bold text-2xl mb-4 text-blue-800" style={{ color: '#1e40af', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Allergy Translation Card
            </h3>
          </div>
          
          {/* Allergies Section */}
          <div className="flex flex-wrap gap-3 mb-6">
            {formattedAllergies.map((allergy, index) => (
              <span 
                key={index}
                className="text-sm px-4 py-2 rounded-full font-medium bg-blue-100 text-blue-800 border border-blue-300"
                style={{ 
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid #93c5fd'
                }}
              >
                {allergy}
              </span>
            ))}
          </div>
            
          {/* Original Text */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6" style={{ 
            backgroundColor: '#fefce8',
            color: '#92400e',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #fbbf24',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{displayedCard}</div>
          </div>
            
          {/* Translation */}
          {translatedCard && (
            <div className="pt-4 border-t border-gray-300" style={{ borderTop: '1px solid #d1d5db', paddingTop: '16px' }}>
              <h4 className="font-bold mb-3 text-blue-800" style={{ color: '#1e40af', fontWeight: 'bold', marginBottom: '12px' }}>
                Translation:
              </h4>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg" style={{ 
                backgroundColor: '#eff6ff',
                color: '#1e40af',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #93c5fd',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{displayedTranslation}</div>
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
        </div>
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
