
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

export type HotelExtractor = (entry: string) => string | string[] | null;
