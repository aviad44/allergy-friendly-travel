
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewFilters } from "@/components/reviews/ReviewFilters";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Review, sortOptions } from "@/types/reviews";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const filteredReviews = data ? data.filter(review => 
        !["love this hotel", "loved this hotel", "Great hotel"].includes(review.text)
      ) : [];
      
      setReviews(filteredReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error loading reviews",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive"
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: "Please write a review of at least 10 characters",
        variant: "destructive"
      });
      return;
    }

    try {
      const newReview = {
        rating,
        text: reviewText,
        author_name: "Guest",
        language: "en" // Add the required language field
      };

      const { error } = await supabase
        .from('reviews')
        .insert(newReview);

      if (error) throw error;

      setRating(0);
      setReviewText("");
      fetchReviews();

      toast({
        title: "Thank you!",
        description: "Your review has been added successfully",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        variant: "destructive"
      });
    }
  };

  const filterAndSortReviews = (reviews: Review[]) => {
    let filtered = [...reviews];

    if (selectedDestination !== 'all') {
      filtered = filtered.filter(review => review.destination === selectedDestination);
    }

    if (selectedTravelerType !== 'all') {
      filtered = filtered.filter(review => review.traveler_type === selectedTravelerType);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'highestRated':
          return b.rating - a.rating;
        case 'lowestRated':
          return a.rating - b.rating;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
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
          <div className="reviews-container reviews-animation-fade">
            <h1 className="reviews-title text-3xl md:text-4xl lg:text-5xl mb-4">
              Traveler Reviews
            </h1>
            <p className="reviews-subtitle text-lg md:text-xl mb-8 max-w-2xl">
              Share your experience and help other travelers
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-6 mb-8">
              <p className="text-muted-foreground">
                Your feedback helps the allergy-friendly travel community grow stronger. Find reviews from real travelers with dietary restrictions and share your own experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <ReviewForm
                  rating={rating}
                  reviewText={reviewText}
                  onRatingChange={setRating}
                  onReviewTextChange={setReviewText}
                  onSubmit={handleSubmitReview}
                />
              </div>

              <div className="lg:col-span-7">
                <h2 className="text-2xl font-semibold mb-6 text-primary">Recent Reviews</h2>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6">
                  <p className="text-muted-foreground text-sm mb-3">
                    When writing your review, consider mentioning specific allergy accommodations the hotel made, staff knowledge about cross-contamination, and availability of alternative food options.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    The most helpful reviews are detailed and specific. Mention the dates of your stay, room type, and specific allergies that were accommodated.
                  </p>
                </div>
                
                <ReviewFilters
                  selectedDestination={selectedDestination}
                  selectedTravelerType={selectedTravelerType}
                  sortBy={sortBy}
                  onDestinationChange={setSelectedDestination}
                  onTravelerTypeChange={setSelectedTravelerType}
                  onSortChange={(value) => setSortBy(value as typeof sortOptions[number])}
                />

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-muted-foreground">Loading reviews...</p>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-muted-foreground text-lg">No reviews yet</p>
                    <p className="text-sm mt-2">Be the first to share your experience!</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filterAndSortReviews(reviews).map((review) => (
                      <div key={review.id} className="reviews-animation-fade">
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
