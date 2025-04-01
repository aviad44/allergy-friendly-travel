
import { toast } from "sonner";
import { copyToClipboard, downloadAsPDF, downloadAsPNG, shareToWhatsApp } from '../utils/cardGeneration';

export function useAllergyCardSharing() {
  const handleCopyToClipboard = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard || !translatedCard) {
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
    if (!generatedCard || !translatedCard) {
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
