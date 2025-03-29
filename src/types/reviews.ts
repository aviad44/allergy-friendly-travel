export type DestinationId = 'london' | 'paris' | 'barcelona' | 'cyprus' | 'abu-dhabi' | 'crete' | 'tokyo' | 'thailand' | 'hotel-chains' | 'new-york' | 'ayia-napa' | 'portugal' | 'swiss-alps';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
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

export interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  faqs: FAQ[];
  languageTable: LanguageTable;
}

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
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
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
    hotels: [],
    faqs: [],
    languageTable: { headers: [], rows: [] }
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
      }
    ],
    languageTable: {
      headers: ["English", "German", "French"],
      rows: [
        ["I have a food allergy", "Ich habe eine Lebensmittelallergie", "J'ai une allergie alimentaire"],
        ["Gluten-free", "Glutenfrei", "Sans gluten"],
        ["Dairy-free", "Milchfrei", "Sans lactose"]
      ]
    }
  }
};
