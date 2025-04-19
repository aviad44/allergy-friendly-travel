
import { DestinationContent } from '@/types/definitions';

export const torontoContent: DestinationContent = {
  intro: "Toronto is widely regarded as one of the most multicultural and inclusive cities in North America—and that extends to how it handles food allergies and dietary restrictions. Whether you're traveling with celiac disease, a peanut allergy, or a dairy sensitivity, you'll find plenty of hotels and restaurants that offer safe, customized experiences.",
  hotels: [
    {
      name: "Fairmont Royal York",
      address: "100 Front St W, Toronto, ON M5J 1E3, Canada",
      features: [
        "⭐ 5-star luxury",
        "🍽️ Personalized allergy protocols",
        "👨‍🍳 Custom meals from executive chef"
      ],
      description: "Historic luxury hotel offering personalized allergy notes at check-in, custom meals from executive chef upon request, gluten-free and dairy-free items at all dining outlets, and hypoallergenic rooms available.",
      quote: "I have celiac disease and was nervous, but the staff went out of their way to ensure I could eat safely. I even got gluten-free pancakes at breakfast! – Sophie T., UK",
      bookingUrl: "https://www.fairmont.com/royal-york-toronto/",
      rating: 5
    },
    {
      name: "Chelsea Hotel Toronto",
      address: "33 Gerrard St W, Toronto, ON M5G 1Z4, Canada",
      features: [
        "⭐ 4-star hotel",
        "👨‍👩‍👧‍👦 Family-friendly",
        "🍽️ Allergy-aware dining"
      ],
      description: "Family-oriented hotel with comprehensive allergy protocols, including staff training on cross-contamination prevention, nut-free desserts, and soy-free options available.",
      quote: "Traveling with my 7-year-old who has a nut allergy was a breeze here. They even had a nut-free menu at the restaurant! – Michael R., USA",
      bookingUrl: "https://www.chelseatoronto.com/",
      rating: 4
    },
    {
      name: "The Hazelton Hotel",
      address: "118 Yorkville Ave, Toronto, ON M5R 1C2, Canada",
      features: [
        "⭐ 5-star boutique",
        "👨‍🍳 Direct chef interaction",
        "🥗 Allergen-aware amenities"
      ],
      description: "Boutique luxury hotel offering small, curated dining with direct chef interaction, comprehensive allergy notes system, and organic allergen-aware amenities.",
      quote: "They asked me what I could eat, not just what I couldn't. That meant a lot. The food and service were flawless. – Anita K., Germany",
      bookingUrl: "https://www.thehazeltonhotel.com/",
      rating: 5
    }
  ],
  faqs: [
    {
      question: "Are allergy translation cards needed in Toronto?",
      answer: "While English is spoken everywhere, it's helpful to bring a clear, printed allergy card in case you're dining in ethnic areas."
    },
    {
      question: "Do restaurants in Toronto label allergens?",
      answer: "Most modern restaurants do. Vegan, GF, and dairy-free items are usually marked clearly."
    },
    {
      question: "Is Toronto safe for people with severe food allergies?",
      answer: "Yes—but always call ahead, especially for sesame, nuts, or multiple allergies."
    }
  ],
  languageTable: {
    headers: ["English", "French"],
    rows: [
      ["I have a food allergy", "J'ai une allergie alimentaire"],
      ["Please no nuts", "Pas de noix s'il vous plaît"],
      ["Is this gluten-free?", "Est-ce sans gluten?"],
      ["I cannot eat dairy", "Je ne peux pas manger de produits laitiers"],
      ["I have celiac disease", "Je suis cœliaque"]
    ]
  }
};
