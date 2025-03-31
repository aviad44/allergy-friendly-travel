
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
      
      const name = nameUrlMatch[1].trim().replace(/^\d+\.\s+/, ''); // Remove numbering if present
      const url = nameUrlMatch[2] ? nameUrlMatch[2].trim() : '';
      
      // Extract information sections - but don't include the titles in the final text
      let accommodationsText = '';
      let dietaryText = '';
      let reviewsTexts: string[] = [];
      let safetyText = '';
      
      // Extract accommodations
      const accommodationsMatch = section.match(/\*\*Key Allergy Accommodations:\*\*(.*?)(?:\*\*|$)/is);
      if (accommodationsMatch && accommodationsMatch[1]) {
        accommodationsText = accommodationsMatch[1].trim();
      }
      
      // Extract dietary considerations
      const dietaryMatch = section.match(/\*\*Special Dietary Considerations:\*\*(.*?)(?:\*\*|$)/is);
      if (dietaryMatch && dietaryMatch[1]) {
        dietaryText = dietaryMatch[1].trim();
      }
      
      // Extract reviews as array
      const reviewsMatch = section.match(/\*\*Authentic Guest Reviews:\*\*(.*?)(?:\*\*|$)/is);
      if (reviewsMatch && reviewsMatch[1]) {
        const reviewText = reviewsMatch[1].trim();
        
        // Try to extract individual reviews
        const individualReviews = reviewText.match(/"([^"]+)"/g) || reviewText.match(/"([^"]+)"/g);
        if (individualReviews && individualReviews.length > 0) {
          reviewsTexts = individualReviews.map(r => r.replace(/[""]|^['"]\s*|\s*['"]$/g, '').trim());
        } else {
          // If no quotes found, use the whole text as one review
          reviewsTexts = [reviewText];
        }
      }
      
      // Extract safety information
      const safetyMatch = section.match(/\*\*Additional Safety Information:\*\*(.*?)(?:\*\*|$)/is);
      if (safetyMatch && safetyMatch[1]) {
        safetyText = safetyMatch[1].trim();
      }
      
      // Create and add the hotel to our list
      const hotel: HotelInfo = {
        name,
        url,
        accommodations: accommodationsText,
        dietary: dietaryText,
        reviews: reviewsTexts.length > 0 ? reviewsTexts : undefined,
        safety: safetyText,
        // We'll add other info like ratings and location elsewhere
      };
      
      hotels.push(hotel);
    }
  } catch (error) {
    console.error('Error parsing hotels from markdown:', error);
  }
  
  return hotels;
}
