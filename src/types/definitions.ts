

export type DestinationId = 
  | 'london' | 'paris' | 'barcelona' | 'cyprus' | 'rome' | 'abu-dhabi' | 'crete' 
  | 'tokyo' | 'thailand' | 'hotel-chains' | 'new-york' | 'portugal' | 'swiss-alps' 
  | 'koh-samui' | 'turkey' | 'cruise-lines' | 'toronto' | 'ayia-napa' | 'tuscany' 
  | 'gluten-free-europe' | 'athens' | 'eilat';

export type LanguageCode = 'en' | 'he' | 'ar' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'tr' | 'el';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle?: string;
  image?: string;
}

export interface Hotel {
  id?: string;
  name: string;
  description: string;
  rating?: number;
  specialDiets?: string[];
  features?: string[];
  bookingUrl?: string;
  guestReview?: string;
  website?: string;
  location?: string;
  address?: string;
  quote?: string;
  image?: string;
  allergenFriendly?: string[];
  amenities?: string[];
  isPurelyAllergyFriendly?: boolean;
  stars?: number;
  priceRange?: string;
  reviews?: Array<{
    text: string;
    author: string;
    rating: number;
  }>;
}

export interface Restaurant {
  id?: string;
  name: string;
  description: string;
  rating?: number;
  features?: string[];
  isPurelyAllergyFriendly?: boolean;
  guestReview?: string;
  website?: string;
  location?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

export interface DestinationContent {
  intro?: string | string[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  faqs?: FAQ[];
  languageTable?: LanguageTable;
  tips?: string[];
  longDescription?: string;
  bonusTools?: any;
  highlights?: string[];
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  created_at: string;
  author_name?: string;
  destination?: string;
  traveler_type?: string;
}

export const sortOptions = ['newest', 'rating', 'oldest', 'highestRated', 'lowestRated'] as const;

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'עברית' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'el', name: 'Ελληνικά' }
];

