

import { DestinationContent } from '@/types/definitions';

export const romeContent: DestinationContent = {
  intro: "Discover Rome's most accommodating hotels for travelers with food allergies and dietary restrictions. From gluten-free breakfast options to dedicated allergy-aware kitchens, these hotels ensure a safe and enjoyable stay in the Eternal City.",
  hotels: [
    {
      name: "Singer Palace Hotel Roma",
      address: "Via Alessandro Specchi, 10, 00186 Roma RM, Italy",
      features: [
        "⭐ 5-star boutique hotel",
        "🍽️ Personalized dietary accommodation",
        "🥐 Gluten-free breakfast options"
      ],
      description: "This boutique hotel is highly rated for its attention to guest needs.",
      quote: "The breakfast is excellent with a wide selection of items to choose from, to include gluten free options.",
      rating: 4.9,
      bookingUrl: "https://www.singerpalacehotel.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=rome",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287246400.jpg?k=cf56e30c9523ced9876d2c8348bd3b2e68329545781f9133d968b923e1f30075&o=&hp=1",
      location: "Historic Center",
    },
    {
      name: "Relais Borgo Gentile",
      address: "Via Borgo Gentile, 10, 00060 Formello RM, Italy",
      features: [
        "⭐ 4-star countryside retreat",
        "🌿 Farm-to-table with allergen controls",
        "🍇 Organic, allergy-safe ingredients"
      ],
      description: "A peaceful countryside retreat with excellent allergy-friendly service.",
      quote: "The staff are incredibly accommodating, friendly and accommodating. The entire stay is completely gluten free, and although my husband and I are not gluten intolerant, we had some of the best food of our life here.",
      rating: 4.7,
      bookingUrl: "https://www.relaisborgogentile.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=rome",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/117472948.jpg?k=fa0a7a330d951df245bea9ce270b8cab8e0cf347df4c21d5848d5f38ce39a138&o=&hp=1",
      location: "Countryside",
    }
  ],
  faqs: [
    {
      question: "How do Rome hotels handle food allergies?",
      answer: "Many Rome hotels now provide specialized allergy menus, separate preparation areas, and staff trained in allergen awareness. It's recommended to contact the hotel before arrival to discuss specific needs."
    },
    {
      question: "Can I find gluten-free options in Rome hotels?",
      answer: "Yes, most quality hotels in Rome offer gluten-free breakfast options and can accommodate celiac disease with dedicated preparation areas to avoid cross-contamination."
    },
    {
      question: "What should I tell my Rome hotel about my allergies?",
      answer: "Contact your hotel 1-2 weeks before arrival with specific details about your food allergies, severity level, and any cross-contamination concerns. Request written confirmation of accommodations."
    },
    {
      question: "Are Rome hotel staff trained in handling food allergies?",
      answer: "Higher-end hotels in Rome increasingly provide allergy training to their staff. Look for hotels that specifically mention food allergy protocols in their descriptions or services."
    }
  ],
  languageTable: {
    headers: ["English", "Italian"],
    rows: [
      ["I have a food allergy", "Ho un'allergia alimentare"],
      ["I cannot eat...", "Non posso mangiare..."],
      ["Gluten-free", "Senza glutine"],
      ["Dairy-free", "Senza lattosio"],
      ["Nut-free", "Senza frutta secca"],
      ["Is this safe for me to eat?", "È sicuro per me mangiare questo?"],
      ["Does this contain...?", "Questo contiene...?"],
      ["I need a doctor", "Ho bisogno di un medico"]
    ]
  }
};

