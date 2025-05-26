// app/[locale]/page.tsx

import SchoolDataGrid from "@/components/SchoolDataGrid";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        <SchoolDataGrid />
      </h1>
    </div>
  );
}
