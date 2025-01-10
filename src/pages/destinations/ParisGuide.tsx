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
      description: "Romantic luxury hotel with Michelin-starred restaurant featuring dedicated allergy-friendly kitchen and personalized menu planning.",
      allergies: ["Gluten", "Dairy", "Nuts", "Shellfish"],
      rating: 4.9,
      priceRange: "€€€€",
      website: "https://www.oetkercollection.com/hotels/le-bristol-paris/",
      features: [
        "Dedicated allergy-friendly kitchen",
        "Pre-arrival allergy consultation",
        "24/7 medical assistance",
        "Custom menu planning"
      ],
      reviews: [
        {
          author: "Sarah M.",
          rating: 5,
          text: "Perfect for a romantic getaway. The chef personally discussed our dietary needs and created amazing gluten-free dishes."
        },
        {
          author: "David L.",
          rating: 5,
          text: "Incredible attention to detail with allergen-free romantic dinners. The perfect anniversary celebration."
        }
      ]
    },
    {
      id: 2,
      name: "Ritz Paris",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      description: "Iconic luxury hotel offering intimate dining experiences with specialized allergen-free menus for couples.",
      allergies: ["Gluten", "Dairy", "Soy"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.ritzparis.com",
      features: [
        "Private dining experiences",
        "Allergen-free room service",
        "Romantic atmosphere",
        "Customized menus"
      ],
      reviews: [
        {
          author: "James R.",
          rating: 5,
          text: "They made our honeymoon special with allergen-free champagne and customized romantic dinners."
        },
        {
          author: "Marie C.",
          rating: 4,
          text: "Beautiful romantic setting with excellent attention to food allergies."
        }
      ]
    }
  ],
  families: [
    {
      id: 3,
      name: "Four Seasons George V",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      description: "Family-friendly luxury hotel with dedicated children's programs and comprehensive allergy management.",
      allergies: ["Gluten", "Dairy", "Soy", "Eggs"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.fourseasons.com/paris/",
      features: [
        "Kids' allergy-aware menu",
        "Family cooking classes",
        "In-house nutritionist",
        "Child-friendly facilities"
      ],
      reviews: [
        {
          author: "Emma R.",
          rating: 5,
          text: "Perfect for families with allergies. They had special kids' menus and activities that considered all our dietary needs."
        },
        {
          author: "Michael P.",
          rating: 4,
          text: "Great family atmosphere with excellent allergy protocols for children."
        }
      ]
    },
    {
      id: 4,
      name: "Novotel Paris Centre Tour Eiffel",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      description: "Modern family hotel with allergen-free kids' corner and special family rooms.",
      allergies: ["Gluten", "Nuts", "Dairy"],
      rating: 4.5,
      priceRange: "€€€",
      website: "https://novotel.accor.com/paris",
      features: [
        "Family-sized rooms",
        "Kids eat free program",
        "Allergen-free playroom",
        "Family entertainment"
      ],
      reviews: [
        {
          author: "Thomas K.",
          rating: 4,
          text: "Great for families with food allergies. The kids' menu was extensive and safe."
        },
        {
          author: "Lisa M.",
          rating: 5,
          text: "Perfect location and excellent handling of our children's multiple allergies."
        }
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
