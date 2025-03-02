
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
    image: "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png",
    href: "/destinations/cyprus",
    tags: ["Dairy-Free", "Gluten-Free"]
  },
  {
    id: 4,
    title: "Crete Guide",
    description: "Experience Greek hospitality with peace of mind",
    image: "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png",
    href: "/destinations/crete",
    tags: ["Gluten-Free", "Mediterranean"]
  },
  {
    id: 5,
    title: "Abu Dhabi Guide",
    description: "Luxury stays with world-class allergy accommodations in the UAE capital",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&q=80",
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
  },
  {
    id: 7,
    title: "Thailand Guide",
    description: "The ultimate guide to allergy-friendly hotels and dining across Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=80",
    href: "/destinations/thailand",
    tags: ["Gluten-Free", "Peanut-Free", "Seafood-Free"]
  }
];

const Destinations = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-6xl">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <div className="flex gap-1 sm:gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Home</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.code)}
                      className="text-xs sm:text-sm"
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
          <div className="mb-6 sm:mb-8 md:mb-12 bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 md:p-8 border border-primary/10">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6 text-center">
              Find Your Perfect Destination
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8 text-center max-w-2xl mx-auto">
              Search for allergy-friendly destinations and accommodations worldwide
            </p>
            <SearchBar />
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">{article.title}</h3>
                      <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{article.description}</p>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full"
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
