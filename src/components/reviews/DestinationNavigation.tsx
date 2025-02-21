
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
    <nav className="flex justify-between items-center mb-8" aria-label="Main navigation">
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => navigate('/destinations')} className="bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Destinations
        </Button>
        <Link to="/">
          <Button variant="ghost" className="bg-background/80 backdrop-blur-sm">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="bg-background/80 backdrop-blur-sm">
              <Globe className="h-4 w-4 mr-2" />
              {languages.find(lang => lang.code === currentLanguage)?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setCurrentLanguage(language.code)}
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
