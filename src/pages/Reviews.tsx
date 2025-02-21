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
  destination?: string;
  traveler_type?: 'family' | 'couple' | 'solo' | 'friends';
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
    },
    filter: {
      title: "Filter Reviews",
      destination: "Destination",
      all: "All Destinations",
      travelerType: "Traveler Type",
      sortBy: "Sort By",
      newest: "Newest First",
      oldest: "Oldest First",
      highestRated: "Highest Rated",
      lowestRated: "Lowest Rated",
      family: "Family",
      couple: "Couple",
      solo: "Solo",
      friends: "Friends",
      allTypes: "All Types"
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
    },
    filter: {
      title: "Filtrer les Avis",
      destination: "Destination",
      all: "Toutes les Destinations",
      travelerType: "Type de Voyageur",
      sortBy: "Trier Par",
      newest: "Plus Récents",
      oldest: "Plus Anciens",
      highestRated: "Mieux Notés",
      lowestRated: "Moins Bien Notés",
      family: "Famille",
      couple: "Couple",
      solo: "Solo",
      friends: "Amis",
      allTypes: "Tous les Types"
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
    },
    filter: {
      title: "Filtrar Reseñas",
      destination: "Destino",
      all: "Todos los Destinos",
      travelerType: "Tipo de Viajero",
      sortBy: "Ordenar Por",
      newest: "Más Recientes",
      oldest: "Más Antiguos",
      highestRated: "Mejor Valorados",
      lowestRated: "Peor Valorados",
      family: "Familia",
      couple: "Pareja",
      solo: "Solo",
      friends: "Amigos",
      allTypes: "Todos los Tipos"
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
    },
    filter: {
      title: "Bewertungen Filtern",
      destination: "Reiseziel",
      all: "Alle Reiseziele",
      travelerType: "Reisetyp",
      sortBy: "Sortieren Nach",
      newest: "Neueste zuerst",
      oldest: "Älteste zuerst",
      highestRated: "Beste Bewertung",
      lowestRated: "Schlechteste Bewertung",
      family: "Familie",
      couple: "Paar",
      solo: "Alleinreisend",
      friends: "Freunde",
      allTypes: "Alle Typen"
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
    },
    filter: {
      title: "סינון ביקורות",
      destination: "יעד",
      all: "כל היעדים",
      travelerType: "סוג מטייל",
      sortBy: "מיין לפי",
      newest: "החדש ביותר",
      oldest: "הישן ביותר",
      highestRated: "הדירוג הגבוה ביותר",
      lowestRated: "הדירוג הנמוך ביותר",
      family: "משפחה",
      couple: "זוג",
      solo: "לבד",
      friends: "חברים",
      allTypes: "כל הסוגים"
    }
  }
};

const destinations = ['Paris', 'London', 'Rome', 'Barcelona', 'Amsterdam'];
const travelerTypes = ['family', 'couple', 'solo', 'friends'] as const;
const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;

type LanguageCode = keyof typeof translations;

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTravelerType, setSelectedTravelerType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<typeof sortOptions[number]>('newest');

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

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const filterAndSortReviews = (reviews: Review[]) => {
    let filtered = [...reviews];

    // Filter by destination
    if (selectedDestination !== 'all') {
      filtered = filtered.filter(review => review.destination === selectedDestination);
    }

    // Filter by traveler type
    if (selectedTravelerType !== 'all') {
      filtered = filtered.filter(review => review.traveler_type === selectedTravelerType);
    }

    // Sort reviews
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

          <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/20 shadow-lg transition-all hover:shadow-xl ${textAlignment}`}>
            <h2 className="text-2xl font-semibold mb-6">{t.addReview}</h2>
            
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

          <div className="space-y-6">
            <h2 className={`text-2xl font-semibold mb-8 ${textAlignment}`}>{t.recentReviews}</h2>
            
            <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8 ${textAlignment}`}>
              <h3 className="text-lg font-semibold mb-4">{t.filter.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Destination Filter */}
                <div>
                  <label className="block text-sm mb-2">{t.filter.destination}</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md p-2"
                  >
                    <option value="all">{t.filter.all}</option>
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                {/* Traveler Type Filter */}
                <div>
                  <label className="block text-sm mb-2">{t.filter.travelerType}</label>
                  <select
                    value={selectedTravelerType}
                    onChange={(e) => setSelectedTravelerType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md p-2"
                  >
                    <option value="all">{t.filter.allTypes}</option>
                    {travelerTypes.map(type => (
                      <option key={type} value={type}>{t.filter[type]}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm mb-2">{t.filter.sortBy}</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortOptions[number])}
                    className="w-full bg-white/5 border border-white/10 rounded-md p-2"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{t.filter[option]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-muted-foreground">No reviews yet</div>
            ) : (
              filterAndSortReviews(reviews).map((review) => (
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
