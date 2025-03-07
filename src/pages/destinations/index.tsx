
import { useState } from "react";
import { Helmet } from "react-helmet";
import { MainMenu } from "@/components/MainMenu";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const destinationsData = [
  {
    name: "Paris",
    description: "The City of Lights, known for its romantic ambiance and iconic landmarks.",
    imageUrl: "/images/destinations/paris.jpg",
    allergyInfo: "Many restaurants offer gluten-free and dairy-free options. Be sure to communicate your needs clearly.",
    link: "/destinations/paris",
  },
  {
    name: "London",
    description: "A vibrant city with a rich history and diverse culinary scene.",
    imageUrl: "/images/destinations/london.jpg",
    allergyInfo: "London has a wide range of allergy-friendly restaurants and accommodations.",
    link: "/destinations/london",
  },
  {
    name: "Crete",
    description: "The largest of the Greek islands, offering stunning beaches and ancient ruins.",
    imageUrl: "/images/destinations/crete.jpg",
    allergyInfo: "Traditional Cretan cuisine often uses fresh, local ingredients, making it easier to find allergy-friendly options.",
    link: "/destinations/crete",
  },
  {
    name: "Barcelona",
    description: "A cosmopolitan city known for its art, architecture, and delicious cuisine.",
    imageUrl: "/images/destinations/barcelona.jpg",
    allergyInfo: "Many restaurants in Barcelona are familiar with dietary restrictions and can accommodate various allergies.",
    link: "/destinations/barcelona",
  },
  {
    name: "Ayia Napa",
    description: "Famous for its beaches and vibrant nightlife.",
    imageUrl: "/images/destinations/ayia-napa.jpg",
    allergyInfo: "Resorts and restaurants in Ayia Napa are increasingly catering to guests with allergies.",
    link: "/destinations/ayia-napa",
  },
  {
    name: "Cyprus",
    description: "An island nation with a rich history and beautiful landscapes.",
    imageUrl: "/images/destinations/cyprus.jpg",
    allergyInfo: "Cypriot cuisine features many naturally gluten-free and dairy-free dishes.",
    link: "/destinations/cyprus",
  },
  {
    name: "Abu Dhabi",
    description: "A modern city with stunning architecture and cultural attractions.",
    imageUrl: "/images/destinations/abu-dhabi.jpg",
    allergyInfo: "Luxury hotels in Abu Dhabi are well-equipped to handle various dietary needs.",
    link: "/destinations/abu-dhabi",
  },
   {
    name: "Thailand",
    description: "Known for its tropical beaches, opulent royal palaces, ancient ruins and ornate temples.",
    imageUrl: "/images/destinations/thailand.jpg",
    allergyInfo: "Communicate your allergy needs clearly when dining out.",
    link: "/destinations/thailand",
  },
];

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, className }) => (
  <div className={`relative ${className}`}>
    <Input
      type="text"
      placeholder="Search destinations..."
      value={value}
      onChange={onChange}
      className="pl-10"
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Search className="h-4 w-4 text-muted-foreground" />
    </div>
  </div>
);

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinationsData.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Destinations | Allergy Free Travel</title>
        <meta name="description" content="Explore allergy-friendly travel destinations around the world." />
        <meta name="keywords" content="allergy-friendly travel, destinations, food allergies, travel advice, dietary restrictions" />
      </Helmet>

      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 text-xl font-bold text-primary">
              <img 
                src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
                alt="Allergy Free Travel Logo" 
                className="h-8" 
              />
              Allergy Free Travel
            </Link>
            <MainMenu />
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Explore Allergy-Friendly Destinations
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover amazing places around the world where you can travel with confidence, knowing your dietary needs are catered for.
              </p>
            </div>
            
            <div className="relative mx-auto max-w-3xl mt-6 mb-8">
              <SearchInput 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </section>
        
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={destination.imageUrl} 
                        alt={`${destination.name} - Allergy-friendly travel destination`}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-foreground mb-2">{destination.name}</h2>
                      <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <p className="text-sm text-primary font-medium mb-1">Allergy Information:</p>
                        <p className="text-muted-foreground text-xs">{destination.allergyInfo}</p>
                      </div>
                      <Link to={destination.link}>
                        <Button className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No destinations found matching your search.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Reset Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
