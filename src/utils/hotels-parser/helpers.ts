
import { ParsedHotel } from './types';

export const cleanMarkdownEntry = (entry: string): string => {
  return entry
    .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/IMPORTANT RULES:[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Format exactly as shown[\s\S]*?(?=\n\n|$)/g, '')
    .trim();
};

export const splitHotelEntries = (markdownText: string): string[] => {
  if (!markdownText) return [];
  
  const patterns = [
    /---/g,
    /\n(?=1️⃣\s*\*\*Hotel Name\*\*)/g,
    /\n(?=\d\.\s+\*\*[^*]+\*\*)/g,
    /\n(?=##\s+\d\.\s+[^#]+)/g,
    /\n(?=##\s+[^#]+)/g,
  ];
  
  for (const pattern of patterns) {
    const entries = markdownText.split(pattern);
    if (entries.length > 1) {
      console.log(`Found ${entries.length} hotel entries using pattern:`, pattern);
      return entries;
    }
  }
  
  // Fallback approach
  const fallbackPattern = /\n(?=\d+\.\s|\#\#\s|\*\*Hotel Name\*\*|\*\*[^*]+Hotel[^*]*\*\*)/g;
  const entries = markdownText.split(fallbackPattern);
  
  return entries.length > 1 ? entries : [markdownText];
};

export const generateHotelDescription = (
  allergyFeatures: string[],
  entry: string
): string => {
  if (allergyFeatures.length > 0) {
    return `This hotel is suitable for allergy sufferers because it offers: ${allergyFeatures.join(', ')}`;
  }
  
  // Look for descriptive text
  const descLines = entry.split('\n')
    .filter(line => 
      !line.includes('**Hotel Name**') && 
      !line.includes('**City & Country**') && 
      !line.includes('**Star Rating**') && 
      !line.includes('**Exact Address**') && 
      !line.includes('**Direct Booking Link**') && 
      !line.includes('**Guest Review**') &&
      line.trim().length > 20
    );
    
  return descLines.length > 0 ? descLines[0].trim() : '';
};
