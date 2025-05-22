
import React, { lazy } from 'react';

// Lazy-loaded pages
const Index = lazy(() => import('@/pages/Index'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const DestinationsIndex = lazy(() => import('@/pages/destinations/index'));
const AllergyTranslationCard = lazy(() => import('@/pages/AllergyTranslationCard'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const SearchResults = lazy(() => import('@/pages/SearchResults'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));

// Destination pages
const London = lazy(() => import('@/pages/destinations/London'));
const Paris = lazy(() => import('@/pages/destinations/Paris'));
const Barcelona = lazy(() => import('@/pages/destinations/Barcelona'));
const Cyprus = lazy(() => import('@/pages/destinations/Cyprus'));
const Rome = lazy(() => import('@/pages/destinations/Rome'));
const AbuDhabi = lazy(() => import('@/pages/destinations/AbuDhabi'));
const Crete = lazy(() => import('@/pages/destinations/Crete'));
const Tokyo = lazy(() => import('@/pages/destinations/Tokyo'));
const Thailand = lazy(() => import('@/pages/destinations/Thailand'));
const HotelChains = lazy(() => import('@/pages/destinations/HotelChains'));
const NewYork = lazy(() => import('@/pages/destinations/NewYork'));
const Portugal = lazy(() => import('@/pages/destinations/Portugal'));
const SwissAlps = lazy(() => import('@/pages/destinations/SwissAlps'));
const KohSamui = lazy(() => import('@/pages/destinations/KohSamui'));
const Turkey = lazy(() => import('@/pages/destinations/Turkey'));
const CruiseLines = lazy(() => import('@/pages/destinations/CruiseLines'));
const Toronto = lazy(() => import('@/pages/destinations/Toronto'));
const AyiaNapa = lazy(() => import('@/pages/destinations/AyiaNapa'));
const Tuscany = lazy(() => import('@/pages/destinations/Tuscany'));
const GlutenFreeEurope = lazy(() => import('@/pages/destinations/GlutenFreeEurope'));
const Athens = lazy(() => import('@/pages/destinations/Athens'));
const Eilat = lazy(() => import('@/pages/destinations/Eilat'));

// Define route configurations
export const routeConfigs = [
  { path: '/', element: <Index /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/destinations', element: <DestinationsIndex /> },
  { path: '/destinations/london', element: <London /> },
  { path: '/destinations/paris', element: <Paris /> },
  { path: '/destinations/barcelona', element: <Barcelona /> },
  { path: '/destinations/cyprus', element: <Cyprus /> },
  { path: '/destinations/rome', element: <Rome /> },
  { path: '/destinations/abu-dhabi', element: <AbuDhabi /> },
  { path: '/destinations/crete', element: <Crete /> },
  { path: '/destinations/tokyo', element: <Tokyo /> },
  { path: '/destinations/thailand', element: <Thailand /> },
  { path: '/destinations/hotel-chains', element: <HotelChains /> },
  { path: '/destinations/new-york', element: <NewYork /> },
  { path: '/destinations/portugal', element: <Portugal /> },
  { path: '/destinations/swiss-alps', element: <SwissAlps /> },
  { path: '/destinations/koh-samui', element: <KohSamui /> },
  { path: '/destinations/turkey', element: <Turkey /> },
  { path: '/destinations/cruise-lines', element: <CruiseLines /> },
  { path: '/destinations/toronto', element: <Toronto /> },
  { path: '/destinations/ayia-napa', element: <AyiaNapa /> },
  { path: '/destinations/tuscany', element: <Tuscany /> },
  { path: '/destinations/gluten-free-europe', element: <GlutenFreeEurope /> },
  { path: '/destinations/athens', element: <Athens /> },
  { path: '/destinations/eilat', element: <Eilat /> },
  { path: '/allergy-card', element: <AllergyTranslationCard /> },
  { path: '/contact', element: <Contact /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
  { path: '/reviews', element: <Reviews /> },
  { path: '/search', element: <SearchResults /> },
  { path: '/sitemap', element: <Sitemap /> },
  { path: '*', element: <NotFound /> },
];
