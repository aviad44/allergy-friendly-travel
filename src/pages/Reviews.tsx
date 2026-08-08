import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import { ReviewContent } from "@/components/reviews/ReviewContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Review, sortOptions } from "@/types/definitions";
import { markPrerenderNotReady, markPrerenderReady } from "@/utils/prerenderReady";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTravelerType, setSelectedTravelerType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<typeof sortOptions[number]>('newest');
  const { toast } = useToast();


  useEffect(() => {
    markPrerenderNotReady();
    fetchReviews();
  }, []);

  // The self-hosted prerender step (scripts/prerender.mjs) drives this page
  // with headless Chrome and gives markPrerenderReady() a 12s budget before
  // snapshotting anyway. Puppeteer's default automated browser sets
  // navigator.webdriver = true, which real visitors' browsers never do — so
  // this is a safe way to tell "the bot writing our static HTML" apart from
  // "a person on a flaky connection". Real users still get the full 3-retry,
  // 10s-per-attempt resilience below; the bot gets one fast attempt and
  // moves on, so the snapshot Google actually indexes captures real content
  // (or a clean error state) instead of freezing mid-spinner past the
  // 12s window — which is what was silently shipping an empty
  // /reviews page to Googlebot and keeping it out of the index.
  const isPrerenderBot = typeof navigator !== 'undefined' && navigator.webdriver === true;

  const fetchReviews = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching reviews from Supabase... (attempt ${retryCount + 1})`);
      console.log("Environment check - running on:", window.location.hostname);
      console.log("User agent:", navigator.userAgent);
      console.log("Connection type:", (navigator as any).connection?.effectiveType || 'unknown');
      
      // For development environment, add mock data if connection fails repeatedly
      if (retryCount >= 2 && window.location.hostname.includes('sandbox.lovable.dev')) {
        console.log("Using fallback mock data for development");
        const mockReviews = [
          {
            id: '1',
            author_name: 'John Doe',
            rating: 5,
            text: 'Great allergy-friendly hotel! The staff was very accommodating.',
            created_at: new Date().toISOString(),
            destination: 'london',
            traveler_type: 'family'
          },
          {
            id: '2', 
            author_name: 'Sarah Smith',
            rating: 4,
            text: 'Good experience overall, but could improve gluten-free options.',
            created_at: new Date().toISOString(),
            destination: 'paris',
            traveler_type: 'solo'
          }
        ];
        
        const processedReviews = mockReviews.map(review => ({
          ...review,
          author: review.author_name,
          id: review.id,
          created_at: review.created_at,
          rating: review.rating
        }));
        
        setReviews(processedReviews);
        return;
      }
      
      // Add timeout for the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), isPrerenderBot ? 4000 : 10000);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);
      console.log("Supabase response:", { data, error });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log("Raw reviews data:", data);
      
      // Process reviews and ensure we always have an array
      let processedReviews: Review[] = [];
      
      if (Array.isArray(data)) {
        processedReviews = data.map(review => ({
          ...review,
          author: review.author_name, // Map author_name to author
          id: review.id, // Keep ID as a string
          created_at: review.created_at || new Date().toISOString(),
          rating: typeof review.rating === 'number' ? review.rating : 5
        }));
      }
      
      console.log("Processed reviews:", processedReviews);
      setReviews(processedReviews);
      markPrerenderReady();
    } catch (error: any) {
      console.error('Detailed error information:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        cause: error?.cause,
        isNetworkError: error?.message?.includes('fetch') || error?.name === 'AbortError',
        isTimeoutError: error?.name === 'AbortError',
        fullError: error,
        retryCount
      });
      
      // Retry logic for network errors — skipped for the prerender bot (see
      // isPrerenderBot above): it needs a fast, final answer within the
      // snapshot's 12s budget, not a 2s/4s/6s backoff cascade that blows
      // straight through it.
      if (!isPrerenderBot && (error?.message?.includes('fetch') || error?.name === 'AbortError') && retryCount < 3) {
        console.log(`Network error detected, retrying in ${(retryCount + 1) * 2} seconds...`);
        setTimeout(() => {
          fetchReviews(retryCount + 1);
        }, (retryCount + 1) * 2000); // Exponential backoff: 2s, 4s, 6s
        return;
      }
      
      let errorMessage = "Failed to load reviews. Please try again later.";
      
      if (error?.message?.includes('fetch') || error?.message?.includes('network') || error?.name === 'AbortError') {
        errorMessage = "Network connection issue. Please check your internet connection and try again.";
      } else if (error?.code) {
        errorMessage = `Database error (${error.code}): ${error.message}`;
      }
      
      setError(errorMessage);
      toast({
        title: "Error loading reviews",
        description: errorMessage,
        variant: "destructive"
      });
      markPrerenderReady();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaManager routeKey="/reviews" />

      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <h1 className="sr-only">Allergy-Friendly Hotel Reviews from Real Travelers</h1>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <ReviewContent 
            reviews={reviews}
            isLoading={isLoading}
            fetchReviews={fetchReviews}
            selectedDestination={selectedDestination}
            selectedTravelerType={selectedTravelerType}
            sortBy={sortBy}
            onDestinationChange={setSelectedDestination}
            onTravelerTypeChange={setSelectedTravelerType}
            onSortChange={(value) => setSortBy(value as typeof sortOptions[number])}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
