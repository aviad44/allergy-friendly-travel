
import { DestinationContent } from '@/types/definitions';

export const barcelonaContent: DestinationContent = {
  intro: "Barcelona offers many allergy-friendly accommodations for travelers with dietary restrictions. From luxury hotels in the city center to beautiful properties along the coastline, you'll find establishments that take food allergies seriously and provide safe dining options during your stay.",
  hotels: [
  ],
  faqs: [
    {
      question: "Do Barcelona hotels accommodate gluten allergies?",
      answer: "Yes, many Barcelona hotels offer gluten-free options. Hotels like Grand Hotel Central and Hotel Arts Barcelona have specialized menus and trained staff to handle gluten allergies safely."
    },
    {
      question: "How should I communicate my allergies in Barcelona?",
      answer: "It's recommended to notify your hotel about allergies in advance. Carry Spanish-language allergy cards to ease communication, and learn key phrases like 'Tengo alergia a...' (I am allergic to...)."
    },
    {
      question: "What common allergens should I watch for in Spanish cuisine?",
      answer: "Be cautious of nuts in desserts, wheat in many traditional dishes, and dairy products in sauces. Seafood is also common in Catalan cuisine, so shellfish-allergic travelers should be particularly careful."
    },
    {
      question: "Are there pharmacies in Barcelona where I can get allergy medication?",
      answer: "Yes, Barcelona has numerous 'farmacias' (pharmacies) marked with green crosses, many open 24 hours. Key medications are available, though it's best to bring your prescribed medications, especially EpiPens."
    }
  ],
  languageTable: {
    headers: ["English", "Spanish", "Catalan"],
    rows: [
      ["I have a food allergy", "Tengo alergia a alimentos", "Tinc al·lèrgia alimentària"],
      ["Is this food safe for me?", "¿Esta comida es segura para mí?", "Aquest menjar és segur per a mi?"],
      ["No nuts please", "Sin frutos secos, por favor", "Sense fruits secs, si us plau"],
      ["I need gluten-free food", "Necesito comida sin gluten", "Necessito menjar sense gluten"]
    ]
  }
};
