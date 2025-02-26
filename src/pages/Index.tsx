
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle, Hotel, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";
import { HOME_CONTENT } from "@/constants/home";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const hotelTypes = [
  { id: 'luxury', label: 'Luxury Hotels', icon: Hotel },
  { id: 'family', label: 'Family-Friendly', icon: Home },
  { id: 'apartment', label: 'Vacation Rentals', icon: Home },
];

const allergyTypes = [
  { id: 'dairy', label: 'Dairy-Free' },
  { id: 'gluten', label: 'Gluten-Free' },
  { id: 'nuts', label: 'Nut-Free' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold text-blue-700 hover:text-blue-800 transition-colors">
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {HOME_CONTENT.navigation.menu.items.map((item) => (
              <Link 
                key={item.title}
                to={item.href}
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden">
            <MainMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section with Dark Overlay */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <picture>
          <source srcSet="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fm=webp&q=90" type="image/webp" />
          <img 
            src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=90" 
            alt="Luxury hotel interior" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white">
              {HOME_CONTENT.hero.title.line1}
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                {HOME_CONTENT.hero.title.line2} {HOME_CONTENT.hero.title.line3}
              </span>
            </h1>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              {HOME_CONTENT.hero.description}
            </h2>

            {/* Enhanced Search Section */}
            <div className="bg-white/95 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
              <Tabs defaultValue="hotels" className="mb-8">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {hotelTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {hotelTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {allergyTypes.map((allergy) => (
                        <Button
                          key={allergy.id}
                          variant="outline"
                          className="rounded-full"
                          size="sm"
                        >
                          {allergy.label}
                        </Button>
                      ))}
                    </div>
                    <SearchBar />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Reviews Section */}
            <div>
              <h2 className="font-display text-3xl mb-6">Latest Reviews</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Share Your Experience</SheetTitle>
                    <SheetDescription>
                      Help others by sharing your allergy-friendly travel experience
                    </SheetDescription>
                  </SheetHeader>
                  {/* Review form will be added here */}
                </SheetContent>
              </Sheet>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="font-display text-3xl mb-6">Frequently Asked Questions</h2>
              {/* FAQ content will be added here */}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
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
