import { MapPin, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Destinations",
    description: "Discover allergy-friendly hotels and resorts across the globe",
    icon: MapPin,
    href: "/destinations",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Traveler Reviews",
    description: "Read authentic experiences from fellow allergy-conscious travelers",
    icon: Star,
    href: "/reviews",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team for personalized assistance",
    icon: Shield,
    href: "/contact",
    color: "bg-accent/10",
    iconColor: "text-accent",
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
        <h1 className="font-display text-4xl md:text-5xl mb-6 text-center">
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
                className={`${category.color} p-6 rounded-xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className={`${category.iconColor} mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Destinations Articles Grid */}
        <div className="mt-16">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationArticles.map((article) => (
              <div 
                key={article.id}
                className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-1">
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