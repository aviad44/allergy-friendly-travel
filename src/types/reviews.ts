
export interface Review {
  id?: number | string;
  rating: number;
  text: string;
  created_at?: string;
  destination?: string;
  traveler_type?: string;
  author_name?: string;
  user_id?: string;
}

// Sort options for reviews
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

// Destination interfaces and data
export interface Destination {
  id: DestinationId;
  name: string;
  country: string;
  image: string;
  description: string;
  subtitle: string;
}

export type DestinationId = 
  'london' | 
  'paris' | 
  'barcelona' | 
  'tokyo' | 
  'new-york' | 
  'abu-dhabi' | 
  'thailand' | 
  'ayia-napa' | 
  'crete' | 
  'cyprus';

export const destinations: Destination[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: 'photo-1513635269975-59663e0ac1ad',
    description: 'Best Allergy-Friendly Hotels in London',
    subtitle: 'A Comprehensive Guide for Food-Allergy Travelers'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'photo-1502602898657-3e91760cbb34',
    description: 'Ultimate Guide to Allergy-Friendly Hotels in Paris',
    subtitle: 'Safe Accommodations for Travelers with Food Allergies'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'photo-1583422409516-2895a77efded',
    description: 'The Ultimate Guide to Allergy-Friendly Hotels in Barcelona',
    subtitle: 'Safe and Comfortable Stays for Travelers with Food Allergies'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'photo-1540959733332-eab4deabeeaf',
    description: 'Best Allergy-Friendly Hotels in Tokyo',
    subtitle: 'A Comprehensive Guide for Travelers with Dietary Restrictions'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    image: 'photo-1496442226666-8d4d0e62e6e9',
    description: 'Allergy-Friendly Hotels in New York City',
    subtitle: 'Safe Accommodations for Travelers with Dietary Restrictions'
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    image: 'photo-1512632578888-169bbbc64f33',
    description: 'Best Allergy-Friendly Hotels in Abu Dhabi',
    subtitle: 'Premium Accommodations for Guests with Food Allergies'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    image: 'photo-1552465011-b4e21bf6e79a',
    description: 'Top Allergy-Friendly Hotels in Thailand',
    subtitle: 'Safe Accommodations for Food-Sensitive Travelers'
  },
  {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    country: 'Cyprus',
    image: 'photo-1536599424071-0b215a388ba7',
    description: 'Allergy-Friendly Hotels in Ayia Napa',
    subtitle: 'Enjoy a Worry-Free Beach Vacation with Dietary Restrictions'
  },
  {
    id: 'crete',
    name: 'Crete',
    country: 'Greece',
    image: 'photo-1556952212-56d1c194aca3',
    description: 'Top Allergy-Friendly Hotels in Crete',
    subtitle: 'Safe Mediterranean Getaways for Food-Sensitive Travelers'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    country: 'Cyprus',
    image: 'photo-1599946347371-68eb71b16afc',
    description: 'Best Allergy-Friendly Hotels in Cyprus',
    subtitle: 'Safe Island Accommodations for Dietary Restrictions'
  }
];

// Language support
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'he';

export const languages = [
  { name: 'English', code: 'en' },
  { name: 'Español', code: 'es' },
  { name: 'Français', code: 'fr' },
  { name: 'Deutsch', code: 'de' },
  { name: 'Italiano', code: 'it' },
  { name: 'Português', code: 'pt' },
  { name: 'Nederlands', code: 'nl' },
  { name: 'עברית', code: 'he' }
];

// Structure for destination data
interface Hotel {
  name: string;
  address: string;
  features: string[];
  description: string;
  quote: string;
  bookingUrl: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface LanguageTable {
  headers: string[];
  rows: string[][];
}

interface DestinationContent {
  intro: string;
  hotels: Hotel[];
  faqs: FAQ[];
  languageTable: LanguageTable;
}

export const destinationData: Record<DestinationId, DestinationContent> = {
  'london': {
    intro: 'London offers an excellent range of accommodations for travelers with food allergies. With strict food labeling laws in the UK, many hotels have trained their staff to safely cater to guests with special dietary needs.',
    hotels: [
      {
        name: "The Athenaeum Hotel & Residences ★★★★★",
        address: "116 Piccadilly, London W1J 7BJ, UK",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Staff trained in food allergies"],
        description: "The on-site restaurant offers gluten-free, dairy-free, and nut-free options. Staff trained in food allergies – Ensuring no cross-contamination.",
        quote: "I have celiac disease, and the restaurant ensured my meals were 100% gluten-free! – Emma W.",
        bookingUrl: "https://www.athenaeumhotel.com/"
      },
      {
        name: "The Langham, London ★★★★★",
        address: "1C Portland Pl, London W1B 1JA, UK",
        features: ["⭐ 5-star luxury", "🍰 Dedicated gluten-free afternoon tea", "🍽️ Kitchen trained to prevent cross-contamination"],
        description: "Dedicated gluten-free afternoon tea available at the Palm Court. Their kitchen is trained to prevent cross-contamination for allergy sufferers.",
        quote: "Best gluten-free afternoon tea in London! – Sophie M.",
        bookingUrl: "https://www.langhamhotels.com/en/the-langham/london/"
      },
      {
        name: "One Aldwych ★★★★★",
        address: "1 Aldwych, London WC2B 4BZ, UK",
        features: ["⭐ 5-star luxury", "🌱 Fully vegan and gluten-free menus", "👨‍🍳 Kitchen trained in allergy protocols"],
        description: "Indigo Restaurant serves gourmet dishes free from gluten and dairy. The kitchen staff is trained in allergy protocols to ensure safe dining.",
        quote: "Indigo was a game-changer! 100% gluten-free and dairy-free! – Laura H.",
        bookingUrl: "https://www.onealdwych.com/"
      }
    ],
    faqs: [
      {
        question: "Do London hotels accommodate severe food allergies?",
        answer: "Yes, many London hotels, especially luxury ones, are well-equipped to handle severe food allergies. Always notify hotels in advance of your specific needs."
      },
      {
        question: "Is it common to find gluten-free options in London hotels?",
        answer: "Very common! The UK has excellent awareness of celiac disease and gluten sensitivities, with many hotels offering robust gluten-free options."
      },
      {
        question: "Should I bring my own allergy translation cards to London?",
        answer: "While English is the primary language, having a detailed allergy card can still be useful to clearly communicate your specific allergies to hotel staff."
      }
    ],
    languageTable: {
      headers: ["English", "Phonetic"],
      rows: [
        ["I have a food allergy", "I hav uh food al-ur-jee"],
        ["I am allergic to peanuts", "I am uh-ler-jik too pee-nuts"],
        ["I cannot eat gluten", "I kan-not eet gloo-tin"],
        ["Is this free from dairy?", "Iz this free from deh-ree?"],
        ["Do you have allergen information?", "Doo yoo hav al-ur-jen in-for-may-shun?"]
      ]
    }
  },
  'paris': {
    intro: 'Paris has made significant progress in catering to travelers with food allergies, with many hotels now offering allergy-friendly alternatives and trained staff to handle dietary restrictions safely.',
    hotels: [
      {
        name: "Le Bristol Paris ★★★★★",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Michelin-starred restaurant with allergy options", "👨‍🍳 Personalized meal preparation"],
        description: "Their Michelin-starred restaurant, Epicure, creates customized menus for guests with allergies. The staff is trained to prevent cross-contamination.",
        quote: "The chef came to my table to discuss my nut allergy and created a special menu just for me. Exceptional service! – James T.",
        bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
      },
      {
        name: "Hôtel Plaza Athénée ★★★★★",
        address: "25 Avenue Montaigne, 75008 Paris, France",
        features: ["⭐ 5-star luxury", "🥗 Allergen-free menu options", "👨‍🍳 Allergy-trained kitchen staff"],
        description: "Alain Ducasse au Plaza Athénée restaurant offers special allergy-friendly menus. The hotel can arrange hypoallergenic rooms upon request.",
        quote: "As someone with multiple food allergies, I felt completely safe dining here. Pure luxury! – Catherine M.",
        bookingUrl: "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/"
      },
      {
        name: "Le Petit Palace ★★★★",
        address: "7 Rue de la Fidélité, 75010 Paris, France",
        features: ["⭐ 4-star boutique hotel", "🍳 Allergen-free breakfast options", "🧹 Hypoallergenic rooms available"],
        description: "Offers gluten-free and dairy-free breakfast options. Staff is knowledgeable about cross-contamination and food allergies.",
        quote: "They made my gluten-free, dairy-free stay absolutely worry-free. – Maria G.",
        bookingUrl: "https://www.lepetitpalace.com/"
      }
    ],
    faqs: [
      {
        question: "Do Paris hotels understand food allergies?",
        answer: "Increasingly yes, especially high-end and international hotel chains. Always call ahead to discuss your specific needs and consider bringing allergy translation cards in French."
      },
      {
        question: "Can I find gluten-free options in Parisian hotels?",
        answer: "Yes, many hotels in Paris now offer gluten-free options, though awareness varies. Luxury hotels typically have the best accommodations for celiac guests."
      },
      {
        question: "What should I say to communicate my allergies in Paris?",
        answer: "Use phrases like 'J'ai une allergie alimentaire' (I have a food allergy) and 'C'est dangereux pour moi' (It's dangerous for me). Bringing printed allergy cards in French is highly recommended."
      }
    ],
    languageTable: {
      headers: ["English", "French", "Pronunciation"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"],
        ["I am allergic to nuts", "Je suis allergique aux noix", "Zhuh swee ah-lehr-zheek oh nwah"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "Zhuh nuh puh pah mahn-zhay duh gloo-tahn"],
        ["Is this dairy-free?", "Est-ce sans produits laitiers?", "Ess sahn pro-dwee lay-tee-ay?"],
        ["This could kill me", "Cela pourrait me tuer", "Suh-lah poo-reh muh tue-ay"]
      ]
    }
  },
  'barcelona': {
    intro: 'Barcelona combines stunning architecture with Mediterranean cuisine that can be adapted for allergy sufferers. Many upscale hotels in the city have embraced allergen awareness to accommodate international travelers.',
    hotels: [
      {
        name: "Grand Hotel Central",
        address: "Via Laietana 30, Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining"],
        description: "Located in the heart of Barcelona, this luxury hotel prioritizes guest well-being. One visitor noted, \"Absolutely loved this hotel. From the moment I arrived, they ensured all my dietary needs were met.\"",
        quote: "Absolutely loved this hotel. From the moment I arrived, they ensured all my dietary needs were met.",
        bookingUrl: "https://www.grandhotelcentral.com/"
      },
      {
        name: "Mercer Hotel Barcelona",
        address: "Carrer dels Lledó 7, Barcelona, Spain",
        features: ["⭐ 5-star luxury", "👨‍🍳 Personalized dining", "🍽️ Dedicated kitchen"],
        description: "Renowned for its exceptional service, Mercer Hotel provides tailored meals for guests with allergies.",
        quote: "The staff was incredibly attentive to my son's peanut allergy, making our stay stress-free.",
        bookingUrl: "https://www.mercerbarcelona.com/"
      },
      {
        name: "Hotel Arts Barcelona",
        address: "Marina 19-21, Barcelona, Spain",
        features: ["⭐ 5-star luxury", "🏖️ Beachfront", "🍽️ Allergen-conscious dining"],
        description: "Overlooking the marina, Hotel Arts offers allergy-conscious dining.",
        quote: "The staff took my allergies seriously and ensured every meal was prepared safely.",
        bookingUrl: "https://www.hotelartsbarcelona.com/"
      }
    ],
    faqs: [
      {
        question: "How accommodating are Barcelona hotels for celiacs?",
        answer: "Most upscale hotels in Barcelona are familiar with celiac disease and can provide gluten-free options. Spain has a high prevalence of celiac disease, so awareness is generally good."
      },
      {
        question: "Do Barcelona hotels understand nut allergies?",
        answer: "Yes, especially international hotel chains and luxury properties. Always communicate your allergies clearly upon booking and arrival, and consider carrying allergy translation cards in Spanish and Catalan."
      },
      {
        question: "What Spanish phrases should I know for communicating allergies?",
        answer: "Learn phrases like 'Tengo alergia a...' (I am allergic to...) and 'Esto puede causarme una reacción grave' (This can cause me a serious reaction). Always clarify that cross-contamination is also a concern."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "Catalan"],
      rows: [
        ["I have a food allergy", "Tengo una alergia alimentaria", "Tinc una al·lèrgia alimentària"],
        ["I am allergic to peanuts", "Soy alérgico/a a los cacahuetes", "Sóc al·lèrgic/a als cacauets"],
        ["No gluten, please", "Sin gluten, por favor", "Sense gluten, si us plau"],
        ["Is this free from dairy?", "¿Esto no contiene lácteos?", "Això no conté lactis?"],
        ["This could cause anaphylaxis", "Esto puede causarme anafilaxia", "Això em pot causar anafilaxi"]
      ]
    }
  },
  'tokyo': {
    intro: 'Tokyo has become increasingly accommodating to travelers with food allergies, with many international hotels offering specialized menus and trained staff to handle dietary restrictions in this foodie paradise.',
    hotels: [
      {
        name: "Park Hyatt Tokyo ★★★★★",
        address: "3-7-1-2 Nishi Shinjuku, Shinjuku-ku, Tokyo, Japan",
        features: ["⭐ 5-star luxury", "🍽️ Dedicated allergy menus", "🌐 English-speaking staff"],
        description: "Famous from 'Lost in Translation', this hotel has excellent allergy protocols. Their restaurants can accommodate various food allergies with advance notice.",
        quote: "They handled my severe shellfish allergy perfectly, with the chef personally discussing safe options with me. – David L.",
        bookingUrl: "https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo/tyoph"
      },
      {
        name: "The Ritz-Carlton, Tokyo ★★★★★",
        address: "Tokyo Midtown 9-7-1 Akasaka, Minato-ku, Tokyo, Japan",
        features: ["⭐ 5-star luxury", "👨‍🍳 Personalized chef consultations", "🍽️ Allergen-free meal preparation"],
        description: "Offers dedicated allergen-free meal preparation. The staff is trained to understand and accommodate various food allergies.",
        quote: "I never felt limited by my celiac disease. They prepared amazing gluten-free Japanese cuisine! – Amanda K.",
        bookingUrl: "https://www.ritzcarlton.com/en/hotels/japan/tokyo"
      },
      {
        name: "Hilton Tokyo ★★★★★",
        address: "6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo, Japan",
        features: ["⭐ 5-star comfort", "🍳 Allergen-labeled buffet", "🌐 Multilingual allergy cards"],
        description: "Their restaurants label allergens clearly and can provide detailed ingredient information. The hotel also offers multilingual allergy cards for guests to use during their stay.",
        quote: "The breakfast buffet was clearly labeled with allergens, making my mornings stress-free. – Michael T.",
        bookingUrl: "https://www.hilton.com/en/hotels/tyohitw-hilton-tokyo/"
      }
    ],
    faqs: [
      {
        question: "How well do Tokyo hotels accommodate food allergies?",
        answer: "International hotel chains in Tokyo are generally well-equipped to handle food allergies, with trained staff and allergen awareness. Always communicate your needs in advance and consider bringing allergy translation cards in Japanese."
      },
      {
        question: "Is it easy to find gluten-free options in Tokyo hotels?",
        answer: "Major international hotels in Tokyo can provide gluten-free options, but local understanding of celiac disease is limited. Always confirm ingredients and preparation methods at the hotel restaurants."
      },
      {
        question: "What's the best way to communicate my allergies in Tokyo?",
        answer: "Use a combination of allergy translation cards in Japanese, hotel concierge assistance, and international hotel chains with English-speaking staff. Visual aids showing your allergies can also be helpful."
      }
    ],
    languageTable: {
      headers: ["English", "Japanese", "Pronunciation"],
      rows: [
        ["I have a food allergy", "私は食物アレルギーがあります", "Watashi wa shokumotsu arerugī ga arimasu"],
        ["I am allergic to nuts", "私はナッツアレルギーです", "Watashi wa nattsu arerugī desu"],
        ["No gluten, please", "グルテンなし、お願いします", "Guruten nashi, onegaishimasu"],
        ["Is this dairy-free?", "これは乳製品不使用ですか？", "Kore wa nyūseihin fushiyō desu ka?"],
        ["This could be dangerous for me", "これは私にとって危険かもしれません", "Kore wa watashi ni totte kiken kamo shiremasen"]
      ]
    }
  },
  'new-york': {
    intro: 'New York City is at the forefront of allergy awareness, with strict food labeling laws and a culture that embraces dietary restrictions. Many hotels offer comprehensive options for travelers with food allergies.',
    hotels: [
      {
        name: "The Pierre, A Taj Hotel ★★★★★",
        address: "2 East 61st Street, New York, NY 10065, USA",
        features: ["⭐ 5-star luxury", "👨‍🍳 Personalized chef service", "🍽️ Custom allergy menus"],
        description: "Located on Fifth Avenue, this iconic hotel can create completely customized menus for guests with allergies. Their kitchens have dedicated preparation areas to prevent cross-contamination.",
        quote: "The chef worked with me to create safe, gourmet meals despite my multiple allergies. Incredible service! – Sarah M.",
        bookingUrl: "https://www.thepierreny.com/"
      },
      {
        name: "The Peninsula New York ★★★★★",
        address: "700 Fifth Avenue at 55th Street, New York, NY 10019, USA",
        features: ["⭐ 5-star luxury", "🍽️ Detailed allergen menus", "👨‍🍳 Staff trained in food allergies"],
        description: "Their restaurants provide detailed allergen information, and staff are trained to take food allergies seriously. The hotel can arrange special room amenities for allergy sufferers.",
        quote: "They went above and beyond to accommodate my daughter's severe peanut allergy. We felt completely safe. – Jennifer K.",
        bookingUrl: "https://www.peninsula.com/en/new-york/5-star-luxury-hotel-midtown-nyc"
      },
      {
        name: "1 Hotel Central Park ★★★★★",
        address: "1414 Avenue of the Americas, New York, NY 10019, USA",
        features: ["⭐ 5-star eco-luxury", "🌱 Farm-to-table dining", "🍽️ Transparent ingredient sourcing"],
        description: "Their farm-to-table restaurant, Jams, focuses on clean, sustainable food with transparent ingredient sourcing. The staff is knowledgeable about allergens and cross-contamination.",
        quote: "As someone with celiac disease, I appreciated their knowledge about gluten-free options and clear communication. – Robert T.",
        bookingUrl: "https://www.1hotels.com/central-park"
      }
    ],
    faqs: [
      {
        question: "How accommodating are NYC hotels for food allergies?",
        answer: "Very accommodating. New York City has some of the best awareness and options for food allergies in the world, with many hotels having standardized protocols for allergy management."
      },
      {
        question: "Do NYC hotels offer gluten-free room service options?",
        answer: "Yes, most upscale hotels in NYC offer gluten-free options on their room service menus. Many have dedicated gluten-free preparation areas in their kitchens."
      },
      {
        question: "Should I notify NYC hotels about my allergies in advance?",
        answer: "Absolutely. While NYC hotels are generally well-equipped to handle allergies, giving them advance notice allows them to prepare properly and possibly assign you a chef who specializes in your dietary needs."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish (for NYC's diverse neighborhoods)"],
      rows: [
        ["I have a severe food allergy", "Tengo una alergia alimentaria grave"],
        ["I am allergic to peanuts", "Soy alérgico/a a los cacahuetes/maníes"],
        ["Is this gluten-free?", "¿Esto es sin gluten?"],
        ["Does this contain dairy?", "¿Esto contiene lácteos?"],
        ["I need ingredients listed", "Necesito la lista de ingredientes"]
      ]
    }
  },
  'abu-dhabi': {
    intro: 'Abu Dhabi\'s luxury hotels excel at catering to guests with special dietary requirements, offering personalized service and a growing awareness of food allergies to international travelers.',
    hotels: [
      {
        name: "Emirates Palace Mandarin Oriental ★★★★★",
        address: "West Corniche Road, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "👨‍🍳 Private chef options", "🍽️ Personalized allergy menus"],
        description: "This iconic palace hotel offers exceptional personalized service for guests with allergies. Their multiple restaurants can prepare custom meals with advance notice.",
        quote: "They assigned a specific chef to handle my son's severe allergies throughout our stay. Pure luxury! – Jonathan P.",
        bookingUrl: "https://www.mandarinoriental.com/en/abu-dhabi/emirates-palace"
      },
      {
        name: "The St. Regis Abu Dhabi ★★★★★",
        address: "Nation Towers, Corniche, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star luxury", "🍽️ Comprehensive allergen protocols", "👨‍🍳 Trained culinary team"],
        description: "Their culinary team is trained to accommodate various dietary restrictions, with clear allergen labeling and dedicated preparation areas.",
        quote: "The staff took my gluten allergy seriously, with the chef personally discussing safe options for me. – Rachel M.",
        bookingUrl: "https://www.marriott.com/hotels/travel/auhxr-the-st-regis-abu-dhabi/"
      },
      {
        name: "Park Hyatt Abu Dhabi ★★★★★",
        address: "Saadiyat Island, Abu Dhabi, United Arab Emirates",
        features: ["⭐ 5-star beachfront luxury", "🍽️ Allergen-free dining options", "👨‍🍳 Cross-contamination awareness"],
        description: "Located on pristine Saadiyat Beach, this resort offers allergen-free dining options with staff trained in cross-contamination prevention.",
        quote: "They created special dairy-free versions of local dishes for me. Incredible attention to detail! – Lisa K.",
        bookingUrl: "https://www.hyatt.com/en-US/hotel/united-arab-emirates/park-hyatt-abu-dhabi-hotel-and-villas/abuph"
      }
    ],
    faqs: [
      {
        question: "Can Abu Dhabi hotels accommodate severe food allergies?",
        answer: "Yes, especially luxury and international chain hotels in Abu Dhabi. The staff at these establishments are typically well-trained to handle dietary restrictions and have clear protocols for food allergies."
      },
      {
        question: "Is it easy to find gluten-free options in Abu Dhabi hotels?",
        answer: "Most upscale hotels in Abu Dhabi can provide gluten-free options, particularly those catering to international travelers. Always notify the hotel in advance and reconfirm upon arrival."
      },
      {
        question: "How should I communicate my allergies in Abu Dhabi?",
        answer: "English is widely spoken in Abu Dhabi's hotels and restaurants, but having allergy translation cards in Arabic can be helpful. Always emphasize the severity of your allergy to ensure proper attention."
      }
    ],
    languageTable: {
      headers: ["English", "Arabic", "Pronunciation"],
      rows: [
        ["I have a food allergy", "لدي حساسية من الطعام", "Ladaya hasasiya min at-ta'am"],
        ["I am allergic to nuts", "أنا أعاني من حساسية المكسرات", "Ana a'ani min hasasiyat al-mukassarat"],
        ["Is this gluten-free?", "هل هذا خالي من الغلوتين؟", "Hal hatha khali min al-gluten?"],
        ["No dairy, please", "بدون منتجات الألبان، من فضلك", "Bidun muntajat al-alban, min fadlik"],
        ["This could cause a severe reaction", "هذا قد يسبب رد فعل شديد", "Hatha qad yusabbib rad fi'l shadid"]
      ]
    }
  },
  'thailand': {
    intro: 'Thailand is adapting to meet the needs of international travelers with food allergies. Many upscale hotels in Bangkok, Phuket, and Chiang Mai now offer specialized menus and trained staff to safely accommodate dietary restrictions.',
    hotels: [
      {
        name: "Four Seasons Resort Chiang Mai ★★★★★",
        address: "Mae Rim-Samoeng Old Road, Chiang Mai, Thailand",
        features: ["⭐ 5-star luxury", "👨‍🍳 Dedicated allergy chefs", "🍽️ Custom meal preparation"],
        description: "Set in the beautiful Mae Rim Valley, this resort offers personalized meal preparation for guests with allergies. Their chefs are trained to prepare Thai cuisine without common allergens.",
        quote: "They created special nut-free versions of local dishes that allowed me to safely experience Thai cuisine. – Michael R.",
        bookingUrl: "https://www.fourseasons.com/chiangmai/"
      },
      {
        name: "Anantara Siam Bangkok ★★★★★",
        address: "155 Rajadamri Road, Bangkok, Thailand",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly dining", "👨‍🍳 International culinary team"],
        description: "Located in the heart of Bangkok, their international culinary team can accommodate virtually any dietary restriction with advance notice. They offer allergen-free cooking classes as well.",
        quote: "The executive chef personally oversaw my meals to ensure they were completely gluten-free. Exceptional service! – Jennifer L.",
        bookingUrl: "https://www.anantara.com/en/siam-bangkok"
      },
      {
        name: "Amanpuri Phuket ★★★★★",
        address: "Pansea Beach, Phuket, Thailand",
        features: ["⭐ 5-star beachfront luxury", "🍽️ Customized allergy menus", "👨‍🍳 Private chef options"],
        description: "This exclusive beach resort offers customized menus for guests with food allergies. Their wellness approach extends to dietary needs, with numerous allergen-free options.",
        quote: "As someone with celiac disease, I never once felt limited by my diet during my stay. Truly exceptional. – Thomas B.",
        bookingUrl: "https://www.aman.com/resorts/amanpuri"
      }
    ],
    faqs: [
      {
        question: "How aware are Thai hotels about food allergies?",
        answer: "Awareness varies, but luxury and international hotel chains in Thailand are generally well-equipped to handle food allergies. Always communicate your needs clearly and consider bringing allergy translation cards in Thai."
      },
      {
        question: "Is it difficult to avoid peanuts in Thai hotels?",
        answer: "Peanuts are common in Thai cuisine, but upscale hotels understand this common allergy and can prepare food safely. Always emphasize the severity of your allergy and confirm that the kitchen understands cross-contamination risks."
      },
      {
        question: "How can I safely enjoy Thai cuisine with food allergies?",
        answer: "Work closely with your hotel's culinary team, who can often create modified versions of traditional dishes. Consider booking hotels with international restaurant options as a backup, and always carry emergency medication."
      }
    ],
    languageTable: {
      headers: ["English", "Thai", "Pronunciation"],
      rows: [
        ["I have a food allergy", "ฉันแพ้อาหาร", "Chan pae ahaan"],
        ["I am allergic to peanuts", "ฉันแพ้ถั่วลิสง", "Chan pae tua lisong"],
        ["No shellfish, please", "ไม่ใส่อาหารทะเล", "Mai sai ahaan talay"],
        ["Is this gluten-free?", "นี่ไม่มีกลูเตนใช่ไหม", "Nee mai mee gluten chai mai"],
        ["This could kill me", "สิ่งนี้อาจทำให้ฉันเสียชีวิตได้", "Sing nee aat tham hai chan sia chiwit dai"]
      ]
    }
  },
  'ayia-napa': {
    intro: 'Ayia Napa\'s hotels are increasingly catering to international travelers with food allergies, offering Mediterranean cuisine that can be adapted to accommodate various dietary restrictions while enjoying Cyprus\'s beautiful beaches.',
    hotels: [
      {
        name: "Grecian Bay Hotel ★★★★★",
        address: "Kryou Nerou 32, Ayia Napa, Cyprus",
        features: ["⭐ 5-star beachfront", "🍽️ Allergy-friendly restaurant", "👨‍🍳 Personalized meal options"],
        description: "Located directly on a beautiful sandy beach, this luxury hotel offers personalized meal options for guests with allergies. Their multiple restaurants can accommodate various dietary restrictions.",
        quote: "The chef personally prepared gluten-free Cypriot specialties for me that were absolutely delicious! – Emma S.",
        bookingUrl: "https://www.grecianbay.com/"
      },
      {
        name: "Alion Beach Hotel ★★★★★",
        address: "Kryou Nerou 38, Ayia Napa, Cyprus",
        features: ["⭐ 5-star beachfront", "🍽️ Dedicated allergen menu", "👨‍🍳 Staff trained in food allergies"],
        description: "This elegant beachfront hotel offers dedicated allergen menus, with staff trained to handle various food allergies and dietary restrictions.",
        quote: "They took my nut allergy very seriously and ensured all my meals were prepared safely. – Robert M.",
        bookingUrl: "https://www.alion.com.cy/"
      },
      {
        name: "Atlantica Aeneas Resort ★★★★★",
        address: "Nissi Avenue, Ayia Napa, Cyprus",
        features: ["⭐ 5-star resort", "🍽️ Multiple restaurant options", "👨‍🍳 Allergen-free stations"],
        description: "This family-friendly resort offers multiple dining options, including allergen-free stations at their buffet restaurants. Their culinary team can prepare special meals with advance notice.",
        quote: "The allergen labeling at all buffets was excellent, and they had numerous gluten-free and dairy-free options. – Jennifer P.",
        bookingUrl: "https://www.atlanticahotels.com/en/Hotels/Cyprus/AyiaNapa/AtlanticaAeneasResort"
      }
    ],
    faqs: [
      {
        question: "How accommodating are Ayia Napa hotels for food allergies?",
        answer: "Most upscale and international chain hotels in Ayia Napa can accommodate food allergies, especially with advance notice. Family-run properties may have varying levels of understanding, so always communicate clearly."
      },
      {
        question: "Can I find gluten-free options in Ayia Napa hotels?",
        answer: "Yes, most larger hotels in Ayia Napa offer gluten-free options, especially those catering to international travelers. Traditional Cypriot cuisine includes many naturally gluten-free dishes."
      },
      {
        question: "Is it difficult to manage a dairy allergy in Ayia Napa?",
        answer: "Cypriot cuisine uses a lot of cheese and yogurt, but higher-end hotels understand dairy allergies and can provide alternatives. Always emphasize that your allergy includes all milk products, including sheep and goat milk."
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Έχω αλλεργία στο φαγητό", "Ého allergía sto fagitó"],
        ["I am allergic to nuts", "Είμαι αλλεργικός/ή στους ξηρούς καρπούς", "Íme allergikós/í stous xiroús karpoús"],
        ["No gluten, please", "Χωρίς γλουτένη, παρακαλώ", "Horís glouténi, parakaló"],
        ["Is this dairy-free?", "Είναι αυτό χωρίς γαλακτοκομικά;", "Íne aftó horís galaktokomiká?"],
        ["This is dangerous for me", "Αυτό είναι επικίνδυνο για μένα", "Aftó íne epikíndyno gia ména"]
      ]
    }
  },
  'crete': {
    intro: 'Crete\'s hotels are embracing the needs of food-allergic travelers, combining traditional Greek hospitality with modern accommodations for dietary restrictions. Many upscale resorts now offer specialized menus and trained staff to ensure safe dining.',
    hotels: [
      {
        name: "Blue Palace Resort & Spa ★★★★★",
        address: "Plaka, Elounda, Crete, Greece",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy menus", "👨‍🍳 Dedicated preparation areas"],
        description: "Overlooking the historic islet of Spinalonga, this luxury resort offers customized menus for guests with food allergies. Their kitchens have dedicated areas to prevent cross-contamination.",
        quote: "The chef created a special gluten-free menu for me featuring traditional Cretan dishes. A culinary delight! – Sarah W.",
        bookingUrl: "https://www.bluepalace.gr/"
      },
      {
        name: "Domes Noruz Chania ★★★★★",
        address: "Strati Pantelaki 5, Agioi Apostoloi, Chania, Crete, Greece",
        features: ["⭐ 5-star adults-only luxury", "🍽️ Allergen-aware dining", "👨‍🍳 Private dining options"],
        description: "This adults-only resort offers allergen-aware dining options across their restaurants. Their culinary team is trained to handle various dietary restrictions with care.",
        quote: "They accommodated my multiple food allergies without compromising on taste or experience. Exceptional! – Michael T.",
        bookingUrl: "https://www.domesresorts.com/noruz/"
      },
      {
        name: "Creta Maris Beach Resort ★★★★★",
        address: "Hersonissos, Crete, Greece",
        features: ["⭐ 5-star beachfront", "🍽️ Labeled buffet options", "👨‍🍳 Specialized meal preparation"],
        description: "This family-friendly resort offers clearly labeled buffet options for common allergens. Their culinary team can prepare specialized meals with advance notice.",
        quote: "The allergen labeling was excellent, and they had a wide variety of gluten-free options available daily. – Jennifer L.",
        bookingUrl: "https://www.cretamaris.gr/"
      }
    ],
    faqs: [
      {
        question: "How well do Cretan hotels understand food allergies?",
        answer: "Luxury and international hotel chains in Crete generally have good awareness of food allergies. Traditional Greek hospitality also means many hotels are willing to accommodate special requests, but always communicate your needs clearly."
      },
      {
        question: "Can I enjoy traditional Cretan cuisine with food allergies?",
        answer: "Yes! Many traditional Cretan dishes are naturally free from common allergens. Upscale hotels can adapt local recipes to accommodate allergies while maintaining authentic flavors."
      },
      {
        question: "Should I bring allergy translation cards to Crete?",
        answer: "Yes, while English is widely spoken in tourist areas of Crete, having allergy translation cards in Greek can be helpful, especially for communicating the severity of your allergies and cross-contamination concerns."
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Έχω αλλεργία στο φαγητό", "Ého allergía sto fagitó"],
        ["I am allergic to nuts", "Είμαι αλλεργικός/ή στους ξηρούς καρπούς", "Íme allergikós/í stous xiroús karpoús"],
        ["No gluten, please", "Χωρίς γλουτένη, παρακαλώ", "Horís glouténi, parakaló"],
        ["Is this dairy-free?", "Είναι αυτό χωρίς γαλακτοκομικά;", "Íne aftó horís galaktokomiká?"],
        ["Cross-contamination is dangerous for me", "Η διασταυρούμενη μόλυνση είναι επικίνδυνη για μένα", "I diastavroúmeni mólynsi íne epikíndyni gia ména"]
      ]
    }
  },
  'cyprus': {
    intro: 'Cyprus offers a growing number of allergy-friendly accommodations across its beautiful Mediterranean island. Many hotels now cater to international travelers with dietary restrictions, combining traditional Cypriot hospitality with modern allergen awareness.',
    hotels: [
      {
        name: "Four Seasons Hotel Cyprus ★★★★★",
        address: "Amathus Avenue 67-69, Limassol, Cyprus",
        features: ["⭐ 5-star beachfront luxury", "🍽️ Comprehensive allergen protocols", "👨‍🍳 Trained culinary staff"],
        description: "This luxury resort (unrelated to the Four Seasons chain) offers comprehensive allergen protocols across their multiple restaurants. Their culinary staff is trained to handle various dietary restrictions safely.",
        quote: "The chef personally discussed my severe allergies and created amazing custom meals throughout my stay. – Richard M.",
        bookingUrl: "https://www.fourseasons.com.cy/"
      },
      {
        name: "Elysium Hotel ★★★★★",
        address: "Queen Verenikis Street, Paphos, Cyprus",
        features: ["⭐ 5-star beachfront", "🍽️ Allergen-friendly menus", "👨‍🍳 Personalized dining options"],
        description: "Located near the historic Tombs of the Kings, this elegant resort offers allergen-friendly menus across their restaurants. They can prepare personalized dining options for guests with multiple allergies.",
        quote: "They took my celiac disease very seriously and ensured I could safely enjoy traditional Cypriot cuisine. – Catherine S.",
        bookingUrl: "https://www.elysium-hotel.com/"
      },
      {
        name: "Amara Hotel ★★★★★",
        address: "Amathus Avenue, Limassol, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Multiple dining venues", "👨‍🍳 Michelin-starred restaurant"],
        description: "This modern luxury hotel features multiple dining venues, including restaurants by renowned chefs Nobu Matsuhisa and Giorgio Locatelli, who can accommodate various dietary restrictions with advance notice.",
        quote: "Even at their high-end restaurants, they carefully adapted dishes to accommodate my allergies without compromising the experience. – James T.",
        bookingUrl: "https://www.amarahotel.com/"
      }
    ],
    faqs: [
      {
        question: "How accommodating are Cypriot hotels for food allergies?",
        answer: "Luxury and international hotel chains in Cyprus generally have good protocols for handling food allergies. The level of accommodation may vary in smaller, family-run establishments, so always communicate your needs clearly."
      },
      {
        question: "Can I find gluten-free options in Cyprus hotels?",
        answer: "Yes, most upscale hotels in Cyprus offer gluten-free options. Traditional Cypriot cuisine also includes many naturally gluten-free dishes based on meats, vegetables, and rice."
      },
      {
        question: "How should I communicate my allergies in Cyprus?",
        answer: "English is widely spoken in Cypriot hotels, especially in tourist areas. Having allergy translation cards in Greek can be helpful for emphasizing the severity of your allergies, particularly regarding cross-contamination."
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "Pronunciation"],
      rows: [
        ["I have a food allergy", "Έχω αλλεργία στο φαγητό", "Ého allergía sto fagitó"],
        ["I am allergic to nuts", "Είμαι αλλεργικός/ή στους ξηρούς καρπούς", "Íme allergikós/í stous xiroús karpoús"],
        ["No gluten, please", "Χωρίς γλουτένη, παρακαλώ", "Horís glouténi, parakaló"],
        ["Is this dairy-free?", "Είναι αυτό χωρίς γαλακτοκομικά;", "Íne aftó horís galaktokomiká?"],
        ["This could cause a severe reaction", "Αυτό μπορεί να προκαλέσει σοβαρή αντίδραση", "Aftó borí na prokalési sovarí antídrasi"]
      ]
    }
  }
};
