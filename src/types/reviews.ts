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
  | 'portugal';

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
    description: 'Allergy-Friendly Hotels in London (2024 Guide)',
    subtitle: 'Discover top-rated, allergy-conscious accommodations for a safe and enjoyable stay in London.',
    image: 'photo-1513635269975-59663e0ac1ad'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Allergy-Friendly Hotels in Paris (2024 Guide)',
    subtitle: 'Find the best allergy-friendly hotels in Paris for a worry-free vacation.',
    image: 'photo-1502602898657-3e91760cbb34'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Allergy-Friendly Hotels in Barcelona (2024 Guide)',
    subtitle: 'Explore Barcelona with confidence, staying at hotels that cater to your allergy needs.',
    image: 'photo-1583422409516-2895a77efded'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    country: 'Cyprus',
    description: 'Allergy-Friendly Hotels in Cyprus (2024 Guide)',
    subtitle: 'Enjoy a safe and relaxing holiday in Cyprus with our selection of allergy-friendly hotels.',
    image: 'photo-1500375592092-40eb2168fd21'
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'UAE',
    description: 'Allergy-Friendly Hotels in Abu Dhabi (2024 Guide)',
    subtitle: 'Experience luxury and safety in Abu Dhabi with hotels that understand your allergy concerns.',
    image: 'photo-1512632578888-169bbbc64f33'
  },
  {
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    description: 'Allergy-Friendly Hotels in Crete (2024 Guide)',
    subtitle: 'Discover the best allergy-friendly hotels in Crete for a worry-free vacation.',
    image: 'photo-1469796466635-455ede028aca'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Allergy-Friendly Hotels in Tokyo (2024 Guide)',
    subtitle: 'Navigate Tokyo\'s culinary scene safely with these allergy-friendly hotels.',
    image: 'photo-1542051841857-5f90071e7989'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    description: 'Allergy-Friendly Hotels in Thailand (2024 Guide)',
    subtitle: 'Experience the beauty of Thailand with peace of mind at these allergy-friendly hotels.',
    image: 'photo-1552465011-b4e21bf6e79a'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    description: 'Allergy-Friendly Hotels in New York (2024 Guide)',
    subtitle: 'Discover the top allergy-friendly hotels in the Big Apple for a safe and comfortable stay.',
    image: 'photo-1496442226666-8d4d0e62e6e9'
  },
  {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    description: 'Allergy-Friendly Hotels in Ayia Napa (2024 Guide)',
    subtitle: 'Enjoy a safe and relaxing holiday in Ayia Napa with our selection of allergy-friendly hotels.',
    image: 'photo-1559128045-e01b64c84c74'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    country: 'Portugal',
    description: 'Allergy-Friendly Hotels in Portugal (2025 Guide)',
    subtitle: 'Family- and couple-friendly allergy-aware hotels across Lisbon, the Algarve and Porto – with allergen-safe dining and verified hospitality standards.',
    image: 'photo-1555881400-74d7acaacd8b'
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
        question: "Are there many allergy-friendly restaurants in London?",
        answer: "Yes, London has a wide variety of restaurants that cater to different allergies. Many restaurants are well-informed about cross-contamination and offer detailed allergen menus."
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
        question: "Are there any specific certifications for allergy-friendly establishments in London?",
        answer: "While there isn't a single overarching certification, look for establishments that have Allergy UK's 'Allergy Aware' accreditation or similar endorsements."
      }
    ],
    languageTable: {
      headers: ["English", "French", "German", "Spanish", "Italian", "Pronunciation"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "zhay uhn a-lair-zhee a-lee-mahn-tair / eesh ha-buh ai-nuh leeb-s-mi-tel a-lee-gEE / ten-go oo-na a-lair-he-a a-lee-men-ta-ree-a / ooon a-lair-jee-a a-lee-men-ta-reh"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "zhuh nuh puh pah mahn-zhay duh gloo-tehn / eesh kan kain gloo-ten e-suhn / no poo-ay-tho ko-mer gloo-ten / non po-so man-jah-reh eel gloo-tee-neh"],
        ["I am allergic to nuts", "Je suis allergique aux noix", "zhuh swee a-lair-zheek o no-ah / eesh bin a-lair-gish gay-guhn nU-suh / soy a-lair-hee-ko a las noo-ay-thes / so-no a-lair-jee-ko a-la froo-ta a goo-sho"],
        ["Does this contain dairy?", "Est-ce que ceci contient des produits laitiers?", "es kuh suh-see kohn-tee-uhn day pro-doo-ee lay-tee-ay / ent-helt dees milch-pro-doo-ktuh / es-to kon-tee-ay-neh pro-thoo-ktos lak-te-os / koo-es-to kon-tee-ay-neh la-tee-chee-nee"],
        ["I need gluten-free food", "J'ai besoin de nourriture sans gluten", "zhay buh-zwan duh noo-ree-tur sang gloo-tehn / eesh brow-khuh gloo-ten-fry-es e-suhn / ne-se-see-to ko-mee-tha sin gloo-ten / o bee-zo-nyo dee chee-bo sen-za gloo-tee-neh"]
      ]
    }
  },
  'paris': {
    intro: 'Discover the best allergy-friendly hotels in Paris, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Shangri-La Hotel Paris ★★★★★",
        address: "10 Avenue d'Iéna, 75116 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated pastry chef for allergies"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated pastry chef who specializes in creating allergy-friendly desserts.",
        quote: "The pastry chef made the most amazing gluten-free and dairy-free desserts for my daughter. It was a dream come true! – Marie S.",
        bookingUrl: "https://www.shangri-la.com/paris/shangrila/"
      },
      {
        name: "2. Four Seasons Hotel George V Paris ★★★★★",
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
        description: "Le Bristol offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Le Bristol. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
      },
      {
        name: "4. Hôtel Plaza Athénée ★★★★★",
        address: "25 Avenue Montaigne, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Hôtel Plaza Athénée were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/"
      }
    ],
    faqs: [
      {
        question: "Are there many allergy-friendly restaurants in Paris?",
        answer: "Yes, Paris has a wide variety of restaurants that cater to different allergies. Many restaurants are well-informed about cross-contamination and offer detailed allergen menus."
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
        question: "Are there any specific certifications for allergy-friendly establishments in Paris?",
        answer: "While there isn't a single overarching certification, look for establishments that have the 'Allergie Confiance' label or similar endorsements."
      }
    ],
    languageTable: {
      headers: ["English", "French", "Pronunciation"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "zhay uhn a-lair-zhee a-lee-mahn-tair"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "zhuh nuh puh pah mahn-zhay duh gloo-tehn"],
        ["I am allergic to nuts", "Je suis allergique aux noix", "zhuh swee a-lair-zheek o no-ah"],
        ["Does this contain dairy?", "Est-ce que ceci contient des produits laitiers?", "es kuh suh-see kohn-tee-uhn day pro-doo-ee lay-tee-ay"],
        ["I need gluten-free food", "J'ai besoin de nourriture sans gluten", "zhay buh-zwan duh noo-ree-tur sang gloo-tehn"]
      ]
    }
  },
  'barcelona': {
    intro: 'Discover the best allergy-friendly hotels in Barcelona, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Hotel Arts Barcelona ★★★★★",
        address: "Marina 19-21, 08005 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated gluten-free chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating gluten-free dishes.",
        quote: "The gluten-free options were amazing! I felt so safe and well taken care of. – Jessica M.",
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
        name: "3. Almanac Barcelona ★★★★★",
        address: "Gran Via de les Corts Catalanes, 619-621, 08007 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "Almanac Barcelona offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Almanac Barcelona. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.almanachotels.com/barcelona/"
      },
      {
        name: "4. W Barcelona ★★★★★",
        address: "Plaça Rosa Del Vents 1, Final, Passeig Joan de Borbó, 08003 Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at W Barcelona were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.marriott.com/en-us/hotels/bcnwh-w-barcelona/overview/"
      }
    ],
    faqs: [
      {
        question: "Are there many allergy-friendly restaurants in Barcelona?",
        answer: "Yes, Barcelona has a wide variety of restaurants that cater to different allergies. Many restaurants are well-informed about cross-contamination and offer detailed allergen menus."
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
        question: "Are there any specific certifications for allergy-friendly establishments in Barcelona?",
        answer: "While there isn't a single overarching certification, look for establishments that have the 'Catalan Celiac Association' endorsement or similar labels."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Tengo una alergia alimentaria", "Ten-go oo-na a-ler-he-a a-lee-men-ta-ree-a"],
        ["I cannot eat gluten", "No puedo comer gluten", "No poo-ay-tho ko-mer gloo-ten"],
        ["I am allergic to nuts", "Soy alérgico a las nueces", "Soy a-lair-hee-ko a las noo-ay-thes"],
        ["Does this contain dairy?", "¿Esto contiene productos lácteos?", "Es-to kon-tee-ay-neh pro-thoo-ktos lak-te-os"],
        ["I need gluten-free food", "Necesito comida sin gluten", "Ne-se-see-to ko-mee-tha sin gloo-ten"]
      ]
    }
  },
  'cyprus': {
    intro: 'Discover the best allergy-friendly hotels in Cyprus, ensuring a safe and enjoyable stay for travelers with food allergies. These hotels offer dedicated gluten-free, dairy-free, and nut-free options, along with trained staff to handle severe allergies.',
    hotels: [
      {
        name: "1. Almyra Hotel ★★★★★",
        address: "Poseidonos Avenue, P.O. Box 60182, 8101 Paphos, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated gluten-free chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating gluten-free dishes.",
        quote: "The gluten-free options were amazing! I felt so safe and well taken care of. – Jessica M.",
        bookingUrl: "https://www.almyra.com/"
      },
      {
        name: "2. Anassa Hotel ★★★★★",
        address: "P.O. Box 66069, 8820 Polis, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.anassa.com/"
      },
      {
        name: "3. Four Seasons Hotel Limassol ★★★★★",
        address: "67/69 Amathontos Avenue, 4533 Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "The Four Seasons Hotel Limassol offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at the Four Seasons. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.fourseasons.com.cy/"
      },
      {
        name: "4. Amathus Beach Hotel Limassol ★★★★★",
        address: "75 Amathus Avenue, 4532 Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Amathus Beach Hotel were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.amathuslimassol.com/"
      }
    ],
    faqs: [
      {
        question: "Are there many allergy-friendly restaurants in Cyprus?",
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
        question: "What are some common Cypriot dishes that can be made allergy-friendly?",
        answer: "Many traditional Cypriot dishes can be adapted to be allergy-friendly. Souvlaki (grilled meat skewers) can be made gluten-free, and dishes like halloumi can be prepared without dairy. Always confirm with the restaurant."
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
        name: "1. Emirates Palace ★★★★★",
        address: "West Corniche Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Dedicated allergy chef"],
        description: "The hotel offers customized menus for guests with allergies and has a dedicated chef who specializes in creating allergy-friendly dishes.",
        quote: "The allergy-friendly options were amazing! I felt so safe and well taken care of. – Aisha M.",
        bookingUrl: "https://www.mandarinoriental.com/en/abu-dhabi/emirates-palace"
      },
      {
        name: "2. The St. Regis Abu Dhabi ★★★★★",
        address: "Nation Towers, Corniche, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Personalized allergy menus", "👨‍🍳 Chefs trained in allergy protocols"],
        description: "The hotel's restaurants offer personalized menus tailored to guests' allergies, with chefs trained in allergy protocols to ensure safe dining experiences.",
        quote: "The staff was incredibly attentive to my allergies and made sure every meal was safe and delicious. – John P.",
        bookingUrl: "https://www.marriott.com/en-us/hotels/auhxr-the-st-regis-abu-dhabi/overview/"
      },
      {
        name: "3. Jumeirah at Etihad Towers ★★★★★",
        address: "Corniche Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly options in all restaurants", "👨‍🍳 Dedicated allergy contact person"],
        description: "Jumeirah at Etihad Towers offers allergy-friendly options in all its restaurants and has a dedicated allergy contact person to assist guests with dietary restrictions.",
        quote: "I felt so safe and well taken care of at Jumeirah. They went above and beyond to accommodate my allergies. – Emily R.",
        bookingUrl: "https://www.jumeirah.com/en/stay/abu-dhabi/jumeirah-at-etihad-towers"
      },
      {
        name: "4. Shangri-La Hotel, Qaryat Al Beri, Abu Dhabi ★★★★★",
        address: "Qaryat Al Beri, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Chefs with allergy expertise"],
        description: "The hotel's restaurants offer customized menus for guests with allergies, with chefs who have extensive expertise in preparing allergy-friendly meals.",
        quote: "The chefs at Shangri-La were so knowledgeable about allergies and created the most delicious and safe meals for me. – Sarah L.",
        bookingUrl: "https://www.shangri-la.com/en/abudhabi/shangrila/"
      }
    ],
    faqs: [
      {
        question: "Are there many allergy-friendly restaurants in Abu Dhabi?",
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
        answer: "Yes, some traditional Emirati dishes can be adapted to be allergy-friendly. For example, rice-based dishes can be made gluten-free, and grilled meats can be prepared without common allergens. Always confirm with the restaurant."
      }
    ],
    languageTable: {
      headers: ["English", "Arabic", "Pronunciation"],
      rows: [
        ["I have a food allergy", "لدي حساسية طعام", "Laday hassasiat ta'am"],
        ["I cannot eat gluten", "لا يمكنني تناول الغلوتين", "La yumkinuni tanawul alghulutin"],
        ["I am allergic to nuts", "أنا متحسس من المكسرات", "Ana mutahassis min almukassirat"],
        ["Does this contain dairy?", "هل يحتوي هذا على منتجات الألبان؟", "Hal yahtawi hatha ealaa muntajat alalban?"],
        ["I need gluten-free food", "أحتاج إلى طعام خال من الغلوتين", "Ahtaj 'iilaa ta'am khal min alghulutin"]
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
        address: "Vathi, Agios Nikolaos, Crete, 72100,
