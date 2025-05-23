//app/components/forms/TopLevelFields
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SchoolFormData } from "@/schemas/schema";

type Props = {
  register: UseFormRegister<SchoolFormData>;
  errors: FieldErrors<SchoolFormData>;
};

const fields: (keyof SchoolFormData)[] = [
  "name",
  "phoneNumber1",
  "phoneNumber2",
  "phoneNumber3",
  "schoolsWebSite",
  "facebookProfileURL",
  "instagramProfileURL",
  "establishedYear",
  "accreditationStatus",
  "accreditationComment",
  "founder",
  "director",
  "publicRelationsManager",
  "parentRelationshipManager",
  "graduationRate",
  "averageNationalExamScore",
];

export default function TopLevelFields({ register, errors }: Props) {
  const tForm = useTranslations("form");

  return (
    <>
      {fields.map((field) => (
        <div key={field}>
          <input
            {...register(field)}
            placeholder={tForm(field)}
            className="w-full border p-2"
          />
          {errors?.[field] && (
            <p className="text-red-500 text-sm">{tForm("required")}</p>
          )}
        </div>
      ))}

      <div>
        <textarea
          {...register("description")}
          placeholder={tForm("description")}
          className="w-full border p-2"
        />
        {errors?.description && (
          <p className="text-red-500 text-sm">{tForm("required")}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("otherPrograms")}
          placeholder={tForm("otherPrograms")}
          className="w-full border p-2"
        />
        {errors?.otherPrograms && (
          <p className="text-red-500 text-sm">{tForm("required")}</p>
        )}
      </div>
    </>
  );
}
