
/**
 * Parses hotel information from markdown text returned by GPT
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) return [];
  
  try {
    console.log('Parsing markdown text:', markdownText.substring(0, 200) + '...');
    
    // Split the text by hotel separators (various formats that GPT might return)
    const patterns = [
      /---/g,
      /\n(?=1️⃣\s*\*\*Hotel Name\*\*)/g,
      /\n(?=\d\.\s+\*\*[^*]+\*\*)/g,  // Matches "1. **Hotel Name**"
      /\n(?=##\s+\d\.\s+[^#]+)/g,     // Matches "## 1. Hotel Name"  
      /\n(?=##\s+[^#]+)/g,            // Matches "## Hotel Name"
    ];
    
    // Try different separator patterns until we find one that works well
    let hotelEntries: string[] = [];
    
    for (const pattern of patterns) {
      const entriesByPattern = markdownText.split(pattern);
      if (entriesByPattern.length > 1) {
        hotelEntries = entriesByPattern;
        console.log(`Found ${hotelEntries.length} hotel entries using pattern:`, pattern);
        break;
      }
    }
    
    // If no pattern worked well, use a fallback approach
    if (hotelEntries.length <= 1) {
      console.log('Using fallback hotel entry extraction');
      
      // Look for numbered list items or headers as hotel separators
      const fallbackPattern = /\n(?=\d+\.\s|\#\#\s|\*\*Hotel Name\*\*|\*\*[^*]+Hotel[^*]*\*\*)/g;
      hotelEntries = markdownText.split(fallbackPattern);
      
      // If we still don't have multiple entries, just use the whole text as one entry
      if (hotelEntries.length <= 1) {
        hotelEntries = [markdownText];
      }
    }
    
    console.log(`Processing ${hotelEntries.length} hotel entries`);
    
    return hotelEntries
      .filter(entry => entry.trim().length > 0)
      .map(entry => {
        try {
          // Check for basic hotel name patterns
          const namePatterns = [
            /1️⃣\s*\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*(.*?)\*\*\s*\|\s*https?:\/\//i,
            /\d+\.\s+\*\*(.*?)\*\*/i,
            /##\s+\d\.\s+(.*?)(?=\n|$)/i,
            /##\s+(.*?)(?=\n|$)/i,
            /\*\*(.*?)\*\*/i  // Last resort
          ];
          
          // Extract name using multiple patterns
          let name = '';
          for (const pattern of namePatterns) {
            const nameMatch = entry.match(pattern);
            if (nameMatch && nameMatch[1]) {
              name = nameMatch[1].replace(/\*\*/g, '').trim();
              break;
            }
          }
          
          if (!name) {
            // Fallback: take the first non-empty line
            const firstLine = entry.split('\n').find(line => line.trim() !== '');
            name = firstLine ? firstLine.replace(/^\d+\.\s*/, '').trim() : 'Unknown Hotel';
          }

          // Extract location using multiple patterns
          const locationPatterns = [
            /2️⃣\s*\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*Location\*\*:\s*(.*?)(?=\n|$)/i,
            /📍\s*(.*?)(?=\n|$)/i,
            /Located in\s+(.*?)(?=\.|,|\n|$)/i
          ];
          
          let location = '';
          for (const pattern of locationPatterns) {
            const locationMatch = entry.match(pattern);
            if (locationMatch && locationMatch[1]) {
              location = locationMatch[1].replace(/\*\*/g, '').trim();
              break;
            }
          }

          // Extract address as separate or fallback to location
          const addressPatterns = [
            /4️⃣\s*\*\*Exact Address\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*Exact Address\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*Address\*\*:\s*(.*?)(?=\n|$)/i,
            /📍\s*(.*?)(?=\n|$)/i,
          ];
          
          let address = '';
          for (const pattern of addressPatterns) {
            const addressMatch = entry.match(pattern);
            if (addressMatch && addressMatch[1]) {
              address = addressMatch[1].replace(/\*\*/g, '').trim();
              break;
            }
          }

          // Extract star rating
          const ratingPatterns = [
            /3️⃣\s*\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i,
            /\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i,
            /⭐+/,
            /\d+[\s-]stars?/i
          ];
          
          let starRating = '';
          for (const pattern of ratingPatterns) {
            const ratingMatch = entry.match(pattern);
            if (ratingMatch) {
              if (ratingMatch[0].includes('⭐')) {
                starRating = ratingMatch[0];
              } else if (ratingMatch[1]) {
                starRating = ratingMatch[1].replace(/\*\*/g, '').trim();
              }
              break;
            }
          }
          
          // Convert star emoji rating to number
          const starCount = (starRating.match(/⭐/g) || []).length;
          const rating = starCount > 0 ? starCount : parseFloat(starRating) || 0;

          // Extract allergy features - try multiple patterns
          let allergyFeatures: string[] = [];
          
          // First try to find a section with bullets
          const allergySection = entry.match(/5️⃣\s*\*\*Why This Hotel is Suitable[^]*?(?=6️⃣|\n\n|$)/i) ||
                                entry.match(/\*\*Why This Hotel is Suitable[^]*?(?=\*\*Direct|\*\*Guest|\n\n|$)/i) ||
                                entry.match(/🌟\s*Why it['']s great for[^]*?(?=💬|\n\n|$)/i) ||
                                entry.match(/[-•]\s*[A-Za-z]/);
          
          if (allergySection && allergySection[0]) {
            allergyFeatures = allergySection[0]
              .split('\n')
              .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('*'))
              .map(line => line.replace(/^[-•*]\s*/, '').trim());
          }
          
          // If no bullet points found, look for key phrases
          if (allergyFeatures.length === 0) {
            const allergyKeywords = ['allergy', 'gluten', 'nut', 'dairy', 'wheat', 'lactose', 'free'];
            const lines = entry.split('\n');
            
            allergyFeatures = lines
              .filter(line => {
                const lowerLine = line.toLowerCase();
                return allergyKeywords.some(keyword => lowerLine.includes(keyword)) && 
                       !lowerLine.includes('hotel name') && 
                       !lowerLine.includes('review');
              })
              .map(line => line.replace(/^[-•*]\s*/, '').trim());
          }

          // Extract booking URL
          const urlPatterns = [
            /6️⃣\s*\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i,
            /\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i,
            /\*\*Hotel Website\*\*:\s*\[🔗\]\((https?:\/\/[^\s]+)\)/i,
            /\*\*Hotel Website\*\*:\s*(https?:\/\/[^\s]+)/i,
            /\[Book Now\]\((https?:\/\/[^\s]+)\)/i,
            /\[🔗 Hotel Website\]\((https?:\/\/[^\s]+)\)/i,
            /\|?\s*(https?:\/\/[^\s)]+)/i
          ];
          
          let url = '';
          for (const pattern of urlPatterns) {
            const urlMatch = entry.match(pattern);
            if (urlMatch && urlMatch[1]) {
              url = urlMatch[1].trim();
              break;
            }
          }

          // Extract guest review
          const reviewPatterns = [
            /7️⃣\s*\*\*Guest Review\*\*:\s*"([^"]*)"/i,
            /\*\*Guest Review\*\*:\s*"([^"]*)"/i,
            /\*\*Authentic Guest Reviews\*\*:\s*"([^"]*)"/i,
            /"([^"]*)"\s*—\s*⭐/i,
            /💬\s*[^:]*:\s*"([^"]*)"/i,
            /"([^"]{20,})"/  // Any quoted text that's reasonably long
          ];
          
          let review = '';
          for (const pattern of reviewPatterns) {
            const reviewMatch = entry.match(pattern);
            if (reviewMatch && reviewMatch[1]) {
              review = reviewMatch[1].trim();
              break;
            }
          }

          // Create description from various potential sources
          let description = '';
          if (allergyFeatures.length > 0) {
            description = `This hotel is suitable for allergy sufferers because it offers: ${allergyFeatures.join(', ')}`;
          } else {
            // Look for descriptive text
            const descLines = entry.split('\n')
              .filter(line => 
                !line.includes('**Hotel Name**') && 
                !line.includes('**City & Country**') && 
                !line.includes('**Star Rating**') && 
                !line.includes('**Exact Address**') && 
                !line.includes('**Direct Booking Link**') && 
                !line.includes('**Guest Review**') &&
                line.trim().length > 20);
                
            if (descLines.length > 0) {
              description = descLines[0].trim();
            }
          }

          console.log(`Successfully parsed hotel: ${name}`);
          
          return {
            name,
            location: location || address,
            starRating,
            rating,
            address,
            allergyFeatures,
            url,
            reviews: review ? [review] : [],
            description
          };
        } catch (error) {
          console.error('Error parsing hotel entry:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove any null entries
  } catch (error) {
    console.error('Error in parseHotelsFromMarkdown:', error);
    return [];
  }
};
