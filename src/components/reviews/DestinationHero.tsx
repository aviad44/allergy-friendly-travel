
import { Destination } from "@/types/reviews";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  const imageUrl = destination.image.startsWith('photo-') 
    ? `https://images.unsplash.com/photo-${destination.image.replace('photo-', '')}?auto=format&fit=crop&w=2000&q=80`
    : destination.image.startsWith('lovable-uploads/') 
      ? `/${destination.image}`
      : `/${destination.image}`;

  return (
    <div 
      className="h-[50vh] relative overflow-hidden"
      role="img"
      aria-label={`Scenic view of ${destination.name}`}
    >
      <div 
        className="absolute inset-0 bg-center bg-cover animate-hero-zoom"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
    </div>
  );
};
