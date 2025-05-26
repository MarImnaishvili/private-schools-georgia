//app/components/forms/SchoolLevelSection
"use client";

import React, { useEffect, useRef, useState } from "react";
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
  disabled?: boolean;
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
  disabled,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const t = useTranslations("level");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Card className="p-4 mb-6">
      <CardContent className="grid gap-4">
        <div>
          <Label htmlFor={`levels.${level}.price`}>{t("price")}</Label>
          <input
            id={`levels.${level}.price`}
            type="number"
            placeholder={t("price")}
            {...register(field(level, "price"), { valueAsNumber: true })}
            className="w-full border p-2"
            disabled={disabled}
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
            disabled={disabled}
          />
          {errors?.[level]?.discountAndPaymentTerms && (
            <p className="text-red-500 text-sm">{t("required")}</p>
          )}
        </div>
        <div>
          <Label htmlFor={`levels.${level}.duration`}>{t("duration")}</Label>
          <input
            id={`levels.${level}.duration`}
            placeholder={t("duration")}
            {...register(field(level, "duration"))}
            className="w-full border p-2"
            disabled={disabled}
          />
          {errors?.[level]?.duration && (
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
            {...register(field(level, "numberOfStudents"), {
              valueAsNumber: true,
            })}
            className="w-full border p-2"
            disabled={disabled}
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
                <option disabled={disabled} key={option} value={option}>
                  {t(option)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <Label htmlFor={`levels.${level}.mealsDescription`}>
            {t("mealsDescription")}
          </Label>
          <input
            id={`levels.${level}.mealsDescription`}
            placeholder={t("mealsDescription")}
            {...register(field(level, "mealsDescription"))}
            className="w-full border p-2"
            disabled={disabled}
          />
          {errors?.[level]?.mealsDescription && (
            <p className="text-red-500 text-sm">{t("required")}</p>
          )}
        </div>

        <div>
          <label className="block">
            {t("transportation")}
            <select
              {...register(field(level, "transportation"))}
              className="w-full border p-2"
            >
              {transportationOptions.map((option) => (
                <option disabled={disabled} key={option} value={option}>
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
              disabled={disabled}
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
            disabled={disabled}
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
                <option disabled={disabled} key={option} value={option}>
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
            disabled={disabled}
          />
        </div>
        <div>
          <Controller
            name={field(level, "mandatorySportsClubs")}
            control={control}
            defaultValue=""
            render={({ field }) => {
              const selectedValues = field.value
                ? field.value.toString().split(",")
                : [];

              const toggleValue = (value: string) => {
                const newValues = selectedValues.includes(value)
                  ? selectedValues.filter((v: string) => v !== value)
                  : [...selectedValues, value];
                field.onChange(newValues.join(","));
              };

              return (
                <div className="relative inline-block w-full" ref={dropdownRef}>
                  {/* Trigger */}
                  <div
                    onClick={() => setOpen((prev) => !prev)}
                    className="w-full border p-2 rounded cursor-pointer bg-white"
                  >
                    {selectedValues.length > 0
                      ? selectedValues.map((v: string) => t(v)).join(", ")
                      : t("Select sports clubs")}
                  </div>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute z-10 mt-2 w-full border rounded bg-white shadow-md p-2 max-h-48 overflow-auto">
                      {sportsClubsOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 py-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedValues.includes(option)}
                            onChange={() => toggleValue(option)}
                            disabled={disabled}
                          />
                          <span>{t(option)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
