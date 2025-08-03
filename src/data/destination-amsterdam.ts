import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
  {
    id: "amsterdam-marriott",
    name: "Amsterdam Marriott Hotel",
    description: "Luxury hotel with allergy-free rooms and attentive staff in central Amsterdam near Leidseplein.",
    imageUrl: "/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png",
    website: "https://www.marriott.com/en-us/hotels/amsnt-amsterdam-marriott-hotel/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amsnt-amsterdam-marriott-hotel/overview/",
    location: "Leidseplein, Amsterdam Center",
    amenities: ["Allergy-free rooms", "Hypoallergenic bedding", "Allergen-aware kitchen", "Central location"],
    guestReview: "The chef prepared my breakfast separately to avoid cross-contamination with nuts and dairy. I felt completely safe here.",
    allergyInfo: "Staff trained in allergen protocols, separate food preparation available",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "doubletree-amsterdam-central",
    name: "DoubleTree by Hilton Amsterdam Centraal Station",
    description: "Modern hotel with allergy-free bedding and hypoallergenic cleaning, conveniently located next to Central Station.",
    imageUrl: "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
    website: "https://www.hilton.com/en/hotels/amstdgi-doubletree-amsterdam-centraal-station/",
    bookingUrl: "https://www.hilton.com/en/hotels/amstdgi-doubletree-amsterdam-centraal-station/",
    location: "Amsterdam Central Station",
    amenities: ["Allergy-free bedding", "Hypoallergenic cleaning", "24/7 front desk", "Near public transport"],
    guestReview: "Staff took my nut allergy seriously and provided extra room cleaning.",
    allergyInfo: "Hypoallergenic room options, allergy-aware housekeeping",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "w-amsterdam",
    name: "W Amsterdam",
    description: "Luxury design hotel with allergy-clean rooms and rooftop pool in the heart of Amsterdam.",
    imageUrl: "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    website: "https://www.marriott.com/en-us/hotels/amswh-w-amsterdam/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amswh-w-amsterdam/overview/",
    location: "Amsterdam Center",
    amenities: ["Allergy-clean rooms", "Rooftop pool", "Designer interiors", "Luxury amenities"],
    guestReview: "Housekeeping was careful to avoid dust triggers and provided hypoallergenic bedding.",
    allergyInfo: "Premium allergy accommodations, dust-free cleaning protocols",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "renaissance-amsterdam",
    name: "Renaissance Amsterdam Hotel",
    description: "Historic hotel with allergy-aware staff, central location, and quiet rooms for sensitive guests.",
    imageUrl: "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    website: "https://www.marriott.com/en-us/hotels/amsrd-renaissance-amsterdam-hotel/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amsrd-renaissance-amsterdam-hotel/overview/",
    location: "Amsterdam Center",
    amenities: ["Allergy-aware staff", "Central location", "Quiet rooms", "Historic charm"],
    guestReview: "I notified the hotel about my dairy allergy and they prepared a special breakfast tray.",
    allergyInfo: "Staff training on allergen management, customized meal options",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  }
];

const restaurants: Restaurant[] = [
  {
    id: "avocado-show",
    name: "The Avocado Show",
    description: "Popular restaurant known for nut and sesame awareness with creative avocado dishes.",
    cuisine: "Modern International",
    location: "Multiple locations in Amsterdam",
    allergyInfo: "Staff trained in nut and sesame allergy protocols",
    features: ["Allergen awareness", "Clear labeling", "Multiple locations"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "foodhallen",
    name: "Foodhallen",
    description: "Indoor food market with multiple stalls featuring allergen charts and clear labeling.",
    cuisine: "International Food Court",
    location: "De Hallen, Amsterdam West",
    allergyInfo: "Allergen charts available at all stalls, trained staff",
    features: ["Allergen charts", "Multiple cuisine options", "Clear labeling"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "impero-romano",
    name: "Impero Romano",
    description: "Italian restaurant specializing in pasta and risotto with careful allergy handling.",
    cuisine: "Italian",
    location: "Amsterdam Center",
    allergyInfo: "Staff handles allergies carefully, separate preparation available",
    features: ["Italian cuisine", "Allergy-aware preparation", "Authentic dishes"],
    isPurelyAllergyFriendly: true
  },
  {
    id: "eetcafe-roem",
    name: "Eetcafé Roem",
    description: "Safe for nut allergies with great pancakes and desserts in a cozy setting.",
    cuisine: "Dutch Café",
    location: "Amsterdam Center",
    allergyInfo: "Nut-free environment, allergy-safe desserts",
    features: ["Nut-free options", "Traditional Dutch food", "Cozy atmosphere"],
    isPurelyAllergyFriendly: true
  }
];

const faqs: FAQ[] = [
  {
    question: "Are Amsterdam hotels generally allergy-friendly?",
    answer: "Many Amsterdam hotels are well-equipped to handle food allergies and provide allergy-free rooms. The city's hospitality industry is increasingly aware of allergen needs."
  },
  {
    question: "What should I tell my hotel about my allergies?",
    answer: "Contact the hotel in advance to discuss your specific allergies. Most quality hotels can provide hypoallergenic bedding and ensure allergen-free room cleaning."
  },
  {
    question: "Are there allergy-friendly restaurants in Amsterdam?",
    answer: "Yes, Amsterdam has many restaurants with allergen awareness, clear labeling, and trained staff. Popular options include The Avocado Show and Foodhallen."
  },
  {
    question: "Should I bring allergy translation cards in Amsterdam?",
    answer: "While many Amsterdam residents speak English, having an allergy translation card in Dutch can be helpful for restaurants and emergency situations."
  }
];

const tips: TravelTip[] = [
  {
    title: "Contact Hotels in Advance",
    content: "Always contact your hotel before arrival to confirm their allergen protocols and cleaning routines for allergy-free accommodations."
  },
  {
    title: "Use Allergy Apps",
    content: "Apps like Spokin can help you find allergy-aware restaurants and read reviews from other travelers with similar dietary needs."
  },
  {
    title: "Carry Dutch Translation Cards",
    content: "Even though English is widely spoken, having an allergy translation card in Dutch ensures clear communication in emergency situations."
  },
  {
    title: "Look for Allergen Charts",
    content: "Choose restaurants that display allergen charts or have confirmed safe practices. Many Amsterdam establishments are well-prepared for allergy needs."
  }
];

const languageTable: LanguageTable = {
  headers: ["English", "Dutch"],
  rows: [
    ["I have a food allergy", "Ik heb een voedselallergie"],
    ["I'm allergic to nuts", "Ik ben allergisch voor noten"],
    ["I'm allergic to gluten", "Ik ben allergisch voor gluten"],
    ["I'm allergic to dairy", "Ik ben allergisch voor zuivel"],
    ["Does this contain nuts?", "Bevat dit noten?"],
    ["Is this gluten-free?", "Is dit glutenvrij?"],
    ["Please clean the preparation area", "Maak alstublieft het bereidingsgebied schoon"],
    ["I need an ambulance", "Ik heb een ambulance nodig"]
  ]
};

const intro = [
  "Amsterdam, the charming capital of the Netherlands, offers excellent opportunities for travelers with food allergies to enjoy a safe and memorable vacation. The city's world-class hotels and restaurants are increasingly allergy-aware, with many establishments providing dedicated allergy-free rooms and trained staff.",
  "Whether you're managing nut allergies, gluten intolerance, dairy sensitivity, celiac disease, or dust allergies, Amsterdam's hospitality industry has evolved to accommodate diverse needs. From luxury hotels with hypoallergenic bedding to restaurants with clear allergen labeling, you can explore this beautiful canal city with confidence."
];

export const amsterdamContent: DestinationContent = {
  intro,
  hotels,
  restaurants,
  faqs,
  tips,
  languageTable
};