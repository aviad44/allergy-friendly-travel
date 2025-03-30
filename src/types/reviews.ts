
export type DestinationId = 'london' | 'paris' | 'barcelona' | 'cyprus' | 'abu-dhabi' | 'crete' | 'tokyo' | 'thailand' | 'hotel-chains' | 'new-york' | 'ayia-napa' | 'portugal' | 'swiss-alps';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image?: string; // Make image optional
}

export interface Hotel {
  name: string;
  address: string;
  features: string[];
  description: string;
  quote: string;
  bookingUrl: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

// Adding missing Review interface
export interface Review {
  id: number;
  rating: number;
  text: string;
  author_name: string;
  created_at: string;
  destination?: string;
  traveler_type?: string;
  language: string;
}

export interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  faqs: FAQ[];
  languageTable: LanguageTable;
}

// Adding missing languages type
export type LanguageCode = 'en' | 'fr' | 'de' | 'es' | 'it' | 'he';

// Adding missing languages array
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'he', name: 'Hebrew' }
];

// Adding missing sortOptions
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

export const destinations: Destination[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    description: 'Best Allergy-Friendly Hotels in London',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Best Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Best Allergy-Friendly Hotels in Barcelona',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    country: 'Cyprus', 
    description: 'Best Allergy-Friendly Hotels in Cyprus',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'UAE',
    description: 'Best Allergy-Friendly Hotels in Abu Dhabi',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    description: 'Best Allergy-Friendly Hotels in Crete',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Best Allergy-Friendly Hotels in Tokyo',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    description: 'Best Allergy-Friendly Hotels in Thailand',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'hotel-chains',
    name: 'Hotel Chains',
    country: 'Worldwide',
    description: 'Best Allergy-Friendly Hotel Chains',
    subtitle: 'Safe Hotel Chains for Food Allergies'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    description: 'Best Allergy-Friendly Hotels in New York',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    description: 'Best Allergy-Friendly Hotels in Ayia Napa',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    country: 'Portugal',
    description: 'Best Allergy-Friendly Hotels in Portugal',
    subtitle: 'Safe Accommodations for Food Allergies'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Best Allergy-Friendly Hotels in the Swiss Alps',
    subtitle: 'Safe Mountain Accommodations for Food Allergies'
  }
];

export const destinationData: Record<DestinationId, DestinationContent> = {
  london: {
    intro: "London offers numerous allergy-friendly accommodations across its diverse neighborhoods.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  paris: {
    intro: "Discover Paris's finest allergy-aware hotels and accommodations.",
    hotels: [
      {
        name: "Le Bristol Paris ★★★★★",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        features: [
          "⭐ 5-star luxury hotel",
          "🍽️ Dedicated allergy menu",
          "👨‍🍳 Private consultations with chef"
        ],
        description: "This iconic luxury hotel offers exceptional service for guests with dietary restrictions, including pre-arrival consultations.",
        quote: "The chef personally came to our table to discuss my daughter's gluten allergy. The food was exquisite and completely safe.",
        bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
      },
      {
        name: "Hôtel Plaza Athénée ★★★★★",
        address: "25 Avenue Montaigne, 75008 Paris, France",
        features: [
          "⭐ 5-star luxury accommodation", 
          "🥐 Gluten-free pastries", 
          "🍲 Allergen-free room service"
        ],
        description: "Upscale accommodation with special attention to food allergies and comprehensive allergen training for all kitchen staff.",
        quote: "They created a custom dairy-free menu for my entire stay, even including French pastries!",
        bookingUrl: "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/"
      },
      {
        name: "Hôtel de Crillon ★★★★★",
        address: "10 Place de la Concorde, 75008 Paris, France",
        features: [
          "⭐ 5-star historic hotel",
          "📋 Personalized allergy protocols",
          "🥗 Vegan and special diet options"
        ],
        description: "Elegant and historic Parisian hotel with knowledgeable staff trained to handle various dietary restrictions.",
        quote: "Despite being in the land of gluten, they made my celiac stay wonderful with safe and delicious alternatives.",
        bookingUrl: "https://www.rosewoodhotels.com/en/hotel-de-crillon"
      },
      {
        name: "Shangri-La Hotel Paris ★★★★★",
        address: "10 Avenue d'Iéna, 75116 Paris, France",
        features: [
          "⭐ 5-star palace hotel", 
          "🍲 Asian-European fusion allergy options", 
          "🛌 Allergy-friendly bedding"
        ],
        description: "Offers exceptional luxury accommodations with special attention to guest allergies and multiple dining venues with allergy-aware menus.",
        quote: "The staff went above and beyond to ensure my nut allergy was accommodated throughout my entire stay.",
        bookingUrl: "https://www.shangri-la.com/paris/shangrila/"
      }
    ],
    faqs: [
      {
        question: "How do Paris hotels typically handle food allergies?",
        answer: "Many luxury hotels in Paris now offer pre-arrival questionnaires to identify dietary needs, allergen-trained kitchen staff, and separate preparation areas to avoid cross-contamination."
      },
      {
        question: "Can I find gluten-free options in Parisian hotels?",
        answer: "Yes, particularly in 4 and 5-star hotels. Many offer gluten-free bread, pastries, and complete menu alternatives. Hotels like Le Bristol and Shangri-La are especially accommodating."
      },
      {
        question: "Should I notify my Paris hotel about allergies before arrival?",
        answer: "It's highly recommended to contact the hotel at least one week before arrival. Send a detailed explanation of your allergies in both English and French for the clearest communication."
      },
      {
        question: "Are apartment hotels a good option for severe allergies in Paris?",
        answer: "Yes, apartment hotels like Citadines and Adagio offer kitchenettes where you can prepare your own safe meals while still enjoying hotel amenities and services."
      }
    ],
    languageTable: {
      headers: ["English", "French"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire"],
        ["Gluten-free", "Sans gluten"],
        ["Dairy-free", "Sans lactose"],
        ["Nut-free", "Sans noix"],
        ["I cannot eat", "Je ne peux pas manger"]
      ]
    }
  },
  barcelona: {
    intro: "Barcelona's hotels are increasingly catering to guests with dietary restrictions.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  cyprus: {
    intro: "Cyprus offers numerous allergy-friendly accommodations across the island.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "abu-dhabi": {
    intro: "Abu Dhabi's luxury hotels excel at accommodating dietary restrictions.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  crete: {
    intro: "Discover Crete's most accommodating hotels for dietary restrictions.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  tokyo: {
    intro: "Navigate Tokyo's culinary scene safely with these allergy-aware hotels.",
    hotels: [
      {
        name: "Tokyo Marriott Hotel ★★★★★",
        address: "4-7-36 Kitashinagawa, Shinagawa, Tokyo 140-0001, Japan",
        features: [
          "⭐ 5-star international chain",
          "🍚 Allergen cards in Japanese",
          "👨‍🍳 Staff trained in cross-contamination"
        ],
        description: "Excellent for international travelers with food allergies, offering allergen cards in Japanese to help communicate dietary needs.",
        quote: "The staff provided me with allergen cards I could show at restaurants throughout my stay in Japan!",
        bookingUrl: "https://www.marriott.com/hotels/travel/tyomc-tokyo-marriott-hotel/"
      },
      {
        name: "Park Hyatt Tokyo ★★★★★",
        address: "3-7-1-2 Nishi Shinjuku, Shinjuku-Ku, Tokyo 163-1055, Japan",
        features: [
          "⭐ 5-star landmark hotel",
          "🍣 Allergen-aware Japanese cuisine",
          "📝 Written dietary communication cards"
        ],
        description: "Sophisticated accommodation famous from 'Lost in Translation' with exceptional allergy awareness and custom meal preparation.",
        quote: "The chef created special gluten-free versions of traditional Japanese dishes that were incredible.",
        bookingUrl: "https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo/tyoph"
      },
      {
        name: "The Peninsula Tokyo ★★★★★",
        address: "1-8-1 Yurakucho, Chiyoda-ku, Tokyo 100-0006, Japan",
        features: [
          "⭐ 5-star luxury hotel",
          "🏷️ Food labeling in multiple languages",
          "🍲 Pre-arrival allergy coordination"
        ],
        description: "Luxury hotel near the Imperial Palace with exceptional allergy protocols and multilingual staff to assist with dietary needs.",
        quote: "Every meal was prepared with my dairy and nut allergies in mind, and they even offered gluten-free afternoon tea.",
        bookingUrl: "https://www.peninsula.com/en/tokyo/5-star-luxury-hotel-ginza"
      },
      {
        name: "Keio Plaza Hotel Tokyo ★★★★",
        address: "2-2-1 Nishi-Shinjuku, Shinjuku-Ku, Tokyo 160-8330, Japan",
        features: [
          "⭐ 4-star business hotel",
          "🥣 Allergen-free menu options",
          "🔍 Transparent ingredient lists"
        ],
        description: "Large, business-friendly hotel with designated allergy-friendly floors and restaurants experienced in handling dietary restrictions.",
        quote: "They had comprehensive English ingredient lists for every buffet item and could prepare special meals on request.",
        bookingUrl: "https://www.keioplaza.com/"
      }
    ],
    faqs: [
      {
        question: "How do I communicate my food allergies in Tokyo hotels?",
        answer: "Most high-end Tokyo hotels have English-speaking staff trained in allergy awareness. Request allergen cards in Japanese to use throughout your trip. Many hotels offer digital translation services as well."
      },
      {
        question: "Are gluten-free options readily available in Tokyo hotels?",
        answer: "While traditional Japanese cuisine often contains soy sauce (which contains wheat), upscale hotels are increasingly offering gluten-free alternatives including gluten-free soy sauce and special breakfast options."
      },
      {
        question: "Do Tokyo hotels understand Western concepts of cross-contamination?",
        answer: "Luxury and international chain hotels in Tokyo typically have well-trained staff who understand cross-contamination risks. Always clarify your specific needs directly with the food service manager."
      },
      {
        question: "What hotel chains are best for food allergies in Tokyo?",
        answer: "International chains like Marriott, Hyatt, and Hilton typically have standardized allergy protocols. Japanese luxury brands like The Peninsula and Imperial Hotel also offer exceptional allergy accommodations."
      }
    ],
    languageTable: {
      headers: ["English", "Japanese"],
      rows: [
        ["I have a food allergy", "わたしには食物アレルギーがあります (Watashi ni wa shokumotsu arerugī ga arimasu)"],
        ["Gluten-free", "グルテンフリー (Guruten furī)"],
        ["Dairy-free", "乳製品なし (Nyūseihin nashi)"],
        ["Nut-free", "ナッツなし (Nattsu nashi)"],
        ["I cannot eat this", "これを食べられません (Kore o taberaremasen)"]
      ]
    }
  },
  thailand: {
    intro: "Find safe and comfortable stays across Thailand's top destinations.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "hotel-chains": {
    intro: "Global hotel chains with consistent allergy-friendly policies.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "new-york": {
    intro: "New York City's best accommodations for allergy-conscious travelers.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "ayia-napa": {
    intro: "Discover allergy-friendly accommodations in Cyprus's beautiful coastal town.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "portugal": {
    intro: "Portugal's finest hotels catering to dietary restrictions.",
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
  },
  "swiss-alps": {
    intro: "Experience the majestic Swiss Alps with peace of mind, offering allergy-aware accommodations across stunning mountain regions.",
    hotels: [
      {
        name: "Riffelalp Resort 2222m",
        address: "3920 Zermatt, Switzerland",
        features: [
          "⭐ 5-star family-friendly resort",
          "🍽️ Dedicated gluten-free breakfast",
          "👨‍🍳 Chef consultations for allergies"
        ],
        description: "A car-free mountain resort with ski-in/ski-out access and exceptional allergy-aware dining options.",
        quote: "The chef personally ensured our dietary needs were met. Exceptional service!",
        bookingUrl: "https://www.riffelalp.com/"
      },
      {
        name: "Giardino Mountain",
        address: "7513 Silvaplana, Switzerland",
        features: [
          "⭐ 5-star wellness hotel",
          "🥣 Lactose/gluten/nut-free meals",
          "💧 Allergy-friendly family spa"
        ],
        description: "A design wellness hotel in Engadin Valley offering pre-arrival allergy coordination.",
        quote: "They prepared everything perfectly for my son's celiac diet.",
        bookingUrl: "https://www.giardinohotels.ch/"
      },
      {
        name: "Backstage Boutique Hotel",
        address: "Zermatt Village, Switzerland",
        features: [
          "⭐ 4-star artistic design hotel",
          "🧑‍🍳 Fine dining trained on allergens",
          "🎭 Allergy-friendly bedding"
        ],
        description: "A boutique hotel ideal for couples seeking comfort and allergy care in Zermatt.",
        quote: "They understood my nut allergy completely and offered sealed plates and utensils.",
        bookingUrl: "https://www.backstagehotel.ch/"
      },
      {
        name: "Hotel Silberhorn",
        address: "Lauterbrunnen Valley, Switzerland",
        features: [
          "⭐ 4-star chalet-style hotel",
          "🧼 Staff trained on cross-contamination",
          "🌄 Surrounded by waterfalls and trails"
        ],
        description: "A chalet-style mountain hotel great for nature lovers and allergy-conscious hikers.",
        quote: "They remembered my allergies every morning and adjusted my meals accordingly.",
        bookingUrl: "https://www.silberhorn.com/"
      }
    ],
    faqs: [
      {
        question: "How do Swiss Alpine hotels handle food allergies?",
        answer: "Many Swiss hotels offer personalized meal planning, separate cooking areas, and staff trained in cross-contamination prevention."
      },
      {
        question: "Are mountain accommodations safe for allergy sufferers?",
        answer: "Yes, many Alpine hotels now provide hypoallergenic rooms, HEPA air filters, and detailed allergy management protocols."
      },
      {
        question: "Can I find self-catering options for severe allergies?",
        answer: "Absolutely. Many chalets and Airbnbs like Haus Andorra and Chesa Plattner offer allergy-safe kitchens with separate utensils and fragrance-free cleaning."
      },
      {
        question: "What should I tell hotels in advance about my allergies?",
        answer: "Contact them 1-2 weeks before arrival with specific details about your allergies, necessary precautions, and any medical requirements."
      }
    ],
    languageTable: {
      headers: ["English", "German", "French"],
      rows: [
        ["I have a food allergy", "Ich habe eine Lebensmittelallergie", "J'ai une allergie alimentaire"],
        ["Gluten-free", "Glutenfrei", "Sans gluten"],
        ["Dairy-free", "Milchfrei", "Sans lactose"],
        ["Nut-free", "Nussfrei", "Sans noix"],
        ["Is this safe for me to eat?", "Ist das für mich sicher zu essen?", "Est-ce que je peux manger ceci en toute sécurité?"]
      ]
    }
  }
};
