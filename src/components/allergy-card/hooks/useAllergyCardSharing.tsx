
import { toast } from "sonner";
import { copyToClipboard, downloadAsPDF, downloadAsPNG, shareToWhatsApp } from '../utils/cardGeneration';

export function useAllergyCardSharing() {
  const handleCopyToClipboard = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard) {
      toast.error("No card content to copy. Please generate the card first.");
      return;
    }
    
    copyToClipboard(generatedCard, translatedCard);
  };

  const handleDownloadPDF = () => {
    downloadAsPDF();
  };

  const handleDownloadPNG = () => {
    downloadAsPNG();
  };

  const handleShareToWhatsApp = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard) {
      toast.error("No card content to share. Please generate the card first.");
      return;
    }
    
    // Use navigator.share API if available for better sharing experience
    if (navigator.share) {
      try {
        navigator.share({
          title: 'My Allergy Translation Card',
          text: generatedCard + (translatedCard ? '\n\n' + translatedCard : ''),
          url: window.location.href
        }).then(() => {
          toast.success("Successfully shared!");
        }).catch((error) => {
          console.error('Sharing failed:', error);
          // Fall back to WhatsApp if sharing API fails
          shareToWhatsApp(generatedCard, translatedCard);
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fall back to WhatsApp if sharing API errors
        shareToWhatsApp(generatedCard, translatedCard);
      }
    } else {
      // Use direct WhatsApp sharing as fallback
      shareToWhatsApp(generatedCard, translatedCard);
    }
  };

  return {
    handleCopyToClipboard,
    handleDownloadPDF,
    handleDownloadPNG,
    handleShareToWhatsApp
  };
}
