
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MultiSelectAutocompleteProps {
  placeholder: string;
  selectedValues: string[];
  onSelectedValuesChange: (values: string[]) => void;
  suggestions: string[];
  className?: string;
}

export const MultiSelectAutocomplete: React.FC<MultiSelectAutocompleteProps> = ({
  placeholder,
  selectedValues,
  onSelectedValuesChange,
  suggestions,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedValues.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions.filter(s => !selectedValues.includes(s)));
    }
  }, [inputValue, suggestions, selectedValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedValues.includes(suggestion)) {
      onSelectedValuesChange([...selectedValues, suggestion]);
    }
    setInputValue('');
    setIsOpen(false);
  };

  const handleRemoveValue = (valueToRemove: string) => {
    onSelectedValuesChange(selectedValues.filter(value => value !== valueToRemove));
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!selectedValues.includes(inputValue.trim())) {
        onSelectedValuesChange([...selectedValues, inputValue.trim()]);
      }
      setInputValue('');
      setIsOpen(false);
    } else if (e.key === 'Backspace' && !inputValue && selectedValues.length > 0) {
      onSelectedValuesChange(selectedValues.slice(0, -1));
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative w-full min-h-[40px] sm:min-h-[44px] md:min-h-[48px]">
        <div className={cn(
          "flex flex-wrap items-center gap-1 p-2 pr-8 border border-input rounded-md bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}>
          {selectedValues.map((value) => (
            <Badge
              key={value}
              variant="secondary"
              className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              {value}
              <X
                className="h-3 w-3 cursor-pointer hover:text-blue-600"
                onClick={() => handleRemoveValue(value)}
              />
            </Badge>
          ))}
          <Input
            ref={inputRef}
            type="text"
            placeholder={selectedValues.length === 0 ? placeholder : ""}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[100px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm sm:text-base"
          />
        </div>
        <ChevronDown 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
        />
      </div>
      
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto mt-1">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
