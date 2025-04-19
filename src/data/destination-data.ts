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
import { torontoContent } from './destination-toronto';

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
      name: "Voyage Belek Golf & Spa",
      address: "Belek Mh., Acısu Cd. 128/3, 07500 Belek/Antalya, Turkey",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergy menus", "👨‍🍳 Allergen-trained kitchen staff"],
      description: "This all-inclusive resort offers dedicated allergen menus and has kitchen staff trained to handle food allergies. They provide gluten-free, dairy-free, and nut-free options across their multiple restaurants.",
      quote: "The chefs personally prepared gluten-free Turkish bread for me each morning - a truly exceptional experience! – Anna S.",
      bookingUrl: "https://www.voyagehotel.com/voyage-belek",
      rating: 5
    },
    {
      name: "Regnum Carya Golf & Spa Resort",
      address: "Kadriye, Üçkum Tepesi, D:1, 07525 Belek/Antalya, Turkey",
      features: ["⭐ 5-star luxury", "🍽️ Comprehensive allergy protocols", "🥗 Specialized dietary options"],
      description: "Regnum Carya offers extensive allergy-friendly dining options across its seven restaurants. Their kitchen staff is well-trained in preventing cross-contamination and can accommodate multiple dietary restrictions.",
      quote: "As a celiac traveler, I felt completely safe dining at all their restaurants. The staff was knowledgeable and attentive. – Michael R.",
      bookingUrl: "https://www.regnumhotels.com/en/regnum-carya/",
      rating: 5
    },
    {
      name: "Titanic Deluxe Golf Belek",
      address: "Kadriye Mahallesi Taşlıburun, Titanic Alley No:5, 07525 Antalya, Turkey",
      features: ["⭐ 5-star resort", "🍽️ Allergy-aware dining", "🍞 Gluten-free bakery options"],
      description: "Titanic Deluxe Golf Belek offers specialized menus for guests with food allergies. Their main restaurant has a designated allergy-friendly section, and they can prepare meals tailored to specific dietary requirements.",
      quote: "They had amazing gluten-free and dairy-free options. The staff was very attentive to my allergies! – Jennifer T.",
      bookingUrl: "https://www.titanic.com.tr/titanicdeluxebelek/",
      rating: 5
    },
    {
      name: "Calista Luxury Resort",
      address: "Taşlıburun Mevkii Belek, 07525 Antalya, Turkey",
      features: ["⭐ 5-star luxury", "👨‍🍳 Allergen training for all food staff", "🥗 Multiple dietary options"],
      description: "Calista Luxury Resort has implemented comprehensive allergen training for all food service staff. They offer clearly labeled menu options for common allergens and can customize meals based on individual dietary needs.",
      quote: "Their attention to detail regarding my nut allergy was impressive. Every restaurant had allergen information readily available. – David K.",
      bookingUrl: "https://www.calista.com.tr/en/",
      rating: 5
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

// Create New York content - restored with proper data
const fixedNewYorkContent: DestinationContent = {
  intro: "New York City offers an impressive range of allergy-friendly accommodations catering to travelers with dietary restrictions. From boutique hotels to luxury establishments, many properties in the city have specially trained staff and dedicated kitchen protocols to ensure safe dining experiences for guests with food allergies, celiac disease, and other special dietary requirements.",
  hotels: [
    {
      name: "The Peninsula New York",
      address: "700 5th Ave, New York, NY 10019, United States",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-trained kitchen staff", "📋 Detailed ingredient information"],
      description: "This luxury five-star hotel offers exceptional allergy-friendly dining options across its restaurants. Their kitchen staff undergoes specialized training to handle allergens safely, and they maintain detailed ingredient information for all dishes.",
      quote: "The staff went above and beyond to accommodate my multiple food allergies. The chef personally prepared my meals and explained every ingredient. – Michelle R.",
      bookingUrl: "https://www.peninsula.com/en/new-york/5-star-luxury-hotel-midtown-nyc",
      rating: 5
    },
    {
      name: "The Park Hyatt New York",
      address: "153 W 57th St, New York, NY 10019, United States",
      features: ["⭐ 5-star luxury", "🥗 Custom allergy-free menus", "👨‍🍳 Dedicated allergy chef"],
      description: "Park Hyatt New York takes allergen management seriously with a comprehensive food allergy protocol. Their culinary team can create custom menus for guests with specific dietary requirements, and they maintain strict cross-contamination prevention measures.",
      quote: "As someone with celiac disease, I felt completely safe dining here. They have a separate prep area for gluten-free meals. – Thomas K.",
      bookingUrl: "https://www.hyatt.com/en-US/hotel/new-york/park-hyatt-new-york/nycph",
      rating: 5
    },
    {
      name: "The Langham New York",
      address: "400 5th Ave, New York, NY 10018, United States",
      features: ["⭐ 5-star luxury", "🍞 Gluten-free dining options", "🥜 Nut-free meal preparation"],
      description: "The Langham excels in accommodating dietary restrictions, with their restaurant Ai Fiori offering extensive allergy-friendly options. The hotel provides clear allergen information and can tailor dining experiences to suit individual needs.",
      quote: "They took my dairy allergy very seriously and created amazing dairy-free versions of their signature dishes. – Sarah J.",
      bookingUrl: "https://www.langhamhotels.com/en/the-langham/new-york/",
      rating: 5
    },
    {
      name: "Conrad New York Downtown",
      address: "102 North End Ave, New York, NY 10282, United States",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-free room service", "📱 Digital allergen menus"],
      description: "Conrad New York Downtown offers comprehensive allergen information for all their dining options. Their ATRIO restaurant and in-room dining services can accommodate most dietary restrictions with advance notice.",
      quote: "Their digital menu system allowed me to filter out all dishes containing my allergens. It made dining so much less stressful! – David M.",
      bookingUrl: "https://www.hilton.com/en/hotels/nyccici-conrad-new-york-downtown/",
      rating: 5
    }
  ],
  faqs: [
    {
      question: "Which areas of New York City have the most allergy-friendly hotels?",
      answer: "Midtown Manhattan, particularly around Fifth Avenue and Central Park, has the highest concentration of luxury hotels with comprehensive allergy protocols. The Financial District and SoHo also offer excellent options with trained staff and allergen-aware kitchens."
    },
    {
      question: "Do New York hotels typically provide allergen information for their restaurants?",
      answer: "Many high-end and mid-range hotels in New York City offer detailed allergen information for their restaurant menus. It's always recommended to call ahead to discuss your specific dietary needs, as most establishments are willing to accommodate with advance notice."
    },
    {
      question: "Are there any New York hotels specializing in gluten-free accommodations?",
      answer: "While no hotels exclusively specialize in gluten-free dining, many luxury properties like The Peninsula, Park Hyatt, and The Langham have established gluten-free protocols and offer extensive celiac-safe options across their dining venues."
    }
  ],
  languageTable: {
    headers: ["English", "Spanish"],
    rows: [
      ["I have a food allergy", "Tengo una alergia alimentaria"],
      ["Is this gluten-free?", "¿Esto es sin gluten?"],
      ["I cannot eat dairy", "No puedo comer lácteos"],
      ["I have celiac disease", "Tengo enfermedad celíaca"],
      ["Please no nuts in my food", "Por favor, no nueces en mi comida"]
    ]
  }
};

// Add empty content for cruise lines to ensure the destination data is complete
const cruiseLinesContent: DestinationContent = {
  intro: "Cruising is a dream vacation for many—but for travelers with food allergies, that dream can quickly turn into a minefield of cross-contamination, unclear labeling, and anxiety. Thankfully, many major cruise lines have stepped up, offering allergy-conscious meal planning, trained staff, and even pre-cruise consultations.",
  hotels: [],
  faqs: [],
  languageTable: {
    headers: ["English", "Universal"],
    rows: [
      ["I have a food allergy", "I have a food allergy (show medical card)"],
      ["Please no nuts", "No nuts please"],
      ["Is this gluten-free?", "Gluten-free?"],
      ["I cannot eat dairy", "No dairy"],
      ["I have celiac disease", "I have celiac disease"]
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
  'new-york': fixedNewYorkContent,
  'ayia-napa': ayiaNapaContent,
  portugal: portugalContent,
  'swiss-alps': swissAlpsContent,
  'koh-samui': kohSamuiContent,
  'turkey': turkeyContent,
  'cruise-lines': cruiseLinesContent,
  toronto: torontoContent
};
