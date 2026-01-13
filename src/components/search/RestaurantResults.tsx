import { RestaurantInfo, ConfidenceLevel, EvidenceStatus, RestaurantSearchStats } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink, ArrowUpDown, Filter, Shield, ShieldCheck, ShieldQuestion, FileSearch, FileX, FileWarning } from "lucide-react";
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
  totalCandidates?: number;
  stats?: RestaurantSearchStats;
}

type SortOption = 'confidence' | 'rating' | 'reviews' | 'matchCount';

const confidenceOrder: Record<ConfidenceLevel, number> = {
  high: 3,
  medium: 2,
  low: 1
};

const evidenceOrder: Record<EvidenceStatus, number> = {
  evidence_found: 3,
  insufficient_evidence: 2,
  no_evidence: 1
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

const EvidenceBadge = ({ status }: { status: EvidenceStatus }) => {
  switch (status) {
    case 'evidence_found':
      return (
        <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 gap-1">
          <FileSearch className="h-3 w-3" />
          Evidence found
        </Badge>
      );
    case 'insufficient_evidence':
      return (
        <Badge variant="outline" className="border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400 gap-1">
          <FileWarning className="h-3 w-3" />
          Insufficient evidence
        </Badge>
      );
    case 'no_evidence':
      return (
        <Badge variant="outline" className="border-muted text-muted-foreground gap-1">
          <FileX className="h-3 w-3" />
          No evidence
        </Badge>
      );
  }
};

export const RestaurantResults = ({ 
  restaurants, 
  destination, 
  queryPhrase,
  fallbackUrl,
  totalCandidates,
  stats
}: RestaurantResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('confidence');
  const [showOnlyAllergyMentions, setShowOnlyAllergyMentions] = useState(false);

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...restaurants];
    
    // Apply allergy mention filter ONLY if user enables it
    if (showOnlyAllergyMentions) {
      filtered = filtered.filter(r => r.evidenceStatus === 'evidence_found');
    }
    
    // Sort based on selection
    if (sortBy === 'confidence') {
      filtered.sort((a, b) => {
        // First by evidence status
        const evidenceDiff = evidenceOrder[b.evidenceStatus || 'no_evidence'] - evidenceOrder[a.evidenceStatus || 'no_evidence'];
        if (evidenceDiff !== 0) return evidenceDiff;
        // Then by confidence
        const confDiff = confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
        if (confDiff !== 0) return confDiff;
        // Then by rating
        return (b.rating || 0) - (a.rating || 0);
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
    } else if (sortBy === 'matchCount') {
      filtered.sort((a, b) => (b.matchCount || 0) - (a.matchCount || 0));
    }
    
    return filtered;
  }, [restaurants, sortBy, showOnlyAllergyMentions]);

  const evidenceCounts = useMemo(() => ({
    evidenceFound: restaurants.filter(r => r.evidenceStatus === 'evidence_found').length,
    insufficient: restaurants.filter(r => r.evidenceStatus === 'insufficient_evidence').length,
    noEvidence: restaurants.filter(r => r.evidenceStatus === 'no_evidence').length,
  }), [restaurants]);

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
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Found {restaurants.length} restaurants in {destination}
          </h2>
          {totalCandidates && totalCandidates > restaurants.length && (
            <p className="text-sm text-muted-foreground">
              Analyzed {totalCandidates} candidates, showing top {restaurants.length}
            </p>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-fit">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by {
                sortBy === 'confidence' ? 'Confidence' : 
                sortBy === 'rating' ? 'Rating' : 
                sortBy === 'matchCount' ? 'Match Count' :
                'Reviews'
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy('confidence')}>
              Allergy confidence (highest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('matchCount')}>
              Query match count (multi-query bonus)
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

      {/* Evidence & Confidence summary */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-wrap gap-2 text-sm p-3 bg-muted/30 rounded-lg">
          <span className="text-muted-foreground font-medium">Evidence:</span>
          <span className="text-green-700 dark:text-green-400">{evidenceCounts.evidenceFound} found</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-amber-700 dark:text-amber-400">{evidenceCounts.insufficient} insufficient</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{evidenceCounts.noEvidence} none</span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm p-3 bg-muted/30 rounded-lg">
          <span className="text-muted-foreground font-medium">Confidence:</span>
          <span className="text-green-700 dark:text-green-400">{confidenceCounts.high} high</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-amber-700 dark:text-amber-400">{confidenceCounts.medium} medium</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{confidenceCounts.low} low</span>
        </div>
      </div>

      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
          Results are based on limited Google review snippets (max 5 per restaurant). Always verify allergy handling directly with the restaurant.
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
              Show only restaurants with evidence found
              <span className="ml-1 text-muted-foreground">
                ({evidenceCounts.evidenceFound} of {restaurants.length})
              </span>
            </Label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground ml-7">
          Filter to show only restaurants with verified allergy mentions in reviews
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
              evidenceBadge={<EvidenceBadge status={restaurant.evidenceStatus || 'no_evidence'} />}
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

export { ConfidenceBadge, EvidenceBadge };
