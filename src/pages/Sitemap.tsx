
import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from 'react-helmet';

// Sitemap structure
const sitemapStructure = [
  {
    title: 'Main Pages',
    links: [
      { title: 'Home', path: '/' },
      { title: 'About Us', path: '/about' },
      { title: 'Contact', path: '/contact' },
      { title: 'FAQ', path: '/faq' },
      { title: 'Categories', path: '/categories' },
      { title: 'Reviews', path: '/reviews' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { title: 'All Destinations', path: '/destinations' },
      { title: 'London, UK', path: '/destinations/london' },
      { title: 'Paris, France', path: '/destinations/paris' },
      { title: 'Barcelona, Spain', path: '/destinations/barcelona' },
      { title: 'Abu Dhabi, UAE', path: '/destinations/abudhabi' },
      { title: 'New York, USA', path: '/destinations/newyork' },
      { title: 'Tokyo, Japan', path: '/destinations/tokyo' },
      { title: 'Thailand', path: '/destinations/thailand' },
      { title: 'Cyprus', path: '/destinations/cyprus' },
      { title: 'Crete, Greece', path: '/destinations/crete' },
      { title: 'Ayia Napa, Cyprus', path: '/destinations/ayia-napa' },
      { title: 'Portugal', path: '/destinations/portugal' },
      { title: 'Swiss Alps', path: '/destinations/swiss-alps' },
      { title: 'Hotel Chains', path: '/destinations/hotel-chains' },
    ],
  },
];

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Site Map | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Navigate through our site with this comprehensive site map, showing all pages and destinations on Allergy Free Travel." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8 text-blue-800">Site Map</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {sitemapStructure.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-semibold mb-4 text-blue-700">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="transition-colors">
                    <Link 
                      to={link.path}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
