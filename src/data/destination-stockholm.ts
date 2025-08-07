import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels = [
  {
    name: "Hotel Rival ★★★★★",
    address: "Södermalm, Stockholm",
    features: [
      "Allergy-free rooms available",
      "Gluten-friendly breakfast options",
      "Hypoallergenic room cleaning",
      "Staff trained in allergy protocols"
    ],
    description: "Stylish hotel with excellent allergy awareness and gluten-friendly breakfast options in trendy Södermalm.",
    quote: "Excellent allergy awareness. The staff understood my gluten sensitivity and provided safe breakfast options. The room was cleaned with hypoallergenic products.",
    bookingUrl: "https://rival.se/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm"
  },
  {
    name: "Downtown Camper by Scandic ★★★★",
    address: "Stockholm City Center",
    features: [
      "Dedicated gluten-free menu",
      "Allergy-trained kitchen staff",
      "Cross-contamination protocols",
      "Eco-friendly practices"
    ],
    description: "Modern eco-friendly hotel with comprehensive gluten-free options and trained allergy-aware staff.",
    quote: "Reliable gluten-free options at breakfast and dinner. The kitchen staff knew exactly how to handle cross-contamination prevention.",
    bookingUrl: "https://www.scandichotels.com/hotels/sweden/stockholm/scandic-stockholm?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm"
  },
  {
    name: "Radisson Blu Waterfront ★★★★",
    address: "Stockholm Waterfront",
    features: [
      "Waterfront views",
      "Gluten-free buffet sections",
      "Clear allergen labeling",
      "Staff training on dietary restrictions"
    ],
    description: "Waterfront hotel with safe gluten-free buffet items and well-informed allergy-aware staff.",
    quote: "Friendly and informed staff who took my dietary restrictions seriously. The buffet had clearly marked gluten-free sections.",
    bookingUrl: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-waterfront-stockholm?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=stockholm"
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
  faqs,
  languageTable
};