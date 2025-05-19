"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  InfrastructureFields,
  InfrastructureSectionProps,
} from "../../types/formData";

export default function InfrastructureSection({
  infrastructure,
  onChange,
}: InfrastructureSectionProps) {
  const t = useTranslations("infrastructure");

  return (
    <div className="space-y-2">
      <h2 className="text-xl mt-6 font-semibold">{t("title")}</h2>
      {Object.entries(infrastructure).map(([key, value]) => {
        const typedKey = key as keyof InfrastructureFields;
        return typeof value === "boolean" ? (
          <label key={key} className="block">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(typedKey, e.target.checked)}
            />{" "}
            {t(typedKey)}
          </label>
        ) : (
          <input
            key={key}
            type="number"
            placeholder={t(typedKey)}
            value={value}
            onChange={(e) => onChange(typedKey, +e.target.value)}
            className="w-full border p-2"
          />
        );
      })}
    </div>
  );
}
