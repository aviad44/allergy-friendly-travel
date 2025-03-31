
import { HotelInfo } from "@/types/search";

/**
 * Parses hotel information from a markdown string
 * @param markdown - The markdown string containing hotel information
 * @returns Array of HotelInfo objects
 */
export const parseHotelsFromMarkdown = (markdown: string): HotelInfo[] => {
  if (!markdown) return [];
  
  // Split the markdown by hotel sections (marked by --- or double line breaks)
  const hotelSections = markdown.split(/---|\n\n\s*\*\*/).filter(Boolean);
  
  return hotelSections.map((section) => {
    // For sections that don't start with **, prepend it to ensure consistent parsing
    const normalizedSection = section.startsWith('**') ? section : `**${section}`;
    
    // Extract hotel name and URL
    const nameUrlMatch = normalizedSection.match(/\*\*(.*?)\*\*\s*\|\s*(https?:\/\/[\w\d\.-]+\.[\w\d\.-]+[^\s]*)/i);
    const name = nameUrlMatch ? nameUrlMatch[1].trim() : extractValue(normalizedSection, 'Hotel Name');
    const url = nameUrlMatch ? nameUrlMatch[2].trim() : extractValue(normalizedSection, 'Website');
    
    // Extract star rating (both as text and symbols)
    let rating = 0;
    const starRatingText = extractValue(normalizedSection, 'Star Rating');
    if (starRatingText) {
      // Count star symbols
      const starSymbols = (starRatingText.match(/★/g) || []).length;
      if (starSymbols > 0) {
        rating = starSymbols;
      } else {
        // Try to extract number
        const ratingMatch = starRatingText.match(/(\d+\.?\d*)/);
        if (ratingMatch) {
          rating = parseFloat(ratingMatch[1]);
        }
      }
    }
    
    // Extract location information
    const location = extractValue(normalizedSection, 'City & Country') || 
                    extractValue(normalizedSection, 'Location');
    
    // Extract address
    const address = extractValue(normalizedSection, 'Exact Address') || 
                   extractValue(normalizedSection, 'Address');
    
    // Extract description
    let description = extractValue(normalizedSection, 'Why This Hotel is Suitable for Allergy Sufferers') || 
                     extractValue(normalizedSection, 'Why This Hotel is Suitable');
                     
    // If no specific description section, use everything except known sections
    if (!description) {
      description = normalizedSection
        .replace(/\*\*(.*?)\*\*\s*\|\s*(https?:\/\/[\w\d\.-]+\.[\w\d\.-]+[^\s]*)/i, '') // Remove name and URL
        .replace(/\*\*(City & Country|Location|Star Rating|Exact Address|Address|Authentic Guest Reviews|Guest Reviews)[\*\s]*:.*?(?=\*\*|$)/gs, '')
        .trim();
    }
    
    // Extract reviews as an array
    const reviewsSection = extractValue(normalizedSection, 'Authentic Guest Reviews') || 
                          extractValue(normalizedSection, 'Guest Reviews');
    const reviews: string[] = [];
    
    if (reviewsSection) {
      // Look for bullet points with quotes
      const reviewsMatch = reviewsSection.match(/[-•]\s*[""]([^""]+)[""]/g);
      if (reviewsMatch) {
        reviewsMatch.forEach((match) => {
          const quote = match.match(/[""]([^""]+)[""]/);
          if (quote && quote[1]) {
            reviews.push(quote[1].trim());
          }
        });
      } else if (reviewsSection.includes('"')) {
        // Try to extract quotes directly
        const quotes = reviewsSection.match(/[""]([^""]+)[""]/g);
        if (quotes) {
          quotes.forEach((quote) => {
            const clean = quote.replace(/[""]/g, '').trim();
            if (clean) reviews.push(clean);
          });
        }
      } else {
        // If no quotes found, use the whole section
        reviews.push(reviewsSection.trim());
      }
    }
    
    // Extract amenities
    const allergenInfoMatch = normalizedSection.match(/[-•]\s*([^•\n]+)/g);
    const allergyAmenities = allergenInfoMatch 
      ? allergenInfoMatch.map(line => ({
          icon: "✓",
          text: line.replace(/^[-•]\s*/, '').trim()
        }))
      : [];
    
    return {
      name,
      url,
      rating,
      location,
      description,
      reviews,
      allergyAmenities
    };
  }).filter(hotel => hotel.name); // Filter out any entries without names
};

/**
 * Extracts a value from a section based on a key pattern
 */
function extractValue(text: string, key: string): string {
  const regex = new RegExp(`\\*\\*${key}\\*\\*\\s*:?\\s*([^\\*]+)(?=\\*\\*|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}
