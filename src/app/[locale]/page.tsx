// app/[locale]/page.tsx

import SchoolTable from "@/components/SchoolTable";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        <SchoolTable />
      </h1>
    </div>
  );
}
