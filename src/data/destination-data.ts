
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
import { londonContent } from './destination-london';
import { romeContent } from './destination-rome';
import { portugalContent } from './destination-portugal';
import { creteContent } from './destination-crete';
import { glutenFreeEuropeContent } from './destination-gluten-free-europe';
import { athensContent } from './destination-athens';
import { eilatContent } from './destination-eilat';
import { thailandContent } from './destination-thailand';
import { newYorkContent } from './destination-new-york';
import { ayiaNapaContent } from './destination-ayia-napa';
import { abuDhabiContent } from './destination-abu-dhabi';
import { hotelChainsContent } from './destination-hotel-chains';
import { cruiseLinesContent } from './destination-cruise-lines';
import { turkeyContent } from './destination-turkey';

// We don't need to modify the hotel objects anymore as we've added the reviews field to the Hotel interface

export const destinationData: Record<DestinationId, Partial<DestinationContent>> = {
  london: londonContent,
  paris: parisContent,
  barcelona: barcelonaContent,
  cyprus: cyprusContent,
  rome: romeContent,
  'abu-dhabi': abuDhabiContent,
  crete: creteContent,
  tokyo: tokyoContent,
  thailand: thailandContent,
  'hotel-chains': hotelChainsContent,
  'new-york': newYorkContent,
  portugal: portugalContent,
  'swiss-alps': swissAlpsContent,
  'koh-samui': kohSamuiContent,
  turkey: turkeyContent,
  'cruise-lines': cruiseLinesContent,
  toronto: torontoContent,
  'ayia-napa': ayiaNapaContent,
  'tuscany': tuscanyContent,
  'gluten-free-europe': glutenFreeEuropeContent,
  'athens': athensContent,
  'eilat': eilatContent,
  // Add all other destinations from the DestinationId type with minimal content
  // For properties we reference but don't have content for yet
  dubai: { intro: genericIntro, faqs: genericFaqs },
  amsterdam: { intro: genericIntro, faqs: genericFaqs },
  santorini: { intro: genericIntro, faqs: genericFaqs },
  bali: { intro: genericIntro, faqs: genericFaqs },
  cancun: { intro: genericIntro, faqs: genericFaqs },
  venice: { intro: genericIntro, faqs: genericFaqs },
  florence: { intro: genericIntro, faqs: genericFaqs },
  prague: { intro: genericIntro, faqs: genericFaqs },
  budapest: { intro: genericIntro, faqs: genericFaqs },
  vienna: { intro: genericIntro, faqs: genericFaqs },
  munich: { intro: genericIntro, faqs: genericFaqs },
  singapore: { intro: genericIntro, faqs: genericFaqs },
  sydney: { intro: genericIntro, faqs: genericFaqs },
  'cape-town': { intro: genericIntro, faqs: genericFaqs },
  'rio-de-janeiro': { intro: genericIntro, faqs: genericFaqs },
  seoul: { intro: genericIntro, faqs: genericFaqs },
  'hong-kong': { intro: genericIntro, faqs: genericFaqs },
  bangkok: { intro: genericIntro, faqs: genericFaqs },
  istanbul: { intro: genericIntro, faqs: genericFaqs },
  kyoto: { intro: genericIntro, faqs: genericFaqs },
  auckland: { intro: genericIntro, faqs: genericFaqs },
  seville: { intro: genericIntro, faqs: genericFaqs },
  marrakech: { intro: genericIntro, faqs: genericFaqs },
  cairo: { intro: genericIntro, faqs: genericFaqs },
  dublin: { intro: genericIntro, faqs: genericFaqs },
  nice: { intro: genericIntro, faqs: genericFaqs },
  porto: { intro: genericIntro, faqs: genericFaqs },
  lisbon: { intro: genericIntro, faqs: genericFaqs },
  'tel-aviv': { intro: genericIntro, faqs: genericFaqs }
};
