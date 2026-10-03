
import { DestinationContent } from '@/types/definitions';

export const cyprusContent: DestinationContent = {
  intro: "Cyprus offers many allergy-friendly accommodations for travelers with dietary restrictions. From luxury resorts along the Mediterranean coast to charming hotels in mountain villages, you'll find establishments that take food allergies seriously and provide safe dining options throughout your stay.",
  hotels: [
    // Atlantica Hotels Chain in Cyprus - Excellent allergen labeling
    {
      id: "atlantica-mare-village",
      name: "Atlantica Mare Village ★★★★",
      location: "Ayia Napa, Cyprus",
      stars: 4,
      address: "Ayia Napa, Cyprus",
      features: [
        "🏷️ All dishes labeled with allergens",
        "👨‍🍳 Trained staff in allergy protocols",
        "🍽️ Separate preparation areas",
        "🌊 Beachfront location"
      ],
      description: "Part of the Atlantica hotel chain known for exceptional allergen management. Every dish in the dining room is clearly labeled with allergen information, making it safe and easy for guests with food allergies.",
      quote: "One member of our party required a gluten-free meal, and we were so impressed by the care and attention given. There were so many gluten-free options available, making it a enjoyable and stress-free meal.",
      bookingUrl: "https://www.atlanticahotels.com/cyprus/ayia-napa/atlantica-mare-village/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=cyprus",
      allergenFriendly: ["Comprehensive Allergen Labeling", "All Major Allergens"],
      amenities: ["WiFi", "Swimming Pool", "Beach Access", "All-Inclusive"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$"
    },
    // Remaining hotels would be updated similarly
  ],
  faqs: [
    {
      question: "Are Cyprus hotels accommodating for celiac disease?",
      answer: "Many hotels in Cyprus, especially larger resorts and luxury hotels like Elysium Hotel in Paphos and NissiBlu Resort in Ayia Napa, have specific protocols for celiac guests. Always notify hotels in advance about your needs. Luxury properties generally have the best training and options."
    },
    {
      question: "What common allergens should I be aware of in Cypriot cuisine?",
      answer: "Traditional Cypriot cuisine often contains wheat (in bread and pastries), dairy (especially halloumi cheese), nuts (particularly in desserts), and sesame seeds (tahini is common). Seafood is also prominent in coastal areas. Always communicate your specific allergies clearly."
    },
    {
      question: "How should I communicate my allergies in Cyprus?",
      answer: "English is widely spoken in tourist areas, but having a Greek allergy translation card can be helpful in smaller establishments. Notify your hotel before arrival, and use phrases like 'I have a serious allergy to...' or 'I cannot eat...' when dining out."
    },
    {
      question: "What are the best areas in Cyprus for allergy-friendly dining?",
      answer: "Tourist centers like Paphos, Limassol, and Ayia Napa generally have better allergy awareness. Luxury hotels and international restaurant chains typically have standardized allergy protocols. The Troodos Mountains area can be accommodating but requires more advance communication."
    },
    {
      question: "Are there pharmacies in Cyprus where I can get allergy medication?",
      answer: "Yes, Cyprus has well-stocked pharmacies in all major cities and tourist areas. Many pharmacists speak English and can help with basic allergy medications. However, it's recommended to bring your prescription medications, especially epinephrine autoinjectors, from home."
    }
  ],
  languageTable: {
    headers: ["English", "Greek"],
    rows: [
      ["I have a food allergy", "Έχω αλλεργία σε τρόφιμα (Eho allergía se trófima)"],
      ["Is this food safe for me?", "Είναι αυτό το φαγητό ασφαλές για μένα; (Eínai aftó to fagitó asfalés gia ména?)"],
      ["I cannot eat gluten", "Δεν μπορώ να φάω γλουτένη (Den boró na fáo glouténi)"],
      ["Does this contain dairy?", "Περιέχει γαλακτοκομικά; (Periéhei galaktokomiká?)"],
      ["I am allergic to nuts", "Έχω αλλεργία στους ξηρούς καρπούς (Eho allergía stous xiroús karpoús)"]
    ]
  }
};
