// Define available language codes
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh' | 'ar' | 'he';

// Define the structure for language table data
export interface LanguageTableData {
  headers: string[];
  rows: string[][];
}

// Define the structure for FAQ items
export interface FAQ {
  question: string;
  answer: string;
}

// Define the structure for hotel data
export interface HotelData {
  name: string;
  address: string;
  features: string[];
  description?: string;
  quote?: string;
  bookingUrl: string;
}

// Define the structure for destination content
export interface DestinationContent {
  intro: string;
  hotels: HotelData[];
  faqs: FAQ[];
  languageTable: LanguageTableData;
}

// Define the structure for destinations
export interface Destination {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  country: string;
  image: string;
}

// Define the structure for reviews
export interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
  user_id?: string;
  language: string;
  destination?: string;
  traveler_type?: string;
}

// Define available traveler types
export const travelerTypes = [
  'family', 
  'couple', 
  'solo', 
  'business', 
  'friends'
] as const;

// Define available sort options
export const sortOptions = [
  'newest',
  'oldest', 
  'highestRated', 
  'lowestRated'
] as const;

// Define available languages
export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'he', name: 'עברית', dir: 'rtl' }
] as const;

// Define the available destinations
export const destinations = [
  {
    id: "london",
    name: "London",
    description: "Allergy-Friendly Hotels in London",
    subtitle: "A Comprehensive Guide for Food-Allergy Travelers",
    country: "United Kingdom",
    image: "/lovable-uploads/48d61e24-2379-4173-a843-8c83cc833996.png"
  },
  {
    id: "paris",
    name: "Paris",
    description: "Allergy-Friendly Hotels in Paris",
    subtitle: "Safe Dining for Dietary Restrictions",
    country: "France",
    image: "photo-1502602898657-3e91760cbb34"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    description: "Allergy-Friendly Hotels in Barcelona",
    subtitle: "Experience Catalan hospitality with allergen-conscious accommodations",
    country: "Spain",
    image: "photo-1583422409516-2895a77efded"
  },
  {
    id: "cyprus",
    name: "Cyprus",
    description: "Allergy-Friendly Hotels in Cyprus",
    subtitle: "Discover the beauty of Cyprus with peace of mind at these allergy-friendly hotels",
    country: "Cyprus",
    image: "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png"
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    description: "Allergy-Friendly Hotels in Abu Dhabi",
    subtitle: "Luxury accommodation with allergy considerations in the heart of the UAE",
    country: "UAE",
    image: "photo-1512632578888-169bbbc64f33"
  },
  {
    id: "crete",
    name: "Crete",
    description: "Allergy-Friendly Hotels in Crete",
    subtitle: "Relax on the beautiful Greek island with allergy-aware accommodations",
    country: "Greece",
    image: "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png"
  },
  {
    id: "thailand",
    name: "Thailand",
    description: "Allergy-Friendly Hotels in Thailand",
    subtitle: "Find safe and comfortable accommodations for travelers with food allergies",
    country: "Thailand",
    image: "photo-1552465011-b4e21bf6e79a"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    description: "Top 10 Allergy-Friendly Hotels in Tokyo for Travelers with Food Allergies",
    subtitle: "Discover the Best Celiac-Safe, Nut-Free, Dairy-Free & Gluten-Free Hotels in Tokyo – Backed by Real Guest Reviews",
    country: "Japan",
    image: "photo-1449157291145-7efd050a4d0e" // Updated to Shibuya district image
  },
  {
    id: "ayia-napa",
    name: "Ayia Napa",
    description: "Allergy-Friendly Hotels in Ayia Napa",
    subtitle: "Enjoy the beautiful beaches of Ayia Napa with allergy-aware accommodations",
    country: "Cyprus",
    image: "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png"
  }
] as const;

// Update the DestinationId type to include all our destinations
export type DestinationId = 
  | "paris" 
  | "london" 
  | "barcelona" 
  | "cyprus" 
  | "abu-dhabi" 
  | "crete" 
  | "newyork" 
  | "tokyo" 
  | "thailand" 
  | "ayia-napa" 
  | "hotel-chains";

export const destinationData: Record<DestinationId, DestinationContent> = {
  london: {
    intro: "Discover the best allergy-friendly hotels in London for a worry-free travel experience. Our guide features accommodations that cater to various dietary needs, ensuring a safe and enjoyable stay.",
    hotels: [],
    faqs: [
      {
        question: "Are London hotels generally accommodating of food allergies?",
        answer: "Many hotels in London are increasingly aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. It's always best to contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in London?",
        answer: "When booking, inform the hotel of your allergies. Upon arrival, speak with the chef or restaurant manager to discuss your needs in detail. English is widely spoken, making communication easier."
      },
      {
        question: "Can I find gluten-free options in London hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Be sure to specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify London hotels about my food allergies?",
        answer: "It's recommended to notify the hotel at least 48 hours in advance, but earlier is better to ensure they can accommodate your needs."
      }
    ],
    languageTable: {
      headers: ["English", "French"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten"],
        ["Is this dish dairy-free?", "Ce plat est-il sans produits laitiers?"],
        ["Does this contain nuts?", "Est-ce que ça contient des noix?"],
        ["No cross-contamination please", "Pas de contamination croisée s'il vous plaît"]
      ]
    }
  },
  paris: {
    intro: "Explore Paris with confidence by choosing allergy-friendly hotels that understand your dietary needs. Our guide highlights accommodations offering safe and delicious options for travelers with food allergies.",
    hotels: [],
    faqs: [
      {
        question: "Are Paris hotels generally accommodating of food allergies?",
        answer: "Parisian hotels are becoming more aware of food allergies, with many offering gluten-free, dairy-free, and nut-free options. Contact the hotel in advance to discuss your specific requirements."
      },
      {
        question: "What's the best way to communicate my food allergies in Paris?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. Knowing some basic French phrases can also be helpful."
      },
      {
        question: "Can I find gluten-free options in Paris hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pastries, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Paris hotels about my food allergies?",
        answer: "Notify the hotel at least 72 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "French"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten"],
        ["Is this dish dairy-free?", "Ce plat est-il sans produits laitiers?"],
        ["Does this contain nuts?", "Est-ce que ça contient des noix?"],
        ["No cross-contamination please", "Pas de contamination croisée s'il vous plaît"]
      ]
    }
  },
  barcelona: {
    intro: "Enjoy Barcelona's vibrant culture and cuisine without worrying about your allergies. Our guide features allergy-friendly hotels that provide safe and delicious options for travelers with dietary restrictions.",
    hotels: [],
    faqs: [
      {
        question: "Are Barcelona hotels generally accommodating of food allergies?",
        answer: "Many hotels in Barcelona are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. Contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Barcelona?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. Knowing some basic Spanish phrases can also be helpful."
      },
      {
        question: "Can I find gluten-free options in Barcelona hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Barcelona hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish"],
      rows: [
        ["I have a food allergy", "Tengo una alergia alimentaria"],
        ["I cannot eat gluten", "No puedo comer gluten"],
        ["Is this dish dairy-free?", "¿Este plato no contiene lácteos?"],
        ["Does this contain nuts?", "¿Esto contiene nueces?"],
        ["No cross-contamination please", "Por favor, sin contaminación cruzada"]
      ]
    }
  },
  cyprus: {
    intro: "Experience the beauty of Cyprus with peace of mind, knowing that allergy-friendly hotels are available to cater to your dietary needs. Our guide highlights accommodations offering safe and delicious options for travelers with food allergies.",
    hotels: [],
    faqs: [
      {
        question: "Are Cyprus hotels generally accommodating of food allergies?",
        answer: "Many hotels in Cyprus are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. Contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Cyprus?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. English is widely spoken, making communication easier."
      },
      {
        question: "Can I find gluten-free options in Cyprus hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Cyprus hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Greek"],
      rows: [
        ["I have a food allergy", "Έχω μια τροφική αλλεργία (Écho mia trofikí allergía)"],
        ["I cannot eat gluten", "Δεν μπορώ να φάω γλουτένη (Den boró na fáo glouténi)"],
        ["Is this dish dairy-free?", "Αυτό το πιάτο είναι χωρίς γαλακτοκομικά? (Aftó to piáto eínai chorís galaktokomiká?)"],
        ["Does this contain nuts?", "Αυτό περιέχει ξηρούς καρπούς? (Aftó periéchei xiroús karpoús?)"],
        ["No cross-contamination please", "Παρακαλώ, χωρίς διασταυρούμενη μόλυνση (Parakaló, chorís diastavroúmeni mólynsi)"]
      ]
    }
  },
  "abu-dhabi": {
    intro: "Experience luxury in Abu Dhabi without compromising your dietary needs. Our guide features allergy-friendly hotels that provide safe and delicious options for travelers with food allergies.",
    hotels: [],
    faqs: [
      {
        question: "Are Abu Dhabi hotels generally accommodating of food allergies?",
        answer: "Many hotels in Abu Dhabi are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. Contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Abu Dhabi?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. English is widely spoken, making communication easier."
      },
      {
        question: "Can I find gluten-free options in Abu Dhabi hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Abu Dhabi hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Arabic"],
      rows: [
        ["I have a food allergy", "لدي حساسية تجاه الطعام (ladayya hasāsiyya tujāha al-ṭaʿām)"],
        ["I cannot eat gluten", "لا يمكنني تناول الغلوتين (lā yumkinunī tanāwul al-ghalūtīn)"],
        ["Is this dish dairy-free?", "هل هذا الطبق خالي من منتجات الألبان؟ (hal hādhā al-ṭabaq khālin min muntajāt al-albān?)"],
        ["Does this contain nuts?", "هل يحتوي هذا على مكسرات؟ (hal yaḥtawī hādhā ʿalā mukassarāt?)"],
        ["No cross-contamination please", "الرجاء عدم وجود تلوث عرضي (al-rajāʾ ʿadam wujūd talawwuth ʿaraḍī)"]
      ]
    }
  },
  crete: {
    intro: "Relax on the beautiful island of Crete without worrying about your allergies. Our guide features allergy-friendly hotels that provide safe and delicious options for travelers with food allergies.",
    hotels: [],
    faqs: [
      {
        question: "Are Crete hotels generally accommodating of food allergies?",
        answer: "Many hotels in Crete are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. Contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Crete?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. English is widely spoken, making communication easier."
      },
      {
        question: "Can I find gluten-free options in Crete hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Crete hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Greek"],
      rows: [
        ["I have a food allergy", "Έχω μια τροφική αλλεργία (Écho mia trofikí allergía)"],
        ["I cannot eat gluten", "Δεν μπορώ να φάω γλουτένη (Den boró na fáo glouténi)"],
        ["Is this dish dairy-free?", "Αυτό το πιάτο είναι χωρίς γαλακτοκομικά? (Aftó to piáto eínai chorís galaktokomiká?)"],
        ["Does this contain nuts?", "Αυτό περιέχει ξηρούς καρπούς? (Aftó periéchei xiroús karpoús?)"],
        ["No cross-contamination please", "Παρακαλώ, χωρίς διασταυρούμενη μόλυνση (Parakaló, chorís diastavroúmeni mólynsi)"]
      ]
    }
  },
  thailand: {
    intro: "Discover Thailand with peace of mind, knowing that allergy-friendly hotels are available to cater to your dietary needs. Our guide highlights accommodations offering safe and delicious options for travelers with food allergies.",
    hotels: [],
    faqs: [
      {
        question: "Are Thailand hotels generally accommodating of food allergies?",
        answer: "Many hotels in Thailand are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. Contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Thailand?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. English is widely spoken in tourist areas, making communication easier."
      },
      {
        question: "Can I find gluten-free options in Thailand hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Thailand hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Thai"],
      rows: [
        ["I have a food allergy", "ฉันมีอาการแพ้อาหาร (Chǎn mī ākān phǣ āhān)"],
        ["I cannot eat gluten", "ฉันไม่สามารถกินกลูเตนได้ (Chǎn mị̀ s̄āmārt̄h kin klūten dị̂)"],
        ["Is this dish dairy-free?", "อาหารจานนี้ไม่มีส่วนผสมของนมหรือไม่ (Āhān cān nī̂ mị̀mī s̄̀wn ผ̄sm k̄hxng nm h̄rụ̄x mị̀?)"],
        ["Does this contain nuts?", "นี่มีส่วนผสมของถั่วหรือไม่ (Nī̀ mī s̄̀wn ผ̄sm k̄hxng t̄h̀w h̄rụ̄x mị̀?)"],
        ["No cross-contamination please", "กรุณาอย่าให้มีการปนเปื้อนข้าม (Krunā xỳā h̄ı̂ mī kār pnpeụ̄̂xn k̄ĥām)"]
      ]
    }
  },
  
  tokyo: {
    intro: "If you're planning a trip to Tokyo and managing food allergies such as gluten intolerance, celiac disease, dairy allergy, nut allergy, egg sensitivity, or other dietary restrictions, finding a safe and welcoming hotel is key to enjoying your stay. Fortunately, Tokyo is home to a growing number of allergy-conscious hotels that go beyond just offering 'allergen-free' menu labels—they provide personalized service, safe kitchens, and peace of mind.",
    hotels: [
      {
        name: "1. The Capitol Hotel Tokyu ★★★★★",
        address: "Chiyoda City, 2-minute walk to Tameike-Sanno Station",
        features: ["⭐ 5-star luxury", "🍽️ Staff trained in food allergy management", "👨‍🍳 Separate kitchen utensils for allergen-free meal prep"],
        description: "The Capitol Hotel Tokyu offers custom allergy-safe meals in-room or at their restaurants. Their kitchen staff is specially trained to avoid cross-contamination.",
        quote: "The chef made me gluten-free soba from scratch. They even used a dedicated pan. This is the most confident I've felt eating out in years! – Emma B., UK",
        bookingUrl: "https://www.capitolhoteltokyu.com/en/"
      },
      {
        name: "2. Park Hyatt Tokyo ★★★★★",
        address: "Shinjuku, near Shinjuku Gyoen",
        features: ["⭐ 5-star luxury", "🍰 Allergy-conscious fine dining options", "🛏️ In-room allergy pillow and air purifier menu"],
        description: "The Park Hyatt Tokyo offers exceptional staff communication in English and can accommodate various dietary restrictions in their luxury restaurants.",
        quote: "The chef personally came out to discuss my nut allergy and prepared a completely safe and luxurious dinner. So reassuring! – Hiro A., USA",
        bookingUrl: "https://tokyo.park.hyatt.com/"
      },
      {
        name: "3. Andaz Tokyo ★★★★★",
        address: "Toranomon Hills, Minato City",
        features: ["⭐ 5-star luxury", "🍽️ Comprehensive allergy menu system", "🧪 Kitchen trained in preventing cross-contamination"],
        description: "Andaz Tokyo excels at accommodating food allergies with their clear labeling system and knowledgeable staff who understand severe allergies.",
        quote: "As someone with celiac disease, I was impressed with their knowledge. They provided me with safe options at every meal! – Sarah T., Australia",
        bookingUrl: "https://www.hyatt.com/en-US/hotel/japan/andaz-tokyo-toranomon-hills/tyoaz"
      },
      {
        name: "4. The Prince Gallery Tokyo Kioicho ★★★★★",
        address: "Chiyoda City, near Akasaka-Mitsuke Station",
        features: ["⭐ 5-star luxury", "🍽️ Detailed allergen information available", "👨‍🍳 Chefs trained in gluten-free preparation"],
        description: "The Prince Gallery offers personalized meal preparation and has staff proficient in English who can properly understand allergy concerns.",
        quote: "They prepared dairy-free versions of traditional Japanese dishes for me. The staff was incredibly accommodating! – Michael R., Canada",
        bookingUrl: "https://www.princehotels.com/kioicho/"
      }
    ],
    faqs: [
      {
        question: "Are Tokyo hotels generally accommodating of food allergies?",
        answer: "While not all Tokyo hotels are equipped to handle food allergies, luxury and international chain hotels tend to be more accommodating, especially those listed in our guide. Always contact the hotel directly before booking to confirm they can meet your specific needs."
      },
      {
        question: "What's the best way to communicate my food allergies in Tokyo?",
        answer: "Pre-communicate with your hotel in writing before arrival, bring translated allergy cards in Japanese, and use the hotel concierge to help with restaurant reservations. Many luxury hotels have English-speaking staff who can assist with explaining your allergies to restaurants."
      },
      {
        question: "Can I find gluten-free options in Tokyo hotels?",
        answer: "Yes, particularly at the hotels listed in our guide. Many upscale hotels in Tokyo now offer gluten-free bread, pasta, and other options. The Capitol Hotel Tokyu and Park Hyatt Tokyo are especially known for their gluten-free accommodations."
      },
      {
        question: "How far in advance should I notify Tokyo hotels about my food allergies?",
        answer: "Contact the hotel at least 2-3 weeks before your arrival, then follow up 3-5 days before check-in. This gives the kitchen staff time to prepare and possibly source special ingredients for your stay."
      }
    ],
    languageTable: {
      headers: ["English", "Japanese"],
      rows: [
        ["I have a food allergy", "私は食物アレルギーがあります (Watashi wa shokumotsu arerugī ga arimasu)"],
        ["I cannot eat gluten", "私はグルテンを食べられません (Watashi wa guruten o taberaremasen)"],
        ["Is this dish dairy-free?", "これは乳製品不使用ですか? (Kore wa nyūseihin fushiyō desu ka?)"],
        ["Does this contain nuts?", "これはナッツを含んでいますか? (Kore wa nattsu o fukunde imasu ka?)"],
        ["No cross-contamination please", "交差汚染をしないでください (Kōsa osen o shinaide kudasai)"]
      ]
    }
  },
  "newyork": {
    intro: "New York City offers incredible options for travelers with food allergies. These hotels provide specialized menus, allergen-free dining areas, and staff well-trained in handling dietary restrictions.",
    hotels: [
      {
        name: "1. The Peninsula New York ★★★★★",
        address: "700 5th Ave, New York, NY 10019",
        features: ["⭐ 5-star luxury", "🍽️ Customized allergy-friendly meals", "👨‍🍳 Staff trained in allergy protocols"],
        description: "The Peninsula New York is known for its luxurious accommodations and outstanding guest service, including special attention to food allergies. Their in-house restaurant, Clement, offers customized meals for guests with dietary restrictions.",
        quote: "The chef personally spoke to me about my gluten allergy and prepared a separate meal in a dedicated kitchen space. I felt safe and taken care of!",
        bookingUrl: "https://www.peninsula.com/en/new-york"
      },
      {
        name: "2. The Ritz-Carlton New York, Central Park ★★★★★",
        address: "50 Central Park S, New York, NY 10019",
        features: ["⭐ 5-star luxury", "🍽️ Dedicated allergy-friendly menu", "👨‍🍳 Specially trained staff"],
        description: "This five-star hotel takes food allergies seriously with a dedicated allergy-friendly menu and staff trained to handle special dietary needs.",
        quote: "As someone with severe nut allergies, I was relieved that the staff was knowledgeable and went above and beyond to ensure my meals were safe.",
        bookingUrl: "https://www.ritzcarlton.com/en/hotels/new-york-central-park"
      },
      {
        name: "3. The Langham, New York, Fifth Avenue ★★★★★",
        address: "400 5th Ave, New York, NY 10018",
        features: ["⭐ 5-star luxury", "🍽️ Personalized dining service", "🛏️ Hypoallergenic bedding available"],
        description: "The Langham stands out for its personalized dining service, where chefs consult with guests on their dietary restrictions. The hotel also offers hypoallergenic bedding and air purifiers upon request.",
        quote: "I have celiac disease, and the staff ensured I had a completely gluten-free breakfast with no risk of cross-contamination. Highly recommend!",
        bookingUrl: "https://www.langhamhotels.com/en/the-langham/new-york"
      },
      {
        name: "4. Four Seasons Hotel New York ★★★★★",
        address: "57 E 57th St, New York, NY 10022",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-free menu options", "👨‍🍳 Executive chef consultation"],
        description: "Four Seasons offers exceptional service for guests with food allergies. The hotel provides allergy-free menu options and can arrange for an executive chef consultation to ensure your specific dietary needs are met.",
        quote: "The Four Seasons kitchen staff was extremely accommodating of my multiple food allergies. They made me feel like a valued guest rather than an inconvenience.",
        bookingUrl: "https://www.fourseasons.com/newyork/"
      },
      {
        name: "5. 1 Hotel Central Park ★★★★★",
        address: "1414 6th Ave, New York, NY 10019",
        features: ["⭐ 5-star eco-luxury", "🍽️ Farm-to-table cuisine with allergy focus", "🌱 Organic allergy-friendly options"],
        description: "This eco-conscious luxury hotel focuses on farm-to-table cuisine with clear allergen labeling. Their kitchen staff is thoroughly trained in preventing cross-contamination.",
        quote: "As someone with severe food allergies, I was impressed by how seriously the staff took my dietary restrictions. The chef personally prepared my meals to ensure they were safe.",
        bookingUrl: "https://www.1hotels.com/central-park"
      },
      {
        name: "6. Park Hyatt New York ★★★★★",
        address: "153 W 57th St, New York, NY 10019",
        features: ["⭐ 5-star luxury", "🍽️ Special dietary menus", "🛏️ Allergy-friendly rooms"],
        description: "Park Hyatt New York offers special dietary menus for guests with food allergies and can provide allergy-friendly rooms with air purification systems.",
        quote: "The hotel staff went above and beyond to accommodate my nut allergy. They even provided a special room service menu that clearly marked all allergens.",
        bookingUrl: "https://www.hyatt.com/en-US/hotel/new-york/park-hyatt-new-york/nycph"
      },
      {
        name: "7. The Beekman, A Thompson Hotel ★★★★★",
        address: "123 Nassau St, New York, NY 10038",
        features: ["⭐ 5-star luxury", "🍽️ Allergen-aware dining", "👨‍🍳 Personalized meal preparation"],
        description: "The Beekman offers allergen-aware dining options and can prepare personalized meals for guests with specific dietary restrictions.",
        quote: "The chef at Temple Court restaurant was incredibly knowledgeable about my celiac disease and prepared a special gluten-free tasting menu for me.",
        bookingUrl: "https://www.thebeekman.com/"
      },
      {
        name: "8. The St. Regis New York ★★★★★",
        address: "2 E 55th St, New York, NY 10022",
        features: ["⭐ 5-star luxury", "🍽️ Custom allergy-friendly menus", "👨‍🍳 Chef consultation available"],
        description: "The St. Regis offers custom allergy-friendly menus and the opportunity to consult with the chef about your specific dietary needs.",
        quote: "I appreciated how the staff at The St. Regis took my food allergies seriously. They provided me with safe dining options throughout my stay.",
        bookingUrl: "https://www.marriott.com/hotels/travel/nycxr-the-st-regis-new-york/"
      },
      {
        name: "9. Crosby Street Hotel ★★★★★",
        address: "79 Crosby St, New York, NY 10012",
        features: ["⭐ 5-star boutique hotel", "🍽️ Allergy-conscious kitchen", "🥗 Organic ingredient focus"],
        description: "This boutique hotel in SoHo features an allergy-conscious kitchen that focuses on organic ingredients and transparent food preparation.",
        quote: "The staff was incredibly accommodating of my daughter's multiple food allergies. They made her special meals that were safe and delicious.",
        bookingUrl: "https://www.firmdalehotels.com/hotels/new-york/crosby-street-hotel/"
      },
      {
        name: "10. Mandarin Oriental, New York ★★★★★",
        address: "80 Columbus Cir, New York, NY 10023",
        features: ["⭐ 5-star luxury", "🍽️ Detailed allergen information", "👨‍🍳 Chef customization"],
        description: "Mandarin Oriental provides detailed allergen information for all dishes and offers chef customization for guests with food allergies.",
        quote: "The restaurant staff had complete knowledge of ingredients in every dish and were able to modify recipes to accommodate my allergies.",
        bookingUrl: "https://www.mandarinoriental.com/new-york/manhattan/luxury-hotel"
      }
    ],
    faqs: [
      {
        question: "What are the most accommodating NYC hotels for guests with celiac disease?",
        answer: "The Peninsula New York, The Langham, and 1 Hotel Central Park are especially well-regarded for their gluten-free protocols and separate preparation areas to prevent cross-contamination."
      },
      {
        question: "Do these New York hotels have emergency protocols for severe allergic reactions?",
        answer: "Yes, most luxury hotels in NYC have staff trained to handle emergency situations, including severe allergic reactions. Many keep EpiPens on site and have medical response plans in place."
      },
      {
        question: "Is it possible to arrange for allergy-safe room service at these hotels?",
        answer: "Absolutely. All of the hotels listed offer allergy-safe room service options. It's best to communicate your specific needs when booking and again upon check-in."
      },
      {
        question: "Are there any NYC hotels that specialize in vegan or plant-based cuisine?",
        answer: "1 Hotel Central Park is known for its excellent plant-based options, while The Beekman and Crosby Street Hotel also offer extensive vegan menus."
      },
      {
        question: "How far in advance should I notify these hotels about my food allergies?",
        answer: "It's best to inform the hotel about your allergies when making your reservation, then follow up a few days before arrival. This gives the kitchen staff time to prepare for your specific needs."
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "French"],
      rows: [
        ["I have a food allergy.", "Tengo una alergia alimentaria.", "J'ai une allergie alimentaire."],
        ["I cannot eat gluten/dairy/nuts.", "No puedo comer gluten/lácteos/nueces.", "Je ne peux pas manger de gluten/produits laitiers/noix."],
        ["Is this food allergy-safe?", "¿Esta comida es segura para alergias?", "Est-ce que cette nourriture est sans allergènes?"],
        ["I need to see the ingredients list.", "Necesito ver la lista de ingredientes.", "J'ai besoin de voir la liste des ingrédients."],
        ["Do you have gluten-free options?", "¿Tienen opciones sin gluten?", "Avez-vous des options sans gluten?"]
      ]
    }
  },
  
  "ayia-napa": {
    intro: "Enjoy the beautiful beaches of Ayia Napa with peace of mind, knowing that allergy-friendly hotels are available to cater to your dietary needs. Our guide highlights accommodations offering safe and delicious options for travelers with food allergies.",
    hotels: [
      {
        name: "1. Grecian Bay Hotel ★★★★★",
        address: "32 Kryou Nerou, Ayia Napa 5330, Cyprus",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Staff trained in food allergies"],
        description: "The Grecian Bay Hotel offers custom allergy menus and the staff is well-trained to handle food allergies. The kitchen staff takes extra precautions to avoid cross-contamination.",
        quote: "The chef personally prepared my gluten-free meals and they were delicious! I felt completely safe dining here. – Maria T., Italy",
        bookingUrl: "https://www.grecianbay.com/"
      },
      {
        name: "2. Atlantica Aeneas Resort ★★★★",
        address: "Nissi Avenue, Ayia Napa 5340, Cyprus",
        features: ["⭐ 4-star resort", "🍽️ Gluten-free and dairy-free options", "🏊 Multiple restaurants with allergy menus"],
        description: "The Atlantica Aeneas Resort offers multiple dining options with clear allergen labeling. They can accommodate gluten-free, dairy-free, and nut-free diets.",
        quote: "They had gluten-free bread, pasta, and even desserts! The staff was knowledgeable about cross-contamination. – John D., UK",
        bookingUrl: "https://www.atlanticahotels.com/en/Hotels/Cyprus/Aeneas"
      },
      {
        name: "3. Nissi Beach Resort ★★★★",
        address: "77 Nissi Avenue, Ayia Napa 5340, Cyprus",
        features: ["⭐ 4-star beach resort", "🍽️ Allergy-friendly buffet options", "🥗 Special dietary meals upon request"],
        description: "Nissi Beach Resort offers beautiful sea views and accommodating kitchen staff who can prepare special meals for guests with allergies upon request.",
        quote: "They were very helpful with my dairy allergy. The chef made me special meals that weren't on the menu. – Sophie M., France",
        bookingUrl: "https://www.nissi-beach.com/"
      }
    ],
    faqs: [
      {
        question: "Are Ayia Napa hotels generally accommodating of food allergies?",
        answer: "Many hotels in Ayia Napa are aware of food allergies and offer options for gluten-free, dairy-free, and nut-free diets. It's always best to contact the hotel in advance to confirm their capabilities."
      },
      {
        question: "What's the best way to communicate my food allergies in Ayia Napa?",
        answer: "Inform the hotel of your allergies when booking. Upon arrival, speak with the chef or restaurant manager to discuss your needs. English is widely spoken, making communication easier."
      },
      {
        question: "Can I find gluten-free options in Ayia Napa hotels?",
        answer: "Yes, many hotels offer gluten-free bread, pasta, and other alternatives. Specify your needs when booking and upon arrival."
      },
      {
        question: "How far in advance should I notify Ayia Napa hotels about my food allergies?",
        answer: "Notify the hotel at least 48 hours in advance to ensure they can accommodate your needs. For complex allergies, earlier is better."
      }
    ],
    languageTable: {
      headers: ["English", "Greek"],
      rows: [
        ["I have a food allergy", "Έχω μια τροφική αλλεργία (Écho mia trofikí allergía)"],
        ["I cannot eat gluten", "Δεν μπορώ να φάω γλουτένη (Den boró na fáo glouténi)"],
        ["Is this dish dairy-free?", "Αυτό το πιάτο είναι χωρίς γαλακτοκομικά? (Aftó to piáto eínai chorís galaktokomiká?)"],
        ["Does this contain nuts?", "Αυτό περιέχει ξηρούς καρπούς? (Aftó periéchei xiroús karpoús?)"],
        ["No cross-contamination please", "Παρακαλώ, χωρίς διασταυρούμενη μόλυνση (Parakaló, chorís diastavroúmeni mólynsi)"]
      ]
    }
  },
  "hotel-chains": {
    intro: "Discover the best hotel chains for travelers with food allergies. This guide highlights global hotel chains that consistently provide safe dining options and accommodations for guests with dietary restrictions.",
    hotels: [],
    faqs: [
      {
        question: "Which hotel chains are most accommodating for food allergies?",
        answer: "Four Seasons, Hyatt, Marriott, and Hilton are generally recognized as being among the most allergy-friendly hotel chains globally. They typically have staff training programs and standardized protocols for handling food allergies."
      },
      {
        question: "Do international hotel chains have consistent allergy protocols across all locations?",
        answer: "While major chains strive for consistency, the level of allergy awareness can vary by location. Luxury brands within hotel groups (like Ritz-Carlton in the Marriott family) often provide the most consistent allergy services."
      },
      {
        question: "How should I communicate my allergies when booking with a hotel chain?",
        answer: "Contact the specific hotel directly rather than using the central reservation system. Speak with the food and beverage director or chef concierge, then follow up with an email documenting your needs. Reconfirm upon arrival."
      },
      {
        question: "Can hotel chains accommodate multiple food allergies?",
        answer: "Yes, most major hotel chains can accommodate multiple allergies, though it's important to give them advance notice, especially for complex dietary restrictions. Luxury chains like Four Seasons and Ritz-Carlton excel at handling multiple allergies."
      }
    ],
    languageTable: {
      headers: ["English", "French", "Spanish", "German"],
      rows: [
        ["I have a food allergy", "J'ai une allergie alimentaire", "Tengo una alergia alimentaria", "Ich habe eine Lebensmittelallergie"],
        ["I cannot eat gluten", "Je ne peux pas manger de gluten", "No puedo comer gluten", "Ich kann kein Gluten essen"],
        ["Is this dish dairy-free?", "Ce plat est-il sans produits laitiers?", "¿Este plato no contiene lácteos?", "Ist dieses Gericht milchfrei?"],
        ["Does this contain nuts?", "Est-ce que ça contient des noix?", "¿Esto contiene nueces?", "Enthält dies Nüsse?"],
        ["No cross-contamination please", "Pas de contamination croisée s'il vous plaît", "Por favor, sin contaminación cruzada", "Bitte keine Kreuzkontamination"]
      ]
    }
  }
};
