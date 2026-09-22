
import { Link } from 'react-router-dom';
import { REGIONS } from '@/utils/regions';

interface RegionQuickLinksProps {
  basePath: '/destinations/region' | '/restaurants/region';
}

// Purely additive browsing aid sitting above the existing flat destination/
// restaurant grids — doesn't change how those grids fetch or render. No
// outer container/padding of its own so callers can drop it straight into
// their existing layout.
export const RegionQuickLinks = ({ basePath }: RegionQuickLinksProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Browse by Region</h2>
      <div className="flex flex-wrap gap-3">
        {REGIONS.map((r) => (
          <Link
            key={r.slug}
            to={`${basePath}/${r.slug}/`}
            className="text-sm px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
