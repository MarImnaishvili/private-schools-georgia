//app/[locale]/schools/new
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export default function NewSchoolPage() {
  const tForm = useTranslations("form");
  const tInfra = useTranslations("infrastructure");
  const tPrimary = useTranslations("primary");
  const tBasic = useTranslations("basic");
  const tSecondary = useTranslations("secondary");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    schoolsWebSite: "",
    otherSocialLinks: "",
    founder: "",
    director: "",
    publicRelationsManager: "",
    parentRelationshipManager: "",
    description: "",
    otherPrograms: "",
    tutor: false,
    scholarshipsGrants: false,
    exchangePrograms: false,
    outdoorGarden: false,
    photoUrls: [],
    infrastructure: {
      buildings: false,
      numberOfFloors: 0,
      squareness: 0,
      stadiums: false,
      pools: false,
      courtyard: false,
      laboratories: false,
      library: false,
      cafe: false,
    },
    primary: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: false,
      mealsIncludedInThePrice: false,
      transportation: false,
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: 0,
      clubsAndCircles: "",
    },
    basic: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: false,
      mealsIncludedInThePrice: false,
      transportation: false,
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: 0,
      clubsAndCircles: "",
    },
    secondary: {
      price: 0,
      discountAndPaymentTerms: "",
      numberOfStudents: 0,
      meals: false,
      mealsIncludedInThePrice: false,
      transportation: false,
      schoolUniform: false,
      schoolUniformPhotoUrls: [],
      mandatorySportsClubs: [],
      teachingStyleBooks: "",
      textbooksPrice: 0,
      clubsAndCircles: "",
    },
  });

  const handleTopLevelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const name = target.name as keyof typeof formData;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    section: keyof typeof formData,
    field: string,
    value: any
  ) => {
    const sectionData = formData[section];

    if (typeof sectionData === "object" && sectionData !== null) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      }));
    }
  };

  const renderLevelSection = (
    level: "primary" | "basic" | "secondary",
    t: ReturnType<typeof useTranslations>
  ) => (
    <div className="space-y-2">
      <input
        type="number"
        placeholder={t("price")}
        onChange={(e) => handleNestedChange(level, "price", +e.target.value)}
        className="w-full border p-2"
      />
      <input
        placeholder={t("discountAndPaymentTerms")}
        onChange={(e) =>
          handleNestedChange(level, "discountAndPaymentTerms", e.target.value)
        }
        className="w-full border p-2"
      />
      <input
        type="number"
        placeholder={t("numberOfStudents")}
        onChange={(e) =>
          handleNestedChange(level, "numberOfStudents", +e.target.value)
        }
        className="w-full border p-2"
      />
      {[
        "meals",
        "mealsIncludedInThePrice",
        "transportation",
        "schoolUniform",
      ].map((key) => (
        <label key={key} className="block">
          <input
            type="checkbox"
            checked={
              formData[level][key as keyof typeof formData.primary] as boolean
            }
            onChange={(e) => handleNestedChange(level, key, e.target.checked)}
          />{" "}
          {t(key)}
        </label>
      ))}
      <input
        placeholder={t("teachingStyleBooks")}
        onChange={(e) =>
          handleNestedChange(level, "teachingStyleBooks", e.target.value)
        }
        className="w-full border p-2"
      />
      <input
        type="number"
        placeholder={t("textbooksPrice")}
        onChange={(e) =>
          handleNestedChange(level, "textbooksPrice", +e.target.value)
        }
        className="w-full border p-2"
      />
      <input
        placeholder={t("clubsAndCircles")}
        onChange={(e) =>
          handleNestedChange(level, "clubsAndCircles", e.target.value)
        }
        className="w-full border p-2"
      />
    </div>
  );

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
        {[
          "name",
          "address",
          "phoneNumber",
          "schoolsWebSite",
          "otherSocialLinks",
          "founder",
          "director",
          "publicRelationsManager",
          "parentRelationshipManager",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={tForm(field)}
            onChange={handleTopLevelChange}
            className="w-full border p-2"
          />
        ))}

        <textarea
          name="description"
          placeholder={tForm("description")}
          onChange={handleTopLevelChange}
          className="w-full border p-2"
        />
        <textarea
          name="otherPrograms"
          placeholder={tForm("otherPrograms")}
          onChange={handleTopLevelChange}
          className="w-full border p-2"
        />

        <h2 className="text-xl mt-6 font-semibold">
          {tForm("infrastructure")}
        </h2>
        {Object.entries(formData.infrastructure).map(([key, value]) => (
          <div key={key}>
            {typeof value === "boolean" ? (
              <label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    handleNestedChange("infrastructure", key, e.target.checked)
                  }
                />{" "}
                {tInfra(key)}
              </label>
            ) : (
              <input
                type="number"
                placeholder={tInfra(key)}
                value={value}
                onChange={(e) =>
                  handleNestedChange("infrastructure", key, +e.target.value)
                }
                className="w-full border p-2"
              />
            )}
          </div>
        ))}

        <h2 className="text-xl mt-6 font-semibold">{tForm("schoolLevels")}</h2>
        <Tabs defaultValue="primary" className="w-full">
          <TabsList>
            <TabsTrigger value="primary">{tForm("primary")}</TabsTrigger>
            <TabsTrigger value="basic">{tForm("basic")}</TabsTrigger>
            <TabsTrigger value="secondary">{tForm("secondary")}</TabsTrigger>
          </TabsList>
          <TabsContent value="primary">
            {renderLevelSection("primary", tPrimary)}
          </TabsContent>
          <TabsContent value="basic">
            {renderLevelSection("basic", tBasic)}
          </TabsContent>
          <TabsContent value="secondary">
            {renderLevelSection("secondary", tSecondary)}
          </TabsContent>
        </Tabs>

        <h2 className="text-xl mt-6 font-semibold">{tForm("otherFeatures")}</h2>
        {[
          "tutor",
          "scholarshipsGrants",
          "exchangePrograms",
          "outdoorGarden",
        ].map((flag) => (
          <label key={flag}>
            <input
              type="checkbox"
              name={flag}
              checked={formData[flag as keyof typeof formData] as boolean}
              onChange={handleTopLevelChange}
            />{" "}
            {tForm(flag)}
          </label>
        ))}

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
