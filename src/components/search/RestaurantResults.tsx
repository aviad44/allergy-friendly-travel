import { RestaurantInfo } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { ExternalLink, Loader2, MapPin, UtensilsCrossed } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

interface RestaurantResultsProps {
  restaurants: RestaurantInfo[];
  destination: string;
  queryPhrase: string;
  fallbackUrl: string;
  isLoading?: boolean;
}

export const RestaurantResults = ({ 
  restaurants, 
  destination, 
  queryPhrase,
  fallbackUrl,
  isLoading = false
}: RestaurantResultsProps) => {
  
  // Filter only restaurants with allergy evidence
  const restaurantsWithEvidence = useMemo(() => {
    return restaurants
      .filter(r => r.evidenceStatus === 'evidence_found')
      .sort((a, b) => {
        // Sort by rating, then by total ratings
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.totalRatings || 0) - (a.totalRatings || 0);
      });
  }, [restaurants]);

  // Loading state with fun knife and fork animation
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        {/* Animated cutlery - matching site branding */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Plate background */}
          <div className="absolute w-28 h-28 rounded-full border-4 border-muted-foreground/20 bg-muted/30" />
          
          {/* Spoon - bounces up and down */}
          <svg 
            viewBox="0 0 24 24" 
            className="absolute w-8 h-8 text-primary animate-[spoon-bounce_1s_ease-in-out_infinite]"
            style={{ left: '8%', top: '30%' }}
            fill="currentColor"
          >
            <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.79 4 4 4v9c0 .55.45 1 1 1s1-.45 1-1v-9c2.21 0 4-1.79 4-4 0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          
          {/* Knife - tilts with cutting motion */}
          <svg 
            viewBox="0 0 24 24" 
            className="absolute w-8 h-8 text-primary animate-[knife-cut_0.8s_ease-in-out_infinite]"
            style={{ left: '35%', top: '25%' }}
            fill="currentColor"
          >
            <path d="M20 2v17a2 2 0 01-2 2H9l11-19zM9 21h2V4.83L9 7.5V21z"/>
          </svg>
          
          {/* Fork - wiggles side to side */}
          <svg 
            viewBox="0 0 24 24" 
            className="absolute w-8 h-8 text-primary animate-[fork-wiggle_1.2s_ease-in-out_infinite]"
            style={{ right: '8%', top: '30%' }}
            fill="currentColor"
          >
            <path d="M5 2v8c0 1.1.9 2 2 2v9c0 .55.45 1 1 1s1-.45 1-1v-9c1.1 0 2-.9 2-2V2H9v6H8V2H7v6H6V2H5zm13 0v20c0 .55-.45 1-1 1s-1-.45-1-1V2h2z"/>
          </svg>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-lg text-foreground font-medium">Searching for allergy-friendly restaurants...</p>
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-base text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>Please note:</strong> Results are based on guest reviews mentioning allergies. 
              We recommend always contacting the restaurant directly to confirm they can accommodate your specific requirements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No restaurants with evidence found
  if (restaurantsWithEvidence.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground/40" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            No restaurants with allergy mentions found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We couldn't find restaurants with allergy-related reviews for "{queryPhrase}" in {destination}.
          </p>
        </div>
        <Button asChild className="mt-4 gap-2">
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Search on Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with disclaimer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {restaurantsWithEvidence.length} restaurants with allergy mentions
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on guest reviews in {destination}
            </p>
          </div>
          
          <Button variant="outline" size="sm" asChild className="gap-1.5 shrink-0">
            <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
              More on Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
        
        {/* Important disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Please note:</strong> These results are based on guest reviews mentioning allergies and dietary needs. 
            We recommend always contacting the restaurant directly before your visit to confirm they can accommodate your specific requirements.
          </p>
        </div>
      </div>

      {/* Restaurant list - simple divider-based layout */}
      <div className="bg-card rounded-lg border border-border px-4">
        {restaurantsWithEvidence.map((restaurant, index) => (
          <RestaurantCard key={`${restaurant.name}-${index}`} restaurant={restaurant} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-2 space-y-2">
        <p className="text-xs text-muted-foreground">
          Looking for more options? Try searching directly on Google Maps.
        </p>
        <Button variant="ghost" size="sm" asChild className="gap-1.5">
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <p className="text-[10px] text-muted-foreground/60 mt-2">
          Always verify allergen information directly with the restaurant before dining.
        </p>
      </div>
    </div>
  );
};
