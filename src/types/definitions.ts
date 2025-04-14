
export type DestinationId = 'london' | 'paris' | 'barcelona' | 'cyprus' | 'abu-dhabi' | 'crete' | 'tokyo' | 'thailand' | 'hotel-chains' | 'new-york' | 'ayia-napa' | 'portugal' | 'swiss-alps';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string; // Make image optional
}

export interface Hotel {
  name: string;
  address: string;
  features: string[];
  description: string;
  quote: string;
  bookingUrl: string;
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
