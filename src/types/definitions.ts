
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

export const languages = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  tr: 'Türkçe',
  el: 'Ελληνικά'
};
