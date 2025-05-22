
import { Helmet } from "react-helmet";
import { getAbsoluteImageUrl, DEFAULT_SOCIAL_IMAGE } from "@/utils/socialSharing";
import { useEffect } from "react";

interface SocialTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export const SocialTags = ({ 
  title, 
  description, 
  imageUrl = DEFAULT_SOCIAL_IMAGE, 
  url, 
  type = 'website'
}: SocialTagsProps) => {
  const absoluteImageUrl = getAbsoluteImageUrl(imageUrl);
  const currentUrl = url || 
    (typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com');
  const imageAlt = `${title} - Allergy-Free Travel`;
  
  // Direct DOM manipulation to ensure Facebook crawler can see the OG tags
  useEffect(() => {
    console.log(`SocialTags mounted for: ${title}`);
    console.log(`Image URL for sharing: ${absoluteImageUrl}`);
    
    // Handle direct image link which helps Facebook crawler
    const linkElement = document.querySelector('link[rel="image_src"]') as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = absoluteImageUrl;
    } else {
      const newLinkElement = document.createElement('link');
      newLinkElement.rel = 'image_src';
      newLinkElement.href = absoluteImageUrl;
      document.head.appendChild(newLinkElement);
    }
    
    // Make sure we have the right og:image:width and height
    const ensureMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Ensure critical meta tags are present
    ensureMetaTag('og:image:width', '1200');
    ensureMetaTag('og:image:height', '630');
    ensureMetaTag('og:image:alt', imageAlt);
    ensureMetaTag('og:image:type', 'image/png');
    ensureMetaTag('og:locale', 'he_IL'); // Set to Hebrew since this appears to be for Hebrew users
    
    // Add prefix to html tag for Open Graph
    const htmlTag = document.documentElement;
    if (htmlTag && !htmlTag.getAttribute('prefix')) {
      htmlTag.setAttribute('prefix', 'og: https://ogp.me/ns#');
    }
  }, [absoluteImageUrl, title, imageAlt]);
  
  return (
    <Helmet>
      {/* Primary tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Direct image link for Facebook/WhatsApp */}
      <link rel="image_src" href={absoluteImageUrl} />
      
      {/* Open Graph Prefix for HTML tag */}
      <html prefix="og: https://ogp.me/ns#" />
      
      {/* Facebook/WhatsApp OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      <meta property="og:locale" content="he_IL" />
      
      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* WhatsApp specific tags */}
      <link itemProp="thumbnailUrl" href={absoluteImageUrl} />
      <meta itemProp="image" content={absoluteImageUrl} />
      
      {/* LinkedIn specific */}
      <meta property="linkedin:image" content={absoluteImageUrl} />
    </Helmet>
  );
};
