
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe } from "lucide-react";
import HotelSection from "@/components/hotels/HotelSection";
import AllergiesTable from "@/components/language/AllergiesTable";
import UsefulInfo from "@/components/hotels/UsefulInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const RECOMMENDED_HOTELS = {
  couples: [
    {
      id: 1,
      name: "Le Bristol Paris",
      image: "/lovable-uploads/48d61e24-2379-4173-a843-8c83cc833996.png",
      description: "Le Bristol Paris offers specialized accommodations for guests with food allergies, including dedicated kitchen facilities and strict food preparation protocols.",
      allergies: ["Gluten", "Dairy", "Nuts"],
      rating: 4.9,
      priceRange: "€€€€",
      website: "https://www.oetkercollection.com/hotels/le-bristol-paris/",
      features: [
        "Dedicated allergen-free kitchen",
        "Pre-arrival allergy consultation",
        "24/7 medical assistance",
        "Personalized menu planning"
      ],
      reviews: []
    },
    {
      id: 2,
      name: "Ritz Paris",
      image: "https://www.ritzparis.com/sites/default/files/styles/1920x1080/public/images/card_list/homepage-ritz-paris_1.jpg",
      description: "The Ritz Paris maintains strict allergen protocols and offers personalized culinary experiences with advance notice.",
      allergies: ["Gluten", "Dairy"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.ritzparis.com",
      features: [
        "Allergen-free dining options",
        "On-site medical staff",
        "Customized meal preparation",
        "Cross-contamination prevention protocols"
      ],
      reviews: []
    }
  ],
  families: [
    {
      id: 3,
      name: "Four Seasons George V",
      image: "https://www.fourseasons.com/alt/img-opt/~80.930.0,0000-157,5000-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/PAR/PAR_1423_original.jpg",
      description: "Four Seasons George V provides comprehensive allergy management protocols and child-friendly menus adapted to various dietary restrictions.",
      allergies: ["Gluten", "Dairy", "Nuts"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.fourseasons.com/paris/",
      features: [
        "Dedicated allergen-free menus",
        "On-site medical support",
        "Allergen-free room preparation",
        "Trained staff in allergy protocols"
      ],
      reviews: []
    },
    {
      id: 4,
      name: "Novotel Paris Centre Tour Eiffel",
      image: "https://all.accor.com/media/display/private/hotels/1409/1409_1.jpg",
      description: "Novotel Paris Centre Tour Eiffel maintains standard allergy protocols across all their dining and accommodation facilities.",
      allergies: ["Gluten", "Dairy"],
      rating: 4.5,
      priceRange: "€€€",
      website: "https://novotel.accor.com/paris",
      features: [
        "Allergen-free menu options",
        "Allergy-aware staff",
        "Clear allergen labeling",
        "Available medical assistance"
      ],
      reviews: []
    }
  ]
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' }
];

const ParisGuide = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
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
        </div>

        {/* Hero Section */}
        <div className="relative h-[60vh] rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
            alt="Paris cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <h1 className="font-display text-5xl md:text-6xl mb-4">Paris</h1>
            <p className="text-xl max-w-2xl">A comprehensive guide to allergy-friendly dining and accommodation in the City of Light</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <h2 className="font-display text-3xl mb-6">Safe Dining in Paris</h2>
          <p>
            Paris has evolved significantly in recent years when it comes to accommodating diners with food allergies.
            The city's leading establishments now take pride in their ability to provide safe, allergen-free dining experiences
            without compromising on the renowned French culinary excellence.
          </p>
        </article>

        {/* Hotel Sections */}
        <HotelSection
          title="Romantic Hotels for Couples"
          type="couples"
          hotels={RECOMMENDED_HOTELS.couples}
        />

        <HotelSection
          title="Family-Friendly Hotels"
          type="families"
          hotels={RECOMMENDED_HOTELS.families}
        />

        {/* Additional Information */}
        <UsefulInfo />

        {/* French-English Dictionary */}
        <AllergiesTable />
      </div>
    </div>
  );
};

export default ParisGuide;
