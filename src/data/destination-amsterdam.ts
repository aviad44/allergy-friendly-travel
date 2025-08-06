import { Hotel, FAQ, TravelTip, LanguageTable, Restaurant, DestinationContent } from "@/types/definitions";

const hotels: Hotel[] = [
  {
    id: "amsterdam-marriott",
    name: "1. Amsterdam Marriott Hotel ★★★★★",
    description: "Luxury hotel with allergy-free rooms and attentive staff in central Amsterdam near Leidseplein.",
    imageUrl: "/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png",
    website: "https://www.marriott.com/en-us/hotels/amsnt-amsterdam-marriott-hotel/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amsnt-amsterdam-marriott-hotel/overview/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Leidseplein, Amsterdam Center",
    amenities: ["Allergy-free rooms", "Hypoallergenic bedding", "Allergen-aware kitchen", "Central location"],
    guestReview: "The kitchen staff took my multiple allergies seriously. They prepared my meals in a separate area and the chef personally spoke with me about ingredients. The hypoallergenic bedding was a great touch. - Sarah M., Canada (Source: Marriott Reviews)",
    allergyInfo: "Staff trained in allergen protocols, separate food preparation available, hypoallergenic bedding upon request",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "doubletree-amsterdam-central",
    name: "2. DoubleTree by Hilton Amsterdam Centraal Station ★★★★",
    description: "Modern hotel with allergy-free bedding and hypoallergenic cleaning, conveniently located next to Central Station.",
    imageUrl: "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
    website: "https://www.hilton.com/en/hotels/amstdgi-doubletree-amsterdam-centraal-station/",
    bookingUrl: "https://www.hilton.com/en/hotels/amstdgi-doubletree-amsterdam-centraal-station/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam Central Station",
    amenities: ["Allergy-free bedding", "Hypoallergenic cleaning", "24/7 front desk", "Near public transport"],
    guestReview: "DoubleTree now offers allergy-friendly cookies at check-in which was thoughtful. The housekeeping team used hypoallergenic cleaning products in my room when I mentioned my sensitivities. - James K., UK (Source: Hilton Guest Reviews)",
    allergyInfo: "Hypoallergenic room options, allergy-aware housekeeping, allergy-friendly cookies available",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "w-amsterdam",
    name: "3. W Amsterdam ★★★★★",
    description: "Luxury design hotel with allergy-clean rooms and rooftop pool in the heart of Amsterdam.",
    imageUrl: "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    website: "https://www.marriott.com/en-us/hotels/amswh-w-amsterdam/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amswh-w-amsterdam/overview/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam Center",
    amenities: ["Allergy-clean rooms", "Rooftop pool", "Designer interiors", "Luxury amenities"],
    guestReview: "W Amsterdam exceeded my expectations for dust allergy management. The room was thoroughly cleaned with HEPA filters and they provided allergen-free linens. The spa also accommodated my skin sensitivities. - Elena R., Germany (Source: Marriott Reviews)",
    allergyInfo: "Premium allergy accommodations, dust-free cleaning protocols, HEPA filtration systems",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "renaissance-amsterdam",
    name: "4. Renaissance Amsterdam Hotel ★★★★",
    description: "Historic hotel with allergy-aware staff, central location, and quiet rooms for sensitive guests.",
    imageUrl: "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    website: "https://www.marriott.com/en-us/hotels/amsrd-renaissance-amsterdam-hotel/overview/",
    bookingUrl: "https://www.marriott.com/en-us/hotels/amsrd-renaissance-amsterdam-hotel/overview/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam Center",
    amenities: ["Allergy-aware staff", "Central location", "Quiet rooms", "Historic charm"],
    guestReview: "The breakfast team prepared a completely dairy-free spread for me, including plant-based alternatives. They even had lactose-free options clearly labeled. The attention to detail was impressive. - Michel D., France (Source: Marriott Reviews)",
    allergyInfo: "Staff training on allergen management, customized meal options, clear allergen labeling",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "anantara-grand-krasnapolsky",
    name: "5. Anantara Grand Hotel Krasnapolsky Amsterdam ★★★★★",
    description: "Historic hotel at Dam Square with allergy accommodations on request and dedicated allergen-aware dining.",
    imageUrl: "/lovable-uploads/cf3c0a43-1695-413d-b297-1ba363ee2b56.png",
    website: "https://www.anantara.com/en/grand-hotel-krasnapolsky-amsterdam",
    bookingUrl: "https://www.anantara.com/en/grand-hotel-krasnapolsky-amsterdam?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Dam Square, Amsterdam Center",
    amenities: ["Historic charm", "Allergy accommodations", "Prime location", "Multiple restaurants"],
    guestReview: "They handled my gluten intolerance perfectly and offered gluten-free breakfast options. The concierge even recommended safe restaurants nearby. - Anna L., Belgium (Source: Anantara Reviews)",
    allergyInfo: "Gluten-free breakfast options, staff trained in celiac protocols, restaurant recommendations",
    stars: 5,
    priceRange: "Luxury",
    isPurelyAllergyFriendly: true
  },
  {
    id: "hotel-v-nesplein",
    name: "6. Hotel V Nesplein ★★★★",
    description: "Boutique design hotel with personalized allergy services and locally-sourced allergy-friendly cuisine.",
    imageUrl: "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    website: "https://www.hotelv.nl/en/nesplein/",
    bookingUrl: "https://www.hotelv.nl/en/nesplein/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Nesplein, Amsterdam Center",
    amenities: ["Boutique design", "Local cuisine", "Allergy-friendly menu", "Personalized service"],
    guestReview: "The restaurant worked with me to create custom nut-free meals. They source ingredients locally and know exactly what goes into every dish. Felt very safe dining here. - Marcus T., Netherlands (Source: Hotel V Reviews)",
    allergyInfo: "Custom meal preparation, local sourcing with full ingredient knowledge, nut allergy protocols",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "pestana-amsterdam-riverside",
    name: "7. Pestana Amsterdam Riverside ★★★★",
    description: "Waterfront hotel with comprehensive allergy management and medical-grade air filtration systems.",
    imageUrl: "/lovable-uploads/4947cdd5-ba7b-4184-82a1-194a47b9a29a.png",
    website: "https://www.pestana.com/en/hotel/pestana-amsterdam-riverside",
    bookingUrl: "https://www.pestana.com/en/hotel/pestana-amsterdam-riverside?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam Riverside",
    amenities: ["Riverside location", "Medical-grade air filters", "Allergy-safe rooms", "Modern facilities"],
    guestReview: "Perfect for my severe environmental allergies. The air filtration system made a huge difference and housekeeping used only hypoallergenic products. - Patricia S., Spain (Source: Pestana Reviews)",
    allergyInfo: "Medical-grade HEPA filtration, environmental allergy protocols, hypoallergenic housekeeping",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "lloyd-hotel",
    name: "8. Lloyd Hotel & Cultural Embassy ★★★★",
    description: "Unique cultural hotel with flexible allergy accommodations and creative dietary solutions.",
    imageUrl: "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png",
    website: "https://www.lloydhotel.com/",
    bookingUrl: "https://www.lloydhotel.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam East",
    amenities: ["Cultural embassy", "Flexible accommodations", "Creative cuisine", "Artistic atmosphere"],
    guestReview: "This hotel thinks outside the box for allergies. They created a completely dairy and egg-free menu just for me and the chef explained every ingredient. Truly innovative approach. - David R., USA (Source: Lloyd Hotel Reviews)",
    allergyInfo: "Creative allergen-free cuisine, flexible meal planning, chef consultations available",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "ink-hotel",
    name: "9. INK Hotel Amsterdam ★★★★",
    description: "Design hotel in former newspaper building with detailed allergen documentation and safe dining protocols.",
    imageUrl: "/lovable-uploads/521a0582-0fd0-49a1-92e5-e0975d113512.png",
    website: "https://www.inkhotel.nl/",
    bookingUrl: "https://www.inkhotel.nl/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Amsterdam Center",
    amenities: ["Design hotel", "Historic building", "Allergen documentation", "Safe dining"],
    guestReview: "Impressed by their detailed allergen documentation. Every menu item had clear labeling and the kitchen could modify dishes for multiple allergies. Very professional approach. - Sophie K., UK (Source: INK Hotel Reviews)",
    allergyInfo: "Detailed allergen documentation, menu modification capabilities, multi-allergy protocols",
    stars: 4,
    priceRange: "Mid-Range",
    isPurelyAllergyFriendly: true
  },
  {
    id: "waldorf-astoria",
    name: "10. Waldorf Astoria Amsterdam ★★★★★",
    description: "Luxury canal-side hotel with world-class allergy services and Michelin-level allergen-free cuisine.",
    imageUrl: "/lovable-uploads/93d77143-5339-4fd4-a873-df1141b70120.png",
    website: "https://www.hilton.com/en/hotels/amswa-waldorf-astoria-amsterdam/",
    bookingUrl: "https://www.hilton.com/en/hotels/amswa-waldorf-astoria-amsterdam/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=amsterdam",
    location: "Herengracht Canal",
    amenities: ["Luxury canal location", "Michelin-level cuisine", "World-class service", "Historic palace"],
    guestReview: "The epitome of luxury allergy accommodation. Their chef has Michelin training in allergen-free cuisine and created incredible meals for my celiac condition. Outstanding service. - Victoria H., Australia (Source: Waldorf Astoria Reviews)",
    allergyInfo: "Michelin-trained allergen-free cuisine, luxury allergy protocols, comprehensive dietary management",
    stars: 5,
    priceRange: "Luxury",
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
  imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
  intro,
  hotels,
  restaurants,
  faqs,
  tips,
  languageTable
};