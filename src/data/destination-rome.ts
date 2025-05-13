
import { DestinationContent, Hotel, FAQ } from '@/types/definitions';

const romeHotels: Hotel[] = [
  {
    name: 'Hotel Artemide',
    features: [
      'Staff highly trained for dietary restrictions',
      'Special meal options for gluten intolerance',
      'Customized dining options available',
      'Allergy information collected at check-in'
    ],
    rating: 4,
    location: 'Rome, Italy',
    image: undefined,
    address: 'Via Nazionale, 22, 00184 Roma RM, Italy',
    description: 'Located in the heart of Rome, this luxury hotel ensures a comfortable and safe experience for guests with dietary restrictions.',
    quote: 'The staff was incredibly accommodating with my gluten intolerance. They provided special meal options tailored just for me.',
    bookingUrl: 'https://www.hotelartemide.it/',
    reviews: [
      {
        text: 'The staff was incredibly accommodating with my gluten intolerance. They provided special meal options tailored just for me.',
        author: 'Maria S.',
        rating: 5
      }
    ]
  },
  {
    name: 'Singer Palace Hotel Roma',
    features: [
      'Proactive allergy management',
      'Allergy screening during check-in',
      'Boutique hotel with personalized service',
      'Staff trained for food allergy awareness'
    ],
    rating: 5,
    location: 'Rome, Italy',
    image: undefined,
    address: 'Via Alessandro Specchi, 10, 00186 Roma RM, Italy',
    description: 'Highly rated for its attention to guest needs, this boutique hotel is a great option for those with food allergies.',
    quote: 'The restaurant staff asked me about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay.',
    bookingUrl: 'https://www.singerpalacehotel.com/',
    reviews: [
      {
        text: 'The restaurant staff asked me about my allergies at check-in and ensured I had a wonderful and safe dining experience throughout my stay.',
        author: 'David L.',
        rating: 5
      }
    ]
  },
  {
    name: 'Hotel Damaso',
    features: [
      'Chef consultations for allergies',
      'Centrally located near Piazza Navona',
      'Detailed menu ingredients available',
      'Safe dining options for allergies'
    ],
    rating: 4,
    location: 'Rome, Italy',
    image: undefined,
    address: 'Piazza della Cancelleria, 62, 00186 Roma RM, Italy',
    description: 'Centrally located near Piazza Navona, this hotel is a great pick for travelers wanting both convenience and allergy-conscious service.',
    quote: 'The chef personally explained every meal option to me, and I felt completely at ease dining here.',
    bookingUrl: 'https://www.hoteldamaso.com/',
    reviews: [
      {
        text: 'The chef personally explained every meal option to me, and I felt completely at ease dining here.',
        author: 'Sophie R.',
        rating: 5
      }
    ]
  },
  {
    name: 'Hotel Archimede',
    features: [
      'Specialized in nut allergy safety',
      'Located near Termini train station',
      'Accessible and convenient location',
      'Clear allergen labeling'
    ],
    rating: 3,
    location: 'Rome, Italy',
    image: undefined,
    address: 'Via dei Mille, 19, 00185 Roma RM, Italy',
    description: 'Located near the Termini train station, this hotel is praised for its accessibility and allergy-aware staff.',
    quote: 'As someone with nut allergies, I was reassured by how seriously they took my dietary needs. Highly recommended!',
    bookingUrl: 'https://www.hotelarchimederoma.com/',
    reviews: [
      {
        text: 'As someone with nut allergies, I was reassured by how seriously they took my dietary needs. Highly recommended!',
        author: 'Thomas B.',
        rating: 4
      }
    ]
  },
  {
    name: 'Relais Borgo Gentile',
    features: [
      'Gluten-free breakfast options',
      'Allergen-free meal preparation',
      'Peaceful countryside retreat',
      'Detailed ingredient information'
    ],
    rating: 4,
    location: 'Lazio countryside, near Rome, Italy',
    image: undefined,
    address: 'Via Quattro Camini, 00060 Sacrofano RM, Italy',
    description: 'Set in the scenic Lazio countryside, this retreat is ideal for guests who want a peaceful and allergy-friendly experience.',
    quote: 'From gluten-free breakfast options to special allergen-free meals, this place exceeded my expectations.',
    bookingUrl: 'https://www.relaisborgogentile.com/',
    reviews: [
      {
        text: 'From gluten-free breakfast options to special allergen-free meals, this place exceeded my expectations.',
        author: 'Anna M.',
        rating: 5
      }
    ]
  }
];

const romeFaqs: FAQ[] = [
  {
    question: "What should I do before traveling to Rome with food allergies?",
    answer: "Contact your hotels in advance to notify them about your allergies, carry Italian-language allergy translation cards, and research restaurants that can accommodate your dietary needs."
  },
  {
    question: "Are Italian restaurants familiar with food allergies?",
    answer: "Many restaurants in tourist areas are becoming more aware of food allergies, but it's always best to communicate clearly about your specific needs and carry translation cards to help with communication."
  },
  {
    question: "What common allergens should I look out for in Roman cuisine?",
    answer: "Many Italian dishes contain gluten (pasta, bread), dairy (cheese), and nuts (particularly pine nuts in pesto and desserts). Always ask about ingredients and inform restaurant staff of your allergies before ordering."
  },
  {
    question: "Should I bring emergency medication to Rome?",
    answer: "Yes, always carry antihistamines and an EpiPen if prescribed. While pharmacies are common in Rome, having your familiar medication on hand is important for emergencies."
  }
];

export const romeContent: DestinationContent = {
  hotels: romeHotels,
  faqs: romeFaqs,
  intro: "Rome, the Eternal City, is a dream destination for many travelers - but those with food allergies may worry about navigating Italian cuisine safely. Fortunately, many hotels in Rome now offer excellent accommodations for guests with dietary restrictions. From luxury establishments in the heart of the city to peaceful retreats in the countryside, Rome has options for every allergy-conscious traveler. Here are our top recommendations for allergy-friendly hotels in Rome, where you can enjoy your stay without compromising on safety or comfort.",
  languageTable: {
    headers: ["English", "Italian"],
    rows: [
      ["I have a food allergy", "Ho un'allergia alimentare"],
      ["I am allergic to gluten/wheat", "Sono allergico/a al glutine/frumento"],
      ["I am allergic to nuts", "Sono allergico/a alla frutta secca"],
      ["I am allergic to dairy", "Sono allergico/a ai latticini"],
      ["Is this food safe for me?", "Questo cibo è sicuro per me?"],
      ["Does this contain [allergen]?", "Contiene [allergen]?"],
      ["I need to see the ingredients", "Ho bisogno di vedere gli ingredienti"],
      ["This is my emergency medicine", "Questa è la mia medicina d'emergenza"]
    ]
  }
};
