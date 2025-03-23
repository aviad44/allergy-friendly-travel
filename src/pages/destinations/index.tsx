
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { MainMenu } from "@/components/MainMenu";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { Helmet } from "react-helmet";
import { Footer } from "@/components/Footer";

const destinations = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    image: DESTINATION_IMAGES.london,
    description: "Discover allergen-friendly accommodations in the heart of England's capital.",
    path: "/destinations/london"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: DESTINATION_IMAGES.paris,
    description: "Enjoy the city of lights with peace of mind at these allergy-aware hotels.",
    path: "/destinations/paris"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    image: DESTINATION_IMAGES.barcelona,
    description: "Experience Catalan hospitality with allergen-conscious accommodations.",
    path: "/destinations/barcelona"
  },
  {
    id: "cyprus",
    name: "Cyprus",
    country: "Cyprus",
    image: DESTINATION_IMAGES.cyprus,
    description: "Discover the beauty of Cyprus with peace of mind at these allergy-friendly hotels.",
    path: "/destinations/cyprus"
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    country: "UAE",
    image: DESTINATION_IMAGES["abu-dhabi"],
    description: "Luxury accommodation with allergy considerations in the heart of the UAE.",
    path: "/destinations/abudhabi"
  },
  {
    id: "crete",
    name: "Crete",
    country: "Greece",
    image: DESTINATION_IMAGES.crete,
    description: "Relax on the beautiful Greek island with allergy-aware accommodations.",
    path: "/destinations/crete"
  }
];

const DestinationsIndex = () => {
  // SEO metadata
  const pageTitle = "Allergy-Friendly Travel Destinations | Safe Hotels Worldwide";
  const pageDescription = "Browse our comprehensive guide to allergy-friendly travel destinations worldwide. Find safe accommodations for dietary restrictions in top cities and regions.";
  const pageKeywords = "allergy-friendly destinations, food allergy travel, gluten-free travel destinations, allergy-conscious hotels worldwide";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations";
  
  // Current date for schema metadata
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": destinations.map((dest, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "TouristDestination",
                  "name": dest.name,
                  "description": dest.description,
                  "url": `https://www.allergy-free-travel.com${dest.path}`
                }
              }))
            },
            "name": pageTitle,
            "description": pageDescription,
            "url": canonicalUrl,
            "dateModified": currentDate
          })}
        </script>
      </Helmet>
      
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation - Adjusted spacing between elements */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            <span>Allergy Free Travel</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Section - Improved mobile transparency */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2731&q=80" 
            alt="Travel destinations" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-sky-200 font-bold">Discover</span>
            <span className="block mt-2 text-teal-300 font-bold">Allergy-Friendly Destinations</span>
          </h1>
          <p className="text-white text-lg md:text-xl mx-auto">
            Find the perfect accommodation that caters to your specific allergy needs
          </p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-8 md:py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} to={destination.path} className="group">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={destination.image.startsWith('photo-') 
                      ? `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=800&q=80` 
                      : destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-xl">{destination.name}</h3>
                    <p className="text-gray-200 text-sm">{destination.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3 text-sm">
                    {destination.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-medium text-sm">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DestinationsIndex;
