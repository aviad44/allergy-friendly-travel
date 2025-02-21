
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, MapPin, Star, MessageCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
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
    title: "Contact",
    icon: MessageCircle,
    href: "/contact"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings"
  }
];

export const MainMenu = () => {
  return (
    <Sheet>
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
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors hover:bg-secondary/10 hover:text-secondary"
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
