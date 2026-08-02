
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaManager } from "@/components/MetaManager";
import { destinations } from '@/data/destinations-list';
import { supabase } from '@/integrations/supabase/client';
import { markPrerenderNotReady, markPrerenderReady } from '@/utils/prerenderReady';

interface SitemapLink {
  title: string;
  path: string;
}

const MAIN_PAGES: SitemapLink[] = [
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Categories', path: '/categories' },
  { title: 'Reviews', path: '/reviews' },
  { title: 'Allergy Translation Card', path: '/allergy-translation-card' },
  { title: 'Privacy Policy', path: '/privacy' },
  { title: 'Terms of Use', path: '/terms' },
];

const SitemapSection = ({ title, links }: { title: string; links: SitemapLink[] }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h2 className="font-display text-xl font-semibold mb-4 text-blue-700">{title}</h2>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.path} className="transition-colors">
          <Link
            to={link.path}
            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Sitemap = () => {
  // Real-data driven: the static destination pages come from the same
  // source-of-truth array every destination route/page uses (so a new
  // static page is never missing here), and the AI-generated guides are
  // fetched live rather than hardcoded, so this page never goes stale as
  // the daily content pipeline publishes new ones.
  const [hotelArticles, setHotelArticles] = useState<SitemapLink[]>([]);
  const [restaurantArticles, setRestaurantArticles] = useState<SitemapLink[]>([]);

  useEffect(() => {
    markPrerenderNotReady();
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('seo_articles')
        .select('slug, title, content_type')
        .eq('status', 'published')
        .order('title', { ascending: true });
      if (data) {
        setHotelArticles(
          data.filter((a) => a.content_type === 'hotel').map((a) => ({ title: a.title, path: `/destinations/${a.slug}` }))
        );
        setRestaurantArticles(
          data.filter((a) => a.content_type === 'restaurant').map((a) => ({ title: a.title, path: `/restaurants/${a.slug}` }))
        );
      }
      markPrerenderReady();
    };
    fetchArticles();
  }, []);

  const destinationLinks: SitemapLink[] = [
    { title: 'All Destinations', path: '/destinations' },
    ...destinations.map((d) => ({ title: `${d.name}, ${d.country}`, path: `/destinations/${d.id}` })),
    ...hotelArticles,
  ];

  const restaurantLinks: SitemapLink[] = [
    { title: 'All Restaurant Guides', path: '/restaurants' },
    ...restaurantArticles,
  ];

  return (
    <>
      <MetaManager />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">Site Map</h1>
        <p className="text-gray-600 mb-8">Every guide on Allergy-Free Travel, in one place.</p>

        <div className="grid gap-8 md:grid-cols-2">
          <SitemapSection title="Main Pages" links={MAIN_PAGES} />
          <SitemapSection title="Destinations" links={destinationLinks} />
          <SitemapSection title="Restaurants" links={restaurantLinks} />
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="font-display text-xl font-semibold mb-4 text-blue-700">Resources</h2>
          <p className="mb-4">For a machine-readable XML sitemap for search engines, please visit:</p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            sitemap.xml
          </a>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
