
export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string;
}

export interface DestinationContent {
  hotels: Hotel[];
  faqs: FAQ[];
  intro: string | string[];
  languageTable?: LanguageTable;
}

export interface Hotel {
  name: string;
  location: string;
  starRating: string;
  rating: number;
  address: string;
  allergyFeatures: string[];
  url: string;
  reviews: Review[] | string[];
  description: string;
  imageUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

export type LanguageCode = 'en' | 'he';

export type DestinationId = 
  | 'london'
  | 'paris'
  | 'barcelona' 
  | 'cyprus'
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
  | 'rome';

// Add the missing exports that are referenced in components
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

export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' }
];

// Mock destinations data used by components
export const destinations: Destination[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    description: 'Best Allergy-Friendly Hotels in London',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Best Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    description: 'Top 5 Allergy-Friendly Hotels in Rome',
    subtitle: 'Safe & Comfortable Stays for Travelers with Food Sensitivities'
  },
  // Add other destinations as needed
];

// Mock destination data mapping
export const destinationData: Record<DestinationId, DestinationContent> = {} as Record<DestinationId, DestinationContent>;
