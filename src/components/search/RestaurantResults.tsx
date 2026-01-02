import { RestaurantInfo, ConfidenceLevel } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink, ArrowUpDown, Filter, Shield, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface RestaurantResultsProps {
  restaurants: RestaurantInfo[];
  destination: string;
  queryPhrase: string;
  fallbackUrl: string;
}

type SortOption = 'confidence' | 'rating' | 'reviews';

const confidenceOrder: Record<ConfidenceLevel, number> = {
  high: 3,
  medium: 2,
  low: 1
};

const ConfidenceBadge = ({ level }: { level: ConfidenceLevel }) => {
  switch (level) {
    case 'high':
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 gap-1">
          <ShieldCheck className="h-3 w-3" />
          High confidence
        </Badge>
      );
    case 'medium':
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 gap-1">
          <Shield className="h-3 w-3" />
          Medium confidence
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground gap-1">
          <ShieldQuestion className="h-3 w-3" />
          Low confidence
        </Badge>
      );
  }
};

export const RestaurantResults = ({ 
  restaurants, 
  destination, 
  queryPhrase,
  fallbackUrl 
}: RestaurantResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('confidence');
  const [showOnlyAllergyMentions, setShowOnlyAllergyMentions] = useState(false);

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...restaurants];
    
    // Apply allergy mention filter ONLY if user enables it
    if (showOnlyAllergyMentions) {
      filtered = filtered.filter(r => r.reviewSnippet?.hasAllergyMention);
    }
    
    // Sort by confidence first (default), then by selected secondary
    if (sortBy === 'confidence') {
      filtered.sort((a, b) => {
        const confDiff = confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
        if (confDiff !== 0) return confDiff;
        // Secondary sort by rating
        if (b.rating !== a.rating) {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.totalRatings || 0) - (a.totalRatings || 0);
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        if (b.rating !== a.rating) {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.totalRatings || 0) - (a.totalRatings || 0);
      });
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => (b.totalRatings || 0) - (a.totalRatings || 0));
    }
    
    return filtered;
  }, [restaurants, sortBy, showOnlyAllergyMentions]);

  const allergyMentionCount = useMemo(() => 
    restaurants.filter(r => r.reviewSnippet?.hasAllergyMention).length,
    [restaurants]
  );

  const confidenceCounts = useMemo(() => ({
    high: restaurants.filter(r => r.confidenceLevel === 'high').length,
    medium: restaurants.filter(r => r.confidenceLevel === 'medium').length,
    low: restaurants.filter(r => r.confidenceLevel === 'low').length,
  }), [restaurants]);

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-muted-foreground text-lg mb-2">
          No restaurants found for this location.
        </div>
        <p className="text-sm text-muted-foreground">
          Try a different destination or search directly on Google Maps.
        </p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          View results on Google Maps
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">
          Found {restaurants.length} restaurants in {destination} based on Google review mentions
        </h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-fit">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by {sortBy === 'confidence' ? 'Confidence' : sortBy === 'rating' ? 'Rating' : 'Reviews'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy('confidence')}>
              Allergy confidence (highest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('rating')}>
              Rating (highest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('reviews')}>
              Number of reviews
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Confidence summary */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-muted-foreground">Confidence breakdown:</span>
        <span className="text-green-700 dark:text-green-400">{confidenceCounts.high} high</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-amber-700 dark:text-amber-400">{confidenceCounts.medium} medium</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{confidenceCounts.low} low</span>
      </div>

      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
          Results are based on limited Google review snippets. Always verify allergy handling directly with the restaurant.
        </AlertDescription>
      </Alert>

      {/* Optional filter toggle */}
      <div className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Switch
              id="allergy-filter"
              checked={showOnlyAllergyMentions}
              onCheckedChange={setShowOnlyAllergyMentions}
            />
            <Label htmlFor="allergy-filter" className="text-sm cursor-pointer">
              Show only restaurants with allergy mentions
              <span className="ml-1 text-muted-foreground">
                ({allergyMentionCount} of {restaurants.length})
              </span>
            </Label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground ml-7">
          May significantly reduce results
        </p>
      </div>

      {filteredAndSortedRestaurants.length === 0 && showOnlyAllergyMentions ? (
        <div className="text-center py-8 space-y-4">
          <div className="text-muted-foreground text-lg">
            No restaurants with allergy-related review mentions found.
          </div>
          <p className="text-sm text-muted-foreground">
            Disable the filter above to see all restaurants, or search directly on Google Maps.
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View results on Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAndSortedRestaurants.map((restaurant, index) => (
            <RestaurantCard 
              key={index} 
              restaurant={restaurant} 
              confidenceBadge={<ConfidenceBadge level={restaurant.confidenceLevel} />}
            />
          ))}
        </div>
      )}

      <div className="text-center pt-4">
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View more results on Google Maps
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export { ConfidenceBadge };
