
export function generateSocialTags(url) {
  const path = new URL(url).pathname;
  const destMatch = path.match(/\/destinations\/([a-zA-Z0-9-_]+)/);
  
  let ogTitle = "Allergy-Free Travel – Hotels for Food Allergies";
  let ogDesc = "Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind.";
  let ogImage = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  
  // Homepage customization
  if (path === '/' || path === '') {
    ogImage = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    ogTitle = "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions";
    ogDesc = "Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more.";
  }
  // Destination-specific customization
  else if (destMatch) {
    const destId = destMatch[1].toLowerCase();
    
    const criticalDestinations = {
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
      'cyprus': "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      'athens': "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
      'hotel-chains': "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      'ayia-napa': "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      'rome': "https://images.unsplash.com/photo-1552832230-c0197047daf6?auto=format&fit=crop&w=1200&q=80",
      'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      'paris': "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      'switzerland': "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=1200&q=80",
      'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      'tuscany': "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
      'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
      'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80"
    };
    
    if (criticalDestinations[destId]) {
      ogImage = criticalDestinations[destId];
      ogTitle = `Allergy-Friendly Hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)} | Safe Dining Guide`;
      ogDesc = `Discover the best allergy-friendly hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`;
    }
  }
  
  return { ogTitle, ogDesc, ogImage };
}

export function generateSocialHTML(url, ogTitle, ogDesc, ogImage) {
  return `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <title>${ogTitle}</title>
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDesc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:secure_url" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Allergy-Free Travel" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDesc}" />
  <link rel="canonical" href="${url}" />
  <link rel="image_src" href="${ogImage}" />
  <meta http-equiv="refresh" content="2;URL='${url}'" />
</head>
<body>
  <h1>${ogTitle}</h1>
  <p>${ogDesc}</p>
  <img src="${ogImage}" alt="Allergy Free Travel" style="width:100%; max-width:600px; height:auto;" />
  <p><a href="${url}">Continue to Allergy Free Travel</a></p>
</body>
</html>`;
}
