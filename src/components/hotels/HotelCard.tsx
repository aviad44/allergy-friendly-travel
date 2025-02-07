
import { Star, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const bookingUrls = {
    "Le Bristol Paris": "https://www.booking.com/hotel/fr/le-bristol-paris.html?utm_source=allergytravel&utm_medium=guide&utm_campaign=paris",
    "Ritz Paris": "https://www.booking.com/hotel/fr/ritz-paris.html?utm_source=allergytravel&utm_medium=guide&utm_campaign=paris",
    "Four Seasons George V": "https://www.booking.com/hotel/fr/four-seasons-george-v-paris.html?utm_source=allergytravel&utm_medium=guide&utm_campaign=paris",
    "Novotel Paris Centre Tour Eiffel": "https://www.booking.com/hotel/fr/novotel-paris-tour-eiffel.html?utm_source=allergytravel&utm_medium=guide&utm_campaign=paris"
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="aspect-[21/9] relative">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium text-white">{hotel.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-display text-2xl mb-2">{hotel.name}</h4>
          <p className="text-muted-foreground">{hotel.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2">Key Features</h5>
            <ul className="space-y-2">
              {hotel.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {hotel.allergies.map((allergy) => (
            <span
              key={allergy}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {allergy}-free kitchen
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-muted-foreground inline-flex items-center">
            Price Range: {hotel.priceRange}
          </span>
          <Button variant="default" size="sm" asChild>
            <a href={bookingUrls[hotel.name as keyof typeof bookingUrls]} target="_blank" rel="noopener noreferrer">
              Book on Booking.com
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
