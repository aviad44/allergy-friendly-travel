
export type DestinationId = 
  | 'london'
  | 'paris'
  | 'barcelona'
  | 'cyprus' 
  | 'rome'
  | 'abu-dhabi'
  | 'crete'
  | 'tokyo'
  | 'thailand'
  | 'hotel-chains'
  | 'new-york'
  | 'portugal'
  | 'swiss-alps'
  | 'koh-samui'
  | 'turkey'
  | 'cruise-lines'
  | 'toronto'
  | 'ayia-napa'
  | 'tuscany'
  | 'gluten-free-europe'
  | 'munich'
  | 'athens';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string;
}

export interface Hotel {
  name: string;
  features: string[];
  rating?: number;
  location?: string;
  image?: string;
  address: string;
  description?: string;
  quote?: string;
  bookingUrl: string;
  reviews?: {
    text: string;
    author: string;
    rating: number;
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  isPurelyAllergyFriendly: boolean;
  features: string[];
  location: string;
  website?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  guestReview?: string;
}

export interface BonusTool {
  name: string;
  description: string;
  link: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author_name: string;
  created_at: string;
  destination?: string;
  traveler_type?: string;
  language: string;
}

export interface DestinationContent {
  intro: string | string[];
  hotels: Hotel[];
  restaurants?: Restaurant[];
  faqs: FAQ[];
  languageTable?: LanguageTable;
  tips?: string[];
  bonusTools?: BonusTool[];
  highlights?: string[]; // Add the missing highlights property
}

export type LanguageCode = 'en' | 'fr' | 'de' | 'es' | 'it' | 'he';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'he', name: 'Hebrew' }
];

export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
