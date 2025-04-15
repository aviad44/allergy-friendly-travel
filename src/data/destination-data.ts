
import { DestinationId, DestinationContent } from '@/types/definitions';
import { parisContent } from './destination-paris';
import { tokyoContent } from './destination-tokyo';
import { swissAlpsContent } from './destination-swiss-alps';
import { kohSamuiContent } from './destination-koh-samui';
import { 
  genericDestinationContent,
  londonContent,
  barcelonaContent,
  cyprusContent,
  abuDhabiContent,
  creteContent,
  thailandContent,
  hotelChainsContent,
  newYorkContent,
  ayiaNapaContent,
  portugalContent
} from './destination-generic';

// Log the content of destinations for debugging
console.log('Paris content:', parisContent);
console.log('Tokyo content:', tokyoContent);
console.log('Swiss Alps content:', swissAlpsContent);
console.log('London content:', londonContent);

// Create a basic content for Turkey
const turkeyContent: DestinationContent = {
  intro: "Turkey offers numerous allergy-friendly all-inclusive resorts perfect for travelers with dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

export const destinationData: Record<DestinationId, DestinationContent> = {
  london: londonContent,
  paris: parisContent,
  barcelona: barcelonaContent,
  cyprus: cyprusContent,
  'abu-dhabi': abuDhabiContent,
  crete: creteContent,
  tokyo: tokyoContent,
  thailand: thailandContent,
  'hotel-chains': hotelChainsContent,
  'new-york': newYorkContent,
  'ayia-napa': ayiaNapaContent,
  portugal: portugalContent,
  'swiss-alps': swissAlpsContent,
  'koh-samui': kohSamuiContent,
  'turkey': turkeyContent
};
