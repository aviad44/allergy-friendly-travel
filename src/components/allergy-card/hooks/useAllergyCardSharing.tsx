import { toast } from "sonner";
import { copyToClipboard, downloadAsPDF, downloadAsPNG, shareToWhatsApp } from '../utils/cardGeneration';

export function useAllergyCardSharing() {
  const handleCopyToClipboard = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard) {
      toast.error("No card content to copy. Please generate the card first.");
      return;
    }
    
    copyToClipboard(generatedCard, translatedCard);
  };

  const handleDownloadPDF = () => {
    downloadAsPDF();
  };

  const handleDownloadPNG = () => {
    downloadAsPNG();
  };

  const handleShareToWhatsApp = (generatedCard: string | null, translatedCard: string | null) => {
    if (!generatedCard) {
      toast.error("No card content to share. Please generate the card first.");
      return;
    }
    
    // Add meta tags temporarily to enhance sharing
    const ensureMetaTags = () => {
      const baseUrl = 'https://www.allergy-free-travel.com';
      const imagePath = `${baseUrl}/lovable-uploads/c0d4e111-501f-46b3-94ad-23c5b56f9736.png';
      const title = "My Allergy Translation Card";
      const description = "Custom allergy translation card from Allergy-Free Travel";
      
      // Check if these tags already exist and update only if needed
      const updateOrCreateTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };
      
      updateOrCreateTag('og:image', imagePath);
      updateOrCreateTag('og:image:type', 'image/png');
      updateOrCreateTag('og:image:width', '1200');
      updateOrCreateTag('og:image:height', '630');
      updateOrCreateTag('og:image:alt', 'Poolside vacation scene with palm trees – Allergy-Free Travel');
      updateOrCreateTag('og:image:secure_url', imagePath);
      updateOrCreateTag('og:title', title);
      updateOrCreateTag('og:description', description);
      
      // Twitter tags
      const updateOrCreateTwitterTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };
      
      updateOrCreateTwitterTag('twitter:card', 'summary_large_image');
      updateOrCreateTwitterTag('twitter:image', imagePath);
      updateOrCreateTwitterTag('twitter:title', title);
      updateOrCreateTwitterTag('twitter:description', description);
    };
    
    ensureMetaTags();
    
    // Use navigator.share API if available for better sharing experience
    if (navigator.share) {
      try {
        navigator.share({
          title: 'My Allergy Translation Card',
          text: generatedCard + (translatedCard ? '\n\n' + translatedCard : ''),
          url: window.location.href
        }).then(() => {
          toast.success("Successfully shared!");
        }).catch((error) => {
          console.error('Sharing failed:', error);
          // Fall back to WhatsApp if sharing API fails
          shareToWhatsApp(generatedCard, translatedCard);
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fall back to WhatsApp if sharing API errors
        shareToWhatsApp(generatedCard, translatedCard);
      }
    } else {
      // Use direct WhatsApp sharing as fallback
      shareToWhatsApp(generatedCard, translatedCard);
    }
  };

  return {
    handleCopyToClipboard,
    handleDownloadPDF,
    handleDownloadPNG,
    handleShareToWhatsApp
  };
}
