"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AddressProps } from "@/types/formData";

const districtOptions = [
  "vake-saburtalo",
  "isani-samgori",
  "gldani-nadzaladevi",
  "didube-chugureti",
  "dzveli-tbilisi",
  "tbilisis shemogareni",
];

export default function AddressSection({ address, onChange }: AddressProps) {
  const t = useTranslations("address");

  return (
    <div className="space-y-2">
      <h2 className="text-xl mt-6 font-semibold">{t("address")}</h2>

      <input
        placeholder={t("city")}
        value={address.city}
        onChange={(e) => onChange("city", e.target.value)}
        className="w-full border p-2"
      />
      <input
        placeholder={t("street")}
        value={address.street}
        onChange={(e) => onChange("street", e.target.value)}
        className="w-full border p-2"
      />
      <input
        placeholder={t("zipCode")}
        value={address.zipCode}
        onChange={(e) => onChange("zipCode", e.target.value)}
        className="w-full border p-2"
      />
      <label className="block">
        {t("district")}
        <select
          value={address.district}
          onChange={(e) => onChange("district", e.target.value)}
          className="w-full border p-2"
        >
          <option value="">{t("selectDistrict")}</option>
          {districtOptions.map((d) => (
            <option key={d} value={d}>
              {t(d)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
