
import React from 'react';
import { Star, Check, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield } from 'lucide-react';
import { CruiseLine } from './types';

interface ComparisonTableProps {
  cruiseLines: CruiseLine[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ cruiseLines }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Shield className="mr-2 h-6 w-6 text-primary" />
        Quick Comparison Table
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cruise Line</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Family-Friendly</TableHead>
              <TableHead>Buffet Labels</TableHead>
              <TableHead>Chef Consult</TableHead>
              <TableHead>Notable Feature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cruiseLines.map(cruise => (
              <TableRow key={cruise.name}>
                <TableCell className="font-medium">{cruise.name}</TableCell>
                <TableCell>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < cruise.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {cruise.familyFriendly ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </TableCell>
                <TableCell>
                  {cruise.buffetLabels === true ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : cruise.buffetLabels === 'partial' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </TableCell>
                <TableCell>
                  {cruise.chefConsult ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </TableCell>
                <TableCell>{cruise.notableFeature}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
