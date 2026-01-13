import { RestaurantInfo, ConfidenceLevel, EvidenceStatus, RestaurantSearchStats } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink, ArrowUpDown, Filter, Shield, ShieldCheck, ShieldQuestion, FileSearch, FileX, FileWarning, Zap, Layers, Loader2, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
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
  mode?: 'fast' | 'deep';
  expandSearchAvailable?: boolean;
  onModeChange?: (mode: 'fast' | 'deep') => void;
  isLoading?: boolean;
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
  stats,
  mode = 'fast',
  expandSearchAvailable = false,
  onModeChange,
  isLoading = false
}: RestaurantResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('confidence');
  
  // In fast mode, default filter to ON (show only evidence_found)
  // In deep mode, default filter to OFF (show all)
  const [showOnlyAllergyMentions, setShowOnlyAllergyMentions] = useState(mode === 'fast');

  // Update filter when mode changes
  useEffect(() => {
    setShowOnlyAllergyMentions(mode === 'fast');
  }, [mode]);

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...restaurants];
    
    // Apply allergy mention filter
    if (showOnlyAllergyMentions) {
      filtered = filtered.filter(r => r.evidenceStatus === 'evidence_found');
    }
    
    // Sort based on selection
    if (sortBy === 'confidence') {
      filtered.sort((a, b) => {
        const evidenceDiff = evidenceOrder[b.evidenceStatus || 'no_evidence'] - evidenceOrder[a.evidenceStatus || 'no_evidence'];
        if (evidenceDiff !== 0) return evidenceDiff;
        const confDiff = confidenceOrder[b.confidenceLevel] - confidenceOrder[a.confidenceLevel];
        if (confDiff !== 0) return confDiff;
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

  const handleModeChange = (newMode: 'fast' | 'deep') => {
    if (onModeChange && !isLoading) {
      onModeChange(newMode);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">
          {mode === 'deep' ? 'Running deep search...' : 'Searching restaurants...'}
        </p>
        <p className="text-sm text-muted-foreground">
          This may take a few seconds
        </p>
      </div>
    );
  }

  // No results at all
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="space-y-4 mt-6">
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/30 rounded-lg">
          <Button
            size="sm"
            variant={mode === 'fast' ? 'default' : 'outline'}
            onClick={() => handleModeChange('fast')}
            disabled={isLoading}
            className="gap-1.5"
          >
            <Zap className="h-3.5 w-3.5" />
            Fast
          </Button>
          <Button
            size="sm"
            variant={mode === 'deep' ? 'default' : 'outline'}
            onClick={() => handleModeChange('deep')}
            disabled={isLoading}
            className="gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" />
            Deep
          </Button>
        </div>

        <div className="text-center py-8 space-y-4">
          <Search className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="text-muted-foreground text-lg">
            No restaurants found for this location.
          </div>
          
          {mode === 'fast' && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Try expanding to a deeper search for more results
              </p>
              <Button 
                onClick={() => handleModeChange('deep')} 
                disabled={isLoading}
                className="gap-1.5"
              >
                <Layers className="h-4 w-4" />
                Expand to Deep Search
              </Button>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            Or search directly on Google Maps
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
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {/* Header with Mode Toggle */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'fast' ? (
                <>
                  Top {evidenceCounts.evidenceFound > 0 ? evidenceCounts.evidenceFound : restaurants.length} restaurants with allergy evidence
                </>
              ) : (
                <>
                  Found {restaurants.length} restaurants in {destination}
                </>
              )}
            </h2>
            {mode === 'fast' && evidenceCounts.evidenceFound > 0 && (
              <p className="text-sm text-muted-foreground">
                {evidenceCounts.evidenceFound} with verified evidence out of {restaurants.length} analyzed
              </p>
            )}
            {mode === 'deep' && totalCandidates && totalCandidates > restaurants.length && (
              <p className="text-sm text-muted-foreground">
                Analyzed {totalCandidates} candidates, showing top {restaurants.length}
              </p>
            )}
          </div>
          
          {/* Mode Toggle + Evidence Filter */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-lg">
              <Button
                size="sm"
                variant={mode === 'fast' ? 'default' : 'ghost'}
                onClick={() => handleModeChange('fast')}
                disabled={isLoading}
                className="gap-1.5 h-8"
              >
                <Zap className="h-3.5 w-3.5" />
                Fast
              </Button>
              <Button
                size="sm"
                variant={mode === 'deep' ? 'default' : 'ghost'}
                onClick={() => handleModeChange('deep')}
                disabled={isLoading}
                className="gap-1.5 h-8"
              >
                <Layers className="h-3.5 w-3.5" />
                Deep
              </Button>
            </div>
            
            {/* Prominent Evidence Filter Toggle - always visible */}
            <Button
              size="sm"
              variant={showOnlyAllergyMentions ? 'default' : 'outline'}
              onClick={() => setShowOnlyAllergyMentions(!showOnlyAllergyMentions)}
              className={`gap-1.5 h-8 ${showOnlyAllergyMentions ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Evidence only</span>
              <span className="sm:hidden">Safe</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {evidenceCounts.evidenceFound}
              </Badge>
            </Button>
          </div>
        </div>

        {/* Mode Description */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded px-3 py-2">
          {mode === 'fast' ? (
            <span><strong>Fast mode:</strong> Quick search showing restaurants with verified allergy mentions</span>
          ) : (
            <span><strong>Deep mode:</strong> Comprehensive search showing all results. {!showOnlyAllergyMentions && 'Click "Evidence only" for safety-focused results.'}</span>
          )}
        </div>
      </div>

      {/* Expand Search Banner - shown when few results in fast mode */}
      {mode === 'fast' && expandSearchAvailable && (
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
          <Search className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-blue-800 dark:text-blue-200">
              <strong>Found {evidenceCounts.evidenceFound} restaurants with evidence</strong> out of {restaurants.length} analyzed. 
              Expand search for more options.
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleModeChange('deep')} 
                disabled={isLoading}
                className="gap-1.5"
              >
                <Layers className="h-3.5 w-3.5" />
                Expand Search
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Google Maps
                </a>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Sort Dropdown */}
      <div className="flex justify-end">
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


      {/* Results or empty state */}
      {filteredAndSortedRestaurants.length === 0 && showOnlyAllergyMentions ? (
        <div className="text-center py-8 space-y-4">
          <div className="text-muted-foreground text-lg">
            No restaurants with allergy-related review mentions found.
          </div>
          
          {mode === 'fast' && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Try expanding to a deeper search for more results
              </p>
              <Button 
                onClick={() => handleModeChange('deep')} 
                disabled={isLoading}
                className="gap-1.5"
              >
                <Layers className="h-4 w-4" />
                Expand to Deep Search
              </Button>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            Or disable the filter above to see all restaurants, or search directly on Google Maps.
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
