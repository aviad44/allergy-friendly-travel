
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
  website?: string;
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
  guestReview?: string;
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
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro: string | string[] | {
    title?: string;
    description?: string;
    quickTip?: string;
  };
  imageUrl?: string;
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  faqs?: FAQ[];
  tips?: TravelTip[];
  travelTips?: Array<{
    title: string;
    description: string;
  }>;
  languageTable?: LanguageTable;
  longDescription?: string;
  highlights?: string[];
  bonusTools?: Array<{
    name: string;
    description: string;
    link: string;
  }>;
}

export interface Restaurant {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  website?: string;
  websiteUrl?: string;
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
  contactInfo?: {
    phone?: string;
    email?: string;
  };
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
  | 'airlines'
  | 'amsterdam'
  | 'italy'
  | 'stockholm'
  | 'rhodes'
  | 'madrid'
  | 'flying-with-epipens'
  | 'flying-with-epipens-north-america';
