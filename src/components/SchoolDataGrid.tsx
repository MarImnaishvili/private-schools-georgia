"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { useTranslations } from "next-intl";
import SchoolModal from "./SchoolModal";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface School {
  id: string;
  name: string;
  phoneNumber1: string;
  director: string;
  hasTutor: boolean;
  address: { city: string; street: string; zipCode: string; district: string };
  schoolsWebSite: string;
}

export default function SchoolsGrid() {
  const tForm = useTranslations("form");
  const [rowData, setRowData] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch("/api/schools");
      const data = await response.json();
      setRowData(data);
    };

    fetchSchools();
  }, []);

  const columnDefs: ColDef<School>[] = [
    { headerName: tForm("id"), field: "id" }, // is it possible here to be just numeric numbers?
    { headerName: tForm("name"), field: "name" },
    { headerName: tForm("phoneNumber1"), field: "phoneNumber1" },
    { headerName: tForm("schoolsWebSite"), field: "schoolsWebSite" },
    { headerName: tForm("director"), field: "director" },
    { headerName: tForm("hasTutor"), field: "hasTutor" },
    {
      headerName: tForm("address"),
      valueGetter: (params) =>
        `${params.data?.address?.city || ""}, ${
          params.data?.address?.district || ""
        }`,
    },
    {
      headerName: tForm("actions"),
      cellRenderer: (params: { data: any }) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => openModal(params.data, "view")}>View</button>
          <button onClick={() => openModal(params.data, "edit")}>Edit</button>
          <button
            onClick={() => handleDelete(params.data)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (school: School) => {
    if (!window.confirm(`Are you sure you want to delete ${school.name}?`))
      return;

    try {
      await fetch(`/api/schools/${school.id}`, { method: "DELETE" });
      setRowData((prev: School[]) => prev.filter((s) => s.id !== school.id));
    } catch (error) {
      console.error("Failed to delete school", error);
      alert("Failed to delete school");
    }
  };

  const openModal = (schoolData: any, mode: "view" | "edit") => {
    setSelectedSchool(schoolData);
    setMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact<School>
        rowData={rowData}
        columnDefs={columnDefs}
        theme="legacy"
      />

      {modalOpen && selectedSchool && (
        <SchoolModal
          school={selectedSchool}
          mode={mode}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
