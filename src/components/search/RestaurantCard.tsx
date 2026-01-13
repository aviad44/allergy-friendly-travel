import { MapPin, Star, ExternalLink, Clock, DollarSign, Quote, AlertTriangle, HelpCircle, Hash } from "lucide-react";
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
  const evidenceStatus = restaurant.evidenceStatus || 'no_evidence';

  // Render review/evidence section based on status
  const renderEvidenceSection = () => {
    switch (evidenceStatus) {
      case 'evidence_found':
        if (hasAllergyReview) {
          // Show the actual review snippet with matched terms
          return (
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
                    ✓ Allergy-related evidence found in Google reviews
                    {restaurant.reviewSnippet?.matchedTerms && restaurant.reviewSnippet.matchedTerms.length > 0 && (
                      <span className="ml-1 font-normal">
                        (matched: {restaurant.reviewSnippet.matchedTerms.slice(0, 3).join(', ')})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        }
        // Fallback if evidence_found but no snippet text
        return (
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border-l-2 border-green-500">
            <div className="flex items-start gap-2">
              <Quote className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-700 dark:text-green-400">
                ✓ Allergy-related keywords detected in available reviews. Please verify specifics with the restaurant.
              </p>
            </div>
          </div>
        );

      case 'insufficient_evidence':
        return (
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 border-l-2 border-amber-500">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Not enough review data available to confirm allergy safety.
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Please verify allergy accommodations directly with the restaurant before visiting.
                </p>
              </div>
            </div>
          </div>
        );

      case 'no_evidence':
      default:
        return (
          <div className="bg-muted/50 rounded-lg p-3 border-l-2 border-muted-foreground/30">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  No allergy mentions detected in the available reviews.
                </p>
                <p className="text-xs text-muted-foreground/80">
                  This does not mean the restaurant is unsafe — only that no allergy-related information was found in the limited review data. Always confirm directly.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

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
        
        {renderEvidenceSection()}
        
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