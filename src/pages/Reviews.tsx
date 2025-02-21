
import { useState, useEffect } from "react";
import { Home, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainMenu } from "@/components/MainMenu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewFilters } from "@/components/reviews/ReviewFilters";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Review, LanguageCode, languages, sortOptions } from "@/types/reviews";
import { translations } from "./translations";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTravelerType, setSelectedTravelerType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<typeof sortOptions[number]>('newest');
  const { toast } = useToast();

  const isRTL = currentLanguage === 'he';
  const textAlignment = isRTL ? 'text-right' : 'text-left';
  const t = translations[currentLanguage];

  useEffect(() => {
    fetchReviews();
  }, [currentLanguage]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('language', currentLanguage.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
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
        title: t.error.rating,
        variant: "destructive"
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: t.error.text,
        variant: "destructive"
      });
      return;
    }

    try {
      const newReview = {
        rating,
        text: reviewText,
        language: currentLanguage.toLowerCase(),
        author_name: t.guest
      };

      const { error } = await supabase
        .from('reviews')
        .insert(newReview);

      if (error) throw error;

      setRating(0);
      setReviewText("");
      fetchReviews();

      toast({
        title: t.success.title,
        description: t.success.description,
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
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="hover:bg-white/10 transition-colors">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.code as LanguageCode)}
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <MainMenu />
            </div>
          </div>

          <div className={`text-center mb-12 ${textAlignment}`}>
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          <ReviewForm
            rating={rating}
            reviewText={reviewText}
            onRatingChange={setRating}
            onReviewTextChange={setReviewText}
            onSubmit={handleSubmitReview}
            isRTL={isRTL}
            textAlignment={textAlignment}
            translations={t}
          />

          <div className="space-y-6">
            <h2 className={`text-2xl font-semibold mb-8 ${textAlignment}`}>{t.recentReviews}</h2>
            
            <ReviewFilters
              selectedDestination={selectedDestination}
              selectedTravelerType={selectedTravelerType}
              sortBy={sortBy}
              onDestinationChange={setSelectedDestination}
              onTravelerTypeChange={setSelectedTravelerType}
              onSortChange={(value) => setSortBy(value as typeof sortOptions[number])}
              textAlignment={textAlignment}
              translations={t}
            />

            {isLoading ? (
              <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-muted-foreground">No reviews yet</div>
            ) : (
              filterAndSortReviews(reviews).map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isRTL={isRTL}
                  textAlignment={textAlignment}
                  translations={t}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
