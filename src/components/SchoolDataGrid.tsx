"use client";

import { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import { useTranslations } from "next-intl";
import SchoolModal from "./SchoolModal";
import { SchoolFormData } from "../schemas/schema";

ModuleRegistry.registerModules([AllCommunityModule]);

// ✅ Only lightweight fields for grid
interface SchoolGridRow {
  id: string;
  name?: string;
  phoneNumber1?: string;
  schoolsWebSite?: string;
  address: {
    city: string;
    street: string;
    zipCode: string;
    district: string;
  };
}

export default function SchoolsGrid() {
  const tForm = useTranslations("form");
  const [rowData, setRowData] = useState<SchoolGridRow[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<SchoolFormData | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const fetchSchools = useCallback(async () => {
    const response = await fetch("/api/schools");
    const fullData: SchoolFormData[] = await response.json();

    const gridData: SchoolGridRow[] = fullData.map((school) => ({
      id: school.id!,
      name: school.name,
      phoneNumber1: school.phoneNumber1,
      schoolsWebSite: school.schoolsWebSite,
      address: {
        city: school.address?.city ?? "",
        district: school.address?.district ?? "",
        street: school.address?.street ?? "",
        zipCode: school.address?.zipCode ?? "",
      },
    }));

    setRowData(gridData);
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleDelete = async (school: SchoolGridRow) => {
    if (!window.confirm(`Are you sure you want to delete ${school.name}?`))
      return;

    try {
      await fetch(`/api/schools/${school.id}`, { method: "DELETE" });

      const nodeToDelete = gridApi?.getRowNode(school.id);
      if (nodeToDelete) {
        gridApi!.applyTransaction({ remove: [school] });
      }
    } catch (error) {
      console.error("Failed to delete school", error);
      alert("Failed to delete school");
    }
  };

  const updateRowData = (updatedSchool: SchoolFormData) => {
    const updatedGridRow: SchoolGridRow = {
      id: updatedSchool.id!,
      name: updatedSchool.name,
      phoneNumber1: updatedSchool.phoneNumber1,
      schoolsWebSite: updatedSchool.schoolsWebSite,
      address: {
        city: updatedSchool.address?.city ?? "",
        district: updatedSchool.address?.district ?? "",
        street: updatedSchool.address?.street ?? "",
        zipCode: updatedSchool.address?.zipCode ?? "",
      },
    };

    const node = gridApi?.getRowNode(updatedGridRow.id);
    if (node) {
      node.setData(updatedGridRow);
    }
  };

  const openModal = async (school: SchoolGridRow, mode: "view" | "edit") => {
    const fullData = await fetchFullSchoolById(school.id);
    setSelectedSchool(fullData);
    setMode(mode);
    setModalOpen(true);
  };

  const columnDefs: ColDef<SchoolGridRow>[] = [
    {
      headerName: "#",
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      flex: 0.5,
    },
    {
      headerName: tForm("actions"),
      cellRenderer: (params: { data: SchoolGridRow }) => (
        <div className="flex gap-2 ">
          <button
            onClick={() => openModal(params.data, "view")}
            className="text-gray-400 hover:text-gray-800 transition-colors focus:outline-none"
          >
            View
          </button>
          <button
            onClick={() => openModal(params.data, "edit")}
            className="text-blue-400 hover:text-blue-800 transition-colors focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.data)}
            className="text-red-400 hover:text-red-800 transition-colors focus:outline-none"
          >
            Delete
          </button>
        </div>
      ),
      cellClass: "ag-no-focus-outline", // this class removes default outline
    },
    { headerName: tForm("name"), field: "name" },
    { headerName: tForm("phoneNumber1"), field: "phoneNumber1" },
    { headerName: tForm("schoolsWebSite"), field: "schoolsWebSite" },
    {
      headerName: tForm("address"),
      valueGetter: (params) =>
        `${params.data?.address?.city || ""}, ${
          params.data?.address?.district || ""
        }`,
    },
  ];

  return (
    <div className="ag-theme-alpine mt-12 h-screen max-w-5xl mx-auto">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        getRowId={(params) => params.data.id}
        onGridReady={onGridReady}
        pagination={true}
      />

      {modalOpen && selectedSchool && (
        <SchoolModal
          school={selectedSchool}
          mode={mode}
          onClose={() => setModalOpen(false)}
          onSave={updateRowData}
        />
      )}
    </div>
  );
}

async function fetchFullSchoolById(id: string): Promise<SchoolFormData> {
  const res = await fetch(`/api/schools/${id}`);
  const text = await res.text();
  return JSON.parse(text);
  if (!res.ok) throw new Error(`Failed to fetch school with ID ${id}`);
  return res.json();
}
