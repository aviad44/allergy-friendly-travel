
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import DestinationsIndex from '@/pages/destinations';
import London from '@/pages/destinations/London';
import Paris from '@/pages/destinations/Paris';
import Barcelona from '@/pages/destinations/Barcelona';
import Cyprus from '@/pages/destinations/Cyprus';
import AbuDhabi from '@/pages/destinations/AbuDhabi';
import Crete from '@/pages/destinations/Crete';
import Tokyo from '@/pages/destinations/Tokyo';
import Thailand from '@/pages/destinations/Thailand';
import HotelChains from '@/pages/destinations/HotelChains';
import NewYork from '@/pages/destinations/NewYork';
import AyiaNapa from '@/pages/destinations/AyiaNapa';
import { Footer } from '@/components/Footer';
import { MainMenu } from '@/components/MainMenu';
import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";

function App() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check if the code is running in a browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Set the theme based on the user's system preference
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      }
    }
  }, [setTheme]);

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Toaster />
      
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            <span>Allergy Free Travel</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      <Routes>
        <Route path="/destinations/london" element={<London />} />
        <Route path="/destinations/paris" element={<Paris />} />
        <Route path="/destinations/barcelona" element={<Barcelona />} />
        <Route path="/destinations/cyprus" element={<Cyprus />} />
        <Route path="/destinations/abudhabi" element={<AbuDhabi />} />
        <Route path="/destinations/crete" element={<Crete />} />
        <Route path="/destinations/newyork" element={<NewYork />} />
        <Route path="/destinations/tokyo" element={<Tokyo />} />
        <Route path="/destinations/thailand" element={<Thailand />} />
        <Route path="/destinations/ayia-napa" element={<AyiaNapa />} />
        <Route path="/destinations/hotel-chains" element={<HotelChains />} />
        <Route path="/destinations" element={<DestinationsIndex />} />
      </Routes>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
