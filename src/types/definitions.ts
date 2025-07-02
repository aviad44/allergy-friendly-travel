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
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  bookingUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  amenities?: string[];
  allergyInfo?: string;
  reviews?: Review[];
}

export interface Review {
  author: string;
  rating: number;
  comment: string;
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

export interface DestinationContent {
  intro: string | string[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  faqs?: FAQ[];
  tips?: TravelTip[];
  languageTable?: LanguageTableRow[];
  longDescription?: string;
}

export interface Restaurant {
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  cuisine?: string;
  allergyInfo?: string;
  reviews?: Review[];
}

export type LanguageCode = 'en' | 'he';

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
