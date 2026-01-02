export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  openNow?: boolean;
  priceLevel?: number;
  mapsUrl: string;
  reviewSnippet?: ReviewSnippet | null;
  confidenceLevel: ConfidenceLevel;
}

export interface RestaurantSearchResponse {
  destination: string;
  mode: 'Restaurants';
  queryPhrase: string;
  places: RestaurantInfo[];
  fallbackUrl: string;
  error?: string;
}
