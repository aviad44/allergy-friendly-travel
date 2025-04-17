
export interface CruiseLine {
  name: string;
  rating: number;
  familyFriendly: boolean;
  buffetLabels: boolean | 'partial';
  chefConsult: boolean;
  notableFeature: string;
  destinations?: string;
  quote?: string;
  author?: string;
  features?: string[];
}
