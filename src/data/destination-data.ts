
import { DestinationContent, Hotel, FAQ, DestinationId } from '@/types/definitions';
import { tuscanyContent } from './destination-tuscany';
import { genericFaqs, genericIntro } from './generic-content';
import { swissAlpsContent } from './destination-swiss-alps';
import { kohSamuiContent } from './destination-koh-samui';
import { tokyoContent } from './destination-tokyo';
import { torontoContent } from './destination-toronto';
import { parisContent } from './destination-paris';
import { barcelonaContent } from './destination-barcelona';
import { cyprusContent } from './destination-cyprus';

// Mock data for missing imports
// These would normally be imported from their respective files
const londonData: Partial<DestinationContent> = {
  intro: "London offers many allergy-friendly hotels and restaurants.",
  hotels: [],
  faqs: []
};

// Create empty arrays with the right types
const abudhabiHotels: Hotel[] = [];
const creteHotels: Hotel[] = [];
const thailandHotels: Hotel[] = [];
const hotelChainsInfo: Hotel[] = [];
const newYorkHotels: Hotel[] = [];
const portugalHotels: Hotel[] = [];
const turkeyHotels: Hotel[] = [];
const cruiseLinesInfo: Hotel[] = [];
const cruiseLinesFaqs: FAQ[] = [];
const cruiseLinesIntro: string = "";
const ayiaNapaHotels: Hotel[] = [];

export const destinationData: Record<DestinationId, Partial<DestinationContent>> = {
  london: londonData,
  paris: parisContent,
  barcelona: barcelonaContent,
  cyprus: cyprusContent,
  'abu-dhabi': {
    hotels: abudhabiHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  crete: {
    hotels: creteHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  tokyo: tokyoContent,
  thailand: {
    hotels: thailandHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  'hotel-chains': {
    hotels: hotelChainsInfo,
    faqs: genericFaqs,
    intro: genericIntro
  },
  'new-york': {
    hotels: newYorkHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  portugal: {
    hotels: portugalHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  'swiss-alps': swissAlpsContent,
  'koh-samui': kohSamuiContent,
  turkey: {
    hotels: turkeyHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  'cruise-lines': {
    hotels: cruiseLinesInfo,
    faqs: cruiseLinesFaqs,
    intro: cruiseLinesIntro
  },
  toronto: torontoContent,
  'ayia-napa': {
    hotels: ayiaNapaHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  'tuscany': tuscanyContent
};
