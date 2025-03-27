
import { BookOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllergiesTable = () => {
  return (
    <div className="mt-16 bg-muted rounded-xl p-8">
      <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        English-American Allergy Dictionary
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>English</TableHead>
            <TableHead>American English</TableHead>
            <TableHead>Pronunciation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>"I have a food allergy"</TableCell>
            <TableCell>"I have a food allergy"</TableCell>
            <TableCell>"I have a food allergy"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Is this dish gluten-free?"</TableCell>
            <TableCell>"Is this dish gluten-free?"</TableCell>
            <TableCell>"Is this dish gluten-free?"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Does this contain nuts?"</TableCell>
            <TableCell>"Does this contain nuts?"</TableCell>
            <TableCell>"Does this contain nuts?"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"I'm allergic to..."</TableCell>
            <TableCell>"I'm allergic to..."</TableCell>
            <TableCell>"I'm allergic to..."</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Can you prepare this without..."</TableCell>
            <TableCell>"Can you prepare this without..."</TableCell>
            <TableCell>"Can you prepare this without..."</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AllergiesTable;
