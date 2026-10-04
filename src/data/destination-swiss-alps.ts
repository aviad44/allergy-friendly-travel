
import { DestinationContent } from '@/types/definitions';

// Console log for debugging this module's initialization
console.log("Loading destination-swiss-alps.ts module");

export const swissAlpsContent: DestinationContent = {
  intro: "Experience the majestic Swiss Alps with peace of mind, offering allergy-aware accommodations across stunning mountain regions.",
  hotels: [
    {
      name: "Giardino Mountain",
      address: "Via dal Bagn 54, 7513 Silvaplana-Champfèr, Switzerland",
      features: [
        "⭐ 5-star wellness hotel",
        "🥣 Lactose/gluten/nut-free meals",
        "💧 Allergy-friendly family spa"
      ],
      description: "A design wellness hotel in Engadin Valley offering pre-arrival allergy coordination.",
      quote: "From the moment we arrived, the staff were exceptionally friendly and went above and beyond to accommodate our dietary requirements, ensuring every meal was perfect.",
      bookingUrl: "https://www.giardinohotels.ch/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296012790.jpg?k=551b3b7d69da4713fcab249c13a3cc8a85df65cd89a23870ec402157b1e72c19&o=&hp=1",
      rating: 4.7,
      location: "Engadin Valley"
    },
    {
      name: "Hotel Silberhorn",
      address: "Höheweg 73, 3800 Interlaken, Switzerland",
      features: [
        "⭐ 4-star chalet-style hotel",
        "🧼 Staff trained on cross-contamination",
        "🌄 Surrounded by waterfalls and trails"
      ],
      description: "A chalet-style mountain hotel great for nature lovers and allergy-conscious hikers.",
      quote: "The options were quite average with a very limited selection, and there was virtually nothing tailored for vegetarians. It would be a huge upgrade if management included at least one proper vegetarian/vegan hot dish in the spread.",
      bookingUrl: "https://www.silberhorn.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/39615603.jpg?k=89d8d3e11e91750c5aee682a643ebcfbcc7f971b122366bf72e89bb01a0f7420&o=&hp=1",
      rating: 4.4,
      location: "Lauterbrunnen Valley"
    }
  ],
  faqs: [
    {
      question: "How do Swiss Alpine hotels handle food allergies?",
      answer: "Many Swiss hotels offer personalized meal planning, separate cooking areas, and staff trained in cross-contamination prevention."
    },
    {
      question: "Are mountain accommodations safe for allergy sufferers?",
      answer: "Yes, many Alpine hotels now provide hypoallergenic rooms, HEPA air filters, and detailed allergy management protocols."
    },
    {
      question: "Can I find self-catering options for severe allergies?",
      answer: "Absolutely. Many chalets and Airbnbs like Haus Andorra and Chesa Plattner offer allergy-safe kitchens with separate utensils and fragrance-free cleaning."
    },
    {
      question: "What should I tell hotels in advance about my allergies?",
      answer: "Contact them 1-2 weeks before arrival with specific details about your allergies, necessary precautions, and any medical requirements."
    }
  ],
  languageTable: {
    headers: ["English", "German", "French"],
    rows: [
      ["I have a food allergy", "Ich habe eine Lebensmittelallergie", "J'ai une allergie alimentaire"],
      ["Gluten-free", "Glutenfrei", "Sans gluten"],
      ["Dairy-free", "Milchfrei", "Sans lactose"],
      ["Nut-free", "Nussfrei", "Sans noix"],
      ["Is this safe for me to eat?", "Ist das für mich sicher zu essen?", "Est-ce que je peux manger ceci en toute sécurité?"]
    ]
  }
};

// Log Swiss Alps content after initialization to verify data structure
console.log("Swiss Alps content initialized:", swissAlpsContent);
