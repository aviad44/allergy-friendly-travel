
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
  if (!generatedCard) {
    return <div className="text-center py-8">No card content generated yet.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Card Preview Container */}
      <div id="allergy-card" className="border rounded-lg p-6 bg-white shadow-sm">
        {/* Source Language Card */}
        <div className="mb-6 whitespace-pre-wrap">{generatedCard}</div>
        
        {/* Translation */}
        {translatedCard ? (
          <div className="mt-4 pt-4 border-t whitespace-pre-wrap">{translatedCard}</div>
        ) : (
          <div className="mt-4 pt-4 border-t">
            {isTranslating ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Translating...</span>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="mb-3 text-gray-600">Translation not generated yet</p>
                <Button 
                  onClick={onRequestTranslation} 
                  className="gap-2 bg-teal-600 hover:bg-teal-700"
                  disabled={isTranslating}
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate Translation
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* QR Code would be here if includeQrCode is true */}
        {includeQrCode && (
          <div className="mt-4 pt-4 border-t">
            <div className="bg-gray-100 h-32 w-32 flex items-center justify-center">
              QR Code
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Preview Your Card</h3>
        <p className="text-blue-700">
          This is how your allergy card will appear when downloaded or shared.
        </p>
      </div>

      {/* Translation troubleshooting tips */}
      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-700">Translation Troubleshooting</AlertTitle>
        <AlertDescription className="text-yellow-600 text-sm">
          If translation fails, check that you have:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>A valid OpenAI API key set in your environment</li>
            <li>Selected a language that is supported</li>
            <li>Try again in a few moments - API services may be temporarily busy</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};
