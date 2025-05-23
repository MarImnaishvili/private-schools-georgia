//app/components/forms/SchoolLevelSection
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  Controller,
  Control,
} from "react-hook-form";
import { SchoolLevelKey, SchoolLevelFields } from "@/types/formData";
import { SchoolFormData } from "@/schemas/schema";
import { Card, CardContent } from "../ui/Card";
import { Label } from "../ui/Label";

type Props = {
  level: SchoolLevelKey;
  register: UseFormRegister<SchoolFormData>;
  errors: FieldErrors<SchoolFormData>;
  control: Control<SchoolFormData>;
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

export default function SchoolLevelSection({
  level,
  register,
  errors,
  control,
}: Props) {
  const t = useTranslations("level");

  return (
    <Card className="p-4 mb-6">
      <CardContent className="grid gap-4">
        <div>
          <Label htmlFor={`levels.${level}.price`}>{t("price")}</Label>
          <input
            id={`levels.${level}.price`}
            type="number"
            placeholder={t("price")}
            {...register(field(level, "price"))}
            className="w-full border p-2"
          />
          {errors?.[level]?.price && (
            <p className="text-red-500 text-sm">{t("required")}</p>
          )}
        </div>

        <div>
          <Label htmlFor={`levels.${level}.discountAndPaymentTerms`}>
            {t("discountAndPaymentTerms")}
          </Label>
          <input
            id={`levels.${level}.discountAndPaymentTerms`}
            placeholder={t("discountAndPaymentTerms")}
            {...register(field(level, "discountAndPaymentTerms"))}
            className="w-full border p-2"
          />
          {errors?.[level]?.discountAndPaymentTerms && (
            <p className="text-red-500 text-sm">{t("required")}</p>
          )}
        </div>
        <div>
          <Label htmlFor={`levels.${level}.numberOfStudents`}>
            {t("numberOfStudents")}
          </Label>

          <input
            id={`levels.${level}.numberOfStudents`}
            type="number"
            placeholder={t("numberOfStudents")}
            {...register(field(level, "numberOfStudents"))}
            className="w-full border p-2"
          />
          {errors?.[level]?.numberOfStudents && (
            <p className="text-red-500 text-sm">{t("required")}</p>
          )}
        </div>

        <div>
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
        </div>

        <div>
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
        </div>
        <div>
          <label className="flex items-center space-x-2">
            {t("schoolUniform")}
            <input
              type="checkbox"
              {...register(field(level, "schoolUniform"))}
            />
          </label>
        </div>
        <div>
          <Label htmlFor={`levels.${level}.teachingStyleBooks`}>
            {t("teachingStyleBooks")}
          </Label>
          <input
            id={`levels.${level}.teachingStyleBooks`}
            placeholder={t("teachingStyleBooks")}
            {...register(field(level, "teachingStyleBooks"))}
            className="w-full border p-2"
          />
        </div>
        <div>
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
        </div>
        <div>
          <Label htmlFor={`levels.${level}.clubsAndCircles`}>
            {t("clubsAndCircles")}
          </Label>

          <input
            id={`levels.${level}.clubsAndCircles`}
            placeholder={t("clubsAndCircles")}
            {...register(field(level, "clubsAndCircles"))}
            className="w-full border p-2"
          />
        </div>
        <div>
          <Controller
            name={field(level, "mandatorySportsClubs")}
            control={control}
            render={({ field }) => (
              <select
                multiple
                className="w-full border p-2 h-32"
                value={Array.isArray(field.value) ? field.value : []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(
                    (opt) => opt.value
                  );
                  field.onChange(selected);
                }}
              >
                {sportsClubsOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`${option}`)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
