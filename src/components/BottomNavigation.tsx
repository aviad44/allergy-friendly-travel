
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/components/MainMenu";

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
  
  // Display only the first 4 items in the bottom bar
  const bottomNavItems = menuItems.slice(0, 4);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-2 px-4 sm:hidden">
      <div className="flex justify-between items-center">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.title}
              to={item.href} 
              className={cn(
                "flex flex-col items-center px-1", 
                isActive(item.href) ? "text-primary" : "text-gray-500"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-1">{item.title}</span>
            </Link>
          );
        })}
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col items-center px-1 text-gray-500">
              <Menu className="h-5 w-5" />
              <span className="text-[10px] mt-1">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 text-lg font-medium p-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
