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
        {/* Animated knife and fork */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Fork - tilts left and right */}
          <svg 
            viewBox="0 0 24 24" 
            className="absolute w-10 h-10 text-primary animate-[fork-wiggle_1.2s_ease-in-out_infinite] origin-bottom"
            style={{ left: '15%', animationDelay: '0s' }}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M3 2h8" />
            <path d="M5 2v5" />
            <path d="M9 2v5" />
          </svg>
          
          {/* Knife - tilts opposite direction */}
          <svg 
            viewBox="0 0 24 24" 
            className="absolute w-10 h-10 text-primary animate-[knife-wiggle_1.2s_ease-in-out_infinite] origin-bottom"
            style={{ right: '15%', animationDelay: '0.1s' }}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 2v17a2 2 0 0 1-2 2H8" />
            <path d="M19 2H5l10 8" />
          </svg>
          
          {/* Optional plate circle behind */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-muted-foreground/20 -z-10" />
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
