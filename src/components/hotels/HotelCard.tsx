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
      <div className="grid md:grid-cols-3 gap-6">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="object-cover w-full h-full"
            style={{ aspectRatio: "4/3" }}
          />
        </div>
        <div className="p-6 md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-display text-2xl">{hotel.name}</h4>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">{hotel.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{hotel.description}</p>
          
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
      </div>
    </Card>
  );
};

export default HotelCard;