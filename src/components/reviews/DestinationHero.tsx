
import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { DestinationInfo } from "./DestinationInfo";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { DESTINATION_OG_IMAGES, updateMetaTags } from "@/utils/socialSharing";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // First, check if we have a dedicated OG image for this destination
  // This ensures we use the same image in both social sharing and on the page
  let imageUrl = '';
  
  // Use the OG image mapping as the highest priority source
  if (destination.id in DESTINATION_OG_IMAGES) {
    imageUrl = DESTINATION_OG_IMAGES[destination.id];
    console.log(`DestinationHero: Using OG image for ${destination.id}: ${imageUrl}`);
  } 
  // Check our central image constants - second priority
  else if (destination.id in DESTINATION_IMAGES) {
    const key = destination.id as keyof typeof DESTINATION_IMAGES;
    imageUrl = DESTINATION_IMAGES[key];
    // Make sure URLs are absolute for consistency
    if (!imageUrl.startsWith('http')) {
      imageUrl = imageUrl.startsWith('/') 
        ? `https://www.allergy-free-travel.com${imageUrl}` 
        : `https://www.allergy-free-travel.com/${imageUrl}`;
    }
    console.log(`DestinationHero: Using DESTINATION_IMAGES for ${destination.id}: ${imageUrl}`);
  } 
  // Use destination's image if available - third priority
  else if (destination.image && (destination.image.startsWith('http') || destination.image.startsWith('/'))) {
    imageUrl = destination.image;
    // Make absolute if needed
    if (!imageUrl.startsWith('http')) {
      imageUrl = imageUrl.startsWith('/') 
        ? `https://www.allergy-free-travel.com${imageUrl}` 
        : `https://www.allergy-free-travel.com/${imageUrl}`;
    }
    console.log(`DestinationHero: Using destination.image for ${destination.id}: ${imageUrl}`);
  } 
  // Final fallback - placeholder
  else {
    imageUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destination.name}`;
    console.log(`DestinationHero: Using fallback for ${destination.id}: ${imageUrl}`);
  }
  
  // Define a descriptive alt text
  let altText = `Scenic view of ${destination.name} - Allergy-friendly travel destination`;
  if (destination.id === 'hotel-chains') {
    altText = `Luxury resort with swimming pool - Top allergy-friendly hotel chains worldwide`;
  }
  if (destination.id === 'crete') {
    altText = `Beautiful beach resort in Crete, Greece with crystal clear turquoise waters - Allergy-friendly Mediterranean destination`;
  }
  if (destination.id === 'cyprus') {
    altText = `Beautiful beachfront resort in Cyprus with crystal clear turquoise waters - Allergy-friendly Mediterranean destination`;
  }
  if (destination.id === 'athens') {
    altText = `Luxurious hotel lobby in Athens with elegant furnishings - Allergy-friendly Greek accommodation`;
  }
  
  // Preload the image and update meta tags when component mounts
  useEffect(() => {
    // Preload main image
    const img = new Image();
    img.src = imageUrl;
    console.log(`DestinationHero: Preloading main image: ${imageUrl}`);
    
    // Format the destination name for better title
    const destName = destination.name.trim();
    
    // Use our shared utility to update all meta tags at once
    updateMetaTags(
      imageUrl,
      `Allergy-Friendly Hotels in ${destName} | Safe Travel Guide 2025`,
      `Discover the best allergy-friendly hotels in ${destName}. Comprehensive guide to accommodations catering to food allergies, gluten-free, and special dietary needs.`
    );
    
    // Explicitly create image_src link which helps various social media platforms
    let imageSrcLink = document.querySelector('link[rel="image_src"]');
    if (!imageSrcLink) {
      imageSrcLink = document.createElement('link');
      imageSrcLink.setAttribute('rel', 'image_src');
      document.head.appendChild(imageSrcLink);
    }
    imageSrcLink.setAttribute('href', imageUrl);
    
    // Force a second update after a slight delay
    setTimeout(() => {
      // Double check meta tags
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && (ogImage as HTMLMetaElement).content !== imageUrl) {
        (ogImage as HTMLMetaElement).content = imageUrl;
        console.log('DestinationHero: Fixed OG image in delayed update');
      }
    }, 500);
  }, [destination.id, imageUrl, destination.name]);

  return (
    <div 
      className="h-[40vh] sm:h-[45vh] md:h-[55vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <HeroImage 
        imageUrl={imageUrl}
        altText={altText}
        fallbackImage="/placeholder.svg"
      />
      
      <DestinationInfo 
        name={destination.name}
        country={destination.country}
      />
    </div>
  );
};
