
import { DestinationContent } from '@/types/definitions';

export const portugalContent: DestinationContent = {
  intro: "Portugal offers a blend of historic charm and modern allergy awareness, making it an increasingly popular destination for travelers with dietary restrictions.",
  hotels: [
    {
      name: "Corinthia Hotel Lisbon ★★★★★",
      address: "Av. Columbano Bordalo Pinheiro 105, 1099-031 Lisboa, Portugal",
      features: [
        "⭐ 5-star luxury hotel",
        "🍽️ Extensive allergy protocols",
        "👨‍🍳 Chef consultations for allergies"
      ],
      description: "This upscale hotel in Lisbon's financial district offers dedicated allergy-friendly dining options and personalized meal planning for guests with food sensitivities.",
      quote: "The chef personally discussed my celiac requirements and prepared amazing Portuguese dishes without gluten. Incredible service!",
      bookingUrl: "https://www.corinthia.com/lisbon/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/92180698.jpg?k=c787ea99fac65b027f3684366982e534717cce7798e75c99219b4b5c4423870e&o=&hp=1",
      rating: 4.7,
      location: "Lisbon"
    },
    {
      name: "Pine Cliffs Resort, a Luxury Collection ★★★★★",
      address: "Praia da Falésia, Albufeira, 8200-593, Portugal",
      features: [
        "⭐ 5-star beach resort",
        "🍽️ Allergy-conscious restaurants",
        "🏖️ Family-friendly with allergy options"
      ],
      description: "Spectacular cliff-top resort in the Algarve with multiple restaurants that accommodate various dietary restrictions including gluten, dairy, and nut allergies.",
      quote: "They prepared special dairy-free options for my children and were extremely careful about cross-contamination.",
      bookingUrl: "https://www.pinecliffs.com/en/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/186319149.jpg?k=84a9de9ef52ef9fe00f358d11a36f77526e83555f1adc29f9c7775b24df3ec11&o=&hp=1",
      rating: 4.8,
      location: "Algarve"
    },
    {
      name: "The Yeatman Hotel ★★★★★",
      address: "Rua do Choupelo, 4400-088 Vila Nova de Gaia, Portugal",
      features: [
        "⭐ 5-star wine hotel",
        "🍽️ Michelin-starred restaurant with allergy menus",
        "🍷 Wine pairings for gluten-free dishes"
      ],
      description: "Luxury wine hotel in Porto with a Michelin-starred restaurant that excels in catering to dietary restrictions without compromising on gourmet quality.",
      quote: "Their Michelin-starred restaurant created an entire tasting menu that was gluten and dairy-free. A culinary revelation!",
      bookingUrl: "https://www.the-yeatman-hotel.com/en/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/135180478.jpg?k=0fed0833d64cb30af0597d5ec43afd63ff639fe6d5558f0eb4e5146f5ab52899&o=&hp=1",
      rating: 4.9,
      location: "Porto"
    },
    {
      name: "Martinhal Lisbon Chiado Family Suites ★★★★",
      address: "Rua das Flores 44, 1200-195 Lisboa, Portugal",
      features: [
        "⭐ 4-star family suites",
        "🧒 Kid-friendly allergy options",
        "🍽️ In-room kitchens for allergy control"
      ],
      description: "Family-focused apartment hotel in Lisbon's historic center with in-room kitchens allowing families complete control over meal preparation for allergies.",
      quote: "Having a full kitchen let us safely prepare meals for our son with multiple food allergies while still enjoying a central location.",
      bookingUrl: "https://www.martinhal.com/chiado/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/73371172.jpg?k=3a06eca27d79da696eb57faa9e34207030c103993acf62755984299125a9af54&o=&hp=1",
      rating: 4.6,
      location: "Lisbon"
    }
  ],
  faqs: [
    {
      question: "How allergy-aware are restaurants in Portugal?",
      answer: "Major cities like Lisbon and Porto have seen significant improvements in allergy awareness. Many restaurants now offer allergen information and can accommodate common dietary restrictions, particularly in tourist areas."
    },
    {
      question: "Are traditional Portuguese dishes suitable for people with allergies?",
      answer: "Many traditional Portuguese dishes are naturally gluten-free, such as arroz de marisco (seafood rice) and grilled fish. However, be cautious of hidden ingredients in sauces and marinades. Dairy is common in Portuguese desserts."
    },
    {
      question: "What Portuguese phrases should I know for communicating allergies?",
      answer: "Learn 'Tenho alergia a...' (I am allergic to...), 'Sem glúten' (gluten-free), 'Sem lactose' (dairy-free), and 'Isso contém...?' (Does this contain...?). Carrying an allergy translation card in Portuguese is highly recommended."
    },
    {
      question: "Can I find specialty food items for allergies in Portuguese stores?",
      answer: "Larger cities have health food stores and supermarket chains like Continente and Pingo Doce that stock gluten-free, dairy-free, and other allergy-friendly products. The selection is best in urban areas."
    }
  ],
  languageTable: {
    headers: ["English", "Portuguese"],
    rows: [
      ["I have a food allergy", "Tenho uma alergia alimentar"],
      ["Gluten-free", "Sem glúten"],
      ["Dairy-free", "Sem lactose / Sem leite"],
      ["Nut-free", "Sem frutos secos"],
      ["Is this safe for me to eat?", "É seguro para eu comer?"]
    ]
  }
};
