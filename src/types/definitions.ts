export type LanguageCode = 'en' | 'he';

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image?: string;
  subtitle?: string;
}

export type DestinationId =
  | 'london'
  | 'paris'
  | 'new-york'
  | 'tokyo'
  | 'dubai'
  | 'barcelona'
  | 'rome'
  | 'amsterdam'
  | 'santorini'
  | 'bali'
  | 'cancun'
  | 'venice'
  | 'florence'
  | 'prague'
  | 'budapest'
  | 'vienna'
  | 'munich'
  | 'singapore'
  | 'sydney'
  | 'cape-town'
  | 'rio-de-janeiro'
  | 'seoul'
  | 'hong-kong'
  | 'bangkok'
  | 'istanbul'
  | 'kyoto'
  | 'auckland'
  | 'seville'
  | 'marrakech'
  | 'cairo'
  | 'dublin'
  | 'nice'
  | 'porto'
  | 'lisbon'
  | 'crete'
  | 'cyprus'
  | 'athens'
  | 'eilat'
  | 'tel-aviv'
  | 'hotel-chains'
  | 'turkey'
  | 'toronto'
  | 'abu-dhabi';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  address: string;
  description: string;
  allergenFriendly: string[];
  amenities: string[];
  features: string[];
  rating: number;
  priceRange: string;
  imageUrl: string;
  websiteUrl: string;
  bookingUrl: string;
  guestReview?: string;
  isPurelyAllergyFriendly: boolean;
  quote?: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Add Restaurant type if it doesn't exist
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  features: string[];
  guestReview?: string;
  isPurelyAllergyFriendly: boolean;
  website?: string;
}

// Update DestinationContent to include restaurants if needed
export interface DestinationContent {
  hotels?: Hotel[];
  faqs?: FAQ[];
  intro?: string | string[];
  tips?: string[];
  // Add restaurants if not already defined
  restaurants?: Restaurant[];
  // Add longDescription if not already defined
  longDescription?: string;
  languageTable?: {
    headers: string[];
    rows: string[][];
  };
}
