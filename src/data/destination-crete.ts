
import { DestinationContent } from '@/types/definitions';

export const creteContent: DestinationContent = {
  intro: "Experience the beauty of Crete without worrying about allergies with these allergy-conscious accommodations.",
  hotels: [
    {
      id: "atlantica-grand-mediterraneo",
      name: "Atlantica Grand Mediterraneo ★★★★",
      location: "Corfu, Greece", 
      stars: 4,
      address: "Corfu, Greece",
      features: [
        "🏷️ Detailed allergen information system",
        "🍽️ Multiple restaurants with clear labeling",
        "👨‍🍳 Allergy-aware kitchen protocols",
        "🌊 Stunning sea views"
      ],
      description: "Atlantica's flagship property in Corfu featuring their renowned allergen labeling system across all dining venues. Every dish is clearly marked with comprehensive allergen information, ensuring safe dining for guests with food allergies.",
      quote: "Regarding gluten free. Prior to and on arrival we advised (Eleni) that one of our party was coeliac.",
      bookingUrl: "https://www.atlanticahotels.com/greece/corfu/atlantica-grand-mediterraneo/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=greece",
      allergenFriendly: ["Multiple Allergen Management", "Comprehensive System"],
      amenities: ["WiFi", "Swimming Pool", "Multiple Restaurants", "Spa"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$"
    },
  ],
  faqs: [
    {
      question: "Are Cretan restaurants generally accommodating of food allergies?",
      answer: "Many restaurants in tourist areas of Crete are becoming increasingly aware of food allergies, particularly gluten and dairy intolerances. Traditional tavernas may have less understanding, so it's advisable to bring allergy translation cards in Greek."
    },
    {
      question: "What traditional Cretan dishes are naturally allergy-friendly?",
      answer: "Several traditional Cretan dishes are naturally free from common allergens. Look for grilled meats and fish, horta (wild greens), dakos salad (without cheese for dairy allergies), and roasted vegetables in olive oil."
    },
    {
      question: "Is it easy to find gluten-free products in Cretan supermarkets?",
      answer: "Larger supermarkets in tourist areas and major cities like Heraklion and Chania typically stock gluten-free products. The selection may be limited compared to other European countries, so consider bringing essential items if you have celiac disease."
    },
    {
      question: "What should I tell Cretan hotels about my allergies before arrival?",
      answer: "Always inform your hotel about your allergies at least a week before arrival. Request written confirmation that they can accommodate your needs, ask about kitchen practices, and inquire if they have experience with your specific allergy."
    }
  ],
  languageTable: {
    headers: ["English", "Greek"],
    rows: [
      ["I have a food allergy", "Έχω αλλεργία σε φαγητό (Ého alleryía se fayitó)"],
      ["Gluten-free", "Χωρίς γλουτένη (Horís glouténi)"],
      ["Dairy-free", "Χωρίς γαλακτοκομικά (Horís galaktokomiká)"],
      ["Nut-free", "Χωρίς ξηρούς καρπούς (Horís xiroús karpoús)"],
      ["Is this safe for me to eat?", "Είναι ασφαλές για μένα να το φάω; (Íne asfalés gia ména na to fáo?)"]
    ]
  }
};
