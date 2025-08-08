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

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching reviews from Supabase...");
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log("Raw reviews data:", data);
      
      // Process reviews and ensure we always have an array
      let processedReviews: Review[] = [];
      
      if (Array.isArray(data)) {
        // Filter out test/placeholder reviews
        processedReviews = data
          .filter(review => !["love this hotel", "loved this hotel", "Great hotel"].includes(review.text || ""))
          .map(review => ({
            ...review,
            author: review.author_name, // Map author_name to author
            id: review.id, // Keep ID as a string
            created_at: review.created_at || new Date().toISOString(),
            rating: typeof review.rating === 'number' ? review.rating : 5
          }));
      }
      
      console.log("Processed reviews:", processedReviews);
      setReviews(processedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError("Failed to load reviews. Please try again later.");
      toast({
        title: "Error loading reviews",
        description: "Please check your connection and try again.",
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
