// SEO-optimized content for allergy translation cards
export const allergyCardSEOContent = {
  keywords: {
    primary: [
      'allergy translation card',
      'food allergy card',
      'allergy travel card', 
      'dining card',
      'restaurant allergy card'
    ],
    secondary: [
      'travel with allergies',
      'food allergy translation',
      'allergy communication card',
      'printable allergy card',
      'multilingual allergy card'
    ],
    longTail: [
      'free allergy translation card generator',
      'printable food allergy cards multiple languages',
      'restaurant dining card for allergies',
      'travel allergy card download',
      'allergy card generator no registration'
    ]
  },
  
  languages: [
    { code: 'es', name: 'Spanish', flag: '🇪🇸', searchVolume: 'high' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', searchVolume: 'medium' },
    { code: 'fr', name: 'French', flag: '🇫🇷', searchVolume: 'high' },
    { code: 'th', name: 'Thai', flag: '🇹🇭', searchVolume: 'medium' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', searchVolume: 'medium' },
    { code: 'de', name: 'German', flag: '🇩🇪', searchVolume: 'medium' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', searchVolume: 'medium' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱', searchVolume: 'low' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', searchVolume: 'medium' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', searchVolume: 'high' }
  ],

  competitorAnalysis: {
    targetKeywords: [
      'allergy translation card',
      'food allergy travel card', 
      'restaurant allergy card',
      'printable allergy card',
      'allergy dining card'
    ],
    contentGaps: [
      'Voice input for card creation',
      'Multiple download formats',
      'Wallet-size optimization',
      'Cross-contamination warnings',
      'Chef communication tips'
    ]
  }
};

export const generateSEOMetaDescription = (language?: string): string => {
  const base = "Create free printable allergy translation cards in 50+ languages. Essential tool for travelers with food allergies. Download instantly";
  
  if (language) {
    return `${base} - ${language} allergy cards available.`;
  }
  
  return `${base} - no registration required.`;
};

export const generateSEOTitle = (language?: string): string => {
  const base = "Free Allergy Translation Card Generator | 50+ Languages";
  
  if (language) {
    return `${language} Allergy Card Generator | ${base}`;
  }
  
  return `${base} | Food Allergy Travel Cards`;
};