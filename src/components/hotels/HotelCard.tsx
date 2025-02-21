
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
  const getEnhancedBookingUrl = (url: string, hotelName: string) => {
    if (url.includes('booking.com')) {
      // Extract hotel location from the URL (gr, fr, etc.)
      const countryCode = url.match(/hotel\/(..)\//)?.[1] || '';
      
      // Clean the hotel name for the UTM content
      const cleanHotelName = hotelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      
      // Get the destination from the URL
      const destination = url.includes('/gr/') ? 'crete' : 
                         url.includes('/fr/') ? 'paris' :
                         url.includes('/gb/') ? 'london' :
                         url.includes('/es/') ? 'barcelona' :
                         url.includes('/cy/') ? 'ayia-napa' : 'other';

      // Construct the enhanced URL
      const baseUrl = url.split('?')[0];
      return `${baseUrl}.he.html?aid=2165599&label=allergy-friendly` +
             `&utm_source=allergy-friendly-hotels` +
             `&utm_medium=referral` +
             `&utm_campaign=${destination}-hotels` +
             `&utm_content=${cleanHotelName}`;
    }
    return url;
  };

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
          <a href={getEnhancedBookingUrl(bookingUrl, name)} target="_blank" rel="noopener noreferrer">
            Book Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
