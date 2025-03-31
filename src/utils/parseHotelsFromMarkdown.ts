
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
      
      // Extract descriptions - try to find the main hotel description
      let description = '';
      const descLines = section.split('\n')
        .filter(line => 
          !line.includes('**Key Allergy Accommodations:**') && 
          !line.includes('**Special Dietary Considerations:**') && 
          !line.includes('**Authentic Guest Reviews:**') && 
          !line.includes('**Additional Safety Information:**') && 
          !line.includes('|') && 
          !line.startsWith('**') && 
          line.trim().length > 20
        );
      
      if (descLines.length > 0) {
        description = descLines[0].trim();
      }
      
      // Extract reviews as array
      const reviewsTexts: string[] = [];
      const reviewsMatch = section.match(/\*\*Authentic Guest Reviews:\*\*(.*?)(?:\*\*|$)/is);
      if (reviewsMatch && reviewsMatch[1]) {
        const reviewText = reviewsMatch[1].trim();
        
        // Try to extract individual reviews
        const individualReviews = reviewText.match(/"([^"]+)"/g) || reviewText.match(/"([^"]+)"/g);
        if (individualReviews && individualReviews.length > 0) {
          reviewsTexts.push(individualReviews[0].replace(/[""]|^['"]\s*|\s*['"]$/g, '').trim());
        } else {
          // If no quotes found, use the whole text as one review
          reviewsTexts.push(reviewText);
        }
      }
      
      // Create allergy amenities
      const allergyAmenities = [
        { icon: "✓", text: "Allergen menu available" },
        { icon: "✓", text: "Staff trained on cross-contamination" },
        { icon: "✓", text: "Allergy-friendly options available" }
      ];
      
      // Create and add the hotel to our list
      const hotel: HotelInfo = {
        name,
        url,
        description,
        reviews: reviewsTexts,
        allergyAmenities,
        rating: 4 // Default rating
      };
      
      hotels.push(hotel);
    }
  } catch (error) {
    console.error('Error parsing hotels from markdown:', error);
  }
  
  return hotels;
}
