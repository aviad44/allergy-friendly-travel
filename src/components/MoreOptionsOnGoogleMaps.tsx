import { ExternalLink, MapPin } from "lucide-react";

interface MoreOptionsOnGoogleMapsProps {
  city: string;
  kind: "restaurants" | "hotels";
}

// A guide only lists the hotels/restaurants that turned up a real,
// verifiable allergy-related review — by design, never padded out with
// unverified places just to look fuller (see AboutUs.tsx's "Real Guest
// Reviews Only" commitment). For a thin guide especially, that can leave a
// reader with too few options, so this points them at the same search a
// manual lookup would use to find more on their own. Mirrors the identical
// CTA already used in the live search tool (RestaurantResults.tsx).
export const MoreOptionsOnGoogleMaps = ({ city, kind }: MoreOptionsOnGoogleMapsProps) => {
  const query = `allergy friendly ${kind} in ${city}`;
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  return (
    <div className="text-center py-4 border-t border-gray-200">
      <p className="text-sm text-gray-600 mb-2">
        This guide only lists {kind} with a real, verified allergy-related review — there may be more worth checking in {city}.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        <MapPin className="h-4 w-4" />
        Search {kind} in {city} on Google Maps
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};
