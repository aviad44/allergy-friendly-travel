
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { LanguageCode, languages } from "@/types/definitions";

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (code: LanguageCode) => void;
}

export const LanguageSelector = ({ 
  currentLanguage, 
  setCurrentLanguage 
}: LanguageSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto"
        >
          <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setCurrentLanguage(language.code as LanguageCode)}
            className="text-xs sm:text-sm"
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
