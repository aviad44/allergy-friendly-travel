
import { DestinationId, Destination, DestinationContent, Hotel, FAQ, LanguageCode, Review, sortOptions, languages } from './definitions';

// Add the missing exports that are referenced in components
export type { Destination, DestinationContent, Hotel, FAQ, LanguageCode, Review, DestinationId };
export { sortOptions, languages };

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

// Mock destination data mapping - export it here for backwards compatibility but
// we're using the real destination-data.ts file
export { destinationData } from '@/data/destination-data';
