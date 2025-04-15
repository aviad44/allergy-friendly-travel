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
  intro: "Turkey is a popular destination offering numerous allergy-friendly resorts and hotels, particularly in regions like Antalya and Belek. Many establishments here have experience catering to international guests with dietary restrictions. From all-inclusive resorts to boutique hotels, you'll find accommodations that understand and accommodate food allergies and sensitivities.",
  hotels: [],
  faqs: [
    {
      question: "Are Turkish hotels well-equipped to handle food allergies?",
      answer: "Many Turkish hotels, especially in tourist areas, are experienced in handling food allergies. Most upscale and international chain hotels have staff trained in allergen awareness and offer allergen-free menu options."
    },
    {
      question: "What should I know about dining with allergies in Turkey?",
      answer: "Turkish cuisine naturally offers many options for different dietary restrictions. Many dishes are naturally gluten-free, and restaurants are generally willing to accommodate special requests. It's recommended to carry an allergy translation card in Turkish."
    }
  ],
  languageTable: {
    headers: ["English", "Turkish"],
    rows: [
      ["I have a food allergy", "Gıda alerjim var"],
      ["Please no nuts", "Lütfen fıstık/kuruyemiş koymayın"],
      ["Is this gluten-free?", "Gluten içeriyor mu?"]
    ]
  }
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
