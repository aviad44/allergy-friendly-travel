import { useState } from "react";
import { MapPin, Star, ExternalLink, Quote, Phone, Globe, Loader2 } from "lucide-react";
import { RestaurantInfo, RestaurantContactInfo } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RestaurantCardProps {
  restaurant: RestaurantInfo;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [contactInfo, setContactInfo] = useState<RestaurantContactInfo | null>(null);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  
  const hasAllergyReview = restaurant.reviewSnippet?.hasAllergyMention && restaurant.reviewSnippet?.text;

  const fetchContactDetails = async () => {
    if (!restaurant.placeId || contactInfo) return;
    
    setIsLoadingContact(true);
    setContactError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('get-restaurant-contact', {
        body: { placeId: restaurant.placeId }
      });
      
      if (error) {
        console.error('Contact fetch error:', error);
        setContactError('Could not load contact info');
        return;
      }
      
      if (data.error) {
        setContactError(data.error);
        return;
      }
      
      setContactInfo(data);
    } catch (err) {
      console.error('Contact fetch error:', err);
      setContactError('Could not load contact info');
    } finally {
      setIsLoadingContact(false);
    }
  };

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      {/* Header row: Name + Rating */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base leading-tight">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating.toFixed(1)}</span>
                {restaurant.totalRatings && (
                  <span className="text-xs">({restaurant.totalRatings.toLocaleString()})</span>
                )}
              </div>
            )}
            {restaurant.address && (
              <span className="truncate">{restaurant.address}</span>
            )}
          </div>
        </div>
      </div>

      {/* Allergy review quote - highlighted in green */}
      {hasAllergyReview && (
        <div className="bg-green-50 dark:bg-green-950/30 rounded-md p-3 my-3 border-l-4 border-green-500">
          <div className="flex gap-2">
            <Quote className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {restaurant.reviewSnippet!.text}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {restaurant.reviewSnippet!.author && (
                  <span>— {restaurant.reviewSnippet!.author}</span>
                )}
                {restaurant.reviewSnippet!.relativeTime && (
                  <span>({restaurant.reviewSnippet!.relativeTime})</span>
                )}
              </div>
              {restaurant.reviewSnippet?.matchedTerms && restaurant.reviewSnippet.matchedTerms.length > 0 && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  Allergy keywords: {restaurant.reviewSnippet.matchedTerms.slice(0, 4).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact info - shown after lazy load */}
      {contactInfo && (
        <div className="bg-muted/50 rounded-md p-3 my-3 space-y-2">
          {contactInfo.phone && (
            <a 
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          )}
          {contactInfo.website && (
            <a 
              href={contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Globe className="h-4 w-4" />
              Visit website
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {contactInfo.openNow !== null && (
            <p className={`text-sm ${contactInfo.openNow ? 'text-green-600' : 'text-muted-foreground'}`}>
              {contactInfo.openNow ? '✓ Currently open' : 'Currently closed'}
            </p>
          )}
          {!contactInfo.phone && !contactInfo.website && (
            <p className="text-sm text-muted-foreground">No contact info available</p>
          )}
        </div>
      )}
      
      {contactError && (
        <p className="text-sm text-destructive my-2">{contactError}</p>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary gap-1.5"
            asChild
          >
            <a 
              href={restaurant.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <MapPin className="h-4 w-4" />
              View on Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          
          {/* Lazy load contact details button */}
          {restaurant.placeId && !contactInfo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchContactDetails}
              disabled={isLoadingContact}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              {isLoadingContact ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4" />
                  Contact details
                </>
              )}
            </Button>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground">
          Always verify with restaurant
        </span>
      </div>
    </div>
  );
};
