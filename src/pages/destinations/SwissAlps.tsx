
import React from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, Home, Users, Heart, Plane } from 'lucide-react';

const SwissAlps = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Hotels in the Swiss Alps | Safe Travel Guide 2025";
  const pageDescription = "Discover top allergy-friendly accommodations in the Swiss Alps. Hotels, chalets and Airbnbs in Zermatt, St. Moritz, and Lauterbrunnen for gluten-free, dairy-free, and nut-free travelers.";
  const pageKeywords = "Swiss Alps allergy-friendly hotels, gluten-free hotel Switzerland, allergy-safe chalets, dairy-free Zermatt, celiac travel St. Moritz";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/swiss-alps";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Allergy-Free Travel" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelArticle",
            "headline": "Allergy-Friendly Hotels in the Swiss Alps (2025 Guide)",
            "description": pageDescription,
            "image": "https://images.unsplash.com/photo-1531795111688-29bdb52406dc?auto=format&fit=crop&w=1200&q=80",
            "author": {
              "@type": "Organization",
              "name": "Allergy-Free Travel"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png"
              }
            },
            "datePublished": new Date().toISOString().split('T')[0],
            "dateModified": new Date().toISOString().split('T')[0]
          })}
        </script>
      </Helmet>
      <DestinationReviews destinationId="swiss-alps" />
      
      {/* Additional content sections based on the HTML */}
      <div className="container mx-auto px-3 sm:px-5 lg:px-6 py-8 bg-background">
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">🏡 Allergy-Friendly Airbnbs & Chalets</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">🏡 Haus Andorra – Airbnb, Zermatt</h3>
                  <p className="text-muted-foreground">
                    Private Alpine Apartment<br />
                    📍 Zermatt, quiet residential area<br />
                    🎯 Ideal for families or solo travelers who prefer self-catering
                  </p>
                  <ul className="space-y-1">
                    <li>✅ Allergy-safe kitchen with separate utensils</li>
                    <li>🧼 Fragrance-free cleaning products</li>
                    <li>🛒 Hosts offer optional gluten-free pantry stocking</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                    "The host made sure the kitchen was deep-cleaned before we arrived. I cooked safely all week."<br />— Leo M.
                  </blockquote>
                  <a 
                    href="https://www.airbnb.com/rooms/andorra-zermatt?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=swissalps_airbnb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:underline"
                  >
                    🔗 View Listing
                  </a>
                </div>
                
                <div className="space-y-3 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">🏡 Chesa Plattner – Airbnb, Pontresina (St. Moritz)</h3>
                  <p className="text-muted-foreground">
                    Chalet-Style Apartment<br />
                    📍 Pontresina, near St. Moritz<br />
                    🎯 Great for quiet, allergy-conscious self-caterers
                  </p>
                  <ul className="space-y-1">
                    <li>✅ Kitchen stocked with allergen-safe cookware</li>
                    <li>🧺 Optional GF/vegan welcome basket</li>
                    <li>🐾 Pet-free, scent-free home</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                    "No scented products, spotless surfaces, and I felt completely in control."<br />— Nina S.
                  </blockquote>
                  <a 
                    href="https://www.airbnb.com/rooms/chesa-plattner?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=swissalps_airbnb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:underline"
                  >
                    🔗 View Listing
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">✈️ Final Thoughts</h2>
              </div>
              
              <p className="text-lg leading-relaxed">
                From allergy-aware chefs to spotless kitchens and labeled menus, the Swiss Alps now offer peace of mind alongside natural beauty. Whether you stay in a hotel or a private chalet, your health doesn't have to stay behind.
              </p>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Planning Your Swiss Alps Trip?</h3>
                <p className="mb-3">Explore our other destination guides for allergy-friendly travel:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Link to="/destinations/paris" className="text-primary hover:underline">Paris Guide</Link>
                  <Link to="/destinations/london" className="text-primary hover:underline">London Guide</Link>
                  <Link to="/destinations/barcelona" className="text-primary hover:underline">Barcelona Guide</Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SwissAlps;
