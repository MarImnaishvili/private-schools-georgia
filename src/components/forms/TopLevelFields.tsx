import React from "react";
import { useTranslations } from "next-intl";
import { TopLevelFieldsProps } from "@/types/formData";

//const acreditationStatusOptions = ["accredited", "notAccredited", "inProgress"]; //

export default function TopLevelFields({
  formData,
  onChange,
}: TopLevelFieldsProps) {
  const tForm = useTranslations("form");

  const fields = [
    "name",
    "phoneNumber1",
    "phoneNumber2",
    "phoneNumber3",
    "schoolsWebSite",
    "facebookProfileURL",
    "instagramProfileURL",
    "establishedYear", //დაემატა
    "accreditationStatus", //დაემატა
    "accreditationComment", // authorizationDate,accreditationAgency, accreditationValidUntil
    "founder",
    "director",
    "publicRelationsManager",
    "parentRelationshipManager",
    "graduationRate", //დაემატა
    "averageNationalExamScore", //დაემატა
  ];

  return (
    <>
      {fields.map((field) => (
        <input
          key={field}
          name={field}
          placeholder={tForm(field)}
          value={formData[field] || ""}
          onChange={onChange}
          className="w-full border p-2"
        />
      ))}

      <textarea
        name="description"
        placeholder={tForm("description")}
        value={formData.description || ""}
        onChange={onChange}
        className="w-full border p-2"
      />

      <textarea
        name="otherPrograms"
        placeholder={tForm("otherPrograms")}
        value={formData.otherPrograms || ""}
        onChange={onChange}
        className="w-full border p-2"
      />
    </>
  );
}
