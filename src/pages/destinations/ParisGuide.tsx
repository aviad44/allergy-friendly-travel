import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HotelSection from "@/components/hotels/HotelSection";
import AllergiesTable from "@/components/language/AllergiesTable";
import UsefulInfo from "@/components/hotels/UsefulInfo";

const RECOMMENDED_HOTELS = {
  couples: [
    {
      id: 1,
      name: "Le Bristol Paris",
      image: "https://www.oetkercollection.com/media/41686/le-bristol-paris-facade.jpg",
      description: "Le Bristol Paris מציע אפשרויות אירוח המותאמות במיוחד לאורחים עם אלרגיות למזון, כולל מטבח נפרד ופרוטוקולים קפדניים להכנת המזון.",
      allergies: ["גלוטן", "חלב", "אגוזים"],
      rating: 4.9,
      priceRange: "€€€€",
      website: "https://www.oetkercollection.com/hotels/le-bristol-paris/",
      features: [
        "מטבח ייעודי לאוכל ללא אלרגנים",
        "ייעוץ אלרגיות לפני ההגעה",
        "סיוע רפואי 24/7",
        "תכנון תפריט מותאם אישית"
      ],
      reviews: []
    },
    {
      id: 2,
      name: "Ritz Paris",
      image: "https://www.ritzparis.com/sites/default/files/styles/1440x656/public/images/home_0.jpg",
      description: "מלון Ritz Paris מקפיד על פרוטוקולים מחמירים לניהול אלרגנים ומציע חוויות קולינריות מותאמות אישית בהתראה מראש.",
      allergies: ["גלוטן", "חלב"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.ritzparis.com",
      features: [
        "אפשרויות אוכל ללא אלרגנים",
        "צוות רפואי במקום",
        "הכנת ארוחות בהתאמה אישית",
        "פרוטוקולים למניעת זיהום צולב"
      ],
      reviews: []
    }
  ],
  families: [
    {
      id: 3,
      name: "Four Seasons George V",
      image: "https://www.fourseasons.com/paris/landing/homepage-hero-1.jpg",
      description: "Four Seasons George V מספק פרוטוקולים מקיפים לניהול אלרגיות ותפריטי ילדים המותאמים להגבלות תזונתיות שונות.",
      allergies: ["גלוטן", "חלב", "אגוזים"],
      rating: 4.8,
      priceRange: "€€€€",
      website: "https://www.fourseasons.com/paris/",
      features: [
        "תפריטים ייעודיים ללא אלרגנים",
        "תמיכה רפואית במקום",
        "הכנת חדר ללא אלרגנים",
        "צוות מיומן בפרוטוקולי אלרגיה"
      ],
      reviews: []
    },
    {
      id: 4,
      name: "Novotel Paris Centre Tour Eiffel",
      image: "https://www.novotelparis.com/wp-content/uploads/2019/01/novotel-paris-centre-tour-eiffel-exterior.jpg",
      description: "Novotel Paris Centre Tour Eiffel מציע פרוטוקולים סטנדרטיים לאלרגיות בכל מתקני האוכל והאירוח שלהם.",
      allergies: ["גלוטן", "חלב"],
      rating: 4.5,
      priceRange: "€€€",
      website: "https://novotel.accor.com/paris",
      features: [
        "אפשרויות תפריט ללא אלרגנים",
        "צוות מודע לאלרגיות",
        "סימון אלרגנים ברור",
        "סיוע רפואי זמין"
      ],
      reviews: []
    }
  ]
};

const ParisGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 ml-2" />
            חזרה ליעדים
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative h-[60vh] rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
            alt="נוף פריז"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <h1 className="font-display text-5xl md:text-6xl mb-4">פריז</h1>
            <p className="text-xl max-w-2xl">מדריך מקיף לאירוח ואוכל ידידותי לאלרגיות בעיר האורות</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <h2 className="font-display text-3xl mb-6">אכילה בטוחה בפריז</h2>
          
          <div className="float-right mr-6 mb-6 w-1/3">
            <img
              src="https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
              alt="בית קפה פריזאי"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">מסעדות פריזאיות מודרניות מתאימות את עצמן יותר ויותר להגבלות תזונתיות</p>
          </div>

          <p>
            פריז התפתחה משמעותית בשנים האחרונות בכל הנוגע לאירוח סועדים עם אלרגיות למזון.
            המוסדות המובילים בעיר כעת גאים ביכולתם לספק חוויות קולינריות בטוחות וללא אלרגנים,
            מבלי להתפשר על המצוינות הקולינרית הצרפתית המפורסמת.
          </p>
        </article>

        {/* Hotel Sections */}
        <HotelSection
          title="מלונות רומנטיים לזוגות"
          type="couples"
          hotels={RECOMMENDED_HOTELS.couples}
        />

        <HotelSection
          title="מלונות ידידותיים למשפחות"
          type="families"
          hotels={RECOMMENDED_HOTELS.families}
        />

        {/* Additional Information */}
        <UsefulInfo />

        {/* French-English Dictionary */}
        <AllergiesTable />
      </div>
    </div>
  );
};

export default ParisGuide;