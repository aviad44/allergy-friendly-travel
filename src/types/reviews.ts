export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'he';

export const languages = [
  { code: 'en' as const, name: 'English' },
  { code: 'fr' as const, name: 'Français' },
  { code: 'es' as const, name: 'Español' },
  { code: 'de' as const, name: 'Deutsch' },
  { code: 'he' as const, name: 'עברית' }
];

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  subtitle: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface DestinationContent {
  intro: string;
  hotels: {
    name: string;
    address: string;
    features: string[];
    description: string;
    quote: string;
    bookingUrl: string;
  }[];
  languageTable: {
    headers: string[];
    rows: {
      original: string;
      translation: string;
      pronunciation: string;
    }[];
  };
  faqs: FAQ[];
}

export const destinations = [
  { 
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'photo-1502602898657-3e91760cbb34',
    description: 'The Best Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe & Comfortable Stays for Food-Sensitive Travelers'
  },
  { 
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: 'photo-1513635269975-59663e0ac1ad',
    description: 'London\'s Most Accommodating Hotels for Allergy Sufferers',
    subtitle: 'Discover comfortable and safe stays in the heart of London'
  },
  { 
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    image: 'lovable-uploads/e8c36400-9150-4115-a6e5-d7c858e844cd.png',
    description: 'Allergy-Friendly Accommodations in Crete',
    subtitle: 'Experience Greek hospitality with peace of mind'
  },
  { 
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'photo-1501854140801-50d01698950b',
    description: 'Barcelona\'s Top Hotels for Dietary Requirements',
    subtitle: 'Safe and comfortable stays in the Catalan capital'
  },
  { 
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    image: 'photo-1472396961693-142e6e269027',
    description: 'Ayia Napa\'s Allergy-Conscious Resorts',
    subtitle: 'Enjoy the Mediterranean paradise worry-free'
  }
] as const;

export const destinationData: Record<DestinationId, DestinationContent> = {
  'paris': {
    intro: "Discover the allergy-friendly side of Paris with our curated selection of hotels that cater to various dietary requirements and sensitivities.",
    hotels: [
      {
        name: "Le Meurice",
        address: "228 Rue de Rivoli, 75001 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "🛏️ Hypoallergenic rooms"],
        description: "Luxury hotel with dedicated allergy-friendly dining options and specially prepared rooms.",
        quote: "Exceptional attention to dietary requirements with personalized service.",
        bookingUrl: "https://www.booking.com/hotel/fr/meurice-paris.html"
      },
      {
        name: "Four Seasons Hotel George V",
        address: "31 Avenue George V, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "👨‍🍳 Dedicated allergen-free kitchen", "🏥 On-call allergist"],
        description: "Iconic Parisian hotel offering exceptional allergy-friendly services and medical support.",
        quote: "The chef prepared a completely allergen-free menu that was absolutely delicious!",
        bookingUrl: "https://www.booking.com/hotel/fr/four-seasons-george-v-paris.html"
      },
      {
        name: "Mandarin Oriental Paris",
        address: "251 Rue Saint-Honoré, 75001 Paris, France",
        features: ["⭐ 5-star luxury", "🌿 Air purification", "🍽️ Custom meal plans"],
        description: "Modern luxury hotel with comprehensive allergy management systems and personalized dining options.",
        quote: "They took my allergies seriously and made my stay worry-free.",
        bookingUrl: "https://www.booking.com/hotel/fr/mandarin-oriental-paris.html"
      }
    ],
    languageTable: {
      headers: ["English", "French", "When to Use"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "J'ai une allergie alimentaire",
          pronunciation: "When checking in"
        },
        {
          original: "Is this gluten-free?",
          translation: "Est-ce sans gluten?",
          pronunciation: "When ordering food"
        },
        {
          original: "Does this contain nuts?",
          translation: "Est-ce que ça contient des noix?",
          pronunciation: "At restaurants"
        }
      ]
    },
    faqs: [
      {
        question: "Do Paris hotels accommodate special dietary requirements?",
        answer: "Yes, many luxury hotels in Paris have dedicated allergen-free kitchens and can accommodate various dietary restrictions."
      },
      {
        question: "Can I find gluten-free options in Paris hotels?",
        answer: "Absolutely! Most high-end hotels in Paris offer extensive gluten-free menus and can provide safe dining options."
      }
    ]
  },
  'london': {
    intro: "London offers excellent accommodations for allergy-sensitive travelers, with many hotels providing specialized services and amenities.",
    hotels: [
      {
        name: "The Langham",
        address: "1C Portland Place, London W1B 1JA",
        features: ["⭐ 5-star luxury", "🍽️ Allergen-free options", "🛏️ Hypoallergenic rooms"],
        description: "Historic luxury hotel with modern allergy-aware amenities and dedicated dining options.",
        quote: "Outstanding attention to dietary requirements with excellent service.",
        bookingUrl: "https://www.booking.com/hotel/gb/langham-london.html"
      },
      {
        name: "The Dorchester",
        address: "53 Park Lane, London W1K 1QA",
        features: ["⭐ 5-star luxury", "👨‍🍳 Specialist chefs", "🏥 Medical support"],
        description: "Iconic London hotel offering comprehensive allergy management and personalized dining.",
        quote: "The chef created a special menu addressing all my allergies!",
        bookingUrl: "https://www.booking.com/hotel/gb/the-dorchester.html"
      },
      {
        name: "Shangri-La The Shard",
        address: "31 St Thomas Street, London SE1 9QU",
        features: ["⭐ 5-star luxury", "🌿 Air filtration", "🍽️ Personalized menus"],
        description: "Modern luxury hotel with state-of-the-art allergy management and stunning views.",
        quote: "They handled my multiple food allergies perfectly.",
        bookingUrl: "https://www.booking.com/hotel/gb/shangri-la-at-the-shard-london.html"
      }
    ],
    languageTable: {
      headers: ["Phrase", "Usage", "Notes"],
      rows: [
        {
          original: "I have a severe allergy",
          translation: "Please inform all kitchen staff",
          pronunciation: "When checking in"
        },
        {
          original: "Does this contain allergens?",
          translation: "Always ask about ingredients",
          pronunciation: "Before ordering"
        },
        {
          original: "I need allergen-free bedding",
          translation: "Request upon booking",
          pronunciation: "During reservation"
        }
      ]
    },
    faqs: [
      {
        question: "Do London hotels provide allergy cards?",
        answer: "Yes, many luxury hotels in London provide allergy cards in multiple languages to help communicate your needs."
      },
      {
        question: "Are there hotels with air purification systems?",
        answer: "Several London hotels, especially luxury properties, have installed advanced air purification systems."
      }
    ]
  },
  'crete': {
    intro: "Crete offers a unique blend of Mediterranean hospitality and modern amenities, making it an ideal destination for travelers with allergies. Our carefully selected hotels understand the importance of accommodating dietary restrictions while providing an authentic Greek experience.",
    hotels: [
      {
        name: "Blue Palace Resort & Spa",
        address: "Plaka, Elounda, Crete, 72053, Greece",
        features: ["Gluten-free kitchen", "Allergen-free rooms", "24/7 medical assistance", "Customized meal plans"],
        description: "Luxury resort offering comprehensive allergy-friendly services with stunning views of the Mediterranean.",
        quote: "They took excellent care of my gluten allergy, even preparing special Greek pastries I could eat!",
        bookingUrl: "#"
      },
      {
        name: "Domes of Elounda",
        address: "Tsifliki, Elounda, Crete, 72053, Greece",
        features: ["Dedicated allergy-friendly restaurant", "Anti-allergic bedding", "Air purification systems"],
        description: "Family-friendly resort with specialized attention to dietary requirements and environmental allergies.",
        quote: "The staff went above and beyond to ensure our son's nut allergy was properly handled.",
        bookingUrl: "#"
      }
    ],
    languageTable: {
      headers: ["Greek", "English", "Pronunciation"],
      rows: [
        {
          original: "Έχω αλλεργία",
          translation: "I have an allergy",
          pronunciation: "Echo allergia"
        },
        {
          original: "Χωρίς γλουτένη",
          translation: "Gluten-free",
          pronunciation: "Horis glouteni"
        }
      ]
    },
    faqs: [
      {
        question: "Do Cretan hotels accommodate gluten-free diets?",
        answer: "Yes, many hotels in Crete offer extensive gluten-free options, incorporating local ingredients and traditional recipes adapted for celiac guests."
      },
      {
        question: "Is it easy to find allergy-friendly restaurants near hotels in Crete?",
        answer: "Most major hotels in Crete have partnerships with local restaurants that can accommodate various dietary restrictions, and hotel concierges can provide recommendations."
      }
    ]
  },
  'barcelona': {
    intro: "",
    hotels: [],
    languageTable: {
      headers: [],
      rows: []
    },
    faqs: []
  },
  'ayia-napa': {
    intro: "",
    hotels: [],
    languageTable: {
      headers: [],
      rows: []
    },
    faqs: []
  }
};

export type DestinationId = (typeof destinations)[number]['id'];

// Re-add types and constants needed by other components
export interface Review {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  author_name: string;
  language: string;
  destination?: string;
  traveler_type?: TravelerType;
}

export type TravelerType = 'family' | 'couple' | 'solo' | 'friends';
export type SortOption = 'newest' | 'oldest' | 'highestRated' | 'lowestRated';

export const travelerTypes = ['family', 'couple', 'solo', 'friends'] as const;
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
