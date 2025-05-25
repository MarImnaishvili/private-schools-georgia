"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";

import type { ColDef } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

type Car = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

export default function SchoolTable() {
  const [rowData, setRowData] = useState<Car[]>([
    { make: "Tesla", model: "Model 3", price: 35000, electric: true },
    { make: "Ford", model: "F-150", price: 40000, electric: false },
  ]);

  // ✅ Explicitly type column definitions
  const [colDefs, setColDefs] = useState<ColDef<Car>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 400 }}>
      <AgGridReact<Car> rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
