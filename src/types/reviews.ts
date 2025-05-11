// This file re-exports everything from the new structure
// to maintain backward compatibility with existing imports

export type {
  DestinationId,
  Destination,
  Hotel,
  FAQ,
  LanguageTable,
  Review,
  DestinationContent,
  LanguageCode
} from './definitions';

export { languages, sortOptions } from './definitions';
export { destinations } from '@/data/destinations-list';
export { destinationData } from '@/data/destination-data';

// Add Tuscany to DestinationId type
export type DestinationId = 
  'london' | 
  'paris' | 
  'barcelona' | 
  'cyprus' | 
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
  'tuscany';
