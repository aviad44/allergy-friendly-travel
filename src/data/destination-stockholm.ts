import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
];

const restaurants: Restaurant[] = [
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
    guestReview: "The staff was helpful to tell us about which bowls are gluten free.",
    isPurelyAllergyFriendly: false,
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
    guestReview: "The best part: the entire menu is gluten free, and they even offer gluten-free beer, which makes it such a rare and wonderful find.",
    isPurelyAllergyFriendly: false,
    websiteUrl: "#"
  },
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