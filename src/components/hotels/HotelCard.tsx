
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, ExternalLink, Check, Bed, Home } from "lucide-react";
import { useState } from "react";
import { trackHotelBookingClick } from "@/utils/googleAnalytics";

export interface HotelCardProps {
  name: string;
  address: string;
  features: string[];
  description?: string;
  quote?: string;
  bookingUrl: string;
  imageUrl?: string;
  /** Real Tripadvisor rating/review data (see TripadvisorEnrichedHotelCard) — omitted when not found. */
  tripadvisorRating?: number;
  tripadvisorReviewCount?: number;
  tripadvisorUrl?: string;
  tripadvisorQuote?: { text: string; author: string; url: string };
}

export const HotelCard = ({
  name,
  address,
  features,
  description,
  quote,
  bookingUrl,
  tripadvisorRating,
  tripadvisorReviewCount,
  tripadvisorUrl,
  tripadvisorQuote,
}: HotelCardProps) => {
  // Debug log for individual hotel data rendering
  console.log("Rendering HotelCard:", { name, address });
  
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
      console.error('Invalid URL:', url);
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

  return (
    <Card className="w-full min-w-0 transition-all duration-300 hover:shadow-lg border-primary/20 overflow-hidden group">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-2"></div>
      
      <CardHeader className="space-y-2 sm:space-y-3 pt-5 pb-2 px-4">
        <div className="flex justify-between items-start min-w-0">
          <CardTitle className="text-lg font-display text-primary/90 flex items-center gap-2 line-clamp-1 min-w-0">
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
            className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors min-w-0"
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

        {tripadvisorRating && (
          <a
            href={tripadvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:underline w-fit"
          >
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-medium text-primary/90">{tripadvisorRating.toFixed(1)} on Tripadvisor</span>
            {tripadvisorReviewCount && (
              <span className="text-muted-foreground">({tripadvisorReviewCount.toLocaleString()} reviews)</span>
            )}
          </a>
        )}

        {quote ? (
          <blockquote className="bg-primary/5 rounded-lg p-3 relative mt-1 border-l-2 border-primary/30">
            <p className="text-xs text-primary/90 relative z-10 italic line-clamp-3">"{quote}"</p>
          </blockquote>
        ) : tripadvisorQuote ? (
          <blockquote className="bg-primary/5 rounded-lg p-3 relative mt-1 border-l-2 border-primary/30">
            <p className="text-xs text-primary/90 relative z-10 italic line-clamp-3">"{tripadvisorQuote.text}"</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              — {tripadvisorQuote.author},{" "}
              <a href={tripadvisorQuote.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Tripadvisor
              </a>
            </p>
          </blockquote>
        ) : (
          <div className="bg-primary/5 rounded-lg p-3 relative mt-1">
            <p className="text-xs text-primary/80 relative z-10">
              Guest review data isn't available for this property yet.
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
            onClick={() => trackHotelBookingClick(cleanName, bookingUrl)}
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
