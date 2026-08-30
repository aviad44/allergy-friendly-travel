export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type EvidenceStatus = 'evidence_found' | 'no_evidence' | 'insufficient_evidence';

export interface ReviewSnippet {
  text: string;
  author: string;
  relativeTime: string;
  hasAllergyMention: boolean;
  score: number;
  matchedTerms?: string[];
}

export interface RestaurantInfo {
  name: string;
  address: string;
  rating: number | null;
  totalRatings: number | null;
  mapsUrl: string;
  types?: string[];
  reviewSnippet?: ReviewSnippet | null;
  confidenceLevel: ConfidenceLevel;
  evidenceStatus: EvidenceStatus;
  matchCount?: number;
  placeId?: string; // For lazy loading contact details
  // Only ever populated on the single top-ranked result of a fresh search
  // (see restaurants-search's enrichTopResultWithTripadvisor) — a real
  // Tripadvisor rating + review excerpt, not Google's.
  tripadvisorRating?: number | null;
  tripadvisorReviewCount?: number | null;
  tripadvisorUrl?: string | null;
  tripadvisorReview?: { text: string; author: string; url: string } | null;
}

export interface RestaurantContactInfo {
  placeId: string;
  website: string | null;
  phone: string | null;
  openNow: boolean | null;
}

export interface RestaurantSearchStats {
  evidenceFound: number;
  insufficientEvidence: number;
  noEvidence: number;
  allergyMentions?: number;
  cacheHits?: number;
  totalTimeMs?: number;
}

export interface RestaurantSearchResponse {
  destination: string;
  mode: 'fast' | 'deep';
  queryPhrase: string;
  places: RestaurantInfo[];
  totalCandidates?: number;
  detailsFetched?: number;
  stats?: RestaurantSearchStats;
  expandSearchAvailable?: boolean;
  fallbackUrl: string;
  error?: string;
}
