export type DestinationId = 'london' | 'paris' | 'barcelona' | 'cyprus' | 'abu-dhabi' | 'crete' | 'tokyo' | 'thailand' | 'hotel-chains' | 'new-york' | 'ayia-napa' | 'portugal' | 'swiss-alps' | 'koh-samui' | 'turkey' | 'cruise-lines' | 'toronto';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string; // Add the image property as optional
}

export interface Hotel {
  name: string;
  address: string;
  features: string[];
  description: string;
  quote: string;
  bookingUrl: string;
  rating?: number; // Added rating as an optional property
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
  id: string; // Changed to string only, as IDs come from database as UUID strings
  rating: number;
  text: string;
  author_name: string;
  created_at: string;
  destination?: string;
  traveler_type?: string;
  language: string;
}

export interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  faqs: FAQ[];
  languageTable: LanguageTable;
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
