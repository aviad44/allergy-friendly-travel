import { getAllergyIcon } from './allergyIcons';
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates the text content for an allergy card
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
 * Creates a simple, clean card element for download
 */
const createDownloadCard = (allergies: string[], translatedText: string | null): HTMLElement => {
  const cardDiv = document.createElement('div');
  cardDiv.style.cssText = `
    width: 600px;
    min-height: 400px;
    background-color: #ffffff;
    color: #000000;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    padding: 30px;
    border: 2px solid #cccccc;
    border-radius: 12px;
    box-sizing: border-box;
    position: absolute;
    left: -9999px;
    top: -9999px;
  `;

  // Title
  const title = document.createElement('h1');
  title.textContent = 'Allergy Translation Card';
  title.style.cssText = `
    color: #1e40af;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 0 0 30px 0;
    padding: 0;
  `;
  cardDiv.appendChild(title);

  // Allergies section
  const allergiesDiv = document.createElement('div');
  allergiesDiv.style.cssText = `
    background-color: #fef3c7;
    border: 2px solid #f59e0b;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
  `;

  const allergiesTitle = document.createElement('h2');
  allergiesTitle.textContent = '⚠️ FOOD ALLERGY NOTIFICATION ⚠️';
  allergiesTitle.style.cssText = `
    color: #92400e;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 15px 0;
    text-align: center;
  `;
  allergiesDiv.appendChild(allergiesTitle);

  const allergiesText = document.createElement('p');
  const formattedAllergies = allergies.map(allergy => {
    const icon = getAllergyIcon(allergy);
    return icon ? `${icon} ${allergy}` : `⚠️ ${allergy}`;
  }).join(', ');
  allergiesText.textContent = `I have severe allergies to: ${formattedAllergies}`;
  allergiesText.style.cssText = `
    color: #92400e;
    font-size: 16px;
    margin: 0 0 15px 0;
    font-weight: 500;
  `;
  allergiesDiv.appendChild(allergiesText);

  const warningText = document.createElement('p');
  warningText.textContent = 'Cross-contamination can cause a serious allergic reaction. Please ensure that my meal is prepared without these allergens and that all cooking utensils and surfaces are thoroughly cleaned before preparing my food.';
  warningText.style.cssText = `
    color: #92400e;
    font-size: 14px;
    margin: 0 0 10px 0;
  `;
  allergiesDiv.appendChild(warningText);

  const thankYouText = document.createElement('p');
  thankYouText.textContent = 'Thank you for your assistance in this important health matter.';
  thankYouText.style.cssText = `
    color: #92400e;
    font-size: 14px;
    margin: 0;
    font-style: italic;
  `;
  allergiesDiv.appendChild(thankYouText);

  cardDiv.appendChild(allergiesDiv);

  // Translation section
  if (translatedText && translatedText.trim()) {
    const translationDiv = document.createElement('div');
    translationDiv.style.cssText = `
      background-color: #eff6ff;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    `;

    const translationTitle = document.createElement('h3');
    translationTitle.textContent = 'Translation:';
    translationTitle.style.cssText = `
      color: #1e40af;
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 15px 0;
    `;
    translationDiv.appendChild(translationTitle);

    const translationTextEl = document.createElement('div');
    translationTextEl.innerHTML = translatedText.replace(/\n/g, '<br>');
    translationTextEl.style.cssText = `
      color: #1e40af;
      font-size: 16px;
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.6;
    `;
    translationDiv.appendChild(translationTextEl);

    cardDiv.appendChild(translationDiv);
  }

  return cardDiv;
};

/**
 * Downloads the allergy card as a PDF file
 */
export const downloadAsPDF = async (allergies: string[], translatedText: string | null) => {
  console.log('downloadAsPDF called with:', { allergies, translatedText });
  
  if (!allergies || allergies.length === 0) {
    toast.error("No allergies selected");
    return;
  }

  try {
    toast.loading("Generating PDF...");
    
    // Create a clean card for download
    const downloadCard = createDownloadCard(allergies, translatedText);
    document.body.appendChild(downloadCard);
    
    const canvas = await html2canvas(downloadCard, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff"
    });
    
    // Remove the temporary element
    document.body.removeChild(downloadCard);
    
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
export const downloadAsPNG = async (allergies: string[], translatedText: string | null) => {
  console.log('downloadAsPNG called with:', { allergies, translatedText });
  
  if (!allergies || allergies.length === 0) {
    toast.error("No allergies selected");
    return;
  }

  try {
    toast.loading("Generating PNG image...");
    
    // Create a clean card for download
    const downloadCard = createDownloadCard(allergies, translatedText);
    document.body.appendChild(downloadCard);
    
    const canvas = await html2canvas(downloadCard, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff"
    });
    
    // Remove the temporary element
    document.body.removeChild(downloadCard);
    
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