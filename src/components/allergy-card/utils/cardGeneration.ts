
import { toast } from "sonner";

export const generateCardText = (allergiesList: string[], isChild: boolean): string => {
  let cardText = "";
  
  if (isChild) {
    cardText = `Hello! My name is _________.\n\nI have severe allergies to: ${allergiesList}.\n\nThese foods could make me very sick or cause a medical emergency.\n\nPlease help make sure my food doesn't contain or touch these ingredients.\n\nThank you for keeping me safe!`;
  } else {
    cardText = `Hello,\n\nI have food allergies to: ${allergiesList}.\n\nPlease ensure my meal is completely free from these ingredients, including cross-contamination.\n\nIf you're unsure about the ingredients, please let me know so I can make an informed decision.\n\nThank you for your understanding and assistance.`;
  }

  return cardText;
};

export const generateFakeTranslation = (text: string, targetLanguage: string): string => {
  // In a real implementation, this would call a translation API
  return `[${targetLanguage.toUpperCase()} TRANSLATION]\n\n${text}\n\n(Translation would be implemented with a real API)`;
};

export const copyToClipboard = (sourceText: string | null, translatedText: string | null) => {
  if (sourceText && translatedText) {
    const fullText = `${sourceText}\n\n${translatedText}`;
    navigator.clipboard.writeText(fullText).then(() => {
      toast.success("Card copied to clipboard!");
    });
  }
};

export const downloadAsPDF = () => {
  toast.success("PDF download feature would be integrated here");
};

export const downloadAsPNG = () => {
  toast.success("PNG download feature would be integrated here");
};

export const shareToWhatsApp = (sourceText: string | null, translatedText: string | null) => {
  if (sourceText && translatedText) {
    const fullText = encodeURIComponent(`${sourceText}\n\n${translatedText}`);
    window.open(`https://wa.me/?text=${fullText}`, '_blank');
  }
};
