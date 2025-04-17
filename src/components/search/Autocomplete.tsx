
import { Input } from "@/components/ui/input";
import { forwardRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  className?: string;
}

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  ({ placeholder, value, onChange, suggestions, className = "" }, ref) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
      if (value) {
        const filtered = suggestions.filter(item => 
          item.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      } else {
        setFilteredSuggestions([]);
      }
    }, [value, suggestions]);

    const handleSelection = (selectedValue: string) => {
      onChange(selectedValue);
      setShowSuggestions(false);
    };

    return (
      <div ref={ref} className="relative flex-1">
        <Input 
          placeholder={placeholder}
          className={`h-9 sm:h-11 text-sm sm:text-base border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm ${className}`}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          aria-autocomplete="list"
          aria-controls={`${placeholder}-suggestions`}
          aria-expanded={showSuggestions}
        />
        
        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul 
            id={`${placeholder}-suggestions`}
            className="absolute left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-50"
            role="listbox"
          >
            {filteredSuggestions.map((item, index) => (
              <li 
                key={index} 
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-left"
                role="option"
                onClick={() => handleSelection(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";
