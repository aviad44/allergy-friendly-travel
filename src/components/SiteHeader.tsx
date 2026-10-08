import { Link } from 'react-router-dom';
import { MainMenu } from '@/components/MainMenu';
import { HOME_CONTENT } from '@/constants/home';

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-hidden">
      {/* Navigation */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-full box-border">
          <Link 
            to="/" 
            aria-label="Return to homepage" 
            className="flex items-center space-x-3 text-2xl font-display font-bold text-[#c97018] hover:text-amber-700 transition-colors"
          >
            <img 
              src="/icons/logo-96.webp"
              srcSet="/icons/logo-96.webp 2x, /icons/logo-144.webp 3x"
              alt="Allergy Free Travel Logo" 
              className="h-10 w-10 object-contain" 
              width="40"
              height="40"
              loading="eager"
              fetchPriority="high"
            />
            <span>{HOME_CONTENT.navigation.brand}</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>
    </header>
  );
};
