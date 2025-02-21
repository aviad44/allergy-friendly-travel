
import { useState } from "react";
import { Home, Globe, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainMenu } from "@/components/MainMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LanguageCode, languages, destinations, DestinationId } from "@/types/reviews";
import { translations } from "@/pages/translations";

interface DestinationPageProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const navigate = useNavigate();

  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const textAlignment = isRTL ? 'text-right' : 'text-left';

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div 
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80)`
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/destinations')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Button>
            <Link to="/">
              <Button variant="ghost">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
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
        <div className={`space-y-12 ${textAlignment}`}>
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              {destination.description}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
          </div>

          {/* Hotel Information */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground">
              Paris is a dream destination, but for travelers with food allergies, choosing the right hotel is essential for a safe and stress-free stay. Our curated list features the best allergy-friendly hotels, complete with real guest reviews and detailed information to ensure your comfort.
            </p>

            <div className="mt-8 space-y-12">
              {/* Le Meurice */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-display font-bold mb-4">1. Le Meurice – Luxury & Personalized Allergy-Friendly Service</h3>
                <p className="mb-2"><strong>📍 Address:</strong> 1 Rue de Rivoli, 75001 Paris, France</p>
                <p className="mb-4"><strong>⭐ 5-star hotel</strong> | 🏛️ Central location near the Louvre | 🍽️ Allergy-aware fine dining</p>
                <p className="mb-4">Le Meurice is one of Paris's most iconic luxury hotels, offering personalized allergy-friendly service. The in-house Michelin-starred restaurant, led by chef Alain Ducasse, accommodates special dietary needs with great attention to detail.</p>
                <Button asChild>
                  <a href="https://www.booking.com/hotel/fr/le-meurice.en.html" target="_blank" rel="noopener noreferrer">
                    Book Le Meurice
                  </a>
                </Button>
              </div>

              {/* Translation Table */}
              <div className="bg-muted rounded-xl p-8 mt-16">
                <h3 className="text-2xl font-display font-bold mb-6">Essential Allergy-Related French Phrases</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>English</TableHead>
                      <TableHead>French</TableHead>
                      <TableHead>Pronunciation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>"I have a food allergy"</TableCell>
                      <TableCell>"J'ai une allergie alimentaire"</TableCell>
                      <TableCell>"Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>"Is this dish gluten-free?"</TableCell>
                      <TableCell>"Est-ce que ce plat est sans gluten?"</TableCell>
                      <TableCell>"Ess-kuh suh plah ay sahn gloo-tahn?"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>"Does this contain nuts?"</TableCell>
                      <TableCell>"Est-ce que ça contient des noix?"</TableCell>
                      <TableCell>"Ess-kuh sah kohn-tyahn day nwah?"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
