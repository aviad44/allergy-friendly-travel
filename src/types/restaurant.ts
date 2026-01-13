export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type EvidenceStatus = 'evidence_found' | 'no_evidence' | 'insufficient_evidence';

export interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  openNow?: boolean;
  priceLevel?: number;
  mapsUrl: string;
  website?: string;
  editorialSummary?: string;
  types?: string[];
  phone?: string;
  reviewSnippet?: ReviewSnippet | null;
  confidenceLevel: ConfidenceLevel;
  evidenceStatus: EvidenceStatus;
  matchCount?: number;
  matchedQueries?: string[];
}

export interface RestaurantSearchStats {
  evidenceFound: number;
  insufficientEvidence: number;
  noEvidence: number;
  allergyMentions: number;
}

export interface RestaurantSearchResponse {
  destination: string;
  mode: 'Restaurants';
  queryPhrase: string;
  places: RestaurantInfo[];
  totalCandidates?: number;
  detailsFetched?: number;
  stats?: RestaurantSearchStats;
  fallbackUrl: string;
  error?: string;
}
