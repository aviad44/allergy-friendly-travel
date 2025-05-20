
import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { DestinationInfo } from "./DestinationInfo";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { DESTINATION_OG_IMAGES } from "@/utils/socialSharing";

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
  
  // Preload the image to ensure it's cached for sharing
  useEffect(() => {
    // Preload main image
    const img = new Image();
    img.src = imageUrl;
    console.log(`DestinationHero: Preloading main image: ${imageUrl}`);
    
    // Ensure image URL is absolute
    const absoluteImageUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `https://www.allergy-free-travel.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      
    // Update document head with page-specific meta tags if needed
    setTimeout(() => {
      // Check if OG image is present
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        const currentOgImage = ogImageTag.getAttribute('content');
        
        // If current OG image doesn't match our hero image or isn't absolute, update it
        if (currentOgImage && 
            (!currentOgImage.startsWith('http') || 
             (currentOgImage !== absoluteImageUrl && !absoluteImageUrl.includes(currentOgImage) && !currentOgImage.includes(absoluteImageUrl)))) {
          console.log(`DestinationHero: OG Image mismatch or not absolute. Current: ${currentOgImage}, Hero: ${absoluteImageUrl}`);
          ogImageTag.setAttribute('content', absoluteImageUrl);
          console.log(`DestinationHero: Updated OG Image to: ${absoluteImageUrl}`);
          
          // Also update image_src
          const imageSrc = document.querySelector('link[rel="image_src"]');
          if (imageSrc) {
            imageSrc.setAttribute('href', absoluteImageUrl);
          } else {
            const linkElement = document.createElement('link');
            linkElement.rel = 'image_src';
            linkElement.href = absoluteImageUrl;
            document.head.appendChild(linkElement);
          }
        }
      }
    }, 300);
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
