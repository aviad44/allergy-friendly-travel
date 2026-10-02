
import { DestinationContent } from '@/types/definitions';

export const torontoContent: DestinationContent = {
  intro: "Toronto is widely regarded as one of the most multicultural and inclusive cities in North America—and that extends to how it handles food allergies and dietary restrictions. Whether you're traveling with celiac disease, a peanut allergy, or a dairy sensitivity, you'll find plenty of hotels and restaurants that offer safe, customized experiences.",
  hotels: [
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
