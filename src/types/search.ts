
export interface HotelInfo {
  name: string;
  url?: string;
  accommodations?: string;
  dietary?: string;
  reviews?: string[];
  safety?: string;
  imageUrl?: string;
  rating?: number;
  starRating?: string;
  price?: string;
  location?: string;
  description?: string;
  amenities?: string[];
  allergyFeatures?: string[];
  allergyAmenities?: {
    icon: string;
    text: string;
  }[];
}
