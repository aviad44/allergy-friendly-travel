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
    
    // חיפוש במלונות קיימים
    Object.entries(destinationData).forEach(([key, destination]) => {
      const destinationContent = destination as DestinationContent;
      if (destinationContent.hotels && this.isDestinationMatch(key, filters.destination)) {
        destinationContent.hotels.forEach(hotel => {
          if (this.isAllergyFriendly(hotel, filters.allergies)) {
            const intro = Array.isArray(destinationContent.intro) ? 
              destinationContent.intro.join(' ') : 
              destinationContent.intro || '';
            matchingHotels.push(this.convertToHotelInfo(hotel, intro));
          }
        });
      }
    });
    
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
    
    // בדיקה מעמיקה יותר בביקורות האמיתיות של אורחים עם אלרגיות
    const hasAllergyReviews = hotel.reviews?.some((review: any) => 
      review.guestReview && (
        review.guestReview.toLowerCase().includes(allergyLower) ||
        review.guestReview.toLowerCase().includes('allergy') ||
        review.guestReview.toLowerCase().includes('celiac') ||
        review.guestReview.toLowerCase().includes('gluten') ||
        review.guestReview.toLowerCase().includes('dairy') ||
        review.guestReview.toLowerCase().includes('nut')
      )
    );
    
    // בדיקה במידע האלרגיה והתכונות
    const hasAllergyInfo = hotel.allergyInfo?.toLowerCase().includes(allergyLower) ||
           hotel.allergenFriendly?.some((allergen: string) => 
             allergen.toLowerCase().includes(allergyLower)) ||
           hotel.features?.some((feature: string) => 
             feature.toLowerCase().includes('allergy') || 
             feature.toLowerCase().includes('gluten') ||
             feature.toLowerCase().includes(allergyLower));
    
    return hasAllergyReviews || hasAllergyInfo;
  }
  
  private convertToHotelInfo(hotel: Hotel, destinationInfo: string): HotelInfo {
    // שימוש בביקורות האמיתיות של אורחים עם אלרגיות
    const allergyReviews = hotel.reviews?.filter((review: any) => 
      review.guestReview && (
        review.guestReview.toLowerCase().includes('allergy') ||
        review.guestReview.toLowerCase().includes('celiac') ||
        review.guestReview.toLowerCase().includes('gluten') ||
        review.guestReview.toLowerCase().includes('dairy') ||
        review.guestReview.toLowerCase().includes('nut')
      )
    ) || [];

    return {
      name: hotel.name,
      location: hotel.location || hotel.address || '',
      description: hotel.description || hotel.allergyInfo || destinationInfo,
      url: hotel.website || hotel.websiteUrl || hotel.bookingUrl,
      rating: hotel.rating || hotel.stars || 4,
      starRating: hotel.stars ? `${hotel.stars} stars` : '4 stars',
      allergyFeatures: hotel.allergenFriendly || hotel.features || [],
      // עדיפות לביקורות עם אלרגיות, אחר כך כל השאר
      reviews: [
        ...allergyReviews.map((review: any) => ({
          text: review.guestReview || review.text || review.comment || '',
          author: review.author || review.author_name || 'אורח מאומת עם אלרגיות',
          rating: review.rating || 5,
          isAllergyReview: true
        })),
        ...hotel.reviews?.filter((review: any) => !allergyReviews.includes(review))
          .map((review: any) => ({
            text: review.text || review.comment || review.guestReview || '',
            author: review.author || review.author_name || 'Verified Guest',
            rating: review.rating || 4,
            isAllergyReview: false
          })) || []
      ],
      allergyAmenities: hotel.allergenFriendly?.map((feature: string) => ({
        icon: '✅',
        text: feature
      })) || [],
      amenities: hotel.amenities || hotel.features || []
    };
  }
  
  // חיפוש מהיר עם נתונים אמיתיות + GPT כגיבוי
  async search(filters: SearchFilters): Promise<HotelInfo[]> {
    console.log('🔍 Starting hybrid search for:', filters);
    
    // שלב 1: חיפוש במאגר הקיים
    const existingHotels = this.searchExistingData(filters);
    console.log(`✅ Found ${existingHotels.length} hotels in existing data`);
    
    if (existingHotels.length >= 3) {
      // יש מספיק תוצאות - החזר מיידיות
      return existingHotels.slice(0, 8);
    }
    
    // שלב 2: אם אין מספיק תוצאות, השלם עם GPT
    try {
      const gptHotels = await this.searchWithGPT(filters);
      console.log(`🤖 GPT added ${gptHotels.length} additional hotels`);
      
      // שלב תוצאות - קודם הקיימות, אחר כך GPT
      const combinedResults = [...existingHotels, ...gptHotels];
      return combinedResults.slice(0, 10);
      
    } catch (error) {
      console.warn('GPT search failed, returning existing results:', error);
      return existingHotels;
    }
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