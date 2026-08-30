import { useEffect, useState } from "react";
import { HotelCard, HotelCardProps } from "./HotelCard";
import { supabase } from "@/integrations/supabase/client";

interface TripadvisorReview {
  text: string;
  author: string;
  url: string;
}

interface TripadvisorLookupResult {
  available: boolean;
  rating?: number;
  reviewCount?: number;
  tripadvisorUrl?: string;
  reviews?: TripadvisorReview[];
}

interface TripadvisorEnrichedHotelCardProps extends HotelCardProps {
  /** City/destination, used to disambiguate the Tripadvisor name search. */
  city?: string;
  category: 'hotel' | 'restaurant';
}

// Thin wrapper around HotelCard that looks up the real Tripadvisor rating
// and a review excerpt for this specific place (see tripadvisor-reviews
// Edge Function) and passes it down. Renders the plain card immediately
// and swaps in Tripadvisor data if/when it resolves — never blocks or
// shows a loading state, since this is bonus credibility content, not
// the primary thing the card is showing.
export const TripadvisorEnrichedHotelCard = ({ city, category, ...cardProps }: TripadvisorEnrichedHotelCardProps) => {
  const [ta, setTa] = useState<TripadvisorLookupResult | null>(null);

  // Some callers pass display-formatted names ("1. The Ritz London ★★★★★")
  // — strip the leading index and star rating before using it as a search
  // query, since Tripadvisor's name search has no reason to know about
  // either.
  const searchName = cardProps.name?.replace(/^\d+\.\s*/, '').replace(/★+\s*$/, '').trim();

  useEffect(() => {
    let cancelled = false;
    if (!searchName) return;

    supabase.functions
      .invoke('tripadvisor-reviews', { body: { name: searchName, city, category } })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('Tripadvisor lookup failed:', error.message);
          return;
        }
        if (data?.available) setTa(data);
      })
      .catch((err) => console.error('Tripadvisor lookup failed:', err));

    return () => { cancelled = true; };
  }, [searchName, city, category]);

  return (
    <HotelCard
      {...cardProps}
      tripadvisorRating={ta?.rating}
      tripadvisorReviewCount={ta?.reviewCount}
      tripadvisorUrl={ta?.tripadvisorUrl}
      tripadvisorQuote={ta?.reviews?.[0]}
    />
  );
};
