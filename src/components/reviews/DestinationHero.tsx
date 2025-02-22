
import { Destination } from "@/types/reviews";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  const imageUrl = destination.image.startsWith('photo-') 
    ? `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80`
    : destination.image.startsWith('public/') 
      ? destination.image.replace('public/', '/')
      : `/${destination.image}`;

  return (
    <div 
      className="h-[50vh] bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: '50% 65%'
      }}
      role="img"
      aria-label={`Scenic view of ${destination.name}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
    </div>
  );
};
