
import React from 'react';
import { Download, Share2, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Step4Props {
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onCopyToClipboard: () => void;
  onShareToWhatsApp: () => void;
}

export const Step4Download: React.FC<Step4Props> = ({
  onDownloadPDF,
  onDownloadPNG,
  onCopyToClipboard,
  onShareToWhatsApp
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button onClick={onDownloadPDF} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={onDownloadPNG} className="gap-2">
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
        <Button onClick={onShareToWhatsApp} className="gap-2">
          <Share2 className="h-4 w-4" />
          Send to WhatsApp
        </Button>
        <Button onClick={onCopyToClipboard} className="gap-2">
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
