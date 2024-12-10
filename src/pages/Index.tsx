import { SearchBar } from "@/components/SearchBar";
import { FeaturedHotels } from "@/components/FeaturedHotels";
import { Button } from "@/components/ui/button";
import { Bot, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Destinations", href: "/destinations" },
  { title: "Traveler Reviews", href: "/reviews" },
  { title: "Contact Us", href: "/contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-display font-bold text-secondary">
            AllergyFree Travel
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-secondary"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719508461-905c673771fd)',
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm">
            <h1 className="font-display text-4xl md:text-6xl mb-6 text-white animate-fadeIn">
              Find Your Perfect Allergy-Friendly Hotel
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Discover accommodations that cater to your specific needs and enjoy worry-free travels
            </p>
            <div className="bg-white/95 p-6 rounded-lg shadow-lg">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">
            Featured Allergy-Friendly Hotels
          </h2>
          <FeaturedHotels />
        </div>
      </section>

      {/* GPT Assistant */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Need Personalized Recommendations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI assistant can help you find the perfect hotel based on your specific needs and allergies.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">
            <Bot className="mr-2 h-5 w-5" />
            Chat with our AI Assistant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;