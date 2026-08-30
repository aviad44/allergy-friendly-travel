import { Link } from "react-router-dom";
import { SITE_AUTHOR } from "@/constants/author";

interface ArticleBylineProps {
  publishedAt?: string | null;
  updatedAt?: string | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Visible "who wrote this / when" line for guide pages. The date and author
// name were previously only present in the page's hidden JSON-LD — real for
// search engines, invisible to an actual reader. For content about
// life-threatening food allergies, a reader (and a Google quality rater)
// should be able to see the same trust signal the schema claims.
export function ArticleByline({ publishedAt, updatedAt }: ArticleBylineProps) {
  const dateIso = updatedAt || publishedAt;

  return (
    <p className="text-sm text-muted-foreground mb-6 -mt-2">
      Written by{' '}
      <Link to="/about" className="font-medium text-blue-700 hover:text-blue-800 underline">
        {SITE_AUTHOR.name}
      </Link>
      , {SITE_AUTHOR.jobTitle.toLowerCase()} of Allergy-Free Travel
      {dateIso && <> &middot; Updated {formatDate(dateIso)}</>}
    </p>
  );
}
