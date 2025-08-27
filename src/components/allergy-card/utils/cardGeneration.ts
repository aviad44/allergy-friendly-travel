
import { getAllergyIcon } from './allergyIcons';
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates the text content for an allergy card
 * @param allergies List of allergies
 * @param isChild Whether to use child-friendly language
 * @param userName Optional name to include on the card
 * @returns Generated card text
 */
export const generateCardText = (
  allergies: string[]
): string => {
  // Format allergies with emojis where available
  const formattedAllergies = allergies.map(allergy => {
    const icon = getAllergyIcon(allergy);
    return icon ? `${icon} ${allergy}` : allergy;
  }).join(", ");

  return `⚠️ FOOD ALLERGY NOTIFICATION ⚠️

I have severe allergies to the following foods:
${formattedAllergies}

Cross-contamination can cause a serious allergic reaction. Please ensure that my meal is prepared without these allergens and that all cooking utensils and surfaces are thoroughly cleaned before preparing my food.

Thank you for your assistance in this important health matter.`;
};

/**
 * Generates custom HTML for rendering the allergy card
 */
export const generateCardHtml = (
  allergies: string[],
  translatedText: string | null,
  includeQrCode: boolean,
  userName?: string,
  isChild: boolean = false
): string => {
  const title = isChild 
    ? (userName ? `Child Allergy Card for ${userName}` : 'Child Allergy Card')
    : 'Food Allergy Alert Card';
  
  const originalText = generateCardText(allergies);
  const formattedOriginal = originalText.replace(/\n/g, '<br>');
  const formattedTranslated = translatedText ? translatedText.replace(/\n/g, '<br>') : '';

  return `
    <div class="allergy-card" style="position: relative; padding: 20px; border-radius: 12px; background-color: #f5f5f5; max-width: 100%;">
      <h2 style="color: #d32f2f; font-weight: bold; text-align: center; margin-bottom: 15px;">${title}</h2>
      
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <h3 style="color: #333; margin-top: 0;">English</h3>
        <div>${formattedOriginal}</div>
      </div>
      
      ${translatedText ? `
        <div style="background: #eff6ff; padding: 15px; border-radius: 8px;">
          <h3 style="color: #1d4ed8; margin-top: 0;">Translated</h3>
          <div>${formattedTranslated}</div>
        </div>
      ` : ''}
      
      ${includeQrCode ? `
        <div style="position: absolute; bottom: 10px; right: 10px; width: 70px; height: 70px; background: #fff; border-radius: 5px;">
          <div style="background-color: #ccc; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">QR Code</div>
        </div>
      ` : ''}
    </div>
  `;
};

/**
 * Copies the allergy card text to clipboard
 */
export const copyToClipboard = (generatedCard: string, translatedCard: string | null) => {
  const textToCopy = translatedCard 
    ? `${generatedCard}\n\n---\n\n${translatedCard}`
    : generatedCard;
  
  try {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Card text copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    toast.error("Failed to copy text. Please try again.");
  }
};

/**
 * Downloads the allergy card as a PDF file
 */
export const downloadAsPDF = async () => {
  const cardElement = document.getElementById('allergy-card');
  if (!cardElement) {
    toast.error("Card element not found");
    return;
  }

  try {
    toast.loading("Generating PDF...");
    const canvas = await html2canvas(cardElement, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      removeContainer: true,
      logging: false,
      width: cardElement.scrollWidth,
      height: cardElement.scrollHeight,
      foreignObjectRendering: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('allergy-card.pdf');
    
    toast.success("PDF downloaded successfully!");
  } catch (err) {
    console.error("Error generating PDF: ", err);
    toast.error("Failed to generate PDF. Please try again.");
  }
};

/**
 * Downloads the allergy card as a PNG image
 */
export const downloadAsPNG = async () => {
  const cardElement = document.getElementById('allergy-card');
  if (!cardElement) {
    toast.error("Card element not found");
    return;
  }

  try {
    toast.loading("Generating PNG image...");
    const canvas = await html2canvas(cardElement, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      removeContainer: true,
      logging: false,
      width: cardElement.scrollWidth,
      height: cardElement.scrollHeight,
      foreignObjectRendering: true
    });
    
    const link = document.createElement('a');
    link.download = 'allergy-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    toast.success("PNG image downloaded successfully!");
  } catch (err) {
    console.error("Error generating PNG: ", err);
    toast.error("Failed to generate PNG. Please try again.");
  }
};

/**
 * Shares the allergy card text to WhatsApp
 */
export const shareToWhatsApp = (generatedCard: string, translatedCard: string | null) => {
  const textToShare = translatedCard 
    ? `${generatedCard}\n\n---\n\n${translatedCard}`
    : generatedCard;
  
  try {
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  } catch (err) {
    console.error("Failed to share to WhatsApp: ", err);
    toast.error("Failed to share to WhatsApp. Please try again.");
  }
};

