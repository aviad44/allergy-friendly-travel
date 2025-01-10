import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Shield, ExternalLink } from "lucide-react";

const RECOMMENDED_HOTELS = [
  {
    id: 1,
    name: "Le Petit Palace",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    description: "Located in the heart of Paris, this boutique hotel offers comprehensive allergy-friendly accommodations.",
    allergies: ["Gluten", "Dairy", "Nuts"],
    rating: 4.8,
    priceRange: "€€€",
    website: "#"
  },
  {
    id: 2,
    name: "Hôtel du Louvre",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description: "A luxury hotel with dedicated allergy-aware dining options and specialized room cleaning protocols.",
    allergies: ["Gluten", "Seafood"],
    rating: 4.7,
    priceRange: "€€€€",
    website: "#"
  }
];

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
            <p className="text-xl max-w-2xl">Your guide to allergy-friendly dining and accommodation in the City of Light</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <h2 className="font-display text-3xl mb-6">Discovering Paris, Safely</h2>
          
          <div className="float-right ml-6 mb-6 w-1/3">
            <img
              src="https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
              alt="Parisian café"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">Traditional Parisian café culture, adapted for dietary restrictions</p>
          </div>

          <p>
            Paris, renowned for its culinary excellence, has embraced the growing need for allergy-friendly dining options. 
            The city's finest establishments now offer specially crafted menus that cater to various dietary restrictions 
            without compromising on the legendary French gastronomic experience.
          </p>

          <p>
            From dedicated gluten-free bakeries in Le Marais to dairy-free alternatives in traditional cafés, 
            Paris has transformed into a welcoming destination for travelers with food allergies. Many restaurants 
            now provide detailed allergen information and maintain strict protocols to prevent cross-contamination.
          </p>

          <h3 className="font-display text-2xl mt-12 mb-6">Where to Stay: Our Recommended Hotels</h3>
        </article>

        {/* Recommended Hotels */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {RECOMMENDED_HOTELS.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display text-xl">{hotel.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {allergy}-free
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{hotel.priceRange}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-muted rounded-xl p-8">
          <h3 className="font-display text-2xl mb-6">Useful Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-muted-foreground">All recommended hotels are located within central Paris, with easy access to major attractions.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Safety Measures</h4>
                <p className="text-muted-foreground">All listed accommodations have dedicated allergy protocols and trained staff.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Our Selection</h4>
                <p className="text-muted-foreground">Hotels are personally vetted and regularly reviewed for allergy safety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParisGuide;