import { RestaurantInfo } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { ExternalLink, Loader2, Search, MapPin } from "lucide-react";
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Searching for allergy-friendly restaurants...</p>
      </div>
    );
  }

  // No restaurants with evidence found
  if (restaurantsWithEvidence.length === 0) {
    return (
      <div className="space-y-6 mt-6">
        <div className="text-center py-10 space-y-4">
          <Search className="h-14 w-14 mx-auto text-muted-foreground/50" />
          <h3 className="text-lg font-medium text-foreground">
            No restaurants with allergy mentions found
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find restaurants with verified allergy-related reviews for "{queryPhrase}" in {destination}.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="gap-2">
              <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Search on Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Simple header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {restaurantsWithEvidence.length} restaurant{restaurantsWithEvidence.length !== 1 ? 's' : ''} with allergy mentions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Verified mentions of "{queryPhrase}" in reviews
          </p>
        </div>
        
        {/* Google Maps fallback link */}
        <Button variant="outline" size="sm" asChild className="gap-2 w-fit">
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            More on Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      {/* Restaurant list */}
      <div className="grid gap-4">
        {restaurantsWithEvidence.map((restaurant, index) => (
          <RestaurantCard key={`${restaurant.name}-${index}`} restaurant={restaurant} />
        ))}
      </div>

      {/* Bottom CTA for more results */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">
          Want to see more options? Search directly on Google Maps for more results.
        </p>
        <Button variant="outline" asChild className="gap-2">
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Open in Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};
