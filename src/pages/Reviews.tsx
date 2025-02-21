
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
      author: "אורח" // In a real app, this would come from the logged-in user
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <MainMenu />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">ביקורות מטיילים</h1>
          <p className="text-lg text-muted-foreground">שתף את החוויה שלך ועזור למטיילים אחרים</p>
        </div>

        {/* Add Review Form */}
        <div className="bg-card rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">הוסף ביקורת</h2>
          
          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-6" dir="rtl">
            <span className="text-sm text-muted-foreground ml-2">דירוג:</span>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingClick(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="שתף את החוויה שלך..."
              className="min-h-[120px]"
              dir="rtl"
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            className="w-full sm:w-auto"
          >
            <Send className="h-4 w-4 mr-2" />
            שלח ביקורת
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">ביקורות אחרונות</h2>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2" dir="rtl">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <p className="mb-4 text-right">{review.text}</p>
              <p className="text-sm text-muted-foreground text-right">נכתב על ידי: {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
