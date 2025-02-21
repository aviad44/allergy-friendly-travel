
import { useState, useEffect } from "react";
import { Home, Globe, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { ReviewForm } from "./ReviewForm";
import { ReviewFilters } from "./ReviewFilters";
import { ReviewCard } from "./ReviewCard";
import { Review, LanguageCode, languages, destinations, DestinationId, SortOption } from "@/types/reviews";
import { translations } from "@/pages/translations";

interface DestinationReviewsProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTravelerType, setSelectedTravelerType] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const { toast } = useToast();
  const navigate = useNavigate();

  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const textAlignment = isRTL ? 'text-right' : 'text-left';
  const t = translations[currentLanguage];

  useEffect(() => {
    if (!destination) {
      navigate('/destinations');
      return;
    }
    fetchReviews();
  }, [currentLanguage, destinationId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('language', currentLanguage.toLowerCase())
        .eq('destination', destination?.name)
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
        author_name: t.guest,
        destination: destination?.name
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

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="h-[50vh] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80)`
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {destination.description}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            {destination.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl -mt-10 relative z-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/destinations')} className="hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Link to="/">
              <Button variant="ghost" className="hover:bg-white/10 transition-colors">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
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
                    onClick={() => setCurrentLanguage(language.code)}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <MainMenu />
          </div>
        </div>

        <div className="space-y-8">
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
              selectedDestination="all"
              selectedTravelerType={selectedTravelerType}
              sortBy={sortBy}
              onDestinationChange={() => {}}
              onTravelerTypeChange={setSelectedTravelerType}
              onSortChange={(value) => setSortBy(value as SortOption)}
              textAlignment={textAlignment}
              translations={t}
              hideDestinationFilter
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
