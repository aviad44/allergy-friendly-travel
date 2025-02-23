
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Reviews from "./pages/Reviews";
import Paris from "./pages/destinations/Paris";
import London from "./pages/destinations/London";
import Cyprus from "./pages/destinations/Cyprus";
import Crete from "./pages/destinations/Crete";
import Barcelona from "./pages/destinations/Barcelona";
import AyiaNapa from "./pages/destinations/AyiaNapa";
import AbuDhabi from "./pages/destinations/AbuDhabi";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/destinations/paris" element={<Paris />} />
              <Route path="/destinations/london" element={<London />} />
              <Route path="/destinations/cyprus" element={<Cyprus />} />
              <Route path="/destinations/crete" element={<Crete />} />
              <Route path="/destinations/barcelona" element={<Barcelona />} />
              <Route path="/destinations/ayia-napa" element={<AyiaNapa />} />
              <Route path="/destinations/abu-dhabi" element={<AbuDhabi />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
