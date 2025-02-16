
import { MapPin, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Destinations",
    description: "Discover allergy-friendly hotels and resorts across the globe",
    icon: MapPin,
    href: "/destinations",
    color: "bg-gradient-to-br from-primary/10 to-primary/20",
    iconColor: "text-primary",
    borderColor: "border-primary/20",
  },
  {
    title: "Traveler Reviews",
    description: "Read authentic experiences from fellow allergy-conscious travelers",
    icon: Star,
    href: "/reviews",
    color: "bg-gradient-to-br from-secondary/10 to-secondary/20",
    iconColor: "text-secondary",
    borderColor: "border-secondary/20",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team for personalized assistance",
    icon: Shield,
    href: "/contact",
    color: "bg-gradient-to-br from-accent/10 to-accent/20",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
  },
];

const destinationArticles = [
  {
    id: 1,
    title: "Luxury Retreat in Swiss Alps",
    description: "Experience allergy-safe luxury in the heart of Switzerland",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: 2,
    title: "Beachfront Paradise in Maldives",
    description: "Discover hypoallergenic accommodations by the ocean",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  },
  {
    id: 3,
    title: "Urban Sanctuary in Tokyo",
    description: "Modern allergen-free living in Japan's capital",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
  },
  {
    id: 4,
    title: "Mountain Lodge in Colorado",
    description: "Clean mountain air and allergy-conscious comfort",
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Explore our comprehensive range of services designed to make your travel experience safe and enjoyable
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                to={category.href}
                className={`${category.color} p-8 rounded-2xl transition-all duration-300 hover:scale-105 group border ${category.borderColor} hover:shadow-xl relative overflow-hidden`}
              >
                <div className={`${category.iconColor} mb-6 transition-transform group-hover:scale-110`}>
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            )
          })}
        </div>

        {/* Destinations Articles Grid */}
        <div className="mt-16">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationArticles.map((article) => (
              <div 
                key={article.id}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20 bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-primary/10"
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
