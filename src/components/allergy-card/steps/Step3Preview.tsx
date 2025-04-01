
import React from 'react';
import { QrCode } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface Step3Props {
  generatedCard: string | null;
  translatedCard: string | null;
  includeQrCode: boolean;
}

export const Step3Preview: React.FC<Step3Props> = ({ 
  generatedCard, 
  translatedCard,
  includeQrCode
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
        <h3 className="text-lg font-semibold mb-3">Target Language Translation</h3>
        <div className="whitespace-pre-line">
          {translatedCard}
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
