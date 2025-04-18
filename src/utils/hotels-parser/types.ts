
export interface ParsedHotel {
  name: string;
  location: string;
  starRating: string;
  rating: number;
  address: string;
  allergyFeatures: string[];
  url: string;
  reviews: string[];
  description: string;
}

// Updated type definitions for our extractors with more specific return types
export type HotelNameExtractor = (entry: string) => string;
export type LocationExtractor = (entry: string) => string;
export type StarRatingExtractor = (entry: string) => string;
export type AllergyFeaturesExtractor = (entry: string) => string[];
export type UrlExtractor = (entry: string) => string;
export type ReviewExtractor = (entry: string) => string | null;

// For backward compatibility
export type HotelExtractor = (entry: string) => string | string[] | null;
