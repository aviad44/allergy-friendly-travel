
export const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'FacebookBot',
  'facebook',
  'Facebook',
  'whatsapp',
  'WhatsApp',
  'twitter',
  'twitterbot',
  'linkedinbot',
  'pinterest',
  'instagrambot'
];

export function detectBot(userAgent) {
  const lowerUserAgent = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => 
    lowerUserAgent.includes(bot.toLowerCase())
  );
}

export function isSocialMediaBot(userAgent) {
  const lowerUserAgent = userAgent.toLowerCase();
  return lowerUserAgent.includes('facebook') || lowerUserAgent.includes('whatsapp');
}

export function isFacebookCrawler(userAgent) {
  const lowerUserAgent = userAgent.toLowerCase();
  return lowerUserAgent.includes('facebook') || lowerUserAgent.includes('facebookexternalhit');
}
