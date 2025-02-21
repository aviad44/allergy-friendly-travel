
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LanguageTableProps {
  headers: string[];
  rows: {
    original: string;
    translation: string;
    pronunciation: string;
  }[];
  destinationName: string;
}

export const LanguageTable = ({ headers, rows, destinationName }: LanguageTableProps) => {
  return (
    <section aria-label={`${destinationName} Language Tips`} className="bg-muted rounded-xl p-6 mt-16">
      <h3 className="text-xl font-display font-bold mb-4">Essential Phrases for Travelers with Allergies</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="w-1/3">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.original}</TableCell>
                <TableCell className="italic">{row.translation}</TableCell>
                <TableCell className="text-muted-foreground">{row.pronunciation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
