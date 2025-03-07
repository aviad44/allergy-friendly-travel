
import { Destination } from "@/types/reviews";
import { Luggage, UtensilsCrossed, Hotel } from "lucide-react";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  let imageUrl;

  // Process image URL based on format
  if (destination.image.startsWith('photo-')) {
    imageUrl = `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=2000&q=80`;
  } else if (destination.image.startsWith('lovable-uploads/')) {
    imageUrl = `/${destination.image}`;
  } else {
    imageUrl = `/${destination.image}`;
  }
  
  console.log("Destination hero image URL:", imageUrl);

  // Define a more descriptive alt text based on the destination
  const altText = `Scenic landscape of ${destination.name} - allergy-friendly travel destination with beautiful views and accommodations`;

  // Determine if this is Paris to adjust background position
  const isParis = destination.name === "Paris";
  const backgroundPosition = isParis ? "center 60%" : "center 30%"; 
  const backgroundSize = isParis ? "120%" : "cover";

  return (
    <div 
      className="h-[40vh] sm:h-[50vh] md:h-[60vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <div 
        className="absolute inset-0 animate-hero-zoom"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
        }}
        role="img"
        aria-label={altText}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" 
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 text-white">
        <div className="container mx-auto">
          <div className="animate-fade-in max-w-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full animate-pulse-light">
                <Luggage className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full animate-pulse-light [animation-delay:400ms]">
                <UtensilsCrossed className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full animate-pulse-light [animation-delay:800ms]">
                <Hotel className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 text-white/90">
              {destination.name}
            </h1>
            <p className="text-xl text-white/70">
              {destination.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
