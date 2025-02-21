
import { useState } from "react";
import { Star, Home, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MainMenu } from "@/components/MainMenu";
import { useToast } from "@/components/ui/use-toast";

interface Review {
  id: number;
  rating: number;
  text: string;
  date: string;
  author: string;
}

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      rating: 5,
      text: "המלון היה נהדר והתחשב מאוד בצרכים שלי. המטבח הכין לי ארוחות מיוחדות בלי גלוטן.",
      date: "2024-03-20",
      author: "דניאל כהן"
    },
    {
      id: 2,
      rating: 4,
      text: "שירות מעולה, צוות מקצועי שהבין את הרגישויות שלי לאגוזים.",
      date: "2024-03-19",
      author: "רותם לוי"
    }
  ]);
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "שגיאה",
        description: "אנא בחר דירוג כוכבים",
        variant: "destructive"
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: "שגיאה",
        description: "אנא כתוב ביקורת של לפחות 10 תווים",
        variant: "destructive"
      });
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
      author: "אורח"
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");

    toast({
      title: "תודה!",
      description: "הביקורת שלך נוספה בהצלחה",
    });
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
            <MainMenu />
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ביקורות מטיילים
            </h1>
            <p className="text-lg text-muted-foreground">
              שתף את החוויה שלך ועזור למטיילים אחרים
            </p>
          </div>

          {/* Add Review Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/20 shadow-lg transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-right">הוסף ביקורת</h2>
            
            {/* Star Rating */}
            <div className="flex items-center gap-3 mb-6 justify-end">
              <span className="text-sm text-muted-foreground">דירוג:</span>
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
                placeholder="שתף את החוויה שלך..."
                className="min-h-[120px] bg-white/5 border-white/10 focus:border-primary/50 transition-all"
                dir="rtl"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4 ml-2" />
                שלח ביקורת
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8 text-right">ביקורות אחרונות</h2>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-muted-foreground">{review.date}</span>
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
                <p className="mb-4 text-right text-lg leading-relaxed">{review.text}</p>
                <p className="text-sm text-muted-foreground text-right">
                  נכתב על ידי: <span className="text-primary">{review.author}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
