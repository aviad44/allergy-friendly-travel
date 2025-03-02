
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

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
import Cyprus from '@/pages/destinations/Cyprus';
import AbuDhabi from '@/pages/destinations/AbuDhabi';
import Thailand from '@/pages/destinations/Thailand';
import AboutUs from '@/pages/AboutUs';

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
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
              <Route path="/destinations/cyprus" element={<Cyprus />} />
              <Route path="/destinations/abu-dhabi" element={<AbuDhabi />} />
              <Route path="/destinations/thailand" element={<Thailand />} />
              <Route path="/hotels/le-petit-palace" element={<LePetitPalace />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
