const { createClient } = require('@supabase/supabase-js');

const BASE_URL = 'https://www.allergy-free-travel.com';

// Static pages that don't change often. lastmod is set to build/request time
// rather than a hardcoded date so it never goes stale again.
const STATIC_PATHS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/terms', changefreq: 'monthly', priority: '0.6' },
  { path: '/categories', changefreq: 'weekly', priority: '0.8' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.8' },
  { path: '/destinations', changefreq: 'weekly', priority: '0.9' },
  { path: '/articles', changefreq: 'daily', priority: '0.9' },
  { path: '/allergy-translation-card', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/london', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/paris', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/barcelona', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/cyprus', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/crete', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/abu-dhabi', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/thailand', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/ayia-napa', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/rome', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/tokyo', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/new-york', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/portugal', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/swiss-alps', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/koh-samui', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/turkey', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/cruise-lines', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/toronto', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/tuscany', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/gluten-free-europe', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/athens', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/eilat', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/hotel-chains', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/airlines', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/flying-with-epipens', changefreq: 'monthly', priority: '0.9' },
  { path: '/destinations/flying-with-epipens-north-america', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/amsterdam', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/italy', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/madrid', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/stockholm', changefreq: 'monthly', priority: '0.8' },
  { path: '/destinations/warm-winter-destinations', changefreq: 'monthly', priority: '0.8' },
  { path: '/direct-chat', changefreq: 'monthly', priority: '0.6' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.4' },
];

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

exports.handler = async () => {
  const today = new Date().toISOString().split('T')[0];
  const entries = STATIC_PATHS.map((p) =>
    urlEntry(`${BASE_URL}${p.path}`, today, p.changefreq, p.priority)
  );

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: articles } = await supabase
        .from('seo_articles')
        .select('slug, published_at, updated_at')
        .eq('status', 'published');

      for (const article of articles || []) {
        const lastmod = (article.updated_at || article.published_at || today).split('T')[0];
        entries.push(urlEntry(`${BASE_URL}/articles/${article.slug}`, lastmod, 'weekly', '0.7'));
      }
    }
  } catch (err) {
    console.error('Sitemap: failed to load articles from Supabase:', err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
    body: xml,
  };
};
