
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
import { SiteHeader } from '@/components/SiteHeader';
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
import Portugal from '@/pages/destinations/Portugal';
import SwissAlps from '@/pages/destinations/SwissAlps';
import { Footer } from '@/components/Footer';
import Contact from '@/pages/Contact';
import AboutUs from '@/pages/AboutUs';
import Categories from '@/pages/Categories';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import DirectChat from '@/pages/DirectChat';
import Reviews from '@/pages/Reviews';
import FAQ from '@/pages/FAQ';

// AppContent component to use hooks that require router context
const AppContent = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

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
    <>
      <Toaster />
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<DestinationsIndex />} />
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
          <Route path="/destinations/portugal" element={<Portugal />} />
          <Route path="/destinations/swiss-alps" element={<SwissAlps />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/direct-chat" element={<DirectChat />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
