
export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string;
}

export interface Hotel {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  image?: string;
  websiteUrl?: string;
  bookingUrl?: string;
  address?: string;
  location?: string;
  phone?: string;
  email?: string;
  amenities?: string[];
  features?: string[];
  allergyInfo?: string;
  reviews?: Review[];
  quote?: string;
  allergenFriendly?: string[];
  isPurelyAllergyFriendly?: boolean;
  stars?: number;
  rating?: number;
  priceRange?: string;
}

export interface Review {
  id?: string;
  author: string;
  author_name?: string;
  rating: number;
  comment?: string;
  text?: string;
  created_at?: string;
  destination?: string;
  traveler_type?: string;
  language?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TravelTip {
  title: string;
  content: string;
}

export interface LanguageTableRow {
  phrase: string;
  translation: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

export interface DestinationContent {
  intro: string | string[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  faqs?: FAQ[];
  tips?: TravelTip[];
  languageTable?: LanguageTable;
  longDescription?: string;
}

export interface Restaurant {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
  website?: string;
  address?: string;
  location?: string;
  phone?: string;
  email?: string;
  cuisine?: string;
  allergyInfo?: string;
  reviews?: Review[];
  features?: string[];
  guestReview?: string;
  isPurelyAllergyFriendly?: boolean;
}

export type LanguageCode = 'en' | 'he';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'עברית' }
];

export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

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
  | 'athens'
  | 'eilat'
  | 'airlines';
