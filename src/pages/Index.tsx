
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { HOME_CONTENT } from "@/constants/home";

const Index = () => {
  const iconComponents = {
    MapPin,
    Star,
    Shield,
    Info,
    HelpCircle
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors dark:text-white" aria-label="Return to homepage">
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-secondary/10 dark:hover:bg-white/10" aria-label={HOME_CONTENT.navigation.menu.label}>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {HOME_CONTENT.navigation.menu.items.map(item => {
                const Icon = iconComponents[item.icon as keyof typeof iconComponents];
                return <Link key={item.title} to={item.href} className={cn("flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors hover:bg-secondary/10 hover:text-secondary dark:hover:bg-white/10 dark:hover:text-white")} aria-label={`Navigate to ${item.title}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {item.title}
                    </Link>;
              })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with optimized loading */}
        <picture>
          <source
            srcSet="https://images.unsplash.com/photo-1455587734955-081b22074882?fm=webp&q=90"
            type="image/webp"
          />
          <img
            src="https://images.unsplash.com/photo-1455587734955-081b22074882?q=90"
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-125"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="bg-black/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight text-amber-200">
              {HOME_CONTENT.hero.title.line1}
              <span className="block mt-2">
                {HOME_CONTENT.hero.title.line2} {HOME_CONTENT.hero.title.line3}
              </span>
            </h1>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
              {HOME_CONTENT.hero.description}
            </h2>
            <div className="bg-white/95 dark:bg-gray-900/95 p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300 border border-primary/20">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center dark:text-white">
            {HOME_CONTENT.featured.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.featured.description}
          </p>
          <FeaturedDestinations />
        </div>
      </section>
    </div>
  );
};

export default Index;
