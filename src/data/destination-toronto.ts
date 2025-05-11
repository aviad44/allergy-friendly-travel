
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
      rating: 5,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/268797492.jpg?k=1c57b55dc0bc1d69987afbe898862c91bea9248f403c1ea5b520e0d3e77330ce&o=&hp=1",
      location: "Downtown Toronto"
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
      rating: 4,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/90203473.jpg?k=e2e730e5b8649d5783f3c5c480e629b22ef30eaeedce76ba482f462f3b13e933&o=&hp=1",
      location: "Downtown Toronto"
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
      rating: 5,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/133383393.jpg?k=2074fce7a998d4c58c64fe06b05981aa27c2e8dc1ac985f7d3ce4ee30a077060&o=&hp=1",
      location: "Yorkville"
    },
    {
      name: "Hotel X Toronto",
      address: "111 Princes' Blvd, Toronto, ON M6K 3C3, Canada",
      features: [
        "⭐ 5-star luxury",
        "🍽️ Dedicated vegan restaurant",
        "🧪 Allergy testing protocols"
      ],
      description: "Modern luxury hotel with state-of-the-art allergy protocols including a dedicated vegan restaurant and staff trained in allergy management.",
      quote: "As someone with multiple food allergies, I was impressed by their detailed food labeling and the chef's willingness to adapt dishes. – James T., Australia",
      bookingUrl: "https://www.hotelxtoronto.com/",
      rating: 4.5,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/337428105.jpg?k=961c2a2278e6238204bbf608f9300a2b8785758e5ef5a8f8886dab1c3760b8f1&o=&hp=1",
      location: "Exhibition Place"
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
    },
    {
      question: "Can I find kosher and halal options with allergy accommodations?",
      answer: "Yes, Toronto has several excellent kosher and halal restaurants that also accommodate food allergies, particularly in the North York and Thornhill areas."
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
