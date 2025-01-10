import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LePetitPalace = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            חזרה לדף הבית
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative h-[50vh] rounded-xl overflow-hidden mb-8">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80"
            alt="Le Petit Palace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 p-8 text-white">
            <h1 className="font-display text-4xl md:text-5xl mb-2">Le Petit Palace</h1>
            <p className="text-xl">פריז, צרפת</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="font-display text-2xl mb-4">אודות המלון</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le Petit Palace הוא מלון בוטיק יוקרתי הממוקם בלב פריז, המציע חוויה ייחודית לאורחים עם רגישויות למזון. 
                המלון שלנו מתגאה במטבח מותאם אישית המספק אפשרויות קולינריות מגוונות לאורחים עם אלרגיות שונות.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4">התאמות אלרגיות</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["גלוטן", "חלב", "אגוזים"].map((allergy) => (
                  <div key={allergy} className="bg-primary/10 p-4 rounded-lg text-center">
                    <span className="text-primary font-medium">{allergy}-free</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bg-muted p-6 rounded-xl h-fit">
            <h3 className="font-display text-xl mb-4">מידע שימושי</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>✓ צוות מיומן בטיפול באלרגיות מזון</li>
              <li>✓ תפריט מותאם אישית</li>
              <li>✓ מטבח נפרד למזון אלרגני</li>
              <li>✓ קרבה למרכזי רפואה</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LePetitPalace;