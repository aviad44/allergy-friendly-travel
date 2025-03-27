
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: DESTINATION_IMAGES.paris,
    description: "Discover allergy-friendly luxury in the City of Light",
    commonAllergies: ["Gluten", "Dairy", "Nuts"],
    href: "/destinations/paris"
  },
  {
    id: 2,
    name: "London",
    country: "United Kingdom",
    image: DESTINATION_IMAGES.london,
    description: "Experience safe dining in Britain's capital",
    commonAllergies: ["Dairy", "Seafood"],
    href: "/destinations/london"
  },
  {
    id: 3,
    name: "New York",
    country: "United States",
    image: DESTINATION_IMAGES["new-york"],
    description: "Explore allergy-friendly dining in the Big Apple",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/newyork"
  },
  {
    id: 4,
    name: "Cyprus",
    country: "Cyprus",
    image: DESTINATION_IMAGES.cyprus,
    description: "Mediterranean cuisine adapted for your needs",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/cyprus"
  },
  {
    id: 5,
    name: "Barcelona",
    country: "Spain",
    image: DESTINATION_IMAGES.barcelona,
    description: "Allergy-friendly tapas and Mediterranean delights",
    commonAllergies: ["Gluten", "Shellfish"],
    href: "/destinations/barcelona"
  },
  {
    id: 6,
    name: "Crete",
    country: "Greece",
    image: DESTINATION_IMAGES.crete,
    description: "Traditional Greek cuisine with allergy awareness",
    commonAllergies: ["Dairy", "Nuts"],
    href: "/destinations/crete"
  },
  {
    id: 7,
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    image: DESTINATION_IMAGES["abu-dhabi"],
    description: "Luxurious stays with world-class allergy care",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/abu-dhabi"
  },
  {
    id: 8,
    name: "Thailand",
    country: "Thailand",
    image: DESTINATION_IMAGES.thailand,
    description: "Tropical paradise with allergy-conscious options",
    commonAllergies: ["Peanut", "Gluten"],
    href: "/destinations/thailand"
  }
];

export const FeaturedDestinations = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_DESTINATIONS.slice(0, 6).map((destination) => (
          <Link to={destination.href} key={destination.id}>
            <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-xl transition-all duration-300 border-gray-200">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={destination.image.startsWith('photo-') 
                    ? `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=800&h=500&q=80` 
                    : destination.image}
                  alt={destination.name === "Cyprus" 
                    ? "Beautiful beach in Cyprus - Best allergy-friendly destination for family vacations"
                    : `${destination.name}, ${destination.country} - Allergy-friendly travel destination with ${destination.commonAllergies.join(" and ")} free options`
                  }
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-display text-2xl md:text-2xl lg:text-3xl font-bold mb-1 drop-shadow-md">{destination.name}</h3>
                  <p className="text-sm md:text-base text-white/90">{destination.country}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3 text-sm md:text-base">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.commonAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      <Shield className="h-3 w-3" />
                      {allergy}-free options
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/destinations">
          <Button variant="secondary" size="lg" className="gap-2 group hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md border border-gray-200">
            More Destinations
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
