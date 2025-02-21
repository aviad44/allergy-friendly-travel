
import { useState } from "react";
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

const hotels = [
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
];

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const navigate = useNavigate();

  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image with Gradient Overlay */}
      <div 
        className="h-[50vh] bg-cover bg-bottom relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl -mt-20 relative z-10">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
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
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <div className="text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              Paris is a dream destination, but for travelers with food allergies, choosing the right hotel is essential for a safe and stress-free stay. Below is a list of the best allergy-friendly hotels in Paris, featuring real guest reviews, detailed information, and direct booking links to ensure your comfort.
            </p>
          </div>

          {/* Hotels List */}
          <div className="space-y-6">
            {hotels.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </div>

          {/* Travel Tips */}
          <TravelTips />

          {/* Translation Table */}
          <div className="bg-muted rounded-xl p-6 mt-16">
            <h3 className="text-xl font-display font-bold mb-4">Essential Allergy-Related French Phrases</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">English</TableHead>
                    <TableHead className="w-1/3">French</TableHead>
                    <TableHead className="w-1/3">Pronunciation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">"I have a food allergy"</TableCell>
                    <TableCell className="italic">"J'ai une allergie alimentaire"</TableCell>
                    <TableCell className="text-muted-foreground">"Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">"Is this dish gluten-free?"</TableCell>
                    <TableCell className="italic">"Est-ce que ce plat est sans gluten?"</TableCell>
                    <TableCell className="text-muted-foreground">"Ess-kuh suh plah ay sahn gloo-tahn?"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">"Does this contain nuts?"</TableCell>
                    <TableCell className="italic">"Est-ce que ça contient des noix?"</TableCell>
                    <TableCell className="text-muted-foreground">"Ess-kuh sah kohn-tyahn day nwah?"</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
