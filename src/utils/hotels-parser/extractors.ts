
import { 
  HotelNameExtractor, 
  LocationExtractor, 
  StarRatingExtractor,
  AllergyFeaturesExtractor,
  UrlExtractor,
  ReviewExtractor,
  ReviewInfo
} from './types';

export const extractHotelName: HotelNameExtractor = (entry: string): string => {
  const namePatterns = [
    /1️⃣\s*\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i,
    /\*\*Hotel Name\*\*:\s*(.*?)(?=\n|$)/i,
    /\*\*(.*?)\*\*\s*\|\s*https?:\/\//i,
    /\d+\.\s+\*\*(.*?)\*\*/i,
    /##\s+\d\.\s+(.*?)(?=\n|$)/i,
    /##\s+(.*?)(?=\n|$)/i,
    /\*\*(.*?)\*\*/i  // Last resort
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = entry.match(pattern);
    if (nameMatch?.[1]) {
      return nameMatch[1].replace(/\*\*/g, '').trim();
    }
  }
  
  // Fallback: take the first non-empty line
  const firstLine = entry.split('\n').find(line => line.trim() !== '');
  return firstLine ? firstLine.replace(/^\d+\.\s*/, '').trim() : 'Unknown Hotel';
};

export const extractLocation: LocationExtractor = (entry: string): string => {
  const locationPatterns = [
    /2️⃣\s*\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i,
    /\*\*City & Country\*\*:\s*(.*?)(?=\n|$)/i,
    /\*\*Location\*\*:\s*(.*?)(?=\n|$)/i,
    /📍\s*(.*?)(?=\n|$)/i,
    /Located in\s+(.*?)(?=\.|,|\n|$)/i
  ];
  
  for (const pattern of locationPatterns) {
    const locationMatch = entry.match(pattern);
    if (locationMatch?.[1]) {
      return locationMatch[1].replace(/\*\*/g, '').trim();
    }
  }
  
  return '';
};

export const extractStarRating: StarRatingExtractor = (entry: string): string => {
  const ratingPatterns = [
    /3️⃣\s*\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i,
    /\*\*Star Rating\*\*:\s*(.*?)(?=\n|$)/i,
    /⭐+/,
    /\d+[\s-]stars?/i
  ];
  
  for (const pattern of ratingPatterns) {
    const ratingMatch = entry.match(pattern);
    if (ratingMatch) {
      if (ratingMatch[0].includes('⭐')) {
        return ratingMatch[0];
      }
      if (ratingMatch[1]) {
        return ratingMatch[1].replace(/\*\*/g, '').trim();
      }
    }
  }
  
  return '';
};

export const extractAllergyFeatures: AllergyFeaturesExtractor = (entry: string): string[] => {
  const allergySection = entry.match(/5️⃣\s*\*\*Why This Hotel is Suitable[^]*?(?=6️⃣|\n\n|$)/i) ||
                        entry.match(/\*\*Why This Hotel is Suitable[^]*?(?=\*\*Direct|\*\*Guest|\n\n|$)/i) ||
                        entry.match(/🌟\s*Why it['']s great for[^]*?(?=💬|\n\n|$)/i) ||
                        entry.match(/[-•]\s*[A-Za-z]/);
  
  if (allergySection?.[0]) {
    return allergySection[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('*'))
      .map(line => line.replace(/^[-•*]\s*/, '').trim());
  }
  
  // Fallback: Look for key phrases
  const allergyKeywords = ['allergy', 'gluten', 'nut', 'dairy', 'wheat', 'lactose', 'free'];
  const lines = entry.split('\n');
  
  return lines
    .filter(line => {
      const lowerLine = line.toLowerCase();
      return allergyKeywords.some(keyword => lowerLine.includes(keyword)) && 
             !lowerLine.includes('hotel name') && 
             !lowerLine.includes('review');
    })
    .map(line => line.replace(/^[-•*]\s*/, '').trim());
};

export const extractUrl: UrlExtractor = (entry: string): string => {
  const urlPatterns = [
    /6️⃣\s*\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i,
    /\*\*Direct Booking Link\*\*:\s*(https?:\/\/[^\s]+)/i,
    /\*\*Hotel Website\*\*:\s*\[🔗\]\((https?:\/\/[^\s]+)\)/i,
    /\*\*Hotel Website\*\*:\s*(https?:\/\/[^\s]+)/i,
    /\[Book Now\]\((https?:\/\/[^\s]+)\)/i,
    /\[🔗 Hotel Website\]\((https?:\/\/[^\s]+)\)/i,
    /\|?\s*(https?:\/\/[^\s)]+)/i
  ];
  
  for (const pattern of urlPatterns) {
    const urlMatch = entry.match(pattern);
    if (urlMatch?.[1]) {
      return urlMatch[1].trim();
    }
  }
  
  return '';
};

export const extractReview: ReviewExtractor = (entry: string): ReviewInfo | null => {
  // Look for the review pattern and extract with simple string parsing
  const reviewMatch = entry.match(/💬 Guest Review: "([^"]+)" - ([^,\n]+)/i);
  
  if (reviewMatch && reviewMatch[1] && reviewMatch[1].length > 20) {
    return {
      text: reviewMatch[1].trim(),
      author: reviewMatch[2]?.trim() || undefined,
      rating: 4
    };
  }
  
  return null;
};
