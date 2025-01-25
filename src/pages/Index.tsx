import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle, Menu } from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { HOME_CONTENT } from "@/constants/home";
import { lazy, Suspense } from "react";

// Lazy load the chat interface
const LazyChat = lazy(() => import("@/components/ChatInterface").then(module => ({ default: module.ChatInterface })));

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors dark:text-white"
            aria-label="Return to homepage"
          >
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-secondary/10 dark:hover:bg-white/10"
                aria-label={HOME_CONTENT.navigation.menu.label}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {HOME_CONTENT.navigation.menu.items.map((item) => {
                  const Icon = {
                    MapPin,
                    Star,
                    Shield,
                    Info,
                    HelpCircle
                  }[item.icon as keyof typeof icons];

                  return (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors hover:bg-secondary/10 hover:text-secondary dark:hover:bg-white/10 dark:hover:text-white"
                      )}
                      aria-label={`Navigate to ${item.title}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
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
        {/* Background Image with optimized loading */}
        <picture>
          <source
            srcSet="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fm=webp&q=80"
            type="image/webp"
          />
          <img
            src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/20 shadow-2xl animate-fadeIn">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
              {HOME_CONTENT.hero.title.line1}
              <span className="block mt-2">
                {HOME_CONTENT.hero.title.line2}
              </span>
              {HOME_CONTENT.hero.title.line3}
            </h1>
            <p className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
              {HOME_CONTENT.hero.description}
            </p>
            <div className="bg-white/95 dark:bg-gray-900/95 p-6 rounded-xl shadow-lg">
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

      {/* GPT Assistant */}
      <section className="py-20 px-4 bg-secondary/5 dark:bg-gray-800">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-center dark:text-white">
            {HOME_CONTENT.assistant.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.assistant.description}
          </p>
          <Suspense fallback={
            <div className="flex items-center justify-center h-[600px] bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="animate-pulse">Loading chat interface...</div>
            </div>
          }>
            <LazyChat />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Index;