
import { Globe } from "lucide-react";
import { LanguageTable } from "./LanguageTable";

interface LanguageTableSectionProps {
  languageTable?: {
    headers: string[];
    rows: string[][];
  };
  textAlignment?: string;
}

export const LanguageTableSection = ({ languageTable, textAlignment = "text-left" }: LanguageTableSectionProps) => {
  if (!languageTable || !languageTable.headers || languageTable.headers.length === 0) {
    return null;
  }
  
  return (
    <div className="overflow-x-auto -mx-3 sm:mx-0 bg-primary/5 p-4 rounded-xl">
      <div className="min-w-full p-3 sm:p-0">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
          <Globe className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
          Essential Phrases for Allergy Travelers
        </h2>
        <LanguageTable 
          data={languageTable}
          textAlignment={textAlignment}
        />
      </div>
    </div>
  );
};
