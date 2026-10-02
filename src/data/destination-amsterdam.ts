import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
];

const restaurants: Restaurant[] = [
];

const faqs: FAQ[] = [
  {
    question: "Are Amsterdam hotels generally allergy-friendly?",
    answer: "Many Amsterdam hotels are well-equipped to handle food allergies and provide allergy-free rooms. The city's hospitality industry is increasingly aware of allergen needs."
  },
  {
    question: "What should I tell my hotel about my allergies?",
    answer: "Contact the hotel in advance to discuss your specific allergies. Most quality hotels can provide hypoallergenic bedding and ensure allergen-free room cleaning."
  },
  {
    question: "Are there allergy-friendly restaurants in Amsterdam?",
    answer: "Yes, Amsterdam has many restaurants with allergen awareness, clear labeling, and trained staff. Popular options include The Avocado Show and Foodhallen."
  },
  {
    question: "Should I bring allergy translation cards in Amsterdam?",
    answer: "While many Amsterdam residents speak English, having an allergy translation card in Dutch can be helpful for restaurants and emergency situations."
  }
];

const tips: TravelTip[] = [
  {
    title: "Contact Hotels in Advance",
    content: "Always contact your hotel before arrival to confirm their allergen protocols and cleaning routines for allergy-free accommodations."
  },
  {
    title: "Use Allergy Apps",
    content: "Apps like Spokin can help you find allergy-aware restaurants and read reviews from other travelers with similar dietary needs."
  },
  {
    title: "Carry Dutch Translation Cards",
    content: "Even though English is widely spoken, having an allergy translation card in Dutch ensures clear communication in emergency situations."
  },
  {
    title: "Look for Allergen Charts",
    content: "Choose restaurants that display allergen charts or have confirmed safe practices. Many Amsterdam establishments are well-prepared for allergy needs."
  }
];

const languageTable: LanguageTable = {
  headers: ["English", "Dutch"],
  rows: [
    ["I have a food allergy", "Ik heb een voedselallergie"],
    ["I'm allergic to nuts", "Ik ben allergisch voor noten"],
    ["I'm allergic to gluten", "Ik ben allergisch voor gluten"],
    ["I'm allergic to dairy", "Ik ben allergisch voor zuivel"],
    ["Does this contain nuts?", "Bevat dit noten?"],
    ["Is this gluten-free?", "Is dit glutenvrij?"],
    ["Please clean the preparation area", "Maak alstublieft het bereidingsgebied schoon"],
    ["I need an ambulance", "Ik heb een ambulance nodig"]
  ]
};

const intro = [
  "Amsterdam, the charming capital of the Netherlands, offers excellent opportunities for travelers with food allergies to enjoy a safe and memorable vacation. The city's world-class hotels and restaurants are increasingly allergy-aware, with many establishments providing dedicated allergy-free rooms and trained staff.",
  "Whether you're managing nut allergies, gluten intolerance, dairy sensitivity, celiac disease, or dust allergies, Amsterdam's hospitality industry has evolved to accommodate diverse needs. From luxury hotels with hypoallergenic bedding to restaurants with clear allergen labeling, you can explore this beautiful canal city with confidence."
];

export const amsterdamContent: DestinationContent = {
  imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
  intro,
  hotels,
  restaurants,
  faqs,
  tips,
  languageTable
};