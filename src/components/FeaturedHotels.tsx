
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

const FEATURED_HOTELS = [
  {
    id: 1,
    name: "Le Petit Palace",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?fm=webp&fit=crop&w=800&q=80",
    webp: "https://images.unsplash.com/photo-1501854140801-50d01698950b?fm=webp&fit=crop&w=800&q=80",
    srcSet: `
      https://images.unsplash.com/photo-1501854140801-50d01698950b?fm=webp&w=400&q=75 400w,
      https://images.unsplash.com/photo-1501854140801-50d01698950b?fm=webp&w=800&q=80 800w,
      https://images.unsplash.com/photo-1501854140801-50d01698950b?fm=webp&w=1200&q=85 1200w
    `,
    allergies: ["Gluten", "Dairy", "Nuts"],
    href: "/hotels/le-petit-palace"
  },
  {
    id: 2,
    name: "Wellness & Care Hotel",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&fit=crop&w=800&q=80",
    webp: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&fit=crop&w=800&q=80",
    srcSet: `
      https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&w=400&q=75 400w,
      https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&w=800&q=80 800w,
      https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&w=1200&q=85 1200w
    `,
    allergies: ["Dairy", "Seafood"],
    href: "#"
  },
  {
    id: 3,
    name: "Safe Haven Resort",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&fit=crop&w=800&q=80",
    webp: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&fit=crop&w=800&q=80",
    srcSet: `
      https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&w=400&q=75 400w,
      https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&w=800&q=80 800w,
      https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&w=1200&q=85 1200w
    `,
    allergies: ["Gluten", "Soy", "Eggs"],
    href: "#"
  },
];

export const FeaturedHotels = () => {
  // Track loaded state for each image
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURED_HOTELS.map((hotel) => (
        <Link to={hotel.href} key={hotel.id}>
          <Card className="overflow-hidden group cursor-pointer h-full">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* Loading placeholder */}
              {!loadedImages[hotel.id] && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white font-medium">{hotel.name}</span>
                  </div>
                </div>
              )}
              
              {/* WebP optimized image */}
              <picture>
                <source type="image/webp" srcSet={hotel.srcSet} sizes="(max-width: 768px) 100vw, 33vw" />
                <img
                  src={hotel.image}
                  alt={`${hotel.name} in ${hotel.location}`}
                  className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${loadedImages[hotel.id] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(hotel.id)}
                  loading="lazy"
                  width="800"
                  height="500"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="p-4">
              <h3 className="font-display text-xl mb-1">{hotel.name}</h3>
              <p className="text-muted-foreground mb-2">{hotel.location}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {allergy}-free
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
