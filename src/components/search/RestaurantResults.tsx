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
        {/* Animated cutlery rotating inside circle */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Plate circle background */}
          <div className="absolute w-28 h-28 rounded-full border-4 border-muted-foreground/20 bg-muted/30" />
          
          {/* Rotating container with knife, fork, and pan */}
          <div className="animate-[cutlery-rotate_2.5s_linear_infinite] flex items-center justify-center gap-1">
            {/* Fork */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 text-foreground/80"
              fill="currentColor"
            >
              <path d="M5 2v8c0 1.1.9 2 2 2v9c0 .55.45 1 1 1s1-.45 1-1v-9c1.1 0 2-.9 2-2V2H9v6H8V2H7v6H6V2H5z"/>
            </svg>
            
            {/* Knife */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 text-foreground/80"
              fill="currentColor"
            >
              <path d="M19.78 2.2l-1.42 1.42 2.12 2.12c.78.78.78 2.05 0 2.83L17.66 11.4l-.71-.71-7.07 7.07-1.41-1.41 7.07-7.07-.71-.71 2.83-2.83c.78-.78.78-2.05 0-2.83l-2.12-2.12 1.42-1.42 2.82 2.82z"/>
              <path d="M8 19l-4 4-2-2 4-4z"/>
            </svg>
            
            {/* Pan */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 text-foreground/80"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 12.93V16h-4v-1.07c-1.74-.66-3-2.27-3-4.93 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.66-1.26 4.27-3 4.93z"/>
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
            </svg>
          </div>
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
