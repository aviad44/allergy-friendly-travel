
import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
import { NetlifySocialHeaders } from "@/components/NetlifySocialHeaders";
import { CanonicalTags } from "@/components/CanonicalTags";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DefaultMetaTags />
      <NetlifySocialHeaders />
      <CanonicalTags />
      <SiteHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
