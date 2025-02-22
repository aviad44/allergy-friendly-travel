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
    intro: "Traveling with food allergies can be challenging, but Paris offers a variety of allergy-friendly accommodations with hypoallergenic rooms and special dietary options to ensure a worry-free stay. Whether you need a hotel with allergen-free dining, dust-mite-proof bedding, or staff trained in food sensitivities, Paris has options for you.",
    hotels: [
      {
        name: "Le Meurice",
        address: "1st Arrondissement, Paris",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌿 Fragrance-free"],
        description: "Luxury hotel in the heart of Paris offering comprehensive allergy-friendly amenities.",
        quote: "They took my nut allergy very seriously and ensured all meals were completely safe for me!",
        bookingUrl: "https://www.booking.com/hotel/fr/le-meurice.en-gb.html?utm_source=AllergyFriendlyHotels&utm_medium=referral&utm_campaign=ParisHotels"
      },
      {
        name: "Hôtel de Crillon",
        address: "Place de la Concorde, Paris",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Allergy-free bedding", "👨‍🍳 Dedicated kitchen", "📝 Custom meal plans"],
        description: "Historic luxury hotel with specialized allergy-friendly services and personalized dining options.",
        quote: "A dream for allergy sufferers! Their staff was so knowledgeable about food sensitivities.",
        bookingUrl: "https://www.booking.com/hotel/fr/hotel-de-crillon.en-gb.html?utm_source=AllergyFriendlyHotels&utm_medium=referral&utm_campaign=ParisHotels"
      },
      {
        name: "Hotel Lutetia",
        address: "Saint-Germain-des-Prés, Paris",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergy-safe buffet", "👨‍🍳 Trained staff"],
        description: "Left Bank landmark offering comprehensive allergy-friendly services including a dedicated safe buffet.",
        quote: "The hotel provided an allergy-friendly buffet with clear labeling. I felt completely safe!",
        bookingUrl: "https://www.booking.com/hotel/fr/hotel-lutetia.en-gb.html?utm_source=AllergyFriendlyHotels&utm_medium=referral&utm_campaign=ParisHotels"
      },
      {
        name: "Le Bristol Paris",
        address: "8th Arrondissement, Paris",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🧹 Dust-free environment", "👨‍🍳 Allergy-sensitive dining"],
        description: "Prestigious hotel offering comprehensive allergy management and specialized dining options.",
        quote: "A perfect choice for travelers with food allergies. The chef prepared meals specifically for my needs.",
        bookingUrl: "https://www.booking.com/hotel/fr/le-bristol.en-gb.html?utm_source=AllergyFriendlyHotels&utm_medium=referral&utm_campaign=ParisHotels"
      }
    ],
    languageTable: {
      headers: ["English", "French", "When to Use"],
      rows: [
        {
          original: "I have food allergies",
          translation: "J'ai des allergies alimentaires",
          pronunciation: "When checking in"
        },
        {
          original: "Is this allergen-free?",
          translation: "Est-ce sans allergènes?",
          pronunciation: "At restaurants"
        },
        {
          original: "I need special bedding",
          translation: "J'ai besoin de literie spéciale",
          pronunciation: "At the hotel"
        }
      ]
    },
    faqs: [
      {
        question: "Are there allergy-friendly hotels near Charles de Gaulle Airport?",
        answer: "Yes! Pullman Paris Roissy CDG Airport offers hypoallergenic rooms and allergy-safe dining near the airport."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel?",
        answer: "Key features include hypoallergenic rooms, staff trained in food allergies, fragrance-free environments, and clear food labeling in dining areas."
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
