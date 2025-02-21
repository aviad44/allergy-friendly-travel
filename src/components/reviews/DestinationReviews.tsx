import { useState, useEffect } from "react";
import { Home, Globe, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainMenu } from "@/components/MainMenu";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LanguageCode, languages, destinations, DestinationId } from "@/types/reviews";

interface DestinationPageProps {
  destinationId: DestinationId;
}

const destinationData = {
  paris: {
    hotels: [
      {
        name: "1. Le Meurice – Luxury & Personalized Allergy-Friendly Service",
        address: "1 Rue de Rivoli, 75001 Paris, France",
        features: ["⭐ 5-star hotel", "🏛️ Central location near the Louvre", "🍽️ Allergy-aware fine dining"],
        description: "Le Meurice is one of Paris's most iconic luxury hotels, offering personalized allergy-friendly service. The in-house Michelin-starred restaurant, led by chef Alain Ducasse, accommodates special dietary needs with great attention to detail.",
        quote: "Le Meurice is by far the nicest hotel I've ever stayed at—the fanciest and kindest staff! Absolutely recommend to anyone staying in Paris. The staff goes above and beyond!",
        bookingUrl: "https://www.booking.com/hotel/fr/le-meurice.en.html"
      },
      {
        name: "2. Hotel Novotel Paris les Halles – Central Location & Allergy-Sensitive Dining",
        address: "8 Place Marguerite de Navarre, 75001 Paris, France",
        features: ["⭐ 4-star hotel", "🚇 Near Châtelet-Les Halles station", "🏙️ Walkable to Louvre & Notre-Dame"],
        quote: "Staff was very helpful in making inquiries at local restaurants regarding food allergy management. It was reassuring to know they understood my dietary restrictions!",
        bookingUrl: "https://www.booking.com/hotel/fr/novotel-paris-les-halles.en.html"
      },
      {
        name: "3. Hôtel Edouard 7 – Boutique Hotel with Personalized Allergy Support",
        address: "39 Avenue de l'Opéra, 75002 Paris, France",
        features: ["⭐ 4-star hotel", "🎭 Near Opéra Garnier", "🏛️ Short walk to Place Vendôme"],
        quote: "They went above and beyond—even bought a large mini refrigerator for our room and went to the market for us, texting me photos of labels and using only those safe foods to cook for us!",
        bookingUrl: "https://www.booking.com/hotel/fr/edouard-7-paris-opera.en.html"
      },
      {
        name: "4. Le Bristol Paris – A Five-Star Experience for Allergy-Conscious Travelers",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        features: ["⭐ 5-star hotel", "💎 Luxury shopping district", "🏊 Rooftop pool & Michelin-star dining"],
        description: "Le Bristol Paris is one of the finest hotels in Paris, with hypoallergenic rooms and an award-winning restaurant, Epicure, that accommodates all dietary needs.",
        bookingUrl: "https://www.booking.com/hotel/fr/le-bristol-paris.en.html"
      },
      {
        name: "5. Hotel Malte Astotel – Budget-Friendly & Allergy-Safe Comfort",
        address: "63 Rue de Richelieu, 75002 Paris, France",
        features: ["⭐ 4-star hotel", "🏙️ Close to the Louvre", "🍽️ Allergy-friendly breakfast"],
        quote: "I can't thank the staff at Hotel Malte enough for their sensitivity towards my allergies. They made sure my breakfast was completely safe for me, and I felt much more comfortable knowing they understood my needs.",
        bookingUrl: "https://www.booking.com/hotel/fr/malte-opera-astotel.en.html"
      }
    ],
    languageTable: {
      headers: ["English", "French", "Pronunciation"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "J'ai une allergie alimentaire",
          pronunciation: "Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"
        },
        {
          original: "Is this dish gluten-free?",
          translation: "Est-ce que ce plat est sans gluten?",
          pronunciation: "Ess-kuh suh plah ay sahn gloo-tahn?"
        },
        {
          original: "Does this contain nuts?",
          translation: "Est-ce que ça contient des noix?",
          pronunciation: "Ess-kuh sah kohn-tyahn day nwah?"
        }
      ]
    },
    intro: "Paris is a dream destination, but for travelers with food allergies, choosing the right hotel is essential for a safe and stress-free stay. Below is a list of the best allergy-friendly hotels in Paris, featuring real guest reviews, detailed information, and direct booking links to ensure your comfort."
  },
  london: {
    hotels: [
      {
        name: "1. The Langham London – Premier Allergy-Conscious Luxury",
        address: "1C Portland Place, Westminster, London W1B 1JA",
        features: ["⭐ 5-star luxury", "🍽️ Dedicated allergen menus", "🏰 Historic property"],
        description: "The Langham sets the standard for allergy-conscious luxury hotels in London. Their Roux at The Landau restaurant offers detailed allergen menus and their staff receives specialized training in handling dietary requirements.",
        quote: "The attention to detail regarding my food allergies was exceptional. The chef personally came to discuss my dietary needs!",
        bookingUrl: "https://www.booking.com/hotel/gb/langham.en.html"
      },
      {
        name: "2. Park Plaza Westminster Bridge – Central Location & Allergy-Friendly Dining",
        address: "200 Westminster Bridge Road, London SE1 7UT",
        features: ["⭐ 4-star hotel", "🎡 Near London Eye", "🏛️ Views of Parliament"],
        description: "Perfectly located with views of Big Ben, this hotel offers comprehensive allergen information and dedicated gluten-free options in all their restaurants.",
        quote: "They took my allergies very seriously and even had a separate preparation area for gluten-free meals.",
        bookingUrl: "https://www.booking.com/hotel/gb/park-plaza-westminster-bridge-london.en.html"
      },
      {
        name: "3. The Montcalm Royal London House",
        address: "22-25 Finsbury Square, London EC2A 1DX",
        features: ["⭐ 5-star boutique", "🌟 Modern luxury", "🍽️ Allergy-trained chefs"],
        description: "A contemporary luxury hotel that excels in accommodating dietary restrictions. Their kitchen staff is specifically trained in allergy awareness and cross-contamination prevention.",
        quote: "As someone with celiac disease, I felt completely safe dining here. The staff was knowledgeable and attentive.",
        bookingUrl: "https://www.booking.com/hotel/gb/the-montcalm-royal-london-house.en.html"
      },
      {
        name: "4. Novotel London Bridge – Family-Friendly & Allergy-Aware",
        address: "53-61 Southwark Bridge Road, London SE1 9HH",
        features: ["⭐ 4-star hotel", "👨‍👩‍👧‍👦 Family-friendly", "🏙️ Central location"],
        quote: "Perfect for families with allergies! They had plenty of safe options for my children and were very accommodating.",
        bookingUrl: "https://www.booking.com/hotel/gb/novotel-london-bridge.en.html"
      },
      {
        name: "5. CitizenM Tower of London – Modern & Allergen-Conscious",
        address: "40 Trinity Square, London EC3N 4DJ",
        features: ["⭐ 4-star hotel", "🏰 Tower views", "💻 Tech-savvy"],
        description: "A modern hotel offering clear allergen information and flexible dining options. Their innovative approach extends to dietary requirements with comprehensive digital menus.",
        quote: "They made managing my allergies so easy with their clear labeling system and helpful staff!",
        bookingUrl: "https://www.booking.com/hotel/gb/citizenm-tower-of-london.en.html"
      }
    ],
    languageTable: {
      headers: ["Common Phrase", "How to Say It", "When to Use"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "I have a severe allergy to [allergen]",
          pronunciation: "Be specific about your allergen"
        },
        {
          original: "Is this gluten-free?",
          translation: "Does this contain any gluten?",
          pronunciation: "When checking menu items"
        },
        {
          original: "Cross-contamination",
          translation: "Please ensure no cross-contamination",
          pronunciation: "When ordering at restaurants"
        }
      ]
    },
    intro: "London's diverse culinary scene can be navigated safely with the right preparation. These hotels understand the importance of catering to guests with food allergies and provide excellent accommodations and dining options. From luxury establishments to modern boutique hotels, here are London's top allergy-friendly places to stay."
  }
};

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const navigate = useNavigate();

  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId as keyof typeof destinationData];

  useEffect(() => {
    if (destination) {
      document.title = `Allergy-Friendly Hotels in ${destination.name} | Safe Travel Guide`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Find the best allergy-friendly hotels in ${destination.name}. Comprehensive guide with reviews, safe dining options, and essential tips for travelers with food allergies.`
        );
      }

      const schema = {
        "@context": "https://schema.org",
        "@type": "TravelGuide",
        "name": `Allergy-Friendly Hotels Guide - ${destination.name}`,
        "description": `Complete guide to allergy-friendly accommodations in ${destination.name}, including luxury and budget-friendly options.`,
        "about": {
          "@type": "TouristDestination",
          "name": destination.name,
          "description": destination.description
        }
      };

      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schema);
      document.head.appendChild(scriptTag);

      return () => {
        document.head.removeChild(scriptTag);
      };
    }
  }, [destination]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image with Gradient Overlay */}
      <div 
        className="h-[50vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80)`,
          backgroundPosition: '50% 65%'
        }}
        role="img"
        aria-label={`Scenic view of ${destination.name}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl -mt-20 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8" aria-label="Main navigation">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/destinations')} className="bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Button>
            <Link to="/">
              <Button variant="ghost" className="bg-background/80 backdrop-blur-sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-background/80 backdrop-blur-sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {languages.find(lang => lang.code === currentLanguage)?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setCurrentLanguage(language.code)}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <MainMenu />
          </div>
        </nav>

        {/* Main Content */}
        <article className="space-y-12">
          <header className="text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              {content.intro}
            </p>
          </header>

          {/* Hotels List */}
          <section aria-label="Hotels List" className="space-y-6">
            {content.hotels.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </section>

          {/* Travel Tips */}
          <TravelTips />

          {/* Language Tips Table */}
          <section aria-label={`${destination.name} Language Tips`} className="bg-muted rounded-xl p-6 mt-16">
            <h3 className="text-xl font-display font-bold mb-4">Essential Phrases for Travelers with Allergies</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {content.languageTable.headers.map((header, index) => (
                      <TableHead key={index} className="w-1/3">{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.languageTable.rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.original}</TableCell>
                      <TableCell className="italic">{row.translation}</TableCell>
                      <TableCell className="text-muted-foreground">{row.pronunciation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
