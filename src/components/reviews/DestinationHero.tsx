
import { Destination } from "@/types/reviews";
import { Luggage, UtensilsCrossed, Hotel } from "lucide-react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // Check if we have a custom image defined in DESTINATION_IMAGES
  const destinationKey = destination.id as keyof typeof DESTINATION_IMAGES;
  const customImage = DESTINATION_IMAGES[destinationKey] || null;
  
  // Use custom image if available, otherwise fall back to destination.image
  const imageSource = customImage || destination.image || "photo-1469474968028-56623f02e42e"; // Fallback image
  
  let imageUrl;
  // Process image URL based on format
  if (imageSource.startsWith('photo-')) {
    imageUrl = `https://images.unsplash.com/${imageSource}?auto=format&fit=crop&w=2000&h=800&q=80`;
  } else if (imageSource.startsWith('/lovable-uploads/')) {
    imageUrl = imageSource;
  } else {
    imageUrl = imageSource;
  }
  
  console.log("Destination hero image URL:", imageUrl);

  // Define a more descriptive alt text based on the destination
  const altText = destination.name 
    ? `Scenic view of ${destination.name} - allergy-friendly travel destination with hotels and accommodations for travelers with dietary restrictions`
    : "Beautiful travel destination for allergy-friendly accommodation";

  return (
    <div 
      className="h-[35vh] sm:h-[40vh] md:h-[50vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
        role="img"
        aria-label={altText}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" 
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 text-white">
        <div className="container mx-auto">
          <div className="animate-fade-in max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <Luggage className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <UtensilsCrossed className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <Hotel className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1 text-white/90">
              {destination.name}
            </h1>
            <p className="text-lg text-white/70">
              {destination.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
