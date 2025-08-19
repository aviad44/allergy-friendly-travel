// Language usage tracking for allergy card translations
interface LanguageUsage {
  [languageCode: string]: {
    count: number;
    lastUsed: string;
    languageName: string;
  };
}

const STORAGE_KEY = 'allergy-card-language-usage';

/**
 * Track language usage when a translation is requested
 */
export const trackLanguageUsage = (languageCode: string, languageName: string): void => {
  try {
    const currentUsage = getLanguageUsage();
    
    // Update or create entry for this language
    currentUsage[languageCode] = {
      count: (currentUsage[languageCode]?.count || 0) + 1,
      lastUsed: new Date().toISOString(),
      languageName: languageName
    };
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUsage));
    
    console.log(`Language usage tracked: ${languageName} (${languageCode}) - Total: ${currentUsage[languageCode].count}`);
  } catch (error) {
    console.error('Failed to track language usage:', error);
  }
};

/**
 * Get all language usage statistics
 */
export const getLanguageUsage = (): LanguageUsage => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to get language usage:', error);
    return {};
  }
};

/**
 * Get language usage statistics sorted by popularity
 */
export const getLanguageUsageStats = () => {
  const usage = getLanguageUsage();
  
  return Object.entries(usage)
    .map(([code, data]) => ({
      languageCode: code,
      languageName: data.languageName,
      count: data.count,
      lastUsed: new Date(data.lastUsed)
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Get the most popular languages (top N)
 */
export const getMostPopularLanguages = (limit: number = 5) => {
  return getLanguageUsageStats().slice(0, limit);
};

/**
 * Clear all language usage data (for testing/admin purposes)
 */
export const clearLanguageUsage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  console.log('Language usage data cleared');
};

/**
 * Export language usage data as JSON string
 */
export const exportLanguageUsage = (): string => {
  const usage = getLanguageUsage();
  const stats = getLanguageUsageStats();
  
  return JSON.stringify({
    exportDate: new Date().toISOString(),
    totalLanguages: Object.keys(usage).length,
    totalTranslations: Object.values(usage).reduce((sum, data) => sum + data.count, 0),
    languageStats: stats
  }, null, 2);
};