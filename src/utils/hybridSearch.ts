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
            matchingHotels.push(this.convertToHotelInfo(hotel, intro));
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
  
  private convertToHotelInfo(hotel: Hotel, destinationInfo: string): HotelInfo {
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
    
    return {
      name: hotel.name,
      location: hotel.location || hotel.address || '',
      description: hotel.description || hotel.allergyInfo || destinationInfo,
      url: hotel.website || hotel.websiteUrl || hotel.bookingUrl,
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
  
  // חיפוש מהיר עם GPT כמקור עיקרי + נתונים קיימים כגיבוי
  async search(filters: SearchFilters): Promise<HotelInfo[]> {
    console.log('🔍 Starting hybrid search for:', filters);
    
    // שלב 1: חיפוש עם GPT למידע מדויק ועדכני (מקור עיקרי)
    try {
      console.log('🚀 Searching with GPT for accurate, up-to-date results...');
      const gptHotels = await this.searchWithGPT(filters);
      console.log(`🤖 GPT found ${gptHotels.length} hotels`);
      
      if (gptHotels.length > 0) {
        // GPT מצא תוצאות - השתמש בהן כמקור עיקרי
        console.log('✅ Using GPT results as primary source');
        return gptHotels.slice(0, 10);
      }
      
      console.log('⚠️ GPT returned no results, trying existing data...');
    } catch (error) {
      console.warn('❌ GPT search failed, falling back to existing data:', error);
    }
    
    // שלב 2: גיבוי - חיפוש במאגר הקיים
    const existingHotels = this.searchExistingData(filters);
    console.log(`📚 Found ${existingHotels.length} hotels in existing data as fallback`);
    
    return existingHotels.slice(0, 8);
  }
  
  private async searchWithGPT(filters: SearchFilters): Promise<HotelInfo[]> {
    // קריאה ל-GPT רק אם צריך
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase.functions.invoke('search-with-gpt', {
      body: { 
        destination: filters.destination, 
        allergies: filters.allergies 
      }
    });
    
    if (error) throw error;
    
    // פרסינג התוצאות מ-GPT
    const { parseHotelsFromMarkdown } = await import('@/utils/hotels-parser');
    return parseHotelsFromMarkdown(data.recommendation || '');
  }
}

// יצוא מופע יחיד
export const hybridSearch = new HybridHotelSearch();