
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, ExternalLink, Check, Bed, Home } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createSrcSet, createSizesAttribute } from "@/utils/optimize-image";

export interface HotelCardProps {
  name: string;
  address: string;
  features: string[];
  description?: string;
  quote?: string;
  bookingUrl: string;
  imageUrl?: string;
}

export const HotelCard = ({ 
  name, 
  address, 
  features, 
  description, 
  quote, 
  bookingUrl,
  imageUrl
}: HotelCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const getCleanUrl = (url: string) => {
    // Clean up URL if needed and ensure it starts with http/https
    if (!url) return '#';
    
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    try {
      return new URL(cleanUrl).toString();
    } catch (e) {
      return '#';
    }
  };

  // Generate Google Maps URL for the hotel location
  const getGoogleMapsUrl = (hotelName: string, hotelAddress: string) => {
    const query = encodeURIComponent(`${hotelName}, ${hotelAddress}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Extract star rating from name if available
  const starRating = name.includes('★') ? name.split('★').length - 1 : 0;
  const cleanName = name.replace(/★+$/, '').trim();

  // Determine icon based on hotel name/type
  const isResort = name.toLowerCase().includes('resort') || name.toLowerCase().includes('palace');
  const isChalet = name.toLowerCase().includes('chalet') || name.toLowerCase().includes('airbnb');
  const CardIcon = isChalet ? Home : isResort ? Bed : Bed;
  
  // Load the image lazily when the card comes into view
  useEffect(() => {
    if (!imageUrl || !cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image();
          
          // Optimize the image URL if it's from Unsplash
          const optimizedUrl = imageUrl.includes('unsplash.com') 
            ? `${imageUrl.split('?')[0]}?auto=format&fm=webp&w=400&q=75` 
            : imageUrl;
            
          img.src = optimizedUrl;
          
          img.onload = () => {
            setImgLoaded(true);
          };
          
          img.onerror = () => {
            setImgError(true);
          };
          
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px 0px' }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [imageUrl]);

  return (
    <Card ref={cardRef} className="w-full transition-all duration-300 hover:shadow-lg border-primary/20 overflow-hidden group">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-2"></div>
      
      {/* Optional Hotel Image with lazy loading */}
      {imageUrl && (
        <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
          {/* Placeholder before image loads */}
          {!imgLoaded && !imgError && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary/10 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Actual image with lazy loading */}
          {(imgLoaded || !imgError) && (
            <img 
              src={imgLoaded ? imageUrl : ''}
              data-src={imageUrl}
              srcSet={imgLoaded ? createSrcSet(imageUrl, [400, 600, 800]) : ''}
              sizes={createSizesAttribute()}
              alt={`View of ${cleanName}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              width="400"
              height="225"
              fetchpriority="low"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      )}
      
      <CardHeader className="space-y-2 sm:space-y-3 pt-5 pb-2 px-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-display text-primary/90 flex items-center gap-2 line-clamp-1">
            <CardIcon className="h-4 w-4 shrink-0 text-primary/70" />
            <span>{cleanName}</span>
          </CardTitle>
          {starRating > 0 && (
            <div className="flex space-x-0.5 shrink-0 ml-1">
              {Array(starRating).fill(0).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
        </div>
        <CardDescription>
          <a 
            href={getGoogleMapsUrl(cleanName, address)}
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0 text-primary/70" />
            <span className="truncate">{address}</span>
            <ExternalLink className="h-3 w-3 ml-1 opacity-70 shrink-0" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 py-2">
        <div className="flex flex-wrap gap-1.5 mt-1">
          {features.map((feature, index) => (
            <span 
              key={index} 
              className="text-xs bg-primary/5 text-primary/80 px-2 py-0.5 rounded-full flex items-center"
            >
              {feature}
            </span>
          ))}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}
        
        {quote && (
          <div className="bg-primary/5 rounded-lg p-3 relative mt-1">
            <p className="text-xs italic text-primary/90 relative z-10 line-clamp-2">
              {quote}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <Button 
          asChild 
          className="w-full sm:w-auto transition-all duration-300 hover:scale-105 bg-primary/90 hover:bg-primary text-sm h-9"
          disabled={!bookingUrl || bookingUrl === '#'}
        >
          <a 
            href={getCleanUrl(bookingUrl)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1"
          >
            Visit Website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
