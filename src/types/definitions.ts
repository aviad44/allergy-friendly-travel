
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
  | 'abu-dhabi'
  | 'thailand'  // Added 'thailand' to fix the destination-data.ts error
  | 'portugal'  // Added 'portugal' to fix the destination-data.ts error
  | 'koh-samui'; // Added to support Thailand destinations

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

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  features: string[];
  guestReview?: string;
  isPurelyAllergyFriendly: boolean;
  website?: string;
  contactInfo?: string; // Added to fix destination-athens errors
}

export interface DestinationContent {
  hotels?: Hotel[];
  faqs?: FAQ[];
  intro?: string | string[];
  tips?: string[];
  restaurants?: Restaurant[];
  longDescription?: string;
  languageTable?: {
    headers: string[];
    rows: string[][];
  };
  bonusTools?: BonusTool[]; // Updated to use proper type for bonusTools
}

// Add BonusTool interface for bonusTools property
export interface BonusTool {
  name: string;
  description: string;
  link: string;
}

// Add Review and sortOptions types for the review components
export interface Review {
  id: string;
  author_name: string;
  created_at: string;
  destination?: string;
  traveler_type?: string;
  text: string;
  rating: number;
  language?: string;
}

export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

// Add languages array for DestinationNavigation.tsx
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' }
];
