
import { HotelInfo } from '@/types/search';

// Function to parse hotel information from the markdown response
export function parseHotelsFromMarkdown(markdown: string): HotelInfo[] {
  const hotels: HotelInfo[] = [];
  
  try {
    // Split by hotel entries (separated by --- or by double newlines)
    const hotelSections = markdown.split(/---|(?:\n\n|\r\n\r\n)/);
    
    for (const section of hotelSections) {
      if (!section.trim()) continue;
      
      // Extract hotel name and URL - handle various formats
      let nameUrlMatch = section.match(/\*\*(.*?)\*\*\s*\|\s*(https?:\/\/[\w\d\.-]+\.[a-z\.]{2,6}[^\s]*)/i);
      
      // If no match found, try alternative pattern (e.g., "Hotel Name | https://...")
      if (!nameUrlMatch) {
        nameUrlMatch = section.match(/(.*?)\s*\|\s*(https?:\/\/[\w\d\.-]+\.[a-z\.]{2,6}[^\s]*)/i);
      }
      
      // If still no match, try just getting the hotel name
      if (!nameUrlMatch) {
        const nameMatch = section.match(/\*\*(.*?)\*\*/);
        if (nameMatch) {
          const urlMatch = section.match(/(https?:\/\/[\w\d\.-]+\.[a-z\.]{2,6}[^\s]*)/i);
          nameUrlMatch = [null, nameMatch[1].trim(), urlMatch ? urlMatch[1].trim() : ''];
        }
      }
      
      if (!nameUrlMatch) continue;
      
      const name = nameUrlMatch[1].trim();
      const url = nameUrlMatch[2] ? nameUrlMatch[2].trim() : '';
      
      // Extract information sections
      const accommodationsMatch = section.match(/\*\*Key Allergy Accommodations:\*\*(.*?)(?:\*\*|$)/is);
      const dietaryMatch = section.match(/\*\*Special Dietary Considerations:\*\*(.*?)(?:\*\*|$)/is);
      const reviewsMatch = section.match(/\*\*Authentic Guest Reviews:\*\*(.*?)(?:\*\*|$)/is);
      const safetyMatch = section.match(/\*\*Additional Safety Information:\*\*(.*?)(?:\*\*|$)/is);
      
      // Extract reviews as array if possible
      let reviews: string[] = [];
      if (reviewsMatch && reviewsMatch[1]) {
        const reviewText = reviewsMatch[1].trim();
        // Try to split multiple reviews (look for quotes or numbered items)
        if (reviewText.includes('"') || reviewText.includes('"') || reviewText.match(/^\d+\./m)) {
          reviews = reviewText
            .split(/(?:".*?"|".*?"|\d+\.\s+)/)
            .map(r => r.trim())
            .filter(r => r.length > 10);
          
          // If splitting didn't work well, use the whole text
          if (reviews.length === 0) {
            reviews = [reviewText];
          }
        } else {
          reviews = [reviewText];
        }
      }
      
      const hotel: HotelInfo = {
        name,
        url,
        accommodations: accommodationsMatch ? accommodationsMatch[1].trim() : undefined,
        dietary: dietaryMatch ? dietaryMatch[1].trim() : undefined,
        reviews,
        safety: safetyMatch ? safetyMatch[1].trim() : undefined
      };
      
      hotels.push(hotel);
    }
  } catch (error) {
    console.error('Error parsing hotels from markdown:', error);
  }
  
  return hotels;
}
