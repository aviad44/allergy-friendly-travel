
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Autocomplete } from '@/components/search/Autocomplete';
import { destinationSuggestions } from '@/utils/searchSuggestions';

interface PostCardSearchCTAProps {
  selectedAllergies: string[];
}

// The site's live hotel search (SearchResults.tsx) requires a non-empty
// `allergies` param or it redirects straight to the homepage, so this CTA
// only makes sense right here, where selectedAllergies is guaranteed
// non-empty by the generator's own step validation — not as a generic,
// allergy-less link elsewhere on the page.
export const PostCardSearchCTA = ({ selectedAllergies }: PostCardSearchCTAProps) => {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!destination) return;
    const allergiesParam = selectedAllergies.join(',');
    navigate(`/search-results?destination=${encodeURIComponent(destination)}&allergies=${encodeURIComponent(allergiesParam)}&mode=hotels`);
  };

  return (
    <div className="bg-teal-800 rounded-lg p-6 text-center space-y-4">
      <h3 className="text-xl font-semibold text-white">
        Now find a hotel that handles your allergy
      </h3>
      <p className="text-teal-100 text-sm">
        Search hotels worldwide with real guest reviews mentioning {selectedAllergies.join(', ')} accommodation.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
        <div className="flex-1">
          <Autocomplete
            placeholder="Where are you traveling?"
            value={destination}
            onChange={setDestination}
            suggestions={destinationSuggestions}
            className="bg-white"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={!destination}
          className="gap-2 whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-white h-10 sm:h-11 md:h-12"
        >
          <Search className="h-4 w-4" />
          Find Hotels
        </Button>
      </div>
    </div>
  );
};
