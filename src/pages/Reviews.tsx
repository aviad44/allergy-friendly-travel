
import { useState, useEffect } from "react";
import { Home, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainMenu } from "@/components/MainMenu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
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
    // Set HTML language attribute for SEO
    document.documentElement.lang = currentLanguage;
    // Adjust text direction for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('language', currentLanguage.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter out test reviews
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
      <Helmet>
        <html lang={currentLanguage} dir={isRTL ? 'rtl' : 'ltr'} />
        <title>{t.title} | Allergy-Friendly Travel Guide</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content={t.seoKeywords} />
        {/* Add hreflang tags for all supported languages */}
        {languages.map(lang => (
          <link 
            key={lang.code}
            rel="alternate" 
            hrefLang={lang.code} 
            href={`${window.location.origin}/reviews?lang=${lang.code}`} 
          />
        ))}
        <link rel="canonical" href={`${window.location.origin}/reviews`} />
      </Helmet>

      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
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
                  <Button variant="ghost" size="sm" className="border border-white/20 backdrop-blur-sm">
                    <Globe className="h-4 w-4 mr-2" />
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border border-white/20">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.code as LanguageCode)}
                      className="hover:bg-white/50"
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <MainMenu />
            </div>
          </div>

          <div className={`reviews-container reviews-animation-fade ${textAlignment}`}>
            <h1 className={`reviews-title ${textAlignment}`}>
              {t.title}
            </h1>
            <p className={`reviews-subtitle ${textAlignment}`}>
              {t.subtitle}
            </p>

            <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-6 mb-8 ${textAlignment}`}>
              <p className="text-muted-foreground">
                {t.pageContent.introText}
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

            <div className="space-y-6 mt-10">
              <h2 className={`text-2xl font-semibold mb-8 text-primary ${textAlignment}`}>{t.recentReviews}</h2>
              
              <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-8 ${textAlignment}`}>
                <p className="text-muted-foreground text-sm mb-3">
                  {t.pageContent.reviewTips}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t.pageContent.helpfulReviews}
                </p>
              </div>
              
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
                    <div key={review.id} className="reviews-animation-fade" style={{animationDelay: `${reviews.indexOf(review) * 0.1}s`}}>
                      <ReviewCard
                        review={review}
                        isRTL={isRTL}
                        textAlignment={textAlignment}
                        translations={t}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
