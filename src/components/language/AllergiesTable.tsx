import { BookOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllergiesTable = () => {
  return (
    <div className="mt-16 bg-muted rounded-xl p-8">
      <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        French-English Allergy Dictionary
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>English</TableHead>
            <TableHead>French</TableHead>
            <TableHead>Pronunciation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>"I have a food allergy"</TableCell>
            <TableCell>"J'ai une allergie alimentaire"</TableCell>
            <TableCell>"Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Is this dish gluten-free?"</TableCell>
            <TableCell>"Est-ce que ce plat est sans gluten?"</TableCell>
            <TableCell>"Ess-kuh suh plah ay sahn gloo-tahn?"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Does this contain nuts?"</TableCell>
            <TableCell>"Est-ce que ça contient des noix?"</TableCell>
            <TableCell>"Ess-kuh sah kohn-tyahn day nwah?"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"I'm allergic to..."</TableCell>
            <TableCell>"Je suis allergique à..."</TableCell>
            <TableCell>"Zhuh swee ah-lehr-zheek ah..."</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>"Can you prepare this without..."</TableCell>
            <TableCell>"Pouvez-vous préparer ça sans..."</TableCell>
            <TableCell>"Poo-vay voo pray-pah-ray sah sahn..."</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AllergiesTable;