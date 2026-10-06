import { Link, useParams } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { ArticleByline } from '@/components/ArticleByline';
import { AllergyCardPromo } from '@/components/AllergyCardPromo';
import { SITE_AUTHOR } from '@/constants/author';
import { NEWS_ARTICLES, getNewsArticle } from '@/data/news';
import NotFound from '@/pages/NotFound';

const BASE_URL = 'https://www.allergy-free-travel.com';

// Date-only ISO strings parse as UTC midnight, which renders as the previous
// day in every timezone west of UTC — pin to midday so the visible byline
// shows the real date everywhere.
const atNoonUtc = (date: string) => `${date}T12:00:00Z`;

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsArticle(slug) : undefined;
  if (!article) return <NotFound />;

  const { Body } = article;
  // Trailing slash: matches the URL this route actually resolves to without
  // a redirect (see buildCanonical in utils/seo.ts).
  const url = `${BASE_URL}/news/${article.slug}/`;
  const related = NEWS_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.seoTitle,
    alternativeHeadline: article.title,
    description: article.description,
    image: [article.heroImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: 'en',
    articleSection: 'News',
    author: { '@type': 'Person', name: SITE_AUTHOR.name, url: SITE_AUTHOR.url, jobTitle: SITE_AUTHOR.jobTitle },
    publisher: {
      '@type': 'Organization',
      name: 'Allergy-Free Travel',
      url: `${BASE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.png` },
    },
    // Lets answer engines see exactly which primary sources back the claims.
    citation: article.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaManager
        dynamicData={{
          title: article.seoTitle,
          description: article.description,
          image: article.heroImage,
          type: 'article',
          canonical: url,
          jsonLdExtra: [newsArticleJsonLd, faqJsonLd],
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/news/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block">
          &larr; All news
        </Link>

        <article className="bg-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">News</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">{article.title}</h1>

          <ArticleByline publishedAt={atNoonUtc(article.publishedAt)} updatedAt={atNoonUtc(article.updatedAt)} />

          <figure className="mb-8">
            <img
              src={article.heroImage}
              alt={article.heroAlt}
              loading="eager"
              fetchPriority="high"
              width={1200}
              height={630}
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
            {article.heroCredit && <figcaption className="text-xs text-gray-400 mt-1">{article.heroCredit}</figcaption>}
          </figure>

          <section aria-labelledby="key-takeaways" className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h2 id="key-takeaways" className="font-display text-lg font-semibold text-blue-900 mb-3">
              Key takeaways
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              {article.keyTakeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <div className="prose prose-blue max-w-none mb-10">
            <Body />
          </div>

          <section aria-labelledby="faq" className="mb-10 border-t pt-8">
            <h2 id="faq" className="font-display text-2xl font-bold text-blue-800 mb-6">
              Frequently asked questions about flying with food allergies
            </h2>
            <div className="space-y-6">
              {article.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.question}</h3>
                  <p className="text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="bottom-line" className="prose prose-blue max-w-none mb-10 border-t pt-8">
            <h2 id="bottom-line">The bottom line</h2>
            <p>
              Airline food allergy policies are not uniform, but 2026 is bringing renewed attention to how passengers
              with severe allergies are protected in the air. Check the policy of the airline actually operating your
              flight, notify the carrier about severe allergies, carry your prescribed emergency medication, and never
              assume an airline can provide an allergen-free environment.
            </p>
            <p>
              At Allergy-Free Travel, we keep tracking airline and hotel allergy policies and real experiences from
              travelers with food allergies, so families can make better-informed travel decisions.
            </p>
          </section>

          <section aria-labelledby="sources" className="mb-10 border-t pt-8">
            <h2 id="sources" className="font-display text-lg font-semibold text-blue-800 mb-3">
              Sources
            </h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener" className="text-blue-700 underline hover:text-blue-900">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <aside className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Important:</strong> Airline policies can change and individual accommodations cannot be guaranteed.
            Always verify current procedures directly with the operating airline before travel. Medical information on
            this page is general information and does not replace advice from your physician or allergy specialist.
          </aside>

          <div className="mb-10">
            <AllergyCardPromo />
          </div>

          {related.length > 0 && (
            <div className="border-t pt-8 mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">More news</h2>
              <ul className="space-y-2">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/news/${a.slug}/`} className="text-blue-600 hover:text-blue-800">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default NewsArticlePage;
