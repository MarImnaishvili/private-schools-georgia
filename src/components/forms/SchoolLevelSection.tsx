"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SchoolLevelSectionProps } from "../../types/formData";

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

const textbooksPriceOptions = [
  "included in the price",
  "not included in the price",
];

export default function SchoolLevelSection({
  level,
  data,
  onChange,
}: SchoolLevelSectionProps) {
  const t = useTranslations("level");

  return (
    <div className="space-y-2">
      <input
        type="number"
        placeholder={t("price")}
        value={data.price}
        onChange={(e) => onChange(level, "price", +e.target.value)}
        className="w-full border p-2"
      />
      <input
        placeholder={t("discountAndPaymentTerms")}
        value={data.discountAndPaymentTerms}
        onChange={(e) =>
          onChange(level, "discountAndPaymentTerms", e.target.value)
        }
        className="w-full border p-2"
      />
      <input
        type="number"
        placeholder={t("numberOfStudents")}
        value={data.numberOfStudents}
        onChange={(e) => onChange(level, "numberOfStudents", +e.target.value)}
        className="w-full border p-2"
      />

      {/* Meals Dropdown */}
      <label className="block">
        {t("meals")}
        <select
          value={data.meals}
          onChange={(e) => onChange(level, "meals", e.target.value)}
          className="w-full border p-2"
        >
          {mealsOptions.map((option) => (
            <option key={option} value={option}>
              {t(option)}
            </option>
          ))}
        </select>
      </label>

      {/* Transportation Dropdown */}
      <label className="block">
        {t("transportation")}
        <select
          value={data.transportation}
          onChange={(e) => onChange(level, "transportation", e.target.value)}
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
        <input
          type="checkbox"
          checked={data.schoolUniform}
          onChange={(e) => onChange(level, "schoolUniform", e.target.checked)}
        />
        <span>{t("schoolUniform")}</span>
      </label>

      <input
        placeholder={t("teachingStyleBooks")}
        value={data.teachingStyleBooks}
        onChange={(e) => onChange(level, "teachingStyleBooks", e.target.value)}
        className="w-full border p-2"
      />

      <label className="block">
        {t("textbooksPrice")}
        <select
          value={data.textbooksPrice}
          onChange={(e) => onChange(level, "textbooksPrice", e.target.value)}
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
        value={data.clubsAndCircles}
        onChange={(e) => onChange(level, "clubsAndCircles", e.target.value)}
        className="w-full border p-2"
      />

      <label className="block">
        {t("mandatorySportsClubs")}
        <select
          multiple
          value={data.mandatorySportsClubs || []}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (opt) => opt.value
            );
            onChange(level, "mandatorySportsClubs", selected);
          }}
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
