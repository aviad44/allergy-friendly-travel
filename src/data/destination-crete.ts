
import { DestinationContent } from '@/types/definitions';

export const creteContent: DestinationContent = {
  intro: "Experience the beauty of Crete without worrying about allergies with these allergy-conscious accommodations.",
  hotels: [
    {
      id: "blue-palace",
      name: "Blue Palace, a Luxury Collection Resort ★★★★★",
      address: "Plaka, Elounda, Crete 72053, Greece",
      location: "Elounda",
      stars: 5,
      features: [
        "⭐ 5-star luxury resort",
        "🍽️ Detailed allergen menus",
        "👨‍🍳 Special allergy-focused meal preparation"
      ],
      description: "Luxurious seafront resort with stunning views of Spinalonga Island. Their chefs are trained in preparing allergy-friendly meals and offer consultation for guests with dietary requirements.",
      quote: "The resort took my gluten allergy very seriously and prepared special meals with care and attention to detail.",
      bookingUrl: "https://www.marriott.com/hotels/travel/herak-blue-palace-a-luxury-collection-resort-and-spa-crete/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/76493476.jpg?k=3f69730363c8c2b7275039fc1448191c37098267330232e0faa8379f80ee2d78&o=&hp=1",
      rating: 4.8,
      allergenFriendly: ["Gluten-Free", "Dairy-Free"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Restaurant"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$$"
    },
    {
      id: "domes-noruz",
      name: "Domes Noruz Chania ★★★★★",
      address: "Strati Pantelaki 5, Agioi Apostoloi, Chania 73100, Greece",
      location: "Chania",
      stars: 5,
      features: [
        "⭐ 5-star adults-only resort",
        "🍽️ Personalized diet plans",
        "🏨 Allergen-free room options"
      ],
      description: "Adults-only beachfront lifestyle resort featuring wellness-focused amenities and allergy-conscious dining options, with staff trained on food allergen protocols.",
      quote: "The staff prepared a special dairy-free menu for me throughout my stay without compromising on flavor or variety.",
      bookingUrl: "https://www.domesnoruz.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/188380634.jpg?k=f16ebd17cf7d8a7b72224665d9b6836767f23ca680ec89d0474b320ded649e7c&o=&hp=1",
      rating: 4.7,
      allergenFriendly: ["Dairy-Free", "Gluten-Free"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Beach Access"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$$"
    },
    {
      id: "stella-island",
      name: "Stella Island Luxury Resort & Spa ★★★★★",
      address: "Analipsi, Hersonissos, Crete 70014, Greece",
      location: "Hersonissos",
      stars: 5,
      features: [
        "⭐ 5-star adults-only resort",
        "🍽️ Clear allergen labeling",
        "🌱 Extensive vegan and gluten-free options"
      ],
      description: "Adults-only overwater bungalow experience with an extensive cuisine selection that caters to various allergies and dietary needs, including celiac disease.",
      quote: "They had a dedicated gluten-free section at breakfast with fresh baked goods that were delicious!",
      bookingUrl: "https://www.stellaisland.gr/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/243816179.jpg?k=d93c84a4478bd47f950b615ea485b502f93d3a7904652445c01c9d314b9a91a7&o=&hp=1",
      rating: 4.9,
      allergenFriendly: ["Gluten-Free", "Vegan", "Celiac-Safe"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Restaurant"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$$"
    },
    {
      id: "grecotel-amirandes",
      name: "Grecotel Amirandes ★★★★★",
      address: "Gouves, Heraklion, Crete 70014, Greece",
      location: "Gouves",
      stars: 5,
      features: [
        "⭐ 5-star family-friendly resort",
        "🍽️ Dedicated allergen-free kitchens",
        "🧒 Children's allergy-friendly menus"
      ],
      description: "Beachfront luxury resort with spectacular views and multiple restaurants that offer comprehensive allergen-aware dining options and special children's menus for those with allergies.",
      quote: "My son has multiple food allergies and the chef personally prepared safe meals for him every day.",
      bookingUrl: "https://www.grecotel.com/crete/amirandes/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/266065269.jpg?k=bb69ddecf661a306203374885a36c3cc7eacc04c86c5f87d0349ae475fca0306&o=&hp=1",
      rating: 4.6,
      allergenFriendly: ["Multiple Allergen Options", "Kid-Friendly"],
      amenities: ["WiFi", "Swimming Pool", "Kids Club", "Multiple Restaurants"],
      isPurelyAllergyFriendly: false,
      priceRange: "$$$"
    }
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
