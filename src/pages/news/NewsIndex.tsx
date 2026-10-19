import { Link } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { NEWS_ARTICLES } from '@/data/news';

const BASE_URL = 'https://www.allergy-free-travel.com';

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const NewsIndex = () => {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Food Allergy Travel News',
    itemListElement: NEWS_ARTICLES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/news/${a.slug}/`,
      name: a.title,
    })),
  };

  return (
    <>
      <MetaManager dynamicData={{ jsonLdExtra: itemListJsonLd }} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">Food Allergy Travel News</h1>
        <p className="text-gray-600 mb-10">
          The latest developments in airline, hotel and travel policy for people with food allergies — fact-checked
          against primary sources, with every claim linked.
        </p>

        <ul className="space-y-8">
          {NEWS_ARTICLES.map((a) => (
            <li key={a.slug} className="border-b border-gray-100 pb-8">
              <Link to={`/news/${a.slug}/`} className="group grid gap-4 sm:grid-cols-[220px_1fr] items-start">
                <img
                  src={a.heroImage}
                  alt={a.heroAlt}
                  loading="lazy"
                  width={440}
                  height={260}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                  </p>
                  <h2 className="font-display text-xl font-semibold text-blue-800 group-hover:text-blue-600 mb-2">
                    {a.title}
                  </h2>
                  <p className="text-gray-700">{a.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewsIndex;
