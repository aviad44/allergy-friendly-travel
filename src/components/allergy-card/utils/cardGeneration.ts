
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
  } else {
    toast.error("Nothing to copy. Please generate the card first.");
  }
};

export const downloadAsPDF = () => {
  const cardElement = document.getElementById('allergy-card');
  
  if (!cardElement) {
    toast.error("Card not found. Please generate the card first.");
    return;
  }
  
  toast.promise(
    html2canvas(cardElement, {
      scale: 2,
      backgroundColor: "#ffffff"
    })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('allergy-translation-card.pdf');
      return true;
    }),
    {
      loading: 'Creating PDF...',
      success: 'PDF downloaded successfully!',
      error: 'Failed to create PDF. Please try again.'
    }
  );
};

export const downloadAsPNG = () => {
  const cardElement = document.getElementById('allergy-card');
  
  if (!cardElement) {
    toast.error("Card not found. Please generate the card first.");
    return;
  }
  
  toast.promise(
    html2canvas(cardElement, {
      scale: 2,
      backgroundColor: "#ffffff"
    })
    .then((canvas) => {
      const link = document.createElement('a');
      link.download = 'allergy-translation-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      return true;
    }),
    {
      loading: 'Creating PNG...',
      success: 'PNG downloaded successfully!',
      error: 'Failed to create PNG. Please try again.'
    }
  );
};

export const shareToWhatsApp = (sourceText: string | null, translatedText: string | null) => {
  if (sourceText && translatedText) {
    const fullText = encodeURIComponent(`${sourceText}\n\n${translatedText}`);
    window.open(`https://wa.me/?text=${fullText}`, '_blank');
  } else {
    toast.error("Nothing to share. Please generate the card first.");
  }
};
