
import { DestinationContent, Restaurant, FAQ, TravelTip } from '@/types/definitions';

// Define restaurants data
const athensRestaurants: Restaurant[] = [
  {
    id: "mystic-pizza",
    name: "Mystic Pizza",
    description: "Offers a certified gluten-free pizza crust. Ask for separate prep to avoid cross-contamination.",
    isPurelyAllergyFriendly: false,
    features: ["Gluten-Free Pizza", "Italian Food", "Casual Dining"],
    location: "Exarchia",
    website: "https://www.mysticpizza.gr",
    phone: "+30 21 0000 0005",
    email: "info@mysticpizza.gr",
    guestReview: "The person who helped us was very kind and helpful and made sure we knew what was vegan and what changes needed to be made to do so."
  },
  {
    id: "to-bazaki",
    name: "To Bazaki – Greek Fusion",
    description: "Friendly staff, marked GF dishes, and options like grilled meats and vegetable plates. Ask about separate cooking space.",
    isPurelyAllergyFriendly: false,
    features: ["Greek Fusion", "Marked GF Options", "Accommodating Staff"],
    location: "Psyrri",
    website: "https://www.tobazaki.gr",
    phone: "+30 21 0000 0007",
    email: "info@tobazaki.gr",
    guestReview: "They also have a great selection for brunch and lunch, including vegan, vegetarian, and keto-friendly options. I really appreciate how considerate they are of different dietary restrictions and preferences."
  },
  {
    id: "vegan-beat",
    name: "Vegan Beat Athens",
    description: "Mostly vegan street food with gluten-free bowls and wraps. The staff are allergy-aware and clean surfaces before prep.",
    isPurelyAllergyFriendly: false,
    features: ["Vegan Street Food", "Gluten-Free Options", "Casual"],
    location: "Monastiraki",
    website: "https://veganbeat.gr",
    phone: "+30 21 0000 0008",
    email: "info@veganbeat.gr",
    guestReview: "A cute little vegan spot in a very central location in Athens."
  },
  {
    id: "iceroll",
    name: "IceRoll – Handmade Ice Cream",
    description: "Rolled ice cream made to order. Gluten-free and dairy-free options available. Staff trained to prevent cross-contamination.",
    isPurelyAllergyFriendly: false,
    features: ["Rolled Ice Cream", "Desserts", "Gluten-Free Options"],
    location: "Plaka",
    website: "https://www.iceroll.gr",
    phone: "+30 21 0000 0009",
    email: "info@iceroll.gr",
    guestReview: "Watching the ice rolls being made was great fun and a real treat for the kids."
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

// Define travel tips as proper TravelTip objects
const athensTips: TravelTip[] = [
  {
    title: "Carry Translation Cards",
    content: "Always carry a Greek translation card explaining celiac disease"
  },
  {
    title: "Look for Labels",
    content: "Look for restaurants with 'gluten-free' (χωρίς γλουτένη) labels"
  },
  {
    title: "Book Kitchen-Equipped Accommodations",
    content: "Book accommodations with kitchens so you can prepare some meals"
  },
  {
    title: "Research in Advance",
    content: "Research restaurants before visiting Athens"
  },
  {
    title: "Join Local Groups",
    content: "Join local Facebook groups like 'Gluten-Free Athens' for up-to-date recommendations"
  }
];

// Main destination content object
export const athensContent: DestinationContent = {
  intro: `If you're planning a trip to Athens and following a strict gluten-free diet due to celiac disease, you're in luck. The Greek capital is becoming increasingly aware of food allergies and dietary needs — especially gluten intolerance. From traditional Greek tavernas to modern vegan cafes, here are the top 10 celiac-safe restaurants in Athens where you can enjoy delicious meals 100% worry-free.

All restaurants listed either offer certified gluten-free options, maintain strict cross-contamination protocols, or are entirely gluten-free.`,
  hotels: [],  // We're focusing on restaurants instead of hotels for this article
  restaurants: athensRestaurants,
  faqs: athensFaqs,
  tips: athensTips,
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
      link: "https://www.booking.com/city/gr/athens.html"
    }
  ]
};
