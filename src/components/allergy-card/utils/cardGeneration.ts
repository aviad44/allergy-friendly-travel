
import { getAllergyIcon } from './allergyIcons';

/**
 * Generates the text content for an allergy card
 * @param allergies List of allergies
 * @param isChild Whether to use child-friendly language
 * @param userName Optional name to include on the card
 * @returns Generated card text
 */
export const generateCardText = (
  allergies: string[], 
  isChild: boolean = false,
  userName: string | undefined = undefined
): string => {
  // Format allergies with emojis where available
  const formattedAllergies = allergies.map(allergy => {
    const icon = getAllergyIcon(allergy);
    return icon ? `${icon} ${allergy}` : allergy;
  }).join(", ");

  if (isChild) {
    const nameSection = userName ? `My name is ${userName}.\n\n` : '';
    
    return `⚠️ FOOD ALLERGY ALERT ⚠️\n\n${nameSection}I have serious food allergies. Please help keep me safe.\n\nI CANNOT EAT:\n${formattedAllergies}\n\nEven a tiny amount can make me very sick and might require emergency medicine. Please make sure my food is prepared without these ingredients.`;
  } else {
    return `⚠️ FOOD ALLERGY NOTIFICATION ⚠️\n\nI have severe allergies to the following foods:\n${formattedAllergies}\n\nCross-contamination can cause a serious allergic reaction. Please ensure that my meal is prepared without these allergens and that all cooking utensils and surfaces are thoroughly cleaned before preparing my food.\n\nThank you for your assistance in this important health matter.`;
  }
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
  
  const originalText = generateCardText(allergies, isChild, userName);
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
