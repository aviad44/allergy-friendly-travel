
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";

export function ContactHeader() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 text-2xl font-display font-bold text-blue-700 hover:text-blue-800 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-12 w-auto" 
            />
            Allergy Free Travel
          </Link>
          <MainMenu />
        </div>
      </div>
    </header>
  );
}
