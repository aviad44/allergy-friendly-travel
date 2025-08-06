import { DestinationContent, Hotel, FAQ } from '@/types/definitions';

const hotels: Hotel[] = [
  {
    name: "Hotel Brunelleschi",
    features: [
      "Gluten-free certified by AIC",
      "Staff trained in allergy protocols",
      "Central historic location"
    ],
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/267064911.jpg?k=a08bb7f46dba23c5f115105b2a2f60ad2adfa62aef09f2358e8071297d4c504d&o=&hp=1",
    rating: 4.8,
    reviews: [
      {
        text: "They confirmed my nut and dairy allergies before check-in. Every morning I had a personalized, safe breakfast.",
        author: "Lior R., Israel",
        rating: 5
      }
    ],
    location: "Florence",
    address: "Piazza Santa Elisabetta, 3, 50122 Firenze FI, Italy",
    bookingUrl: "https://www.hotelbrunelleschi.it/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=tuscany",
    description: "A historic hotel in the center of Florence with exceptional allergy protocols and trained staff."
  },
  {
    name: "Agriturismo Le Cetinelle",
    features: [
      "Homemade allergy-safe food",
      "Kitchen modifications available",
      "Stunning rural views"
    ],
    rating: 4.7,
    reviews: [
      {
        text: "They removed peanut oil from the kitchen after I mentioned my allergy. Incredible service!",
        author: "Noam L., Israel",
        rating: 5
      }
    ],
    location: "Chianti Wine Country",
    address: "Str. delle Cetinelle, 53017 Radda in Chianti SI, Italy",
    bookingUrl: "https://www.lecetinelle.it/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=tuscany",
    description: "A beautiful agriturismo in the heart of Chianti offering personalized allergy accommodations."
  },
  {
    name: "Hotel Garden",
    features: [
      "Vegan and dairy-free menu options",
      "New gluten-free kids' menu (2025)",
      "Family-friendly accommodations"
    ],
    image: "https://www.gardenhotel.it/wp-content/uploads/2019/03/esterno-hotel-5.jpg",
    rating: 4.6,
    reviews: [
      {
        text: "I have celiac and lactose intolerance. They made me gluten-free pasta and were super friendly.",
        author: "Marta V., Spain",
        rating: 4.5
      }
    ],
    location: "Siena",
    address: "Via Custoza, 2, 53100 Siena SI, Italy",
    bookingUrl: "https://www.gardenhotel.it/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=tuscany",
    description: "A charming hotel in Siena with beautiful gardens and dedicated allergen-free dining options."
  },
  {
    name: "Hotel Ilaria",
    features: [
      "Allergy-aware breakfast",
      "Digital menu with allergen filters",
      "Central location in Lucca"
    ],
    image: "https://www.hotelilaria.com/wp-content/uploads/2017/07/hotel-ilaria-facciata.jpg",
    rating: 4.5,
    reviews: [
      {
        text: "They provided egg-free options and really listened to my needs.",
        author: "Alex S., UK",
        rating: 4.5
      }
    ],
    location: "Lucca",
    address: "Via del Fosso, 26, 55100 Lucca LU, Italy",
    bookingUrl: "https://www.hotelilaria.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=tuscany",
    description: "A boutique hotel in the heart of Lucca with modern amenities and allergy-conscious dining."
  }
];

const faqs: FAQ[] = [
  {
    question: "Are there many gluten-free options in Tuscany?",
    answer: "Yes, Italy is very celiac-aware. Many restaurants in Tuscany offer certified gluten-free options, especially in Florence and Siena. The Italian Celiac Association (AIC) certifies restaurants, making them easy to identify."
  },
  {
    question: "How should I communicate my food allergies in Tuscany?",
    answer: "We recommend downloading an Italian allergy translation card or using our free allergy translation tool to create custom cards. Mention your allergies when making reservations and remind staff when you arrive."
  },
  {
    question: "What are the best allergy-friendly restaurants in Florence?",
    answer: "Ciro & Sons is certified gluten-free and handles multiple allergies well. Gelateria Edoardo offers vegan and nut-free gelato with separate utensils. La Cucina del Ghianda can accommodate soy and gluten allergies with advance notice."
  },
  {
    question: "Can I visit wineries in Tuscany with food allergies?",
    answer: "Yes, many Chianti region wineries can accommodate allergies. Always call ahead, as some wine may contain traces of allergens like egg whites or milk proteins used in the fining process."
  },
  {
    question: "Are allergy-friendly restaurants more expensive in Tuscany?",
    answer: "Not necessarily. While some high-end restaurants like Michelin-starred Cum Quibus in San Gimignano may charge more, many affordable trattorias and gelaterias throughout Tuscany can accommodate allergies at standard prices."
  }
];

export const tuscanyContent: DestinationContent = {
  intro: [
    "Tuscany is a food lover's paradise, and with proper planning, it can be enjoyed safely by travelers with dietary restrictions. This updated 6-day itinerary covers Florence, Chianti, Siena, Lucca, Pisa, and San Gimignano — with allergy-friendly accommodation and dining options throughout.",
    "From gluten-free certified restaurants to hotels with dedicated allergy protocols, our guide helps you navigate Tuscany's culinary landscape with confidence. We've also included recent guest reviews from travelers with various food allergies to help you plan your perfect Italian getaway."
  ],
  hotels,
  faqs,
  languageTable: {
    headers: ["English", "Italian", "Pronunciation"],
    rows: [
      ["I have a food allergy", "Ho un'allergia alimentare", "Oh oon ah-lair-jee-ah ah-lee-men-tah-ray"],
      ["I cannot eat gluten", "Non posso mangiare glutine", "Non pos-so man-jar-eh gloo-tee-nay"],
      ["I am allergic to nuts", "Sono allergico alle noci", "So-no al-lair-jee-ko al-lay no-chee"],
      ["I have celiac disease", "Ho la celiachia", "Oh la chay-lee-ah-kee-ah"],
      ["Does this contain dairy?", "Contiene lattosio?", "Con-tee-eh-nay lat-toh-see-oh"]
    ]
  }
};
