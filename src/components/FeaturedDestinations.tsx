
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description: "Discover allergy-friendly luxury in the City of Light",
    commonAllergies: ["Gluten", "Dairy", "Nuts"],
    href: "/destinations/paris"
  },
  {
    id: 2,
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    description: "Experience safe dining in Britain's capital",
    commonAllergies: ["Dairy", "Seafood"],
    href: "/destinations/london"
  },
  {
    id: 3,
    name: "Cyprus",
    country: "Cyprus",
    image: "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png",
    description: "Mediterranean cuisine adapted for your needs",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/cyprus"
  },
  {
    id: 4,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    description: "Allergy-friendly tapas and Mediterranean delights",
    commonAllergies: ["Gluten", "Shellfish"],
    href: "/destinations/barcelona"
  },
  {
    id: 5,
    name: "Crete",
    country: "Greece",
    image: "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png",
    description: "Traditional Greek cuisine with allergy awareness",
    commonAllergies: ["Dairy", "Nuts"],
    href: "/destinations/crete"
  },
  {
    id: 6,
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80",
    description: "Luxurious stays with world-class allergy care",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/abu-dhabi"
  },
  {
    id: 7,
    name: "Thailand",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
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
            <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name === "Cyprus" 
                    ? "WaterWorld Themed Waterpark in Ayia Napa, Cyprus - Best allergy-friendly destination for family vacations"
                    : `${destination.name}, ${destination.country} - Allergy-friendly travel destination with ${destination.commonAllergies.join(" and ")} free options`
                  }
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-display text-2xl mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/90">{destination.country}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.commonAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
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
          <Button variant="secondary" size="lg" className="gap-2">
            More Destinations
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
