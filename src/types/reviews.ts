
export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'he';

export const languages = [
  { code: 'en' as const, name: 'English' },
  { code: 'fr' as const, name: 'Français' },
  { code: 'es' as const, name: 'Español' },
  { code: 'de' as const, name: 'Deutsch' },
  { code: 'he' as const, name: 'עברית' }
];

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  subtitle: string;
}

export const destinations = [
  { 
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'photo-1502602898657-3e91760cbb34',
    description: 'The Best Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe & Comfortable Stays for Food-Sensitive Travelers'
  },
  { 
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: 'photo-1513635269975-59663e0ac1ad',
    description: 'London\'s Most Accommodating Hotels for Allergy Sufferers',
    subtitle: 'Discover comfortable and safe stays in the heart of London'
  },
  { 
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    image: 'public/lovable-uploads/f29c31c6-959c-44bf-b2de-47aa52e897d5.png',
    description: 'Allergy-Friendly Accommodations in Crete',
    subtitle: 'Experience Greek hospitality with peace of mind'
  },
  { 
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'photo-1501854140801-50d01698950b',
    description: 'Barcelona\'s Top Hotels for Dietary Requirements',
    subtitle: 'Safe and comfortable stays in the Catalan capital'
  },
  { 
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    image: 'photo-1472396961693-142e6e269027',
    description: 'Ayia Napa\'s Allergy-Conscious Resorts',
    subtitle: 'Enjoy the Mediterranean paradise worry-free'
  }
] as const;

export type DestinationId = (typeof destinations)[number]['id'];

// Re-add types and constants needed by other components
export interface Review {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  author_name: string;
  language: string;
  destination?: string;
  traveler_type?: TravelerType;
}

export type TravelerType = 'family' | 'couple' | 'solo' | 'friends';
export type SortOption = 'newest' | 'oldest' | 'highestRated' | 'lowestRated';

export const travelerTypes = ['family', 'couple', 'solo', 'friends'] as const;
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
