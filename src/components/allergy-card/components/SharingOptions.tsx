import React from 'react';
import { Share2, MessageCircle, Send, Copy, Download, Printer, QrCode } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface SharingOptionsProps {
  cardContent: string;
  translatedContent?: string | null;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onCopyToClipboard: () => void;
  onShareToWhatsApp: () => void;
}

export const SharingOptions: React.FC<SharingOptionsProps> = ({
  cardContent,
  translatedContent,
  onDownloadPDF,
  onDownloadPNG,
  onCopyToClipboard,
  onShareToWhatsApp,
}) => {
  const shareToTelegram = () => {
    const text = `${cardContent}${translatedContent ? '\n\n' + translatedContent : ''}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
    toast.success('Shared to Telegram!');
  };

  const shareToEmail = () => {
    const subject = 'My Allergy Card - Travel Safety Information';
    const body = `Please find my allergy information below:\n\n${cardContent}${translatedContent ? '\n\n' + translatedContent : ''}\n\nThis card was created using ${window.location.origin}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
    toast.success('Email draft created!');
  };

  const printCard = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Allergy Card</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .card { border: 2px solid #333; padding: 20px; max-width: 400px; margin: 0 auto; }
              .content { margin: 10px 0; }
              .translated { border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px; }
              @media print { 
                body { margin: 0; }
                .card { border: 1px solid #000; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="content">${cardContent.replace(/\n/g, '<br>')}</div>
              ${translatedContent ? `<div class="translated">${translatedContent.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      toast.success('Print dialog opened!');
    }
  };

  const generateQRCode = async () => {
    try {
      const qrData = `${cardContent}${translatedContent ? '\n\n' + translatedContent : ''}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
      
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'allergy-card-qr.png';
      link.click();
      
      toast.success('QR Code downloaded!');
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Allergy Card
        </CardTitle>
        <CardDescription>
          Choose how you'd like to save or share your allergy information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Download Options */}
          <Button
            onClick={onDownloadPDF}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Download className="h-5 w-5" />
            <span className="text-xs">PDF</span>
          </Button>
          
          <Button
            onClick={onDownloadPNG}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Download className="h-5 w-5" />
            <span className="text-xs">Image</span>
          </Button>
          
          <Button
            onClick={printCard}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Printer className="h-5 w-5" />
            <span className="text-xs">Print</span>
          </Button>
          
          <Button
            onClick={generateQRCode}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <QrCode className="h-5 w-5" />
            <span className="text-xs">QR Code</span>
          </Button>
          
          {/* Copy & Share Options */}
          <Button
            onClick={onCopyToClipboard}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Copy className="h-5 w-5" />
            <span className="text-xs">Copy Text</span>
          </Button>
          
          <Button
            onClick={onShareToWhatsApp}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          
          <Button
            onClick={shareToTelegram}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Send className="h-5 w-5" />
            <span className="text-xs">Telegram</span>
          </Button>
          
          <Button
            onClick={shareToEmail}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Email</span>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro Tip:</strong> Save this card to your phone's gallery and add it to your favorites for quick access while traveling!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};