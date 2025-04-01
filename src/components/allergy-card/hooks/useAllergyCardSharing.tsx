
import { toast } from "sonner";
import { copyToClipboard, downloadAsPDF, downloadAsPNG, shareToWhatsApp } from '../utils/cardGeneration';

export function useAllergyCardSharing() {
  const handleCopyToClipboard = (generatedCard: string | null, translatedCard: string | null) => {
    copyToClipboard(generatedCard, translatedCard);
  };

  const handleDownloadPDF = () => {
    downloadAsPDF();
  };

  const handleDownloadPNG = () => {
    downloadAsPNG();
  };

  const handleShareToWhatsApp = (generatedCard: string | null, translatedCard: string | null) => {
    shareToWhatsApp(generatedCard, translatedCard);
  };

  return {
    handleCopyToClipboard,
    handleDownloadPDF,
    handleDownloadPNG,
    handleShareToWhatsApp
  };
}
