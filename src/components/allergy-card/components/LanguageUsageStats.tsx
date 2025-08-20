import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Download, RefreshCw, Globe } from 'lucide-react';
import { getLanguageUsageStats, exportLanguageUsage, clearLanguageUsage } from '@/utils/languageTracker';
import { toast } from 'sonner';

interface LanguageStats {
  languageCode: string;
  languageName: string;
  count: number;
  lastUsed: Date;
}

export const LanguageUsageStats: React.FC = () => {
  const [stats, setStats] = useState<LanguageStats[]>([]);
  const [totalTranslations, setTotalTranslations] = useState(0);

  const loadStats = () => {
    const languageStats = getLanguageUsageStats();
    setStats(languageStats);
    setTotalTranslations(languageStats.reduce((sum, stat) => sum + stat.count, 0));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleExport = () => {
    const exportData = exportLanguageUsage();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `language-usage-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all language usage data? This cannot be undone.')) {
      clearLanguageUsage();
      loadStats();
    }
  };

  const getUsagePercentage = (count: number) => {
    return totalTranslations > 0 ? Math.round((count / totalTranslations) * 100) : 0;
  };

  const addSampleData = () => {
    // Add some sample data for testing
    const sampleLanguages = [
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' }
    ];
    
    sampleLanguages.forEach((lang, index) => {
      for (let i = 0; i < (5 - index); i++) {
        const currentUsage = JSON.parse(localStorage.getItem('allergy-card-language-usage') || '{}');
        currentUsage[lang.code] = {
          count: (currentUsage[lang.code]?.count || 0) + 1,
          lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          languageName: lang.name
        };
        localStorage.setItem('allergy-card-language-usage', JSON.stringify(currentUsage));
      }
    });
    
    loadStats();
    toast.success('Sample data added successfully!', { duration: 3000 });
  };

  if (stats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Usage Statistics
          </CardTitle>
          <CardDescription>No translation data available yet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Translation statistics will appear here once users start translating allergy cards. 
            Go to the <a href="/allergy-translation-card" className="text-primary hover:underline">Allergy Translation Card page</a> and try translating some allergies to different languages.
          </p>
          <Button onClick={addSampleData} variant="outline">
            Add Sample Data (For Testing)
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Language Usage Statistics
            </CardTitle>
            <CardDescription>
              Total translations: {totalTranslations} across {stats.length} languages
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadStats}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={handleClear}>
              Clear Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={stat.languageCode} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  #{index + 1}
                </Badge>
                <div>
                  <div className="font-medium">{stat.languageName}</div>
                  <div className="text-sm text-muted-foreground">
                    Code: {stat.languageCode} • Last used: {stat.lastUsed.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{stat.count} translations</div>
                <div className="text-sm text-muted-foreground">
                  {getUsagePercentage(stat.count)}% of total
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};