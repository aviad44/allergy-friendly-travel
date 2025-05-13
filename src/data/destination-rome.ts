
import { DestinationContent } from '@/types/definitions';

export const romeContent: DestinationContent = {
  intro: "Discover Rome's most accommodating hotels for travelers with food allergies and dietary restrictions. From gluten-free breakfast options to dedicated allergy-aware kitchens, these hotels ensure a safe and enjoyable stay in the Eternal City.",
  hotels: [
    {
      name: "Hotel Artemide",
      address: "Via Nazionale, 22, 00184 Roma RM, Italy",
      features: [
        "⭐ 4-star luxury accommodation",
        "🍽️ Specialized allergy menus",
        "👨‍🍳 Staff trained in allergy awareness"
      ],
      description: "Located in the heart of Rome, this luxury hotel ensures a safe experience for guests with dietary restrictions.",
      quote: "The staff was incredibly accommodating with my gluten intolerance. They provided special meal options tailored just for me.",
      author: "Sarah L.",
      rating: 4.8,
      bookingUrl: "https://www.hotelartemide.it/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/153715169.jpg?k=b5e897619e4c21c3e34c692731ae0e1e06b5a7790760c9db69f71d61444dc9c6&o=&hp=1",
      location: "City Center"
    },
    {
      name: "Singer Palace Hotel Roma",
      address: "Via Alessandro Specchi, 10, 00186 Roma RM, Italy",
      features: [
        "⭐ 5-star boutique hotel",
        "🍽️ Personalized dietary accommodation",
        "🥐 Gluten-free breakfast options"
      ],
      description: "This boutique hotel is highly rated for its attention to guest needs.",
      quote: "The restaurant staff asked me about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay.",
      author: "Michael T.",
      rating: 4.9,
      bookingUrl: "https://www.singerpalacehotel.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287246400.jpg?k=cf56e30c9523ced9876d2c8348bd3b2e68329545781f9133d968b923e1f30075&o=&hp=1",
      location: "Historic Center"
    },
    {
      name: "Hotel Damaso",
      address: "Piazza della Cancelleria, 62, 00186 Roma RM, Italy",
      features: [
        "⭐ 3-star hotel with rooftop terrace",
        "🍽️ Allergen-free menu options",
        "🗣️ Multi-lingual allergy cards available"
      ],
      description: "Near Piazza Navona, a convenient and allergy-conscious choice.",
      quote: "The chef personally explained every meal option to me, and I felt completely at ease dining here.",
      author: "Emma R.",
      rating: 4.6,
      bookingUrl: "https://www.hoteldamaso.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/149068523.jpg?k=c98b7b744991e91a3f24e235c072ddbb3ab2d027742aecbd0b44d11bcbbcc0d7&o=&hp=1",
      location: "Near Piazza Navona"
    },
    {
      name: "Hotel Archimede",
      address: "Via dei Mille, 19, 00185 Roma RM, Italy",
      features: [
        "⭐ 3-star hotel near Termini",
        "🥜 Nut-free environment available",
        "📝 Allergy documentation upon request"
      ],
      description: "Close to Termini station with allergy-aware staff.",
      quote: "As someone with nut allergies, I was reassured by how seriously they took my dietary needs. Highly recommended!",
      author: "David K.",
      rating: 4.3,
      bookingUrl: "https://www.hotelarchimederoma.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/16472585.jpg?k=e7c8e89f92c15fce001ee66757042e1c4143a569347e219320af769bf5406f35&o=&hp=1",
      location: "Near Termini Station"
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
      quote: "From gluten-free breakfast options to special allergen-free meals, this place exceeded my expectations.",
      author: "Jennifer P.",
      rating: 4.7,
      bookingUrl: "https://www.relaisborgogentile.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/117472948.jpg?k=fa0a7a330d951df245bea9ce270b8cab8e0cf347df4c21d5848d5f38ce39a138&o=&hp=1",
      location: "Countryside"
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
