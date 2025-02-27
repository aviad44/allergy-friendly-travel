
import { Destination } from "@/types/reviews";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  let imageUrl;

  // Process image URL based on format
  if (destination.image.startsWith('photo-')) {
    imageUrl = `https://images.unsplash.com/photo-${destination.image.replace('photo-', '')}?auto=format&fit=crop&w=2000&q=80`;
  } else if (destination.image.startsWith('lovable-uploads/')) {
    imageUrl = `/${destination.image}`;
  } else {
    imageUrl = `/${destination.image}`;
  }
  
  console.log("Destination hero image URL:", imageUrl);

  return (
    <div 
      className="h-[50vh] relative overflow-hidden"
      role="banner"
      aria-label={`Hero image of ${destination.name}`}
    >
      <div 
        className="absolute inset-0 bg-center bg-cover animate-hero-zoom"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        role="img"
        aria-label={`Scenic view of ${destination.name}`}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" 
        aria-hidden="true"
      />
    </div>
  );
};
