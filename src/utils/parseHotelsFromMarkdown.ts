
/**
 * Enhanced JSON parser for hotel information from OpenAI
 */
export const parseHotelsFromMarkdown = (responseText: string): any[] => {
  if (!responseText) {
    console.log('❌ No response text provided');
    return [];
  }
  
  try {
    console.log('🔍 Starting JSON parsing...');
    console.log('📄 Response length:', responseText.length);
    console.log('📄 First 300 chars:', responseText.substring(0, 300));
    console.log('📄 Last 300 chars:', responseText.substring(responseText.length - 300));
    
    // Clean the response text
    let cleanedText = responseText.trim();
    
    // Remove any wrapper objects if present
    if (cleanedText.startsWith('{"result":')) {
      try {
        const wrapper = JSON.parse(cleanedText);
        cleanedText = wrapper.result || cleanedText;
      } catch (e) {
        console.log('⚠️ Could not unwrap result object, using original text');
      }
    }
    
    // Additional cleaning
    cleanedText = cleanedText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    
    console.log('🧹 Cleaned text length:', cleanedText.length);
    console.log('🧹 Cleaned first 300 chars:', cleanedText.substring(0, 300));
    
    // Parse the JSON
    console.log('🔍 Attempting JSON parse...');
    const jsonData = JSON.parse(cleanedText);
    
    // Ensure we have an array
    const hotelsArray = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    console.log(`✅ JSON parsed successfully: ${hotelsArray.length} hotels found`);
    
    // Transform to our internal format
    const hotels = hotelsArray.map((hotel, index) => {
      const transformedHotel = {
        name: hotel.hotel_name || hotel.name || `Hotel ${index + 1}`,
        location: `${hotel.city || 'Unknown City'}, ${hotel.country || 'Unknown Country'}`,
        starRating: hotel.star_rating || '★★★★',
        rating: hotel.star_rating ? (hotel.star_rating.match(/★/g) || []).length : 4,
        address: `${hotel.city || 'Unknown City'}, ${hotel.country || 'Unknown Country'}`,
        allergyFeatures: hotel.allergy_friendly_features ? 
          hotel.allergy_friendly_features.split(',').map((f: string) => f.trim()).filter((f: string) => f.length > 0) : 
          ['Allergy-friendly options available'],
        url: hotel.booking_link || `https://www.booking.com/search?ss=${encodeURIComponent(hotel.hotel_name || hotel.name || '')}`,
        reviews: hotel.guest_review_summary ? [hotel.guest_review_summary] : [],
        description: hotel.guest_review_summary || 'Allergy-friendly accommodation with trained staff.',
        phone: '',
        imageUrl: '',
        priceRange: hotel.price_range || '$100-200 per night'
      };
      
      console.log(`✅ Transformed hotel ${index + 1}:`, {
        name: transformedHotel.name,
        location: transformedHotel.location,
        features: transformedHotel.allergyFeatures.length
      });
      
      return transformedHotel;
    });
    
    console.log(`🎯 Final result: ${hotels.length} hotels successfully parsed`);
    return hotels;
    
  } catch (error) {
    console.error('❌ JSON parsing failed:', error);
    console.error('❌ Failed text:', responseText.substring(0, 500));
    
    // Return empty array instead of fallback hotels to force proper debugging
    return [];
  }
};
