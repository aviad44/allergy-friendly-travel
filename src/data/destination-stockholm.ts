import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
  {
    id: "hotel-rival",
    name: "1. Hotel Rival ★★★★★",
    description: "Stylish hotel with allergy-free rooms and gluten-friendly breakfast options in trendy Södermalm.",
    imageUrl: "src/assets/stockholm-hero.jpg",
    website: "https://rival.se/",
    bookingUrl: "https://rival.se/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm",
    location: "Södermalm, Stockholm",
    amenities: ["Allergy-free rooms", "Gluten-friendly breakfast", "Trendy location", "Modern amenities"],
    guestReview: "Excellent allergy awareness. The staff understood my gluten sensitivity and provided safe breakfast options. The room was cleaned with hypoallergenic products. - Maria S., Finland",
    allergyInfo: "Staff trained in allergy protocols, gluten-free breakfast available, allergy-aware cleaning",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "downtown-camper-scandic",
    name: "2. Downtown Camper by Scandic ★★★★",
    description: "Modern eco-friendly hotel with dedicated gluten-free menu and trained allergy-aware staff.",
    imageUrl: "src/assets/stockholm-hero.jpg",
    website: "https://www.scandichotels.com/hotels/sweden/stockholm/scandic-stockholm",
    bookingUrl: "https://www.scandichotels.com/hotels/sweden/stockholm/scandic-stockholm?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm",
    location: "Stockholm City Center",
    amenities: ["Dedicated gluten-free menu", "Trained staff", "Eco-friendly", "Central location"],
    guestReview: "Reliable gluten-free options at breakfast and dinner. The kitchen staff knew exactly how to handle cross-contamination prevention. - Anders L., Sweden",
    allergyInfo: "Comprehensive gluten-free menu, cross-contamination protocols, allergy-trained kitchen staff",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "radisson-blu-waterfront",
    name: "3. Radisson Blu Waterfront ★★★★",
    description: "Waterfront hotel with safe gluten-free buffet items and well-informed allergy-aware staff.",
    imageUrl: "src/assets/stockholm-hero.jpg",
    website: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-waterfront-stockholm",
    bookingUrl: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-waterfront-stockholm?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm",
    location: "Stockholm Waterfront",
    amenities: ["Waterfront views", "Gluten-free buffet", "Informed staff", "Modern facilities"],
    guestReview: "Friendly and informed staff who took my dietary restrictions seriously. The buffet had clearly marked gluten-free sections. - Emma K., Norway",
    allergyInfo: "Gluten-free buffet sections, clear allergen labeling, staff training on dietary restrictions",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  }
];

const restaurants: Restaurant[] = [
  {
    id: "dirty-coco",
    name: "Dirty Coco",
    description: "100% gluten-free dessert café offering safe sweet treats for celiacs.",
    cuisine: "Gluten-Free Desserts",
    location: "Drottninggatan 65, Stockholm",
    allergyInfo: "Completely gluten-free facility, no cross-contamination risk",
    features: ["100% gluten-free", "Celiac-safe", "Dedicated facility"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "mahalo",
    name: "Mahalo",
    description: "Vegan café with gluten, dairy, and nut-free options in trendy Södermalm.",
    cuisine: "Vegan Café",
    location: "Södermalm, Stockholm",
    allergyInfo: "Multiple allergy accommodations, vegan menu with clear labeling",
    features: ["Vegan", "Gluten-free options", "Nut-free choices", "Dairy-free"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "fern-fika",
    name: "Fern & Fika",
    description: "Plant-based café with naturally gluten-free and additive-free options.",
    cuisine: "Plant-Based Café",
    location: "Hornstull, Stockholm",
    allergyInfo: "Plant-based menu, naturally gluten-free options, additive-free",
    features: ["Plant-based", "Naturally gluten-free", "Additive-free", "Health-focused"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "happy-atelier",
    name: "Happy Atelier",
    description: "100% gluten-free bakery specializing in cinnamon buns and sandwiches.",
    cuisine: "Gluten-Free Bakery",
    location: "Kungsholmen, Stockholm",
    allergyInfo: "Dedicated gluten-free bakery, safe for celiacs",
    features: ["100% gluten-free", "Celiac-safe", "Fresh baked goods", "Cinnamon buns"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "a-la-crepe",
    name: "A la Crêpe",
    description: "French-style crêperie offering almost entirely gluten-free options.",
    cuisine: "French Crêperie",
    location: "Katarina Bangata 42, Stockholm",
    allergyInfo: "Gluten-free crêpe options, French-style preparation",
    features: ["Gluten-free crêpes", "French cuisine", "Safe preparation"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "pazzi",
    name: "Pazzi",
    description: "Italian restaurant with separate oven to avoid cross-contamination for gluten-free dishes.",
    cuisine: "Italian",
    location: "Östgötagatan 65, Stockholm",
    allergyInfo: "Separate gluten-free oven, cross-contamination prevention protocols",
    features: ["Italian cuisine", "Separate GF oven", "Cross-contamination prevention"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "barrels-burger-beer",
    name: "Barrels Burger & Beer",
    description: "Burger restaurant offering gluten-free buns with allergy-trained staff.",
    cuisine: "Burgers & Beer",
    location: "Stockholm City",
    allergyInfo: "Gluten-free burger buns available, staff trained in allergy protocols",
    features: ["Gluten-free buns", "Allergy-trained staff", "Casual dining"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "meatballs-for-people",
    name: "Meatballs for the People",
    description: "Traditional Swedish restaurant serving gluten-free Swedish meatballs.",
    cuisine: "Traditional Swedish",
    location: "Nytorgsgatan 30, Stockholm",
    allergyInfo: "Gluten-free traditional Swedish meatballs available",
    features: ["Swedish cuisine", "Gluten-free meatballs", "Traditional recipes"],
    isPurelyAllergyFriendly: true
  }
];

const faqs: FAQ[] = [
  {
    question: "Are Stockholm hotels generally allergy-friendly?",
    answer: "Yes, Stockholm hotels are increasingly allergy-aware with many offering gluten-free breakfast options and allergy-free room preparations."
  },
  {
    question: "What should I tell my Stockholm hotel about my allergies?",
    answer: "Contact your hotel in advance to discuss your specific dietary needs. Most quality Stockholm hotels can accommodate gluten-free and other allergy requirements."
  },
  {
    question: "Are there good gluten-free restaurants in Stockholm?",
    answer: "Stockholm has excellent gluten-free dining options, including dedicated gluten-free establishments like Dirty Coco and Happy Atelier, plus many restaurants with gluten-free menus."
  },
  {
    question: "Do I need Swedish allergy translation cards in Stockholm?",
    answer: "While most Stockholmers speak excellent English, having Swedish allergy translation cards can be helpful in restaurants and emergency situations."
  }
];

const tips: TravelTip[] = [
  {
    title: "Book Allergy-Aware Hotels",
    content: "Choose hotels like Hotel Rival or Downtown Camper by Scandic that have specific experience with allergy accommodations and gluten-free dining."
  },
  {
    title: "Visit Dedicated Gluten-Free Establishments",
    content: "For maximum safety, prioritize 100% gluten-free places like Dirty Coco and Happy Atelier where cross-contamination isn't a concern."
  },
  {
    title: "Carry Swedish Allergy Cards",
    content: "Even though English is widely spoken, having allergy information in Swedish ensures clear communication with restaurant staff."
  },
  {
    title: "Verify Allergy Protocols",
    content: "Always confirm your specific allergy requirements directly with hotel and restaurant staff, even at allergy-friendly establishments."
  }
];

const languageTable: LanguageTable = {
  headers: ["English", "Swedish"],
  rows: [
    ["I have a food allergy", "Jag har en matallergi"],
    ["I'm allergic to nuts", "Jag är allergisk mot nötter"],
    ["I'm allergic to gluten", "Jag är allergisk mot gluten"],
    ["I'm allergic to dairy", "Jag är allergisk mot mjölkprodukter"],
    ["Does this contain nuts?", "Innehåller detta nötter?"],
    ["Is this gluten-free?", "Är detta glutenfritt?"],
    ["Please clean the preparation area", "Snälla rengör förberedelseområdet"],
    ["I need an ambulance", "Jag behöver en ambulans"]
  ]
};

const intro = [
  "Stockholm, Sweden's beautiful capital, offers exceptional opportunities for travelers with food allergies and celiac disease. The city's progressive approach to dietary accommodations makes it an ideal destination for allergy-conscious travelers seeking both safety and culinary excellence.",
  "From dedicated 100% gluten-free bakeries to allergy-aware luxury hotels, Stockholm's hospitality industry has embraced inclusive dining. Whether you're managing celiac disease, gluten sensitivity, nut allergies, or dairy intolerance, you'll find numerous safe and delicious options throughout this stunning Scandinavian city."
];

export const stockholmContent: DestinationContent = {
  imageUrl: "src/assets/stockholm-hero.jpg",
  intro,
  hotels,
  restaurants,
  faqs,
  tips,
  languageTable
};