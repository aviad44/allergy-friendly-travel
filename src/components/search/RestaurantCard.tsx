import { MapPin, Star, ExternalLink, Quote } from "lucide-react";
import { RestaurantInfo } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RestaurantCardProps {
  restaurant: RestaurantInfo;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const hasAllergyReview = restaurant.reviewSnippet?.hasAllergyMention && restaurant.reviewSnippet?.text;

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      {/* Header row: Name + Rating + Open status */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base leading-tight">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating.toFixed(1)}</span>
                {restaurant.totalRatings && (
                  <span className="text-xs">({restaurant.totalRatings.toLocaleString()})</span>
                )}
              </div>
            )}
            {restaurant.address && (
              <span className="truncate">{restaurant.address}</span>
            )}
          </div>
        </div>
        
        {restaurant.openNow !== undefined && (
          <Badge 
            variant="outline"
            className={restaurant.openNow 
              ? "bg-green-50 text-green-700 border-green-200 shrink-0" 
              : "bg-muted text-muted-foreground shrink-0"
            }
          >
            {restaurant.openNow ? "Open" : "Closed"}
          </Badge>
        )}
      </div>

      {/* Allergy review quote - highlighted in green */}
      {hasAllergyReview && (
        <div className="bg-green-50 dark:bg-green-950/30 rounded-md p-3 my-3 border-l-4 border-green-500">
          <div className="flex gap-2">
            <Quote className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {restaurant.reviewSnippet!.text}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {restaurant.reviewSnippet!.author && (
                  <span>— {restaurant.reviewSnippet!.author}</span>
                )}
                {restaurant.reviewSnippet!.relativeTime && (
                  <span>({restaurant.reviewSnippet!.relativeTime})</span>
                )}
              </div>
              {restaurant.reviewSnippet?.matchedTerms && restaurant.reviewSnippet.matchedTerms.length > 0 && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  Allergy keywords: {restaurant.reviewSnippet.matchedTerms.slice(0, 4).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-3">
        <Button 
          variant="link" 
          className="p-0 h-auto text-primary gap-1.5"
          asChild
        >
          <a 
            href={restaurant.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MapPin className="h-4 w-4" />
            View on Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        
        <span className="text-xs text-muted-foreground">
          Always verify with restaurant
        </span>
      </div>
    </div>
  );
};