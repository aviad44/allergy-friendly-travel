export interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
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
}

export interface RestaurantSearchResponse {
  destination: string;
  mode: 'Restaurants';
  queryPhrase: string;
  places: RestaurantInfo[];
  fallbackUrl: string;
  error?: string;
}
