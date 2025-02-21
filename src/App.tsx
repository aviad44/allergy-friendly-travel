
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import Reviews from '@/pages/Reviews';
import Destinations from '@/pages/destinations';
import LePetitPalace from '@/pages/hotels/LePetitPalace';
import ParisReviews from '@/pages/destinations/ParisReviews';
import LondonReviews from '@/pages/destinations/LondonReviews';
import CreteReviews from '@/pages/destinations/CreteReviews';
import BarcelonaReviews from '@/pages/destinations/BarcelonaReviews';
import AyiaNapaReviews from '@/pages/destinations/AyiaNapaReviews';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/paris" element={<ParisReviews />} />
            <Route path="/destinations/london" element={<LondonReviews />} />
            <Route path="/destinations/crete" element={<CreteReviews />} />
            <Route path="/destinations/barcelona" element={<BarcelonaReviews />} />
            <Route path="/destinations/ayia-napa" element={<AyiaNapaReviews />} />
            <Route path="/hotels/le-petit-palace" element={<LePetitPalace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
