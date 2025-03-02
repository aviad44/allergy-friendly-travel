
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

  // Define a more descriptive alt text based on the destination
  const altText = `Scenic landscape of ${destination.name} - allergy-friendly travel destination with beautiful views and accommodations`;

  return (
    <div 
      className="h-[30vh] sm:h-[40vh] md:h-[50vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
          transform: "scale(1)",
        }}
        role="img"
        aria-label={altText}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" 
        aria-hidden="true"
      />
    </div>
  );
};
