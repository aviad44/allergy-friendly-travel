
export interface Review {
  id?: number;
  rating: number;
  text: string;
  created_at?: string;
  destination?: string;
  traveler_type?: string;
  author_name?: string;
}

// Removed language-related types
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
