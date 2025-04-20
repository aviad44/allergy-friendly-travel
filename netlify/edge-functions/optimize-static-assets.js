
export default async function handler(request, context) {
  // List of known bot user agents to route to Prerender.io
  const botUserAgents = [
    'facebookexternalhit',
    'WhatsApp',
    'Twitterbot',
    'Pinterest',
    'LinkedInBot',
    'Slackbot',
    'TelegramBot',
    'Discordbot',
    'Googlebot',
    'bingbot',
    'Baiduspider',
    'seznambot',
    'bytespider',
    'ia_archiver',
    'facebot',
    'prerender',
    'prerendercloud',
    'Prerender',
    'PrerenderIO'
  ];

  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  const accept = request.headers.get('accept') || '';
  
  // Check for image client hints header to serve optimized images
  const viewportWidth = request.headers.get('viewport-width') || '';
  const dpr = request.headers.get('dpr') || '1';
  
  // Check if accepting webp images
  const acceptsWebp = accept.includes('image/webp');
  
  // Check if the user agent is a bot
  const isBot = botUserAgents.some(botAgent => 
    userAgent.toLowerCase().includes(botAgent.toLowerCase())
  );
  
  // Set custom headers for image optimization if needed
  if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('unsplash.com')) {
    // Determine if we should resize/optimize the image based on client hints
    const width = viewportWidth ? parseInt(viewportWidth, 10) : 0;
    const devicePixelRatio = parseFloat(dpr);
    
    // We'll let the CDN know the client's capabilities
    const responseHeaders = {
      'Accept-CH': 'Viewport-Width, DPR, Width',
      'Vary': 'Accept, Viewport-Width, DPR'
    };
    
    // For Unsplash images, we can use their built-in optimization
    if (url.includes('unsplash.com') && !url.includes('fm=webp') && acceptsWebp) {
      const optimizedUrl = new URL(url);
      optimizedUrl.searchParams.set('fm', 'webp');
      
      if (width > 0) {
        // Calculate optimal width based on DPR and add some buffer
        const optimalWidth = Math.ceil(width * devicePixelRatio * 1.2);
        optimizedUrl.searchParams.set('w', Math.min(optimalWidth, 2000).toString());
      }
      
      return Response.redirect(optimizedUrl.toString(), 302);
    }
    
    return context.next({
      headers: responseHeaders
    });
  }

  // Add the Prerender header for bots
  if (isBot) {
    context.log(`Bot detected: ${userAgent} for URL: ${url}`);
    
    // Get the Prerender token from environment variables
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    // Add Prerender header to trigger the redirect in netlify.toml
    return context.next({
      headers: {
        'Prerender': 'true',
        'X-Prerender-Token': prerenderToken,
        'x-prerender-requestid': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });
  }

  // Add performance headers for all responses
  return context.next({
    headers: {
      // Enable browser features that enhance performance
      'Feature-Policy': 'layout-animations *; unoptimized-images none',
      'Accept-CH': 'Viewport-Width, DPR, Width, Sec-CH-UA, Sec-CH-UA-Mobile',
      'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
    }
  });
}
