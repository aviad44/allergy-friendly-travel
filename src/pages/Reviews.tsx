import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import { ReviewContent } from "@/components/reviews/ReviewContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Review, sortOptions } from "@/types/definitions";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTravelerType, setSelectedTravelerType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<typeof sortOptions[number]>('newest');
  const { toast } = useToast();


  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching reviews from Supabase... (attempt ${retryCount + 1})`);
      console.log("Environment check - running on:", window.location.hostname);
      console.log("User agent:", navigator.userAgent);
      console.log("Connection type:", (navigator as any).connection?.effectiveType || 'unknown');
      
      // Add timeout for the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
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
      
      // Retry logic for network errors
      if ((error?.message?.includes('fetch') || error?.name === 'AbortError') && retryCount < 3) {
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
