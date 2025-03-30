
export interface HotelInfo {
  name: string;
  url?: string;
  accommodations?: string;
  dietary?: string;
  reviews?: string[];
  safety?: string;
  imageUrl?: string;
  rating?: number;
  price?: string;
  location?: string;
  description?: string;
  amenities?: string[];
  allergyAmenities?: {
    icon: string;
    text: string;
  }[];
}
