
/**
 * Parses hotel information from markdown text returned by GPT
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) return [];
  
  // Split the text by hotel separators (either --- or sequential hotel entries)
  const hotelEntries = markdownText.split(/---|\n(?=1️⃣\s*\*\*Hotel Name\*\*)/);
  
  return hotelEntries
    .filter(entry => entry.trim().length > 0)
    .map(entry => {
      try {
        // Extract name
        const nameMatch = entry.match(/1️⃣\s*\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i) || 
                          entry.match(/\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i) ||
                          entry.match(/\*\*(.*?)\*\*\s*\|\s*https?:\/\//i);
                          
        const name = nameMatch ? nameMatch[1].replace(/\*\*/g, '').trim() : '';

        // Extract location
        const locationMatch = entry.match(/2️⃣\s*\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i) ||
                              entry.match(/\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i) ||
                              entry.match(/\*\*Location\*\*:\s*(.*?)(?=\n|$)/i);
                              
        const location = locationMatch ? locationMatch[1].replace(/\*\*/g, '').trim() : '';

        // Extract star rating
        const ratingMatch = entry.match(/3️⃣\s*\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i) ||
                           entry.match(/\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i);
                           
        const starRating = ratingMatch ? ratingMatch[1].replace(/\*\*/g, '').trim() : '';
        
        // Convert star emoji rating to number if present
        const starCount = starRating.match(/⭐/g)?.length || 0;
        const rating = starCount > 0 ? starCount : parseFloat(starRating) || 0;

        // Extract address
        const addressMatch = entry.match(/4️⃣\s*\*\*Exact Address\*\*:\s*(.*?)(?=\n|$)/i) ||
                            entry.match(/\*\*Exact Address\*\*:\s*(.*?)(?=\n|$)/i) ||
                            entry.match(/\*\*Address\*\*:\s*(.*?)(?=\n|$)/i);
                            
        const address = addressMatch ? addressMatch[1].replace(/\*\*/g, '').trim() : '';

        // Extract allergy features
        let allergyFeatures: string[] = [];
        const allergySection = entry.match(/5️⃣\s*\*\*Why This Hotel is Suitable[^]*?(?=6️⃣|\n\n|$)/i) ||
                               entry.match(/\*\*Why This Hotel is Suitable[^]*?(?=\*\*Direct|\*\*Guest|\n\n|$)/i);
        
        if (allergySection && allergySection[0]) {
          allergyFeatures = allergySection[0]
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.replace(/^-\s*/, '').trim());
        }

        // Extract booking URL
        const urlMatch = entry.match(/6️⃣\s*\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i) ||
                        entry.match(/\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i) ||
                        entry.match(/\*\*Hotel Website\*\*:\s*\[🔗\]\((https?:\/\/[^\s]+)\)/i) ||
                        entry.match(/\|?\s*(https?:\/\/[^\s]+)/i);
                        
        const url = urlMatch ? urlMatch[1].trim() : '';

        // Extract guest review
        const reviewMatch = entry.match(/7️⃣\s*\*\*Guest Review\*\*:\s*"([^"]*)/i) ||
                           entry.match(/\*\*Guest Review\*\*:\s*"([^"]*)/i) ||
                           entry.match(/\*\*Authentic Guest Reviews\*\*:\s*"([^"]*)/i) ||
                           entry.match(/"([^"]*)"\s*—\s*⭐/i);
                           
        const review = reviewMatch ? reviewMatch[1].trim() : '';

        // Create the full description from allergy features
        const description = allergyFeatures.length > 0 
          ? `This hotel is suitable for allergy sufferers because it offers: ${allergyFeatures.join(', ')}`
          : '';

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
};
