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

const DestinationsIndex = lazy(() => import('@/pages/destinations'));
const London = lazy(() => import('@/pages/destinations/London'));
const Paris = lazy(() => import('@/pages/destinations/Paris'));
const Barcelona = lazy(() => import('@/pages/destinations/Barcelona'));
const Cyprus = lazy(() => import('@/pages/destinations/Cyprus'));
const Rome = lazy(() => import('@/pages/destinations/Rome'));
const AbuDhabi = lazy(() => import('@/pages/destinations/AbuDhabi'));
const Crete = lazy(() => import('@/pages/destinations/Crete'));
const Tokyo = lazy(() => import('@/pages/destinations/Tokyo'));
const Thailand = lazy(() => import('@/pages/destinations/Thailand'));
const HotelChains = lazy(() => import('@/pages/destinations/HotelChains'));
const NewYork = lazy(() => import('@/pages/destinations/NewYork'));
const AyiaNapa = lazy(() => import('@/pages/destinations/AyiaNapa'));
const Portugal = lazy(() => import('@/pages/destinations/Portugal'));
const SwissAlps = lazy(() => import('@/pages/destinations/SwissAlps'));
const Contact = lazy(() => import('@/pages/Contact'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Categories = lazy(() => import('@/pages/Categories'));
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const DirectChat = lazy(() => import('@/pages/DirectChat'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const SearchResults = lazy(() => import('@/pages/SearchResults'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const Terms = lazy(() => import('@/pages/Terms'));
const AllergyTranslationCard = lazy(() => import('@/pages/AllergyTranslationCard'));
const KohSamui = lazy(() => import('@/pages/destinations/KohSamui'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Turkey = lazy(() => import('@/pages/destinations/Turkey'));
const CruiseLines = lazy(() => import('@/pages/destinations/CruiseLines'));
const Toronto = lazy(() => import('@/pages/destinations/Toronto'));
const Tuscany = lazy(() => import('@/pages/destinations/Tuscany'));
const GlutenFreeEurope = lazy(() => import('@/pages/destinations/GlutenFreeEurope'));
const AthensGlutenFree = lazy(() => import('./pages/destinations/Athens'));
const Eilat = lazy(() => import('./pages/destinations/Eilat'));
const Airlines = lazy(() => import('./pages/destinations/Airlines'));
const Amsterdam = lazy(() => import('./pages/destinations/Amsterdam'));
const Italy = lazy(() => import('./pages/destinations/Italy'));
const Stockholm = lazy(() => import('./pages/destinations/Stockholm'));
const Madrid = lazy(() => import('./pages/destinations/Madrid'));
const FlyingWithEpipens = lazy(() => import('./pages/destinations/FlyingWithEpipens'));
const FlyingWithEpipensNorthAmerica = lazy(() => import('./pages/destinations/FlyingWithEpipensNorthAmerica'));
const WarmWinterDestinations = lazy(() => import('./pages/destinations/WarmWinterDestinations'));
const Articles = lazy(() => import('@/pages/Articles'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
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
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
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
            <Route path="/destinations/stockholm" element={<Stockholm />} />
            <Route path="/destinations/madrid" element={<Madrid />} />
            <Route path="/destinations/flying-with-epipens" element={<FlyingWithEpipens />} />
            <Route path="/destinations/flying-with-epipens-north-america" element={<FlyingWithEpipensNorthAmerica />} />
            <Route path="/destinations/warm-winter-destinations" element={<WarmWinterDestinations />} />
            {/* <Route path="/menu-scanner" element={<MenuScanner />} /> */}
            <Route path="/destinations/:destinationId" element={<NotFound />} />
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
