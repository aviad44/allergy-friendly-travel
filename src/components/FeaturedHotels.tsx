import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FEATURED_HOTELS = [
  {
    id: 1,
    name: "Le Petit Palace",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    allergies: ["Gluten", "Dairy", "Nuts"],
    href: "/hotels/le-petit-palace"
  },
  {
    id: 2,
    name: "Wellness & Care Hotel",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    allergies: ["Dairy", "Seafood"],
    href: "#"
  },
  {
    id: 3,
    name: "Safe Haven Resort",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    allergies: ["Gluten", "Soy", "Eggs"],
    href: "#"
  },
];

export const FeaturedHotels = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURED_HOTELS.map((hotel) => (
        <Link to={hotel.href} key={hotel.id}>
          <Card className="overflow-hidden group cursor-pointer h-full">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-xl mb-1">{hotel.name}</h3>
              <p className="text-muted-foreground mb-2">{hotel.location}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {allergy}-free
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