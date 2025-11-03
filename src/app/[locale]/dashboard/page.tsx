import SchoolsGrid from "@/components/SchoolDataGrid";
import { Toaster } from "sonner";

export default function DashboardPage() {
  return (
    <>
      <Toaster position="top-right" />
      <SchoolsGrid />
    </>
  );
}
