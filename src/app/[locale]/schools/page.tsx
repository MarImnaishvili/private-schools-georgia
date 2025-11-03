import ReadOnlySchoolDataGrid from "@/components/ReadOnlySchoolDataGrid";
import { Toaster } from "sonner";

export default function SchoolsTablePage() {
  return (
    <>
      <Toaster position="top-right" />
      <ReadOnlySchoolDataGrid />
    </>
  );
}
