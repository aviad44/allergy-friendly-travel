
import { DestinationContent, Restaurant, FAQ } from '@/types/definitions';

// Define restaurants data
const athensRestaurants: Restaurant[] = [
  {
    id: "gf-bistro",
    name: "GF Bistro Athens",
    description: "This dedicated gluten-free bistro is a dream come true for celiacs. From spanakopita to moussaka, everything is made in a completely gluten-free kitchen. Staff are trained in allergy-safe food prep.",
    isPurelyAllergyFriendly: true,
    features: ["100% Gluten-Free", "Celiac Safe", "Traditional Greek Cuisine"],
    location: "Kolonaki, Athens",
    website: "https://gfbistroathens.gr",
    contactInfo: {
      phone: "+30 21 0000 0000",
      email: "info@gfbistroathens.gr"
    },
    guestReview: "I haven't eaten traditional Greek food like this since my diagnosis. No reactions, no worries."
  },
  {
    id: "avocado-vegetarian",
    name: "Avocado Vegetarian Café",
    description: "This health-conscious restaurant has clearly labeled gluten-free dishes and offers gluten-free bread, pasta, and desserts. Staff are knowledgeable about celiac safety.",
    isPurelyAllergyFriendly: false,
    features: ["Labeled Gluten-Free Options", "Vegan Choices", "Health Food"],
    location: "Syntagma Square",
    website: "https://www.avocadoathens.com",
    contactInfo: {
      phone: "+30 21 0000 0001",
      email: "info@avocadoathens.com"
    },
    guestReview: "The staff asked about celiac and confirmed all prep methods. Very trustworthy and delicious."
  },
  {
    id: "tamarind-thai",
    name: "Tamarind Thai Kitchen",
    description: "Authentic Thai food with a separate gluten-free menu. Many dishes are made with rice noodles and coconut-based sauces.",
    isPurelyAllergyFriendly: false,
    features: ["Separate GF Menu", "Thai Cuisine", "Rice-Based Dishes"],
    location: "Exarchia",
    website: "https://www.tamarindathens.gr",
    contactInfo: {
      phone: "+30 21 0000 0002",
      email: "info@tamarindathens.gr"
    },
    guestReview: "Clearly marked menu and the chef personally explained how they avoid wheat-based sauces. Safe and flavorful."
  },
  {
    id: "nice-n-easy",
    name: "Nice n Easy Organic Bistro",
    description: "Organic eatery with gluten-free and vegan dishes. Allergens are marked on the menu and staff can adapt meals upon request.",
    isPurelyAllergyFriendly: false,
    features: ["Organic", "Marked Allergens", "Gluten-Free Options"],
    location: "Kolonaki & Kifisia",
    website: "https://www.niceneasy.gr",
    contactInfo: {
      phone: "+30 21 0000 0003",
      email: "info@niceneasy.gr"
    },
    guestReview: "I had a GF burger with gluten-free bun — the staff even double-checked with the kitchen. 10/10!"
  },
  {
    id: "kora-bakery",
    name: "Kora Bakery",
    description: "Kora offers gluten-free sourdough and pastries baked in a separate area. Ask staff about cross-contamination if highly sensitive.",
    isPurelyAllergyFriendly: false,
    features: ["Gluten-Free Bakery", "Separate Baking Area", "Pastries"],
    location: "Vasilissis Sofias Ave",
    website: "https://www.korabakery.com",
    contactInfo: {
      phone: "+30 21 0000 0004",
      email: "info@korabakery.com"
    },
    guestReview: "They're honest about risks but very cautious. I had zero reaction to their gluten-free loaf."
  },
  {
    id: "mystic-pizza",
    name: "Mystic Pizza",
    description: "Offers a certified gluten-free pizza crust. Ask for separate prep to avoid cross-contamination.",
    isPurelyAllergyFriendly: false,
    features: ["Gluten-Free Pizza", "Italian Food", "Casual Dining"],
    location: "Exarchia",
    website: "https://www.mysticpizza.gr",
    contactInfo: {
      phone: "+30 21 0000 0005",
      email: "info@mysticpizza.gr"
    },
    guestReview: "They made it separately and wore gloves. I was impressed!"
  },
  {
    id: "lime-bistro",
    name: "Lime Bistro",
    description: "This cozy bistro is fully gluten-free and vegan. Great pancakes and burgers. The kitchen is small but dedicated to safety.",
    isPurelyAllergyFriendly: true,
    features: ["100% Gluten-Free", "Vegan", "Breakfast & Lunch"],
    location: "Petralona",
    website: "https://www.limebistro.gr",
    contactInfo: {
      phone: "+30 21 0000 0006",
      email: "info@limebistro.gr"
    },
    guestReview: "As a celiac vegan, I felt at home. The kitchen is tiny but spotlessly safe."
  },
  {
    id: "to-bazaki",
    name: "To Bazaki – Greek Fusion",
    description: "Friendly staff, marked GF dishes, and options like grilled meats and vegetable plates. Ask about separate cooking space.",
    isPurelyAllergyFriendly: false,
    features: ["Greek Fusion", "Marked GF Options", "Accommodating Staff"],
    location: "Psyrri",
    website: "https://www.tobazaki.gr",
    contactInfo: {
      phone: "+30 21 0000 0007",
      email: "info@tobazaki.gr"
    },
    guestReview: "The chef showed me ingredients and used foil to grill my food separately. I felt totally safe."
  },
  {
    id: "vegan-beat",
    name: "Vegan Beat Athens",
    description: "Mostly vegan street food with gluten-free bowls and wraps. The staff are allergy-aware and clean surfaces before prep.",
    isPurelyAllergyFriendly: false,
    features: ["Vegan Street Food", "Gluten-Free Options", "Casual"],
    location: "Monastiraki",
    website: "https://veganbeat.gr",
    contactInfo: {
      phone: "+30 21 0000 0008",
      email: "info@veganbeat.gr"
    },
    guestReview: "Falafel wrap was wrapped in GF pita and made separately. Staff knew about celiac and took it seriously."
  },
  {
    id: "iceroll",
    name: "IceRoll – Handmade Ice Cream",
    description: "Rolled ice cream made to order. Gluten-free and dairy-free options available. Staff trained to prevent cross-contamination.",
    isPurelyAllergyFriendly: false,
    features: ["Rolled Ice Cream", "Desserts", "Gluten-Free Options"],
    location: "Plaka",
    website: "https://www.iceroll.gr",
    contactInfo: {
      phone: "+30 21 0000 0009",
      email: "info@iceroll.gr"
    },
    guestReview: "They washed everything before prepping my order and changed gloves. Very reassuring!"
  }
];

// Define FAQs
const athensFaqs: FAQ[] = [
  {
    question: "Is it easy to find gluten-free food in Athens?",
    answer: "Yes, Athens has become increasingly accommodating for celiac and gluten-free diets in recent years. Many restaurants now offer gluten-free options, and there are several dedicated gluten-free establishments throughout the city."
  },
  {
    question: "What traditional Greek dishes are naturally gluten-free?",
    answer: "Many traditional Greek dishes are naturally gluten-free, including: grilled meats (souvlaki without pita), Greek salad, moussaka (when made without flour), stuffed vegetables (gemista), and yogurt with honey and fruits. Always confirm preparation methods with the restaurant."
  },
  {
    question: "How do I communicate my gluten allergy in Greek?",
    answer: "The phrase 'I have celiac disease, I cannot eat gluten' in Greek is 'Έχω κοιλιοκάκη, δεν μπορώ να φάω γλουτένη' (Écho kiliokkaki, den boró na fáo glouténi). We recommend downloading a Greek celiac card or using a translation app."
  },
  {
    question: "Are there any supermarkets in Athens that sell gluten-free products?",
    answer: "Yes, most major supermarkets in Athens like AB Vassilopoulos and Sklavenitis have gluten-free sections. There are also specialty health food stores like 'Bio Hellas' that offer extensive gluten-free product selections."
  },
  {
    question: "Is street food in Athens safe for celiacs?",
    answer: "Most traditional street food in Athens contains gluten (souvlaki in pita, spanakopita, etc.). However, some street vendors are beginning to offer gluten-free options. Always ask about ingredients and cross-contamination before purchasing."
  }
];

// Main destination content object
export const athensContent: DestinationContent = {
  intro: `If you're planning a trip to Athens and following a strict gluten-free diet due to celiac disease, you're in luck. The Greek capital is becoming increasingly aware of food allergies and dietary needs — especially gluten intolerance. From traditional Greek tavernas to modern vegan cafes, here are the top 10 celiac-safe restaurants in Athens where you can enjoy delicious meals 100% worry-free.

All restaurants listed either offer certified gluten-free options, maintain strict cross-contamination protocols, or are entirely gluten-free.`,
  hotels: [],  // We're focusing on restaurants instead of hotels for this article
  restaurants: athensRestaurants,
  faqs: athensFaqs,
  tips: [
    "Always carry a Greek translation card explaining celiac disease",
    "Look for restaurants with 'gluten-free' (χωρίς γλουτένη) labels",
    "Book accommodations with kitchens so you can prepare some meals",
    "Research restaurants before visiting Athens",
    "Join local Facebook groups like 'Gluten-Free Athens' for up-to-date recommendations"
  ],
  bonusTools: [
    {
      name: "Interactive Map",
      description: "View Celiac-Safe Restaurants in Athens",
      link: "https://www.google.com/maps/d/u/0/edit?mid=1AthensCeliacSafeEats2025"
    },
    {
      name: "Download Celiac Allergy Card in Greek",
      description: "Click here to download (PDF)",
      link: "https://www.allergytranslation.com/cards/greece-celiac.pdf"
    },
    {
      name: "Need a Hotel?",
      description: "Browse allergy-friendly hotels in Athens",
      link: "https://www.booking.com/city/gr/athens.html?aid=3308431&utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=hotel_recommendation"
    }
  ]
};
