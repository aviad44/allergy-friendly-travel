
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
  
  // Debug logging to help troubleshoot social sharing issues
  useEffect(() => {
    console.log(`SocialTags component mounted for: ${currentUrl}`);
    console.log(`- Image URL: ${absoluteImageUrl}`);
    console.log(`- Title: ${title}`);
    
    // Verify OG tags were injected properly after render
    setTimeout(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      console.log(`OG Image verification: ${ogImage?.getAttribute('content')}`);
      console.log(`OG Title verification: ${ogTitle?.getAttribute('content')}`);
      
      // Add direct link element for Facebook crawler
      if (!document.querySelector('link[rel="image_src"]')) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'image_src';
        linkElement.href = absoluteImageUrl;
        document.head.appendChild(linkElement);
        console.log(`Added image_src link: ${absoluteImageUrl}`);
      }
    }, 100);
  }, [absoluteImageUrl, currentUrl, title]);
  
  return (
    <Helmet>
      {/* Primary tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Direct image link for Facebook */}
      <link rel="image_src" href={absoluteImageUrl} />
      
      {/* Open Graph Prefix */}
      <html prefix="og: https://ogp.me/ns#" />
      
      {/* Facebook/WhatsApp OpenGraph tags */}
      <meta property="og:type" content={type} data-react-helmet="true" />
      <meta property="og:url" content={currentUrl} data-react-helmet="true" />
      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta property="og:description" content={description} data-react-helmet="true" />
      <meta property="og:image" content={absoluteImageUrl} data-react-helmet="true" />
      <meta property="og:image:secure_url" content={absoluteImageUrl} data-react-helmet="true" />
      <meta property="og:image:width" content="1200" data-react-helmet="true" />
      <meta property="og:image:height" content="630" data-react-helmet="true" />
      <meta property="og:image:alt" content={imageAlt} data-react-helmet="true" />
      <meta property="og:site_name" content="Allergy-Free Travel" data-react-helmet="true" />
      <meta property="og:locale" content="en_US" data-react-helmet="true" />
      
      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
      <meta name="twitter:title" content={title} data-react-helmet="true" />
      <meta name="twitter:description" content={description} data-react-helmet="true" />
      <meta name="twitter:image" content={absoluteImageUrl} data-react-helmet="true" />
      <meta name="twitter:image:alt" content={imageAlt} data-react-helmet="true" />
      
      {/* WhatsApp specific tags */}
      <link itemProp="thumbnailUrl" href={absoluteImageUrl} data-react-helmet="true" />
      <meta itemProp="image" content={absoluteImageUrl} data-react-helmet="true" />
      
      {/* Facebook specific - adding these seems to help in some cases */}
      <meta property="fb:app_id" content="allergy.free.travel" data-react-helmet="true" />
    </Helmet>
  );
};
