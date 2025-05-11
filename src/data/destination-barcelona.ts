
import { DestinationContent } from '@/types/definitions';

export const barcelonaContent: DestinationContent = {
  intro: "Barcelona offers many allergy-friendly accommodations for travelers with dietary restrictions. From luxury hotels in the city center to beautiful properties along the coastline, you'll find establishments that take food allergies seriously and provide safe dining options during your stay.",
  hotels: [
    {
      name: "Grand Hotel Central",
      address: "Via Laietana, 30, 08003 Barcelona, Spain",
      features: [
        "Personalized allergy menus",
        "Staff trained in allergen management",
        "Central location in Barcelona",
        "Luxury accommodations",
        "Custom meal preparation"
      ],
      description: "Located in the heart of Barcelona, this luxury hotel prioritizes guest well-being with exceptional allergy-aware dining options.",
      quote: "Absolutely loved this hotel. From the moment I arrived, they ensured all my dietary needs were met.",
      bookingUrl: "https://www.grandhotelcentral.com/"
    },
    {
      name: "Mercer Hotel Barcelona",
      address: "Carrer dels Lledó, 7, 08002 Barcelona, Spain",
      features: [
        "Tailored meals for food allergies",
        "Historic Gothic Quarter location",
        "Boutique hotel experience",
        "Staff allergen training",
        "Allergy-friendly breakfast options"
      ],
      description: "Renowned for its exceptional service, Mercer Hotel provides tailored meals for guests with allergies in a stunning historic setting.",
      quote: "The staff was incredibly attentive to my son's peanut allergy, making our stay stress-free.",
      bookingUrl: "https://www.mercerbarcelona.com/"
    },
    {
      name: "Hotel Arts Barcelona",
      address: "Carrer de la Marina, 19-21, 08005 Barcelona, Spain",
      features: [
        "Multiple allergy-conscious restaurants",
        "Beachfront location",
        "Luxury five-star property",
        "Detailed allergen documentation",
        "Custom dining experiences"
      ],
      description: "Overlooking the marina, Hotel Arts offers allergy-conscious dining options with stunning Mediterranean views.",
      quote: "The staff took my allergies seriously and ensured every meal was prepared safely.",
      bookingUrl: "https://www.hotelartsbarcelona.com/"
    },
    {
      name: "Nobu Hotel Barcelona",
      address: "Av. de Roma, 2-4, 08014 Barcelona, Spain",
      features: [
        "Japanese-fusion allergy-safe dining",
        "Personal chef consultations",
        "Luxury accommodations",
        "Clear allergen labeling",
        "Personalized dining experiences"
      ],
      description: "Combining Japanese-inspired luxury with dietary sensitivity, Nobu Hotel is a top pick for allergy-conscious travelers.",
      quote: "The chef personally ensured that my meals were allergy-safe, and the service was impeccable.",
      bookingUrl: "https://barcelona.nobuhotels.com/"
    },
    {
      name: "Hotel Calipolis Sitges",
      address: "Avinguda Sofia, 2, 08870 Sitges, Barcelona, Spain",
      features: [
        "Allergy-friendly menus",
        "Customized meal plans",
        "Beachfront location in Sitges",
        "Short drive from Barcelona",
        "Staff trained in allergen management"
      ],
      description: "Situated in Sitges, a short drive from Barcelona, this hotel offers allergy-friendly menus and customized meal plans in a beautiful coastal setting.",
      quote: "I felt completely safe dining here, thanks to their detailed approach to food allergies.",
      bookingUrl: "https://www.hotelcalipolis.com/en/"
    }
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
