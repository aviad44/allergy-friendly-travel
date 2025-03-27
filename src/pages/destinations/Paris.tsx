
import { useState } from "react";
import { destinations, destinationData } from "@/types/reviews";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { Separator } from "@/components/ui/separator";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { Helmet } from "react-helmet";

const Paris = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'paris')!;
  const content = destinationData['paris'];
  
  // Create a custom destination object with all required properties
  const parisDestination = {
    id: destination.id,
    name: destination.name,
    country: destination.country,
    description: destination.description || "Allergy-Friendly Hotels in Paris",
    subtitle: destination.subtitle || "Safe dining options for travelers with dietary restrictions",
    image: DESTINATION_IMAGES.paris
  };

  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in Paris | Safe Dining for Dietary Restrictions";
  const pageDescription = "Discover the best allergy-friendly hotels in Paris. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.";
  const pageKeywords = "allergy-friendly paris, gluten-free hotels paris, food allergies paris, paris hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/paris";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": "2024-06-10",
            "dateModified": "2024-06-10",
            "about": {
              "@type": "City",
              "name": "Paris",
              "description": "Capital city of France"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>

      <DestinationHero destination={parisDestination} />

      <main 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10 text-left"
        itemScope
        itemType="https://schema.org/Article"
      >
        <DestinationNavigation 
          currentLanguage={currentLanguage as any} 
          setCurrentLanguage={setCurrentLanguage as any}
        />

        <article className="space-y-8 md:space-y-12 text-left">
          <header className="text-left space-y-4">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-left"
              itemProp="headline"
            >
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground text-left">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4 text-left">
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p 
                className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed text-left"
                itemProp="description"
              >
                {content.intro}
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6 text-left">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-left">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </section>

          <TravelTips tips={content.tips} />

          <div className="overflow-x-auto">
            <LanguageTable 
              data={content.languageTable}
              destinationName={destination.name}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default Paris;
