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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

export default Categories;