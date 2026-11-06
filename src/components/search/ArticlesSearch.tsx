import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Hotel, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "./Autocomplete";
import { fetchArticlesIndex, ArticleMatch } from "@/utils/fetchArticlesIndex";

// Central "find an existing guide" search, shared by /destinations/ and
// /restaurants/ (user request, 2026-11-06). Deliberately NOT the homepage's
// live hotel-search/restaurants-search flow — this only ever looks up
// already-published articles already sitting in the DB, so it never makes
// a Google Places call and never costs budget. A city with both a hotel and
// a restaurant guide shows both for the visitor to pick; a city with just
// one guide opens it directly.
export const ArticlesSearch = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [results, setResults] = useState<ArticleMatch[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticlesIndex().then((index) => setCities(index.cities));
  }, []);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const { byCity } = await fetchArticlesIndex();
    const matches = byCity.get(trimmed.toLowerCase()) || [];

    if (matches.length === 1) {
      navigate(matches[0].path);
      return;
    }

    setResults(matches);
  }, [query, navigate]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Autocomplete
          placeholder="Search a city (e.g. London, Warsaw)"
          value={query}
          onChange={setQuery}
          suggestions={cities}
          className="bg-white"
        />
        <Button onClick={handleSearch} className="flex items-center gap-2 whitespace-nowrap">
          <Search className="h-4 w-4" />
          Search guides
        </Button>
      </div>

      {results !== null && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-sm text-gray-500">No guide found yet for "{query.trim()}".</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {results.map((match) => (
                <Link
                  key={match.path}
                  to={match.path}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {match.contentType === 'hotel' ? (
                    <Hotel className="h-5 w-5 text-blue-700 flex-shrink-0" />
                  ) : (
                    <UtensilsCrossed className="h-5 w-5 text-blue-700 flex-shrink-0" />
                  )}
                  <div>
                    <div className="text-sm font-semibold text-blue-800">
                      {match.contentType === 'hotel' ? 'Hotels' : 'Restaurants'} in {match.city}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">{match.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
