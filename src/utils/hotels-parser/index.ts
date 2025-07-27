
import { ParsedHotel, ReviewInfo } from './types';
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
          
          // Try to extract multiple reviews
          const allReviews: ReviewInfo[] = [];
          if (review) allReviews.push(review);
          
          // Look for additional reviews in the entry
          const additionalReviewPatterns = [
            /"([^"]{30,})"/g,
            /💬[^"]*"([^"]{20,})"/g
          ];
          
          for (const pattern of additionalReviewPatterns) {
            const matches = entry.matchAll(pattern);
            for (const match of matches) {
              const reviewText = match[1]?.trim();
              if (reviewText && 
                  !allReviews.find(r => r.text === reviewText) &&
                  !reviewText.toLowerCase().includes('hotel name') &&
                  !reviewText.toLowerCase().includes('booking') &&
                  reviewText.length > 20) {
                allReviews.push({
                  text: reviewText,
                  rating: 4
                });
              }
            }
          }
          const location = extractLocation(entry);
          
          const hotel: ParsedHotel = {
            name,
            location: location || '',
            starRating,
            rating,
            address: '',  // Address is optional and defaults to location
            allergyFeatures,
            url: extractUrl(entry),
            reviews: allReviews,
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
