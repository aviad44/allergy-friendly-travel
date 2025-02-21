import { useState, useEffect } from "react";
import { Star, Home, Send, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MainMenu } from "@/components/MainMenu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Review {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  author_name: string;
  language: string;
}

const translations = {
  en: {
    title: "Traveler Reviews",
    subtitle: "Share your experience and help other travelers",
    addReview: "Add Review",
    rating: "Rating",
    placeholder: "Share your experience...",
    submit: "Submit Review",
    recentReviews: "Recent Reviews",
    writtenBy: "Written by",
    guest: "Guest",
    error: {
      rating: "Please select a rating",
      text: "Please write a review of at least 10 characters"
    },
    success: {
      title: "Thank you!",
      description: "Your review has been added successfully"
    }
  },
  fr: {
    title: "Avis des Voyageurs",
    subtitle: "Partagez votre expérience et aidez d'autres voyageurs",
    addReview: "Ajouter un Avis",
    rating: "Note",
    placeholder: "Partagez votre expérience...",
    submit: "Envoyer l'Avis",
    recentReviews: "Avis Récents",
    writtenBy: "Écrit par",
    guest: "Invité",
    error: {
      rating: "Veuillez sélectionner une note",
      text: "Veuillez écrire un avis d'au moins 10 caractères"
    },
    success: {
      title: "Merci!",
      description: "Votre avis a été ajouté avec succès"
    }
  },
  es: {
    title: "Reseñas de Viajeros",
    subtitle: "Comparte tu experiencia y ayuda a otros viajeros",
    addReview: "Añadir Reseña",
    rating: "Puntuación",
    placeholder: "Comparte tu experiencia...",
    submit: "Enviar Reseña",
    recentReviews: "Reseñas Recientes",
    writtenBy: "Escrito por",
    guest: "Invitado",
    error: {
      rating: "Por favor selecciona una puntuación",
      text: "Por favor escribe una reseña de al menos 10 caracteres"
    },
    success: {
      title: "¡Gracias!",
      description: "Tu reseña ha sido añadida con éxito"
    }
  },
  de: {
    title: "Reisebewertungen",
    subtitle: "Teilen Sie Ihre Erfahrung und helfen Sie anderen Reisenden",
    addReview: "Bewertung Hinzufügen",
    rating: "Bewertung",
    placeholder: "Teilen Sie Ihre Erfahrung...",
    submit: "Bewertung Absenden",
    recentReviews: "Aktuelle Bewertungen",
    writtenBy: "Geschrieben von",
    guest: "Gast",
    error: {
      rating: "Bitte wählen Sie eine Bewertung",
      text: "Bitte schreiben Sie eine Bewertung von mindestens 10 Zeichen"
    },
    success: {
      title: "Danke!",
      description: "Ihre Bewertung wurde erfolgreich hinzugefügt"
    }
  },
  he: {
    title: "ביקורות מטיילים",
    subtitle: "שתף את החוויה שלך ועזור למטיילים אחרים",
    addReview: "הוסף ביקורת",
    rating: "דירוג",
    placeholder: "שתף את החוויה שלך...",
    submit: "שלח ביקורת",
    recentReviews: "ביקורות אחרונות",
    writtenBy: "נכתב על ידי",
    guest: "אורח",
    error: {
      rating: "אנא בחר דירוג כוכבים",
      text: "אנא כתוב ביקורת של לפחות 10 תווים"
    },
    success: {
      title: "תודה!",
      description: "הביקורת שלך נוספה בהצלחה"
    }
  }
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'he', name: 'עברית' }
];

type LanguageCode = keyof typeof translations;

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Add text direction helper
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
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      const newReview = {
        rating,
        text: reviewText,
        language: currentLanguage.toLowerCase(),
        author_name: userData?.user?.email?.split('@')[0] || t.guest,
        user_id: userData?.user?.id
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

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Navigation */}
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

          {/* Header */}
          <div className={`text-center mb-12 ${textAlignment}`}>
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          {/* Add Review Form */}
          <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/20 shadow-lg transition-all hover:shadow-xl ${textAlignment}`}>
            <h2 className="text-2xl font-semibold mb-6">{t.addReview}</h2>
            
            {/* Star Rating */}
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <span className="text-sm text-muted-foreground">{t.rating}:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className="focus:outline-none transform hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={t.placeholder}
                className="min-h-[120px] bg-white/5 border-white/10 focus:border-primary/50 transition-all"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <Button
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.submit}
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <h2 className={`text-2xl font-semibold mb-8 ${textAlignment}`}>{t.recentReviews}</h2>
            {isLoading ? (
              <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-muted-foreground">No reviews yet</div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-md hover:shadow-lg transition-all"
                >
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-start mb-4`}>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`mb-4 text-lg leading-relaxed ${textAlignment}`}>{review.text}</p>
                  <p className={`text-sm text-muted-foreground ${textAlignment}`}>
                    {t.writtenBy}: <span className="text-primary">{review.author_name}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
