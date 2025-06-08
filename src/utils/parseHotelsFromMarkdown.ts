
/**
 * Simplified and more robust parser for hotel information from markdown text
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) {
    console.log('❌ No markdown text provided');
    return [];
  }
  
  try {
    console.log('🔍 Starting to parse markdown text...');
    console.log('📄 Full response:', markdownText);
    
    // Clean the text first
    const cleanedText = markdownText
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
      .trim();
    
    console.log('🧹 Cleaned text:', cleanedText.substring(0, 500) + '...');
    
    // Try to split by different hotel section patterns
    let hotelSections: string[] = [];
    
    // Pattern 1: ### Hotel Name
    if (cleanedText.includes('###')) {
      hotelSections = cleanedText.split(/\n(?=###\s+)/);
      console.log('📋 Found sections using ### pattern:', hotelSections.length);
    }
    // Pattern 2: ## Hotel Name  
    else if (cleanedText.includes('##')) {
      hotelSections = cleanedText.split(/\n(?=##\s+)/);
      console.log('📋 Found sections using ## pattern:', hotelSections.length);
    }
    // Pattern 3: Numbered list (1., 2., etc.)
    else if (/^\d+\.\s/.test(cleanedText)) {
      hotelSections = cleanedText.split(/\n(?=\d+\.\s)/);
      console.log('📋 Found sections using numbered pattern:', hotelSections.length);
    }
    // Fallback: treat as single section
    else {
      hotelSections = [cleanedText];
      console.log('📋 Using fallback - treating as single section');
    }
    
    const hotels = hotelSections
      .filter(section => section.trim().length > 20) // Filter out very short sections
      .map((section, index) => {
        try {
          console.log(`🏨 Processing section ${index + 1}:`, section.substring(0, 200));
          
          // Extract hotel name with multiple fallback patterns
          let name = `Hotel ${index + 1}`;
          const namePatterns = [
            /###\s+(.+?)(?:\s*★|$)/,           // ### Hotel Name ★★★
            /##\s+(.+?)(?:\s*★|$)/,            // ## Hotel Name ★★★  
            /\d+\.\s*(.+?)(?:\s*★|$)/,         // 1. Hotel Name ★★★
            /\*\*(.+?)\*\*/,                   // **Hotel Name**
            /^([^\n]+)/                        // First line
          ];
          
          for (const pattern of namePatterns) {
            const match = section.match(pattern);
            if (match && match[1] && match[1].trim().length > 2) {
              name = match[1].trim();
              console.log(`✅ Found name: "${name}"`);
              break;
            }
          }
          
          // Extract address/location
          let address = 'Address not available';
          const addressPatterns = [
            /\*\*Address:\*\*\s*([^\n]+)/i,
            /📍\s*([^\n]+)/,
            /Address:\s*([^\n]+)/i,
            /Location:\s*([^\n]+)/i
          ];
          
          for (const pattern of addressPatterns) {
            const match = section.match(pattern);
            if (match && match[1]) {
              address = match[1].trim();
              console.log(`📍 Found address: "${address}"`);
              break;
            }
          }
          
          // Extract star rating
          const starsMatch = section.match(/★+/);
          const starCount = starsMatch ? starsMatch[0].length : 4;
          const starRating = '★'.repeat(starCount);
          
          // Extract description - look for descriptive text
          let description = `${name} offers excellent allergy-friendly accommodations with trained staff and special dietary options.`;
          const lines = section.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.length > 50 && 
                !trimmed.includes('**') && 
                !trimmed.includes('###') && 
                !trimmed.includes('##') &&
                !trimmed.includes('📍') &&
                !trimmed.includes('⭐') &&
                !trimmed.startsWith('-') &&
                !trimmed.startsWith('•')) {
              description = trimmed;
              console.log(`📝 Found description: "${description.substring(0, 50)}..."`);
              break;
            }
          }
          
          // Extract allergy features - look for bullet points
          const allergyFeatures: string[] = [];
          const featureLines = section.split('\n');
          for (const line of featureLines) {
            const trimmed = line.trim();
            if ((trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) && trimmed.length > 10) {
              const feature = trimmed.replace(/^[-•*]\s*/, '').trim();
              if (feature.length > 5) {
                allergyFeatures.push(feature);
              }
            }
          }
          
          // Add default features if none found
          if (allergyFeatures.length === 0) {
            allergyFeatures.push(
              'Allergy-aware staff training',
              'Special dietary menu options',
              'Cross-contamination prevention protocols',
              'Consultation with kitchen staff available'
            );
          }
          
          console.log(`🔧 Found ${allergyFeatures.length} features for ${name}`);
          
          // Extract guest review/quote
          let guestQuote = '';
          const quotePatterns = [
            /"([^"]{10,})"/,                    // Any quoted text
            /Guest Quote:\s*"([^"]+)"/i,
            /Review:\s*"([^"]+)"/i
          ];
          
          for (const pattern of quotePatterns) {
            const match = section.match(pattern);
            if (match && match[1]) {
              guestQuote = match[1].trim();
              console.log(`💬 Found quote: "${guestQuote.substring(0, 30)}..."`);
              break;
            }
          }
          
          // Generate booking URL
          const searchQuery = name + (address !== 'Address not available' ? ' ' + address : '');
          const url = `https://www.booking.com/search?ss=${encodeURIComponent(searchQuery)}`;
          
          const hotel = {
            name,
            location: address,
            starRating,
            rating: starCount,
            address,
            allergyFeatures,
            url,
            reviews: guestQuote ? [guestQuote] : [],
            description,
            phone: '',
            imageUrl: ''
          };
          
          console.log(`✅ Successfully parsed hotel: "${name}"`);
          console.log(`   - Location: ${address}`);
          console.log(`   - Features: ${allergyFeatures.length}`);
          console.log(`   - Description: ${description.substring(0, 50)}...`);
          
          return hotel;
          
        } catch (error) {
          console.error(`❌ Error parsing section ${index + 1}:`, error);
          
          // Return a basic fallback hotel
          return {
            name: `Hotel ${index + 1}`,
            location: 'Location not available',
            starRating: '★★★★',
            rating: 4,
            address: 'Address not available',
            allergyFeatures: ['Allergy-friendly options available'],
            url: 'https://www.booking.com',
            reviews: [],
            description: 'Allergy-friendly accommodation with trained staff.',
            phone: '',
            imageUrl: ''
          };
        }
      });
    
    console.log(`🎯 Final result: Successfully parsed ${hotels.length} hotels`);
    hotels.forEach((hotel, i) => {
      console.log(`Hotel ${i + 1}: ${hotel.name} - ${hotel.allergyFeatures.length} features`);
    });
    
    return hotels;
    
  } catch (error) {
    console.error('❌ Critical error in parseHotelsFromMarkdown:', error);
    return [];
  }
};
