import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
  {
    name: "Hotel Rival ★★★★★",
    address: "Södermalm, Stockholm",
    features: [
      "Allergy-free rooms available",
      "Gluten-friendly breakfast options",
      "Hypoallergenic room cleaning",
      "Staff trained in allergy protocols"
    ],
    description: "Allergy-free rooms and gluten-friendly breakfast.",
    quote: "Excellent allergy awareness",
    bookingUrl: "https://www.allergy-free-travel.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=hotel_rival"
  },
  {
    name: "Downtown Camper by Scandic ★★★★",
    address: "Stockholm City Center",
    features: [
      "Dedicated gluten-free menu",
      "Allergy-trained kitchen staff",
      "Cross-contamination protocols",
      "Staff trained in allergy safety"
    ],
    description: "Dedicated gluten-free menu and trained staff.",
    quote: "Reliable gluten-free options",
    bookingUrl: "https://www.allergy-free-travel.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=downtown_camper_scandic"
  },
  {
    name: "Radisson Blu Waterfront ★★★★",
    address: "Stockholm Waterfront",
    features: [
      "Waterfront views",
      "Gluten-free buffet sections",
      "Clear allergen labeling",
      "Safe gluten-free buffet items"
    ],
    description: "Gluten-free buffet items and informed staff.",
    quote: "Friendly and informed staff",
    bookingUrl: "https://www.allergy-free-travel.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=radisson_blu_waterfront"
  }
];

const restaurants: Restaurant[] = [
  {
    name: "Dirty Coco",
    address: "Drottninggatan 65, Stockholm",
    description: "100% gluten-free dessert café.",
    features: [
      "100% gluten-free",
      "Dessert café",
      "Safe for celiacs",
      "No cross-contamination risk"
    ],
    isPurelyAllergyFriendly: true,
    websiteUrl: "#"
  },
  {
    name: "Mahalo",
    address: "Södermalm, Stockholm",
    description: "Vegan café with gluten, dairy, and nut-free options.",
    features: [
      "Vegan options",
      "Gluten-free",
      "Dairy-free",
      "Nut-free options"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
  {
    name: "Fern & Fika",
    address: "Hornstull, Stockholm",
    description: "Plant-based café, naturally gluten-free and additive-free.",
    features: [
      "Plant-based",
      "Naturally gluten-free",
      "Additive-free",
      "Healthy options"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
  {
    name: "Happy Atelier",
    address: "Kungsholmen, Stockholm",
    description: "100% gluten-free bakery with cinnamon buns and sandwiches.",
    features: [
      "100% gluten-free",
      "Bakery",
      "Cinnamon buns",
      "Sandwiches"
    ],
    isPurelyAllergyFriendly: true,
    websiteUrl: "#"
  },
  {
    name: "A la Crêpe",
    address: "Katarina Bangata 42, Stockholm",
    description: "Almost entirely gluten-free French-style crêpes.",
    features: [
      "Gluten-free crêpes",
      "French-style",
      "Sweet and savory options",
      "Dedicated preparation"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
  {
    name: "Pazzi",
    address: "Östgötagatan 65, Stockholm",
    description: "Italian spot with separate oven to avoid cross-contamination.",
    features: [
      "Italian cuisine",
      "Separate oven",
      "No cross-contamination",
      "Gluten-free pizza"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
  {
    name: "Barrels Burger & Beer",
    address: "Stockholm City Center",
    description: "Offers gluten-free burger buns and allergy-trained staff.",
    features: [
      "Gluten-free burger buns",
      "Allergy-trained staff",
      "Craft beer",
      "Casual dining"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
  {
    name: "Meatballs for the People",
    address: "Nytorgsgatan 30, Stockholm",
    description: "Serves gluten-free traditional Swedish meatballs.",
    features: [
      "Traditional Swedish meatballs",
      "Gluten-free options",
      "Local cuisine",
      "Authentic experience"
    ],
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  }
];

const travelTips: TravelTip[] = [
  {
    title: "Verify Allergy Concerns",
    content: "Always verify your allergy concerns directly with hotel and restaurant staff."
  },
  {
    title: "Use Dedicated Establishments",
    content: "Use dedicated gluten-free establishments for maximum safety."
  },
  {
    title: "Carry Translation Cards",
    content: "Carry a Swedish allergy translation card for better communication."
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

const intro = "Stockholm offers remarkable allergy-friendly options for travelers sensitive to gluten and other food allergens.";

export const stockholmContent: DestinationContent = {
  intro,
  hotels,
  restaurants,
  faqs,
  languageTable
};