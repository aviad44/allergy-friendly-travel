
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { ReviewContent } from "@/components/reviews/ReviewContent";
import { Review, sortOptions } from "@/types/reviews";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTravelerType, setSelectedTravelerType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<typeof sortOptions[number]>('newest');
  const { toast } = useToast();

  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}/reviews`;

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
            id: typeof review.id === 'string' ? parseInt(review.id, 10) : review.id,
            // Ensure created_at exists
            created_at: review.created_at || new Date().toISOString(),
            // Ensure rating is a number
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
      <Helmet>
        <title>Traveler Reviews | Allergy-Friendly Travel Guide</title>
        <meta name="description" content="Read authentic traveler reviews about allergy-friendly hotels worldwide. Share your own experience to help others find safe accommodations." />
        <meta name="keywords" content="allergy-friendly hotels, traveler reviews, food allergies, gluten-free hotels, dairy-free accommodations" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
      </Helmet>

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
