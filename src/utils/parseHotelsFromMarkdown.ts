
/**
 * Enhanced parser for hotel information from markdown text
 */
export const parseHotelsFromMarkdown = (markdownText: string): any[] => {
  if (!markdownText) {
    console.log('❌ No markdown text provided');
    return [];
  }
  
  try {
    console.log('🔍 Starting to parse markdown text...');
    console.log('📄 Full response length:', markdownText.length);
    console.log('📄 First 1000 chars:', markdownText.substring(0, 1000));
    
    // Clean the text first - remove system instructions
    let cleanedText = markdownText
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/You are a hotel recommendation[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Your task is to return[\s\S]*?(?=\n\n|$)/g, '')
      .trim();
    
    console.log('🧹 Cleaned text length:', cleanedText.length);
    console.log('🧹 Cleaned first 500 chars:', cleanedText.substring(0, 500));
    
    // Try to parse as JSON first (if response is in JSON format)
    if (cleanedText.startsWith('[') || cleanedText.startsWith('{')) {
      try {
        console.log('🔍 Attempting JSON parse...');
        const jsonData = JSON.parse(cleanedText);
        const hotelsArray = Array.isArray(jsonData) ? jsonData : [jsonData];
        
        const hotels = hotelsArray.map((hotel, index) => ({
          name: hotel.hotel_name || hotel.name || `Hotel ${index + 1}`,
          location: `${hotel.city || 'Unknown City'}, ${hotel.country || 'Unknown Country'}`,
          starRating: hotel.star_rating || '★★★★',
          rating: hotel.star_rating ? hotel.star_rating.split('★').length - 1 : 4,
          address: `${hotel.city || 'Unknown City'}, ${hotel.country || 'Unknown Country'}`,
          allergyFeatures: hotel.allergy_friendly_features ? 
            hotel.allergy_friendly_features.split(',').map((f: string) => f.trim()) : 
            ['Allergy-friendly options available'],
          url: hotel.booking_link || `https://www.booking.com/search?ss=${encodeURIComponent(hotel.hotel_name || hotel.name || '')}`,
          reviews: hotel.guest_review_summary ? [hotel.guest_review_summary] : [],
          description: hotel.guest_review_summary || 'Allergy-friendly accommodation with trained staff.',
          phone: '',
          imageUrl: ''
        }));
        
        console.log(`✅ JSON parse successful: ${hotels.length} hotels`);
        return hotels;
      } catch (jsonError) {
        console.log('❌ JSON parse failed, falling back to text parsing');
      }
    }
    
    // Fallback to markdown/text parsing
    let hotelSections: string[] = [];
    
    // Try different splitting patterns
    const patterns = [
      /\n(?=###\s+[^#])/g,        // ### Hotel Name
      /\n(?=##\s+[^#])/g,         // ## Hotel Name  
      /\n(?=\d+\.\s+\*\*)/g,      // 1. **Hotel Name**
      /\n(?=\*\*[^*]+Hotel[^*]*\*\*)/g,  // **Hotel Name**
      /\n(?=\d+\.\s+[A-Z])/g,     // 1. Hotel Name (without markdown)
      /\n\n(?=[A-Z][^.\n]*Hotel)/g  // Hotel Name (paragraph breaks)
    ];
    
    for (const pattern of patterns) {
      const sections = cleanedText.split(pattern);
      if (sections.length > 1) {
        hotelSections = sections.filter(s => s.trim().length > 30);
        console.log(`📋 Found ${hotelSections.length} sections using pattern`);
        break;
      }
    }
    
    // If no patterns worked, try to extract individual hotels from text
    if (hotelSections.length === 0) {
      console.log('📋 No clear sections found, trying alternative extraction...');
      
      // Look for hotel names in various formats
      const hotelMatches = cleanedText.match(/(?:Hotel|Resort|Palace|Inn|Lodge|Suites?)[^.\n]{5,100}/gi) || [];
      if (hotelMatches.length > 0) {
        hotelSections = hotelMatches.map(match => {
          const startIndex = cleanedText.indexOf(match);
          const endIndex = Math.min(startIndex + 500, cleanedText.length);
          return cleanedText.substring(startIndex, endIndex);
        });
        console.log(`📋 Extracted ${hotelSections.length} hotel sections by name matching`);
      } else {
        // Last resort - split by double line breaks
        hotelSections = cleanedText.split(/\n\n+/).filter(s => s.trim().length > 50);
        console.log(`📋 Using paragraph splitting: ${hotelSections.length} sections`);
      }
    }
    
    if (hotelSections.length === 0) {
      console.warn('⚠️ No hotel sections found');
      return [];
    }
    
    console.log(`🏨 Processing ${hotelSections.length} hotel sections`);
    
    const hotels = hotelSections.map((section, index) => {
      try {
        console.log(`🔍 Processing section ${index + 1}:`, section.substring(0, 150) + '...');
        
        // Extract hotel name - try multiple patterns
        let name = `Hotel ${index + 1}`;
        const namePatterns = [
          /(?:###|##)\s*(.+?)(?:\s*★|$)/,
          /\d+\.\s*\*\*(.+?)\*\*/,
          /\*\*(.+?)\*\*/,
          /^([^.\n]+(?:Hotel|Resort|Palace|Inn|Lodge|Suites)[^.\n]*)/i,
          /^([A-Z][^.\n]{10,80})/
        ];
        
        for (const pattern of namePatterns) {
          const match = section.match(pattern);
          if (match?.[1]?.trim()) {
            name = match[1].trim().replace(/\*+/g, '');
            if (name.length > 3 && name.length < 100) {
              console.log(`✅ Found name: "${name}"`);
              break;
            }
          }
        }
        
        // Extract location/address
        let location = 'Location not available';
        const locationPatterns = [
          /(?:Address|Location|City):\s*([^.\n]+)/i,
          /📍\s*([^.\n]+)/,
          /(?:in|located in)\s+([A-Z][^.,\n]+)/i,
          /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z][a-z]+)/  // City, Country pattern
        ];
        
        for (const pattern of locationPatterns) {
          const match = section.match(pattern);
          if (match?.[1]?.trim()) {
            location = match[1].trim();
            console.log(`📍 Found location: "${location}"`);
            break;
          }
        }
        
        // Extract star rating
        const starsMatch = section.match(/([★⭐]+|\d+[\s-]stars?)/i);
        let starRating = '★★★★';
        let rating = 4;
        
        if (starsMatch) {
          if (starsMatch[0].includes('★') || starsMatch[0].includes('⭐')) {
            starRating = starsMatch[0];
            rating = (starsMatch[0].match(/[★⭐]/g) || []).length;
          } else {
            const numMatch = starsMatch[0].match(/\d+/);
            if (numMatch) {
              rating = parseInt(numMatch[0]);
              starRating = '★'.repeat(Math.min(rating, 5));
            }
          }
        }
        
        // Extract allergy features - look for bullet points or feature lists
        const allergyFeatures: string[] = [];
        const lines = section.split('\n');
        
        for (const line of lines) {
          const trimmed = line.trim();
          // Look for bullet points or feature indicators
          if (trimmed.match(/^[-•*]\s*/) || 
              trimmed.includes('allergy') || 
              trimmed.includes('gluten') || 
              trimmed.includes('dairy') ||
              trimmed.includes('nut') ||
              trimmed.includes('kitchen') ||
              trimmed.includes('staff') ||
              trimmed.includes('menu')) {
            
            const feature = trimmed.replace(/^[-•*]\s*/, '').trim();
            if (feature.length > 5 && feature.length < 150) {
              allergyFeatures.push(feature);
            }
          }
        }
        
        // If no specific features found, add generic ones
        if (allergyFeatures.length === 0) {
          allergyFeatures.push(
            'Allergy-aware staff',
            'Special dietary options',
            'Kitchen accommodations available'
          );
        }
        
        // Extract description - look for longer descriptive text
        let description = `${name} offers excellent allergy-friendly accommodations.`;
        const descLines = lines.filter(line => {
          const trimmed = line.trim();
          return trimmed.length > 50 && 
                 !trimmed.includes('**') && 
                 !trimmed.startsWith('#') &&
                 !trimmed.startsWith('-') &&
                 !trimmed.startsWith('•') &&
                 !trimmed.includes('★') &&
                 !trimmed.includes('⭐');
        });
        
        if (descLines.length > 0) {
          description = descLines[0].trim();
        }
        
        // Generate booking URL
        const searchQuery = `${name} ${location}`.replace(/[^\w\s]/g, ' ').trim();
        const url = `https://www.booking.com/search?ss=${encodeURIComponent(searchQuery)}`;
        
        const hotel = {
          name,
          location,
          starRating,
          rating,
          address: location,
          allergyFeatures,
          url,
          reviews: [],
          description: description.substring(0, 200), // Limit description length
          phone: '',
          imageUrl: ''
        };
        
        console.log(`✅ Successfully parsed hotel: "${name}"`);
        console.log(`   - Location: ${location}`);
        console.log(`   - Features: ${allergyFeatures.length}`);
        
        return hotel;
        
      } catch (error) {
        console.error(`❌ Error parsing section ${index + 1}:`, error);
        
        // Return fallback hotel
        return {
          name: `Hotel ${index + 1}`,
          location: 'Location not available',
          starRating: '★★★★',
          rating: 4,
          address: 'Address not available',
          allergyFeatures: ['Allergy-friendly accommodations available'],
          url: 'https://www.booking.com',
          reviews: [],
          description: 'Allergy-friendly hotel with trained staff.',
          phone: '',
          imageUrl: ''
        };
      }
    });
    
    // Filter out invalid hotels and remove duplicates
    const validHotels = hotels.filter(hotel => 
      hotel && hotel.name && hotel.name.length > 3 && hotel.name !== 'Hotel undefined'
    );
    
    const uniqueHotels = validHotels.filter((hotel, index, self) =>
      index === self.findIndex((h) => h.name.toLowerCase() === hotel.name.toLowerCase())
    );
    
    console.log(`🎯 Final result: ${uniqueHotels.length} valid unique hotels`);
    uniqueHotels.forEach((hotel, i) => {
      console.log(`Hotel ${i + 1}: ${hotel.name} - ${hotel.allergyFeatures.length} features`);
    });
    
    return uniqueHotels;
    
  } catch (error) {
    console.error('❌ Critical error in parseHotelsFromMarkdown:', error);
    return [];
  }
};
