
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, MapPin, Star, MessageCircle, Info, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Define menu items in one place for consistency between MainMenu and BottomNavigation
export const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/"
  },
  {
    title: "Destinations",
    icon: MapPin,
    href: "/destinations"
  },
  {
    title: "Traveler Reviews",
    icon: Star,
    href: "/reviews"
  },
  {
    title: "FAQ",
    icon: HelpCircle,
    href: "/faq"
  },
  {
    title: "Contact",
    icon: MessageCircle,
    href: "/contact"
  },
  {
    title: "About Us",
    icon: Info,
    href: "/about"
  }
];

export const MainMenu = () => {
  const [open, setOpen] = useState(false);
  
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
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
  );
};
