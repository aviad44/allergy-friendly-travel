
import { DestinationContent } from '@/types/definitions';

export const portugalContent: DestinationContent = {
  intro: "Portugal offers a blend of historic charm and modern allergy awareness, making it an increasingly popular destination for travelers with dietary restrictions.",
  hotels: [
    {
      name: "Pine Cliffs Resort, a Luxury Collection ★★★★★",
      address: "Praia da Falésia, Albufeira, 8200-593, Portugal",
      features: [
        "⭐ 5-star beach resort",
        "🍽️ Allergy-conscious restaurants",
        "🏖️ Family-friendly with allergy options"
      ],
      description: "Spectacular cliff-top resort in the Algarve with multiple restaurants that accommodate various dietary restrictions including gluten, dairy, and nut allergies.",
      quote: "The resort does an excellent job catering for gluten free, on the whole. Cafe Corda, the Burger van and Zest all offer significant gf options.",
      bookingUrl: "https://www.pinecliffs.com/en/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/186319149.jpg?k=84a9de9ef52ef9fe00f358d11a36f77526e83555f1adc29f9c7775b24df3ec11&o=&hp=1",
      rating: 4.8,
      location: "Algarve"
    },
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
