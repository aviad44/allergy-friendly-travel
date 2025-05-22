
import { LanguageCode } from "@/types/definitions";

interface DestinationHeaderProps {
  name: string;
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  isLondon?: boolean;
  description?: string;
  subtitle?: string;
}

export const DestinationHeader = ({ 
  name, 
  currentLanguage, 
  onLanguageChange, 
  isLondon = false, 
  description, 
  subtitle 
}: DestinationHeaderProps) => {
  return (
    <header className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {isLondon ? (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                Best Allergy-Friendly Hotels in London
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl font-display text-muted-foreground">
                A Comprehensive Guide for Food-Allergy Travelers
              </h2>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                {description || `Best Allergy-Friendly Hotels in ${name}`}
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl font-display text-muted-foreground">
                {subtitle || "Safe Accommodations for Food Allergies"}
              </h2>
            </>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 text-sm rounded-full ${currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            EN
          </button>
          <button 
            onClick={() => onLanguageChange('he')}
            className={`px-3 py-1 text-sm rounded-full ${currentLanguage === 'he' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            HE
          </button>
        </div>
      </div>
    </header>
  );
};
