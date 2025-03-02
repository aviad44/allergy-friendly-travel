
import { Button } from "@/components/ui/button";
import { MainMenu } from "@/components/MainMenu";
import { Home, Globe, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageCode, languages } from "@/types/reviews";

interface DestinationNavigationProps {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (code: LanguageCode) => void;
}

export const DestinationNavigation = ({ 
  currentLanguage, 
  setCurrentLanguage 
}: DestinationNavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8" aria-label="Main navigation">
      <div className="flex gap-1 sm:gap-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/destinations')} 
          className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">Back</span>
        </Button>
        <Link to="/">
          <Button 
            variant="ghost" 
            className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto"
          >
            <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Home</span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto"
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setCurrentLanguage(language.code)}
                className="text-xs sm:text-sm"
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <MainMenu />
      </div>
    </nav>
  );
};
