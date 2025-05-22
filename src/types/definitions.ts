export type LanguageCode = 'en' | 'he';

export type DestinationId =
  'london' |
  'paris' |
  'barcelona' |
  'cyprus' |
  'rome' |
  'abu-dhabi' |
  'crete' |
  'tokyo' |
  'thailand' |
  'hotel-chains' |
  'new-york' |
  'portugal' |
  'swiss-alps' |
  'koh-samui' |
  'turkey' |
  'cruise-lines' |
  'toronto' |
  'ayia-napa' |
  'tuscany' |
  'gluten-free-europe' |
  'athens' |
  'eilat' |
  'dubai' |
  'amsterdam' |
  'santorini' |
  'bali' |
  'cancun' |
  'venice' |
  'florence' |
  'prague' |
  'budapest' |
  'vienna' |
  'munich' |
  'singapore' |
  'sydney' |
  'cape-town' |
  'rio-de-janeiro' |
  'seoul' |
  'hong-kong' |
  'bangkok' |
  'istanbul' |
  'kyoto' |
  'auckland' |
  'seville' |
  'marrakech' |
  'cairo' |
  'dublin' |
  'nice' |
  'porto' |
  'lisbon' |
  'tel-aviv';

export interface Destination {
  id: DestinationId;
  name: string;
  description: string;
  image?: string;
}

export interface Hotel {
  name: string;
  description: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  website?: string;
  phone?: string;
  address?: string;
  specialDiets?: string[];
  reviews?: string[];
}

export interface Restaurant {
  name: string;
  description: string;
  location?: string;
  cuisine?: string;
  rating?: number;
  priceRange?: string;
  menuLink?: string;
  phone?: string;
  address?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LanguageTableRow {
  phrase: string;
  translation: string;
}

export interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  restaurants: Restaurant[];
  faqs: FAQ[];
  tips: string[];
  languageTable: {
    headers: string[];
    rows: string[][];
  };
  longDescription: string;
}

export type SortByType = 'newest' | 'rating';

export const sortOptions = [
  'newest',
  'rating'
] as const;

export interface Review {
  id: string;
  created_at: string;
  destination: string;
  text: string;
  rating: number;
  traveler_type: string;
}
