//app/components/forms/InfrastructureSection
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SchoolFormData } from "@/schemas/schema";

type Props = {
  register: UseFormRegister<SchoolFormData>;
  errors: FieldErrors<SchoolFormData>;
};

export default function InfrastructureSection({ register, errors }: Props) {
  const t = useTranslations("infrastructure");

  return (
    <div className="space-y-3">
      <h2 className="text-xl mt-6 font-semibold">{t("title")}</h2>

      {/* Numeric fields */}
      <div>
        <label className="block">
          {t("numberOfFloors")}
          <input
            type="number"
            {...register("infrastructure.numberOfFloors", {
              valueAsNumber: true,
            })}
            className="w-full border p-2"
          />
        </label>
        {errors.infrastructure?.numberOfFloors && (
          <p className="text-red-500 text-sm">
            {errors.infrastructure.numberOfFloors.message}
          </p>
        )}
      </div>

      <div>
        <label className="block">
          {t("squareness")}
          <input
            type="number"
            {...register("infrastructure.squareness", {
              valueAsNumber: true,
            })}
            className="w-full border p-2"
          />
        </label>
        {errors.infrastructure?.squareness && (
          <p className="text-red-500 text-sm">
            {errors.infrastructure.squareness.message}
          </p>
        )}
      </div>

      {/* Boolean fields - explicitly typed */}
      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.buildings")} />
        <span>{t("buildings")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.stadiums")} />
        <span>{t("stadiums")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.pools")} />
        <span>{t("pools")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.courtyard")} />
        <span>{t("courtyard")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.laboratories")} />
        <span>{t("laboratories")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.library")} />
        <span>{t("library")}</span>
      </label>

      <label className="block space-x-2">
        <input type="checkbox" {...register("infrastructure.cafe")} />
        <span>{t("cafe")}</span>
      </label>
    </div>
  );
}
