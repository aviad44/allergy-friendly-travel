
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LanguageTableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
  textAlignment: string;
}

export const LanguageTable = ({ data, textAlignment }: LanguageTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-primary/5">
            {data.headers.map((header, index) => (
              <TableHead 
                key={index} 
                className={`p-3 text-primary font-semibold ${index === 0 ? textAlignment : 'text-center'}`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-primary/10 hover:bg-primary/5">
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`p-3 ${cellIndex === 0 ? textAlignment : 'text-center'} ${cellIndex === 0 ? 'font-medium' : ''}`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
