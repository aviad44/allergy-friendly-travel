
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    description: "Mediterranean cuisine adapted for your needs",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/cyprus"
  },
];

export const FeaturedDestinations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURED_DESTINATIONS.map((destination) => (
        <Link to={destination.href} key={destination.id}>
          <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
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
  );
};
