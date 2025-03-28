
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Star, MessageCircle, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const handleLinkClick = () => {
    setOpen(false);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-2 px-4 sm:hidden">
      <div className="flex justify-between items-center">
        <Link to="/" className={cn("flex flex-col items-center px-1", isActive('/') ? "text-primary" : "text-gray-500")}>
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-1">Home</span>
        </Link>
        
        <Link to="/destinations" className={cn("flex flex-col items-center px-1", isActive('/destinations') ? "text-primary" : "text-gray-500")}>
          <MapPin className="h-5 w-5" />
          <span className="text-[10px] mt-1">Places</span>
        </Link>
        
        <Link to="/reviews" className={cn("flex flex-col items-center px-1", isActive('/reviews') ? "text-primary" : "text-gray-500")}>
          <Star className="h-5 w-5" />
          <span className="text-[10px] mt-1">Reviews</span>
        </Link>
        
        <Link to="/contact" className={cn("flex flex-col items-center px-1", isActive('/contact') ? "text-primary" : "text-gray-500")}>
          <MessageCircle className="h-5 w-5" />
          <span className="text-[10px] mt-1">Contact</span>
        </Link>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col items-center px-1 text-gray-500">
              <Menu className="h-5 w-5" />
              <span className="text-[10px] mt-1">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                to="/faq"
                onClick={handleLinkClick}
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
              >
                <span>FAQ</span>
              </Link>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
              >
                <span>About Us</span>
              </Link>
              <Link
                to="/categories"
                onClick={handleLinkClick}
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
              >
                <span>Categories</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
