
import React from 'react';
import { LanguageTable } from './LanguageTable';

export interface LanguageTableSectionProps {
  headers: string[];
  rows: string[][];
  title?: string;
}

export const LanguageTableSection = ({ headers, rows, title = "Useful Phrases" }: LanguageTableSectionProps) => {
  if (!headers || !rows || rows.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <LanguageTable headers={headers} rows={rows} />
      </div>
    </section>
  );
};
