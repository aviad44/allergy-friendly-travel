
import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
import { NetlifySocialHeaders } from "@/components/NetlifySocialHeaders";
import { MetaManager } from "@/components/MetaManager";
import { ErrorBoundary } from "@/components/ErrorBoundary";


export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <DefaultMetaTags />
      <NetlifySocialHeaders />
      <MetaManager routeKey="auto" />
      <SiteHeader />
      {/* Boundary sits around the page content only, not the header/footer,
          so a crash on one page still leaves navigation working instead of
          taking down the whole site (see ErrorBoundary.tsx for why this
          exists). */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
