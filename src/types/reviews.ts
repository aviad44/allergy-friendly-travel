import { HotelCardProps } from "@/components/hotels/HotelCard";

export interface LanguageTableRow {
  English: string;
  Portuguese?: string;
  Spanish?: string;
  French?: string;
  German?: string;
  Italian?: string;
  Dutch?: string;
  Hebrew?: string;
  Pronunciation?: string;
}

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'he';

// Languages for the language selector
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'he', name: 'Hebrew' }
];

export type DestinationId = 
  | 'london'
  | 'paris'
  | 'barcelona'
  | 'cyprus'
  | 'abu-dhabi'
  | 'crete'
  | 'tokyo'
  | 'thailand'
  | 'new-york'
  | 'ayia-napa'
  | 'portugal'
  | 'swiss-alps';

export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LanguageTable {
  headers: string[];
  rows: string[][];
}

export interface Hotel {
  name: string;
  address: string;
  features: string[];
  description: string;
  quote: string;
  bookingUrl: string;
}

export interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  faqs: FAQItem[];
  languageTable: {
    headers: string[];
    rows: string[][];
  };
}

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

export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

export const destinations: Destination[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    description: 'Allergy-Friendly Hotels in London',
    subtitle: 'A Comprehensive Guide for Food-Allergy Travelers',
    image: '/lovable-uploads/073e949f-4399-42a9-9951-4993749c9957.jpg'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe and Comfortable Stays for Allergy-Sensitive Travelers',
    image: '/lovable-uploads/e39c9299-362c-4099-8521-c8a799494008.jpg'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Allergy-Friendly Hotels in Barcelona',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Barcelona',
    image: '/lovable-uploads/e4942943-c57a-4507-b959-90b45a14a06b.jpg'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    country: 'Cyprus',
    description: 'Allergy-Friendly Hotels in Cyprus',
    subtitle: 'Discover Safe and Welcoming Accommodations for Allergy Sufferers',
    image: '/lovable-uploads/6944492b-34a9-4992-b753-1489e952b591.jpg'
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'UAE',
    description: 'Allergy-Friendly Hotels in Abu Dhabi',
    subtitle: 'Find Safe and Comfortable Stays for Allergy-Sensitive Travelers',
    image: '/lovable-uploads/0999f939-914f-4439-8179-f5a4f0a1575a.jpg'
  },
  {
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    description: 'Allergy-Friendly Hotels in Crete',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Crete',
    image: '/lovable-uploads/a888562d-1938-448f-a967-69f92259ff11.jpg'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Allergy-Friendly Hotels in Tokyo',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Tokyo',
    image: '/lovable-uploads/6497999a-1841-449f-958a-489a90244535.jpg'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    description: 'Allergy-Friendly Hotels in Thailand',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Thailand',
    image: '/lovable-uploads/49911444-c993-4c6d-8961-a90593568851.jpg'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    description: 'Allergy-Friendly Hotels in New York',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in New York',
    image: '/lovable-uploads/e5496593-5969-447a-b969-45a15d49ef9c.jpg'
  },
    {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    description: 'Allergy-Friendly Hotels in Ayia Napa',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Ayia Napa',
    image: '/lovable-uploads/6944492b-34a9-4992-b753-1489e952b591.jpg'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    country: 'Portugal',
    description: 'Allergy-Friendly Hotels in Portugal',
    subtitle: 'Your Guide to Safe and Enjoyable Stays in Portugal',
    image: '/lovable-uploads/073e949f-4399-42a9-9951-4993749c9957.jpg'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Allergy-Friendly Hotels in the Swiss Alps (2025 Guide)',
    subtitle: 'Safe, scenic, and allergen-aware stays across Zermatt, St. Moritz, and beyond – from family resorts to cozy Alpine escapes.',
    image: 'photo-1469474968028-56623f02e42e'
  }
];

export const destinationData: { [key in DestinationId]: DestinationContent } = {
  'london': {
    intro: 'Discover the best allergy-friendly hotels in London, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. The Athenaeum Hotel & Residences ★★★★★",
        address: "116 Piccadilly, London W1J 7BJ, UK",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Staff trained in food allergies"],
        description: "The on-site restaurant offers gluten-free, dairy-free, and nut-free options. Staff trained in food allergies – Ensuring no cross-contamination.",
        quote: "I have celiac disease, and the restaurant ensured my meals were 100% gluten-free! – Emma W.",
        bookingUrl: "https://www.athenaeumhotel.com/"
      },
      {
        name: "2. The Langham, London ★★★★★",
        address: "1C Portland Pl, London W1B 1JA, UK",
        features: ["⭐ 5-star luxury", "🍰 Dedicated gluten-free afternoon tea", "🍽️ Kitchen trained to prevent cross-contamination"],
        description: "Dedicated gluten-free afternoon tea available at the Palm Court. Their kitchen is trained to prevent cross-contamination for allergy sufferers.",
        quote: "Best gluten-free afternoon tea in London! – Sophie M.",
        bookingUrl: "https://www.langhamhotels.com/en/the-langham/london/"
      },
      {
        name: "3. The Ritz London ★★★★★",
        address: "150 Piccadilly, London W1J 9BR, UK",
        features: ["⭐ 5-star luxury", "🍽️ Bespoke meal preparation", "📋 Dedicated gluten-free menu"],
        description: "The restaurant customizes meals for guests with allergies and offers a dedicated gluten-free menu.",
        quote: "The best allergy-safe dining experience I've ever had! – Mark D.",
        bookingUrl: "https://www.theritzlondon.com/"
      },
      {
        name: "4. One Aldwych ★★★★★",
        address: "1 Aldwych, London WC2B 4BZ, UK",
        features: ["⭐ 5-star luxury", "🌱 Fully vegan and gluten-free menus", "👨‍🍳 Kitchen trained in allergy protocols"],
        description: "Indigo Restaurant serves gourmet dishes free from gluten and dairy. The kitchen staff is trained in allergy protocols to ensure safe dining.",
        quote: "Indigo was a game-changer! 100% gluten-free and dairy-free! – Laura H.",
        bookingUrl: "https://www.onealdwych.com/"
      }
    ],
    faqs: [
      {
        question: "Are there many restaurants in London that cater to food allergies?",
        answer: "Yes, London has a wide variety of restaurants that cater to different allergies. Many restaurants are becoming more aware of cross-contamination and offer detailed allergen menus."
      },
      {
        question: "How can I ensure my hotel room is allergy-free?",
        answer: "When booking, request a room that has been thoroughly cleaned and is free from potential allergens like dust mites. Some hotels offer hypoallergenic bedding and air purifiers."
      },
      {
        question: "What should I do if I have a reaction while in London?",
        answer: "London has excellent medical facilities. In case of a severe reaction, call 999 for emergency services. Always carry your allergy medication with you."
      },
      {
        question: "Are there any traditional British dishes that can be made allergy-friendly?",
        answer: "Yes, many traditional British dishes can be adapted to be allergy-friendly. Fish and chips can be made gluten-free, and many meat dishes are naturally dairy-free. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "French", "German", "Spanish", "Pronunciation (French)"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "Ich habe eine Lebensmittelallergie", "Tengo una alergia alimentaria", "Jay oon a-lair-zhee a-lee-mon-tair"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "Ich kann kein Gluten essen", "No puedo comer gluten", "Je ne peu pa mon-jay deu gloo-ten"],
        ["I am allergic to nuts", "Je suis allergique aux noix", "Ich bin allergisch gegen Nüsse", "Soy alérgico a las nueces", "Je swee a-lair-zheek o nwa"],
        ["Does this contain dairy?", "Est-ce que cela contient des produits laitiers?", "Enthält dies Milchprodukte?", "¿Esto contiene productos lácteos?", "Es keuh seh-la con-tee-an day pro-dwee lay-tee-ay?"],
        ["I need gluten-free food", "J'ai besoin de nourriture sans gluten", "Ich brauche glutenfreie Speisen", "Necesito comida sin gluten", "Jay be-zwan deu noo-ri-ture son gloo-ten"]
      ]
    }
  },
  'paris': {
    intro: 'Discover the best allergy-friendly hotels in Paris, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Shangri-La Hotel, Paris ★★★★★",
        address: "10 Avenue d'Iéna, 75116 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Maria K.",
        bookingUrl: "https://www.shangri-la.com/paris/shangrila/"
      },
      {
        name: "2. Four Seasons Hotel George V, Paris ★★★★★",
        address: "31 Avenue George V, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.fourseasons.com/paris/"
      },
      {
        name: "3. Le Bristol Paris ★★★★★",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "Le Bristol Paris offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Le Bristol. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
      },
      {
        name: "4. Hôtel Plaza Athénée, Paris ★★★★★",
        address: "25 Avenue Montaigne, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Hôtel Plaza Athénée were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/"
      }
    ],
    faqs: [
      {
        question: "Are there many restaurants in Paris that cater to food allergies?",
        answer: "Yes, Paris has a wide variety of restaurants that cater to different allergies. Many restaurants are becoming more aware of cross-contamination and offer detailed allergen menus."
      },
      {
        question: "How can I ensure my hotel room is allergy-free?",
        answer: "When booking, request a room that has been thoroughly cleaned and is free from potential allergens like dust mites. Some hotels offer hypoallergenic bedding and air purifiers."
      },
      {
        question: "What should I do if I have a reaction while in Paris?",
        answer: "Paris has excellent medical facilities. In case of a severe reaction, call 112 for emergency services. Always carry your allergy medication with you."
      },
      {
        question: "Are there any traditional French dishes that can be made allergy-friendly?",
        answer: "Yes, many traditional French dishes can be adapted to be allergy-friendly. Crêpes can be made gluten-free, and many meat dishes are naturally dairy-free. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "French", "Pronunciation"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "Jay oon a-lair-zhee a-lee-mon-tair"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "Je ne peu pa mon-jay deu gloo-ten"],
        ["I am allergic to nuts", "Je suis allergique aux noix", "Je swee a-lair-zheek o nwa"],
        ["Does this contain dairy?", "Est-ce que cela contient des produits laitiers?", "Es keuh seh-la con-tee-an day pro-dwee lay-tee-ay?"],
        ["I need gluten-free food", "J'ai besoin de nourriture sans gluten", "Jay be-zwan deu noo-ri-ture son gloo-ten"]
      ]
    }
  },
  'barcelona': {
    intro: 'Discover the best allergy-friendly hotels in Barcelona, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Hotel Arts Barcelona ★★★★★",
        address: "Marina 19-21, 08005 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Maria K.",
        bookingUrl: "https://www.hotelartsbarcelona.com/"
      },
      {
        name: "2. Mandarin Oriental, Barcelona ★★★★★",
        address: "Passeig de Gràcia, 38-40, 08007 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.mandarinoriental.com/barcelona/passeig-de-gracia/luxury-hotel"
      },
      {
        name: "3. W Barcelona ★★★★★",
        address: "Plaça Rosa Del Vents 1, Final, Passeig Joan de Borbó, 08039 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "W Barcelona offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at W Barcelona. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.marriott.com/en-us/hotels/bcnwh-w-barcelona/overview/"
      },
      {
        name: "4. Hotel Majestic Barcelona ★★★★★",
        address: "Passeig de Gràcia, 68, 08007 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Hotel Majestic Barcelona were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.hotelmajestic.es/en/"
      }
    ],
    faqs: [
      {
        question: "Are there many restaurants in Barcelona that cater to food allergies?",
        answer: "Yes, Barcelona has a wide variety of restaurants that cater to different allergies. Many restaurants are becoming more aware of cross-contamination and offer detailed allergen menus."
      },
      {
        question: "How can I ensure my hotel room is allergy-free?",
        answer: "When booking, request a room that has been thoroughly cleaned and is free from potential allergens like dust mites. Some hotels offer hypoallergenic bedding and air purifiers."
      },
      {
        question: "What should I do if I have a reaction while in Barcelona?",
        answer: "Barcelona has excellent medical facilities. In case of a severe reaction, call 112 for emergency services. Always carry your allergy medication with you."
      },
      {
        question: "Are there any traditional Catalan dishes that can be made allergy-friendly?",
        answer: "Yes, many traditional Catalan dishes can be adapted to be allergy-friendly. Paella can be made gluten-free, and many seafood dishes are naturally dairy-free. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Tengo una alergia alimentaria", "Tengo una a-ler-hee-a a-lee-men-ta-ree-a"],
        ["I cannot eat gluten", "No puedo comer gluten", "No poo-eh-tho ko-mer gloo-ten"],
        ["I am allergic to nuts", "Soy alérgico a las nueces", "Soy a-ler-hee-ko a las noo-eh-thes"],
        ["Does this contain dairy?", "¿Esto contiene productos lácteos?", "Eh-sto kon-tee-eh-neh pro-thook-tos lak-teh-os?"],
        ["I need gluten-free food", "Necesito comida sin gluten", "Neh-theh-see-to ko-mee-tha sin gloo-ten"]
      ]
    }
  },
  'cyprus': {
    intro: 'Discover the best allergy-friendly hotels in Cyprus, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Four Seasons Hotel, Limassol ★★★★★",
        address: "67-69 Amathountos Avenue, Agios Tychonas, Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Maria K.",
        bookingUrl: "https://www.fourseasons.com.cy/"
      },
      {
        name: "2. Amathus Beach Hotel, Limassol ★★★★★",
        address: "75 Amathountos Avenue, Agios Tychonas, Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.amathuslimassol.com/"
      },
      {
        name: "3. Elysium Hotel, Paphos ★★★★★",
        address: "Queen Verenikis Street, Paphos, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "Elysium Hotel offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Elysium. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.elysium-hotel.com/"
      },
      {
        name: "4. Almyra Hotel, Paphos ★★★★★",
        address: "Poseidonos Avenue, Paphos, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Almyra Hotel were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.almyra.com/"
      }
    ],
    faqs: [
      {
        question: "Are there many restaurants in Cyprus that cater to food allergies?",
        answer: "Yes, Cyprus has a growing number of restaurants that cater to different allergies. Many restaurants are becoming more aware of cross-contamination and offer detailed allergen menus."
      },
      {
        question: "How can I ensure my hotel room is allergy-free?",
        answer: "When booking, request a room that has been thoroughly cleaned and is free from potential allergens like dust mites. Some hotels offer hypoallergenic bedding and air purifiers."
      },
      {
        question: "What should I do if I have a reaction while in Cyprus?",
        answer: "Cyprus has good medical facilities. In case of a severe reaction, call 112 for emergency services. Always carry your allergy medication with you."
      },
      {
        question: "Are there any traditional Cypriot dishes that can be made allergy-friendly?",
        answer: "Yes, many traditional Cypriot dishes can be adapted to be allergy-friendly. Souvlaki can be made gluten-free, and many seafood dishes are naturally dairy-free. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Έχω μια τροφική αλλεργία", "Écho mia trofikí allergía"],
        ["I cannot eat gluten", "Δεν μπορώ να φάω γλουτένη", "Den boró na fáo glouténi"],
        ["I am allergic to nuts", "Είμαι αλλεργικός στους ξηρούς καρπούς", "Ímai allergikós stous xiroús karpoús"],
        ["Does this contain dairy?", "Αυτό περιέχει γαλακτοκομικά προϊόντα;", "Aftó periéchei galaktokomiká proïónta?"],
        ["I need gluten-free food", "Χρειάζομαι φαγητό χωρίς γλουτένη", "Chreiázomai fagitó chorís glouténi"]
      ]
    }
  },
  'abu-dhabi': {
    intro: 'Discover the best allergy-friendly hotels in Abu Dhabi, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Emirates Palace, Abu Dhabi ★★★★★",
        address: "West Corniche Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Maria K.",
        bookingUrl: "https://www.mandarinoriental.com/en/abu-dhabi/emirates-palace"
      },
      {
        name: "2. The St. Regis Saadiyat Island Resort, Abu Dhabi ★★★★★",
        address: "Saadiyat Island, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.marriott.com/en-us/hotels/auhst-the-st-regis-saadiyat-island-resort-abu-dhabi/overview/"
      },
      {
        name: "3. Jumeirah at Etihad Towers, Abu Dhabi ★★★★★",
        address: "Corniche Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "Jumeirah at Etihad Towers offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Jumeirah. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.jumeirah.com/en/stay/abu-dhabi/jumeirah-etihad-towers"
      },
      {
        name: "4. Qasr Al Sarab Desert Resort by Anantara ★★★★★",
        address: "1 Qasr Al Sarab Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Qasr Al Sarab were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.anantara.com/en/qasr-al-sarab-abu-dhabi"
      }
    ],
    faqs: [
      {
        question: "Are there many restaurants in Abu Dhabi that cater to food allergies?",
        answer: "Yes, Abu Dhabi has a growing number of restaurants that cater to different allergies. Many restaurants are becoming more aware of cross-contamination and offer detailed allergen menus."
      },
      {
        question: "How can I ensure my hotel room is allergy-free?",
        answer: "When booking, request a room that has been thoroughly cleaned and is free from potential allergens like dust mites. Some hotels offer hypoallergenic bedding and air purifiers."
      },
      {
        question: "What should I do if I have a reaction while in Abu Dhabi?",
        answer: "Abu Dhabi has excellent medical facilities. In case of a severe reaction, call 999 for emergency services. Always carry your allergy medication with you."
      },
      {
        question: "Are there any traditional Emirati dishes that can be made allergy-friendly?",
        answer: "Yes, many traditional Emirati dishes can be adapted to be allergy-friendly. Machboos can be made gluten-free, and many grilled meat dishes are naturally dairy-free. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "Arabic", "Pronunciation"],
      rows: [
        ["I have a food allergy", "لدي حساسية طعام", "Laday hassasiat ta'am"],
        ["I cannot eat gluten", "لا يمكنني تناول الغلوتين", "La yumkinuni tanawul alghulutin"],
        ["I am allergic to nuts", "أنا أتحسس من المكسرات", "Ana atahassas min almukassarat"],
        ["Does this contain dairy?", "هل يحتوي هذا على منتجات ألبان؟", "Hal yahtawi hatha 'ala muntajat alban?"],
        ["I need gluten-free food", "أحتاج إلى طعام خال من الغلوتين", "Ahtaju ila ta'am khalin min alghulutin"]
      ]
    }
  },
  'crete': {
    intro: 'Discover the best allergy-friendly hotels in Crete, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Blue Palace, a Luxury Collection Resort & Spa, Crete ★★★★★",
        address: "Elounda, Crete, 72053, Greece",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Maria K.",
        bookingUrl: "https://www.bluepalace.gr/"
      },
      {
        name: "2. Daios Cove Luxury Resort & Villas ★★★★★",
        address: "Vathi, Agios Nikolaos, Crete, 72100, Greece",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs
