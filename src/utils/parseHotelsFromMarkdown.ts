
/**
 * Simplified parser for hotel information from markdown text returned by GPT
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) return [];
  
  try {
    console.log('🔍 Parsing markdown text:', markdownText.substring(0, 300) + '...');
    
    // Split by hotel headers (### Hotel Name format)
    const hotelSections = markdownText.split(/\n(?=###\s+)/);
    
    console.log(`📋 Found ${hotelSections.length} potential hotel sections`);
    
    const hotels = hotelSections
      .filter(section => section.trim().length > 0)
      .map((section, index) => {
        try {
          console.log(`🏨 Processing hotel section ${index + 1}`);
          
          // Extract hotel name (remove ### and stars)
          const nameMatch = section.match(/###\s+([^★\n]+)/);
          let name = nameMatch ? nameMatch[1].trim() : `Hotel ${index + 1}`;
          
          // Count stars in the original line
          const starsMatch = section.match(/###[^★\n]*★+/);
          const starCount = starsMatch ? (starsMatch[0].match(/★/g) || []).length : 4;
          
          // Extract address
          const addressMatch = section.match(/\*\*Address:\*\*\s*([^\n]+)/);
          const address = addressMatch ? addressMatch[1].trim() : '';
          
          // Extract description
          const descMatch = section.match(/\*\*Description:\*\*\s*([^\n]+)/);
          const description = descMatch ? descMatch[1].trim() : '';
          
          // Extract guest quote
          const quoteMatch = section.match(/\*\*Guest Quote:\*\*\s*"([^"]+)"/);
          const guestQuote = quoteMatch ? quoteMatch[1].trim() : '';
          
          // Extract features (lines starting with -)
          const featureLines = section.split('\n').filter(line => line.trim().startsWith('-'));
          const allergyFeatures = featureLines.map(line => 
            line.replace(/^-\s*/, '').replace(/[⭐🍽️👨‍🍳📞]\s*/, '').trim()
          ).filter(feature => feature.length > 0);
          
          // Extract phone number
          const phoneMatch = section.match(/📞\s*([^\n]+)/);
          const phone = phoneMatch ? phoneMatch[1].trim() : '';
          
          // Generate a booking URL (placeholder for now)
          const url = `https://www.booking.com/search?ss=${encodeURIComponent(name + ' ' + address)}`;
          
          const hotel = {
            name,
            location: address,
            starRating: '★'.repeat(starCount),
            rating: starCount,
            address,
            allergyFeatures,
            url,
            reviews: guestQuote ? [guestQuote] : [],
            description: description || `${name} offers excellent allergy-friendly accommodations.`,
            phone
          };
          
          console.log(`✅ Successfully parsed: ${name}`);
          return hotel;
          
        } catch (error) {
          console.error(`❌ Error parsing hotel section ${index + 1}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Remove any null entries
    
    console.log(`🎯 Successfully parsed ${hotels.length} hotels`);
    return hotels;
    
  } catch (error) {
    console.error('❌ Error in parseHotelsFromMarkdown:', error);
    return [];
  }
};
