
import { Destination } from "@/types/reviews";

export interface LanguageTableProps {
  data?: {
    headers: string[];
    rows: string[][];
  };
  destinationName?: string;
  textAlignment?: string;
}

export const LanguageTable = ({ data, destinationName, textAlignment = "text-left" }: LanguageTableProps) => {
  // Check if data is undefined or empty
  if (!data || !data.headers || data.headers.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="rounded-md border overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className={`w-full ${textAlignment}`}>
          <thead className="bg-muted/50">
            <tr>
              {data.headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`px-4 py-3 text-sm font-medium ${textAlignment}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-muted/20'}
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`px-4 py-3 text-sm ${textAlignment}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {destinationName && (
        <div className="p-3 bg-muted/10 text-xs text-center text-muted-foreground">
          Essential phrases for travelers with allergies in {destinationName}
        </div>
      )}
    </div>
  );
};
