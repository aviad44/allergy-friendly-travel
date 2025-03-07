
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
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { destinationsTranslations, getTranslatedDestinationArticles } from "./translations";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'he', name: 'עברית' }
];

const Destinations = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [destinationArticles, setDestinationArticles] = useState([]);
  const t = destinationsTranslations[currentLanguage];
  const isRTL = currentLanguage === 'he';
  
  useEffect(() => {
    // Update destination articles when language changes
    const translatedArticles = getTranslatedDestinationArticles(currentLanguage);
    setDestinationArticles(translatedArticles);
    
    // Set HTML language attribute for SEO
    document.documentElement.lang = currentLanguage;
    // Adjust text direction for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <html lang={currentLanguage} dir={isRTL ? 'rtl' : 'ltr'} />
        <title>{t.title} | Allergy-Friendly Travel Guide</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content={t.seoKeywords} />
        {/* Add hreflang tags for all supported languages */}
        {languages.map(lang => (
          <link 
            key={lang.code}
            rel="alternate" 
            hrefLang={lang.code} 
            href={`${window.location.origin}/destinations?lang=${lang.code}`} 
          />
        ))}
        <link rel="canonical" href={`${window.location.origin}/destinations`} />
      </Helmet>
      
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="relative z-10 flex-grow">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-6xl">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <div className="flex gap-1 sm:gap-2">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto">
                  <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">{t.home}</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border border-white/20">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setCurrentLanguage(language.code)}
                      className="text-xs sm:text-sm hover:bg-white/50"
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
              {t.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8 text-center max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <SearchBar placeholder={t.searchPlaceholder} />
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
      <Footer />
    </div>
  );
};

export default Destinations;
