
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";
import { Rocket } from "lucide-react";
import { HOME_CONTENT } from "@/constants/home";

export function ContactHeader() {
  return (
    <>
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation - Styled to match homepage */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png" 
              alt="Allergy Free Travel Logo" 
              className="h-12 w-12 object-contain" 
              width="48"
              height="48"
              loading="eager"
              fetchPriority="high"
            />
            <span>{HOME_CONTENT.navigation.brand}</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>
    </>
  );
}
