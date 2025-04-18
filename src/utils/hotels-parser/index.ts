
import { ParsedHotel } from './types';
import {
  extractHotelName,
  extractLocation,
  extractStarRating,
  extractAllergyFeatures,
  extractUrl,
  extractReview
} from './extractors';
import {
  cleanMarkdownEntry,
  splitHotelEntries,
  generateHotelDescription
} from './helpers';

export const parseHotelsFromMarkdown = (markdownText: string): ParsedHotel[] => {
  try {
    console.log('Parsing markdown text:', markdownText.substring(0, 200) + '...');
    
    const cleanedText = cleanMarkdownEntry(markdownText);
    const hotelEntries = splitHotelEntries(cleanedText);
    
    console.log(`Processing ${hotelEntries.length} hotel entries`);
    
    return hotelEntries
      .filter(entry => entry.trim().length > 0)
      .map(entry => {
        try {
          const name = extractHotelName(entry);
          const starRating = extractStarRating(entry);
          const rating = (starRating.match(/⭐/g) || []).length || parseFloat(starRating) || 0;
          const allergyFeatures = extractAllergyFeatures(entry);
          const review = extractReview(entry);
          
          const hotel: ParsedHotel = {
            name,
            location: extractLocation(entry) || '',
            starRating,
            rating,
            address: '',  // Address is optional and defaults to location
            allergyFeatures,
            url: extractUrl(entry),
            reviews: review ? [review] : [],
            description: generateHotelDescription(allergyFeatures, entry)
          };

          console.log(`Successfully parsed hotel: ${name}`);
          return hotel;
        } catch (error) {
          console.error('Error parsing hotel entry:', error);
          return null;
        }
      })
      .filter(Boolean) as ParsedHotel[];
  } catch (error) {
    console.error('Error in parseHotelsFromMarkdown:', error);
    return [];
  }
};

export * from './types';
