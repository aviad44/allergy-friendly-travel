
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
    const cardElement = document.getElementById('allergy-card');
    if (!cardElement) {
      toast.error("Card element not found. Please ensure the card is generated.");
      return;
    }
    
    downloadAsPDF();
  };

  const handleDownloadPNG = () => {
    const cardElement = document.getElementById('allergy-card');
    if (!cardElement) {
      toast.error("Card element not found. Please ensure the card is generated.");
      return;
    }
    
    downloadAsPNG();
  };

  const handleShareToWhatsApp = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard) {
      toast.error("No card content to share. Please generate the card first.");
      return;
    }
    
    shareToWhatsApp(generatedCard, translatedCard);
  };

  return {
    handleCopyToClipboard,
    handleDownloadPDF,
    handleDownloadPNG,
    handleShareToWhatsApp
  };
}
