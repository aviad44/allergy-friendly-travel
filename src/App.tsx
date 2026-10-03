import React, { Suspense, lazy, useEffect } from 'react';
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
import { SEOHead } from "@/components/SEOHead";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
// Statically imported (not lazy): "/" is the single most common landing
// route, so lazy-loading it only added a chunk-fetch round trip before its
// LCP hero image could even be discovered — pure cost, no bundle savings.
import Index from '@/pages/Index';

const DestinationsIndex = lazy(() => import('@/pages/destinations'));
const HotelChains = lazy(() => import('@/pages/destinations/HotelChains'));
const Contact = lazy(() => import('@/pages/Contact'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Categories = lazy(() => import('@/pages/Categories'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const DirectChat = lazy(() => import('@/pages/DirectChat'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const SearchResults = lazy(() => import('@/pages/SearchResults'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const Terms = lazy(() => import('@/pages/Terms'));
const AllergyTranslationCard = lazy(() => import('@/pages/AllergyTranslationCard'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const CruiseLines = lazy(() => import('@/pages/destinations/CruiseLines'));
const Eilat = lazy(() => import('./pages/destinations/Eilat'));
const Airlines = lazy(() => import('./pages/destinations/Airlines'));
const Madrid = lazy(() => import('./pages/destinations/Madrid'));
const FlyingWithEpipens = lazy(() => import('./pages/destinations/FlyingWithEpipens'));
const FlyingWithEpipensNorthAmerica = lazy(() => import('./pages/destinations/FlyingWithEpipensNorthAmerica'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const Restaurants = lazy(() => import('@/pages/Restaurants'));
const RestaurantDetail = lazy(() => import('@/pages/RestaurantDetail'));
const DestinationRegionHub = lazy(() => import('@/pages/destinations/RegionHub'));
const RestaurantRegionHub = lazy(() => import('@/pages/restaurants/RegionHub'));
const GlutenFree = lazy(() => import('@/pages/GlutenFree'));
// import MenuScanner from "./pages/MenuScanner"; // Temporarily disabled

const RouteLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-[#00b397] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
      <ScrollToTop />
      <SEOHead />
      <DefaultMetaTags />
      <Toaster />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<DestinationsIndex />} />
            <Route path="/destinations/hotel-chains" element={<HotelChains />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/region/:region" element={<RestaurantRegionHub />} />
            <Route path="/restaurants/:slug" element={<RestaurantDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/direct-chat" element={<DirectChat />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/allergy-translation-card" element={<AllergyTranslationCard />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/destinations/cruise-lines" element={<CruiseLines />} />
            <Route path="/destinations/eilat" element={<Eilat />} />
            <Route path="/destinations/airlines" element={<Airlines />} />
            <Route path="/destinations/madrid" element={<Madrid />} />
            <Route path="/destinations/flying-with-epipens" element={<FlyingWithEpipens />} />
            <Route path="/destinations/flying-with-epipens-north-america" element={<FlyingWithEpipensNorthAmerica />} />
            <Route path="/destinations/region/:region" element={<DestinationRegionHub />} />
            <Route path="/gluten-free" element={<GlutenFree />} />
            {/* <Route path="/menu-scanner" element={<MenuScanner />} /> */}
            {/* Catch-all for auto-generated hotel-guide slugs not covered by a
                static page above (React Router ranks literal segments above
                this dynamic one, so none of the routes above are shadowed).
                ArticleDetail renders its own NotFound if the slug doesn't
                exist in seo_articles. */}
            <Route path="/destinations/:slug" element={<ArticleDetail />} />
          </Route>
        </Routes>
      </Suspense>
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
