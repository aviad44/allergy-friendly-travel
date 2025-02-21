
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface HotelCardProps {
  name: string;
  address: string;
  features: string[];
  description?: string;
  quote?: string;
  bookingUrl: string;
}

export const HotelCard = ({ name, address, features, description, quote, bookingUrl }: HotelCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-display">{name}</CardTitle>
        <CardDescription>
          <p className="text-sm mt-2">📍 {address}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {features.map((feature, index) => (
              <span key={index} className="text-sm bg-muted px-3 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        {quote && (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "{quote}"
          </blockquote>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
