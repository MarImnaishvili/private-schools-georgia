//app/components/forms/SchoolLevelSection
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { SchoolLevelKey, SchoolLevelFields } from "@/types/formData";
import { SchoolFormData } from "@/schemas/schema";

type Props = {
  level: SchoolLevelKey;
  register: UseFormRegister<SchoolFormData>;
  errors: FieldErrors<SchoolFormData>;
};

// Helper to build safe nested paths
const field = <T extends SchoolLevelKey, K extends keyof SchoolLevelFields>(
  level: T,
  key: K
): Path<SchoolFormData> => `${level}.${key}` as Path<SchoolFormData>;

const mealsOptions = [
  "no meals",
  "included in the price",
  "not included in the price",
];

const transportationOptions = [
  "no transportation service",
  "included in the price",
  "not included in the price",
];

const sportsClubsOptions = [
  "Swimming",
  "basketball",
  "football",
  "chess",
  "karate",
  "volleyball",
  "tennis",
  "wrestling",
  "judo",
  "yoga",
  "gymnastics",
];

// multiple choice for mandatorySportsClubs and then combine as onre text.
const textbooksPriceOptions = [
  "included in the price",
  "not included in the price",
];

export default function SchoolLevelSection({ level, register, errors }: Props) {
  const t = useTranslations("level");

  return (
    <div className="space-y-2">
      <input
        type="number"
        placeholder={t("price")}
        {...register(field(level, "price"))}
        className="w-full border p-2"
      />
      {errors?.[level]?.price && (
        <p className="text-red-500 text-sm">{t("required")}</p>
      )}

      <input
        placeholder={t("discountAndPaymentTerms")}
        {...register(field(level, "discountAndPaymentTerms"))}
        className="w-full border p-2"
      />
      {errors?.[level]?.discountAndPaymentTerms && (
        <p className="text-red-500 text-sm">{t("required")}</p>
      )}

      <input
        type="number"
        placeholder={t("numberOfStudents")}
        {...register(field(level, "numberOfStudents"))}
        className="w-full border p-2"
      />
      {errors?.[level]?.numberOfStudents && (
        <p className="text-red-500 text-sm">{t("required")}</p>
      )}

      <label className="block">
        {t("meals")}
        <select
          {...register(field(level, "meals"))}
          className="w-full border p-2"
        >
          {mealsOptions.map((option) => (
            <option key={option} value={option}>
              {t(option)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        {t("transportation")}
        <select
          {...register(field(level, "transportation"))}
          className="w-full border p-2"
        >
          {transportationOptions.map((option) => (
            <option key={option} value={option}>
              {t(option)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register(field(level, "schoolUniform"))} />
        <span>{t("schoolUniform")}</span>
      </label>

      <input
        placeholder={t("teachingStyleBooks")}
        {...register(field(level, "teachingStyleBooks"))}
        className="w-full border p-2"
      />

      <label className="block">
        {t("textbooksPrice")}
        <select
          {...register(field(level, "textbooksPrice"))}
          className="w-full border p-2"
        >
          {textbooksPriceOptions.map((option) => (
            <option key={option} value={option}>
              {t(option)}
            </option>
          ))}
        </select>
      </label>

      <input
        placeholder={t("clubsAndCircles")}
        {...register(field(level, "clubsAndCircles"))}
        className="w-full border p-2"
      />

      <label className="block">
        {t("mandatorySportsClubs")}
        <select
          multiple
          {...register(field(level, "mandatorySportsClubs"))}
          className="w-full border p-2 h-32"
        >
          {sportsClubsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
