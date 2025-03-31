
import { HotelInfo } from '@/types/search';

export const parseHotelsFromMarkdown = (markdown: string): HotelInfo[] => {
  if (!markdown) return [];

  console.log('Parsing markdown to extract hotels');
  
  const hotels: HotelInfo[] = [];
  
  // Match hotel blocks from the format: "**Hotel Name** | URL"
  const hotelRegex = /\*\*([^*]+)\*\*\s*\|\s*(https?:\/\/[^\s]+)?/g;
  let hotelMatches;
  
  while ((hotelMatches = hotelRegex.exec(markdown)) !== null) {
    try {
      const hotelName = hotelMatches[1].trim();
      const hotelUrl = hotelMatches[2]?.trim();
      
      // Find the position of this hotel in the markdown
      const hotelStartPos = hotelMatches.index;
      
      // Find the position of the next hotel or end of string
      let nextHotelPos = markdown.indexOf('**', hotelStartPos + 2);
      if (nextHotelPos === -1) {
        nextHotelPos = markdown.length;
      } else {
        // Find the actual next hotel, not just any bold text
        const nextHotelMatch = markdown.slice(nextHotelPos).match(/\*\*([^*]+)\*\*\s*\|\s*(https?:\/\/[^\s]+)?/);
        if (!nextHotelMatch || nextHotelMatch.index > 100) {
          // If the next asterisks are not part of a hotel header or too far away
          nextHotelPos = markdown.length;
        } else {
          nextHotelPos += nextHotelMatch.index;
        }
      }
      
      // Extract all content for this hotel
      const hotelContent = markdown.slice(hotelStartPos, nextHotelPos).trim();
      
      // Extract hotel details
      const hotel: HotelInfo = {
        name: hotelName,
        url: hotelUrl,
      };
      
      // Extract location information if available
      const locationMatch = hotelContent.match(/\*\*(?:City & Country|Location)\*\*:\s*([^*\n]+)/i);
      if (locationMatch) {
        hotel.location = locationMatch[1].trim();
      }
      
      // Extract address if available
      const addressMatch = hotelContent.match(/\*\*(?:Exact Address|Address)\*\*:\s*([^*\n]+)/i);
      if (addressMatch) {
        hotel.location = addressMatch[1].trim();
      }
      
      // Extract allergy-specific information
      const allergyMatch = hotelContent.match(/\*\*(?:Why This Hotel is Suitable|Key Allergy Accommodations|Allergy Features)\*\*:?\s*([\s\S]*?)(?:\n\s*\*\*|$)/i);
      if (allergyMatch) {
        hotel.description = allergyMatch[1].trim();
        
        // Create amenities from bullet points if they exist
        const bulletPoints = hotel.description.match(/[•\-\*]\s*([^\n]+)/g);
        if (bulletPoints) {
          hotel.allergyAmenities = bulletPoints.map(point => ({
            icon: "✓",
            text: point.replace(/^[•\-\*]\s*/, '').trim()
          }));
        }
      }
      
      // Extract guest reviews
      const reviewMatch = hotelContent.match(/\*\*(?:Authentic Guest Reviews|Guest Reviews)\*\*:?\s*([\s\S]*?)(?:\n\s*\*\*|$)/i);
      if (reviewMatch) {
        const reviewText = reviewMatch[1].trim();
        const reviews = reviewText.split(/\n/).map(r => r.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
        if (reviews.length > 0) {
          hotel.reviews = reviews;
        }
      }
      
      // Extract star rating
      const ratingMatch = hotelContent.match(/\*\*(?:Star Rating)\*\*:?\s*([⭐★]{1,5})/i) || 
                          hotelContent.match(/([⭐★]{1,5})/i);
      if (ratingMatch) {
        hotel.rating = ratingMatch[1].length;
      }
      
      // If there's no specific description extracted, use a general section of the content
      if (!hotel.description) {
        // Remove the header line and find the first paragraph
        const contentWithoutHeader = hotelContent.replace(/^\*\*[^*]+\*\*\s*\|\s*(https?:\/\/[^\s]+)?/g, '');
        const firstParagraph = contentWithoutHeader.split(/\n\s*\n/)[0];
        if (firstParagraph) {
          hotel.description = firstParagraph.trim();
        }
      }
      
      hotels.push(hotel);
      
      console.log(`Extracted hotel: ${hotel.name}`);
      
    } catch (error) {
      console.error('Error parsing hotel information:', error);
    }
  }
  
  return hotels;
};
