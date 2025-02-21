
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
      const countryCode = url.match(/hotel\/(..)\//)?.[1] || '';
      const cleanHotelName = hotelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      const destination = url.includes('/gr/') ? 'crete' : 
                         url.includes('/fr/') ? 'paris' :
                         url.includes('/gb/') ? 'london' :
                         url.includes('/es/') ? 'barcelona' :
                         url.includes('/cy/') ? 'ayia-napa' : 'other';

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
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="space-y-2 sm:space-y-3">
        <CardTitle className="text-xl sm:text-2xl font-display">{name}</CardTitle>
        <CardDescription>
          <p className="text-sm mt-2">📍 {address}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {features.map((feature, index) => (
              <span 
                key={index} 
                className="text-xs sm:text-sm bg-muted px-2 sm:px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
        )}
        {quote && (
          <blockquote className="border-l-4 border-primary pl-4 italic text-sm sm:text-base">
            "{quote}"
          </blockquote>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
        >
          <a 
            href={getEnhancedBookingUrl(bookingUrl, name)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Book Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
