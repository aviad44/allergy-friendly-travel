import { RestaurantInfo } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RestaurantResultsProps {
  restaurants: RestaurantInfo[];
  destination: string;
  queryPhrase: string;
  fallbackUrl: string;
}

type SortOption = 'rating' | 'reviews';

export const RestaurantResults = ({ 
  restaurants, 
  destination, 
  queryPhrase,
  fallbackUrl 
}: RestaurantResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('rating');

  const sortedRestaurants = useMemo(() => {
    const sorted = [...restaurants];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => {
        // Sort by rating first, then by total ratings
        if (b.rating !== a.rating) {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.totalRatings || 0) - (a.totalRatings || 0);
      });
    } else if (sortBy === 'reviews') {
      sorted.sort((a, b) => (b.totalRatings || 0) - (a.totalRatings || 0));
    }
    return sorted;
  }, [restaurants, sortBy]);

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-muted-foreground text-lg mb-2">
          No restaurants found for your search.
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
          Found {restaurants.length} {queryPhrase} restaurants in {destination}
        </h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-fit">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by {sortBy === 'rating' ? 'Rating' : 'Reviews'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy('rating')}>
              Rating (highest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('reviews')}>
              Number of reviews
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Alert className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          Results are based on limited Google review snippets and are not a safety guarantee. Always verify directly with the restaurant.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        {sortedRestaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>

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
