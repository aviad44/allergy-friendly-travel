import { DestinationContent } from '@/types/definitions';

export const warmWinterContent: DestinationContent = {
  title: "Warm Winter & Christmas Getaways for Food-Allergic Travelers",
  metaTitle: "Warm Winter Destinations for Food Allergy Travelers | Allergy-Friendly Holidays 2025",
  metaDescription: "Discover the best warm winter and Christmas destinations for food-allergic travelers. Verified allergy-friendly hotels and restaurants in Madeira, Hurghada, Canary Islands, and Israel.",
  intro: "For travelers with food allergies, escaping the cold doesn't mean compromising safety or flavor. These warm winter and Christmas destinations offer sunshine, sea, and allergy-conscious hospitality, allowing you to relax and enjoy every bite. Only destinations and venues with verified positive feedback for allergy handling are listed — and every hotel and restaurant includes a direct official website link.",
  regionDescriptions: {
    madeira: `
      <h2>Madeira, Portugal — Atlantic Island Sun & Allergy-Aware Hotels</h2>
      <p>Madeira offers a perfect winter climate and warm hospitality. With a rising number of allergy-conscious accommodations and local cuisine emphasizing fresh, simple ingredients, it's a great option for gluten-free, dairy-free, or nut-sensitive travelers.</p>
    `,
    hurghada: `
      <h2>Hurghada, Egypt — Red Sea Coast & Resort Comfort</h2>
      <p>Hurghada is a reliable warm weather destination with modern resorts, many of which have experience in handling food sensitivities for international guests. Dining staff in high-end hotels are usually briefed on allergy safety.</p>
    `,
    canary: `
      <h2>Canary Islands, Spain — Warm Spanish Island Escape</h2>
      <p>The Canary Islands combine winter warmth with Spanish hospitality. Many upscale resorts and local restaurants provide allergen labeling or allow customization.</p>
    `,
    israel: `
      <h2>Israel — Coastal Winter Sun & Allergy-Friendly Food Scene</h2>
      <p>From Tel Aviv's cosmopolitan beaches to Eilat's desert warmth, Israel offers diverse scenery and a thriving culinary scene that embraces dietary needs. Many restaurants offer gluten-free, dairy-free, vegan, and nut-aware meals — often with staff trained to handle special requests.</p>
    `
  },
  longDescription: '',
  hotels: [
    // Eilat Hotels
    {
      id: "dan-eilat",
      name: "Dan Eilat Hotel",
      location: "Eilat, Israel",
      address: "North Beach, Eilat, Israel",
      features: [
        "Luxury beachfront resort",
        "All-inclusive options",
        "Comprehensive allergy protocols",
        "Multiple restaurants",
        "Red Sea views"
      ],
      description: "Premier Red Sea resort with extensive allergy protocols and diverse dining options for all dietary needs.",
      quote: "I have some food allergies and the restaurant staff were always eager to help, especially Michael and David were very kind, patient and helpful.",
      bookingUrl: "https://www.danhotels.com/eilathotels/daneilathotel?utm_source=Allergy-free-travel.com&utm_medium=article&utm_campaign=warm_winter",
      allergenFriendly: ["Comprehensive Protocols", "All-Inclusive Safe"],
      amenities: ["WiFi", "Beach", "Pool", "Spa", "Multiple Restaurants"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
  ],
  restaurants: [
    // Tel Aviv Restaurants
    {
      name: "Anastasia Cafe",
      address: "54 Frishman Street, Tel Aviv, Israel",
      description: "100% vegan cafe with extensive allergy awareness. Popular for gluten-free and nut-free options in a trendy Tel Aviv setting.",
      guestReview: "The menu is completely vegan and also offers gluten free options.",
      allergyInfo: "Vegan, Gluten-Free, Nut-Free Options",
      websiteUrl: "https://www.facebook.com/AnastasiaTelaviv/",
      isPurelyAllergyFriendly: true
    },
    {
      name: "Gluteria",
      address: "2 Mohiliver Street, Tel Aviv, Israel",
      description: "Dedicated gluten-free bakery and cafe. 100% gluten-free facility, perfect for celiacs and gluten-sensitive travelers.",
      guestReview: "They have so many options and is a true haven for people who are gluten free.",
      allergyInfo: "100% Gluten-Free Facility",
      websiteUrl: "https://www.gluteria.co.il/",
      isPurelyAllergyFriendly: true
    },
  ],
  travelTips: [
    {
      title: "Contact in Advance",
      description: "Contact the hotel and restaurant in advance to confirm your allergy needs. Most establishments appreciate advance notice to prepare properly."
    },
    {
      title: "Speak with Staff",
      description: "Speak with the chef or dining manager upon arrival. Direct communication ensures your specific requirements are clearly understood."
    },
    {
      title: "Carry Allergy Cards",
      description: "Carry allergy cards translated into the local language. This is especially helpful in Egypt, Spain, and Portugal where English may be limited in some venues."
    }
  ],
  faqs: [
    {
      question: "Which warm winter destination is best for food allergies?",
      answer: "Israel, particularly Tel Aviv, offers the most developed allergy-friendly dining scene with many dedicated gluten-free and vegan establishments. However, all destinations listed have verified allergy-aware hotels and restaurants."
    },
    {
      question: "Are all-inclusive resorts safe for food allergies?",
      answer: "Many all-inclusive resorts in Hurghada and Eilat have excellent allergy protocols. Always contact the hotel in advance and speak with the dining manager upon arrival to ensure your needs are documented."
    },
    {
      question: "How can I communicate allergies in these destinations?",
      answer: "Carry translated allergy cards in Portuguese (Madeira), Arabic (Egypt), Spanish (Canary Islands), and Hebrew (Israel). Many hotels have English-speaking staff, but allergy cards provide an extra layer of safety."
    },
    {
      question: "What types of allergies are best accommodated?",
      answer: "Gluten-free and dairy-free options are widely available across all destinations. Nut allergies are well understood in Israel and Europe. Always verify specific allergen protocols with each establishment."
    },
    {
      question: "Is it safe to travel with severe allergies to these destinations?",
      answer: "Yes, with proper preparation. All listed hotels and restaurants have verified positive feedback for allergy handling. Carry your medication, communicate clearly, and consider booking hotels with 24-hour medical access."
    }
  ],
  languageTable: {
    headers: ["English", "Portuguese", "Arabic", "Spanish", "Hebrew"],
    rows: [
      ["I have a food allergy", "Tenho alergia alimentar", "عندي حساسية طعام", "Tengo alergia alimentaria", "יש לי אלרגיה למזון"],
      ["Gluten-free please", "Sem glúten, por favor", "بدون غلوتين من فضلك", "Sin gluten, por favor", "בלי גלוטן, בבקשה"],
      ["No nuts", "Sem nozes", "بدون مكسرات", "Sin frutos secos", "בלי אגוזים"],
      ["Dairy-free", "Sem laticínios", "بدون منتجات الألبان", "Sin lácteos", "בלי חלב"],
      ["Is this safe for me?", "Isto é seguro para mim?", "هل هذا آمن لي؟", "¿Es seguro para mí?", "?זה בטוח בשבילי"],
      ["Emergency", "Emergência", "طوارئ", "Emergencia", "חירום"]
    ]
  }
};
