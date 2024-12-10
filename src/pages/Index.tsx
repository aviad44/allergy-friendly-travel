import { SearchBar } from "@/components/SearchBar";
import { FeaturedHotels } from "@/components/FeaturedHotels";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151)',
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