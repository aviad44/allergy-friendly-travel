import { DestinationContent, Hotel, FAQ } from '@/types/definitions';

const hotels: Hotel[] = [
];

const faqs: FAQ[] = [
  {
    question: "Are there many gluten-free options in Tuscany?",
    answer: "Yes, Italy is very celiac-aware. Many restaurants in Tuscany offer certified gluten-free options, especially in Florence and Siena. The Italian Celiac Association (AIC) certifies restaurants, making them easy to identify."
  },
  {
    question: "How should I communicate my food allergies in Tuscany?",
    answer: "We recommend downloading an Italian allergy translation card or using our free allergy translation tool to create custom cards. Mention your allergies when making reservations and remind staff when you arrive."
  },
  {
    question: "What are the best allergy-friendly restaurants in Florence?",
    answer: "Ciro & Sons is certified gluten-free and handles multiple allergies well. Gelateria Edoardo offers vegan and nut-free gelato with separate utensils. La Cucina del Ghianda can accommodate soy and gluten allergies with advance notice."
  },
  {
    question: "Can I visit wineries in Tuscany with food allergies?",
    answer: "Yes, many Chianti region wineries can accommodate allergies. Always call ahead, as some wine may contain traces of allergens like egg whites or milk proteins used in the fining process."
  },
  {
    question: "Are allergy-friendly restaurants more expensive in Tuscany?",
    answer: "Not necessarily. While some high-end restaurants like Michelin-starred Cum Quibus in San Gimignano may charge more, many affordable trattorias and gelaterias throughout Tuscany can accommodate allergies at standard prices."
  }
];

export const tuscanyContent: DestinationContent = {
  intro: [
    "Tuscany is a food lover's paradise, and with proper planning, it can be enjoyed safely by travelers with dietary restrictions. This updated 6-day itinerary covers Florence, Chianti, Siena, Lucca, Pisa, and San Gimignano — with allergy-friendly accommodation and dining options throughout.",
    "From gluten-free certified restaurants to hotels with dedicated allergy protocols, our guide helps you navigate Tuscany's culinary landscape with confidence."
  ],
  hotels,
  faqs,
  languageTable: {
    headers: ["English", "Italian", "Pronunciation"],
    rows: [
      ["I have a food allergy", "Ho un'allergia alimentare", "Oh oon ah-lair-jee-ah ah-lee-men-tah-ray"],
      ["I cannot eat gluten", "Non posso mangiare glutine", "Non pos-so man-jar-eh gloo-tee-nay"],
      ["I am allergic to nuts", "Sono allergico alle noci", "So-no al-lair-jee-ko al-lay no-chee"],
      ["I have celiac disease", "Ho la celiachia", "Oh la chay-lee-ah-kee-ah"],
      ["Does this contain dairy?", "Contiene lattosio?", "Con-tee-eh-nay lat-toh-see-oh"]
    ]
  }
};
