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
  reviews: string[];
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
