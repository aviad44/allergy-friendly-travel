
// Common types used across search components
export interface SearchSuggestion {
  value: string;
  label?: string;
}

export interface SearchResultsProps {
  destination: string;
  allergies: string;
  recommendation: string;
  isSearching: boolean;
  onClose: () => void;
}
