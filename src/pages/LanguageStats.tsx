import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LanguageUsageStats } from '@/components/allergy-card/components/LanguageUsageStats';
import { MetaManager } from '@/components/MetaManager';

export default function LanguageStats() {
  return (
    <>
      <MetaManager 
        routeKey="language-stats"
        dynamicData={{
          title: "Language Usage Statistics - Allergy Card Translations",
          description: "View statistics on which languages are most requested for allergy card translations"
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Language Usage Statistics</h1>
            <p className="text-muted-foreground text-lg">
              Track which languages are most requested for allergy card translations to help improve our service.
            </p>
          </div>
          
          <LanguageUsageStats />
        </div>
      </div>
    </>
  );
}