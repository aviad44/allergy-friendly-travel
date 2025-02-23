export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'he';

export const languages = [
  { code: 'en' as const, name: 'English' },
  { code: 'fr' as const, name: 'Français' },
  { code: 'es' as const, name: 'Español' },
  { code: 'de' as const, name: 'Deutsch' },
  { code: 'he' as const, name: 'עברי���' }
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
    id: 'cyprus',
    name: 'Cyprus',
    country: 'Cyprus',
    image: 'lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png',
    description: 'Best Allergy-Friendly Hotels in Cyprus',
    subtitle: 'Safe & Comfortable Stays Across the Island'
  },
  { 
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'photo-barcelona',
    description: 'Allergy-Friendly Hotels in Barcelona',
    subtitle: 'Safe Mediterranean Stays in Catalonia'
  },
  { 
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    image: 'photo-ayia-napa',
    description: 'Allergy-Friendly Hotels in Ayia Napa',
    subtitle: 'Safe Stays in Cyprus\'s Popular Resort Town'
  },
  { 
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    image: 'photo-1512632578888-169bbbc64f33',
    description: 'Allergy-Friendly Hotels in Abu Dhabi – The Ultimate Guide',
    subtitle: 'Finding Safe and Comfortable Stays for Allergy Sufferers'
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
        bookingUrl: "https://www.dorchestercollection.com/en/paris/le-meurice/"
      },
      {
        name: "Hôtel de Crillon",
        address: "Place de la Concorde, Paris",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏�� Allergy-free bedding", "👨‍🍳 Dedicated kitchen", "📝 Custom meal plans"],
        description: "Historic luxury hotel with specialized allergy-friendly services and personalized dining options.",
        quote: "A dream for allergy sufferers! Their staff was so knowledgeable about food sensitivities.",
        bookingUrl: "https://www.rosewoodhotels.com/en/hotel-de-crillon"
      },
      {
        name: "Hotel Lutetia",
        address: "Saint-Germain-des-Prés, Paris",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-safe buffet", "👨‍🍳 Trained staff"],
        description: "Left Bank landmark offering comprehensive allergy-friendly services including a dedicated safe buffet.",
        quote: "The hotel provided an allergy-friendly buffet with clear labeling. I felt completely safe!",
        bookingUrl: "https://www.hotellutetia.com"
      },
      {
        name: "Le Bristol Paris",
        address: "8th Arrondissement, Paris",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🧹 Dust-free environment", "👨‍🍳 Allergy-sensitive dining"],
        description: "Prestigious hotel offering comprehensive allergy management and specialized dining options.",
        quote: "A perfect choice for travelers with food allergies. The chef prepared meals specifically for my needs.",
        bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
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
    intro: "Traveling with food allergies can be challenging, but London offers a variety of allergy-friendly accommodations with hypoallergenic rooms and special dietary options to ensure a worry-free stay. Whether you need a hotel with allergen-free dining, dust-mite-proof bedding, or staff trained in food sensitivities, London has options for you.",
    hotels: [
      {
        name: "The Langham",
        address: "Marylebone, London",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Allergy-free bedding", "👨‍🍳 Personalized dining", "🍽️ Dedicated kitchen"],
        description: "Luxury hotel in Marylebone offering comprehensive allergy-friendly amenities and personalized service.",
        quote: "Incredible attention to allergy safety! The staff was highly knowledgeable about food sensitivities.",
        bookingUrl: "https://www.langhamhotels.com/en/the-langham/london/"
      },
      {
        name: "The Connaught",
        address: "Mayfair, London",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Hypoallergenic suites", "🌿 Organic dining", "🌸 Fragrance-free"],
        description: "Prestigious Mayfair hotel with specialized allergy-friendly services and organic dining options.",
        quote: "Everything was carefully managed for my allergies. I felt completely safe and relaxed.",
        bookingUrl: "https://www.the-connaught.co.uk"
      },
      {
        name: "Claridge's",
        address: "Mayfair, London",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌸 Fragrance-free"],
        description: "Historic Mayfair hotel offering comprehensive allergy management and specialized dining options.",
        quote: "They ensured my gluten-free meals were 100% safe. The best allergy-friendly hotel experience!",
        bookingUrl: "https://www.claridges.co.uk"
      },
      {
        name: "Shangri-La The Shard",
        address: "London Bridge, London",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Safe buffet", "👨‍🍳 Trained staff"],
        description: "Modern luxury hotel with stunning views offering comprehensive allergy-safe dining and accommodations.",
        quote: "The hotel provided an allergy-friendly menu with clear labeling. I felt completely safe dining here!",
        bookingUrl: "https://www.shangri-la.com/london/shangrila/"
      },
      {
        name: "The Ritz London",
        address: "Piccadilly, London",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🧹 Dust-free", "👨‍🍳 Allergy-sensitive dining"],
        description: "Iconic London hotel offering comprehensive allergy management and specialized dining services.",
        quote: "Perfect for travelers with food allergies. The chef prepared meals specifically for my needs.",
        bookingUrl: "https://www.theritzlondon.com"
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
        question: "Are there allergy-friendly hotels near Heathrow Airport?",
        answer: "Yes! Hilton London Heathrow Airport offers hypoallergenic rooms and allergy-safe dining near the airport."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel?",
        answer: "Key features include hypoallergenic rooms, staff trained in food allergies, fragrance-free environments, and clear food labeling in dining areas."
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
  'cyprus': {
    intro: "Cyprus offers a variety of allergy-friendly accommodations with hypoallergenic rooms and special dietary options. Whether you need a hotel with allergen-free dining, dust-mite-proof bedding, or staff trained in food sensitivities, Cyprus has options for you.",
    hotels: [
      {
        name: "Annabelle Hotel",
        address: "Paphos, Cyprus",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Allergy-free bedding", "👨‍🍳 Personalized dining", "🍽️ Dedicated kitchen"],
        description: "Luxury hotel in Paphos offering comprehensive allergy-friendly amenities and personalized dining options.",
        quote: "Their gluten-free options were outstanding, and staff was very accommodating.",
        bookingUrl: "https://www.annabelle.com.cy"
      },
      {
        name: "Almyra Hotel",
        address: "Paphos, Cyprus",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Hypoallergenic rooms", "🌿 Organic dining", "🌸 Fragrance-free"],
        description: "Prestigious Paphos hotel with specialized allergy-friendly services and organic dining options.",
        quote: "Loved how they handled my nut allergy. Highly recommend!",
        bookingUrl: "https://www.almyra.com"
      },
      {
        name: "Amathus Beach Hotel",
        address: "Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌸 Fragrance-free"],
        description: "Family-focused luxury hotel offering comprehensive allergy management and specialized dining services.",
        quote: "The chef prepared special meals for my child with multiple allergies. Exceptional service!",
        bookingUrl: "https://www.amathuslimassol.com"
      },
      {
        name: "Four Seasons Hotel",
        address: "Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Safe buffet", "👨‍🍳 Trained staff"],
        description: "Modern luxury hotel offering comprehensive allergy-safe dining and accommodations.",
        quote: "The allergy-friendly buffet made my stay so much easier. Amazing experience!",
        bookingUrl: "https://www.fourseasons.com/cyprus"
      },
      {
        name: "Grecian Bay Hotel",
        address: "Ayia Napa, Cyprus",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🧹 Dust-free", "👨‍🍳 Allergy-sensitive dining"],
        description: "Perfect beachfront resort for families with comprehensive allergy management services.",
        quote: "Perfect for families with allergies. They took great care of our dietary needs.",
        bookingUrl: "https://www.grecianbay.com"
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "When to Use"],
      rows: [
        {
          original: "I have food allergies",
          translation: "Έχω τροφικές αλλεργίες",
          pronunciation: "When checking in"
        },
        {
          original: "Is this allergen-free?",
          translation: "Είναι χωρίς αλλεργιογόνα;",
          pronunciation: "At restaurants"
        },
        {
          original: "I need special bedding",
          translation: "Χρειάζομαι ειδικά κλινοσκεπάσματα",
          pronunciation: "At the hotel"
        }
      ]
    },
    faqs: [
      {
        question: "Are there allergy-friendly hotels near Larnaca Airport?",
        answer: "Yes, several hotels near Larnaca Airport offer allergy-friendly rooms and dining options. The staff at these establishments are trained to handle various dietary restrictions and allergies."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel in Cyprus?",
        answer: "Look for hotels that offer hypoallergenic rooms, staff trained in food allergies, clear food labeling, and the ability to accommodate special dietary requirements. Many luxury hotels in Cyprus also provide dedicated allergy-friendly kitchens and customized meal plans."
      }
    ]
  },
  'barcelona': {
    intro: "Barcelona offers a unique blend of Mediterranean hospitality and modern amenities, making it an ideal destination for travelers with allergies. Our carefully selected hotels understand the importance of accommodating dietary restrictions while providing an authentic Spanish experience.",
    hotels: [
      {
        name: "Hotel Sant Joan",
        address: "Carrer de Sant Joan, Barcelona",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌸 Fragrance-free"],
        description: "Historic hotel in Barcelona offering comprehensive allergy management and specialized dining options.",
        quote: "They ensured my gluten-free meals were 100% safe. The best allergy-friendly hotel experience!",
        bookingUrl: "https://www.hotel-sant-joan.com"
      },
      {
        name: "Hotel El Born",
        address: "Carrer de Llorenç Batlló, Barcelona",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Safe buffet", "👨‍🍳 Trained staff"],
        description: "Modern hotel with stunning views offering comprehensive allergy-safe dining and accommodations.",
        quote: "The allergy-friendly buffet made my stay so much easier. Amazing experience!",
        bookingUrl: "https://www.hotel-el-born.com"
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "When to Use"],
      rows: [
        {
          original: "I have food allergies",
          translation: "Tengo alergias alimentarias",
          pronunciation: "When checking in"
        },
        {
          original: "Is this allergen-free?",
          translation: "¿Es sin alérgenos?",
          pronunciation: "At restaurants"
        },
        {
          original: "I need special bedding",
          translation: "Necesito cama especial",
          pronunciation: "At the hotel"
        }
      ]
    },
    faqs: [
      {
        question: "Are there allergy-friendly hotels near Barcelona Airport?",
        answer: "Yes! Several hotels near Barcelona Airport offer allergy-friendly rooms and dining options. The staff at these establishments are trained to handle various dietary restrictions and allergies."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel in Barcelona?",
        answer: "Look for hotels that offer hypoallergenic rooms, staff trained in food allergies, clear food labeling, and the ability to accommodate special dietary requirements. Many luxury hotels in Barcelona also provide dedicated allergy-friendly kitchens and customized meal plans."
      }
    ]
  },
  'ayia-napa': {
    intro: "Ayia Napa offers a unique blend of Mediterranean hospitality and modern amenities, making it an ideal destination for travelers with allergies. Our carefully selected hotels understand the importance of accommodating dietary restrictions while providing an authentic Greek experience.",
    hotels: [
      {
        name: "Hotel Ayia Napa",
        address: "Ayia Napa, Cyprus",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌸 Fragrance-free"],
        description: "Historic hotel in Ayia Napa offering comprehensive allergy management and specialized dining options.",
        quote: "They ensured my gluten-free meals were 100% safe. The best allergy-friendly hotel experience!",
        bookingUrl: "https://www.hotel-ayia-napa.com"
      },
      {
        name: "Hotel El Nido",
        address: "Ayia Napa, Cyprus",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Safe buffet", "👨‍🍳 Trained staff"],
        description: "Modern hotel with stunning views offering comprehensive allergy-safe dining and accommodations.",
        quote: "The allergy-friendly buffet made my stay so much easier. Amazing experience!",
        bookingUrl: "https://www.hotel-el-nido.com"
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "When to Use"],
      rows: [
        {
          original: "I have food allergies",
          translation: "Έχω τροφικές αλλεργίες",
          pronunciation: "When checking in"
        },
        {
          original: "Is this allergen-free?",
          translation: "Είναι χωρίς αλλεργιογόνα;",
          pronunciation: "At restaurants"
        },
        {
          original: "I need special bedding",
          translation: "Χρειάζομαι ειδικά κλινοσκεπάσματα",
          pronunciation: "At the hotel"
        }
      ]
    },
    faqs: [
      {
        question: "Are there allergy-friendly hotels near Ayia Napa Airport?",
        answer: "Yes! Several hotels near Ayia Napa Airport offer allergy-friendly rooms and dining options. The staff at these establishments are trained to handle various dietary restrictions and allergies."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel in Ayia Napa?",
        answer: "Look for hotels that offer hypoallergenic rooms, staff trained in food allergies, clear food labeling, and the ability to accommodate special dietary requirements. Many luxury hotels in Ayia Napa also provide dedicated allergy-friendly kitchens and customized meal plans."
      }
    ]
  },
  'abu-dhabi': {
    intro: "Abu Dhabi, the capital of the United Arab Emirates, offers world-class hospitality with luxurious hotels and personalized services. For travelers with food allergies, selecting the right hotel can make a significant difference in ensuring a stress-free stay. In this guide, we highlight the best allergy-friendly hotels in Abu Dhabi, categorized for couples and families, along with real guest reviews from allergy sufferers.",
    hotels: [
      {
        name: "Emirates Palace Mandarin Oriental",
        address: "West Corniche Road, Abu Dhabi",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Hypoallergenic rooms", "👨‍🍳 Dedicated kitchen", "🍽️ Allergen-free dining"],
        description: "Luxurious hotel offering customizable menus including gluten-free, dairy-free, and nut-free options with highly trained kitchen staff.",
        quote: "The staff was incredibly accommodating with my nut allergy. The chefs went above and beyond to ensure my meals were safe.",
        bookingUrl: "https://www.mandarinoriental.com/abu-dhabi/emirates-palace/"
      },
      {
        name: "The St. Regis Abu Dhabi",
        address: "Nation Towers, Abu Dhabi",
        features: ["⭐ 5-star luxury", "💑 Couples favorite", "🛏️ Hypoallergenic bedding", "🍽️ Allergen-free dining", "📝 Custom meal plans"],
        description: "Prestigious hotel with extensive allergen-free meal options and customized dining experiences.",
        quote: "I have celiac disease, and I was pleasantly surprised by the level of care and understanding shown by the hotel staff.",
        bookingUrl: "https://www.marriott.com/hotels/travel/auhxr-the-st-regis-abu-dhabi/"
      },
      {
        name: "Saadiyat Rotana Resort & Villas",
        address: "Saadiyat Island, Abu Dhabi",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🍽️ Safe dining", "🏊‍♂️ Clean pools"],
        description: "Family-focused resort offering several on-site restaurants with allergen-free dishes and safe environments for children.",
        quote: "Our child has multiple food allergies, and the hotel staff took every precaution to make our stay worry-free.",
        bookingUrl: "https://www.rotana.com/rotanahotelandresorts/unitedarabemirates/abudhabi/saadiyatrotanaresortandvillas"
      },
      {
        name: "Rixos Premium Saadiyat Island",
        address: "Saadiyat Island, Abu Dhabi",
        features: ["⭐ 5-star luxury", "👨‍👩‍👧‍👦 Family-friendly", "🛏️ Hypoallergenic rooms", "🏊‍♂️ Advanced filtration", "👨‍🍳 Trained staff"],
        description: "All-inclusive resort with personalized catering services and advanced pool filtration systems.",
        quote: "I felt at ease knowing the hotel had a clear allergy policy and that staff understood my needs.",
        bookingUrl: "https://saadiyatisland.rixos.com/"
      }
    ],
    languageTable: {
      headers: ["English", "Arabic", "When to Use"],
      rows: [
        {
          original: "I have food allergies",
          translation: "لدي حساسية من الطعام",
          pronunciation: "When checking in"
        },
        {
          original: "Is this allergen-free?",
          translation: "هل هذا خالي من مسببات الحساسية؟",
          pronunciation: "At restaurants"
        },
        {
          original: "I need special meals",
          translation: "أحتاج إلى وجبات خاصة",
          pronunciation: "For room service"
        }
      ]
    },
    faqs: [
      {
        question: "Do Abu Dhabi hotels accommodate special dietary requirements?",
        answer: "Yes, luxury hotels in Abu Dhabi are well-equipped to handle various dietary restrictions and allergies, with trained staff and dedicated facilities."
      },
      {
        question: "What should I prepare before my stay in Abu Dhabi?",
        answer: "Notify the hotel in advance about your allergies, consider carrying Arabic allergy translation cards, and speak directly with the chef about your dietary needs."
      }
    ]
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
