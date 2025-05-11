import { DestinationContent, Hotel, FAQ } from '@/types/reviews';
import { londonData } from './london-data';
import { parisData } from './paris-data';
import { barcelonaHotels } from './barcelona-hotels';
import { cyprusHotels } from './cyprus-hotels';
import { abudhabiHotels } from './abudhabi-hotels';
import { creteHotels } from './crete-hotels';
import { tokyoContent } from './tokyo-content';
import { thailandHotels } from './thailand-hotels';
import { hotelChainsInfo } from './hotel-chains-info';
import { newYorkHotels } from './new-york-hotels';
import { portugalHotels } from './portugal-hotels';
import { swissAlpsContent } from './swiss-alps-content';
import { kohSamuiContent } from './koh-samui-content';
import { turkeyHotels } from './turkey-hotels';
import { cruiseLinesInfo } from './cruise-lines-info';
import { cruiseLinesFaqs } from './cruise-lines-faqs';
import { cruiseLinesIntro } from './cruise-lines-intro';
import { torontoContent } from './toronto-content';
import { ayiaNapaHotels } from './ayia-napa-hotels';
import { genericFaqs, genericIntro } from './generic-content';
import { tuscanyContent } from './destination-tuscany';
import { DestinationId } from '@/types/reviews';

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
