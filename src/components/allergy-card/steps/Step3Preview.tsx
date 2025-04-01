
import React from 'react';
import { QrCode, RefreshCw } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Step3Props {
  generatedCard: string | null;
  translatedCard: string | null;
  includeQrCode: boolean;
  isTranslating: boolean;
  onRequestTranslation: () => void;
}

export const Step3Preview: React.FC<Step3Props> = ({ 
  generatedCard, 
  translatedCard,
  includeQrCode,
  isTranslating,
  onRequestTranslation
}) => {
  if (!generatedCard) return null;
  
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Source Language (English)</h3>
        <div className="whitespace-pre-line">
          {generatedCard}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Target Language Translation</h3>
          <Button 
            size="sm"
            variant="outline"
            onClick={onRequestTranslation}
            disabled={isTranslating}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-3 w-3 ${isTranslating ? 'animate-spin' : ''}`} />
            {isTranslating ? 'Translating...' : 'Refresh'}
          </Button>
        </div>
        
        <div className="whitespace-pre-line min-h-[120px]">
          {isTranslating ? (
            <div className="flex items-center justify-center h-24 text-muted-foreground">
              <div className="animate-pulse">Translating...</div>
            </div>
          ) : translatedCard ? (
            translatedCard
          ) : (
            <div className="text-muted-foreground">
              Translation not available. Click refresh to translate.
            </div>
          )}
        </div>
      </div>
      
      {includeQrCode && (
        <div className="flex justify-center mt-6">
          <div className="border p-4 inline-flex flex-col items-center">
            <QrCode size={120} />
            <p className="text-xs text-muted-foreground mt-2">QR Code for sharing</p>
          </div>
        </div>
      )}
    </div>
  );
};
