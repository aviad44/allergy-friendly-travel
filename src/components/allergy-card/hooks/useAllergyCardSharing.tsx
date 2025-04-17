
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
      const imagePath = `${baseUrl}/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png`;
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
      updateOrCreateTag('og:image:url', imagePath);
      updateOrCreateTag('og:image:secure_url', imagePath);
      updateOrCreateTag('og:title', title);
      updateOrCreateTag('og:description', description);
      updateOrCreateTag('twitter:image', imagePath);
      
      // Clean up: remove tags after 2 minutes
      setTimeout(() => {
        // Leave original meta tags in place
      }, 120000);
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
