
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

// Create a comprehensive content for Turkey with hotel data
const turkeyContent: DestinationContent = {
  intro: "Turkey is a popular destination offering numerous allergy-friendly resorts and hotels, particularly in regions like Antalya and Belek. Many establishments here have experience catering to international guests with dietary restrictions. From all-inclusive resorts to boutique hotels, you'll find accommodations that understand and accommodate food allergies and sensitivities.",
  hotels: [
    {
      name: "1. Voyage Belek Golf & Spa ★★★★★",
      address: "Belek Mh., Acısu Cd. 128/3, 07500 Belek/Antalya, Turkey",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergy menus", "👨‍🍳 Allergen-trained kitchen staff"],
      description: "This all-inclusive resort offers dedicated allergen menus and has kitchen staff trained to handle food allergies. They provide gluten-free, dairy-free, and nut-free options across their multiple restaurants.",
      quote: "The chefs personally prepared gluten-free Turkish bread for me each morning - a truly exceptional experience! – Anna S.",
      bookingUrl: "https://www.voyagehotel.com/voyage-belek"
    },
    {
      name: "2. Regnum Carya Golf & Spa Resort ★★★★★",
      address: "Kadriye, Üçkum Tepesi, D:1, 07525 Belek/Antalya, Turkey",
      features: ["⭐ 5-star luxury", "🍽️ Comprehensive allergy protocols", "🥗 Specialized dietary options"],
      description: "Regnum Carya offers extensive allergy-friendly dining options across its seven restaurants. Their kitchen staff is well-trained in preventing cross-contamination and can accommodate multiple dietary restrictions.",
      quote: "As a celiac traveler, I felt completely safe dining at all their restaurants. The staff was knowledgeable and attentive. – Michael R.",
      bookingUrl: "https://www.regnumhotels.com/en/regnum-carya/"
    },
    {
      name: "3. Titanic Deluxe Golf Belek ★★★★★",
      address: "Kadriye Mahallesi Taşlıburun, Titanic Alley No:5, 07525 Antalya, Turkey",
      features: ["⭐ 5-star resort", "🍽️ Allergy-aware dining", "🍞 Gluten-free bakery options"],
      description: "Titanic Deluxe Golf Belek offers specialized menus for guests with food allergies. Their main restaurant has a designated allergy-friendly section, and they can prepare meals tailored to specific dietary requirements.",
      quote: "They had amazing gluten-free and dairy-free options. The staff was very attentive to my allergies! – Jennifer T.",
      bookingUrl: "https://www.titanic.com.tr/titanicdeluxebelek/"
    },
    {
      name: "4. Calista Luxury Resort ★★★★★",
      address: "Taşlıburun Mevkii Belek, 07525 Antalya, Turkey",
      features: ["⭐ 5-star luxury", "👨‍🍳 Allergen training for all food staff", "🥗 Multiple dietary options"],
      description: "Calista Luxury Resort has implemented comprehensive allergen training for all food service staff. They offer clearly labeled menu options for common allergens and can customize meals based on individual dietary needs.",
      quote: "Their attention to detail regarding my nut allergy was impressive. Every restaurant had allergen information readily available. – David K.",
      bookingUrl: "https://www.calista.com.tr/en/"
    }
  ],
  faqs: [
    {
      question: "Are Turkish hotels well-equipped to handle food allergies?",
      answer: "Many Turkish hotels, especially in tourist areas, are experienced in handling food allergies. Most upscale and international chain hotels have staff trained in allergen awareness and offer allergen-free menu options."
    },
    {
      question: "What should I know about dining with allergies in Turkey?",
      answer: "Turkish cuisine naturally offers many options for different dietary restrictions. Many dishes are naturally gluten-free, and restaurants are generally willing to accommodate special requests. It's recommended to carry an allergy translation card in Turkish."
    },
    {
      question: "Which areas in Turkey are best for allergy-friendly accommodations?",
      answer: "The Antalya region, particularly Belek, has numerous high-end resorts with international standards for allergy accommodations. Istanbul's luxury hotels also typically have good protocols for dietary restrictions."
    }
  ],
  languageTable: {
    headers: ["English", "Turkish"],
    rows: [
      ["I have a food allergy", "Gıda alerjim var"],
      ["Please no nuts", "Lütfen fıstık/kuruyemiş koymayın"],
      ["Is this gluten-free?", "Gluten içeriyor mu?"],
      ["I cannot eat dairy", "Süt ürünleri yiyemiyorum"],
      ["I have celiac disease", "Çölyak hastasıyım"]
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
