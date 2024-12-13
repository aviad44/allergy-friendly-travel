import { SearchBar } from "@/components/SearchBar";
import { FeaturedHotels } from "@/components/FeaturedHotels";
import { Button } from "@/components/ui/button";
import { Bot, Menu, MapPin, Star, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";

const menuItems = [
  { title: "Destinations", href: "/destinations", icon: MapPin },
  { title: "Traveler Reviews", href: "/reviews", icon: Star },
  { title: "Contact Us", href: "/contact", icon: Shield },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors"
          >
            Allergy Free Travel
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-secondary/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors hover:bg-secondary/10 hover:text-secondary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd)',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/20 shadow-2xl animate-fadeIn">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              Find Your Perfect <br />
              <span className="text-primary font-bold">Allergy-Friendly</span> Hotel
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover accommodations that cater to your specific needs and enjoy worry-free travels. 
              Our curated selection ensures your safety and comfort.
            </p>
            <div className="bg-white/95 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            Allergy Friendly Destinations Best Hotels
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Carefully selected accommodations with proven track records in allergy management
          </p>
          <FeaturedHotels />
        </div>
      </section>

      {/* GPT Assistant */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-center">
            Need Personalized Recommendations?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Our AI assistant can help you find the perfect hotel based on your specific needs and allergies.
          </p>
          <ChatInterface />
        </div>
      </section>
    </div>
  );
};

export default Index;
