//app/[locale]/schools/new/page
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { FormData } from "../../../../types/formData";
import TopLevelFields from "@/components/forms/TopLevelFields";
import InfrastructureFields from "@/components/forms/InfrastructureSection";
import AddressFields from "@/components/forms/AddressSection";
import SchoolLevelFields from "@/components/forms/SchoolLevelSection";

export default function NewSchoolPage() {
  const tForm = useTranslations("form");
  const tInfra = useTranslations("infrastructure");
  const tLevel = useTranslations("level");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber1: "",
    phoneNumber2: "",
    phoneNumber3: "",
    schoolsWebSite: "",
    facebookProfileURL: "",
    instagramProfileURL: "",
    establishedYear: 0, //დაემატა
    accreditationStatus: [], //დაემატა
    accreditationComment: "", // დაემატა
    founder: "",
    director: "",
    publicRelationsManager: "",
    parentRelationshipManager: "",
    graduationRate: "", //დაემატა
    averageNationalExamScore: "", //დაემატა
    description: "",
    otherPrograms: "",
    hasTutor: false,
    tutorDescription: "",
    hasScholarshipsGrants: false,
    scholarshipsGrants: "",
    hasExchangePrograms: false,
    exchangePrograms: "",
    hasOutdoorGarden: false,
    outdoorGarden: "",
    address: {
      city: "",
      street: "",
      zipCode: "",
      district: "",
    },
    infrastructure: {
      buildings: false,
      numberOfFloors: 0,
      squareness: 0,
      stadiums: false,
      pools: false,
      courtyard: false,
      laboratories: false,
      library: false,
      computerLab: false,
      cafe: false,
    },
    primary: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: "",
      mealsDescription: "",
      transportation: "",
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: "",
      clubsAndCircles: "",
      duration: "",
    },
    basic: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: "",
      mealsDescription: "",
      transportation: "",
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: "",
      clubsAndCircles: "",
      duration: "",
    },
    secondary: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: "",
      mealsDescription: "",
      transportation: "",
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: "",
      clubsAndCircles: "",
      duration: "",
    },
  });

  const handleTopLevelChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleNestedChange = <
    T extends keyof Pick<
      FormData,
      "infrastructure" | "primary" | "basic" | "secondary" | "address"
    >
  >(
    section: T,
    field: keyof FormData[T],
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert(response.ok ? tForm("schoolCreated") : tForm("errorCreatingSchool"));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{tForm("addNewSchool")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TopLevelFields formData={formData} onChange={handleTopLevelChange} />

        <AddressFields
          address={formData.address}
          onChange={(field, value) =>
            handleNestedChange("address", field, value)
          }
          t={tForm}
        />

        <InfrastructureFields
          infrastructure={formData.infrastructure}
          onChange={(field, value) =>
            handleNestedChange("infrastructure", field, value)
          }
          t={tInfra}
        />

        <h2 className="text-xl mt-6 font-semibold">{tForm("schoolLevels")}</h2>
        <Tabs defaultValue="primary" className="w-full">
          <TabsList>
            <TabsTrigger value="primary">{tForm("primary")}</TabsTrigger>
            <TabsTrigger value="basic">{tForm("basic")}</TabsTrigger>
            <TabsTrigger value="secondary">{tForm("secondary")}</TabsTrigger>
          </TabsList>
          <TabsContent value="primary">
            <SchoolLevelFields
              level="primary"
              data={formData.primary}
              onChange={handleNestedChange}
              t={tLevel}
            />
          </TabsContent>
          <TabsContent value="basic">
            <SchoolLevelFields
              level="basic"
              data={formData.basic}
              onChange={handleNestedChange}
              t={tLevel}
            />
          </TabsContent>
          <TabsContent value="secondary">
            <SchoolLevelFields
              level="secondary"
              data={formData.secondary}
              onChange={handleNestedChange}
              t={tLevel}
            />
          </TabsContent>
        </Tabs>

        <h2 className="text-xl mt-6 font-semibold">{tForm("otherFeatures")}</h2>
        <div className="space-y-2">
          {[
            { key: "hasTutor", label: "tutor" },
            { key: "hasScholarshipsGrants", label: "scholarshipsGrants" },
            { key: "hasExchangePrograms", label: "exchangePrograms" },
            { key: "hasOutdoorGarden", label: "outdoorGarden" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={key}
                checked={formData[key as keyof FormData] as boolean}
                onChange={handleTopLevelChange}
              />
              <span>{tForm(label)}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {tForm("submit")}
        </button>
      </form>
    </div>
  );
}
