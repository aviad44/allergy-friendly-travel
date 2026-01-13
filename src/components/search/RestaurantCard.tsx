import { MapPin, Star, ExternalLink, Clock, DollarSign, Quote, Info, FileSearch, FileWarning, FileX, Globe, Hash } from "lucide-react";
import { RestaurantInfo, EvidenceStatus } from "@/types/restaurant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface RestaurantCardProps {
  restaurant: RestaurantInfo;
  confidenceBadge?: ReactNode;
  evidenceBadge?: ReactNode;
}

export const RestaurantCard = ({ restaurant, confidenceBadge, evidenceBadge }: RestaurantCardProps) => {
  const getPriceLevelDisplay = (level?: number) => {
    if (level === undefined || level === null) return null;
    return '€'.repeat(level);
  };

  const hasAllergyReview = restaurant.reviewSnippet?.hasAllergyMention && restaurant.reviewSnippet?.text;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold text-primary leading-tight">
            {restaurant.name}
          </CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            {restaurant.openNow !== undefined && (
              <Badge 
                variant={restaurant.openNow ? "default" : "secondary"}
                className={restaurant.openNow ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                <Clock className="h-3 w-3 mr-1" />
                {restaurant.openNow ? "Open" : "Closed"}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {evidenceBadge}
          {confidenceBadge}
          
          {restaurant.matchCount && restaurant.matchCount > 1 && (
            <Badge variant="outline" className="gap-1">
              <Hash className="h-3 w-3" />
              Matched {restaurant.matchCount} queries
            </Badge>
          )}
          
          {restaurant.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
              {restaurant.totalRatings && (
                <span className="text-xs">({restaurant.totalRatings.toLocaleString()})</span>
              )}
            </div>
          )}
          
          {restaurant.priceLevel !== undefined && restaurant.priceLevel > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{getPriceLevelDisplay(restaurant.priceLevel)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {restaurant.address && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{restaurant.address}</span>
          </div>
        )}
        
        {hasAllergyReview ? (
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border-l-2 border-green-500">
            <div className="flex items-start gap-2">
              <Quote className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm italic text-foreground/80">
                  "{restaurant.reviewSnippet!.text}"
                </p>
                <p className="text-xs text-muted-foreground">
                  {restaurant.reviewSnippet!.author && (
                    <span>— {restaurant.reviewSnippet!.author}</span>
                  )}
                  {restaurant.reviewSnippet!.relativeTime && (
                    <span className="ml-1">({restaurant.reviewSnippet!.relativeTime})</span>
                  )}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  Allergy mentioned by diner (Google review snippet)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg p-3 border-l-2 border-muted-foreground/30">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                No allergy-related mentions found in available Google review snippets
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            asChild
          >
            <a 
              href={restaurant.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View on Google Maps
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Always confirm allergy accommodations directly with the restaurant.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
