
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
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'he', name: 'עברית' }
] as const;

export const destinations = ['Paris', 'London', 'Rome', 'Barcelona', 'Amsterdam'] as const;
export const travelerTypes = ['family', 'couple', 'solo', 'friends'] as const;
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
