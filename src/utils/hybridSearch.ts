import { HotelInfo } from '@/types/search';
import { destinationData } from '@/data/destination-data';
import { DestinationContent, Hotel } from '@/types/definitions';

interface SearchFilters {
  destination: string;
  allergies: string;
}

// מנוע חיפוש היברידי - נתונים אמיתיים + GPT כגיבוי
export class HybridHotelSearch {
  
  // חיפוש במאגר הנתונים הקיים
  private searchExistingData(filters: SearchFilters): HotelInfo[] {
    const matchingHotels: HotelInfo[] = [];
    
    console.log('🔍 Available destinations in data:', Object.keys(destinationData));
    console.log('🎯 Searching for destination:', filters.destination);
    console.log('🤧 Searching for allergies:', filters.allergies);
    
    // חיפוש במלונות קיימים
    Object.entries(destinationData).forEach(([key, destination]) => {
      const destinationContent = destination as DestinationContent;
      console.log(`📍 Checking destination: ${key}, has hotels: ${!!destinationContent.hotels}, hotels count: ${destinationContent.hotels?.length || 0}`);
      
      if (destinationContent.hotels && this.isDestinationMatch(key, filters.destination)) {
        console.log(`✅ Destination ${key} matches search criteria`);
        destinationContent.hotels.forEach(hotel => {
          if (this.isAllergyFriendly(hotel, filters.allergies)) {
            const intro = Array.isArray(destinationContent.intro) ? 
              destinationContent.intro.join(' ') : 
              destinationContent.intro || '';
            matchingHotels.push(this.convertToHotelInfo(hotel, intro, filters.destination));
          }
        });
      } else if (destinationContent.hotels) {
        console.log(`❌ Destination ${key} does not match search criteria`);
      }
    });
    
    console.log(`📊 Total matching hotels found: ${matchingHotels.length}`);
    return matchingHotels;
  }
  
  private isDestinationMatch(destinationKey: string, searchDestination: string): boolean {
    const searchLower = searchDestination.toLowerCase();
    return destinationKey.toLowerCase().includes(searchLower) ||
           destinationKey.replace('-', ' ').toLowerCase().includes(searchLower) ||
           searchLower.includes(destinationKey.toLowerCase());
  }
  
  private isAllergyFriendly(hotel: Hotel, allergies: string): boolean {
    const allergyLower = allergies.toLowerCase();
    console.log(`🔍 Checking allergy friendliness for hotel: ${hotel.name}`);
    console.log(`📝 Allergy info: ${hotel.allergyInfo}`);
    console.log(`🍽️ Guest review: ${hotel.guestReview}`);
    console.log(`⭐ Is purely allergy friendly: ${hotel.isPurelyAllergyFriendly}`);
    
    // Check if hotel is marked as purely allergy-friendly
    if (hotel.isPurelyAllergyFriendly) {
      console.log(`✅ Hotel ${hotel.name} is marked as purely allergy-friendly`);
      return true;
    }
    
    // Check allergy information
    if (hotel.allergyInfo?.toLowerCase().includes(allergyLower)) {
      console.log(`✅ Hotel ${hotel.name} matches in allergyInfo`);
      return true;
    }
    
    // Check guest reviews for allergy mentions
    if (hotel.guestReview?.toLowerCase().includes(allergyLower) || 
        hotel.guestReview?.toLowerCase().includes('allergy') ||
        hotel.guestReview?.toLowerCase().includes('gluten') ||
        hotel.guestReview?.toLowerCase().includes('dairy') ||
        hotel.guestReview?.toLowerCase().includes('nut')) {
      console.log(`✅ Hotel ${hotel.name} has allergy-related guest review`);
      return true;
    }
    
    // Check allergen friendly features
    if (hotel.allergenFriendly?.some((allergen: string) => 
         allergen.toLowerCase().includes(allergyLower))) {
      console.log(`✅ Hotel ${hotel.name} matches in allergenFriendly`);
      return true;
    }
    
    // Check amenities for allergy-related features
    if (hotel.amenities?.some((amenity: string) => 
         amenity.toLowerCase().includes('allergy') || 
         amenity.toLowerCase().includes('gluten') ||
         amenity.toLowerCase().includes('hypoallergenic') ||
         amenity.toLowerCase().includes(allergyLower))) {
      console.log(`✅ Hotel ${hotel.name} matches in amenities`);
      return true;
    }
    
    // Check features for allergy-related content
    if (hotel.features?.some((feature: string) => 
         feature.toLowerCase().includes('allergy') || 
         feature.toLowerCase().includes('gluten') ||
         feature.toLowerCase().includes(allergyLower))) {
      console.log(`✅ Hotel ${hotel.name} matches in features`);
      return true;
    }
    
    console.log(`❌ Hotel ${hotel.name} does not match allergy criteria`);
    return false;
  }
  
  // Add UTM parameters to hotel URL for search results tracking
  private addUtmToUrl(originalUrl: string, destination: string): string {
    if (!originalUrl || originalUrl === '') return '';
    
    try {
      const url = new URL(originalUrl);
      url.searchParams.set('utm_source', 'allergy-free-travel.com');
      url.searchParams.set('utm_medium', 'search_results');
      url.searchParams.set('utm_campaign', destination.toLowerCase().replace(/\s+/g, '_'));
      return url.toString();
    } catch (error) {
      // If URL is invalid, return original
      console.warn('Invalid URL for UTM processing:', originalUrl);
      return originalUrl;
    }
  }

  private convertToHotelInfo(hotel: Hotel, destinationInfo: string, destination: string = ''): HotelInfo {
    // Create reviews array including the authentic guest review
    const reviews = [];
    
    // Add the main guest review if it exists
    if (hotel.guestReview) {
      reviews.push({
        text: hotel.guestReview,
        author: 'Verified Guest with Allergies',
        rating: hotel.stars || 4
      });
    }
    
    // Add other reviews if they exist
    if (hotel.reviews && Array.isArray(hotel.reviews)) {
      hotel.reviews.forEach((review: any) => {
        reviews.push({
          text: review.text || review.comment || review.guestReview || '',
          author: review.author || review.author_name || 'Verified Guest',
          rating: review.rating || 4
        });
      });
    }
    
    console.log(`🔄 Converting hotel ${hotel.name} with ${reviews.length} reviews`);
    
    const originalUrl = hotel.website || hotel.websiteUrl || hotel.bookingUrl;
    const urlWithUtm = this.addUtmToUrl(originalUrl, destination);
    
    return {
      name: hotel.name,
      location: hotel.location || hotel.address || '',
      description: hotel.description || hotel.allergyInfo || destinationInfo,
      url: urlWithUtm,
      rating: hotel.rating || hotel.stars || 4,
      starRating: hotel.stars ? `${hotel.stars} stars` : '4 stars',
      allergyFeatures: hotel.allergenFriendly || hotel.amenities || hotel.features || [],
      reviews,
      allergyAmenities: (hotel.allergenFriendly || hotel.amenities || []).map((feature: string) => ({
        icon: '✅',
        text: feature
      })),
      amenities: hotel.amenities || hotel.features || [],
      imageUrl: hotel.imageUrl
    };
  }
  
  // חיפוש פשוט עם GPT בלבד - מדויק ומהיר
  async search(filters: SearchFilters): Promise<HotelInfo[]> {
    console.log('🔍 Starting search for:', filters);
    
    // חיפוש ישיר עם GPT למידע מדויק ועדכני
    try {
      console.log('🚀 Searching with GPT for accurate results...');
      const gptHotels = await this.searchWithGPT(filters);
      console.log(`🤖 GPT found ${gptHotels.length} hotels`);
      
      if (gptHotels.length > 0) {
        console.log('✅ Returning GPT results');
        return gptHotels.slice(0, 10);
      } else {
        console.log('⚠️ GPT returned empty results');
        // אם GPT לא מחזיר תוצאות, נחפש במאגר הקיים
        console.log('🔍 Trying existing data as fallback...');
        const existingHotels = this.searchExistingData(filters);
        console.log(`📚 Found ${existingHotels.length} hotels in existing data`);
        
        if (existingHotels.length > 0) {
          return existingHotels.slice(0, 8);
        }
        
        return [{
          name: "לא נמצאו מלונות",
          location: filters.destination,
          description: `לא נמצאו מלונות מתאימים לאלרגיה ${filters.allergies} ב${filters.destination}. אנא נסה יעד אחר או צור איתנו קשר לעזרה אישית.`,
          url: "",
          rating: 0,
          starRating: "",
          allergyFeatures: [],
          reviews: [],
          allergyAmenities: [],
          amenities: []
        }];
      }
      
    } catch (error) {
      console.error('❌ GPT search failed:', error);
      // במקרה של שגיאה, נחזיר הודעה ברורה
      return [{
        name: "שגיאה בחיפוש",
        location: "נסה שוב",
        description: `חיפוש נכשל עבור ${filters.destination}. שגיאה: ${error instanceof Error ? error.message : 'Unknown error'}. אנא נסה שוב או בחר יעד אחר.`,
        url: "",
        rating: 0,
        starRating: "",
        allergyFeatures: [],
        reviews: [],
        allergyAmenities: [],
        amenities: []
      }];
    }
  }
  
  private async searchWithGPT(filters: SearchFilters): Promise<HotelInfo[]> {
    console.log('🚀 Starting GPT search with filters:', filters);
    
    try {
      // Use Supabase client to call the edge function with proper API key
      const { supabase } = await import('@/integrations/supabase/client');
      
      console.log('🔧 About to call search-with-gpt function...');
      console.log('📋 Supabase client:', !!supabase);
      console.log('📋 Function name: "search-with-gpt"');
      console.log('📋 Body:', { destination: filters.destination, allergies: filters.allergies });
      
      const { data, error } = await supabase.functions.invoke('search-with-gpt', {
        body: { 
          destination: filters.destination, 
          allergies: filters.allergies 
        }
      });
      
      console.log('📡 Raw Supabase function response data:', data);
      console.log('📡 Raw Supabase function response error:', error);
      console.log('📡 Data type:', typeof data);
      console.log('📡 Data keys:', data ? Object.keys(data) : 'no data');
      
      // 🔍 DEEP DEBUGGING - Raw response inspection
      console.log('🔍 FULL RAW RESPONSE ANALYSIS:');
      console.log('- Raw data object:', JSON.stringify(data, null, 2));
      console.log('- Data structure analysis:');
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          console.log(`  - ${key}: ${typeof value}, length: ${typeof value === 'string' ? value.length : 'N/A'}`);
          if (typeof value === 'string' && value.length > 0) {
            console.log(`    First 200 chars: "${value.substring(0, 200)}..."`);
          }
        }
      }
      
      if (error) {
        console.error('❌ Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }
      
      if (!data) {
        console.warn('⚠️ No data received from function');
        return [];
      }
      
      // Check what fields are available in the response
      console.log('🔍 Checking response structure...');
      console.log('- hotelsMarkdown:', !!data.hotelsMarkdown);
      console.log('- response:', !!data.response);
      console.log('- choices:', !!data.choices);
      console.log('- content:', !!data.content);
      
      // Try to extract the markdown content from different possible response formats
      let markdownContent = '';
      if (data.hotelsMarkdown) {
        markdownContent = data.hotelsMarkdown;
        console.log('✅ Found hotelsMarkdown field');
      } else if (data.response) {
        markdownContent = data.response;
        console.log('✅ Found response field');
      } else if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        markdownContent = data.choices[0].message.content;
        console.log('✅ Found OpenAI-style choices structure');
      } else if (data.content) {
        markdownContent = data.content;
        console.log('✅ Found content field');
      } else {
        console.warn('⚠️ Could not find markdown content in response structure');
        console.log('Full response data:', JSON.stringify(data, null, 2));
        return [];
      }
      
      console.log('📝 Raw markdown content length:', markdownContent.length);
      console.log('📝 First 500 chars of markdown:', markdownContent.substring(0, 500));
      
      // 🔍 CRITICAL DEBUGGING - Markdown content analysis
      console.log('🔍 MARKDOWN ANALYSIS BEFORE PARSING:');
      console.log('- Content type:', typeof markdownContent);
      console.log('- Content length:', markdownContent.length);
      console.log('- Is empty?', markdownContent.trim().length === 0);
      console.log('- Contains hotel patterns?', /hotel/i.test(markdownContent));
      console.log('- Contains markdown headers?', /#{1,3}/.test(markdownContent));
      console.log('- First 1000 chars:\n', markdownContent.substring(0, 1000));
      
      // Parse the GPT response using the unified parser
      console.log('📝 Parsing GPT response...');
      const { parseHotelsFromMarkdown } = await import('@/utils/hotels-parser');
      
      console.log('🔍 STARTING PARSER...');
      const parsedHotels = parseHotelsFromMarkdown(markdownContent);
      
      console.log('🔍 PARSER RESULTS:');
      console.log(`- Parsed hotels count: ${parsedHotels.length}`);
      console.log('- Full parsed hotels array:', JSON.stringify(parsedHotels, null, 2));
      console.log('- First hotel details:', parsedHotels[0] || 'NO HOTELS FOUND');
      
      if (parsedHotels.length === 0) {
        console.log('⚠️ NO HOTELS PARSED - ANALYZING WHY:');
        console.log('- Raw markdown might not match parser patterns');
        console.log('- Check if markdown format is compatible with parser');
      }
      
      // Convert to HotelInfo format if needed
      console.log('🔄 CONVERTING TO HotelInfo FORMAT...');
      const convertedHotels: HotelInfo[] = parsedHotels.map((hotel, index) => {
        console.log(`🏨 Converting hotel ${index + 1}:`, hotel);
        const urlWithUtm = this.addUtmToUrl(hotel.url || '', filters.destination);
        return {
          name: hotel.name || 'Unknown Hotel',
          location: hotel.location || '',
          description: hotel.description || '',
          url: urlWithUtm,
          rating: hotel.rating || 4,
          starRating: hotel.starRating || '4 stars',
          allergyFeatures: hotel.allergyFeatures || [],
          reviews: hotel.reviews ? hotel.reviews.map(review => ({
            text: typeof review === 'string' ? review : review.text,
            author: typeof review === 'object' ? review.author : 'Guest',
            rating: typeof review === 'object' ? review.rating : 4
          })) : [],
          allergyAmenities: (hotel.allergyFeatures || []).map((feature: string) => ({
            icon: '✅',
            text: feature
          })),
          amenities: hotel.allergyFeatures || []
        };
      });
      
      console.log('🔍 FINAL CONVERSION RESULTS:');
      console.log(`- Converted hotels count: ${convertedHotels.length}`);
      console.log('- Final hotels array:', JSON.stringify(convertedHotels, null, 2));
      console.log('- First converted hotel:', convertedHotels[0] || 'NO CONVERTED HOTELS');
      
      return convertedHotels;
      
    } catch (error) {
      console.error('❌ Error in searchWithGPT:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }
}

// יצוא מופע יחיד
export const hybridSearch = new HybridHotelSearch();