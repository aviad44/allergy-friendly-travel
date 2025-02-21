
export interface Review {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  author_name: string;
  language: string;
  destination?: string;
  traveler_type?: 'family' | 'couple' | 'solo' | 'friends';
}

export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'he';

export const languages = [
  { code: 'en' as const, name: 'English' },
  { code: 'fr' as const, name: 'Français' },
  { code: 'es' as const, name: 'Español' },
  { code: 'de' as const, name: 'Deutsch' },
  { code: 'he' as const, name: 'עברית' }
] as const;

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
}

export const destinations = [
  { id: 'paris', name: 'Paris', country: 'France', image: 'photo-1502602898657-3e91760cbb34' },
  { id: 'london', name: 'London', country: 'United Kingdom', image: 'photo-1513635269975-59663e0ac1ad' },
  { id: 'crete', name: 'Crete', country: 'Greece', image: 'photo-1482938289607-e9573fc25ebb' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', image: 'photo-1501854140801-50d01698950b' },
  { id: 'ayia-napa', name: 'Ayia Napa', country: 'Cyprus', image: 'photo-1472396961693-142e6e269027' }
] as const;

export const travelerTypes = ['family', 'couple', 'solo', 'friends'] as const;
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

export type TravelerType = typeof travelerTypes[number];
export type SortOption = typeof sortOptions[number];
export type DestinationId = typeof destinations[number]['id'];
