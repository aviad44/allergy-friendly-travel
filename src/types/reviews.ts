
export interface Review {
  id?: number | string;
  rating: number;
  text: string;
  created_at?: string;
  destination?: string;
  traveler_type?: string;
  author_name?: string;
  user_id?: string;
}

// Sort options for reviews
export const sortOptions = ['newest', 'oldest', 'highestRated', 'lowestRated'] as const;
