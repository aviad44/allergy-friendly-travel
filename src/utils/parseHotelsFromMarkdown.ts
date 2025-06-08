
/**
 * Enhanced parser for hotel information from markdown text returned by GPT
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) {
    console.log('❌ No markdown text provided');
    return [];
  }
  
  try {
    console.log('🔍 Parsing markdown text:', markdownText.substring(0, 500) + '...');
    console.log('📝 Full response length:', markdownText.length);
    
    // Split by hotel headers - try multiple patterns
    let hotelSections: string[] = [];
    
    // Pattern 1: ### Hotel Name format
    if (markdownText.includes('### ')) {
      hotelSections = markdownText.split(/\n(?=###\s+)/);
      console.log('📋 Using ### pattern, found sections:', hotelSections.length);
    }
    // Pattern 2: ## Hotel Name format  
    else if (markdownText.includes('## ')) {
      hotelSections = markdownText.split(/\n(?=##\s+)/);
      console.log('📋 Using ## pattern, found sections:', hotelSections.length);
    }
    // Pattern 3: **Hotel Name** format
    else if (markdownText.includes('**') && markdownText.includes('Hotel')) {
      hotelSections = markdownText.split(/\n(?=\*\*[^*]*Hotel[^*]*\*\*)/i);
      console.log('📋 Using **Hotel** pattern, found sections:', hotelSections.length);
    }
    // Pattern 4: Numbered list format
    else if (/\d+\.\s/.test(markdownText)) {
      hotelSections = markdownText.split(/\n(?=\d+\.\s)/);
      console.log('📋 Using numbered list pattern, found sections:', hotelSections.length);
    }
    // Fallback: treat entire text as one section
    else {
      hotelSections = [markdownText];
      console.log('📋 Using fallback pattern, treating as single section');
    }
    
    const hotels = hotelSections
      .filter(section => section.trim().length > 10) // Filter out very short sections
      .map((section, index) => {
        try {
          console.log(`🏨 Processing hotel section ${index + 1}:`, section.substring(0, 200) + '...');
          
          // Extract hotel name - try multiple patterns
          let name = `Hotel ${index + 1}`; // Default fallback
          const namePatterns = [
            /###\s+([^★\n]+)/,           // ### Hotel Name
            /##\s+([^★\n]+)/,            // ## Hotel Name  
            /\*\*([^*]+Hotel[^*]*)\*\*/i, // **Hotel Name**
            /\d+\.\s*\*\*([^*]+)\*\*/,   // 1. **Hotel Name**
            /\d+\.\s*([^\n]+)/,          // 1. Hotel Name
            /^([^\n]+)/                  // First line
          ];
          
          for (const pattern of namePatterns) {
            const match = section.match(pattern);
            if (match && match[1]) {
              name = match[1].trim().replace(/★+/g, '').trim();
              console.log(`✅ Found name: "${name}"`);
              break;
            }
          }
          
          // Extract star rating
          const starsMatch = section.match(/★+/);
          const starCount = starsMatch ? starsMatch[0].length : 4;
          const starRating = '★'.repeat(starCount);
          
          // Extract address/location - try multiple patterns
          let address = '';
          const addressPatterns = [
            /\*\*Address:\*\*\s*([^\n]+)/i,
            /\*\*Location:\*\*\s*([^\n]+)/i,
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
          
          // Extract description
          let description = `${name} offers excellent allergy-friendly accommodations.`;
          const descPatterns = [
            /\*\*Description:\*\*\s*([^\n]+)/i,
            /\*\*Why suitable:\*\*\s*([^\n]+)/i,
            /Description:\s*([^\n]+)/i
          ];
          
          for (const pattern of descPatterns) {
            const match = section.match(pattern);
            if (match && match[1]) {
              description = match[1].trim();
              console.log(`📝 Found description: "${description.substring(0, 50)}..."`);
              break;
            }
          }
          
          // Extract guest quote
          let guestQuote = '';
          const quotePatterns = [
            /\*\*Guest Quote:\*\*\s*"([^"]+)"/i,
            /\*\*Review:\*\*\s*"([^"]+)"/i,
            /"([^"]{20,})"/  // Any quoted text that's reasonably long
          ];
          
          for (const pattern of quotePatterns) {
            const match = section.match(pattern);
            if (match && match[1]) {
              guestQuote = match[1].trim();
              console.log(`💬 Found quote: "${guestQuote.substring(0, 30)}..."`);
              break;
            }
          }
          
          // Extract features (lines starting with - or bullet points)
          const featureLines = section.split('\n').filter(line => {
            const trimmed = line.trim();
            return trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*') || 
                   trimmed.includes('⭐') || trimmed.includes('🍽️') || trimmed.includes('👨‍🍳') || 
                   trimmed.includes('📞') || trimmed.includes('✅');
          });
          
          const allergyFeatures = featureLines.map(line => 
            line.replace(/^[-•*]\s*/, '').replace(/[⭐🍽️👨‍🍳📞✅]\s*/, '').trim()
          ).filter(feature => feature.length > 5); // Filter out very short features
          
          console.log(`🔧 Found ${allergyFeatures.length} features:`, allergyFeatures.slice(0, 3));
          
          // Extract phone number
          const phoneMatch = section.match(/📞\s*([^\n]+)|Phone:\s*([^\n]+)|Tel:\s*([^\n]+)/i);
          const phone = phoneMatch ? (phoneMatch[1] || phoneMatch[2] || phoneMatch[3] || '').trim() : '';
          
          // Generate booking URL
          const searchQuery = name + (address ? ' ' + address : '');
          const url = `https://www.booking.com/search?ss=${encodeURIComponent(searchQuery)}`;
          
          const hotel = {
            name,
            location: address || 'Location not specified',
            starRating,
            rating: starCount,
            address: address || '',
            allergyFeatures: allergyFeatures.length > 0 ? allergyFeatures : [
              'Allergy-aware staff training',
              'Special dietary menu options',
              'Cross-contamination prevention protocols'
            ],
            url,
            reviews: guestQuote ? [guestQuote] : [],
            description,
            phone: phone || '',
            imageUrl: '' // Will be populated by HotelCard if needed
          };
          
          console.log(`✅ Successfully parsed hotel: "${name}" with ${allergyFeatures.length} features`);
          return hotel;
          
        } catch (error) {
          console.error(`❌ Error parsing hotel section ${index + 1}:`, error);
          console.error('Section content:', section.substring(0, 300));
          
          // Return a basic hotel object even if parsing fails
          return {
            name: `Hotel ${index + 1}`,
            location: 'Location not available',
            starRating: '★★★★',
            rating: 4,
            address: '',
            allergyFeatures: ['Allergy-friendly options available'],
            url: 'https://www.booking.com',
            reviews: [],
            description: 'Allergy-friendly accommodation with trained staff.',
            phone: '',
            imageUrl: ''
          };
        }
      });
    
    console.log(`🎯 Successfully parsed ${hotels.length} hotels from ${hotelSections.length} sections`);
    return hotels;
    
  } catch (error) {
    console.error('❌ Critical error in parseHotelsFromMarkdown:', error);
    console.error('Markdown text sample:', markdownText.substring(0, 500));
    return [];
  }
};
