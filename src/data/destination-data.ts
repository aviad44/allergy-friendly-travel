
import { DestinationContent, Hotel, FAQ, DestinationId } from '@/types/definitions';
import { tuscanyContent } from './destination-tuscany';
import { genericFaqs, genericIntro } from './generic-content';

// Mock data for missing imports
// These would normally be imported from their respective files
const londonData: Partial<DestinationContent> = {
  intro: "London offers many allergy-friendly hotels and restaurants.",
  hotels: [],
  faqs: []
};

const parisData: Partial<DestinationContent> = {
  intro: "Paris offers many allergy-friendly hotels and restaurants.",
  hotels: [],
  faqs: []
};

const barcelonaHotels: Hotel[] = [];
const cyprusHotels: Hotel[] = [];
const abudhabiHotels: Hotel[] = [];
const creteHotels: Hotel[] = [];
const tokyoContent: Partial<DestinationContent> = { intro: "", hotels: [], faqs: [] };
const thailandHotels: Hotel[] = [];
const hotelChainsInfo: Hotel[] = [];
const newYorkHotels: Hotel[] = [];
const portugalHotels: Hotel[] = [];
const swissAlpsContent: Partial<DestinationContent> = { intro: "", hotels: [], faqs: [] };
const kohSamuiContent: Partial<DestinationContent> = { intro: "", hotels: [], faqs: [] };
const turkeyHotels: Hotel[] = [];
const cruiseLinesInfo: Hotel[] = [];
const cruiseLinesFaqs: FAQ[] = [];
const cruiseLinesIntro: string = "";
const torontoContent: Partial<DestinationContent> = { intro: "", hotels: [], faqs: [] };
const ayiaNapaHotels: Hotel[] = [];

export const destinationData: Record<DestinationId, Partial<DestinationContent>> = {
  london: londonData,
  paris: parisData,
  barcelona: {
    hotels: barcelonaHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
  cyprus: {
    hotels: cyprusHotels,
    faqs: genericFaqs,
    intro: genericIntro
  },
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
