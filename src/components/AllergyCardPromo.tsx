import { Link } from "react-router-dom";
import { Languages } from "lucide-react";

// Contextual internal link to /allergy-translation-card, dropped into every
// destination and restaurant guide (both the ~35 auto-generated articles via
// ArticleDetail/RestaurantDetail, and the 26 curated destination pages via
// DestinationReviews). The tool itself has real SEO/GEO value (see the fixes
// on that page) but had almost no internal links pointing to it from the
// rest of the site — this is that link, framed as a genuinely useful next
// step for someone reading a destination guide, not a boilerplate footer ad.
export const AllergyCardPromo = () => (
  <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
    <Languages className="h-8 w-8 text-primary/70 shrink-0" aria-hidden="true" />
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-1">Before you go: prepare an allergy translation card</h2>
      <p className="text-sm text-muted-foreground">
        Free tool, 28 languages. Generate a printable card that explains your allergies clearly to restaurant and hotel staff, wherever you're headed.
      </p>
    </div>
    <Link
      to="/allergy-translation-card"
      className="shrink-0 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
    >
      Generate my card →
    </Link>
  </div>
);
