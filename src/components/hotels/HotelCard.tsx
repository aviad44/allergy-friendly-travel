
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, ExternalLink, Check } from "lucide-react";

interface HotelCardProps {
  name: string;
  address: string;
  features: string[];
  description?: string;
  quote?: string;
  bookingUrl: string;
}

export const HotelCard = ({ name, address, features, description, quote, bookingUrl }: HotelCardProps) => {
  const getSimpleBookingUrl = (url: string) => {
    if (url.includes('booking.com')) {
      return url.split('?')[0];
    }
    return url;
  };

  // Extract star rating from name if available
  const starRating = name.includes('★') ? name.split('★').length - 1 : 0;
  const cleanName = name.replace(/★+$/, '').trim();

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg border-primary/20 overflow-hidden group">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-2"></div>
      <CardHeader className="space-y-2 sm:space-y-3 pt-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl sm:text-2xl font-display text-primary/90">
            {cleanName}
          </CardTitle>
          {starRating > 0 && (
            <div className="flex space-x-0.5">
              {Array(starRating).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
        </div>
        <CardDescription>
          <div className="flex items-center text-sm mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-primary/70" />
            <span>{address}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {features.map((feature, index) => (
            <span 
              key={index} 
              className="text-xs sm:text-sm bg-primary/5 text-primary/80 px-2 sm:px-3 py-1 rounded-full flex items-center"
            >
              {feature}
            </span>
          ))}
        </div>
        
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
        )}
        
        {quote && (
          <div className="bg-primary/5 rounded-lg p-4 relative">
            <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 text-primary/20 text-4xl">"</div>
            <blockquote className="pl-4 italic text-sm sm:text-base text-primary/90 relative z-10">
              {quote}
            </blockquote>
            <div className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 text-primary/20 text-4xl">"</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-6">
        <Button 
          asChild 
          className="w-full sm:w-auto transition-all duration-300 hover:scale-105 bg-primary/90 hover:bg-primary"
        >
          <a 
            href={getSimpleBookingUrl(bookingUrl)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Book Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
