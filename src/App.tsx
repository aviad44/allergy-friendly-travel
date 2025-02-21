
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import Reviews from '@/pages/Reviews';
import LePetitPalace from '@/pages/hotels/LePetitPalace';
import ParisReviews from '@/pages/destinations/ParisReviews';
import LondonReviews from '@/pages/destinations/LondonReviews';
import CreteReviews from '@/pages/destinations/CreteReviews';
import BarcelonaReviews from '@/pages/destinations/BarcelonaReviews';
import AyiaNapaReviews from '@/pages/destinations/AyiaNapaReviews';

import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/hotels/le-petit-palace" element={<LePetitPalace />} />
        <Route path="/reviews/paris" element={<ParisReviews />} />
        <Route path="/reviews/london" element={<LondonReviews />} />
        <Route path="/reviews/crete" element={<CreteReviews />} />
        <Route path="/reviews/barcelona" element={<BarcelonaReviews />} />
        <Route path="/reviews/ayia-napa" element={<AyiaNapaReviews />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
