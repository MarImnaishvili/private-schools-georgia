// app/[locale]/page.tsx

import SchoolDataGrid from "@/components/SchoolDataGrid";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="p-4">
        <h1 className="text-xl font-bold">
          <SchoolDataGrid />
        </h1>
      </div>
    </ErrorBoundary>
  );
}
