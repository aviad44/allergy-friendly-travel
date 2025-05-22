
import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import MainLayout from "@/components/layout/MainLayout";
import { routeConfigs } from "@/router-config";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { GlobalSocialTags } from "@/components/GlobalSocialTags";
import { NetlifySocialHeaders } from "@/components/NetlifySocialHeaders";

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const location = useLocation();
  
  // Log page views to help with debugging
  useEffect(() => {
    console.log(`Page view: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalSocialTags />
      <NetlifySocialHeaders />
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routeConfigs.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </MainLayout>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;
