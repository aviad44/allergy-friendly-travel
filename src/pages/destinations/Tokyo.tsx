
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { destinations, destinationData } from "@/types/reviews";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { Separator } from "@/components/ui/separator";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const TokyoReviews = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'tokyo')!;
  const content = destinationData['tokyo'];
  
  // Create a custom destination object with all required properties
  const tokyoDestination = {
    id: destination.id,
    name: destination.name,
    country: destination.country,
    description: destination.description || "Allergy-Friendly Hotels in Tokyo",
    subtitle: destination.subtitle || "Safe accommodations for travelers with food allergies in Japan",
    image: DESTINATION_IMAGES.tokyo
  };

  // SEO metadata
  const pageTitle = "Top 10 Allergy-Friendly Hotels in Tokyo for Travelers with Food Allergies";
  const pageDescription = "Discover the best allergy-friendly hotels in Tokyo for travelers with celiac disease, gluten intolerance, dairy, nut, and egg allergies. Includes real guest reviews and booking links.";
  const pageKeywords = "Tokyo allergy friendly hotels, celiac safe hotel Tokyo, gluten free hotels Tokyo, nut allergy hotel Tokyo, dairy free travel Japan";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/tokyo";
  const publishDate = "2024-06-15";
  const modifiedDate = new Date().toISOString().split('T')[0];

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
        <meta property="og:image" content="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": publishDate,
            "dateModified": modifiedDate,
            "about": {
              "@type": "City",
              "name": "Tokyo",
              "description": "Capital city of Japan"
            },
            "audience": "Travelers with food allergies or dietary restrictions",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "The Capitol Hotel Tokyu",
                  "description": "5-star hotel with staff trained in food allergy management"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Park Hyatt Tokyo",
                  "description": "5-star hotel with allergy-conscious fine dining options"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <DestinationHero destination={tokyoDestination} />

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
                {content?.intro || "Tokyo offers unique challenges for travelers with food allergies. Finding hotels with staff trained in allergen management is essential for a safe and enjoyable visit to Japan's bustling capital."}
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6 text-left">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-left">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content?.hotels?.map((hotel, index) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </section>

          <TravelTips tips={content?.tips || []} />

          <div className="overflow-x-auto">
            {content?.languageTable && (
              <LanguageTable 
                data={content.languageTable}
                destinationName={destination.name}
              />
            )}
          </div>
        </article>
      </main>
    </div>
  );
};

export default TokyoReviews;
