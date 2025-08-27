import { DestinationContent } from '@/types/definitions';

export const rhodesContent: DestinationContent = {
  intro: "Rhodes, one of Greece's most beautiful islands, offers excellent allergy-friendly accommodations. The Atlantica hotel chain particularly excels in allergen management, with comprehensive labeling systems across all their properties.",
  hotels: [
    {
      id: "atlantica-mikri-poli-rhodes",
      name: "Atlantica Mikri Poli Rhodes ★★★★",
      location: "Rhodes, Greece",
      stars: 4,
      address: "Rhodes, Greece",
      features: [
        "🏷️ Every dish labeled with allergens",
        "👨‍🍳 Comprehensive allergy training",
        "🍽️ Safe food preparation areas",
        "🏛️ Near historical sites"
      ],
      description: "This Atlantica hotel in Rhodes exemplifies the chain's commitment to allergy safety. All dishes in the dining room are clearly marked with allergen information, and staff receive extensive training in allergy management and cross-contamination prevention.",
      quote: "Currently staying here - every single menu item shows exactly which allergens it contains. Makes dining stress-free!",
      bookingUrl: "https://www.atlanticahotels.com/greece/rhodes/atlantica-mikri-poli/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=rhodes",
      allergenFriendly: ["Complete Allergen Transparency", "All Major Allergens"],
      amenities: ["WiFi", "Swimming Pool", "All-Inclusive", "Entertainment"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$"
    },
    {
      id: "atlantica-imperial-resort",
      name: "Atlantica Imperial Resort ★★★★★",
      location: "Rhodes, Greece",
      stars: 5,
      address: "Rhodes, Greece",
      features: [
        "🏷️ Premium allergen labeling system",
        "🍽️ Multiple restaurants with allergy awareness",
        "👨‍🍳 Expert allergy management team",
        "🏖️ Beautiful beachfront location"
      ],
      description: "Luxury Atlantica resort in Rhodes featuring their renowned allergen management system. Every dining venue clearly displays allergen information for each dish, with dedicated staff trained in allergy protocols.",
      quote: "The allergen labeling here is absolutely perfect - every dish clearly marked. I felt completely safe throughout my stay.",
      bookingUrl: "https://www.atlanticahotels.com/greece/rhodes/atlantica-imperial/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=rhodes", 
      allergenFriendly: ["Luxury Allergen Management", "Multiple Allergen Options"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Multiple Restaurants"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$$"
    },
    {
      id: "lindos-village-resort",
      name: "Lindos Village Resort & Spa ★★★★",
      location: "Lindos, Rhodes, Greece",
      stars: 4,
      address: "Lindos, Rhodes, Greece",
      features: [
        "🍽️ Allergy-aware kitchen staff",
        "🏨 Traditional Greek hospitality",
        "🌊 Near beautiful Lindos beaches",
        "🏛️ Close to ancient Acropolis"
      ],
      description: "Traditional resort near the historic village of Lindos with staff trained in allergy awareness. The kitchen can accommodate various dietary restrictions with advance notice.",
      quote: "They prepared special allergy-safe meals and the chef personally explained all ingredients. Very accommodating!",
      bookingUrl: "https://www.lindosvillage.gr/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=rhodes",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Traditional Architecture"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$"
    }
  ],
  faqs: [
    {
      question: "Are Rhodes hotels good for travelers with food allergies?",
      answer: "Yes, especially the Atlantica hotel chain which has excellent allergen labeling systems. Many hotels in Rhodes can accommodate food allergies with advance notice, and tourist areas generally have good awareness of dietary restrictions."
    },
    {
      question: "What makes Atlantica hotels special for allergy management?",
      answer: "Atlantica hotels have comprehensive allergen labeling systems where every dish is clearly marked with allergen information. Their staff receive extensive training in allergy protocols and cross-contamination prevention, making them particularly safe for travelers with food allergies."
    },
    {
      question: "Should I notify my Rhodes hotel about allergies in advance?",
      answer: "Yes, always inform your hotel about your allergies at least 48 hours before arrival. This allows the kitchen staff to prepare and ensures they have appropriate ingredients and protocols in place for your stay."
    }
  ],
  languageTable: {
    headers: ["English", "Greek"],
    rows: [
      ["I have a food allergy", "Έχω αλλεργία σε φαγητό (Ého alleryía se fayitó)"],
      ["Gluten-free", "Χωρίς γλουτένη (Horís glouténi)"],
      ["Nut-free", "Χωρίς ξηρούς καρπούς (Horís xiroús karpoús)"],
      ["Dairy-free", "Χωρίς γαλακτοκομικά (Horís galaktokomiká)"],
      ["This contains allergens", "Αυτό περιέχει αλλεργιογόνα (Aftó periéhei allergioyóna)"]
    ]
  }
};