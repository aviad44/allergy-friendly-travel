
import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
import { NetlifySocialHeaders } from "@/components/NetlifySocialHeaders";
import { MetaManager } from "@/components/MetaManager";


export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <DefaultMetaTags />
      <NetlifySocialHeaders />
      <MetaManager routeKey="auto" />
      <SiteHeader />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
