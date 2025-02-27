
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Home } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { MainMenu } from "@/components/MainMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'he', name: 'עברית' }
];

const destinationArticles = [
  {
    id: 1,
    title: "Paris Guide",
    description: "A Comprehensive Guide to Allergy-Friendly Hotels and Dining in the City of Light",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/paris",
    tags: ["Gluten-Free", "Dairy-Free", "Nut-Free"]
  },
  {
    id: 2,
    title: "London Guide",
    description: "Explore allergy-friendly accommodations in the heart of England",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/london",
    tags: ["Gluten-Free", "Vegan"]
  },
  {
    id: 3,
    title: "Cyprus Guide",
    description: "Find the best allergy-friendly hotels and dining options across the island",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/cyprus",
    tags: ["Dairy-Free", "Gluten-Free"]
  },
  {
    id: 4,
    title: "Crete Guide",
    description: "Experience Greek hospitality with peace of mind",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/crete",
    tags: ["Gluten-Free", "Mediterranean"]
  },
  {
    id: 5,
    title: "Abu Dhabi Guide",
    description: "Luxury stays with world-class allergy accommodations in the UAE capital",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/abu-dhabi",
    tags: ["Luxury", "Family-Friendly", "Allergy-Safe"]
  },
  {
    id: 6,
    title: "Barcelona Guide",
    description: "Allergy-friendly tapas and Mediterranean delights in the Catalan capital",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/barcelona",
    tags: ["Gluten-Free", "Shellfish-Free"]
  }
];

const Destinations = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="ghost">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.code)}
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <MainMenu />
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-12 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-primary/10">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-center">
              Find Your Perfect Destination
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Search for allergy-friendly destinations and accommodations worldwide
            </p>
            <SearchBar />
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinationArticles.map((article) => (
              <Link key={article.id} to={article.href}>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{article.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
