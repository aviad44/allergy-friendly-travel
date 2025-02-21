
import { destinations, travelerTypes, sortOptions } from "@/types/reviews";

interface ReviewFiltersProps {
  selectedDestination: string;
  selectedTravelerType: string;
  sortBy: string;
  onDestinationChange: (value: string) => void;
  onTravelerTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  textAlignment: string;
  translations: any;
}

export const ReviewFilters = ({
  selectedDestination,
  selectedTravelerType,
  sortBy,
  onDestinationChange,
  onTravelerTypeChange,
  onSortChange,
  textAlignment,
  translations: t
}: ReviewFiltersProps) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8 ${textAlignment}`}>
      <h3 className="text-lg font-semibold mb-4">{t.filter.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-2">{t.filter.destination}</label>
          <select
            value={selectedDestination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-md p-2"
          >
            <option value="all">{t.filter.all}</option>
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">{t.filter.travelerType}</label>
          <select
            value={selectedTravelerType}
            onChange={(e) => onTravelerTypeChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-md p-2"
          >
            <option value="all">{t.filter.allTypes}</option>
            {travelerTypes.map(type => (
              <option key={type} value={type}>{t.filter[type]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">{t.filter.sortBy}</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-md p-2"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{t.filter[option]}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
