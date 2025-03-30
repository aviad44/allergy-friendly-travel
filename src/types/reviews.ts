
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
