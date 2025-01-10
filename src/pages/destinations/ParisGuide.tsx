import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HotelSection from "@/components/hotels/HotelSection";
import AllergiesTable from "@/components/language/AllergiesTable";
import UsefulInfo from "@/components/hotels/UsefulInfo";

const RECOMMENDED_HOTELS = {
  couples: [
    {
      id: 1,
      name: "Le Bristol Paris",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
      description: "Le Bristol Paris offers dedicated allergy-friendly dining options with separate kitchen facilities and strict protocols for food preparation.",
      allergies: ["Gluten", "Dairy", "Nuts"],
      rating: 4.9,
      priceRange: "€€€€",
      website: "https://www.oetkercollection.com/hotels/le-bristol-paris/",
      features: [
        "Dedicated allergy-friendly kitchen",
        "Pre-arrival allergy consultation",
        "24/7 medical assistance",
        "Custom menu planning"
      ]
    },
    {
      id: 2,
      name: "Ritz Paris",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      description: "The Ritz Paris maintains strict protocols for allergen management and offers personalized dining experiences with advance notice.",
      allergies: ["Gluten", "Dairy"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.ritzparis.com",
      features: [
        "Allergen-free dining options",
        "Medical staff on premises",
        "Personalized meal preparation",
        "Strict cross-contamination protocols"
      ]
    }
  ],
  families: [
    {
      id: 3,
      name: "Four Seasons George V",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      description: "Four Seasons George V provides comprehensive allergy management protocols and dedicated children's menus that accommodate various dietary restrictions.",
      allergies: ["Gluten", "Dairy", "Nuts"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.fourseasons.com/paris/",
      features: [
        "Dedicated allergy-friendly menus",
        "In-house medical support",
        "Allergen-free room preparation",
        "Staff trained in allergy protocols"
      ]
    },
    {
      id: 4,
      name: "Novotel Paris Centre Tour Eiffel",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
      description: "Novotel Paris Centre Tour Eiffel offers standardized allergy protocols across all their dining facilities and accommodations.",
      allergies: ["Gluten", "Dairy"],
      rating: 4.5,
      priceRange: "€€€",
      website: "https://novotel.accor.com/paris",
      features: [
        "Allergen-free menu options",
        "Staff trained in allergy awareness",
        "Clear allergen labeling",
        "Medical assistance available"
      ]
    }
  ]
};

const ParisGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>
        </Link>

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
          <h2 className="font-display text-3xl mb-6">Dining Safely in Paris</h2>
          
          <div className="float-right ml-6 mb-6 w-1/3">
            <img
              src="https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
              alt="Parisian café"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">Modern Parisian restaurants are increasingly accommodating dietary restrictions</p>
          </div>

          <p>
            Paris has evolved significantly in recent years to accommodate diners with food allergies. 
            The city's top establishments now pride themselves on their ability to provide safe, 
            allergen-free dining experiences without compromising on the renowned French culinary excellence.
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
