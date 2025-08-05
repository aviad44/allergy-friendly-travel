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
import { MainLayout } from '@/components/MainLayout';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalSocialTags } from '@/components/GlobalSocialTags';
import { NetlifySocialHeaders } from '@/components/NetlifySocialHeaders';
import { SocialSharingHandler } from '@/components/SocialSharingHandler';
import DestinationsIndex from '@/pages/destinations';
import London from '@/pages/destinations/London';
import Paris from '@/pages/destinations/Paris';
import Barcelona from '@/pages/destinations/Barcelona';
import Cyprus from '@/pages/destinations/Cyprus';
import Rome from '@/pages/destinations/Rome';
import AbuDhabi from '@/pages/destinations/AbuDhabi';
import Crete from '@/pages/destinations/Crete';
import Tokyo from '@/pages/destinations/Tokyo';
import Thailand from '@/pages/destinations/Thailand';
import HotelChains from '@/pages/destinations/HotelChains';
import NewYork from '@/pages/destinations/NewYork';
import AyiaNapa from '@/pages/destinations/AyiaNapa';
import Portugal from '@/pages/destinations/Portugal';
import SwissAlps from '@/pages/destinations/SwissAlps';
import Contact from '@/pages/Contact';
import AboutUs from '@/pages/AboutUs';
import Categories from '@/pages/Categories';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import DirectChat from '@/pages/DirectChat';
import Reviews from '@/pages/Reviews';
import FAQ from '@/pages/FAQ';
import SearchResults from '@/pages/SearchResults';
import Sitemap from '@/pages/Sitemap';
import Terms from '@/pages/Terms';
import AllergyTranslationCard from '@/pages/AllergyTranslationCard';
import KohSamui from '@/pages/destinations/KohSamui';
import Privacy from '@/pages/Privacy';
import Turkey from '@/pages/destinations/Turkey';
import CruiseLines from '@/pages/destinations/CruiseLines';
import Toronto from '@/pages/destinations/Toronto';
import Tuscany from '@/pages/destinations/Tuscany';
import GlutenFreeEurope from '@/pages/destinations/GlutenFreeEurope';
import AthensGlutenFree from "./pages/destinations/Athens";
import Eilat from "./pages/destinations/Eilat";
import Airlines from "./pages/destinations/Airlines";
import Amsterdam from "./pages/destinations/Amsterdam";
import Italy from "./pages/destinations/Italy";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const AppContent = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      }
    }
  }, [setTheme]);

  return (
    <>
      <GlobalSocialTags />
      <NetlifySocialHeaders />
      <SocialSharingHandler />
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<DestinationsIndex />} />
          <Route path="/destinations/london" element={<London />} />
          <Route path="/destinations/paris" element={<Paris />} />
          <Route path="/destinations/barcelona" element={<Barcelona />} />
          <Route path="/destinations/cyprus" element={<Cyprus />} />
          <Route path="/destinations/rome" element={<Rome />} />
          <Route path="/destinations/abu-dhabi" element={<AbuDhabi />} />
          <Route path="/destinations/abudhabi" element={<AbuDhabi />} />
          <Route path="/destinations/crete" element={<Crete />} />
          <Route path="/destinations/newyork" element={<NewYork />} />
          <Route path="/destinations/new-york" element={<NewYork />} />
          <Route path="/destinations/tokyo" element={<Tokyo />} />
          <Route path="/destinations/thailand" element={<Thailand />} />
          <Route path="/destinations/ayia-napa" element={<AyiaNapa />} />
          <Route path="/destinations/hotel-chains" element={<HotelChains />} />
          <Route path="/destinations/portugal" element={<Portugal />} />
          <Route path="/destinations/swiss-alps" element={<SwissAlps />} />
          <Route path="/destinations/tuscany" element={<Tuscany />} />
          <Route path="/destinations/gluten-free-europe" element={<GlutenFreeEurope />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/direct-chat" element={<DirectChat />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/allergy-translation-card" element={<AllergyTranslationCard />} />
          <Route path="/destinations/koh-samui" element={<KohSamui />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/destinations/turkey" element={<Turkey />} />
          <Route path="/destinations/cruise-lines" element={<CruiseLines />} />
          <Route path="/destinations/toronto" element={<Toronto />} />
          <Route path="/destinations/athens" element={<AthensGlutenFree />} />
          <Route path="/destinations/eilat" element={<Eilat />} />
          <Route path="/destinations/airlines" element={<Airlines />} />
          <Route path="/destinations/amsterdam" element={<Amsterdam />} />
          <Route path="/destinations/italy" element={<Italy />} />
          <Route path="/destinations/:destinationId" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <HelmetProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AppContent />
        </ThemeProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
