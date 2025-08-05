
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
import { airlinesContent } from './destination-airlines';
import { amsterdamContent } from './destination-amsterdam';
import { italyContent } from './destination-italy';

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
  'airlines': airlinesContent,
  'amsterdam': amsterdamContent,
  'italy': italyContent
};
