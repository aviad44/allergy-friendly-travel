import { Heart, Users } from "lucide-react";
import HotelCard from "./HotelCard";

interface Review {
  author: string;
  rating: number;
  text: string;
}

interface Hotel {
  id: number;
  name: string;
  image: string;
  description: string;
  allergies: string[];
  rating: number;
  priceRange: string;
  website: string;
  features: string[];
  reviews: Review[];
}

interface HotelSectionProps {
  title: string;
  type: "couples" | "families";
  hotels: Hotel[];
}

const HotelSection = ({ title, type, hotels }: HotelSectionProps) => {
  return (
    <section className="space-y-8 mb-16">
      <h3 className="font-display text-2xl mt-12 mb-6 flex items-center gap-2">
        {type === "couples" ? (
          <Heart className="h-6 w-6 text-primary" />
        ) : (
          <Users className="h-6 w-6 text-primary" />
        )}
        {title}
      </h3>
      
      <div className="space-y-8">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default HotelSection;