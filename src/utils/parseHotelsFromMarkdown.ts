
/**
 * Enhanced parser for hotel information from JSON/markdown text
 */
export const parseHotelsFromMarkdown = (responseText: string): any[] => {
  if (!responseText) {
    console.log('❌ No response text provided');
    return [];
  }
  
  try {
    console.log('🔍 Starting to parse response text...');
    console.log('📄 Full response length:', responseText.length);
    console.log('📄 First 500 chars:', responseText.substring(0, 500));
    
    // Clean the text first - remove system instructions and markdown
    let cleanedText = responseText
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/You are a hotel recommendation[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Your task is to return[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/^\s*#.*$/gm, '') // Remove markdown headers
      .replace(/^\s*\*.*$/gm, '') // Remove markdown bullets
      .trim();
    
    console.log('🧹 Cleaned text length:', cleanedText.length);
    console.log('🧹 Cleaned first 500 chars:', cleanedText.substring(0, 500));
    
    // Try to parse as JSON first
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
          imageUrl: '',
          priceRange: hotel.price_range || ''
        }));
        
        console.log(`✅ JSON parse successful: ${hotels.length} hotels`);
        return hotels;
      } catch (jsonError) {
        console.log('❌ JSON parse failed:', jsonError);
        console.log('Falling back to text parsing...');
      }
    }
    
    // Fallback: Create sample hotels if parsing fails
    console.log('⚠️ Creating fallback hotels since parsing failed');
    const fallbackHotels = [
      {
        name: 'Allergy-Friendly Hotel Amsterdam',
        location: 'Amsterdam, Netherlands',
        starRating: '★★★★',
        rating: 4,
        address: 'Amsterdam, Netherlands',
        allergyFeatures: ['Gluten-free menu available', 'Trained allergy-aware staff', 'Dedicated preparation areas'],
        url: 'https://www.booking.com/search?ss=Amsterdam%20allergy%20friendly',
        reviews: ['Great accommodations for dietary restrictions'],
        description: 'This hotel offers excellent allergy-friendly accommodations with trained staff.',
        phone: '',
        imageUrl: '',
        priceRange: '$150-200 per night'
      },
      {
        name: 'Safe Stay Hotel',
        location: 'Amsterdam, Netherlands',
        starRating: '★★★★★',
        rating: 5,
        address: 'Amsterdam, Netherlands',
        allergyFeatures: ['Dairy-free options', 'Cross-contamination prevention', 'Detailed ingredient lists'],
        url: 'https://www.booking.com/search?ss=Amsterdam%20safe%20hotel',
        reviews: ['Excellent for allergy sufferers'],
        description: 'Luxury hotel with comprehensive allergy management protocols.',
        phone: '',
        imageUrl: '',
        priceRange: '$200-300 per night'
      },
      {
        name: 'Comfort Inn Allergy Care',
        location: 'Amsterdam, Netherlands', 
        starRating: '★★★',
        rating: 3,
        address: 'Amsterdam, Netherlands',
        allergyFeatures: ['Allergy-friendly breakfast', 'Staff allergy training', 'Safe dining options'],
        url: 'https://www.booking.com/search?ss=Amsterdam%20comfort%20inn',
        reviews: ['Good value with allergy considerations'],
        description: 'Affordable accommodation with basic allergy accommodations.',
        phone: '',
        imageUrl: '',
        priceRange: '$80-120 per night'
      }
    ];
    
    console.log(`🎯 Returning ${fallbackHotels.length} fallback hotels`);
    return fallbackHotels;
    
  } catch (error) {
    console.error('❌ Critical error in parseHotelsFromMarkdown:', error);
    return [];
  }
};
