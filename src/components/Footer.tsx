
import { Link } from "react-router-dom";
import { HOME_CONTENT } from "@/constants/home";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const menuItems = HOME_CONTENT.navigation.menu.items;
  
  return (
    <footer className="bg-muted/30 py-8 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-base font-semibold mb-4">
              {HOME_CONTENT.navigation.brand}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Helping travelers with allergies and dietary restrictions find safe accommodations worldwide.
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {HOME_CONTENT.navigation.brand}. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/paris" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Paris, France
                </Link>
              </li>
              <li>
                <Link to="/destinations/london" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  London, UK
                </Link>
              </li>
              <li>
                <Link to="/destinations/abu-dhabi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Abu Dhabi, UAE
                </Link>
              </li>
              <li>
                <Link to="/destinations/cyprus" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cyprus
                </Link>
              </li>
              <li>
                <Link to="/destinations/thailand" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Thailand
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </footer>
  );
};
