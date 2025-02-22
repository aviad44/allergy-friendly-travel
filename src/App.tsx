
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
import Paris from '@/pages/destinations/Paris';
import London from '@/pages/destinations/London';
import Crete from '@/pages/destinations/Crete';
import Barcelona from '@/pages/destinations/Barcelona';
import AyiaNapa from '@/pages/destinations/AyiaNapa';

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
            <Route path="/destinations/paris" element={<Paris />} />
            <Route path="/destinations/london" element={<London />} />
            <Route path="/destinations/crete" element={<Crete />} />
            <Route path="/destinations/barcelona" element={<Barcelona />} />
            <Route path="/destinations/ayia-napa" element={<AyiaNapa />} />
            <Route path="/hotels/le-petit-palace" element={<LePetitPalace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
